// Network-free integration tests: execute MI and the real GoatCounter client.
// Browser-provided inputs are simulated; sendBeacon and image fallback only log URLs.
const fs = require('fs'), path = require('path'), vm = require('vm');
const assert = require('node:assert/strict');
const {execFileSync} = require('child_process');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'assets/js/analitica-mi.js'), 'utf8');
const tracker = fs.readFileSync(process.env.MI_GOATCOUNTER_CLIENT || path.join(__dirname, 'goatcounter-test-fixture.js'), 'utf8');

function load(referrer, {code = source, visibility = 'visible', beacon = true, skip = false,
  url = 'https://srigual-png.github.io/mates-interactives/index.html?secret=PRIVATE#PRIVATE'} = {}) {
  const hits = [], scripts = [], listeners = {}, timers = [];
  const record = value => {
    const url = new URL(value);
    assert.equal(url.origin + url.pathname, 'https://srigual.goatcounter.com/count');
    hits.push(Object.fromEntries(url.searchParams));
  };
  const context = {
    URL, URLSearchParams, location: new URL(url), performance: {now: () => 0},
    console: {warn() {}}, queueMicrotask: f => f(), setTimeout: f => (timers.push(f), timers.length),
    localStorage: {getItem: () => skip ? 't' : null}, screen: {width: 1280},
    navigator: {sendBeacon: value => { if (beacon) record(value); return beacon; }},
    document: {
      referrer, title: 'MI', visibilityState: visibility,
      querySelector: selector => selector === 'script[data-goatcounter]' ? scripts[0] || null : null,
      querySelectorAll: () => [],
      addEventListener: (name, fn) => (listeners[name] ||= []).push(fn),
      createElement: tag => {
        const element = {dataset: {}, style: {}, setAttribute() {}, addEventListener() {}};
        if (tag === 'img') Object.defineProperty(element, 'src', {set: record});
        return element;
      },
      body: {appendChild() {}}, head: {appendChild: script => scripts.push(script)}
    }
  };
  context.window = context;
  context.parent = context;
  vm.createContext(context);
  vm.runInContext(code, context);
  return {
    hits, scripts, context,
    start() { vm.runInContext(tracker, context); scripts[0].onload(); },
    repeat() { vm.runInContext(code, context); },
    visibility(value) { context.document.visibilityState = value; (listeners.visibilitychange || []).forEach(f => f()); }
  };
}
const visits = test => test.hits.filter(hit => hit.e !== 'true'); // is:pageview.
const events = test => test.hits.filter(hit => hit.e === 'true');
const incoming = 'https://external.test/PRIVATE?token=PRIVATE#PRIVATE';
if (process.env.MI_ANALYTICS_BASELINE) {
  const code = fs.readFileSync(process.env.MI_ANALYTICS_BASELINE, 'utf8');
  const before = load(incoming, {code});
  before.start();
  assert.equal(before.context.document.referrer, incoming);
  assert.equal(visits(before).length, 1);
  assert(!visits(before)[0].r);
  console.log('Baseline: incoming referrer erased before /count: reproduced');
}

for (const [referrer, expected] of [
  ['https://external.test/', 'https://external.test'],
  [incoming, 'https://external.test'],
  ['https://user:PRIVATE@external.test:8443/PRIVATE?PRIVATE#PRIVATE', 'https://external.test:8443'],
  ['http://external.test/PRIVATE', 'http://external.test'],
  ['', ''], // Direct, noreferrer, no-referrer or source app withholding referrer.
  ['https://srigual-png.github.io/mates-interactives/1eso/index.html?PRIVATE', ''],
  ['https://srigual-png.github.io/another-project/', ''], // Same origin is internal.
  ['not an absolute URL', ''], ['about:blank', ''], ['android-app://app.id/PRIVATE', '']
]) {
  const test = load(referrer);
  test.start(); test.repeat(); test.visibility('visible'); test.visibility('visible');
  assert.equal(test.scripts.length, 1);
  assert.equal(visits(test).length, 1);
  assert.equal(visits(test)[0].r || '', expected);
  assert.equal(visits(test)[0].p, '/mates-interactives/index.html');
  assert(!('q' in visits(test)[0]));
  assert(!JSON.stringify(test.hits).includes('PRIVATE'));
  test.context.MIAnalytics.track('mi/test/referrer', 'MI test');
  assert.equal(events(test).length, 1);
  assert.equal(events(test)[0].ns, 'true');
  assert(!events(test)[0].r);
  assert.equal(test.context.goatcounter.get_data({}).r, expected);
  assert.equal(visits(test).length, 1);
}
console.log('10 referrer cases: external origin only; direct/internal/private/unsupported remain empty: OK');
console.log('is:pageview excludes MI events; no query/hash/credentials; one loader/pageview: OK');

for (const beacon of [true, false]) {
  const test = load(incoming, {visibility: 'hidden', beacon});
  test.context.MIAnalytics.track('mi/test/queued'); // Event before tracker loads.
  test.start();
  assert.equal(visits(test).length, 0);
  assert.equal(events(test).length, 1);
  test.visibility('visible'); test.visibility('hidden'); test.visibility('visible');
  assert.equal(visits(test).length, 1);
  assert.equal(visits(test)[0].r, 'https://external.test');
  assert(!events(test)[0].r);
}
const skipped = load(incoming, {skip: true}); skipped.start();
assert.equal(skipped.hits.length, 0);
for (const url of ['http://localhost/index.html', 'http://127.0.0.1/index.html', 'file:///tmp/index.html']) {
  const test = load(incoming, {url});
  test.context.MIAnalytics.track('mi/test/local');
  assert.equal(test.scripts.length, 0); assert.equal(test.hits.length, 0);
}
console.log('Queued events, hidden-to-visible, beacon/image fallback, skipgc and local exclusions: OK');

// Every served course page uses one shared loader, with no legacy count.js calls.
const publicFiles = execFileSync('git', ['ls-files', '*.html'], {cwd: root, encoding: 'utf8'})
  .trim().split('\n').filter(f => f === 'index.html' || /^[1-4]eso\//.test(f));
for (const file of publicFiles) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  assert.equal((html.match(/src=["'][^"'\n]*analitica-mi\.js["']/g) || []).length, 1, file);
  assert(!/gc\.zgo\.at\/count\.js|data-goatcounter\s*=|goatcounter\.count\s*\(/.test(html), file);
  assert(!/<meta\b[^>]*(?:name=["']referrer["']|http-equiv=["'](?:referrer-policy|refresh)["'])/i.test(html), file);
}
console.log(`${publicFiles.length} public HTML files: one loader; no direct tracker, pageview calls, referrer meta or meta redirects: OK`);
