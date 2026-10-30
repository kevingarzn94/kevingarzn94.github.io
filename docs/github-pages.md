# Publicación en GitHub Pages

Actualizado el 29 de octubre de 2026. Kevin decidió publicar el portafolio desde su cuenta personal de GitHub (`kevingarzn94`) mientras define un dominio propio. Reemplaza la decisión del 28 de octubre de mantenerlo solo en local.

- Repositorio recomendado: `kevingarzn94/kevingarzn94.github.io` (público). URL: https://kevingarzn94.github.io/
- Workflow: `.github/workflows/pages.yml`. En cada push a `main` ejecuta `npm run check`, `npm run build` y publica `dist/`.
- Cuenta: solo la cuenta personal. No usar cuentas, organizaciones ni credenciales de Opitech.
- `noindex` sigue activo: el sitio es público para quien tenga el enlace, pero no se solicita su indexación. Quitarlo cuando exista el dominio propio.
- `private/` y `dist/` están en `.gitignore` y no se suben.
- Los inventarios de `apps/portfolio/content/` ya no incluyen rutas locales ni de OneDrive; indican el origen de forma genérica.
- Kevin confirmó publicar la interna de Ahead completa, incluido el brandbook en PDF.

## Primera publicación

1. En github.com, con la sesión de `kevingarzn94`, crear el repositorio público `kevingarzn94.github.io` sin README ni licencia.
2. En el repositorio: Settings → Pages → Source: **GitHub Actions**.
3. En la carpeta del proyecto:
   ```sh
   git add -A
   git commit -m "Portafolio v2"
   git branch -M main
   git remote add origin https://github.com/kevingarzn94/kevingarzn94.github.io.git
   git push -u origin main
   ```
4. Revisar la pestaña Actions: al terminar, el sitio queda en https://kevingarzn94.github.io/. Si el primer workflow falló porque Pages aún no estaba activo, volver a ejecutarlo desde Actions.

## Dominio propio (después)

Settings → Pages → Custom domain, más los registros DNS que indique GitHub. Entonces quitar `noindex` de las plantillas.
