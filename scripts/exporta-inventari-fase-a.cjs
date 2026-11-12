#!/usr/bin/env node
/* Registre fase A: validació estricta i exportació CSV llegible amb Excel.
   Ús: node scripts/exporta-inventari-fase-a.cjs [--check]
   No dedueix mai famílies des dels generadors: el registre és pedagògic. */
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const src=path.join(root,'docs/auditoria/families-validades.json');
const target=path.join(root,'docs/auditoria/inventari-fase-a.csv');
const data=JSON.parse(fs.readFileSync(src,'utf8'));
if(data.schema_version!==1||!Array.isArray(data.topics))throw Error('Esquema de registre no vàlid.');
const seenTopics=new Set();
const clean=v=>String(v??'').replace(/[\r\n]+/g,' ').replace(/"/g,'""');
const csv=v=>'"'+clean(v)+'"';
const headers=['Curs','Sentit','Tema','ID del tema','N1','N2','N3','Total','Estat','PR','Commit validat','Data validació','Observacions'];
const lines=[headers.map(csv).join(';')];
for(const topic of data.topics){
  if(!topic.id||seenTopics.has(topic.id))throw Error('ID de tema absent o duplicat: '+topic.id);
  seenTopics.add(topic.id);
  if(topic.status!=='validat')throw Error('El registre definitiu no pot incloure temes pendents: '+topic.id);
  if(!topic.merge_commit||!/^[0-9a-f]{40}$/.test(topic.merge_commit))throw Error('Falta commit de merge: '+topic.id);
  if(!Array.isArray(topic.families))throw Error('Falten famílies: '+topic.id);
  const ids=new Set(), counts=[0,0,0];
  for(const f of topic.families){
    if(!f.id||ids.has(f.id))throw Error('Família duplicada: '+topic.id+'/'+f.id);
    ids.add(f.id);
    if(![1,2,3].includes(f.level))throw Error('Nivell invàlid: '+topic.id+'/'+f.id);
    if(!Array.isArray(f.generators)||!f.generators.length)throw Error('Generadors no documentats: '+topic.id+'/'+f.id);
    counts[f.level-1]++;
  }
  const row=[topic.course,topic.sense,topic.topic,topic.id,...counts,topic.families.length,topic.status,
    topic.pr,topic.merge_commit,topic.verified_on,topic.validation];
  lines.push(row.map(csv).join(';'));
}
const output='\uFEFF'+lines.join('\r\n')+'\r\n';
if(process.argv.includes('--check')){
  if(!fs.existsSync(target)||fs.readFileSync(target,'utf8')!==output){
    console.error('L\u2019inventari CSV no coincideix amb el registre JSON. Executa: node scripts/exporta-inventari-fase-a.cjs');
    process.exit(1);
  }
  console.log('OK: '+data.topics.length+' temes validats; inventari CSV sincronitzat.');
}else{
  fs.mkdirSync(path.dirname(target),{recursive:true});
  fs.writeFileSync(target,output,'utf8');
  console.log('Generat '+path.relative(root,target)+' ('+data.topics.length+' temes).');
}
