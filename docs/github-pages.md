# Publicación en GitHub Pages

Estado al 12/11/2026. Sitio ya configurado y publicado en **https://kevingarzon.com/**. No recrear repositorio, remoto ni dominio en cada sesión.

- Repositorio personal: https://github.com/kevingarzn94/kevingarzn94.github.io
- Rama de publicación: `main`; fuente Pages: GitHub Actions.
- Workflow: `.github/workflows/pages.yml`, Node 22, check/build y artefacto `dist/`.
- Cualquier push a main, incluso documental, dispara el despliegue. También permite workflow_dispatch.
- Dominio: Porkbun; en Pages `kevingarzon.com`, Enforce HTTPS activado y confirmado en la sesión del 12/11. Revalidar si hay incidencias futuras.
- No usar cuentas, credenciales ni destinos de Ahead/Opitech. Preservar `.openai/hosting.json`, aunque el flujo actual de producción sea GitHub Pages.
- `private/` y `dist/` ignorados por Git. No agregar originales privados, capturas con datos de cuenta ni secretos.

## Actualización habitual desde Visual Studio Code

1. Revisar `git status` y `git diff` para seleccionar solo los cambios previstos.
2. Para cambios funcionales, ejecutar `npm run check` y `npm run build`; revisar las vistas afectadas.
3. Añadir los archivos concretos con `git add`, crear un commit descriptivo y ejecutar `git push origin main` cuando Kevin autorice publicar. Evitar `git add -A` sin revisar todo el árbol.
4. Abrir [Actions](https://github.com/kevingarzn94/kevingarzn94.github.io/actions) y confirmar que el commit enviado termine en verde, incluyendo deploy.
5. Comprobar la web pública y registrar commit, validación y evidencia de despliegue en la continuidad. Un push exitoso solo confirma recepción del código.

## DNS y cuentas: referencia, no instrucciones para rehacer

Configuración mostrada en Porkbun: ALIAS raíz → `kevingarzn94.github.io`; CNAME www → mismo destino; TTL 600. Se conservaron MX y TXT del correo. Se añadió TXT raíz de Google para Search Console y se verificó correctamente; mantenerlo. Consultar valores actuales en el proveedor antes de modificar DNS.

Search Console pertenece a la cuenta personal de Kevin. El sitemap ya se envió y la prueba publicada permite indexar; detalles en [SEO/HTTPS](seo-https.md). No registrar credenciales ni tokens en Git.

## Historia del hosting

Se evaluó Cloudflare Workers y se descartó a favor de GitHub Pages el 29/10/2026. No hay confirmación aquí de eliminación de aquel destino. No migrar ni eliminar servicios externos basándose solo en esta nota. El dominio Porkbun se conectó en noviembre; HTTPS y SEO se completaron el 12/11. Historial en [continuidad](continuidad.md) y [estado](estado.md).
