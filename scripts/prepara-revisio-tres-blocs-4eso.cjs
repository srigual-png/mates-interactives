const fs=require('fs'),assert=require('assert/strict');
const census=JSON.parse(fs.readFileSync('docs/dificultats/auditoria-global-mostres-punt2.json')).blocks;
// Decisió manual per tipus, després de llegir enunciats, generadors i solucions.
// Cada entrada declara els tipus mitjans; la resta són procediments directes baixos.
const specs={
algebraic:{
patrons4t:[[1,2,3],'Reconstruir terme general o model des de successió, context o taula. La pendent amb dos punts i terme independent explícit és una substitució directa.'],
equacions2g4t:[[3,4,6,8,9,10],'Resoldre una quadràtica completa, reconstruir-la des de les arrels o formular el model d’àrea/producte. Incompletes i comprovació per substitució són directes.'],
sistemes4t:[[1,2,3,4,5,7,8,9],'Coordinar dues relacions, triar eliminació/substitució, classificar compatibilitat o formular un sistema contextual.'],
inequacions4t:[[9,10],'Relacionar una regió amb la desigualtat o formular el límit pressupostari. Les transformacions conegudes i els intervals són directes.'],
funcionsRep4t:[[7,12],'Inferir família a partir d’una taula o invertir la correspondència. Lectura, substitució, domini explícit i gràfic de família coneguda són directes.'],
linealsQuad4t:[[3,6,10,11],'Reconstruir recta/gràfic, connectar diferències de taula o comparar dues tarifes. Paràmetres visibles, arrels factoritzades i vèrtex explícit són directes.'],
inversaExp4t:[[1,3,5,7,9,10,12],'Reconstruir model o paràmetres, aplicar creixement sobre bases successives o comparar dos models. Avaluar la fórmula i reconèixer la família gràfica és directe.'],
analisiFunc4t:[[7,8,9,11,12],'Inferir model, comparar/intersectar expressions o coordinar intervals de creixement i justificació contextual. Propietats de forma canònica són directes.'],
polinomisAmpA:[[],'Avaluació, operacions, factor comú, identitats i factorització coneguda; aplicar arrel-factor i producte nul. L’ampliació no converteix el procediment en alta.'],
equacionsAdvAmpB:[[2,3,5,6,10],'Coordinar denominadors o transformacions, controlar el domini i les solucions estranyes, o modelitzar períodes de creixement. Inversió directa d’arrel/potència és baixa.'],
parametresAmpC:[[6,7,8,9],'Seleccionar tram i avaluar-lo, imposar unió sense salt o construir tarifa acumulada. Recuperar un paràmetre amb un punt és substitució directa.'],
inequacionsCompAmpD:[[1,2,5,7,10],'Coordinar restriccions, formular regió factible, detectar actualització additiva incorrecta o comparar sumes de tres rutes explícites. No hi ha cerca no immediata d’un camí.']},
espacial:{
figures4t:[[8,9,10],'Relacionar tres costats amb el tipus angular o reconstruir la base del prisma des dels vèrtexs i obtenir arestes/cares. Angles i propietats conegudes són directes.'],
vectors4t:[[],'Definicions de vector, sentit, oposat i equipol·lència, o lectura directa de desplaçament/longitud a la quadrícula.'],
components4t:[[7,8],'Reconstruir component des del mòdul i signe o comparar dos mòduls per quadrats. Components i fórmula de mòdul explícites són directes.'],
operacionsVectors4t:[[7,10],'Coordinar producte escalar i suma o reconstruir el tercer vector d’un recorregut tancat. Operació única i lectura de suma gràfica són directes.'],
coordenadesVectors4t:[[4,5,6,7,9,10],'Connectar coordenades i relacions de paral·lelogram, paral·lelisme/alineació o comparar distàncies. Fórmules de distància i punt mitjà són directes.'],
homotecies4t:[[2,3,4,9,10],'Coordinar centre no nul i desplaçament, invertir transformació o reconstruir raó. Escalat des de l’origen, longitud, perímetre i àrea són directes.'],
geometriaFuncions4t:[[],'Lectura de pendent/intersecció o aplicació de propietats i regles conegudes de recta, paràbola i transformació.'],
regions4t:[[3,8,10],'Resoldre intersecció o coordinar dues condicions de regió. Un semiplà, frontera o substitució directa és baixa.'],
rectesAmpA:[[2,3,10],'Reconstruir recta amb punt/pendent o dos punts. Llegir formes i convertir expressió amb procediment conegut és baix. És curricular B quan així ho declara el tema.'],
elementsRectaAmpB:[[],'Identificar pendent, director, normal i ordenada, aplicar fórmula de pendent o comprovar pertinença. Procediments coneguts encara que siguin ampliació.'],
posicioRectesAmpC:[[2,5],'Comparar proporcionalitat de coeficients o resoldre la intersecció. Pendent igual, reciprocitat negativa i rectes verticals/horitzontals són directes.'],
geometriaAnaliticaAmpD:[[1,2,3,5,6,8,9,10],'Coordinar direcció i punt, punt mitjà i recta, intersecció i distància o reconstruir diagonal. Translació, gir i lectura d’angle de dos desplaçaments ortogonals són procediments coneguts. Curricular B, opcional A.']},
estocastic:{
dadesVariables4t:[[],'Identificar variable, població, mostra i definicions o calcular rang/complement directament.'],
taulesRepresentacions4t:[[7,9],'Valorar distorsió d’eix truncat o agregar dues files i comparar totals. Lectures de freqüència/percentatge i elecció de gràfic són directes.'],
comparacioDistribucions4t:[[6,7,9,10],'Valorar robustesa/outliers, comparar dispersions o obtenir mediana parella. Lectures de mitjana/mediana i diferències explícites són directes.'],
estudisMostreig4t:[[3,4,7,8,9,10],'Analitzar biaix, representativitat, límits de la conclusió i disseny de l’estudi. Definicions i identificació explícita de mostreig són baixes.'],
nuvolsRelacio4t:[[4,8,9],'Coordinar intensitat i signe o valorar plausibilitat d’una associació contextual. Lectura directa de tendència, punt i valor atípic és baixa.'],
regressioPrediccions4t:[[5,6,7,8,9],'Valorar límits d’extrapolació, adequació del model, causalitat o comparar prediccions. Substituir en recta i llegir paràmetre és baix.'],
espaiMostralRecompte4t:[[7,9],'Organitzar resultats de dos daus amb suma fixada o triar pla d’estimació experimental. Recompte per producte i probabilitat simple són baixos.'],
experimentsCompostos4t:[[1,2,3,4,6,7,8],'Coordinar dos resultats, productes condicionats o comparar jocs. Definicions de reposició i probabilitat de la primera extracció són baixes.'],
contingenciaBatx4t:[[5,6,8],'Seleccionar població de referència condicionada o comparar percentatges amb bases diferents. Cel·la, marginal i percentatge del total són directes.'],
correlacioBatx4t:[[5,6,7,10],'Valorar límits de r, relació no lineal, efecte d’atípics i causalitat. Interpretar signe/intensitat explícits és baix.'],
condicionadaBatx4t:[[1,2,8,9,10],'Restringir el denominador, actualitzar composició o contrastar intersecció amb producte marginal. Notació i regla explícita d’independència són baixes.'],
bayesBatx4t:[[2,3,4,5,6,9,10],'Reconstruir base dels positius, combinar casos/complement o valorar taxa base i probabilitat inversa. Definició i fórmula combinatòria explícita són baixes; el curs Batx no implica alta.']}
};
for(const [sense,spec] of Object.entries(specs)){
const source=census.find(b=>b.course==='4eso'&&b.sense===sense),topics=[];
assert.deepEqual(Object.keys(spec).sort(),source.topics.map(t=>t.id).sort());
for(const t of source.topics){const [medium,reason]=spec[t.id];assert(medium.every(n=>t.types.some(r=>r.type===String(n))));for(const row of t.types)topics.push({topic:t.id,type:Number(row.type),level:medium.includes(Number(row.type))?2:1,reason,previous:row.levels||[],samples:row.variants.map(v=>v.question)});}
if(sense==='algebraic')for(const type of [3,4])topics.find(r=>r.topic==='equacions2g4t'&&r.type===type).variants={incomplete:{level:1,reason:'Amb coeficient lineal o terme independent nul, la branca és una equació incompleta de resolució directa.'}};
fs.writeFileSync(`docs/dificultats/revisio-4eso-${sense}-punt3.json`,JSON.stringify({course:'4eso',sense,status:'reclassified-with-gaps',topics,banks:[],...(sense==='estocastic'?{examPlans:{espaiMostralRecompte4t:[10,2,0],experimentsCompostos4t:[3,9,0]}}:{}),note:'Revisió de tots els tipus, incloses ampliacions, per demanda matemàtica. Sense altes artificials. Es conserven àmbit curricular, A/B i exclusions d’examen del tema original. Espai mostral té només dos enunciats mitjans diferents: quota 10/2/0.'},null,2)+'\n');
console.log(sense,topics.length,[1,2,3].map(n=>topics.filter(t=>t.level===n).length));}
