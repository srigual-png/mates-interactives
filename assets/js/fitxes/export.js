/* Un únic model de contingut per a OOXML editable i PDF amb font incrustada. */
(function () {
  'use strict';
  const base=new URL('../../vendor/fitxes/',document.currentScript.src),scripts=new Map();
  function load(name,global){
    if(window[global])return Promise.resolve(window[global]);
    if(!scripts.has(name))scripts.set(name,new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=new URL(name,base);s.onload=()=>resolve(window[global]);s.onerror=()=>{scripts.delete(name);s.remove();reject(new Error('No s’ha pogut carregar '+name+'. Comprova la connexió i reintenta.'));};document.head.append(s);}));
    return scripts.get(name);
  }
  let fontBytes;
  async function fontData(){if(!fontBytes){const r=await fetch(new URL('LiberationSans-Regular.ttf',base));if(!r.ok)throw new Error('No s’ha pogut carregar la font del document.');fontBytes=await r.arrayBuffer();}return fontBytes;}
  const normalize=s=>String(s).replace(/([0-9)])\s*x\s*(?=[0-9([])/g,'$1 × ').replace(/([0-9]+)²/g,'$1^2').replace(/([0-9]+)³/g,'$1^3').replace(/\s*\/\s*(?=\d+\/\d+)/g,' ÷ ');
  function tokens(text){
    const parts=normalize(text).split(/(\d+\/\d+|\d+\^\d+|√\d+|\s+)/).filter(Boolean);
    return parts.map(s=>{if(/^\d+\/\d+$/.test(s))return {kind:'fraction',parts:s.split('/')};if(/^\d+\^\d+$/.test(s))return {kind:'power',parts:s.split('^')};if(/^√\d+$/.test(s))return {kind:'root',parts:[s.slice(1)]};return {kind:'text',text:s};});
  }
  function blocks(sheet,scope,solution){
    let last='';return sheet.questions.map(q=>{
      const title=sheet.config.order==='grouped'&&last!==q.topicId?q.topicName:'';last=q.topicId;
      const lines=solution?(sheet.config.solutions==='steps'?[`${q.number}. ${q.question}`,...q.options.map((s,i)=>String.fromCharCode(97+i)+') '+s),...q.steps,`Resposta: ${q.answer}`]:[`${q.number}. ${q.answer}`]):[`${q.number}. ${q.question}`,...q.options.map((s,i)=>String.fromCharCode(97+i)+') '+s)];
      return {title,lines,space:solution?14:{compact:28,normal:65,wide:115}[sheet.config.space]};
    });
  }
  function width(t,font,size=11){if(t.kind==='text')return font.widthOfTextAtSize(t.text.replace(/\n/g,''),size);if(t.kind==='fraction')return Math.max(...t.parts.map(s=>font.widthOfTextAtSize(s,9)))+6;if(t.kind==='power')return font.widthOfTextAtSize(t.parts[0],size)+font.widthOfTextAtSize(t.parts[1],8)+1;return font.widthOfTextAtSize('√'+t.parts[0],size)+3;}
  function wrap(text,font){
    const lines=[];let line=[],used=0;
    for(const t of tokens(text)){
      if(t.kind==='text'&&t.text.includes('\n')){if(line.length)lines.push(line);line=[];used=0;continue;}
      const w=width(t,font);
      if(used+w>475&&line.length){lines.push(line);line=[];used=0;}
      if(!line.length&&t.kind==='text'&&/^\s+$/.test(t.text))continue;
      line.push(t);used+=w;
    }if(line.length)lines.push(line);return lines;
  }
  function paginate(content,font){
    const pages=[[]];let remaining=650;
    for(const b of content){
      const lines=b.lines.flatMap(s=>wrap(s,font)),height=lines.length*25+b.space+(b.title?30:0);
      if(height>650)throw new Error('Aquest exercici és massa llarg per a una pàgina A4. Selecciona menys espai de resposta.');
      if(height>remaining&&pages.at(-1).length){pages.push([]);remaining=650;}
      pages.at(-1).push({...b,wrapped:lines,height});remaining-=height;
    }return pages;
  }
  function drawToken(page,t,x,y,font){
    const text=(s,xx,yy,size)=>page.drawText(s,{x:xx,y:yy,size,font});
    const w=width(t,font);
    if(t.kind==='text')text(t.text,x,y,11);
    else if(t.kind==='fraction'){
      text(t.parts[0],x+(w-font.widthOfTextAtSize(t.parts[0],9))/2,y+5,9);
      text(t.parts[1],x+(w-font.widthOfTextAtSize(t.parts[1],9))/2,y-7,9);
      page.drawLine({start:{x:x+1,y:y+2},end:{x:x+w-1,y:y+2},thickness:.6});
    }else if(t.kind==='power'){text(t.parts[0],x,y,11);text(t.parts[1],x+font.widthOfTextAtSize(t.parts[0],11),y+5,8);}
    else {text('√'+t.parts[0],x,y,11);page.drawLine({start:{x:x+7,y:y+11},end:{x:x+w-2,y:y+11},thickness:.5});}
    return w;
  }
  async function pdf(sheet,scope,solution,doc,font,pages){
    doc.setTitle((solution?'Solucionari — ':'')+scope.title);doc.setAuthor('Mates Interactives');doc.setSubject('Versió '+sheet.version);
    pages.forEach((items,i)=>{
      const p=doc.addPage([595.28,841.89]);
      p.drawText('Mates Interactives',{x:60,y:800,size:12,font});
      p.drawText(solution?'Solucionari — 1r d’ESO — Sentit numèric':scope.title,{x:60,y:777,size:14,font});
      p.drawText('Versió '+sheet.version+(solution?' · '+(sheet.config.solutions==='steps'?'Resolució pas a pas':'Només respostes'):' · Nom: ____________________  Grup: ______  Data: __________'),{x:60,y:755,size:9,font});
      let y=716;
      items.forEach(b=>{if(b.title){p.drawText(b.title,{x:60,y,size:12,font});y-=30;}
        b.wrapped.forEach(line=>{let x=60;line.forEach(t=>x+=drawToken(p,t,x,y,font));y-=25;});y-=b.space;
      });
      p.drawText(scope.web+' · '+sheet.version,{x:60,y:30,size:8,font});p.drawText(`${i+1} / ${pages.length}`,{x:503,y:30,size:8,font});
    });
    return new Blob([await doc.save()],{type:'application/pdf'});
  }
  function wordRuns(text,d){return tokens(text).map(t=>{
    if(t.kind==='text')return new d.TextRun({text:t.text,font:'Arial',size:22});
    const runs=s=>[new d.MathRun(s)];
    const child=t.kind==='fraction'?new d.MathFraction({numerator:runs(t.parts[0]),denominator:runs(t.parts[1])}):t.kind==='power'?new d.MathSuperScript({children:runs(t.parts[0]),superScript:runs(t.parts[1])}):new d.MathRadical({children:runs(t.parts[0])});
    return new d.Math({children:[child]});
  });}
  async function word(sheet,scope,solution,d,pages){
    const para=(text,opts={})=>new d.Paragraph({children:wordRuns(text,d),spacing:{after:100,line:340},...opts});
    const children=[];
    pages.forEach((items,i)=>{
      if(i)children.push(new d.Paragraph({children:[new d.PageBreak()],spacing:{after:0,before:0}}));
      items.forEach(b=>{
        if(b.title)children.push(para(b.title,{heading:d.HeadingLevel.HEADING_2,keepNext:true}));
        b.lines.forEach(s=>children.push(para(s,{keepNext:true,keepLines:true})));
        children.push(new d.Paragraph({children:[new d.TextRun(' ')],spacing:{after:0,line:Math.max(240,b.space*20)},keepLines:true}));
      });
    });
    const header=new d.Header({children:[para('Mates Interactives',{spacing:{after:70}}),para(solution?'Solucionari — 1r d’ESO — Sentit numèric':scope.title,{style:'Title',spacing:{after:90}}),para('Versió '+sheet.version+(solution?' · '+(sheet.config.solutions==='steps'?'Resolució pas a pas':'Només respostes'):' · Nom: __________________  Grup: _____  Data: __________'),{spacing:{after:0}})]});
    const footer=new d.Footer({children:[new d.Paragraph({children:[new d.TextRun({text:scope.web+' · '+sheet.version+'     ',size:16}),new d.TextRun({children:[d.PageNumber.CURRENT,' / ',d.PageNumber.TOTAL_PAGES],size:16})]})]});
    const document=new d.Document({creator:'Mates Interactives',title:(solution?'Solucionari — ':'')+scope.title,description:'Versió '+sheet.version,styles:{default:{document:{run:{font:'Arial',size:22},paragraph:{spacing:{after:100}}}}},sections:[{properties:{page:{size:{width:11906,height:16838},margin:{top:2400,right:1200,bottom:1000,left:1200,header:500,footer:450}}},headers:{default:header},footers:{default:footer},children}]});
    return d.Packer.toBlob(document);
  }
  async function create(sheet,scope){
    const [lib,kit]=await Promise.all([load('pdf-lib.js','PDFLib'),load('fontkit.js','fontkit')]);
    const d=sheet.config.format!=='pdf'?await load('docx.js','docx'):null,bytes=await fontData(),files=[];
    for(const solution of (sheet.config.solutions==='none'?[false]:[false,true])){
      const doc=await lib.PDFDocument.create();doc.registerFontkit(kit);const font=await doc.embedFont(bytes,{subset:true});
      const content=blocks(sheet,scope,solution),pages=paginate(content,font),stem=(solution?'solucionari':'fitxa')+'-1eso-numeric-'+sheet.version;
      for(const format of (sheet.config.format==='both'?['docx','pdf']:[sheet.config.format])){
        const blob=format==='docx'?await word(sheet,scope,solution,d,pages):await pdf(sheet,scope,solution,doc,font,pages);
        files.push({blob,name:stem+'.'+format,label:(solution?'Solucionari':'Fitxa')+' · '+(format==='docx'?'Word (.docx)':'PDF'),kind:(solution?'solutions-':'worksheet-')+format});
      }
    }return files;
  }
  window.MIWorksheetExport={create,blocks,tokens};
})();

