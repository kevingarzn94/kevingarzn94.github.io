# Sistema de diseño

## Fundamentos

La fuente de verdad es `libs/ui/styles/tokens.css`. La interfaz combina crema, tinta oscura y coral; el lila es un acento secundario. Usar roles (`--paper`, `--ink`, `--muted`, `--coral`) antes que valores nuevos en componentes.

Tipografía del portafolio: **Arial**, con **Helvetica** y sans-serif como alternativas; **Georgia en cursiva** para acentos editoriales. No hay fuentes remotas. Aeonik Bold y DM Sans Light aparecen documentadas dentro del caso Ahead como parte de esa marca, no como fuentes instaladas del portafolio.

La escala de espacios usa 4, 8, 12, 16, 24, 32, 48, 64 y 96 px. Los tokens incluyen tamaños tipográficos, radios, ancho de contenido, separaciones, duración y curvas de movimiento.

## Componentes

- Botones: acción principal coral, alternativa con borde; foco visible y texto explícito.
- Cards: imagen protagonista, categoría y nombre; enlaces nativos hacia la interna.
- Etiquetas: jerarquía secundaria, sin competir con titulares.
- Contacto: iconos de marca sólidos y CTA directo a WhatsApp.
- Movimiento: controles compactos dentro del hero y contacto. Ambos comparten estado persistente; no son elementos fijos de pantalla.
- Fotografías: fondos monocromáticos con velo oscuro y ciclos de seis imágenes; retratos con movimiento suave y marco negro de película.

## Movimiento y accesibilidad

La preferencia del sistema `prefers-reduced-motion` tiene prioridad. Con movimiento apagado el contenido sigue visible. Las entradas usan desplazamiento y opacidad; los fondos alternan escala, giro y fundido. Evitar animar contenido esencial de lectura o añadir interacciones que solo funcionen con mouse.

## Caso Ahead

`case-study.css` está limitado por `.ahead-case`: púrpura profundo, crema, naranja y lila propios de la marca. Ocho capítulos, navegación anclada con progreso, imágenes de proceso, vídeo con controles y pestañas de experiencia digital. Las pestañas soportan flechas, Inicio y Fin.

## Orden de estilos

1. `tokens.css`: fundamentos.
2. `site.css`: estructura general y estilos existentes.
3. `components.css`: componentes compartidos y ajustes de movimiento.
4. `case-study.css`: composición específica del caso.

Para cambios futuros, editar el archivo responsable y reutilizar tokens; evitar agregar otra capa global de excepciones. Revisar foco, contraste, contenido largo, movimiento reducido y ancho móvil antes de entregar.

El recorrido de construcción web de Ahead usa una imagen sticky que cambia entre cuatro documentos al avanzar por el texto. Se conserva el scroll nativo, el orden de lectura y los enlaces para ampliar cada documento. En móvil la imagen acompaña el relato por encima; con movimiento reducido se elimina la transición entre vistas.

## Sistema compartido de internas

`case-study.css` y `case-study.js` centralizan capítulos, progreso, tipografía editorial, entradas y lectura con scroll nativo. Ahead y Wedding Art usan el recorrido extenso; las seis internas más cortas usan `compact-case` y conservan su contenido. La extensión depende del material disponible.

`wedding.css` define el tono crema/carbón, títulos serif, galería, cine e invitación de Wedding Art. `wedding-gallery.js` usa un diálogo nativo: flechas para navegar, Escape para cerrar y devolución del foco a la fotografía de origen. Sin JavaScript, los enlaces abren las imágenes individuales.

### Actualización visual — 29 octubre 2026
- Base neutra: blanco `#ffffff`, tinta `#151515`, líneas `#d9d9d9`; coral como acento. Las piezas de cada marca conservan sus colores originales.
- Favicon fotográfico compartido: `assets/kevin-analoga.jpg` en las nueve páginas.
- Cards: elevación, acercamiento de imagen y giro del asterisco con hover; sin movimiento cuando está desactivado o el sistema solicita movimiento reducido.
- Wedding: carrusel circular de 19 fotografías, composición con profundidad, controles anterior/siguiente, arrastre horizontal, teclado (flechas, Inicio/Fin) y ampliación en diálogo. La foto central se muestra completa. Sin JavaScript queda una galería horizontal con enlaces directos.
- Referencias revisadas: Gabriel Valdivia (identidad personal/foto), Dotconor (contraste y asterisco), Spencer Gabor (tarjetas superpuestas), Thomas Monavon (recorrido visual), Isabel Moranta (jerarquía editorial y fondos oscuros). Se adaptaron recursos compositivos, sin incorporar sus imágenes ni código.

### Carrete completo y scroll — 29 octubre 2026
La galería Wedding incorpora las 51 fotografías DSC de `Save the date`, optimizadas en WebP sin alterar los originales. El inventario y dimensiones están en `content/wedding-case.json` (campo `gallery`). Se excluyen los PSD de edición y las adaptaciones de redes de la subcarpeta IG.

El carrete separa planos con perspectiva, desenfoque progresivo y sombras negras; la imagen seleccionada permanece nítida y completa. Heroes de portada y casos largos ocupan al menos una pantalla; las internas compactas usan una apertura editorial de altura equivalente. `public/scroll-scenes.js` coordina desplazamiento del texto y profundidad de imágenes con scroll nativo, sin secuestrar rueda ni gestos. Respeta el interruptor global y la preferencia de movimiento reducido.

Validación: comprobación de nueve páginas y build correctos; verificados 51 elementos, retorno circular desde 1 a 51, hero de altura completa, valores de animación ligados al scroll y ausencia de errores de consola en portada.
