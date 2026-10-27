# Kevin Garzón — Portafolio

Primera versión del portafolio de diseño, fotografía y experiencias digitales. Hero animado, trabajo seleccionado, caso Ahead, perfil y contacto profesional.

## Desarrollo

Requiere Node.js 22 o posterior. No necesita instalar dependencias.

```bash
npm start          # http://127.0.0.1:8766
npm run check      # valida compilación, recursos y navegación interna
npm run build      # genera dist/ para cualquier hosting estático
```

El servidor recompila los cambios de contenido y estilos; recargar el navegador para verlos. `PORT=9000 npm start` permite cambiar el puerto. `dist/` es generado: editar las fuentes, no la salida.

## Estructura

```text
apps/portfolio/
  content/site.json   Nombre, presentación, metadatos y enlaces
  src/index.html      Estructura general
  src/sections/       Hero, proyectos/caso, perfil y contacto
  public/assets/      Imágenes de proyectos
libs/ui/
  styles/tokens.css   Colores y roles visuales
  styles/site.css     Diseño responsive
  motion/hero.js      Interacción del hero
scripts/             Compilación, servidor local y verificación
 docs/               Arquitectura, fuentes y pendientes editoriales
.openai/hosting.json  Identidad propia de Sites
```

La organización toma como referencia la separación de apps, contenido, sistema visual y documentación de Ahead. Es una implementación independiente, sin dependencias del repositorio de Ahead.

## Publicación

`dist/` funciona como sitio estático. La configuración de Sites tiene un ID exclusivo para este portafolio; no reutiliza dominios, cuentas, pipelines o credenciales de Ahead. El estado de publicación se registra en `docs/estado.md`.

## Próxima edición

Seleccionar fotografías originales, confirmar correo público y revisar los textos de los casos. La versión actual usa LinkedIn y Behance como vías de contacto; no incluye un formulario sin backend.
