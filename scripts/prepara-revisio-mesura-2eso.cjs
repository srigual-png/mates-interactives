const fs=require('fs'),topics=[];const source=JSON.parse(fs.readFileSync('docs/dificultats/auditoria-global-mostres-punt2.json')).blocks.find(b=>b.course==='2eso'&&b.sense==='mesura');
function rows(topic,level,types,reason){for(const type of types){const old=source.topics.find(t=>t.id===topic)?.types.find(t=>t.type===String(type));topics.push({topic,type,level,reason,previous:old?.levels||[],samples:old?.variants.map(v=>v.question)||[]});}}
rows('unitats',1,[1,2,3,4,5,6,7,8,11,12,13,14,16,17,18],'Conversió, identificació d’unitat/factor o diagnòstic directe. El volum i el nombre de salts no creen alta.');
rows('unitats',2,[9,10,15],'Homogeneïtzar unitats abans de comparar o sumar mesures.');
rows('escales',1,[5,11,12,13,14],'Factor directe en la mateixa unitat, proporció explícita o reconeixement d’un error d’unitats.');
rows('escales',2,[1,2,3,4,6,7,8,9,10,15,16,17,18],'Connectar escala i unitats, dimensions i àrea/perímetre o reconstruir la proporció d’ombres.');
rows('pitagores',1,[1,2,3,5,9,15,16],'Teorema directe, comprovació d’igualtat de quadrats o error elemental de sumar longituds.');
topics.find(r=>r.topic==='pitagores'&&r.type===15).variants={diagonal:{level:2,reason:'Identificar el triangle rectangle dins del rectangle abans d’aplicar el teorema.'}};
rows('pitagores',2,[4,6,7,8,10,11,12,13,14],'Identificar el triangle del context o connectar Pitàgores amb àrea, perímetre, estalvi de recorregut o ancoratges.');
rows('perimetres',1,[1,2,3,4,5,6,7,12,13,14,18],'Fórmula directa o inversa estàndard, o distingir àrea i longitud.');
rows('perimetres',2,[8,9,10,11,15,16,17],'Coordinar contorns o superfícies, obtenir un radi/perímetre intermedi o excloure obertures.');
rows('superficies',1,[1,3,5,6,7,8,10,11,18],'Volum, superfície senzilla, inversa d’un producte o reconeixement de magnitud.');
rows('superficies',2,[2,4,9,12,13,14,15,16,17,19,20],'Combinar àrees de cares, calcular base intermèdia, convertir capacitat, reconstruir dimensió o connectar cos i desenvolupament pla.');
topics.find(r=>r.topic==='superficies'&&r.type===17).variants={sameBase:{level:1,reason:'Amb la mateixa base n’hi ha prou de comparar les altures; no cal calcular dos volums.'}};
rows('estimacio',1,[1,2,3,4,5,6,10,11,14,15,16,17,18],'Escala raonable, arrodoniment, error absolut o mitjana directa. No es fa alta una comparació de distàncies.');
rows('estimacio',2,[7,8,9,12,13],'Relacionar error amb la base o reconstruir els límits d’una mesura arrodonida.');
rows('problemes',1,[16,17,18,19],'Comparar errors sobre la mateixa referència, reconèixer una escala, convertir superfície o aplicar una equivalència de pluja ja donada.');
rows('problemes',2,[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,20],'Model estàndard de pintura, rajoles, volum, escala, ombra o contorn amb passos relacionats explícits.');
rows('semblanca3r',1,[1,2,3,4,5,6,7,11,12,13,14],'Aplicació directa de k, k² o k³ o inversió de la relació coneguda.');
rows('semblanca3r',2,[8,9,10],'Obtenir primer àrea o factor i transferir-lo a una magnitud diferent.');
rows('talesPitagores3r',2,[2,4,6,7,9,11,12,13,14],'Coordinar semblança explícita i triangle rectangle o contrastar un plantejament proposat.');
rows('talesPitagores3r',3,[1,3,5,8,10],'Construir dos models geomètrics a partir del context: inferir altura per ombres i escollir després els catets adequats del cable o trajecte.');
rows('piramidesCons3r',1,[1,2,4,7,8,13,14],'Fórmula de volum/superfície lateral, inversió directa o relació coneguda d’un terç.');
rows('piramidesCons3r',2,[3,5,6,9,10,11,12],'Obtenir base/perímetre intermedi, sumar superfícies o reconstruir una dimensió mitjançant fórmula i arrel.');
rows('reptesMesura3r',1,[11,12,16],'Unitats comunes, factor cúbic invers conegut o detectar que un percentatge no pot superar la capacitat total.');
rows('reptesMesura3r',2,[1,2,3,4,5,7,8,9,10,13,14],'Coordinar unitats, proporció, àrea, volum, cost o dades excloses; el títol «repte» no eleva la tasca.');
rows('reptesMesura3r',3,[6,15],'Escollir i connectar models d’ombres/Pitàgores o reconstruir generatriu per calcular tota la superfície del con.');
for(const t of source.topics){const ids=topics.filter(r=>r.topic===t.id).map(r=>String(r.type)).sort(),observed=t.types.map(r=>r.type).sort();if(JSON.stringify(ids)!==JSON.stringify(observed))throw Error('Cens no coincideix: '+t.id);}
fs.writeFileSync('docs/dificultats/revisio-2eso-mesura-punt3.json',JSON.stringify({course:'2eso',sense:'mesura',status:'reclassified-with-gaps',topics,banks:[],note:'186 tipus incloses quatre ampliacions. Les altes revisades d’ampliació no es traslladen als exàmens ordinaris de 2n; els buits ordinaris continuen explícits.'},null,2)+'\n');
