# Activar auditories de nivells amb Codex des de GitHub

El workflow `.github/workflows/codex-auditoria-nivells.yml` pot llançar una auditoria **manual** de famílies i N1/N2/N3, generar un informe amb Codex i crear una PR **Draft** amb el Markdown a `docs/auditoria/propostes/`. No modifica el codi de pràctica ni reclassifica automàticament els exercicis.

## Configuració única (propietari del repositori)

1. Crea una **clau API d'OpenAI** a https://platform.openai.com/api-keys. L'ús de l'API es factura independentment de la subscripció ChatGPT; configura límits de despesa.
2. A GitHub, obre `srigual-png/mates-interactives` → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**. Desa la clau amb el nom exacte `OPENAI_API_KEY`. **No la publiquis en una PR, fitxer, issue o xat.**
3. A **Settings** → **Actions** → **General**, comprova que GitHub Actions pot crear PR: **Allow GitHub Actions to create and approve pull requests** (segons els permisos que GitHub mostri). El workflow demana `contents: write` i `pull-requests: write` només al segon job, que **no** té la clau API.
4. A **Actions** → **Codex · auditoria pedagògica N1 N2 N3** → **Run workflow**, escriu un `topic_id` existent i inicia'l. El tema pot requerir localitzar fitxers si la ruta lògica no és una ruta física.
5. Revisa la PR Draft creada: comprovacions, inventari complet, exemples, justificacions, dubtes i casos límit. L'informe de Codex és **provisional**; comprova'n les afirmacions i les referències al codi. Solament després encarrega les correccions en una PR funcional diferent.

## Com funciona

- `workflow_dispatch` exigeix una acció explícita. No hi ha execucions recurrents ni despeses automàtiques per cada PR.
- El primer job descarrega el codi sense credencials de GitHub persistents, valida l'identificador del tema i executa `openai/codex-action@v1` en mode `read-only`, amb `drop-sudo` i la clau d'OpenAI protegida com a **GitHub secret**.
- Desa l'informe com a artefacte. El segon job, aïllat de la clau API, crea una branca nova i una PR Draft **només amb el text de l'auditoria**. No modifica exercicis ni fitxers del registre definitiu.
- L'informe no representa una validació automàtica de la dificultat pedagògica. El workflow no ha de fusionar PR de forma autònoma.
- Els controls de les PR #46 i #47 continuen sent independents.

## Limitacions actuals

- El connector de GitHub disponible al xat **no ofereix una ordre per llançar** `workflow_dispatch`, ni per desar secrets; aquestes dues operacions requereixen GitHub web o una integració compatible.
- Si falta `OPENAI_API_KEY` o l'ús d'API no està habilitat, el job de Codex fallarà sense generar informe.
- Les PR creades amb `GITHUB_TOKEN` poden no desencadenar alguns workflows configurats només amb `pull_request`; reviseu els checks abans de fusionar-les.
- Els textos i les recomanacions de Codex poden contenir errors o referències inexistents. Requereixen auditoria humana.
- No connecta el compte personal de ChatGPT Plus amb la facturació de l'API. No hi ha garantia de cost zero.
