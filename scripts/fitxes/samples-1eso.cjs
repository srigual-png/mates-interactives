/* Executa des de l'arrel: node scripts/fitxes/test.cjs */
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert');
const {chromium}=require('C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=process.cwd();
const server=http.createServer((req,res)=>{const f=path.join(root,decodeURIComponent(req.url.split('?')[0]));if(!f.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.readFile(f,(err,data)=>{if(err){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.ttf':'font/ttf'})[path.extname(f)]||'application/octet-stream');res.end(data);});});
(async()=>{
  await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
  const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
  try{
    const page=await browser.newPage(),errors=[],requests=[];page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
    await page.goto(origin+'/1eso/sentit-numeric.html');await page.waitForSelector('#ws-generate');
    assert(!requests.some(s=>s.includes('/vendor/fitxes/')),'Les dependències han de ser diferides');
    await page.addScriptTag({url:origin+'/assets/js/fitxes/export.js'});
    const folder=path.join(root,'output/fitxes-revisio-1eso');fs.mkdirSync(folder,{recursive:true});
    const manifest=[];
    for(const [group,topics] of [['single',['mcmmcd']],['mixed',['ops','potencies','decimals']]])for(const worksheetType of ['standard','extension']){
      const data=await page.evaluate(async({topics,worksheetType})=>{
        const old=Math.random;let seed=4099;Math.random=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);
        let sheet;try{sheet=await MIWorksheets.generate({count:10,topics,worksheetType,order:'grouped',space:'compact',format:'both',solutions:'steps'},MIWorksheetConfig.topics);}finally{Math.random=old;}
        const files=await MIWorksheetExport.create(sheet,MIWorksheetConfig);
        return {sheet,files:await Promise.all(files.map(async f=>({name:f.name,kind:f.kind,data:Array.from(new Uint8Array(await f.blob.arrayBuffer()))})))};
      },{topics,worksheetType});
      const prefix=group+'-'+worksheetType+'-';
      for(const file of data.files)fs.writeFileSync(path.join(folder,prefix+file.name),Buffer.from(file.data));
      const model=prefix+'model.json';fs.writeFileSync(path.join(folder,model),JSON.stringify(data.sheet,null,2));
      manifest.push({group,worksheetType,model,prefix,version:data.sheet.version,topics,count:10,reasoning:data.sheet.questions.filter(q=>q.challenge).length,families:[...new Set(data.sheet.questions.map(q=>q.family))],files:data.files.map(f=>prefix+f.name)});
    }
    fs.writeFileSync(path.join(folder,'manifest.json'),JSON.stringify(manifest,null,2));assert.deepEqual(errors,[]);console.log(JSON.stringify(manifest,null,2));
  }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
