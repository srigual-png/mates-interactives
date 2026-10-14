// Node.js 18+, no external packages. Read structured cards in the theory indexes.
const fs = require('fs'), path = require('path');
const root = path.resolve(__dirname, '..');
const senses = {numeric:'Sentit numèric',mesura:'Sentit de la mesura',espacial:'Sentit espacial',algebraic:'Sentit algebraic',estocastic:'Sentit estocàstic'};
const decode = s => s.replace(/&(?:amp|lt|gt|quot|apos|nbsp);/g, x => ({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&apos;':"'",'&nbsp;':' '})[x]).replace(/&#(x[\da-f]+|\d+);/gi, (_, n) => String.fromCodePoint(n[0].toLowerCase()==='x'?parseInt(n.slice(1),16):Number(n)));
const text = s => decode(s.replace(/<[^>]*>/g,' ')).replace(/\s+/g,' ').trim();
const read = p => fs.readFileSync(path.join(root,p),'utf8');
function generate({write=true}={}) {
 const entries=[], verified=new Set();
 for(let course=1;course<=4;course++)for(const [sense,label] of Object.entries(senses)){
  const dir=`${course}eso/teoria/${sense}`,source=read(`${dir}/index.html`),seen=new Set();
  const cards=source.match(/<a\b[^>]*class="[^"]*(?:topic-card|indexcard)[^"]*"[^>]*>[\s\S]*?<\/a>|<article\b[^>]*class="[^"]*topic-card[^"]*"[^>]*>[\s\S]*?<\/article>/g)||[];
  if(!cards.length)throw Error(`No s'han reconegut targetes: ${dir}`);
  for(const card of cards){
   const href=decode((card.match(/href="([^"]+)"/)||[])[1]||'');
   if(!/^[^/]+\.html$/.test(href)||href==='index.html')throw Error(`URL inesperada: ${dir}: ${href}`);
   const theory=`${dir}/${href}`;if(seen.has(theory))continue;seen.add(theory);
   if(!fs.existsSync(path.join(root,theory)))throw Error(`Enllaç inexistent: ${theory}`);
   const heading=(card.match(/<(?:strong|h2)\b[^>]*>([\s\S]*?)<\/(?:strong|h2)>/)||[])[1];
   if(!heading)throw Error(`Títol absent: ${theory}`);
   const rawTitle=text(heading).replace(/^[^\p{L}\p{N}]+/u,'');
   const title=rawTitle.replace(/^(?:Bloc\s+\d+|Ampliació\s*(?:·\s*)?[A-D]?)\s*[·:—–-]\s*/i,'');
   const keywords=(card.match(/<(?:span|p)\b[^>]*>([\s\S]*?)<\/(?:span|p)>/g)||[]).map(text).join(' ');
   let modes=[];
   if(course===4){
    const explicit=keywords.match(/Matemàtiques\s+([AB])\s*·/);
    modes=explicit?[explicit[1]]:['A','B'];
    // Exception encoded explicitly in the spatial index's introductory note.
    if(sense==='espacial'&&/^Ampliació\s*[AD]\s*·/.test(rawTitle))modes=['B'];
   }
   const item={title,course,sense:label,modes,theory,keywords};
   const expected=`${course}eso/sentit-${sense}.html`;
   const links=[...read(theory).matchAll(/<a\b[^>]*href="([^"]+)"/g)];
   for(const [,raw] of links){
    const url=new URL(decode(raw),`https://mi.invalid/${theory}`);
    if(url.origin==='https://mi.invalid'&&decodeURIComponent(url.pathname.slice(1))===expected){
     if(!fs.existsSync(path.join(root,expected)))throw Error(`Pràctica absent: ${expected}`);
     item.practice=expected;verified.add(expected);break;
    }
   }
   entries.push(item);verified.add(theory);
  }
 }
 const dest=path.join(root,'assets/data/index-cerca.json');fs.mkdirSync(path.dirname(dest),{recursive:true});
 if(write)fs.writeFileSync(dest,JSON.stringify(entries)+'\n');
 // Local HTML files cannot fetch JSON. Generate the same catalogue as a classic script.
 if(write)fs.writeFileSync(path.join(root,'assets/data/index-cerca-local.js'),'window.MICercaLocal = '+JSON.stringify(entries)+';\n');
 const summary={topics:Object.fromEntries([1,2,3,4].map(c=>[c,entries.filter(e=>e.course===c).length])),verified_links:verified.size,bytes:Buffer.byteLength(JSON.stringify(entries)+'\n')};
 console.log(JSON.stringify(summary));return {entries,summary};
}
module.exports={generate};
// The usual publication command also verifies and includes functional exams.
if(require.main===module)require('./genera-examens-cerca.cjs').generate().catch(error=>{console.error(error);process.exitCode=1;});
