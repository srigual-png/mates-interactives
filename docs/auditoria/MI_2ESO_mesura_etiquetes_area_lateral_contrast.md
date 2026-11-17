# Etiquetes de llaunes vs superfície lateral del cilindre — 2n ESO

**Relació:** `problemes:5` calcula la superfície d'una etiqueta de llauna a partir del **diàmetre i l'altura**. `superficies:8` calcula l'àrea lateral del cilindre a partir del **radi i l'altura**.

**Equivalència matemàtica:** `π · d · h = 2 · π · r · h`, perquè `d=2r`. El problema contextual exigeix identificar que l'etiqueta és la superfície lateral; l'exercici directe ja n'identifica la superfície geomètrica.

**Limitació de les instàncies reals:** els quatre casos de `problemes:5` utilitzen altures 12, 15, 20 o 14 cm, mentre que `superficies:8` genera altures 4, 5, 6, 8 o 10 cm. Per tant, **no hi pot haver parelles generades amb el mateix radi i altura** en el codi actual. La comprovació independent de resultats d'ambdós tipus i el contrast de radi compartit no han de comptar-se com a «dades idèntiques».

**Prova:** `scripts/test-mesura-2eso-etiquetes5-superficie8-contrast.cjs` i `.github/workflows/test-mesura-2eso-etiquetes5-superficie8.yml`. A més de verificar els resultats, registra aquesta absència de coincidència en lloc d'inventar exemples aparellats.

**Criteri provisional:** mateix nucli de fórmula, però presentacions i dades distintes; mantenir els tipus diferenciats i la valoració de família/nivell pendent fins a contrastar els modes guiat, autònom i examen. No modificar generadors ni fusionar/publicar la PR.
