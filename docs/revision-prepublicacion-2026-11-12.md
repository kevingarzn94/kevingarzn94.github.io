# Revisión local previa a publicación · 12 de noviembre de 2026

## Ajustes

- Más aire lateral en las nueve páginas: contenido máximo de 1280 px y margen adaptable de 8vw, limitado a 128 px; en móvil hasta 600 px se conservan 24 px por lado.
- Se mantiene la galería de una, dos o tres columnas. Ahead ocupa dos únicamente desde 1200 px, junto a Wedding Art. Orden: Ahead, Wedding, Brand Guidelines/Centauro, Colonia, La Colombia Real, Amor a Mordiscos, Breakers Fest, Viajero y tres proyectos de Behance.
- Titulares con `text-wrap: balance` y párrafos, etiquetas y pies con `text-wrap: pretty`. Se unen «verse bien» y «de Colombia» en los lugares detectados; el hero móvil elimina el salto fijo y ajusta el tamaño para evitar una última palabra aislada.
- Las pestañas de Ahead se distribuyen en varias filas cuando falta espacio, sin partir sus nombres. Mantienen una altura mínima de 44 px.
- Se conserva el soporte existente para movimiento reducido. No se modifican contenidos de proyectos ni destinos de publicación.

## Comprobaciones

Portada y ocho proyectos revisados en navegador local a 320, 390, 820 y 1440 px: 36 combinaciones sin desbordamiento horizontal del documento ni contenedores de texto recortados detectados por la comprobación de dimensiones. Las galerías horizontales intencionales se excluyeron de ese control. Se inspeccionaron visualmente los heroes y las zonas afectadas, incluida la galería de escritorio y las pestañas de Ahead en móvil.

Interacciones verificadas: acordeón de portada; apertura y cierre con Escape del índice móvil; selección y navegación con flechas en las pestañas de Ahead; ampliación de pantallas de Viajero; apertura, cambio de foto y cierre de Wedding Art. En los dos visores, Escape devuelve el foco al control que los abrió.

Capturas y resultados de dimensiones disponibles localmente en `private/qa-prepublish-20261112/` (no se publican). Comprobaciones de entrega: `npm run check`, `npm run build` y `git diff --check`.

## Alcance

El ajuste tipográfico reduce las palabras aisladas y corrige los casos observados. No garantiza idénticos saltos de línea con todos los navegadores, fuentes, niveles de zoom o anchos intermedios. Esta revisión no sustituye una certificación de accesibilidad ni repite la auditoría completa de noviembre 3.

Siguen pendientes las comprobaciones humanas de audio/subtítulos, lectores de pantalla en dispositivos físicos, zoom nativo y documentos externos indicadas en [la auditoría de accesibilidad](auditoria-accesibilidad-2026-11-03.md).

Cambios locales, sin commit, push ni publicación.
