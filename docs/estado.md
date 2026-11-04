# Estado · 29 de octubre de 2026

Implementación local lista para revisión: portada y ocho internas. Ahead incluye ocho capítulos, navegación de progreso, identidad original, exploraciones, aplicaciones, lanzamiento, stand, contenido y tres vistas del ecosistema digital.

Los fondos usan seis fotografías seleccionadas de Fotos_Site, monocromáticas, con velo oscuro, rotación y fundidos. Los interruptores están dentro del hero y contacto y sincronizan el estado de movimiento. Los retratos usan movimiento suave y marco de película negro. El sistema de diseño, arquitectura y procedencia están documentados.

## Validación realizada

- `npm run check`: correcto; nueve páginas, enlaces locales y anclas, recursos, IDs únicos, h1, textos alternativos, noindex, iconos y contenido retirado.
- `npm run build`: correcto.
- Sintaxis Node de `case-study.js` y `backgrounds.js`: correcta.
- Navegador local de escritorio: portada e interna Ahead revisadas visualmente; pestañas Stays y propietario verificadas con mouse y flecha de teclado; ambos switches se sincronizan al apagar y encender.
- Sin errores de consola registrados en las vistas revisadas.

## Límites de la revisión

Las reglas adaptables y de movimiento reducido están implementadas. No se hizo una prueba final en dispositivos móviles físicos ni una auditoría completa de accesibilidad. La validación automática comprueba enlaces locales, no disponibilidad permanente de todos los destinos externos.

Sin publicación, push ni despliegue. Mantener el acceso por 127.0.0.1; los materiales de trabajo privados quedan fuera del directorio servido.

## Ampliación · Figma, evento y ecosistema

Se conectaron en lectura los archivos Figma de Ahead y Colonia. Ahead incorpora un relato de cuatro etapas con imágenes sincronizadas al scroll, cards originales, fotos reales del stand y un video de detalles. Se añadieron el evaluador, Ahead Links y un esquema editorial de Console sin registros personales. Colonia muestra su hero y componentes v2.

Validaciones: check y build correctos; recorrido sticky verificado en navegador al cambiar entre fundamentos y buscador, sin errores de consola registrados. El formulario del evaluador se consultó vacío, sin envío; la consola solo se abrió hasta ingreso. La vista interna se documentó a partir de la captura suministrada, sin copiar sus datos.

## Wedding Art y unidad de las internas

Wedding Art ampliado a siete capítulos: historia, galería, película, dirección visual, invitación, piezas del gran día y equipo. Galería de 19 fotografías optimizadas con ampliación y teclado. Video vertical de 98.8 segundos con portada, controles y carga a demanda. Las ocho internas comparten navegación por capítulos, progreso y movimiento; las más cortas conservan la extensión correspondiente a su material.

Se verificaron apertura de galería, cambio con flecha derecha, cierre con Escape y retorno de foco. La reproducción del Save the Date se comprobó en navegador. Se reinició el servidor local con el compilador actualizado y soporte de rangos HTTP para video. No se publicó ni se modificaron los originales o archivos de Figma. La revisión móvil física sigue pendiente.

## Navegación accesible · 30 de octubre de 2026

Corregidos los dos hallazgos prioritarios del índice compartido:
- Índice oculto con `visibility:hidden` e `inert`, fuera de la navegación por teclado. Permanece visible mientras contiene foco.
- Menú desplegable de Secciones (portada) o Capítulos (internas) hasta 900 px. Lista completa, aria-expanded/aria-controls, Escape con retorno al botón, cierre al salir y foco al título del destino al seleccionar. En escritorio conserva los enlaces directos. Sin JS mantiene una navegación estática con todos los destinos.
- Versión de CSS y v2.js subida a `20261030-8` en las nueve plantillas.
- Se mantiene el criterio de Kevin: comprensión, usabilidad y acceso al trabajo por encima del efecto decorativo.

Validado: `npm run check`, `npm run build`, `git diff --check`, `node --check apps/portfolio/public/v2.js`.
Pendiente: verificación funcional y visual nueva en navegador a 1440/820/390 px y equipos físicos. El servidor QA local no pudo iniciarse: EPERM del entorno; la revisión automática de la solicitud de permiso falló por límite de uso. El navegador de herramientas bloqueó además el protocolo file:. No se eludieron las restricciones. El harness local de revisión está en `private/qa-navigation/` y no se publica. No se hizo commit ni push.

### Revisión visual local completada — 2026-10-30
- Vista local disponible en http://127.0.0.1:8767/ durante la sesión. La limitación anterior de revisión visual quedó resuelta.
- Revisado el bloque «Un buen comienzo» a 390, 820 y 1440 px, sin desbordamiento horizontal. Corregida la colisión entre el asterisco absoluto y las tres columnas: hasta 1050 px, introducción y pasos se apilan.
- Menú de portada y siete capítulos de Wedding comprobados en navegador: despliegue, Escape, selección y cierre. Activación por teclado de Sesión actualiza #galeria y sitúa el foco en t-galeria. Índice oculto con visibility:hidden e inert; no aparece en el árbol accesible.
- Corregido cierre prematuro del menú al perder foco durante pointer-down; el foco del destino se aplica después de la navegación nativa.
- Caché de las nueve plantillas: 20261030-9. npm run check, npm run build y git diff --check correctos.
- Capturas locales en private/qa-navigation/. Revisión en tamaños de navegador, no dispositivos físicos. Sin commit ni push.

### Ajustes UX/UI — 2026-10-30, versión 20261030-10
- «Un buen comienzo»: eliminado el cambio de estado por hover, foco y pérdida de foco. Clic/Enter/Espacio alternan; Escape cierra.
- Viajero: comparaciones en dos grupos por fila en escritorio y uno en tablet/móvil. Imágenes completas, enlaces «Ampliar pantalla» y modal nativo con zoom, Escape y retorno de foco. Enlaces al recurso funcionan sin JS.
- Indicador de foco oscuro (#171717) sobre claro, blanco sobre oscuro y doble anillo para fondos variables. Referencia WCAG 1.4.11: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
- Colonia: CTA «Ver versión de prueba» hasta tener el dominio oficial.
- Breakers: «Dirección creativa · Propuesta creativa» en portada y cabecera, y «Propuesta creativa» visible también en la etiqueta del hero móvil.
- Verificación: Viajero a 1440, 820 y 390 px sin desbordamiento horizontal; imágenes de comparación a 308 px en escritorio y 361 px en tablet. Visor probado por teclado, zoom a 834 px, Escape y foco restaurado. Acordeón conserva su estado al cambiar foco y no abre la siguiente opción al tabular.
- Alternativas del abanico en private/qa-navigation/fan-options.html (servidor local 8768, /__fan_options__). No se cambió el formato del abanico público: pendiente elección entre 4:5, 1:1 con recorte o 1:1 con imagen completa.
- Sin commit ni push. Validar y publicar desde VS Code con el bloque entregado.

### Abanicos: opción B aprobada — 2026-10-30
- Kevin eligió tarjetas cuadradas 1:1 con imagen a sangre. Aplicado al componente compartido y a la excepción de Wedding Art, conservando movimiento, anchuras y encuadres existentes.
- Caché actualizada a 20261030-11 en las nueve plantillas.
- Portada revisada a 1440, 820 y 390 px; Wedding Art comprobado en móvil, sin desbordamiento horizontal y con todas sus tarjetas 1:1. Captura en private/qa-navigation/hero-cuadrado.png.
- Se publica junto con los cinco ajustes UX/UI anteriores. Sin commit ni push realizados por el agente.

### Portadas de proyectos — 2026-10-30, versión 20261030-12
- Las tarjetas destacadas se alinean al inicio y dejan de estirar sus filas: 16 px de portada a texto y 8 px entre textos, tanto en Ahead como en Wedding.
- Portada de Wedding reemplazada por DSC_0543.jpg suministrada por Kevin. Derivados JPEG de 1000 y 2000 px de ancho con srcset, sin modificar el original de 3609 × 5414 px. Encuadre al 80% vertical para conservar pareja y anuncio.
- Comprobado a 1440, 820 y 390 px; sin desbordamiento y separaciones iguales. Captura privada: private/qa-navigation/portadas-actualizadas.png.
- npm run check, npm run build y git diff --check correctos. Publicación pendiente junto con ajustes anteriores.

### Correcciones de las 13 capturas móviles — 20261030-13
- Resuelto origen compartido de solapamientos: las imágenes editoriales de av-duo y wedding-wide heredaban height:100% y no dejaban espacio para figcaption. Ahora height:auto, pie de foto en flujo y 32 px entre filas de av-duo.
- Wedding: 24 px entre lámina/créditos y CTA de Behance. Corregidas las parejas de imágenes de Historia.
- Centauro (paletas y lenguaje), Bimbo (campaña), Breakers (identidad/evento), Viajero (proceso) y Colombia Real (canales): pies contenidos en su figura, sin invadir la siguiente imagen.
- Añadidas dimensiones intrínsecas a imágenes de figuras con pie para estabilizar su carga diferida.
- Colonia: rondas con texto oscuro visible, tamaño y espaciado compactos; retirada lámina de biblioteca de componentes. Fragmento conservado en private/qa-navigation/colonia-components-retirado.html; recurso original intacto.
- Validación en navegador a 390 px de los seis proyectos con av-duo; figuras contienen sus pies y no hay overflow horizontal. Revisión visual Bimbo/Colonia a 390, Centauro a 820 y Bimbo a 1440. Pendiente confirmación en iPhone físico por Kevin.
- npm run check, npm run build y git diff --check correctos. Sin commit/push. Captura privada: private/qa-navigation/mobile-captions.png.

### Abanicos navegables — 2026-11-03, versión 20261103-1
- Portada y siete proyectos con `data-fan`: flechas anterior/siguiente, contador con descripción, navegación circular, arrastre horizontal y teclado (flechas, Inicio/Fin). Colonia conserva su composición sin abanico.
- Se conserva la apertura ligada al scroll, la inclinación con mouse y las tarjetas cuadradas. En portada los enlaces siguen abriendo proyectos; arrastrar no activa enlaces. Nombre de la tarjeta central visible.
- Gestos táctiles mantienen scroll vertical y zoom. Corregida la transferencia de captura implícita del puntero entre tarjeta y contenedor. Movimiento reducido y control global siguen permitiendo navegar sin animación.
- Validación: ocho abanicos en Chrome a 390, 820 y 1440 px; controles, teclado, retorno circular, arrastre con mouse, movimiento reducido y sin desbordamiento horizontal ni errores JavaScript. Simulación táctil de Chrome: swipe horizontal, scroll vertical y toque en enlace correctos. No probado en dispositivo físico.
- npm run check, npm run build, revisión de sintaxis y git diff --check correctos. Capturas en private/qa-navigation/fan-navigation-desktop.png y fan-navigation-mobile.png. Cambios locales, sin publicación.

### Controles del abanico más discretos — 2026-11-03, versión 20261103-2
- Flechas de 18 px sin borde ni fondo permanente; mantienen área táctil de 44 × 44 px y foco visible. Controles agrupados en un ancho máximo de 360 px.
- Se muestra solo el nombre/descripción de la tarjeta, sin numeración. Retirada la instrucción visible «Arrastra o usa las flechas».
- Check de nueve páginas, build, sintaxis JavaScript y git diff --check correctos. Sin publicación.

### Asterisco propio e IA en Sobre mí — 2026-11-03, versión 20261103-3
- Asterisco compartido de seis brazos rectos, extremos planos y uniones angulares. Negro sobre claro y blanco sobre oscuro; conserva las interacciones y el respeto por movimiento reducido.
- Sobre mí incorpora el uso de IA en ideación, imagen/video, prototipos y apoyo al desarrollo web, bajo la dirección creativa y estructura de Kevin. Proyectos mencionados según su confirmación: Ahead, La Colombia Real para Mauricio Lizcano, Colonia y Amor a mordiscos. Procedencia registrada en content/profile.json.
- Check y build correctos. Revisión en Chrome a 1440 y 390 px sin desbordamiento; comprobados colores blanco/negro y extremos planos en los símbolos de portada. Capturas privadas identity-ai-1440.png e identity-ai-390.png. Sin publicación.

### Legibilidad base — 2026-11-03, versión 20261103-4
- Tamaños secundarios compartidos de 14 px; ampliados etiquetas, navegación, créditos, pies y controles de galería. Texto de contacto y acordeón a 16 px. Interruptor de movimiento con altura mínima de 44 px.
- Mayor opacidad en textos secundarios y pasos no activos del recorrido de Ahead. Corregido el asterisco del footer (negro sobre fondo blanco). Se mantiene el diseño discreto del abanico.
- Cabeceras adaptables con salto de fila cuando falta espacio. Nueve páginas revisadas en Chrome a 320, 390, 820 y 1440 px sin desbordamiento horizontal ni errores JavaScript.
- Muestreo de contraste por estilos calculados en etiquetas, pies, notas, metadatos y nuevo bloque IA: sin resultados inferiores a 4,5:1 sobre fondos sólidos. El cálculo excluye gradientes/imágenes y no es una auditoría WCAG completa. Referencia: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- Check, build y git diff --check correctos. Captura privada readability-mobile.png. Sin publicación.

### Asterisco del cierre de Ahead — 2026-11-03, versión 20261103-5
- Símbolo animado del epílogo en gris neutro #929292, visible sobre blanco y negro, conservando su animación. Token compartido --asterisk-gray; aplicación limitada al símbolo del cierre.
- Check, build y git diff --check correctos. Sin publicación.

### Auditoría de accesibilidad — 2026-11-03
Portada y ocho casos revisados en escritorio y móvil. [Informe, correcciones y pendientes](auditoria-accesibilidad-2026-11-03.md).
