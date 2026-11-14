'use strict';
const assert=require('node:assert/strict');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {launchPage}=require('./estocastic-1eso-playwright-helper.cjs');

const root=path.resolve(__dirname,'..');
const pages=[
  ['poligons','poligons-frequencies-1r-eso.html',['que','coordenades','eixos','llegir','segments','estrategia']],
  ['mitjana','mitjana-aritmetica-1r-eso.html',['definicio','calcular','suma','manquant','taula','interpretar']],
  ['mediana','mediana-1r-eso.html',['definicio','senar','parell','posicions','mitjana','estrategia']],
  ['moda','moda-1r-eso.html',['definicio','comptar','taula','qualitativa','multiples','canvi']],
  ['probabilitat','probabilitat-1r-eso.html',['atzar','espai','qualitativa','laplace','contextos','experimental']]
];

(async()=>{
  const {browser,page,engine,errors}=await launchPage();
  try{
    let checked=0;
    for(const [topic,file,anchors] of pages){
      const url=pathToFileURL(path.join(root,'1eso','teoria','estocastic',file)).href;
      const html=await require('node:fs/promises').readFile(path.join(root,'1eso','teoria','estocastic',file),'utf8');
      const ids=new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map(m=>m[1]));
      const nav=[...html.matchAll(/href=["']#([^"']+)["']/g)].map(m=>m[1]);
      assert.ok(anchors.length>0,topic+' anchors inventoried');
      for(const id of anchors){
        assert.ok(ids.has(id),topic+' anchor exists: #'+id);
        await page.goto(url+'#'+id,{waitUntil:'load'});
        assert.equal(await page.evaluate(()=>location.hash),'#'+id,topic+' direct URL hash '+id);
        assert.ok(await page.locator('#'+id).isVisible(),topic+' direct anchor visible '+id);
        checked++;
      }
      assert.ok(nav.length>0,topic+' quick-nav links exist');
      for(const target of nav)assert.ok(ids.has(target),topic+' quick-nav target exists: #'+target);
      await page.goto(url+'#'+anchors[0],{waitUntil:'load'});
      await page.evaluate(()=>{window.__hashChanges=0;window.addEventListener('hashchange',()=>window.__hashChanges++);});
      const next=nav.find(id=>id!==anchors[0]);
      assert.ok(next,topic+' alternate quick-nav target');
      await page.locator('.quick-nav a[href="#'+next+'"]').click();
      assert.equal(await page.evaluate(()=>location.hash),'#'+next,topic+' hashchange destination');
      assert.ok(await page.locator('#'+next).isVisible(),topic+' hashchange destination visible');
      assert.ok(await page.evaluate(()=>window.__hashChanges>0),topic+' hashchange event fired');
      const practiceLink=page.locator('a[href*="sentit-estocastic.html?tema='+topic+'"]').first();
      assert.ok(await practiceLink.count(),topic+' return-to-practice link');
      const practiceHref=await practiceLink.getAttribute('href');
      const practiceUrl=new URL(practiceHref,page.url());
      assert.ok(practiceUrl.pathname.endsWith('/1eso/sentit-estocastic.html')&&practiceUrl.searchParams.get('tema')===topic,topic+' return-to-practice URL '+practiceUrl.href);
      await page.goto(practiceUrl.href,{waitUntil:'load'});
      assert.ok(page.url().includes('tema='+topic),topic+' practice route loads');
    }
    assert.deepEqual(errors,[],'no JavaScript page errors');
    console.log(JSON.stringify({result:'PASS',browser:engine,theoryPages:pages.length,directAnchorChecks:checked,hashchangeChecks:pages.length,practiceRouteChecks:pages.length,practiceLinkClicks:'blocked by Chromium file-origin navigation policy',pageErrors:errors},null,2));
  }finally{await browser.close();}
})().catch(e=>{console.error(e.stack||e);process.exitCode=1;});
