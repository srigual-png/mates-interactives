# Catàleg provisional no solapat de famílies candidates — 2n ESO, Sentit de la mesura

**Data:** 17/11/2026 · **GitHub Actions:** [#44085057256](https://github.com/srigual-png/mates-interactives/actions/runs/44085057256), **success**.

## Resultat de la reorganització candidata

La matriu `docs/auditoria/MI_2ESO_mesura_cataleg_74_families_candidates.json` parteix de **72 agrupacions provisionals** i en proposa una **partició conservadora de 74 grups candidats**, amb la totalitat de les **129 assignacions de tipus/variant** corresponents als **128 generadors**.

Això s'ha obtingut amb **tres subdivisions candidates**:
- `C006`: deduir una escala `1:n` versus aplicar un factor lineal d'ampliació.
- `C011`: triar un instrument segons la tolerància màxima versus avaluar la coherència d'una mesura. El tipus `estimacio:11` es va redissenyar prèviament, amb autorització, i ja no correspon a l'antic nucli de C011.
- `C058`: calcular la superfície exterior d'un sòlid versus reconèixer parelles de cares del desenvolupament pla.

I **una unió candidata**, encara no aprovada:
- `C030 + C042`: superfície externa menys àrees excloses, conservant l'exigència addicional de deduir les dimensions exteriors a `problemes:11`.

**74 no és el nombre recomanat ni aprovat de famílies curriculars.** Les agrupacions restants conserven deliberadament l'estructura inicial fins a disposar d'evidència suficient per unir o separar els seus procediments.

## Indicadors de revisió

| Característica del catàleg provisional | Grups |
|---|---:|
| Agrupacions amb un membre | **44** |
| Agrupacions amb dos membres | **17** |
| Amb tres membres | **8** |
| Amb quatre membres | **3** |
| Amb sis membres | **1** |
| Amb nou membres | **1** |
| **Total** | **74** |

**11 grups** contenen orientacions de dificultat diferents entre els membres (o variants desdoblades): són prioritats de revisió docent, no errors. Per exemple, `superficies:17` conserva variants N1 i N2, mentre `C058-1` conté l'àrea directa del cub i la superfície exterior més elaborada d'un ortoedre.

La distribució inicial dels **131 registres de dificultat** era **27 N1 candidats, 80 N2 candidats i 24 N1/N2 pendents**. Després dels quatre acords docents del 20/11/2026, era **27 N1, 82 N2 i 22 N1/N2 pendents**. La reconciliació provisional de sis casos el 21/11/2026 (perimetres:18, superficies:7/8/14/18/20) la deixa en **31 N1, 83 N2 i 17 N1/N2 pendents**. Són propostes internes; cap nivell oficial ni família s'ha aprovat. Les dues discrepàncies amb el mapa de dificultat intern, `superficies:8` N2 i `superficies:14` N1, es van resoldre i aplicar el 21/11/2026. La quota 5–5–3 continua orientativa, mai obligatòria.

## Prioritats abans d'aprovar famílies

1. **11 grups de dificultat mixta:** decidir si cal mantenir subvariants dins de la mateixa família, canviar les ajudes o separar procediments.
2. **44 grups unipersonals:** buscar duplicacions matemàtiques amb altres famílies abans de donar-los rang propi.
3. **Tres subdivisions i una unió candidates:** comprovar amb enunciats representatius i decisions cognitives, no només amb fórmules.
4. **Distractors i ambigüitats:** revisar especialment `estimacio:12` (convenció d'arrodoniment als empats) i `estimacio:14` (unitats del context).
5. **Competències pròpies de 2n ESO:** evitar tasques N3 forçades només per complir mínims.

## Què comprova el test

`scripts/test-mesura-2eso-cataleg-74-families-candidates.cjs` verifica que **totes les 129 assignacions apareixen una única vegada**, que no falta cap dels 128 generadors, que els candidats de nivell remeten a les fitxes ja auditades i que el catàleg no declara cap decisió oficial ni aplicació funcional.

Les comprovacions de **6.200 mostres matemàtiques/contextuals** de fases anteriors continuen essent un aval del comportament mostrejat dels generadors, **no** una certificació docent del nombre de famílies o de la dificultat.

**Estat posterior (20/11/2026):** cap generador, família aprovada o nivell oficial modificat. Les sis decisions internes de nivell docent validades ja consten al mapa; les agrupacions i l’aprovació de famílies continuen pendents. `estimacio:12` continua pendent d'autorització específica. La PR #49 segueix oberta i en Draft, sense fusió ni publicació.
