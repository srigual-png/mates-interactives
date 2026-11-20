# Tanques i sòcols — contrast estructural, sense coincidència de paràmetres

**Validació:** [GitHub Actions #44110440651](https://github.com/srigual-png/mates-interactives/actions/runs/44110440651), resultat `success`. **800 instàncies** dels tipus `problemes:14` (cost d'una tanca) i `problemes:15` (longitud de sòcol), amb **4 comparacions estructurals** i oracles independents. La validació integral `#44110441622` ha finalitzat amb `success`.

**Subprocediment compartit:** `L = 2 · (llargada + amplada) − amplada_porta`. A `problemes:15`, aquest `L` en metres és la resposta final; a `problemes:14`, `L` és un pas intermedi i s'ha de multiplicar pel preu en €/m per trobar el cost total.

**Exemples reals diferents:** tanca 16×9 m, porta 2 m, preu 18 €/m → 48 m de tanca i **864 €**. Sòcol 4,5×3 m, porta 1 m → **14 m**. Les distribucions originals dels dos generadors només tenen quatre fixtures cadascuna i **cap tríada idèntica** de llargada, amplada i porta.

**Decisió d'auditoria:** evidència matemàtica i estructural **completada**, però **no** evidència aparellada amb les mateixes dades. Les dues entrades recíproques `problemes:14 ↔ problemes:15` han de continuar fora del comptador de parelles de paràmetres iguals. La relació de família i el nivell són **provisionals**: compartir una fórmula no implica tasca cognitiva equivalent.

**Sense modificar** generadors, nivells aprovats, famílies validades, modes guiat/autònom/examen ni estat de publicació de la PR.
