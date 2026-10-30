/* Classificació compartida de la web. Tasca, suport i currículum són eixos independents.
   Els nivells heretats es centralitzen aquí; això no certifica la revisió pedagògica de cada família. */
(function(root){
  'use strict';
  const WORDS=[null,'easy','medium','hard'];
  const LABELS=[null,'baixa','mitjana','alta'];
  function freeze(value){if(value&&typeof value==='object'){Object.values(value).forEach(freeze);Object.freeze(value);}return value;}
  /* BEGIN COMPILED PEDAGOGICAL REVIEW */
  const REVIEWED_LEVELS=freeze({"1eso/algebraic":{"traduccio":[[1,2,3,4,5],[6],[]],"patrons":[[1,2,3,6],[4,5],[]],"monomis":[[1,2,3,4],[],[]],"simplificacio":[[1,5],[3,6],[]],"equacions":[[1,2],[3,4,7,8],[]],"computacional":[[1,2,4,5],[3,6],[]],"patrons2":[[2,3],[1],[]],"monomis2":[[1,2,3,4],[],[]],"simplificacio2":[[],[2,4],[]],"equacions2":[[],[5,6],[]]},"1eso/espacial":{"elements":[[1,2,3,4,5,6,7,8],[],[]],"angles":[[1,2,3,4,5,6,7],[],[]],"poligons":[[1,2,3,4,5,6,7,8],[],[]],"triangles":[[1,2,3,4,6],[],[]],"quadrilaters":[[1,2,3,4,5,6],[],[]],"cercle":[[1,2,3,7],[],[]],"visualitzacio":[[1,3,4,7],[2,5,6],[]],"poliedres":[[1,2,3,4,5,6],[],[]],"cossos":[[1,2,3,4,5,6],[],[]],"pitagores":[[1,2,6],[3,4,5],[]],"cercle2":[[4,5,6],[],[]],"coordenades":[[1,2,3,4,5,6],[],[]]},"1eso/estocastic":{"recollida":[[1,2,3,4],[5,6,7],[]],"taules":[[1,2,4,5,6,7,9,10,11,12],[3,8],[]],"barres":[[1,2,3,7,8,9,10,11,12],[4,5,6],[]],"sectors":[[1,2,3,4,5,7,8,9,10,11,12,13],[6],[]],"poligons":[[1,2,3,4,8,9,10,11,12],[5,6,7],[]],"mitjana":[[1,3],[2,4],[]],"mediana":[[1,2,4],[3],[]],"moda":[[1,2,3,5,6,7,8,9,10],[4],[]],"probabilitat":[[1,2,3,4,5,6,7,8,9,10,11],[],[]],"acumulades2":[[1,2,3,4],[],[]],"histograma":[[1,2,3,4,6],[5],[]]},"1eso/mesura":{"metric":[[1,2,3],[1002],[1001]],"conversions":[[1,4],[2,3],[1001]],"temps":[[1,4,5],[2,3],[1001]],"perimetres":[[1,2,3,4,6],[5],[1001]],"arees":[[1,2,3,4,5],[6],[1001]],"mesurament":[[1,2,3,4,6,7,8],[5],[1001]],"estimacio":[[1,2,3,4],[1002],[1001]],"volum":[[1,2,3,4,6],[5],[]],"problemes":[["C05","P03","A04","S01","S02","M01","M02","M03","M05"],["C01","C02","C03","C04","C06","T01","T02","T03","T04","T05","P01","P02","P04","P05","A01","A02","A03","A05","A06","A07","S03","S04","M04","I01","I02","I03","I04","I05","I06"],["R01","R02","R03","R04","R05","R06","R07","R08"]]},"2eso/mesura":{"unitats":[[1,2,3,4,5,6,7,8,11,12,13,14,16,17,18],[9,10,15],[]],"escales":[[5,11,12,13,14],[1,2,3,4,6,7,8,9,10,15,16,17,18],[]],"pitagores":[[1,2,3,5,9,15,16],[4,6,7,8,10,11,12,13,14],[]],"perimetres":[[1,2,3,4,5,6,7,12,13,14,18],[8,9,10,11,15,16,17],[]],"superficies":[[1,3,5,6,7,8,10,11,18],[2,4,9,12,13,14,15,16,17,19,20],[]],"estimacio":[[1,2,3,4,5,6,10,11,14,15,16,17,18],[7,8,9,12,13],[]],"problemes":[[16,17,18,19],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,20],[]],"semblanca3r":[[1,2,3,4,5,6,7,11,12,13,14],[8,9,10],[]],"talesPitagores3r":[[],[2,4,6,7,9,11,12,13,14],[1,3,5,8,10]],"piramidesCons3r":[[1,2,4,7,8,13,14],[3,5,6,9,10,11,12],[]],"reptesMesura3r":[[11,12,16],[1,2,3,4,5,7,8,9,10,13,14],[6,15]]},"2eso/numeric":{"racionals":[[1,2,3,4,9,11,15],[5,6,7,8,10,12,13,14],[16]],"fraccionsSentit":[[1,2,3,5,6,7,9,14],[4,8,10,11,12,13,15],[]],"operacionsRacionals":[[1,2,3,4,5,6,7,8,11,12,13,16,17,18],[9,10,14,15],[]],"potencies":[[1,2,3,4,5,7,8,9,10,11,12,13,14,15,18],[6,16,17],[]],"aproximacions":[[1,2,3,4,5,6,7,13,14],[8,9,10,11,12,15],[]],"proporcionalitat":[[1,2,4,5,6,7,9,13,14,18],[3,8,10,11,12,15,16,17],[]],"percentatges":[[1,2,3,4,6,7,8,16,17],[5,9,10,11,12,13,14,15,18],[]],"recomptes":[[1,2,3,4,6,9,11,12,15],[5,7,8,10,13,14],[]],"financeraAmp":[[1,2,4,6,11,13,14],[3,5,7,8,9,10,12],[]],"generatriu3r":[[1,2,3,4,5,6,7,8,9,11,12,15],[10,13,14],[]],"notacio3r":[[1,2,3,4,5,6,7,8,9,12,13,14,15],[10,11],[]],"inversa3r":[[1,3,4,5,10,11,15],[2,6,7,8,9,12,13,14],[]]}});
  const REVIEWED_BANKS=freeze({"algebraOpen":{"T1":1,"T2":2,"T3":1,"T4":2,"T5":1,"T6":1,"T7":2,"P1":1,"P2":1,"P3":1,"P4":1,"P5":2,"P6":1,"P7":1,"M1":1,"M2":1,"M3":1,"M4":1,"M5":1,"M6":1,"S1":1,"S2":1,"S3":2,"S4":1,"S5":1,"S6":1,"E1":1,"E2":1,"E3":1,"E4":2,"E5":2,"E6":1,"E7":2,"E8":2,"E9":2,"E10":2,"C1":1,"C2":1,"C3":2,"C4":1,"C5":1,"C6":2},"spatialOpen":{"E1":1,"E2":1,"E3":1,"E4":1,"E5":1,"A1":1,"A2":1,"A3":1,"A4":1,"A5":1,"A6":1,"A7":1,"P1":1,"P2":1,"P3":1,"P4":1,"P5":1,"P6":1,"T1":1,"T2":1,"T3":1,"T4":1,"T5":2,"T6":1,"T7":1,"Q1":1,"Q2":1,"Q3":1,"Q4":1,"Q5":1,"Q6":1,"C1":1,"C2":1,"C3":1,"C4":1,"C5":1,"C6":1,"V1":1,"V2":2,"V3":1,"V4":2,"V5":2},"stochasticOpen":{"R1":1,"R2":1,"R3":2,"R4":2,"R5":2,"R6":1,"R7":2,"R8":2,"R9":1,"T1":1,"T2":1,"T3":1,"T4":1,"T5":1,"T6":1,"T7":2,"G1":1,"G2":2,"G3":2,"G4":1,"G5":1,"G6":2,"G7":1,"G8":2,"G9":1,"C1":1,"C2":2,"C3":2,"C4":2,"C5":2,"C6":1,"C7":2,"C8":2,"C9":1,"C10":1,"C11":1,"P1":1,"P2":1,"P3":1,"P4":1,"P5":1,"P6":1,"P7":1,"P8":2,"P9":2,"P10":1,"K1":1,"K2":1,"K3":2},"measureProblems":{"C01":2,"C02":2,"C03":2,"C04":2,"C05":1,"C06":2,"T01":2,"T02":2,"T03":2,"T04":2,"T05":2,"P01":2,"P02":2,"P03":1,"P04":2,"P05":2,"A01":2,"A02":2,"A03":2,"A04":1,"A05":2,"A06":2,"A07":2,"S01":1,"S02":1,"S03":2,"S04":2,"M01":1,"M02":1,"M03":1,"M04":2,"M05":1,"I01":2,"I02":2,"I03":2,"I04":2,"I05":2,"I06":2,"R01":3,"R02":3,"R03":3,"R04":3,"R05":3,"R06":3,"R07":3,"R08":3}});
  const REVIEWED_VARIANTS=freeze({"1eso/algebraic":{"traduccio":{"1":{"grouped":{"level":2,"reason":"Distingir l’abast d’un factor sobre una suma i connectar expressió composta i llenguatge."}}},"equacions":{"7":{"single":{"level":1,"reason":"El context només reformula una operació inversa evident."}},"8":{"single":{"level":1,"reason":"El context només reformula una operació inversa evident."}}}},"1eso/espacial":{"poliedres":{"6":{"triangle":{"level":2,"reason":"Cal obtenir primer l’àrea triangular de la base i després relacionar-la amb l’alçada del prisma."}}},"cossos":{"6":{"scale":{"level":2,"reason":"Relacionar el canvi d’una dimensió amb el volum i conservar l’alçada."}}}},"1eso/estocastic":{"mediana":{"1":{"even":{"level":2,"reason":"Ordenar, localitzar dos valors centrals i calcular-ne la mitjana."}}}},"2eso/mesura":{"pitagores":{"15":{"diagonal":{"level":2,"reason":"Identificar el triangle rectangle dins del rectangle abans d’aplicar el teorema."}}},"superficies":{"17":{"sameBase":{"level":1,"reason":"Amb la mateixa base n’hi ha prou de comparar les altures; no cal calcular dos volums."}}}},"2eso/numeric":{"operacionsRacionals":{"10":{"cancelled":{"level":1,"reason":"Els dos termes del parèntesi coincideixen: zero per qualsevol factor no requereix la cadena general."}}},"potencies":{"18":{"growth":{"level":2,"reason":"Relacionar el nombre de duplicacions amb una potència i combinar-la amb la població inicial."}}}}});
  const REVIEWED_PLANS=freeze({"1eso/algebraic":{"traduccio":[7,5,0]}});
  /* END COMPILED PEDAGOGICAL REVIEW */
  const RATIONAL_LEVELS=freeze([[1,2,3,4,9,11,15],[5,6,7,8,10,12,13,14],[16]]);
  // Punt 3: revisió de les tasques de 1r numèric. Justificacions a docs/dificultats/revisio-1eso-numeric-punt3.json.
  const FIRST_NUMERIC_LEVELS=freeze({"naturals":[[1,2,3,4],[5],[]],"decimal_sys":[[1,2,3,4],[],[]],"ops":[[1,2,3,4],[5,6],[]],"potencies":[[1,2,3,4,5,6,7],[],[]],"jerarquia":[[1,2],[3,4,5,6,7,8,9],[]],"divis":[[1,2,3,4,5,6],[7],[]],"mcmmcd":[[1,2,3],[4,5],[]],"enters":[[1,2,3,4,5,7],[6],[]],"decimals":[[1,2,3,4,7,8],[5,6,9],[]],"fraccions":[[1,2,4,5,7,9,10,11],[3,6,8],[]],"proporcionalitat":[[1,2,5,8],[3,4,6,7],[]],"percentatges":[[1,2,6],[3,4,5,7],[]],"notacio2":[[4,5,6],[1,2,3],[]]});
  const BANK_LEVELS=freeze({
  "numericProblems": {
    "naturals-2": 2,
    "naturals-5": 2,
    "naturals-7": 2,
    "naturals-6": 2,
    "naturals-4": 2,
    "naturals-1": 2,
    "naturals-3": 2,
    "potencies-3": 2,
    "potencies-1": 1,
    "potencies-2": 2,
    "jerarquia-4": 2,
    "jerarquia-3": 2,
    "jerarquia-2": 2,
    "jerarquia-1": 2,
    "divis-3": 2,
    "divis-1": 2,
    "divis-2": 2,
    "divis-4": 2,
    "mcmmcd-4": 2,
    "mcmmcd-2": 2,
    "mcmmcd-1": 2,
    "mcmmcd-3": 2,
    "enters-5": 2,
    "enters-1": 2,
    "enters-3": 2,
    "enters-2": 2,
    "enters-4": 2,
    "decimals-1": 2,
    "decimals-3": 1,
    "decimals-5": 2,
    "decimals-6": 1,
    "decimals-4": 2,
    "decimals-2": 1,
    "fraccions-4": 2,
    "fraccions-7": 2,
    "fraccions-5": 2,
    "fraccions-1": 2,
    "fraccions-3": 2,
    "fraccions-6": 2,
    "fraccions-2": 2,
    "proporcionalitat-5": 2,
    "proporcionalitat-3": 2,
    "proporcionalitat-2": 2,
    "proporcionalitat-1": 2,
    "proporcionalitat-4": 2,
    "percentatges-5": 2,
    "percentatges-2": 2,
    "percentatges-4": 2,
    "percentatges-6": 1,
    "percentatges-3": 2,
    "percentatges-1": 2
  },
  "measureProblems": {
    "C01": 2,
    "C02": 2,
    "C03": 2,
    "C04": 2,
    "C05": 1,
    "C06": 3,
    "T01": 3,
    "T02": 2,
    "T03": 2,
    "T04": 3,
    "T05": 2,
    "P01": 2,
    "P02": 3,
    "P03": 2,
    "P04": 3,
    "P05": 2,
    "A01": 3,
    "A02": 3,
    "A03": 2,
    "A04": 2,
    "A05": 3,
    "A06": 3,
    "A07": 3,
    "S01": 2,
    "S02": 2,
    "S03": 3,
    "S04": 3,
    "M01": 1,
    "M02": 1,
    "M03": 2,
    "M04": 3,
    "M05": 3,
    "I01": 3,
    "I02": 3,
    "I03": 3,
    "I04": 2,
    "I05": 2,
    "I06": 3
  },
  "spatialOpen": {
    "E1": 1,
    "E2": 1,
    "E3": 1,
    "E4": 2,
    "E5": 1,
    "A1": 1,
    "A2": 1,
    "A3": 1,
    "A4": 1,
    "A5": 2,
    "A6": 2,
    "A7": 1,
    "P1": 1,
    "P2": 1,
    "P3": 1,
    "P4": 2,
    "P5": 2,
    "P6": 2,
    "T1": 1,
    "T2": 1,
    "T3": 1,
    "T4": 2,
    "T5": 2,
    "T6": 2,
    "T7": 2,
    "Q1": 1,
    "Q2": 1,
    "Q3": 1,
    "Q4": 2,
    "Q5": 1,
    "Q6": 1,
    "C1": 1,
    "C2": 1,
    "C3": 2,
    "C4": 2,
    "C5": 1,
    "C6": 2,
    "V1": 1,
    "V2": 2,
    "V3": 1,
    "V4": 2,
    "V5": 2
  },
  "stochasticOpen": {
    "R1": 1,
    "R2": 1,
    "R3": 2,
    "R4": 2,
    "R5": 2,
    "R6": 1,
    "R7": 2,
    "R8": 2,
    "R9": 2,
    "T1": 1,
    "T2": 2,
    "T3": 1,
    "T4": 2,
    "T5": 2,
    "T6": 1,
    "T7": 2,
    "G1": 1,
    "G2": 2,
    "G3": 2,
    "G4": 1,
    "G5": 2,
    "G6": 2,
    "G7": 1,
    "G8": 2,
    "G9": 2,
    "C1": 1,
    "C2": 2,
    "C3": 2,
    "C4": 2,
    "C5": 2,
    "C6": 1,
    "C7": 2,
    "C8": 2,
    "C9": 1,
    "C10": 1,
    "C11": 2,
    "P1": 1,
    "P2": 1,
    "P3": 2,
    "P4": 1,
    "P5": 2,
    "P6": 1,
    "P7": 2,
    "P8": 2,
    "P9": 2,
    "P10": 2,
    "K1": 1,
    "K2": 2,
    "K3": 2
  },
  "algebraOpen": {
    "T1": 1,
    "T2": 2,
    "T3": 1,
    "T4": 2,
    "T5": 1,
    "T6": 2,
    "T7": 2,
    "P1": 1,
    "P2": 1,
    "P3": 1,
    "P4": 1,
    "P5": 2,
    "P6": 2,
    "P7": 2,
    "M1": 1,
    "M2": 1,
    "M3": 1,
    "M4": 1,
    "M5": 2,
    "M6": 2,
    "S1": 1,
    "S2": 1,
    "S3": 2,
    "S4": 2,
    "S5": 2,
    "S6": 2,
    "E1": 1,
    "E2": 1,
    "E3": 1,
    "E4": 2,
    "E5": 2,
    "E6": 2,
    "E7": 3,
    "E8": 3,
    "E9": 3,
    "E10": 3,
    "C1": 1,
    "C2": 1,
    "C3": 2,
    "C4": 2,
    "C5": 2,
    "C6": 2
  }
});
  function legacyLevel(q){const n=q.diff??({easy:1,medium:2,hard:3}[q.difficulty]);return [1,2,3].includes(n)?n:null;}
  function rationalDifficulty2ESO(type){const i=RATIONAL_LEVELS.findIndex(a=>a.includes(type));return i<0?0:i+1;}
  function attach(options){
    const plain=value=>{const el=document.createElement('div');el.innerHTML=String(value);return el.textContent.trim();};
    const TOPICS=options.topics,number=Number(options.course[0]),courseName=['','1r','2n','3r','4t'][number];
    const secondYear=number===2,thirdYear=number===3,fourthYear=number===4,advanced=number>1;
    const spatialFirstYear=number===1&&options.sense==='espacial',spatialSecondYear=secondYear&&options.sense==='espacial',spatialThirdYear=thirdYear&&options.sense==='espacial',spatialFourthYear=fourthYear&&options.sense==='espacial';
    const algebraFirstYear=number===1&&options.sense==='algebraic',algebraSecondYear=secondYear&&options.sense==='algebraic',algebraThirdYear=thirdYear&&options.sense==='algebraic',algebraFourthYear=fourthYear&&options.sense==='algebraic';
    const stochasticFirstYear=number===1&&options.sense==='estocastic',stochasticSecondYear=secondYear&&options.sense==='estocastic',stochasticThirdYear=thirdYear&&options.sense==='estocastic',stochasticFourthYear=fourthYear&&options.sense==='estocastic';
  function mappedLevel(levels,t,q){
    const matches=(levels[t.id]||[]).flatMap((types,i)=>types.includes(q.type)?[i+1]:[]);
    if(matches.length!==1)throw new Error('Hi ha una plantilla sense una dificultat única definida al tema «'+t.name+'» (tipus '+q.type+'). No es pot preparar l’examen.');
    return matches[0];
  }
  function level(t, q) {
    if (secondYear && t.id === 'racionals') {
      return mappedLevel({racionals:RATIONAL_LEVELS},t,q);
    }
    if (stochasticFourthYear) {
      const levels = {
        dadesVariables4t:[[1,2,3,5],[4,8,9],[6,7,10]],
        taulesRepresentacions4t:[[1,2,3,10],[5,6,9],[4,7,8]],
        comparacioDistribucions4t:[[1,2,3],[4,5,10],[6,7,8,9]],
        estudisMostreig4t:[[1,2],[3,5,6,9],[4,7,8,10]],
        nuvolsRelacio4t:[[1,2,3,6],[4,7,9,10],[5,8]],
        regressioPrediccions4t:[[1,3,4,10],[2,5,6],[7,8,9]],
        espaiMostralRecompte4t:[[1,3,8,10],[2,4,5],[6,7,9]],
        experimentsCompostos4t:[[1,3,5,10],[2,4,6,9],[7,8]]
      };
      return mappedLevel(levels,t,q);
    }
    if (stochasticThirdYear) {
      const levels = {
        dades3r:[[1,2,3,5],[4,6,7,13],[8,9,10,11,12,14]],
        taules3r:[[1,2,3,4,13,15,19],[5,8,10,11,14,16,17,20],[6,7,9,12,18,21,22]],
        grafics3r:[[1,2,8,9],[3,6,7,10],[4,5,11,12]],
        centralitzacio3r:[[1,7,10,16],[2,3,5,8,9],[4,6,11,12,13,14,15]],
        quartils3r:[[2,3,5,6],[1,4,8,13],[7,9,10,11,12,14]],
        dispersio3r:[[1,5,6,10,11,12],[2,3,4,7,8,9],[13,14,15,16,17]],
        investigacio3r:[[1,2,8,9,18],[3,5,6,10,12,13,19,20],[4,7,11,14,15,16,17,21]],
        probabilitat3r:[[1,2,3,4,6,21],[5,7,11,12,13,14,15,17],[8,9,10,16,18,19,20,22]]
      };
      return mappedLevel(levels,t,q);
    }
    if (stochasticSecondYear) {
      const levels = {
        dades:[[1,2,3],[4,5,7],[6,8]],
        frequencias:[[1,2,3,4],[5,8,10,11],[6,7,9,12]],
        grafics:[[1,4,7,8],[2,5,6,9],[3,10,11,12]],
        centralitzacio:[[1,4,7,8,10],[2,5,9],[3,6,11,12]],
        investigacions:[[1,2,8,9],[3,5,6,10],[4,7,11,12]],
        probabilitat:[[1,2,3,4],[5,6,7,8,10],[9,11,12,13,14,15]],
        experiments:[[1,2,3,4],[5,6,8,13],[7,9,10,11,12]]
      };
      return mappedLevel(levels,t,q);
    }
    if (stochasticFirstYear) {
      const levels = {
        recollida:[[1,3],[2,4],[5,6,7]],
        taules:[[1,6,7,9,11],[2,5,10,12],[3,4,8]],
        barres:[[1,2,3,9,10],[7,8,11,12],[4,5,6]],
        sectors:[[1,7,10,11,12,13],[2,3,6],[4,5,8,9]],
        poligons:[[1,2,3,9,10,11,12],[4,8],[5,6,7]],
        mitjana:[[1],[3],[2,4]], mediana:[[2,4],[1],[3]],
        moda:[[1,5,7],[2,8,9,10],[3,4,6]],
        probabilitat:[[1,2,3],[4,5,6,7,10],[8,9,11]]
      };
      return mappedLevel(levels,t,q);
    }
    if (algebraFourthYear) {
      const levels = {
        patrons4t: [[2,4,9,10], [3,5,7], [1,6,8]],
        equacions2g4t: [[1,2,7,11], [3,5,6], [4,8,9,10]],
        sistemes4t: [[4,5,10], [1,2,8], [3,6,7,9]],
        inequacions4t: [[4,5,6,7], [1,3,8], [2,9,10]],
        funcionsRep4t: [[1,2,5,11], [3,4,6,9], [7,8,10,12]],
        linealsQuad4t: [[2,4,5,9], [1,7,8,10], [3,6,11,12]],
        inversaExp4t: [[1,2,8,12], [3,5,6,7], [4,9,10,11]],
        analisiFunc4t: [[1,3,6,10,12], [2,5,7,8], [4,9,11]]
      };
      return mappedLevel(levels,t,q);
    }
    if (algebraThirdYear) {
      const levels = {
        patrons: [[1,2,6], [4,5], [3,7,8]],
        expressions: [[1,2,3], [4,8], [5,6,7]],
        identitats: [[1,2,6,7], [3,8], [4,5]],
        factoritzacio: [[1,7,8], [2,3,4], [5,6]],
        equacions2: [[1,2,6], [3,5], [4,7,8]],
        sistemes: [[1,5,6], [2,3], [4,7,8]],
        funcions: [[1,2,3], [4,6], [5,7,8]],
        funcions8: [[1,2,3], [4,6,7], [5,8]],
        quadratica: [[1,6,7], [2,4,5], [3,8]]
      };
      return mappedLevel(levels,t,q);
    }
    if (algebraSecondYear) {
      const levels = {
        patrons: [[1,3], [2,5,6], [4,7,8]],
        expressions: [[1,2], [3,4,6,9,10], [5,7,8]],
        equacions: [[1,2,10], [3,4,5,8,11], [6,7,9,12]],
        problemes: [[1,2,12], [3,4,5,8,10], [6,7,9,11]],
        relacions: [[1,2,3,4,11], [5,6,7,8,12], [9,10]],
        funcionslineals: [[1,2,3,4,5,17], [6,8,9,10,11,12,13,15], [7,14,16]],
        computacional: [[1,2,11,17], [3,4,5,7,9,10,12,15], [6,8,13,14,16]]
      };
      return mappedLevel(levels,t,q);
    }
    if (algebraFirstYear) {
      const levels = {
        traduccio: [[1,2], [3,4], [5,6]],
        patrons: [[1,3], [2,6], [4,5]],
        monomis: [[1], [2,4], [3]],
        simplificacio: [[1,5], [6], [3]],
        equacions: [[1,2], [3,4], [7,8]],
        computacional: [[5], [1,2], [3,4,6]]
      };
      return mappedLevel(levels,t,q);
    }
    if (spatialThirdYear) {
      const levels = {
        translacions: [[1,2,5,8,9], [4,6,10], [3,7]],
        girs: [[1,2,3,10], [4,5,6], [7,8,9]],
        simetriaAxial: [[1,2,8,9,10], [5,6,7], [3,4]],
        simetriaCentral: [[1,4], [2,3,5], [6,7,8,9,10]],
        mosaics: [[1,3,4,8], [2,7,9], [5,6,10]],
        transformacionsCoord: [[2,3,8,9], [1,4,5,7], [6,10]],
        geoAlgebra: [[5,6,7,8], [1,2,9], [3,4,10]],
        visualitzacio: [[2,3,5,10], [4,7,9], [1,6,8]]
      };
      return mappedLevel(levels,t,q);
    }
    if (spatialFirstYear) {
      const levels = {
        elements: [[1,2,6,7], [3,5], [4,8]],
        angles: [[1,4], [2,3,5], [6,7]],
        poligons: [[1,2,8], [3,4,5], [6,7]],
        triangles: [[1,2], [3], [4,6]],
        quadrilaters: [[1,6], [4,5], [2,3]],
        cercle: [[1,7], [2], [3]],
        visualitzacio: [[1,3,7], [2,4], [5,6]]
      };
      return mappedLevel(levels,t,q);
    }
    if (spatialSecondYear) {
      const levels = {
        semblanca: [[1,2,6,7], [4,5,8,10], [3,9,11]],
        tales: [[3,4,6], [1,2,5,10], [7,8,9]],
        pitagores: [[1,2,3], [4,5,6,10], [7,8,9]],
        cossos: [[1,2,3,6], [7,8,9], [4,5,10]],
        visual3d: [[3,6], [1,4,5,7,9], [2,8]],
        coordenades: [[1,2,5,9], [4,6,8], [3,7,10]],
        modelitzacio: [[6,9], [2,4,8], [1,3,5,7,10]]
      };
      return mappedLevel(levels,t,q);
    }
    if (spatialFourthYear) {
      const levels = {
        figures4t: [[1,3,7], [2,4,6], [5,8,9,10]],
        vectors4t: [[1,2,3,4,10], [7,9], [5,6,8]],
        components4t: [[1,2,4,10], [3,5,9], [6,7,8]],
        operacionsVectors4t: [[1,3,4], [2,5,6], [7,8,9,10]],
        coordenadesVectors4t: [[1,2,7], [3,5,6,8], [4,9,10]],
        homotecies4t: [[1,5,6], [7,9,10], [2,3,4,8]],
        geometriaFuncions4t: [[1,2,3,4,11], [5,6,9], [7,8,10]],
        regions4t: [[1,2,6], [4,5,7,9], [3,8,10]],
        rectesAmpA: [[1,4,5], [2,6,7,9], [3,8,10]],
        geometriaAnaliticaAmpD: [[4,5,7,11], [1,3,6,12], [2,8,9,10]]
      };
      return mappedLevel(levels,t,q);
    }
    if (fourthYear) {
      const levels = {
        angles4t: [[1,6,7,10,11], [2,3,9], [4,5,8]],
        radians4t: [[1,2,3,11], [4,5,6], [7,8,9,10]],
        pitagores4t: [[1,2,3,4,11], [5,6,7], [8,9,10]],
        semblancaRaons4t: [[1,2,3,11], [4,5,6], [7,8,9,10]],
        trigRaons4t: [[1,2,3,4,11], [5,6,7], [8,9,10]],
        resolTriangles4t: [[1,2,3,10], [4,5,6,11], [7,8,9]],
        mesuresIndirectes4t: [[1,3,4,9], [2,5,6,11], [7,8,10]],
        precisioError4t: [[1,2,6], [3,4,7,9,11], [5,8,10]],
        reals4t: [[1,2,3,6], [4,5,7], [8,9,10]],
        irracionals4t: [[1,2,5], [3,6,9], [4,7,8,10]],
        intervals4t: [[1,2,3,4], [5,6,7], [8,9,10]],
        errors4t: [[1,2,3,4], [5,9], [6,7,8,10]],
        operacions4t: [[1,2,4], [3,5,7], [6,8,9,10]],
        comptatge4t: [[1,4,5,7], [2,3,8,9], [6,10]],
        pascal4t: [[1,2,6,8], [3,5,9], [4,7,10]],
        financera4t: [[1,2,8], [4,6,7], [3,5,9,10]]
      };
      return mappedLevel(levels,t,q);
    }
    if (thirdYear && options.sense==='mesura') {
      const levels = {
        volum: [[1,2,3,5,10], [4,6,9], [7,8]],
        precisio: [[1,2,3,9,10], [4,5,8], [6,7]],
        arees: [[1,2,7], [3,4,6,10], [5,8,9]],
        semblanca: [[1,2,3], [4,5,8,10], [6,7,9]],
        tales: [[1,2,9], [3,4,7,10], [5,6,8]],
        pitagores: [[1,2,3], [4,5,6,10], [7,8,9]],
        piramides: [[1,2,7], [3,4,8,10], [5,6,9]],
        errorMesura: [[1,2,9], [3,4,6,10], [5,7,8]]
      };
      return mappedLevel(levels,t,q);
    }
    if (advanced) {
      const levels = {
        fraccionsSentit: [[1,2,3,5,6,14], [4,7,9,11], [8,10,12,13,15]],
        operacionsRacionals: [[1,2,7,13,17], [3,4,5,6,11,14,16], [8,9,10,12,15,18]],
        potencies: [[1,2,3,4,5,8], [6,7,11,12,13,14], [9,10,15,16,17,18]],
        aproximacions: [[1,2,3,4,5], [6,7,10,11,12], [8,9,13,14,15]],
        proporcionalitat: [[1,2,3,4,5,6], [7,8,9,13,16,18], [10,11,12,14,15,17]],
        percentatges: [[1,2,3,4,8,16], [5,6,7,11,12,17], [9,10,13,14,15,18]],
        recomptes: [[1,2,3,6,12], [4,5,8,9,11,15], [7,10,13,14]],
        racionals3r: [[1,2,3,5], [4,6,7,9], [8,10,11,12]],
        generatriu3r: [[1,2,3,9], [4,5,7,12], [6,8,10,11]],
        reals3r: [[1,2,3,4], [5,6,7,8], [9,10,11,12]],
        aproximacions3r: [[1,2,3,4], [5,6,8,9], [7,10,11,12]],
        potencies3r: [[1,2,4,5,6], [3,7,8,9,12,14], [10,11,13,15,16]],
        notacio3r: [[1,2,3,4,5,17,18], [6,7,8,9,15,16], [10,11,12,13,14]],
        proporcionalitat3r: [[1,2,3,4,7,10,16], [5,6,9,11,12,14], [8,13,15]],
        recomptes3r: [[1,2,6,11,14,15], [3,4,9,12,17], [5,7,8,10,13,16]],
        unitats: [[1,2,3,7,8], [4,5,6,9,11,12,14,16], [10,13,15,17,18]],
        escales: [[1,3,5,12,13], [2,4,8,9,10,11], [6,7,14,15,16,17,18]],
        pitagores: [[1,2,3,9], [4,5,6,7,8,12], [10,11,13,14,15,16]],
        perimetres: [[1,2,3,4], [5,6,7,12,13,14,17,18], [8,9,10,11,15,16]],
        superficies: [[1,5,6,10,11,14], [2,3,4,7,8,12,18,19], [9,13,15,16,17,20]],
        estimacio: [[1,2,3,4,5,11], [6,10,14,15,16,18], [7,8,9,12,13,17]],
        problemes: [[6,8,9,14,16,18], [1,3,4,5,7,10,15,17], [2,11,12,13,19,20]]
      };
      return mappedLevel(levels,t,q);
    }
    if (t.id === 'conversions') return q.type === 1 ? 1 : q.type === 3 ? 2 : 3;
    if (t.id === 'temps') return q.type === 4 ? 3 : [2,3].includes(q.type) ? 2 : 1;
    if (t.id === 'proporcionalitat') {
      if ([3,4,7].includes(q.type)) return 3;
      if ([6,8].includes(q.type)) return 2;
      return 1;
    }
    if (t.id === 'metric') {
      const match = q.solution.join(' ').match(/hi ha (\d+) canvi/);
      return match ? Math.min(3, Number(match[1])) : 1;
    }
    if (t.id === 'potencies') {
      if (q.type === 6) return 2;
      if (q.type === 5 && /\^3/.test(plain(q.question))) return 3;
      if (q.type === 7 && / = (100|121|144)/.test(plain(q.question))) return 3;
    }
    const declared=legacyLevel(q);
    if(declared===null)throw new Error('Falta la dificultat de la plantilla del tema «'+t.name+'».');
    return declared;
  }

    function hasTopicMap(t){return number===4?t.exam4t===true:t.course===courseName&&t['exam'+courseName]===true;}
    function curriculum(t){
      const option=typeof options.option==='function'?options.option():null;
      const extension=!!(t.isExtension||t.isExpansion||t.course&&t.course!==courseName||String(t.course||'').startsWith('amp'));
      const eligible=hasTopicMap(t)&&(typeof options.examFilter!=='function'||options.examFilter(t));
      return {pageCourse:options.course,contentCourse:t.course||null,option:option||null,scope:t.bRequired?'curricular-b':extension?'extension':'core',examEligible:eligible};
    }
    function bankIdentity(q){
      if(q.difficultyBank)return [q.difficultyBank,String(q.difficultyKey??q.patternId??q.type)];
      if(options.course!=='1eso')return null;
      if(options.sense==='numeric'){
        if(q.variantId&&numericBankEntries().some(([key])=>key===q.variantId))return ['numericProblems',q.variantId];
        if(q.source==='ampliacio'){const prefix={ops:'naturals',percentatges:'percentatges'}[q.topicId]||q.topicId;return ['numericProblems',prefix+'-'+q.type];}
      }
      const bank={mesura:'measureProblems',algebraic:'algebraOpen',espacial:'spatialOpen',estocastic:'stochasticOpen'}[options.sense],key=String(q.patternId??q.type);
      return bank&&Object.hasOwn(BANK_LEVELS[bank],key)?[bank,key]:null;
    }
    function newNumericTasks(){return number===1&&options.sense==='numeric'?(root.MIFirstNumericTasks?.catalog||[]):[];}
    function numericBankEntries(){return Object.entries(BANK_LEVELS.numericProblems).concat(newNumericTasks().filter(d=>d.bankKey).map(d=>[d.bankKey,d.level]));}
    function bankLevel(bank,key){return REVIEWED_BANKS[bank]?.[key]??(bank==='numericProblems'?numericBankEntries().find(([k])=>k===key)?.[1]:BANK_LEVELS[bank]?.[key]);}
    function reviewedLevels(t){const compiled=REVIEWED_LEVELS[options.course+'/'+options.sense]?.[t.id];if(compiled)return compiled;const old=number===1&&options.sense==='numeric'?FIRST_NUMERIC_LEVELS[t.id]:null;return old?old.map((types,i)=>types.concat(newNumericTasks().filter(d=>d.topic===t.id&&d.level===i+1).map(d=>d.level===3?1001:1002))):null;}
    function coverage(t){const groups=reviewedLevels(t);if(!groups)return null;const types=groups.map(a=>a.length),variants=REVIEWED_VARIANTS[options.course+'/'+options.sense]?.[t.id]||{};for(const [type,values] of Object.entries(variants))for(const n of new Set(Object.values(values).map(v=>v.level)))if(!groups[n-1].some(v=>String(v)===type))types[n-1]++;return {reviewed:true,types,missing:types.flatMap((n,i)=>n?[]:[i+1])};}
    function examPlan(t){const c=coverage(t);if(!c)return null;const explicit=REVIEWED_PLANS[options.course+'/'+options.sense]?.[t.id];if(explicit)return {slots:explicit.slice(),types:c.types,missing:c.missing};const total=c.types.reduce((a,b)=>a+b,0),slots=total<=12?c.types.slice():[0,0,0];while(slots.reduce((a,b)=>a+b,0)<12){const available=slots.map((n,i)=>c.types[i]?i:-1).filter(i=>i>=0).sort((a,b)=>slots[a]-slots[b]);if(!available.length)throw new Error('Tema sense cobertura revisada.');slots[available[0]]++;}return {slots,types:c.types,missing:c.missing};}
    function classify(t,q){
      const identity=bankIdentity(q);
      if(identity){const [bank,key]=identity,n=bankLevel(bank,key);if(![1,2,3].includes(n))throw new Error('Falta la dificultat d’una plantilla del banc «'+bank+'».');return n;}
      const reviewed=reviewedLevels(t);
      let variantKey=q.difficultyVariant;
      // Els errors desats abans d’aquesta revisió no portaven la clau de variant.
      // Aquestes regles només reconeixen les branques concretes revisades.
      if(!variantKey&&options.course==='1eso'){
        const text=plain(q.question||'');
        if(options.sense==='algebraic'&&t.id==='traduccio'&&q.type===1&&/Tres vegades la suma|La suma del doble i el triple/.test(text))variantKey='grouped';
        if(options.sense==='algebraic'&&t.id==='equacions'&&[7,8].includes(q.type)&&/Un nombre multiplicat per 4 dóna 36|Un nombre menys 11 és igual a 7/.test(text))variantKey='single';
        if(options.sense==='espacial'&&t.id==='poliedres'&&q.type===6&&/prisma triangular/.test(text))variantKey='triangle';
        if(options.sense==='espacial'&&t.id==='cossos'&&q.type===6&&/dupliquem el radi/.test(text))variantKey='scale';
        if(options.sense==='estocastic'&&t.id==='mediana'&&q.type===1){const n=text.match(/\(n=(\d+)\)/);if(n&&Number(n[1])%2===0)variantKey='even';}
      }
      if(!variantKey&&options.course==='2eso'&&options.sense==='numeric'){
        if(t.id==='operacionsRacionals'&&q.type===10&&Number(q.correct)===0)variantKey='cancelled';
        if(t.id==='potencies'&&q.type===18&&plain(q.question||'').includes('microorganismes'))variantKey='growth';
      }
      if(!variantKey&&options.course==='2eso'&&options.sense==='mesura'){
        const text=plain(q.question||'');
        if(t.id==='pitagores'&&q.type===15&&text.includes('diagonal'))variantKey='diagonal';
        if(t.id==='superficies'&&q.type===17){const ns=text.match(/\d+(?:[.,]\d+)?/g)?.map(n=>Number(n.replace(',','.')));if(ns?.length===6&&ns[0]===ns[3]&&ns[1]===ns[4])variantKey='sameBase';}
      }
      if(variantKey){const variant=REVIEWED_VARIANTS[options.course+'/'+options.sense]?.[t.id]?.[q.type]?.[variantKey];if(!variant)throw new Error('Variant pedagògica sense revisar: '+t.id+':'+q.type+'/'+variantKey);return variant.level;}
      return reviewed?mappedLevel({[t.id]:reviewed},t,q):hasTopicMap(t)?level(t,q):legacyLevel(q);
    }
    function annotate(t,q,identity){
      if(!q)return q;
      const copy={...q};if(identity){copy.difficultyBank=identity[0];copy.difficultyKey=String(identity[1]);}
      const n=classify(t,copy);
      return {...copy,taskDifficulty:n,taskDifficultyStatus:n===null?'pending':'assigned',diff:n,difficulty:WORDS[n]||null,curriculum:curriculum(t)};
    }
    const byId=new Map(TOPICS.map(t=>[t.id,t]));
    function topicFor(q){return byId.get(q.topicId||q.primaryTopic)||{id:q.topicId||null,name:q.topicName||'Exercici',course:null};}
    function wrapBank(patterns,bank){
      patterns.forEach(p=>{
        const key=String(p.id),n=bankLevel(bank,key);if(![1,2,3].includes(n))throw new Error('Plantilla de banc sense classificació: '+bank+':'+key);
        p.diff=n;const original=p.gen;
        p.gen=function(...args){const q=original.apply(this,args);return annotate(topicFor(q),q,[bank,key]);};
      });
    }
    function bindBanks(collections){
      if(collections.numericProblems)collections.numericProblems.filter(c=>typeof c.gen==='function').forEach(c=>{
        const original=c.gen;c.gen=function(...args){const q=original.apply(this,args);return annotate(topicFor(q),q,['numericProblems',q.variantId]);};
        c.diffCounts=Object.fromEntries([1,2,3].map(n=>[n,numericBankEntries().filter(([key,v])=>key.startsWith((c.id==='pct'?'percentatges':c.id)+'-')&&v===n).length]));
      });
      if(collections.measureProblems)collections.measureProblems.forEach((original,i)=>{collections.measureProblems[i]=function(...args){const q=original.apply(this,args);return annotate(topicFor(q),q,['measureProblems',q.type]);};});
      if(collections.algebraOpen)wrapBank(collections.algebraOpen,'algebraOpen');
      if(collections.spatialOpen)wrapBank(collections.spatialOpen,'spatialOpen');
      if(collections.stochasticOpen)wrapBank(collections.stochasticOpen,'stochasticOpen');
    }
    function context(t,supportLevel){return {supportMode:supportLevel===1?'guided':supportLevel===2?'independent':null,curriculum:curriculum(t)};}
    function refreshErrors(errors){
      if(!errors)return;const rows=Array.isArray(errors)?errors:Object.values(errors).flat();
      rows.forEach(q=>{if(!q||typeof q!=='object')return;if(options.course==='1eso'&&options.sense==='numeric'&&q.isProblem&&q.source==='exam'&&!q.difficultyBank&&!q.variantId&&q.taskDifficultyStatus!=='assigned'){Object.assign(q,{taskDifficulty:null,taskDifficultyStatus:'pending',diff:null,difficulty:null});return;}try{Object.assign(q,annotate(topicFor(q),q));}catch(e){Object.assign(q,{taskDifficulty:null,taskDifficultyStatus:'pending',diff:null,difficulty:null});}});
    }
    function bindDisplay(config){
      const original=root[config.showName];let firstDisplay=true;
      root[config.showName]=function(...args){const state=config.state(),t=TOPICS[state.currentTopic],params=new URLSearchParams(root.location.search),early=!root.MIDifficultyModes?Number(params.get('difficulty')):0,generate=t.gen;let result;if(firstDisplay){firstDisplay=false;if(params.get('practice')==='1'||(options.course==='1eso'&&options.sense==='numeric'&&params.has('tema'))){const support=Number(params.get('level')||params.get('nivell')),setter=['selLv','selectLevel','setLevel'].find(name=>typeof root[name]==='function');if([1,2].includes(support)&&setter)root[setter](support);}}
        if([1,2,3].includes(early))t.gen=function(...values){for(let i=0;i<500;i++){const q=generate.apply(this,values);if(classify(t,q)===early)return q;}throw Error('No s’ha trobat la dificultat demanada.');};
        try{result=original.apply(this,args);}catch(error){if([1,2,3].includes(early)){root.__miInitialDifficultyFailure={topic:t.id,level:early};return false;}throw error;}finally{t.gen=generate;}
        const q=config.current();
        if(q&&t){Object.assign(q,annotate(t,q));const anchor=document.getElementById('exNum')||document.getElementById('exN')||document.getElementById('exerciseNumber');if(anchor){let label=document.getElementById('miTaskContext');if(!label){label=document.createElement('p');label.id='miTaskContext';label.className='mi-task-context';anchor.after(label);}label.textContent=(q.taskDifficulty===null?'Dificultat pendent de classificar':'Dificultat matemàtica: '+LABELS[q.taskDifficulty])+' · '+(state.level===1?'Suport guiat':'Pràctica autònoma');}}
        return result;
      };
      if(typeof root.showErrors==='function'){const show=root.showErrors;root.showErrors=function(...args){refreshErrors(config.state().errors);return show.apply(this,args);};}
    }
    function bindExam(config){
      const name=typeof root.miRunConfiguredExam==='function'?'miRunConfiguredExam':'startExam',original=root[name];
      if(typeof original!=='function')return;
      root[name]=function(...args){const result=original.apply(this,args),state=config.state();state.examQs=state.examQs.map(q=>annotate(topicFor(q),q));return result;};
    }
    TOPICS.forEach(t=>{if(typeof t.gen!=='function')return;const original=t.gen;t.gen=function(...args){return annotate(t,original.apply(this,args));};});
    return Object.freeze({getDifficulty:classify,coverage,examPlan,annotate,curriculum,context,bindBanks,bindDisplay,bindExam,refreshErrors,course:options.course,sense:options.sense});
  }
  function independent(q){return {...q,taskDifficulty:null,taskDifficultyStatus:'pending',diff:null,difficulty:null,curriculum:{pageCourse:q.course||null,contentCourse:null,option:null,scope:'standalone',examEligible:false}};}
  root.MIDifficulty=Object.freeze({attach,independent,rationalDifficulty2ESO,rationalLevels2ESO:Object.freeze(Object.fromEntries(RATIONAL_LEVELS.map((types,i)=>[i+1,types])))});
})(typeof window==='undefined'?globalThis:window);
