// Registre explícit de decisions després de llegir els generadors i les variants.
const fs=require('fs');
const topics=[],banks=[];
function rows(topic,level,types,reason){for(const type of types)topics.push({topic,type,level,reason});}
rows('metric',1,[1,2,3],'Conversió directa. El nombre de salts no afegeix decisions matemàtiques.');
rows('conversions',1,[1,4],'Aplicar un factor conegut, també en superfície o dins un context.');
rows('conversions',2,[2,3],'Homogeneïtzar mesures i sumar o contrastar equivalència.');
rows('temps',1,[1,4,5],'Conversió o descomposició directa del sistema sexagesimal.');
rows('temps',2,[2,3],'Coordinar hora inicial, durada i canvi de representació.');
rows('perimetres',1,[1,2,3,4,6],'Aplicar el perímetre conegut; π i el nombre de costats no creen alta.');
rows('perimetres',2,[5],'Reconstruir el contorn de la L i relacionar trams retirats i afegits.');
rows('arees',1,[1,2,3,4,5],'Substitució directa en una fórmula d’àrea treballada.');
rows('arees',2,[6],'Descomposició indicada i diferència de dues àrees.');
rows('mesurament',1,[1,2,3,4,6,7,8],'Identificació, proporció directa, diferència o propietat coneguda.');
rows('mesurament',2,[5],'Calcular error absolut i relacionar-lo amb la base per expressar-lo en percentatge.');
rows('estimacio',1,[1,2,3,4],'Reconèixer una escala raonable o calcular una àrea amb dimensions donades.');
rows('volum',1,[1,2,3,4,6],'Fórmula, equivalència volum-capacitat o identificació directa; ampliació separada del nivell.');
rows('volum',2,[5],'Coordinar tres dimensions i convertir el volum a litres.');
const low=['C05','P03','A04','S01','S02','M01','M02','M03','M05'];
const reasons={
 C01:'Convertir i sumar dos trams.',C02:'Convertir la massa i dividir en bosses.',C03:'Convertir la capacitat i dividir en ampolles.',C04:'Homogeneïtzar tres unitats i sumar.',C05:'Resta en la mateixa unitat.',C06:'Convertir, dividir i interpretar la part entera.',
 T01:'Durada total menys parada; cadena explícita.',T02:'Hora inicial més durada amb canvi sexagesimal.',T03:'Sumar durades i descompondre el total.',T04:'Separar la durada a mitjanit i sumar.',T05:'Relacionar minuts i graus de la volta completa.',
 P01:'Perímetre menys obertura.',P02:'Perímetre, conversió i cost unitari.',P03:'Longitud de circumferència amb diàmetre donat.',P04:'Circumferència, voltes i conversió de longitud.',P05:'Reconstrucció estàndard d’un costat amb semiperímetre.',
 A01:'Àrees, conversió del costat i compra d’unitats senceres amb retalls aprofitables.',A02:'Restar obertures i interpretar pots sencers.',A03:'Diferència de dues àrees donades.',A04:'Divisió directa de l’àrea per la base.',A05:'Àrea triangular i cost proporcional.',A06:'La descomposició en rectangles ja és indicada.',A07:'Coordinar perímetre comú, costat del quadrat i comparació d’àrees.',
 S01:'Proporció directa amb valor d’un centímetre donat.',S02:'Proporció inversa estàndard per divisió.',S03:'Escala i conversió de centímetres a quilòmetres.',S04:'Convertir dues dimensions abans de calcular superfície.',
 M01:'Identificar l’instrument adequat.',M02:'Identificar magnitud i unitat habitual.',M03:'Diferència absoluta directa.',M04:'Error absolut, base de comparació i percentatge.',M05:'Els percentatges ja estan donats: comparar 1% i 2%.',
 I01:'Perímetre, porta i cost; els passos són explícits.',I02:'Àrea de parets, obertures i rendiment amb arrodoniment superior.',I03:'Dos costos independents d’àrea i contorn que després se sumen.',I04:'Perímetre, voltes i canvi a quilòmetres.',I05:'Capacitat, conversió i gots complets.',I06:'Coordinar costos d’àrea i perímetre; cadena estàndard.'};
for(const [key,reason] of Object.entries(reasons)){const level=low.includes(key)?1:2;banks.push({bank:'measureProblems',key,level,reason});topics.push({topic:'problemes',type:key,level,reason,reusesBank:true});}
const out={course:'1eso',sense:'mesura',status:'existing-tasks-reviewed',scope:'Generadors originals, bossa finita d’estimació, banc de context i ampliació volum. Les noves famílies es registren separadament.',topics,banks};
require('../assets/js/raonament-mesura-1eso.js');
for(const d of MIFirstMeasureTasks.catalog.filter(d=>d.topic!=='problemes'))topics.push({topic:d.topic,type:d.type,level:d.level,reason:d.reason,newFamily:d.id});
MIFirstMeasureTasks.catalog.filter(d=>d.level===3).forEach((d,i)=>{const key='R'+String(i+1).padStart(2,'0');banks.push({bank:'measureProblems',key,level:3,reason:d.reason,reusedFamily:d.id});topics.push({topic:'problemes',type:key,level:3,reason:d.reason,reusesBank:true,reusedFamily:d.id});});
out.status='classification-reviewed';
fs.writeFileSync('docs/dificultats/revisio-1eso-mesura-punt3.json',JSON.stringify(out,null,2)+'\n');
