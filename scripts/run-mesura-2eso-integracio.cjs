#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict');
const themes=['unitats','escales','pitagores','perimetres','superficies','estimacio','problemes','transversal'];
const theme=process.argv[2];assert(themes.includes(theme),'Unknown test suite group: '+theme);
const dir=__dirname,items=fs.readdirSync(dir).filter(x=>/^test-mesura-2eso-.*\.cjs$/.test(x)&&!x.includes('-integracio-')&&!x.includes('workflows-centralitzats')).sort();
const classified=items.map(filename=>{
 const name=filename.toLowerCase();
 const matches=themes.filter(t=>t!=='transversal'&&name.includes(t));
 return {filename,group:matches.length===1?matches[0]:'transversal'};
});
const selected=classified.filter(x=>x.group===theme),skippedBrowsers=selected.filter(x=>/browser|navegador/.test(x.filename));
console.log('Suite',theme,'of',selected.length,'individual checks; skipped browser-only=',skippedBrowsers.length);
for(const {filename} of selected){
 if(/browser|navegador/.test(filename)){console.log('Requires manual browser workflow:',filename);continue;}
 console.log('RUN',filename);
 cp.execFileSync(process.execPath,[path.join(dir,filename)],{cwd:path.join(dir,'..'),stdio:'inherit',timeout:300000});
}
if(skippedBrowsers.length)console.log('Browser suites remain explicitly available as independent manual workflows.');
