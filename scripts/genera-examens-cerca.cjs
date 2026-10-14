// Publication-time verification only. The website still serves static JSON/JS.
const fs = require('fs'), path = require('path'), {pathToFileURL} = require('url');
const root = path.resolve(__dirname, '..');
function playwright() {
  if (process.env.MI_PLAYWRIGHT) return require(process.env.MI_PLAYWRIGHT);
  try { return require('playwright'); } catch {
    return require(path.join(process.env.USERPROFILE || process.env.HOME,
      '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
  }
}
function launchOptions() {
  const edge = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
  return {headless:true, ...(fs.existsSync(edge) ? {executablePath:edge} : {})};
}
async function generate() {
  // Preserve the last valid catalogue if browser verification fails.
  const {entries} = require('./genera-index-cerca.cjs').generate({write:false});
  const browser = await playwright().chromium.launch(launchOptions());
  try {
    const page = await browser.newPage();
    // Never send analytics or fetch external assets during publication checks.
    await page.route(/^https?:/, route => route.abort());
    for (const practice of new Set(entries.map(e=>e.practice).filter(Boolean))) {
      const html = fs.readFileSync(path.join(root, practice), 'utf8');
      if (!/<script\b[^>]*src=["'][^"']*examen-tema\.js["']/i.test(html)) continue;
      const errors = [];
      const onError = error => errors.push(error.message);
      page.on('pageerror', onError);
      await page.goto(pathToFileURL(path.join(root, practice)).href);
      const exams = await page.evaluate(() => {
        if (!window.miTopicExam?.getTopics) throw Error('Exam discovery API missing');
        return miTopicExam.getTopics().map(topic => {
          const questions = miTopicExam.build(topic);
          if (questions.length !== 12 || !questions.every(q =>
            q.question && q.solution?.length && Array.isArray(q.options) &&
            q.options.filter(o=>String(o)===String(q.correct)).length === 1)) {
            throw Error('Invalid exam: '+topic.id);
          }
          const theory = typeof MI_THEORY_PAGES !== 'undefined' ? MI_THEORY_PAGES[topic.id] :
            typeof THEORY_PAGES !== 'undefined' ? THEORY_PAGES[topic.id] : topic.theoryPage;
          if (!theory) throw Error('Missing theory mapping: '+topic.id);
          return {id:topic.id, theory:new URL(theory, location.href).href};
        });
      });
      page.off('pageerror', onError);
      if (errors.length) throw Error(practice+': '+errors.join('; '));
      for (const exam of exams) {
        const matches = entries.filter(e => e.practice === practice &&
          pathToFileURL(path.join(root, e.theory)).href === exam.theory);
        if (matches.length !== 1) throw Error('Ambiguous/missing catalogue mapping: '+practice+' / '+exam.id);
        const params = new URLSearchParams({[practice.startsWith('1eso/')?'tema':'topic']:exam.id, examen:'tema'});
        matches[0].exam = practice+'?'+params;
      }
    }
    fs.writeFileSync(path.join(root,'assets/data/index-cerca.json'), JSON.stringify(entries)+'\n');
    fs.writeFileSync(path.join(root,'assets/data/index-cerca-local.js'), 'window.MICercaLocal = '+JSON.stringify(entries)+';\n');
    console.log(JSON.stringify({exams:entries.filter(e=>e.exam).map(e=>({theory:e.theory,exam:e.exam}))}));
    return entries;
  } finally { await browser.close(); }
}
module.exports = {generate, playwright, launchOptions};
if (require.main === module) generate().catch(error=>{console.error(error);process.exitCode=1;});
