const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const root=path.resolve(__dirname,'..');let pages=0,scripts=0;
for(let c=1;c<=4;c++)for(const f of fs.readdirSync(path.join(root,c+'eso')).filter(f=>/^sentit-.*\.html$/.test(f))){
 const file=c+'eso/'+f,s=fs.readFileSync(path.join(root,file),'utf8');pages++;
 assert(!/toggleUnlockPanel|isTopicUnlocked\(|isUnlocked\(|state\.unlocked|ST\.unlocked|topic-card locked|badge-locked|🔒/.test(s),file);
 assert(!/desbloque|tema bloquejat|blocs bloquejats/i.test(s),file);
 assert.equal((s.match(/src="[^"\n]*analitica-mi\.js"/g)||[]).length,1,file+' shared analytics loader');
 assert(!/resetProgress|disarmReset|btnReset|Reiniciar progrés/.test(s),file+' obsolete reset removed');
 assert(/examen-tema\.js/.test(s),file+' topic exams');
 assert(/Remove obsolete access fields/.test(s),file+' legacy migration');
 for(const m of s.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g))if(!/\bsrc=/.test(m[1])){new vm.Script(m[2],{filename:file});scripts++;}
}
assert(/https:\/\/srigual\.goatcounter\.com\/count/.test(fs.readFileSync(path.join(root,'assets/js/analitica-mi.js'),'utf8')),'analytics endpoint');
assert.equal(pages,20);console.log(JSON.stringify({pages,scripts,syntax:true,noLocks:true,analytics:true,noReset:true}));
