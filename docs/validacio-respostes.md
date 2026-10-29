# Validació de respostes obertes

El mòdul `assets/js/validacio-respostes.js` es carrega abans dels generadors de les 20 pàgines `sentit-*.html`. Separa equivalència matemàtica i forma exigida. Els controladors existents continuen gestionant puntuació, progrés, navegació i analítica. Les opcions múltiples continuen comparant l’opció seleccionada; no s’intercepten com si fossin entrades obertes.

## Política

- Nombres decimals i fraccions: racionals exactes amb `BigInt`; coma i punt decimals, signes Unicode, parèntesis en denominadors i notació científica. No s’accepten denominadors zero, entrades parcials, NaN o Infinity. `0,333` no equival a `1/3`.
- Expressions: parser aritmètic limitat, sense `eval` ni `Function`. Es comparen polinomis amb coeficients racionals mitjançant identitats exactes; les divisions conserven les restriccions dels denominadors. No es demostra equivalència a partir d’una mostra numèrica. Les lletres distingeixen majúscules de minúscules.
- Forma: fracció, fracció irreductible, decimal, percentatge, notació científica, desenvolupament, simplificació o factorització. Una igualtat de valor no evita aquestes comprovacions. Si es demana explícitament una fracció, un enter s’escriu `n/1`.
- Col·leccions: conjunts de solucions sense ordre; parells, seqüències i coordenades amb ordre; sistemes etiquetats amb associació de variables. Per a decimals dins de col·leccions, utilitzeu `;` com a separador. Una coma sense altre context és decimal; no s’interpreten silenciosament separadors de milers.
- Equacions polinòmiques: s’admeten diferències proporcionals per una constant no nul·la, amb les mateixes restriccions de domini. No és un solucionador general d’equacions.
- Unitats: conversió exacta amb dimensions de longitud, superfície, volum/capacitat, massa, temps i angle; variants `cm²` i `cm^2`. Una unitat escrita sempre es comprova. Les unitats concretes o obligatòries s’han de declarar. Per compatibilitat amb camps antics, si no s’exigeix unitat s’admet el nombre en la unitat del resultat.
- Percentatges: sense camp percentual, `50%` equival a `0,5`; amb `fieldUnit:'%'`, `50` significa 50%. L’adaptador antic infereix el camp percentual quan el resultat acaba en `%` i l’enunciat pregunta un percentatge.
- Precisió: exacta per defecte. L’arrodoniment decimal s’ha de declarar o demanar explícitament a l’enunciat. També es comproven les xifres decimals escrites. Les toleràncies explícites es reserven als exercicis que les necessiten; no hi ha una tolerància numèrica comuna de 0,01.

`validate(ex, input)` retorna `{ok, code, message}`. Retorna `null` si la notació del resultat no pertany al nucli. `grade(ex,input,legacy)` aplica el nucli i només consulta el validador especialitzat en aquest últim cas. Els missatges de pràctica són en català i s’afegeixen com a text. Els exàmens conserven el seu comportament de retorn d’informació.

## Configuració d’un exercici

```js
const ex = {
  question: 'Expressa el resultat com a fracció irreductible.',
  correct: '1/2',
  alts: [],
  validation: { type: 'number', form: 'irreducible' }
};
MIValidation.validate(ex, '2/4');
// {ok:false, code:'form', message:'El valor és correcte, però ...'}
```

Propietats disponibles de `validation`:

| Propietat | Valors / ús |
| --- | --- |
| `type` | `number`, `expression`, `equation`, `set`, `tuple`, `sequence`, `system` |
| `form` | `fraction`, `irreducible`, `decimal`, `percent`, `scientific`, `expanded`, `simplified`, `factorized` |
| `unit` | Unitat concreta exigida, p. ex. `cm`, `m^2` |
| `fieldUnit` | Unitat que el camp ja fixa, inclòs `%` |
| `unitRequired` | `true` si cal escriure la unitat |
| `precision` | `rounded` per comparar amb l’arrodoniment demanat |
| `decimals` | Nombre de decimals i format escrit exigit |
| `decimalFormat` | `optionalZeros` quan els zeros finals són opcionals (inferit amb «si cal») |
| `significantFigures` | Nombre de xifres significatives escrites; el resultat de referència ha d’estar arrodonit |
| `tolerance` | Error absolut explícit per a un exercici concret |
| `nonzero` | Expressions que el domini declara no nul·les, p. ex. `['x']` |

Exemples addicionals:

```js
validation: {type:'set'}                         // ordre lliure de les arrels
validation: {type:'tuple'}                       // ordre de les coordenades
validation: {type:'system'}                      // x=2;y=3, també y=3;x=2
validation: {unit:'cm',unitRequired:true}          // exigeix cm escrits
validation: {fieldUnit:'%'}                       // 50 significa 50%
validation: {precision:'rounded',decimals:2}       // 0,50 té dues xifres
validation: {nonzero:['x']}                       // permet x/x = 1 amb x ≠ 0
```

Les declaracions explícites tenen prioritat sobre les inferències de l’enunciat. Per a activitats noves, declareu els requisits i no depengueu del reconeixement del text. Comproveu també que `correct`, les pistes i les solucions respectin la mateixa forma i precisió.

## Cobertura i límits

L’inventari complet de funcions abans/després és a `scripts/auditoria-validadors.json`. S’han revisat els adaptadors `openOk`, `openOk1`, `openOkMeasure`, `validateOpen` i els consumidors d’`answer.check`, `answerCheck` i `_openAnswerCheck`, incloent-hi els cinc motors de problemes oberts de primer i els exàmens generals. L’examen per tema és de selecció múltiple; es conserva aquesta modalitat.

El nucli simbòlic cobreix aritmètica racional, polinomis i expressions racionals amb exponents enters limitats. Reconeix expressions racionals en π i angles sexagesimals. No és un CAS general: radicals generals, identitats trigonomètriques, expressions exponencials amb exponent variable, intervals amb notacions alternatives i respostes explicatives poden continuar passant pel validador especialitzat. No s’ha auditat exhaustivament cada branca d’aquests validadors. Les restriccions de denominadors es comparen de manera conservadora: factors escrits de maneres molt diferents poden causar un rebuig encara que tinguin el mateix conjunt de zeros. La factorització/simplificació es comprova estructuralment, sense certificar una factorització irreductible general. Hi ha límits de longitud, profunditat, exponent i nombre de termes per contenir entrades costoses.

Els set temes d’ampliació de primer sense patrons oberts continuen sense resposta oberta; els exercicis amb `allowOpen:false` continuen mostrant opcions. No s’han creat patrons nous.

## Proves reproduïbles

```powershell
node scripts/comprova-validacio-respostes.cjs
node scripts/comprova-sintaxi-validacio.cjs
node scripts/audita-validadors.cjs
node scripts/comprova-validacio-motors.cjs
node scripts/comprova-validacio-funcional.cjs
node scripts/comprova-analitica-guardes.cjs
```

Les proves funcionals executen Edge local amb Playwright i bloquegen totes les peticions HTTP/HTTPS. El recorregut general utilitza la llavor 20261029 i envia respostes pels camps i controladors reals, en els dos nivells de pràctica. També repeteix la submissió i comprova puntuació i una sola crida analítica. Les proves de motors fan servir preguntes deterministes per comprovar els controladors reals d’examen i dels cinc problemes oberts, i generen i lliuren un examen per tema a cadascun dels 20 apartats; no validen exhaustivament la generació aleatòria d’exàmens. No s’envien dades al GoatCounter de producció.

Les còpies prèvies dels 20 HTML són a `backups/validacio-respostes-20261029/`. No s’ha publicat la web.
