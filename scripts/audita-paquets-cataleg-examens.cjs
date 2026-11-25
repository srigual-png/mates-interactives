'use strict';

const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const assert = require('node:assert/strict');
const {playwright, launchOptions} = require('./genera-examens-cerca.cjs');

const ROOT = path.resolve(__dirname, '..');
const REGISTRY = path.join(ROOT, 'docs/auditoria/families-validades.json');
const OUTPUT = path.join(ROOT, 'docs/dificultats/resultats-cataleg-tancat-oferta-examens-1r-2n.json');
const ATTEMPTS = Number(process.env.MI_CATALEG_ATTEMPTS || 3000);
assert(Number.isInteger(ATTEMPTS) && ATTEMPTS >= 300, 'MI_CATALEG_ATTEMPTS ha de ser un enter igual o superior a 300');
const PACKAGES = [
  ['B01',1,5,['1eso/numeric/decimal_sys','1eso/numeric/naturals']],
  ['B02',1,4,['1eso/numeric/divis','1eso/numeric/mcd_mcm']],
  ['B03',1,5,['1eso/numeric/proporcionalitat','1eso/numeric/percentatges']],
  ['B04',2,4,['1eso/numeric/naturals','1eso/numeric/ops']],
  ['B05',2,11,['1eso/numeric/decimal_sys','1eso/numeric/decimals']],
  ['B06',2,4,['1eso/numeric/potencies','1eso/numeric/jerarquia']],
  ['B07',2,4,['1eso/numeric/divis','1eso/numeric/mcd_mcm']],
  ['B08',2,4,['1eso/numeric/enters','1eso/numeric/ops']],
  ['B09',2,5,['1eso/numeric/proporcionalitat','1eso/numeric/percentatges']],
  ['B10',3,5,['1eso/numeric/naturals','1eso/numeric/decimal_sys','1eso/numeric/ops','1eso/numeric/divis','1eso/numeric/mcd_mcm']],
  ['B11',3,5,['1eso/numeric/potencies','1eso/numeric/jerarquia','1eso/numeric/decimals','1eso/numeric/fraccions']],
  ['B12',3,3,['1eso/numeric/enters','1eso/numeric/proporcionalitat','1eso/numeric/percentatges']],
  ['B13',1,4,['1eso/mesura/metric','1eso/mesura/conversions','1eso/mesura/estimacio']],
  ['B14',1,3,['1eso/mesura/temps','1eso/mesura/perimetres']],
  ['B15',2,5,['1eso/mesura/metric','1eso/mesura/conversions']],
  ['B16',2,12,['1eso/mesura/estimacio','1eso/mesura/arees']],
  ['B17',3,4,['1eso/mesura/metric','1eso/mesura/conversions','1eso/mesura/mesurament','1eso/mesura/estimacio']],
  ['B18',3,4,['1eso/mesura/temps','1eso/mesura/perimetres','1eso/mesura/arees','1eso/mesura/problemes']],
  ['B19',2,10,['1eso/espacial/angles','1eso/espacial/poligons','1eso/espacial/triangles','1eso/espacial/quadrilaters','1eso/espacial/cercle']],
  ['B20',1,4,['1eso/estocastic/mitjana','1eso/estocastic/mediana']],
  ['B21',2,5,['1eso/estocastic/taules','1eso/estocastic/barres','1eso/estocastic/poligons']],
  ['B22',2,4,['1eso/estocastic/mitjana','1eso/estocastic/mediana','1eso/estocastic/moda']],
  ['B23',1,3,['1eso/algebraic/simplificacio','1eso/algebraic/equacions']],
  ['B24',2,5,['1eso/algebraic/traduccio','1eso/algebraic/simplificacio','1eso/algebraic/equacions']],
  ['B25',2,4,['1eso/algebraic/patrons','1eso/algebraic/computacional']],
  ['B26',1,4,['1eso/numeric/jerarquia','1eso/numeric/ops']],
];

function checkCatalogDefinitions() {
  const registry = JSON.parse(fs.readFileSync(REGISTRY, 'utf8'));
  const topics = new Map(registry.topics.map(topic => [topic.id, topic]));
  for (const [code, , , ids] of PACKAGES) {
    for (const id of ids) {
      const topic = topics.get(id);
      assert(topic, `${code}: manca tema validat ${id}`);
    }
  }
  return {topics};
}

async function main() {
  const {topics: registryTopics} = checkCatalogDefinitions();
  const selectedIds = [...new Set(PACKAGES.flatMap(row => row[3]))];
  const browser = await playwright().chromium.launch(launchOptions());
  const observations = new Map();
  const pageErrors = [];
  try {
    const groups = new Map();
    for (const id of selectedIds) {
      const [course, sense] = id.split('/');
      const key = `${course}/${sense}`;
      if (!groups.has(key)) groups.set(key, {course, sense, ids:[]});
      groups.get(key).ids.push(id);
    }
    let seed = 0x52c31a77;
    for (const {course, sense, ids} of groups.values()) {
      const page = await browser.newPage();
      page.on('pageerror', error => pageErrors.push(`${course}/${sense}: ${error.message}`));
      await page.route(/^https?:/, route => route.abort());
      await page.goto(pathToFileURL(path.join(ROOT, course, `sentit-${sense}.html`)).href);
      await page.waitForFunction(() => Array.isArray(TOPICS) && window.miTaskDifficulty);
      const familyMetadata = Object.fromEntries(ids.map(id=>[id,registryTopics.get(id)]));
      const data = await page.evaluate(({ids, attempts, initialSeed, familyMetadata}) => {
        let state = initialSeed >>> 0;
        Math.random = () => ((state = (Math.imul(state,1664525)+1013904223)>>>0) / 4294967296);
        const visualQuestion = (course, sense) => sense === 'espacial' || sense === 'estocastic' || sense === 'algebraic';
        const makeKey = (html, keepMarkup) => {
          const root = document.createElement('div');
          root.innerHTML = String(html || '');
          if (!keepMarkup) return root.textContent.replace(/\s+/g,' ').trim();
          for (const node of [root, ...root.querySelectorAll('*')]) {
            for (const attr of [...node.attributes]) {
              if (attr.name === 'id' || (node.namespaceURI !== 'http://www.w3.org/2000/svg' && ['class','style'].includes(attr.name))) node.removeAttribute(attr.name);
            }
          }
          return root.innerHTML.replace(/\s+/g,' ').replace(/>\s+</g,'><').trim();
        };
        const output=[];
        for (const id of ids) {
          const [course,sense]=id.split('/');
          const registryTopicId=familyMetadata[id]?.code_topic_id||id.split('/')[2];
          const topicId=({mcd_mcm:'mcmmcd'})[registryTopicId]||registryTopicId;
          const topic=TOPICS.find(item=>item.id===topicId);
          if(!topic) throw Error(`TOPICS no conté el codi "${topicId}" del registre "${id}"`);
          const keepMarkup=visualQuestion(course,sense);
          const byLevel={1:new Map(),2:new Map(),3:new Map()}, familyByGenerator=new Map(), familyIds=new Set();
          const metadata=familyMetadata[id]||null;
          if(metadata) for(const family of metadata.families||[]) {
            familyIds.add(String(family.id));
            for(const generator of family.generators||[]) familyByGenerator.set(String(generator),family.id);
            // Alguns temes separen els generadors de pràctica de les variants d'examen.
            for(const variant of family.variants||[]) {
              const match=String(variant).match(/^(?:examen|raonament):(.+)$/);
              if(match) familyByGenerator.set(match[1],family.id);
            }
          }
          const problemsByLevel={1:[],2:[],3:[]};
          for(let i=0;i<attempts;i++){
            if(typeof resetVariationSession==='function') resetVariationSession();
            const q=topic.gen();
            const difficulty=miTaskDifficulty.getDifficulty(topic,q);
            if(![1,2,3].includes(Number(difficulty))) continue;
            const prompt=makeKey(q.question,keepMarkup);
            if(!prompt || !Array.isArray(q.options) || q.options.filter(option=>String(option)===String(q.correct)).length!==1 || !q.solution?.length) continue;
            const familyCandidates=[q.familyId,q.reasoningFamily,q.fractionsFamily,q.decimalsFamily,q.decimalsGenerator,q.generatorId,q.variantId,q.type]
              .filter(value=>value!==undefined&&value!==null).map(String);
            const family=familyCandidates.map(value=>familyIds.has(value)?value:familyByGenerator.get(value)).find(Boolean)||'';
            if(!family) problemsByLevel[difficulty].push(`família no identificada per ${id}, tipus ${q.type}`);
            const bucket=byLevel[difficulty];
            if(!bucket.has(prompt)) bucket.set(prompt,new Set());
            if(family) bucket.get(prompt).add(family);
          }
          output.push({id,attempts,keepMarkup,byLevel:Object.fromEntries(Object.entries(byLevel).map(([level,map])=>[level,[...map].map(([question,families])=>({question,families:[...families]}))])),problemsByLevel:Object.fromEntries(Object.entries(problemsByLevel).map(([level,items])=>[level,[...new Set(items)].slice(0,20)]))});
        }
        return output;
      }, {ids, attempts:ATTEMPTS, initialSeed:seed, familyMetadata});
      seed = (seed + 0x9e3779b9) >>> 0;
      for (const result of data) observations.set(result.id, result);
      await page.close();
    }
  } finally { await browser.close(); }
  assert.deepEqual(pageErrors, [], pageErrors.join('\n'));

  const packageResults = PACKAGES.map(([code,level,expectedFamilies,ids]) => {
    const questions = new Map();
    const observedFamilies = new Set();
    const diagnostics=[];
    for (const id of ids) {
      const observation=observations.get(id);
      assert(observation, `No s'ha mostrejat ${id}`);
      const samples=observation.byLevel[level]||[];
      for (const sample of samples) {
        for(const family of sample.families) observedFamilies.add(family);
        if(!questions.has(sample.question)) questions.set(sample.question,new Set());
        for(const family of sample.families) questions.get(sample.question).add(family);
      }
      diagnostics.push(...(observation.problemsByLevel[level]||[]));
    }
    const count=questions.size;
    const families=observedFamilies.size;
    const familyCountMatches=families===expectedFamilies;
    const eligible=count>=12&&families>=3&&familyCountMatches&&diagnostics.length===0;
    return {code,level,topics:ids,uniquePromptsObserved:count,distinctFamiliesObserved:families,declaredFamilies:expectedFamilies,familyCountMatches,attemptsPerTopic:ATTEMPTS,diagnostics:[...new Set(diagnostics)],status:eligible?'llindar assolit en la mostra':'revisió manual: llindar no demostrat'};
  });
  const topicResults=[];
  for(const [id,observation] of observations){
    const topic=registryTopics.get(id);
    for(const level of [1,2,3]){
      const questions=observation.byLevel[level]||[];
      const families=new Set(questions.flatMap(question=>question.families));
      topicResults.push({id,topic:topic.topic,level,uniquePromptsObserved:questions.length,distinctFamiliesObserved:families.size,attempts:ATTEMPTS,diagnostics:observation.problemsByLevel[level]||[]});
    }
  }
  const report={generatedAt:new Date().toISOString(),method:{attemptsPerTopic:ATTEMPTS,normalization:'Enunciats de text: HTML reduït a text visible i espais normalitzats. Enunciats visuals: es conserva el markup i els atributs SVG, es treuen els id i s’ometen class/style només fora dels SVG. Les dades numèriques i els elements geomètrics es mantenen.',interpretation:'Els recomptes són límits inferiors observats amb una mostra determinista, no el cardinal total del generador. Un resultat de 12 o més confirma que s’han trobat 12 enunciats diferents; un resultat inferior és inconcloent.'},packages:packageResults,topicLevels:topicResults};
  fs.writeFileSync(OUTPUT,JSON.stringify(report,null,2)+'\n');
  console.log('Paquet | nivell | preguntes diferents observades | famílies observades | estat');
  for(const result of packageResults) console.log(`${result.code} | N${result.level} | ${result.uniquePromptsObserved} | ${result.distinctFamiliesObserved}/${result.declaredFamilies}${result.familyCountMatches?'':' (recompte diferent)'} | ${result.status}`);
  console.log(`\nInforme desat a ${path.relative(ROOT,OUTPUT)}`);
}

main().catch(error=>{console.error(error);process.exitCode=1;});
