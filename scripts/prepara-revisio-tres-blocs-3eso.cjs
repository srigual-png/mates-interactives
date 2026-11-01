const fs=require('fs'),assert=require('assert/strict');
const census=JSON.parse(fs.readFileSync('docs/dificultats/auditoria-global-mostres-punt2.json')).blocks;
function build(sense,spec,variants={}){
 const source=census.find(b=>b.course==='3eso'&&b.sense===sense),topics=[];
 for(const [topic,groups] of Object.entries(spec))for(const [level,types,reason] of groups)for(const type of types){const old=source.topics.find(t=>t.id===topic)?.types.find(r=>r.type===String(type));assert(old,topic+':'+type);topics.push({topic,type,level,reason,previous:old.levels||[],samples:old.variants.map(v=>v.question),...(variants[topic+':'+type]?{variants:variants[topic+':'+type]}:{})});}
 for(const t of source.topics)assert.deepEqual(topics.filter(r=>r.topic===t.id).map(r=>String(r.type)).sort(),t.types.map(r=>r.type).sort(),'Cens '+t.id);
 fs.writeFileSync(`docs/dificultats/revisio-3eso-${sense}-punt3.json`,JSON.stringify({course:'3eso',sense,status:'reclassified-with-gaps',topics,banks:[],...(sense==='espacial'?{examPlans:{mosaics:[11,1,0]}}:{}),note:'Revisió explícita de tots els tipus i branques de demanda diferent. Procediments coneguts i models estàndard no són alts pel nombre de passos. Les ampliacions conserven el curs de contingut. Cal completar la cobertura alta amb famílies noves.'},null,2)+'\n');
 console.log(sense,topics.length,[1,2,3].map(n=>topics.filter(r=>r.level===n).length));
}
const all8=[1,2,3,4,5,6,7,8],all10=[1,2,3,4,5,6,7,8,9,10];
build('algebraic',{
 patrons:[[1,[1,4,6],'Continuar una pauta simple, reconèixer aritmètica/geomètrica o invertir una fórmula lineal explícita.'],[2,[2,3,5,7,8],'Deduïr diferència/raó i passar a terme llunyà o general, identificar pauta quadràtica o modelitzar la successió d’un context.']],
 expressions:[[1,[1,2,3,4,5,6,7],'Traducció verbal immediata, substitució, grau, reducció de termes o distributiva coneguda; els signes no fan pujar el nivell.'],[2,[8],'Relacionar costats d’un rectangle, fórmula de perímetre i expressió reduïda.']],
 identitats:[[1,all8,'Reconèixer, completar o aplicar directament una identitat notable; àrea d’un quadrat amb costat explícit és la mateixa fórmula.']],
 factoritzacio:[[1,all8,'Extreure factor comú o reconèixer una identitat notable estàndard, inclosa la lectura de lots ja descrits.']],
 equacions2:[[1,[1,2,6],'Resoldre equació incompleta coneguda o comprovar un candidat per substitució.'],[2,[3,4,5,7,8],'Connectar factorització i arrels, reconstruir equació o modelitzar rectangle/nombres consecutius i interpretar la solució.']],
 sistemes:[[1,[1,5],'Sistema suma/diferència amb eliminació immediata o comprovació directa d’una parella.'],[2,[2,3,4,6,7,8],'Coordinar equacions per substitució/reducció, comparar compatibilitat o formular i resoldre un model estàndard.']],
 funcions:[[1,[1,2,3,4,6,7,8],'Definició de funció, variables, substitució, lectura de punts/domni/recorregut o interpretació directa de tarifa.'],[2,[5],'Reconstruir pendent i terme independent a partir d’una taula.']],
 funcions8:[[1,[1,2,3,4,6,7],'Reconèixer coeficients o tipus de fórmula, escriure recta amb dades explícites o substituir en proporcionalitat.'],[2,[5,8],'Relacionar variacions en una gràfica o taula per reconstruir pendent o tipus de relació.']],
 quadratica:[[1,all8,'Llegir coeficients, forma factoritzada/canònica, vèrtex, eix, obertura o extrem d’una gràfica; substitució directa.']],
 inequacionsA:[[1,[1,2,3,4,5,8],'Procediment conegut de desigualtats, canvi de signe o traducció interval/desigualtat. Contingut de 4t.'],[2,[6,7],'Intersecar condicions o modelitzar límit de pressupost. Contingut de 4t.']],
 discriminantB:[[1,[1,2,4,5,8],'Aplicar discriminant i interpretar-ne signe, arrel doble o absència de solucions. Contingut de 4t.'],[2,[3,6,7],'Coordinar fórmula general i dos signes, relacionar zeros amb gràfic o reconstruir coeficient per arrel doble. Contingut de 4t.']],
 sistemesC:[[2,all8,'Resoldre sistemes amb passos connectats o formular models habituals de tarifes, compres, edats i recursos. Contingut de 4t; model estàndard.']],
 grafiquesD:[[1,[1,2,4,7,8],'Lectura directa de zeros, vèrtex, extrem, domini dibuixat o tram horitzontal. Contingut de 4t.'],[2,[3,5,6],'Relacionar trams de monotonia, comparar pendents o coordinar dues rectes per llegir la solució. Contingut de 4t.']]
},{
 'patrons:2':{difference:{level:1,reason:'Només es demana una resta entre termes consecutius.'}},
 'patrons:5':{ratio:{level:1,reason:'Només es demana el quocient constant entre dos termes.'}},
 'patrons:7':{recursive:{level:1,reason:'Continuar la suma dels dos termes anteriors és una pauta immediata.'}},
 'equacions2:3':{incomplete:{level:1,reason:'Els coeficients aleatoris donen una equació incompleta: extracció directa d’arrel o factor x.'}},
 'equacions2:4':{incomplete:{level:1,reason:'Malgrat el nom del tipus, falta el terme lineal o independent: procediment directe d’equació incompleta.'}},
 'expressions:8':{tariff:{level:1,reason:'Traducció directa de quota fixa més cost unitari, sense reconstruir magnituds.'}}
});
build('espacial',{
 translacions:[[1,[1,2,3,4,5,6,8,9],'Aplicar o invertir suma de coordenades, identificar vector/regla o propietat rígida.'],[2,[7,10],'Compondre vector repetit i punt inicial o contrastar dos vectors per verificar la mateixa translació.']],
 girs:[[1,[1,2,3,4,5,6,8,10],'Aplicar regles de gir, reconèixer gir equivalent o recuperar centre amb punt mig.'],[2,[7,9],'Compondre girs o desplaçar el referent per un centre diferent de l’origen.']],
 simetriaAxial:[[1,[1,2,7,8,9,10],'Regla d’eix coordenat, vèrtex indicat, punt fix o propietats i eixos d’una figura coneguda.'],[2,[3,4,5,6],'Relacionar distàncies a un eix desplaçat o reconstruir la mediatriu a partir de dues imatges.']],
 simetriaCentral:[[1,[1,3,4],'Regla respecte de l’origen, punt mig o equivalència amb mitja volta.'],[2,[2,5,6,7,8,9,10],'Centre desplaçat o composició ordenada de transformacions; procediment estàndard.']],
 mosaics:[[1,[1,2,3,4,6,7,8,9,10],'Reconèixer tesel·lació regular, completar 360°, dividir angle o llegir translació del motiu.'],[2,[5],'Relacionar nombre de costats amb diversos angles i contrastar configuracions.']],
 transformacionsCoord:[[1,[1,2,3,4,5,7,8,9],'Aplicar/reconèixer regla de coordenades, inversa o isometria directa.'],[2,[6,10],'Compondre dues o tres regles en l’ordre indicat.']],
 geoAlgebra:[[1,[1,2,3,4,5,6,7,8,9,10],'Aplicar identitats, productes, factor comú, perímetre o substituir costats explícits.']],
 visualitzacio:[[1,all10,'Llegir intersecció o propietats de rectes, aplicar regla explícita de successió, comprovar punt en funció, eix de paràbola o nombre figurat conegut.']],
 ampliacioA:[[1,[4,10],'Suma de vectors o reconèixer composició de translacions. Ampliació.'],[2,[1,2,3,5,6,7,8,9],'Aplicar/desfer seqüència ordenada o contrastar seqüències que arriben a una imatge. Ampliació.']],
 ampliacioB:[[1,[2,4,6,7,8,9,10],'Propietats de fris, notació o suma d’angles donats/regulars coneguts. Ampliació.'],[2,[1,3,5],'Relacionar diverses peces i angles interiors per verificar o completar configuració. Ampliació.']],
 ampliacioC:[[1,[1,2,7,8,9,10],'Reconèixer invariants d’isometries o identitat després de volta completa. El títol investiga no converteix una propietat coneguda en alta.'],[2,[3,4,5,6],'Reconstruir eix o coordinar reflexions/translacions repetides. Ampliació.']],
 ampliacioD:[[1,[1,3,4,5,6,7,8,10],'Regla directa d’homotècia, raó d’àrea/perímetre, simetria diagonal, distància o punt mig. Contingut de 4t.'],[2,[2,9],'Canviar referent per centre no nul o compondre homotècies. Contingut de 4t.']]
});
build('estocastic',{
 dades3r:[[1,[1,2,3,4,5,6,7,13,14],'Reconèixer població/mostra/individu/variable o pregunta estadística.'],[2,[8,9,10,11,12],'Contrastar representativitat, biaix, mida o límits d’una conclusió.']],
 taules3r:[[1,[1,2,3,4,5,7,8,10,11,12,13,14,15,16,17,18,19,20,22],'Comptar, convertir o acumular freqüències, llegir intervals i límits o reconèixer informació perduda.'],[2,[6,9,21],'Relacionar llindar, suma i percentatge o diagnosticar incoherència d’acumulades/fronteres.']],
 grafics3r:[[1,[1,2,3,4,6,7,8,9,10,11,12],'Lectura directa d’histograma, polígon o caixa; reconèixer representació, sumar freqüències o comparar amplades.'],[2,[5],'Diagnosticar separació indeguda d’intervals a un histograma.']],
 centralitzacio3r:[[1,[1,5,6,7,10,16],'Mitjana simple, producte explícit, mediana senar, moda o propietat directa de la mesura.'],[2,[2,3,4,8,9,11,12,13,14,15],'Reconstruir valor, ponderar freqüències, coordinar posicions centrals, sensibilitat a extrems o diagnosticar un càlcul.']],
 quartils3r:[[1,[2,3,4,5,6,7,8,12,13],'Definició, RIQ, lectura de caixa i comparació directa de trams o resum.'],[2,[1,9,10,11,14],'Ordenar i coordinar posicions de quartils, acumulades o comparar dispersió i efecte d’un extrem.']],
 dispersio3r:[[1,[1,3,4,5,6,8,9,10,11,12,13,15,16,17],'Rang, suma de desviacions quadrades donades, definicions/unitats, conversió variància-desviació, CV o propietats directes.'],[2,[2,7,14],'Coordinar centre, desviacions i quadrats o ponderació; comparar dispersió relativa amb mitjanes diferents.']],
 investigacio3r:[[1,[1,2,9,18,19,20,21],'Reconèixer pregunta, població, fases, disseny de mostreig explícit o conducta ètica evident.'],[2,[3,4,5,6,7,8,10,11,12,13,14,15,16,17],'Valorar selecció, formulació, dada anòmala, no-resposta, gràfic o abast/causalitat d’una conclusió.']],
 probabilitat3r:[[1,[1,2,3,4,6,11,12,13,14,17,21],'Laplace, complement, freqüència directa o esperada, conjunts, dependència o principi multiplicatiu immediat.'],[2,[5,7,8,9,10,15,16,18,19,20,22],'Interpretar freqüències i estabilització, organitzar camins, coordinar extraccions o recompte sense repetició.']],
 ampA3r:[[1,[1,3,7,8,10,11,12],'Llegir dispersió, restar quartils o aplicar regles explícites de trasllat/escala. Ampliació.'],[2,[2,4,5,6,9,13,14],'Relacionar extrems, límits de detecció, robustesa o diversos criteris de comparació. Ampliació.']],
 ampB3r:[[1,[1,2,3,4,5,7,8,10,11,12,13],'Interpretació, complement, equivalència de quartils, posició explícita o lectura ordenada directa de percentils. Contingut de 4t.'],[2,[6,9,14],'Coordinar posició i acumulades o triar mesura per comparar escales. Contingut de 4t.']],
 ampC3r:[[1,[10,11,12],'Recompte multiplicatiu directe, independència o complement d’una branca. Ampliació.'],[2,[1,2,3,4,5,6,7,8,9,13,14],'Coordinar etapes, reposició, camins alternatius, complement o canvi de composició. Ampliació.']],
 ampD3r:[[1,[1,2,3,4,5,9,10,12],'Identificar parella, llegir tendència, intensitat o punt separat i interpretar direcció. Contingut de 4t.'],[2,[6,7,8,11,13,14],'Valorar causalitat, prudència d’una predicció i límits del patró conjunt. Contingut de 4t.']]
},{
 'dades3r:14':{sampling:{level:2,reason:'La branca valora evitar un grup específic relacionat amb l’estudi.'}},
 'investigacio3r:8':{validCount:{level:1,reason:'Només resta les respostes en blanc del total.'}},
 'probabilitat3r:16':{replacement:{level:1,reason:'Amb reposició, la segona proporció és la composició inicial.'}},
 'probabilitat3r:22':{repetition:{level:1,reason:'Amb repetició s’aplica directament la potència.'}},
 'ampC3r:9':{repetition:{level:1,reason:'Nombre fix d’opcions a totes les posicions: potència directa.'}}
});
