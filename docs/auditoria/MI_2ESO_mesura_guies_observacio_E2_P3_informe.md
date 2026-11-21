# Guies d'observació docent: E2 i P3 · Sentit de la mesura, 2n ESO

**Estat:** materials per a una futura revisió docent. **No són dades d'alumnat, no aproven noves famílies ni nivells.** Fitxa estructurada: [MI_2ESO_mesura_guies_observacio_E2_P3.json](MI_2ESO_mesura_guies_observacio_E2_P3.json).

## E2 · Escales: mateixa àrea, rectangles diferents

**Tasca:** A representa 8×6 cm a escala 1:50; B representa 6×2 cm a 1:100. Es permet girar els plànols. Pregunta: poden representar el mateix rectangle?

**Solució:** A = **4×3 m**, B = **6×2 m**. Tenen **12 m²** tots dos, però no els mateixos parells de costats, ni permetent rotació. **No són equivalents.**

El docent ha d'observar si l'alumnat:
- Calcula **els dos costats** reals de cada plànol, en lloc d'aturar-se en l'àrea.
- És capaç d'explicar que la igualtat de superfície **no** garanteix la mateixa forma rectangular.
- Transfereix aquest criteri als casos E1/E4, on el gir o les escales diferents **no** impedeixen l'equivalència.

**Errors a distingir:** afirmar equivalència per tenir 12 m²; convertir malament l'escala; considerar que girar el plànol canvia la sala; donar la resposta correcta sense justificar les dimensions. Cada error té una pregunta docent per identificar si és un problema instrumental o conceptual.

## P3 · Perímetres: dos rectangles units

**Tasca:** rectangles de 6×4 m i 2×4 m, units per un costat complet de 4 m i sense interiors superposats. Pregunta: quin és el perímetre exterior i per què no es compta la unió?

**Solució:** perímetres per separat **20 m i 12 m**. El costat comú de **4 m** apareix en tots dos; com que és interior, cal eliminar les seves **dues aparicions**: **20+12−2×4 = 24 m**. Equivalentment, la figura final és un rectangle de **8×4 m**, amb perímetre **24 m**.

El docent ha d'observar si l'alumnat:
- Identifica la frontera compartida com a **interior** de la figura unida.
- Justifica per què no n'hi ha prou amb restar només un costat de 4 m.
- Transfereix el criteri a P1/P4, on el contorn inclou un arc semicircular però **no** el diàmetre compartit. P2, semicercle aïllat, és el control on sí que es compta el diàmetre.

**Errors a distingir:** sumar 20+12; restar només 4 m; calcular superfície en comptes de perímetre; aplicar una fórmula memoritzada sense identificar les vores.

## Registre i interpretació

Les guies proposen documentar quatre dimensions —càlcul, decisió diferencial, justificació i transferència— valorades de 0 a 2, si s'arriben a aplicar. Cal registrar també les pistes proporcionades, les passes de resolució i els errors observats. **No hi ha cap resultat ni puntuació real introduïts.** En qualsevol eventual aplicació s'han d'utilitzar identificadors anònims, no noms d'alumnes a GitHub.

Un encert a E2 o P3 **no equival** a demostrar una família nova. Cal comparar amb les tasques control i de transferència, i després una decisió pedagògica explícita entre família independent, variant, pràctica composta o evidència insuficient. La hipòtesi N2 no modifica cap nivell oficial; N3 requereix una revisió addicional de la demanda cognitiva.

## Validació

El test `scripts/test-mesura-2eso-guies-observacio-E2-P3.cjs` contrasta les dues guies amb el protocol base, verifica els oracles matemàtics d'E2 i P3, els **6 indicadors** i **8 codis d'error**, i comprova que el resultat docent continua **sense registrar**.

**GitHub Actions #44056285902: success.**

**Següent pas pendent:** preparar fitxes d'avaluació i criteris de decisió docent per a les vuit tasques del protocol, sense atribuir resultats ficticis i abans de cap proposta d'implementació.

No s'han alterat generadors, classificadors, registres oficials, ni s'ha fusionat cap PR o publicat res.
