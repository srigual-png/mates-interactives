# Dependències locals d’exportació

Carregades sota demanda per `assets/js/fitxes/export.js`. Cap petició a CDN en producció.

- `docx.js`: docx 9.6.1, distribució IIFE del paquet oficial, MIT (`LICENSE-docx`). https://docx.js.org/
- `pdf-lib.js`: pdf-lib 1.17.1, distribució UMD minificada, MIT (`LICENSE-pdf-lib`). https://pdf-lib.js.org/
- `fontkit.js`: @pdf-lib/fontkit 1.1.1, UMD minificat. Procedència: https://cdn.jsdelivr.net/npm/@pdf-lib/fontkit@1.1.1/dist/fontkit.umd.min.js . Llicència MIT declarada al README i package.json oficials adjunts.
- `LiberationSans-Regular.ttf`: font Liberation distribuïda a `pdfjs-dist/standard_fonts`, SIL Open Font License (`LICENSE-Liberation`). S’incrusta com a subconjunt als PDF.

Les biblioteques s’han copiat sense modificar. Per actualitzar-les, substituir la distribució i la llicència, actualitzar aquest inventari i executar les proves de fitxes i la inspecció visual.
