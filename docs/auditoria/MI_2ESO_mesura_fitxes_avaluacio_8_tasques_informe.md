# Fitxes d'avaluació de les 8 tasques — Escales i Perímetres, 2n ESO

**Estat: vuit fitxes en blanc, pendents d'aplicació i revisió docent.** Font estructurada: [MI_2ESO_mesura_fitxes_avaluacio_8_tasques.json](MI_2ESO_mesura_fitxes_avaluacio_8_tasques.json).

## Per què aquestes fitxes

L'objectiu no és afegir vuit famílies ni classificar N3 pels encerts. Cada fitxa identifica la decisió matemàtica que cal observar, una evidència d'èxit, un error habitual, una pregunta diagnòstica i els camps de registre **encara buits**.

| Tasca | Tipus de prova | Criteri d'observació principal |
|---|---|---|
| E1 | Plànols equivalents amb gir | Compara les dues dimensions reals sense imposar una orientació fixa |
| E2 | Contraexemple: mateixa àrea, rectangles diferents | Rebutja la igualtat d'àrea com a prova de congruència |
| E3 | **Control**: àrea d'un sol plànol | Reconeix i resol la conversió a escala ja existent |
| E4 | **Transferència**: noves escales | Reutilitza el criteri de les dues dimensions en altres escales |
| P1 | Rectangle amb semicercle unit | Elimina el diàmetre intern compartit del contorn |
| P2 | **Control**: semicercle aïllat | Inclou el diàmetre perquè és contorn exterior |
| P3 | **Transferència**: dos rectangles units | Exclou dues vegades el costat compartit quan suma els perímetres |
| P4 | Una altra figura composta | Reutilitza la decisió de frontera exterior amb noves dimensions |

## Criteris d'avaluació

L'avaluador pot puntuar cadascuna de les dimensions **aplicables** de 0 a 2: càlcul matemàtic, identificació de la decisió, justificació autònoma. **No** es puntua «decisió diferenciadora» als **controls E3 i P2**, perquè són precisament exemples de famílies ja conegudes i no han d'estar penalitzats per això.

La **transferència** es valora de forma **comparativa entre tasques**, per exemple E2 respecte a E1/E4 o P1 respecte a P3/P4, no com un camp numèric sense context en un únic exercici. La suma de puntuacions **no** determina automàticament ni una família nova ni el nivell N3.

## Quines dades s'han deixat pendents

Cada fitxa deixa buits els camps de codi anònim, data de sessió, avaluador, puntuacions, pistes proporcionades, raonament observat i comentaris. Les decisions docents d'**Escales** i **Perímetres** també continuen buides.

La revisió final haurà de distingir quatre decisions pedagògiques: **família independent**, **variant**, **pràctica composta** o **evidència insuficient**. Les cinc condicions C1–C5 de la matriu anterior continuen sent necessàries; les notes per si soles no substitueixen aquesta deliberació.

**Privacitat:** si es fa una prova amb alumnat, utilitzar codis anònims; no traslladar noms ni informació personal o qualificacions identificables al repositori.

## Validació tècnica i límits

El validador `scripts/test-mesura-2eso-fitxes-avaluacio-8.cjs` verifica la correspondència exacta amb les vuit tasques del protocol, les dimensions de puntuació, que els controls no quedin penalitzats, que la transferència es valori entre tasques i que no s'hagin enregistrat resultats o aprovacions inventades.

**Cap família nova ni cap N3 aprovats.** El pilot N2 és una hipòtesi; qualsevol decisió docent real i qualsevol implementació posterior són passos diferents. No s'ha modificat el generador, el classificador, el registre de famílies, la web o l'estat de fusió de la PR.

**Següent pas útil:** revisar si les fitxes i la seqüència de tasques són suficients per formular una conclusió docent sense recollir dades reals, i preparar un model d'acta de decisió pedagògica **en blanc**, diferenciant el criteri de família del de dificultat.
