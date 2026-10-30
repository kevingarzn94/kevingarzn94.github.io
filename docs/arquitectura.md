# Arquitectura

Sitio estático con HTML, CSS y JavaScript, sin base de datos ni servicios externos propios. Node.js compila plantillas y sirve la vista local; no se trasladan servicios ni configuración operativa de Ahead.

`src/index.html` compone secciones mediante `{{> nombre}}`. `src/pages/` contiene páginas de caso; las variables `{{clave}}` se resuelven desde `content/site.json`. Los demás JSON registran contenido y procedencia editorial: no generan automáticamente los casos.

El compilador concatena estilos en el orden tokens → sitio → componentes → Ahead, copia `public/` y genera `app.js` desde `libs/ui/motion/hero.js`. Las escrituras son atómicas para evitar servir archivos parciales. El servidor serializa recompilaciones y solo sirve `dist/` en 127.0.0.1:8766.

Three.js está vendorizado con licencia y alternativa estática. `backgrounds.js` controla fotografías y estado de movimiento. `case-study.js` controla capítulos, progreso y pestañas del caso Ahead. El contenido principal permanece en HTML.

Para agregar un proyecto: crear su HTML en `src/pages/`, copiar solo recursos optimizados a `public/assets/`, registrar fuentes en `content/`, enlazar desde trabajo y actualizar el número esperado de páginas en `scripts/check.mjs`. Ejecutar check y build y revisar en navegador.

`dist/`, archivos temporales y `private/` no son fuentes versionables. No activar despliegue sin autorización del propietario.
