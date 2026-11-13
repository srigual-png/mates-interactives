# Auditoria final — Perímetres · 1r d’ESO

- **Branca de base:** `main`
- **SHA inicial verificat:** `2a67563272675b037eed02365048a9725716f6c8`
- **Tema i pràctica:** `perimetres`, `1eso/sentit-mesura.html`
- **Data:** 13-11-2026
- **Estat:** pendent de revisió i fusió; aquest informe no incorpora l’entrada al registre definitiu de famílies.

## Resum de la classificació

La suma dels costats coneguts és el mateix procediment en quadrats, rectangles, triangles i polígons; les formes són variants. En canvi, la circumferència usa (C=\pi d), i trobar una longitud desconeguda a partir del perímetre és una operació inversa. L’antic N1 de circumferència passa a N2 perquè cal relacionar radi i diàmetre, aplicar π i arrodonir.

| Família definitiva | Nivell anterior | Final | Generadors i variants |
|---|---:|---:|---|
| Sumar els costats coneguts del contorn | N1 per als tipus 1, 2, 3 i 6; 7 nou | N1 | 1 quadrat, 2 rectangle, 3 triangle, 6 polígon regular, 7 polígon irregular |
| Calcular la longitud d’una circumferència | N1 (tipus 4); P03 N1 | N2 | 4 per radi; P03 contextual amb diàmetre |
| Calcular el perímetre d’una figura en L | N2 | N2 | 5 |
| Reconstruir un costat a partir del perímetre | No hi era | N2 | 1002; P05 rectangle contextual |
| Reconstruir radi o diàmetre des de la circumferència | No hi era | N2 | 1003 |
| Calcular el contorn d’una figura amb entallada | No hi era | N2 | 1004 |
| Sumar costats amb unitats diferents | No hi era | N2 | 1005 |
| Comparar dos perímetres i trobar-ne la diferència | No hi era | N2 | 1006 |
| Detectar i corregir errors de fórmula del perímetre | No hi era | N2 | 1007 |
| Calcular la tanca necessària amb una obertura | P01 ja contextual, N2 | N2 | 1008; P01 jardí i entrada |
| Calcular el cost del material que cobreix un contorn | P02 ja contextual, N2 | N2 | 1009; P02 marc i preu lineal |
| Calcular una distància a partir de voltes d’una roda | P04 ja contextual, N2 | N2 | 1010; P04 recorregut contextual |
| Optimitzar àrea amb perímetre i restricció de dimensions | N3 | N3 | 1001 tanca, porta i amplada màxima |

**Recompte definitiu:** 13 famílies — **N1: 1 · N2: 11 · N3: 1**. El recompte és de procediments; les variants de figura no s’han separat per inflar-lo.

## Inventari i canvis de nivell

El generador principal tenia sis tipus: quadrat, rectangle, triangle, circumferència, figura en L i polígon regular. Ara incorpora també polígons irregulars (tipus 7), que comparteixen amb les altres figures poligonals la suma de les longituds conegudes.

El catàleg complementari conserva la tasca d’optimització 1001 i afegeix els tipus 1002–1010: costat invers; circumferència inversa; entallada; unitats mixtes; comparació; diagnòstic d’errors; tanca amb entrada; cost lineal; voltes de roda. Les entrades contextuals P01–P05 es mantenen al tema i s’associen al procediment corresponent. El P03 passa de N1 a N2, coherentment amb la circumferència directa.

El polígon irregular es genera amb almenys quatre costats i es verifica (costat\ màxim < suma\ dels\ altres), condició que permet tancar el contorn. Els triangles directes i inversos compleixen les tres desigualtats triangulars. La tasca d’entallada descriu inequívocament un rectangle amb una entallada interior: l’amplada es compensa i s’afegeixen dues profunditats. Els exercicis de longitud expressen la resposta en unitats lineals; els problemes de cost indiquen la conversió cm→m. No s’ha traslladat a Perímetres el problema d’àrea fixa que pertany al tema Àrees.

### Justificació pedagògica dels canvis

- **N1 consolidat:** sumar costats coneguts és un procediment directe adequat al curs. La forma del polígon no crea una família nova. S’afegeix la variant irregular per cobrir costats diferents.
- **Circumferència directa, N1→N2:** cal convertir el radi en diàmetre, aplicar (C=\pi d), respectar (\pi=3,14) i arrodonir a la dècima; això combina diversos passos.
- **L, mantinguda N2:** cal comprendre que els trams eliminats en retallar una cantonada són substituïts per trams interiors de la mateixa longitud total; no es classifica com N3 només per ser composta.
- **P03, N1→N2:** el banc ja demana circumferència; s’alinea amb el nivell de l’operació, sense crear una família addicional.
- **Noves famílies N2 (1002–1010):** completen procediments inversos, unitats diferents, comparació, lectura de contorns i aplicacions contextuals. Cada enunciat fixa les dades necessàries i dona una solució numèrica única.
- **Optimització, mantinguda N3:** s’ha d’incloure la porta al perímetre, deduir la suma dels costats i comparar àrees sota una cota d’amplada. És l’únic procediment del tema que justifica N3.

La distribució 1/11/1 no s’ha ajustat artificialment a cap quota: el nivell depèn dels passos necessaris, no del nombre de figures.

## Exemples resolts (tres per família)

### 1. Sumar els costats coneguts del contorn · N1

1. Quadrat de costat 7 cm: (P=4·7=28\) cm.
2. Rectangle de 8 cm × 5 cm: (P=2(8+5)=26\) cm.
3. Polígon irregular amb costats 4, 5, 6 i 7 m: (P=4+5+6+7=22\) m.

### 2. Calcular la longitud d’una circumferència · N2

1. Radi 5 cm: (d=10\) cm; (C≈3,14·10=31,4\) cm.
2. Radi 8 m: (d=16\) m; (C≈50,24\) m, arrodonit a dècimes: **50,2 m**.
3. Diàmetre 12 cm: (C≈3,14·12=37,68\) cm, arrodonit: **37,7 cm**.

### 3. Calcular el perímetre d’una figura en L · N2

1. Rectangle 10×8 cm, retall 3×2 cm a una cantonada: (P=2(10+8)=36\) cm.
2. Rectangle 12×7 m, retall 4×3 m: (P=2(12+7)=38\) m.
3. Rectangle 9×6 cm, retall 2×4 cm: (P=2(9+6)=30\) cm.

### 4. Reconstruir un costat a partir del perímetre · N2

1. Quadrat amb (P=36\) cm: costat (=36÷4=9\) cm.
2. Rectangle amb (P=42\) cm i un costat de 13 cm: altre costat (=42÷2−13=8\) cm.
3. Triangle amb (P=30\) cm i costats 8 i 10 cm: tercer costat (=30−8−10=12\) cm; compleix les desigualtats triangulars.

### 5. Reconstruir radi o diàmetre des de la circumferència · N2

1. (C=62,8\) cm: (d=62,8÷3,14=20\) cm; (r=10\) cm.
2. (C=31,4\) cm: (d=10\) cm; (r=5\) cm.
3. (C=94,2\) cm: (d=30\) cm; (r=15\) cm.

### 6. Calcular el contorn d’una figura amb entallada · N2

1. Rectangle 12×8 m, entallada de profunditat 2 m: (P=2(12+8)+2·2=44\) m.
2. Rectangle 20×10 m, profunditat 3 m: (P=60+6=66\) m.
3. Rectangle 12×9 m, profunditat 4 m: (P=42+8=50\) m.

### 7. Sumar costats amb unitats diferents · N2

1. Costats 2 m, 150 cm i 3 m: (200+150+300=650\) cm.
2. Costats 1 m, 2 m, 250 cm i 50 cm: (100+200+250+50=600\) cm.
3. Costats 80 cm, 1 m i 120 cm: (80+100+120=300\) cm.

### 8. Comparar dos perímetres i trobar-ne la diferència · N2

1. A: 5×3 cm, (P=16\) cm; B: 6×4 cm, (P=20\) cm; diferència **4 cm**.
2. A: 4×9 m, (P=26\) m; B: 7×8 m, (P=30\) m; diferència **4 m**.
3. A: 10×3 cm, (P=26\) cm; B: 8×6 cm, (P=28\) cm; diferència **2 cm**.

### 9. Detectar i corregir errors de fórmula del perímetre · N2

1. Rectangle 8×5 cm: sumar només 8+5 omet una parella; (P=2(8+5)=26\) cm.
2. Quadrat de costat 7 cm: (7²=49\) cm² és una àrea; (P=4·7=28\) cm.
3. Triangle de costats 4, 5 i 6 cm: duplicar la suma compta costats dues vegades; (P=4+5+6=15\) cm.

### 10. Calcular la tanca necessària amb una obertura · N2

1. Jardí 20×10 m, entrada 2 m: (40+20−2=58\) m de tanca.
2. Jardí 16×8 m, entrada 3 m: (32+16−3=45\) m.
3. Jardí 25×12 m, entrada 4 m: (50+24−4=70\) m.

### 11. Calcular el cost del material que cobreix un contorn · N2

1. Marc 300×200 cm, perfil 4 €/m: (P=10\) m; cost (10·4=40\) €.
2. Marc 250×150 cm, perfil 6 €/m: (P=8\) m; cost **48 €**.
3. Marc 400×250 cm, perfil 3 €/m: (P=13\) m; cost **39 €**.

### 12. Calcular una distància a partir de voltes d’una roda · N2

1. Diàmetre 50 cm, 6 voltes: (C=3,14·50=157\) cm; distància **942 cm**.
2. Diàmetre 100 cm, 4 voltes: (C=314\) cm; distància **1.256 cm**.
3. Diàmetre 150 cm, 3 voltes: (C=471\) cm; distància **1.413 cm**.

### 13. Optimitzar àrea amb perímetre i restricció de dimensions · N3

1. Costat llarg+ample (=12\) m; amplada màxima 4 m: (4·8=32\) m², màxim entre amplades enteres permeses.
2. Suma dels costats adjacents (=15\) m; amplada màxima 5 m: (5·10=50\) m².
3. Suma (=18\) m; amplada màxima 6 m: (6·12=72\) m².

## Errors freqüents que cobreixen els exercicis

- Comptar només dos costats en un rectangle o multiplicar per 4 el perímetre d’un triangle.
- Confondre àrea i perímetre o escriure unitats quadrades per a una longitud.
- Sumar només costats exteriors en una entallada, o sumar línies interiors que no formen part del contorn.
- Donar per vàlid un triangle que incompleix una desigualtat triangular.
- Convertir el radi a diàmetre dues vegades o ometre l’arrodoniment indicat.
- Desfer malament la fórmula en un costat desconegut; no comprovar després la figura.
- Sumar metres i centímetres sense convertir-los abans.
- Restar l’entrada abans de calcular el perímetre total, o oblidar-la del material de tanca.
- Multiplicar un preu €/m per centímetres en lloc de metres.
- Comptar només una volta de roda o usar radi en lloc de diàmetre.
- Tractar l’extrem de la cota com una amplada admissible sense comparar les opcions; no incloure la porta al perímetre.

## Validacions executades

### Test matemàtic

`node scripts\\comprova-perimetres-families-1eso.cjs`

**Resultat:** superat; 4.250 casos: 1.750 mostres dels set generadors directes (250 per tipus) i 2.500 mostres dels deu generadors del catàleg (250 per tipus). Inclou oracles independents, desigualtats de triangles i polígons, correspondència de famílies/nivells, opcions úniques, guia i resolució. També confirma el pla d’examen de 12 preguntes.

### Test de navegador integral

`node scripts\\comprova-perimetres-1eso.cjs`

**Resultat:** superat a **Chrome** local. Comprova 220 exercicis de pràctica (13 famílies, sense repetició consecutiva), 30 errors/respostes incorrectes, pràctica guiada i autònoma, progressió original 8/15, P01–P05, examen del tema de 12, examen global de 20, 30 generacions de cadascun dels temes metric/conversions/temps, enllaç de teoria, ancoratges directes i `hashchange`, amplada mòbil de 390 px i absència d’errors JavaScript.

Comprovació sintàctica executada amb `node --check` per als dos scripts nous.

## Incidències i limitacions

- La pàgina de teoria i el CSS no s’han modificat.
- No s’ha verificat GitHub Pages: la PR encara no s’ha fusionat i no hi ha un desplegament nou associat a aquests canvis.
- GitHub no retornava status checks per al commit final en el moment de l’entrega.
- S’ha executat la prova de navegador a Chrome. Edge no s’ha provat perquè Chrome estava disponible; el test també detecta Edge a Windows.
- Els tests són mostrejos deterministes (250 per generador), no una demostració formal de totes les entrades possibles.
- No s’han alterat els registres definitius `families-validades.json` ni l’inventari CSV.

## Ordres de validació local a Windows CMD

Des de la carpeta arrel del repositori:

```cmd
node --check scripts\\comprova-perimetres-families-1eso.cjs
node --check scripts\\comprova-perimetres-1eso.cjs
node scripts\\comprova-perimetres-families-1eso.cjs
node scripts\\comprova-perimetres-1eso.cjs
```
