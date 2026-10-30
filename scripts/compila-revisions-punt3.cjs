const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const levels={},banks={},variants={},plans={};
for(const name of fs.readdirSync('docs/dificultats').filter(n=>/^revisio-\deso-\w+-punt3\.json$/.test(n))){
 const doc=JSON.parse(fs.readFileSync(path.join('docs/dificultats',name)));
 // 1r numèric conserva de moment el seu registre i integració existents.
 if(!doc.course||!doc.sense)continue;
 const key=doc.course+'/'+doc.sense;assert(!levels[key],'bloc repetit');levels[key]={};
 if(doc.examPlans)plans[key]=doc.examPlans;
 for(const row of doc.topics){assert([1,2,3].includes(row.level)&&row.reason);const group=levels[key][row.topic]||=( [[],[],[]] );assert(!group.flat().includes(row.type),'tipus repetit '+key+'/'+row.topic+':'+row.type);group[row.level-1].push(row.type);if(row.variants){for(const v of Object.values(row.variants))assert([1,2,3].includes(v.level)&&v.reason);(((variants[key]||={})[row.topic]||={})[row.type])=row.variants;}}
 for(const row of doc.banks||[]){assert([1,2,3].includes(row.level)&&row.reason);(banks[row.bank]||={})[row.key]=row.level;}
}
const file='assets/js/dificultat-mi.js',src=fs.readFileSync(file,'utf8'),start='  /* BEGIN COMPILED PEDAGOGICAL REVIEW */',end='  /* END COMPILED PEDAGOGICAL REVIEW */';
const fragment=start+'\n  const REVIEWED_LEVELS=freeze('+JSON.stringify(levels)+');\n  const REVIEWED_BANKS=freeze('+JSON.stringify(banks)+');\n  const REVIEWED_VARIANTS=freeze('+JSON.stringify(variants)+');\n  const REVIEWED_PLANS=freeze('+JSON.stringify(plans)+');\n'+end;
assert(src.includes(start)&&src.includes(end),'marcadors absents');
const compiled=src.slice(0,src.indexOf(start))+fragment+src.slice(src.indexOf(end)+end.length);
if(process.argv.includes('--check'))assert.equal(src,compiled,'La classificació web no correspon als registres de revisió');else fs.writeFileSync(file,compiled);
console.log('Classificació compilada: '+Object.keys(levels).join(', '));
