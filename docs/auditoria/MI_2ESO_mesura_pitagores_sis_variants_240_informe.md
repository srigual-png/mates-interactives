# Evidència matemàtica de sis variants de Pitàgores — 2n ESO

**Estat:** comprovació de càlcul independent satisfactòria; deduplicació i nivells pedagògics encara no aprovats.

**Prova real:** GitHub Actions #44096841413, resultat `success`. Script `scripts/test-mesura-2eso-pitagores-sis-variants-oracles.cjs`: **240 instàncies** (40 de cada tipus `pitagores:3,10,11,12,14,15`), **0 errors** d'oracle independent, estructura d'opcions o presència de guia i solució. El mostreig pseudoaleatori no acredita exhaustivitat de totes les branques ni prova de navegació/UI.

| Tipus | Objectiu cognitiu | Judici provisional |
|---|---|---|
| `pitagores:3` | Reconstruir catet a partir d'hipotenusa i altre catet | Nucli de Pitàgores invers; diferenciar de trobar hipotenusa |
| `pitagores:10` | Trobar altura d'isòsceles i després àrea | Variant composta amb magnitud final superfície |
| `pitagores:11` | Trobar catet de rectangle i després perímetre | Variant composta amb longitud final |
| `pitagores:12` | Trobar diagonal i comparar amb dos trams | Variant de comparació de recorreguts, no aplicació directa |
| `pitagores:14` | Trobar hipotenusa i afegir longitud per ancoratges | Variant contextual amb segon pas additiu |
| `pitagores:15` | Una branca demana diagonal; l'altra, catet invers | **Conservar les dues branques diferenciades** per estratègia i nivell |

**Exemple corroborat:** `pitagores:3`, hipotenusa 20 cm i catet 12 cm, altre catet 16 cm; `pitagores:10`, triangle isòsceles base 14 cm, costats 25 cm, altura 24 cm i àrea 168 cm².

**Proposta docent:** no confondre nombre de passes amb N3. La inversió pitagòrica i la modelització contextual poden ser N2 a 2n ESO, però els valors concrets depenen de si el teorema i el dibuix ja es donen. Les variants compostes requereixen comprovar pista, temps i autonomia abans de proposar nivells definitius.

**Pendent:** comparació aparellada de paràmetres amb els grups d'hipotenusa base `MI2-FC-C038`, reconstrucció de catet `MI2-FC-C039`; cobertura efectiva de les dues branques de `pitagores:15` amb evidència comptada per branca; modes guiat/autònom/examen.

**Control:** cap canvi a generadors, nivells oficials, catàleg validat, fusió ni web publicada.
