# Generador de fitxes: pilot de perfils de 1r d’ESO, sentit numèric

El pilot substitueix les quotes percentuals exclusivament a `1eso-numeric`. Els adaptadors de 2n, 3r i 4t conserven la selecció percentual anterior. La resta de sentits no s’activa.

## Formulari

Perfil Bàsic, Equilibrat (inicial) o Difícil, amb una explicació accessible. El resum i els quatre documents possibles mostren el perfil. La configuració inicial té 15 exercicis i els primers 10 temes: cobreix també els continguts compostos. Al pilot es poden escollir quantitats d’1 a 30 per poder ajustar-se al mínim i a una quantitat viable exacta; es conserven les quantitats anteriors. El formulari bloqueja una quantitat inferior al mínim, indicant aquest mínim.

## Metadades revisades

`numeric-1eso.js` declara les famílies de cada branca `type`, dificultat real i continguts treballats. No s’infereixen de les paraules del títol. Les variacions de context i de nombres pertanyen a la mateixa família. Les dues expressions senzilles amb productes i sumes de jerarquia comparteixen família; també les dues expressions amb parèntesis. Entrades, receptes i distàncies de proporcionalitat comparteixen el procediment de valor unitari. Les activitats especials de potències combinades i intercanvi posicional tenen família pròpia. No es modifiquen les dificultats dels generadors.

Temes compostos identificats:

- **mcm i MCD**: continguts `mcd` i `mcm`; càlcul MCD i repartiments cobreixen exclusivament MCD; càlcul mcm de dos/tres nombres i periodicitat cobreixen exclusivament mcm. Repartiment amb diferència màxima d’un, fins i tot combinant temes.
- **Potències i arrels**: continguts `potencies` i `arrels`; només l’expressió avançada combinada cobreix tots dos. Amb Bàsic calen almenys dues activitats.

La resta de temes curriculars del catàleg s’han revisat: naturals, sistema decimal, operacions bàsiques, jerarquia, divisibilitat, enters, decimals, fraccions, proporcionalitat i percentatges. Són unitats de contingut per a la cobertura mínima; els procediments interns es representen com a famílies per afavorir-ne la varietat, sense exigir tots els procediments en cada fitxa.

## Selecció

1. Comprovar àmbit i configuració. Calcular per tema la cobertura mínima mitjançant conjunts de continguts; una activitat pot cobrir més d’un contingut.
2. Reservar aquest mínim i distribuir la resta entre els temes amb menys exercicis.
3. Construir un banc finit de candidats (320 intents per nivell i tema). Excloure les preguntes de la versió anterior. No es consumeixen les bosses de pràctica.
4. Escollir garantint que les places restants permetin completar la cobertura. Equilibrar els continguts de MCD/mcm, afavorir famílies poc utilitzades i aproximar el perfil amb preferències flexibles.
5. Cada família difícil admet un màxim de dues variants. Unicitat d’enunciat/opcions i signatura de família/dades/resposta; també es rebutgen variants de la mateixa família que comparteixen almenys el 80 % dels valors numèrics diferents. És una heurística conservadora, no una prova d’equivalència semàntica.
6. Bàsic només usa baixa/mitjana; Equilibrat afavoreix mitjana amb alternança orientativa; Difícil afavoreix alta i completa amb mitjana. La cobertura té prioritat sobre aquestes preferències.
7. Si no es pot completar, no s’exporta res: es comunica una quantitat viable amb cobertura o el contingut que no es pot cobrir. Mai s’exporta una fitxa retallada silenciosament.

Barrejar només permuta la selecció acabada. Una sola selecció amb numeració alimenta Word, PDF i solucionaris; el reintent d’exportació conserva el model pendent. L’avís d’ajust apareix quan s’utilitza mitjana per completar Bàsic/Difícil; també s’explica l’ús de baixa per cobrir continguts en Difícil.

## Mancances del banc

MCD només té càlcul directe baix i una família de repartiment alta; no té família mitjana. Això obliga a completar amb MCD senzills quan s’exigeix equilibri MCD/mcm. Potències/arrels no té arrels de nivell baix: Bàsic necessita activitats mitjanes per cobrir-les. Naturals, sistema decimal, operacions, divisibilitat, enters i fraccions només tenen una família alta cadascun en aquest adaptador. Diversos temes tenen poques famílies mitjanes; fitxes llargues poden repetir aquestes famílies amb dades prou diferents. L’existència de dades noves no s’utilitza per anunciar tipologies noves.

## Proves

`node scripts/fitxes/test.cjs`: vuit llavors, tres perfils, tema MCD/mcm sol, combinat i catàleg complet, dos ordres; tots els temes individualment; família difícil única, una sola variant difícil, quantitat inviable i mínim exacte. Verifica unicitat, cobertura i equilibri, absència de percentatges, perfil inicial, exports, descàrregues, formats individuals, reintent amb el mateix model, mòbil, teclat, pràctica i examen.

`verify-documents.py` compara tots els enunciats, opcions, passos i respostes dels DOCX i PDF amb el model, en el mateix ordre, i comprova A4, perfil i equacions natives. Executar amb el Python del runtime que inclou pypdf.

Regressions: `test-2eso.cjs`, `test-3eso.cjs` i `test-4eso.cjs` comproven catàlegs, quotes antigues, figures, formats i solucionaris.

Fitxers d’implementació: `assets/js/fitxes/core.js`, `numeric-1eso.js`, `ui.js`, `export.js`. Proves: `scripts/fitxes/test.cjs` i `verify-documents.py`. No s’han modificat els generadors matemàtics de pràctica ni el corrector.

### Resultats de la validació (1 de novembre de 2026)

- Pilot: 108 generacions de la matriu principal, més els casos sintètics de variant única i banc insuficient; tots correctes. UI, reintents, mòbil, teclat, pràctica i examen: correctes.
- Comparació documental final: quatre parelles Word/PDF (fitxa i solucionari, mostra general i mostra matemàtica), 13 pàgines PDF en total; contingut i ordre correctes.
- Regressions de 2n/3r/4t: 132/113/80 tipus i 24 combinacions individuals per curs; correctes.
- Comprovació sintàctica dels quatre fitxers JavaScript: correcta.
- Quatre DOCX d’una execució del mateix pilot oberts en lectura i renderitzats amb Word. Revisió visual de la primera pàgina de la fitxa en PDF i Word, i del formulari: correcta. No s’ha repetit una revisió visual exhaustiva de totes les pàgines.
