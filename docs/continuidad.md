# Continuidad vigente · 14 de noviembre de 2026

Documento de inicio para futuras sesiones sin acceso al chat original. Complementa AGENTS.md. Resume la historia del repositorio y las confirmaciones de Kevin; no es una nueva auditoría en vivo de servicios externos. El código y Git deben contrastarse al retomar.

## Estado de entrega

- Portafolio publicado: https://kevingarzon.com/ (canónica sin www).
- Repositorio personal: `kevingarzn94/kevingarzn94.github.io`, rama `main`. No confundir el usuario GitHub con la escritura del dominio.
- Último commit funcional: `c4af12d`, “Refuerza SEO organico y estabilidad visual”. Kevin compartió push exitoso y confirmó que el despliegue terminó.
- Hosting GitHub Pages vía Actions; DNS en Porkbun. HTTPS forzado confirmado durante esta sesión. No requiere contratar hosting adicional.
- Nueve páginas: portada y Ahead, Wedding Art, Centauro, Colonia, La Colombia Real, Bimbo, Breakers Fest y Viajero. Tres tarjetas adicionales enlazan a Behance, no son internas.
- **16/11: rediseño de portada, versión en inglés, preguntas frecuentes y color rosa coral** en un commit local sobre `main`, pendiente de push por Kevin (ver secciones del 16 de noviembre y `docs/estado.md`).
- `032d981` consolidó la documentación. **14/11: revisión integral publicada** en el commit `3288b0a` (workflow en verde, comprobada en producción). Ver «Revisión integral del 14 de noviembre» y `docs/estado.md`.

## Forma de trabajar con Kevin

Conversar en español, con lenguaje claro. Para paneles o publicación manual, dar pasos concretos. Priorizar diseño, legibilidad y experiencia; evitar textos que suenen artificiales o promesas vacías. No inventar resultados, clientes, tecnologías o autoría. Mantener créditos y fuentes. Las solicitudes de ajustes autorizan trabajo local; publicar requiere instrucción correspondiente. Históricamente Kevin ejecuta commit/push desde Visual Studio Code.

La carpeta externa de Ahead es referencia de solo lectura. La interna `proyecto-ahead.html` de este portafolio sí es parte del alcance. No copiar configuración operativa, datos ni identificadores del otro proyecto. Preservar el ID propio de `.openai/hosting.json`.

## Decisiones visuales y editoriales aprobadas

- Hero: **“Tu siguiente idea merece verse bien.”** Se exploraron alternativas y Kevin decidió conservarlo.
- Introducción aprobada: “Hola, soy Kevin, diseñador y director de arte. Trabajo contigo para darle forma a tu marca, diseñar tu web o crear contenido en fotografía y video. Te acompaño desde las primeras ideas hasta los últimos detalles.” Fuente: `content/site.json`.
- No limitar el servicio audiovisual a fotografía ni a “contar historias en imágenes”: incluye video. Sobre mí presenta nombre completo, profesión y Bogotá, Colombia.
- Etiquetas/metadatos secundarios discretos y con separación del título; mantener lectura y contraste.
- Cierre de contacto: **“Trabajemos juntos”**, en lugar de “El siguiente proyecto”.
- Animaciones suaves activas por defecto. Se eliminaron switches manuales del hero/footer e internas; se conserva `prefers-reduced-motion`, también cuando cambia durante la visita.
- Abanicos cuadrados 1:1, con scroll nativo, arrastre, teclado y flechas discretas con área de 44 × 44 px. Solo nombre central, sin contador visible. Mantener navegación sin animación.
- Asterisco propio de seis brazos rectos y extremos planos; cierre Ahead gris. No sustituir por un logo ajeno.
- Cards delimitadas con superficie/borde, imagen y texto agrupados. Acciones claras “Ver proyecto →” y “Abrir en Behance →”; un único enlace por tarjeta. La diagonal se descartó para entrar a proyectos.
- Galería: una columna hasta 760 px, dos de 761 a 1199 px y tres desde 1200 px. Ahead ocupa dos columnas solo en vista de tres y Wedding queda a su lado. Las demás mantienen tamaño uniforme. Se descartaron el título gigante de Ahead y la jerarquía adicional de Wedding en esta galería.
- Orden: Ahead → Wedding Art → Centauro / Brand Guidelines → Colonia → La Colombia Real → Bimbo / Amor a Mordiscos → Breakers Fest → Viajero Co → tres Behance existentes.
- Contenido máximo 1280 px, gutter `clamp(24px,8vw,128px)`, 24 px en móvil. Balance de títulos y párrafos; no introducir saltos rígidos que generen palabras aisladas.
- Navegación entre casos (14/11): «Siguiente proyecto» sigue el orden de la galería y se añadió «Anterior» y «Todos los proyectos». Se genera desde `content/cases.json`; el pie de los casos es compartido (`case-footer`) con «Volver arriba».
- Línea superior del hero en español: «Diseñador sénior · UX/UI · Fotografía» (antes «Sr Designer · UX/UI · Photography»). Kevin puede revertirlo si prefiere el inglés.
- WhatsApp abre con un mensaje inicial («Hola Kevin, vi tu portafolio y quiero contarte sobre un proyecto.»), definido en `site.json`.
- Material/Angular se mencionó como referencia de componentes y reglas UX/UI, **no se aprobó migrar a Angular**. Consolidación mayor del sistema de componentes sigue aplazada; reutilizar tokens actuales.

## Casos, autoría y contenido

- Colonia 722 está terminada y activa en https://www.coloniasuites.com/. Se retiró “en desarrollo”, se añadieron siete capturas reales con mockups HTML/CSS y galería ampliable. La propuesta v2 queda como archivo del proceso, no como sitio final.
- Créditos Colonia: realizado desde Opitech para Ahead y Colonia 722; marcas, fotografías y materiales de sus respectivos titulares. Procedencia: `content/colonia-case.json`.
- Colonia reemplazó a Viajero únicamente en el abanico principal; Viajero conserva tarjeta e interna.
- Ahead conserva relato de estrategia, identidad, lanzamiento y ecosistema web; ocho capítulos, pestañas y material original autorizado. Kevin autorizó publicar el caso completo y brandbook. Esto no autoriza publicar datos operativos de Ahead.
- Wedding conserva su carrete completo de 51 fotografías optimizadas, Save the Date, invitación y créditos. Los registros tempranos de 19 fotos son históricos.
- Los otros casos mantienen alcance y atribuciones documentados; preservar la identificación de propuestas creativas (p. ej. Breakers/Bimbo según cada contenido).
- Sobre mí explica apoyo de IA bajo dirección creativa de Kevin en proyectos confirmados. No inferir herramientas ni atribuirle automáticamente todas las fotografías.
- Fuentes de referencia: `content/*-case.json`, `profile.json`, `projects.json` y `docs/contenido-y-fuentes.md`.

## Historia verificable en Git

| Commit | Hito |
| --- | --- |
| `5ff0748` | Base Portafolio v2 después de importaciones iniciales |
| `2388af8` | Portada, nuevas internas y derechos |
| `ac396d2` / `896fed2` | Ajustes móviles, iconos SVG y caché |
| `7b479dd` | Carga, capturas Colonia, Viajero, Wedding y Behance |
| `42ba9ff` | Navegación accesible y adaptación |
| `84b2e0f` | UX, abanicos cuadrados y portadas |
| `94a6676` | Solapamientos móviles y simplificación Colonia |
| `94eac62` | Accesibilidad y navegación |
| `f571774` | Continuidad, dominio y pendientes de la sesión anterior |
| `8e86ea7` | Colonia final, créditos y cierre; retiro de switches |
| `1ded9de` | Hero, textos y jerarquía visual |
| `3f06343` | Galería 1/2/3 columnas, márgenes y lectura adaptable |
| `63bdd3e` | Habilitación de indexación y metadatos SEO |
| `c4af12d` | Identidad profesional, metadatos específicos y dimensiones de imágenes |

Usar `git show <commit>` para el detalle real. `docs/estado.md` conserva las iteraciones; sus frases “sin publicar” describen el momento de cada revisión, no el estado vigente.

## SEO, HTTPS y Search Console

Objetivo explícito: **todo orgánico, sin anuncios ni herramientas pagas**. Buscar presencia por “Kevin Garzón” y servicios reales. No prometer primera posición ni fecha de indexación.

Antes de los ajustes existía `noindex,nofollow` y HTTP no redirigía a HTTPS. Se retiró el bloqueo en las nueve plantillas y se actualizó el check para evitar regresiones. Build genera canonical por página, Open Graph, robots.txt, sitemap de nueve URLs y Person/WebSite en inicio con perfiles públicos existentes. No asumir que eso incluye todos los formatos de resultados enriquecidos.

Estado demostrado durante la sesión del 12/11:
- Kevin activó Enforce HTTPS; se comprobaron redirecciones HTTP y www a HTTPS sin www.
- Search Console se gestiona desde la cuenta personal de Kevin indicada en la conversación. No se guarda su correo de acceso ni el token de verificación en este documento público.
- Propiedad de dominio verificada por TXT en Porkbun, host raíz vacío. Conservar el registro de Google; no sustituir MX/SPF ni otros TXT existentes.
- Sitemap `https://kevingarzon.com/sitemap.xml`: “Correcto”, nueve páginas descubiertas.
- Solicitud de indexación de inicio enviada. Prueba en tiempo real: “La URL está disponible para Google” y se puede indexar.
- El informe del rastreo anterior aún mostraba noindex; la prueba actual confirmó su retirada. Rendimiento estaba procesando datos.
- Descubiertas o aptas para indexar **no significa indexadas**. No se confirmó posicionamiento ni impresiones todavía. No reenviar reiteradamente la solicitud.

Último ajuste orgánico: descripción de portada, nombre completo en Sobre mí, servicios UX/UI/foto/video explícitos y metadatos de Ahead/Wedding/Bimbo/Breakers. Dimensiones intrínsecas en imágenes compartidas y lazy del logo Ahead. Los cuatro videos ya tenían preload=none. No se modificaron perfiles sociales.

## Revisión integral del 14 de noviembre (publicada, `3288b0a`)

- Limpieza: 51 recursos sin referencia (~7 MB, incluidos `ml-resultados.mp4` y la serie `wedding-photo-02…19`), Three.js y cuatro scripts muertos (`hero-3d.js`, `case-study.js`, `scroll-scenes.js`, `libs/ui/motion/hero.js`), unos 50 KB de CSS sin selectores vivos y la vista previa flotante sin uso de `v2.js`. Las capturas antes/después de las nueve páginas a 390 y 1440 px salieron idénticas, salvo ruido de suavizado. Git conserva el historial de lo borrado.
- Rendimiento: variantes de 600/800 px para el abanico y las portadas, portada Wedding recomprimida (800/1400 px), fotos 2–6 de los fondos diferidas. Carga inicial móvil medida localmente: 2,06 MB → 1,05 MB (sin gzip). Dimensiones intrínsecas en las imágenes de los casos. Versiones de caché automáticas por contenido.
- SEO/compartir: `og:image` 1200 × 630 por página (`assets/og/`, generadas con `scripts/og-images.mjs`), `twitter:card`, `og:type` article en casos, foto, ciudad y áreas en Person, Flickr en `sameAs`, referrer `strict-origin-when-cross-origin` (antes `no-referrer`, que ocultaba las visitas desde este sitio a Behance/LinkedIn), página 404 propia.
- Accesibilidad/UX: foco visible con contraste suficiente en fondos claros, 32 textos alternativos descritos en la galería Wedding (antes «Fotograma NN»), un solo punto de foco por captura de Colonia con visor modal, transición del enlace Behance respetando movimiento reducido, video del stand Ahead en una columna bajo 480 px, franja oscura del borde derecho de los fondos fotográficos corregida, aviso «PDF · 9 MB» en el manual de Ahead, encuadre de la portada de Skippers.
- Textos: «Amor a Mordiscos», «Skippers · Scotiabank Colpatria», «Combino dirección visual…», «Explora un caso web», «tarjetas», «Investigación UX», separadores «·» en títulos, `&nbsp;` literal retirado de Viajero.
- No hecho por falta de herramientas o datos: recomprimir el video Save the Date (21 MB; `avconvert` solo ofrece 204 × 360 o un archivo mayor; usar HandBrake/ffmpeg H.264 720p), comprimir el PDF de Ahead (9 MB), subtítulos de los cuatro videos (requiere transcripción), medición Lighthouse/PageSpeed.
- Observado fuera del código: la pieza de Skippers dice «CONVIÉRTETETE» (16/11: el proyecto en Behance pertenece a otra compañera, sin contacto; no se corrige) (errata dentro de la imagen de la campaña).

## Rediseño de secciones de portada · 16 de noviembre (local, sin publicar)

- Servicios: tarjetas con imagen de trabajo propio (kit de marca Ahead, captura de Colonia 722 dentro de una ventana de navegador en CSS, Wedding en moto; `assets/service-*-800.webp`, 1000 × 750). Tarjeta con imagen interna redondeada, entregables como etiquetas y pie alineado con flecha en círculo, etiqueta del proyecto sobre la foto, tres entregables por servicio e introducción breve. El enlace web ahora va a Colonia (coincide con la imagen). Se prefirió trabajo propio a stock de Envato.
- «Un buen comienzo»: el acordeón de tres frases se reemplazó por un proceso de cuatro etapas en pestañas accesibles (Conversemos, Propuesta, Diseño, Entrega), barra de progreso, «Te llevas» por etapa y botón «Siguiente paso». Sin JS se ven las cuatro etapas. Textos de proceso redactados por el agente: Kevin debe confirmar que reflejan cómo trabaja (en especial «inversión por escrito» e «implementación»).
- Cierre Behance: se retiró el barrido coral (se veía como un error a mitad de animación). Ahora es una tarjeta oscura con borde; al pasar el cursor se ilumina el borde, aparece un brillo suave y el círculo de la flecha se llena de coral.
- Sobre mí: recorrido «Opitech · Totto · Fullreto.co · DDB · Findasense · Freelance» (Opitech añadido y Big Track retirado por indicación de Kevin, también en `profile.json`). Textos reescritos con el mismo contenido verificable (sin nuevos clientes ni cifras). `text-wrap:pretty/balance` sigue activo para evitar huérfanas.
- PDF de Ahead recomprimido 9,3 → 5,9 MB (imágenes a 1700 px, JPEG 74), aviso actualizado a «PDF · 6 MB». El video Save the Date (21 MB, 720 × 1280) ya estaba bien codificado: a la misma resolución no baja de peso y a 576 px solo baja a 17 MB, así que se conservó el original (carga con `preload=none` y faststart).

## Versión en inglés · 16 de noviembre (local, sin publicar)

- URLs: español en la raíz (canónica, `x-default`) e inglés en `/en/` con los mismos nombres de archivo (`/en/proyecto-ahead.html`). `hreflang` es/en/x-default, `og:locale` y sitemap con las 18 URL.
- Fuentes: `apps/portfolio/src/en/index.html`, `src/en/pages/*.html` y `src/en/sections/*.html`; textos compartidos en `content/site.en.json` (sobrescribe `site.json`); nombres y categorías de casos en `cases.json` (`titleEn`, `categoryEn`). El build reescribe `assets/`, CSS y JS a `../` en `/en/` y agrega el selector ES/EN al final de la navegación principal, conservando la sección visible.
- Regla: al cambiar una página en español, actualizar su par en inglés. `python3 -I scripts/i18n-structure.py <es> <en>` comprueba que la estructura HTML sea idéntica (solo cambia texto y atributos traducibles). Los ids y anclas siguen en español en ambas versiones.
- Tono: inglés cercano y directo, como el español; eslóganes y textos dentro de las piezas creativas se dejan en su idioma original. La 404 sigue solo en español (GitHub Pages sirve una única 404).
- JS (`v2.js`, `backgrounds.js`, `wedding-gallery.js`) traduce sus textos de interfaz según `<html lang>`.

## Preguntas frecuentes y selector de idioma · 16 de noviembre (local, sin publicar)

- Sección «Preguntas frecuentes / Antes de empezar» en la portada, entre Sobre mí y Contacto (`#preguntas`), dentro de un panel gris propio para separarla de Sobre mí. Por indicación de Kevin, la lista empieza oculta: el botón «Ver preguntas frecuentes (10)» la despliega y cada una de las 10 preguntas se abre por separado (todo con `<details>` nativo, sin JS; ninguna abierta por defecto). Respuestas aprobadas por Kevin: trabajo independiente con colaborador ocasional, tiempos de referencia (1–2, 4–6 y 6–10 semanas), pagos 50/50, dos rondas de ajustes por etapa, trabajo remoto, editables y derechos definidos en la propuesta, colaboraciones mensuales. El build genera `FAQPage` en JSON-LD con el mismo texto (Google limita hoy los resultados enriquecidos de FAQ a sitios oficiales; el marcado ayuda a entender la página, no garantiza un resultado especial).
- Selector de idioma: interruptor «ES | EN» con pastilla oscura en el idioma actual; al pasar el cursor se asoma hacia el otro y al hacer clic se desliza antes de cambiar de página (sin animación con movimiento reducido). Se retiraron reglas antiguas de `summary span` en `site.css` que giraban los desplegables.

## Color de acento · 16 de noviembre (local, sin publicar)

- Kevin cambió el coral porque se percibía como el color de Claude. Elegido tras vista previa en vivo: **rosa coral** `--coral:#ff9aa8` (sobre oscuro, 9,7:1) y **frambuesa** `--accent:#c2335a` (sobre blanco 5,4:1, sobre gris 4,8:1). Se descartaron lavanda, violeta, orquídea, ciruela (muy cercana al morado de Ahead), sandía, bermellón, albaricoque y amarillo.
- Uso sobrio por indicación de Kevin («que no se sienta invasivo»): rosa en cursivas de títulos, botones principales de contacto, etiqueta de «Un buen comienzo», barra fina del índice y etiquetas puntuales. Pasan a blanco/gris: asterisco, pestañas, progreso y «Te llevas» del panel, pastilla del caso destacado, etiquetas del bloque UX/UI, etiqueta de Behance, porcentaje del índice, flecha del botón y números de preguntas, relleno del botón con borde al pasar. Enlaces al caso en servicios: texto negro con subrayado frambuesa.
- Todos los tonos coral fijos del CSS pasaron a variables (`color-mix` para transparencias); `og-images.mjs` lee el acento de `tokens.css` y se regeneraron las nueve imágenes para compartir. Los colores propios de cada caso (Bimbo, Breakers, Colombia Real, Viajero, Ahead) no cambian.

## Validación y pendientes reales

Completado históricamente: check/build y diff de los cambios funcionales; revisión de nueve páginas a 320, 390, 820 y 1440 px del ajuste de márgenes; interacciones y foco según informe de prepublicación. Último ajuste orgánico revisado en móvil a 390 px sin overflow. Auditoría automática de noviembre sin infracciones en su cobertura, **no certificación WCAG**.

Pendientes:
1. (16/11) Search Console avisó «noindex» y «Página con redirección». En producción no hay noindex salvo en `404.html` (intencional) y las redirecciones http/www son correctas; ver `docs/estado.md`. Validación iniciada por Kevin en ambos motivos el 16/11; esperar el resultado. Consultar Search Console cuando haya datos: indexación de las nueve URLs, exclusiones, consultas, impresiones y clics. No confundir falta inicial de datos con error.
2. (16/11) Kevin confirmó que sus perfiles enlazan la web desde la bio. Sin acción pendiente.
3. (16/11) PageSpeed móvil en producción: Rendimiento 97, Accesibilidad 100, Prácticas 100, SEO 100 (FCP/LCP 0,9 s, TBT 0 ms, CLS 0,095). Quedan como sugerencias la caché de GitHub Pages (no configurable) y entregar portadas en WebP. Sin datos de campo todavía.
4. Accesibilidad: los cuatro videos son solo música (confirmado por Kevin el 16/11), no requieren subtítulos. Pendiente opcional: VoiceOver/TalkBack y dispositivos físicos; alt editorial, contraste sobre fotos, zoom y PDFs externos.
5. (16/11, Kevin pidió recordárselo en la próxima sesión) Testimonios reales de 2–3 clientes con nombre, cargo y autorización.
6. (16/11, pendiente) Analítica sin cookies con Cloudflare Web Analytics: Kevin crea la cuenta en dash.cloudflare.com → Web Analytics → Add a site → `kevingarzon.com` → instalación manual con fragmento JS (no mover el DNS de Porkbun) y comparte el fragmento para agregarlo al build en ES y EN.
7. (16/11, pendiente) Resultados verificables en los casos (solo con datos que entregue Kevin).
8. (16/11) Preguntas frecuentes aprobadas por Kevin e implementadas (ver abajo). Si cambian tiempos, pagos o rondas de ajustes, actualizar `sections/faq.html` y `en/sections/faq.html`.
9. Consolidar reglas de componentes a futuro solo en el alcance que Kevin solicite; no rehacer diseño ni migrar framework automáticamente.

## Continuidad operativa

Leer README y documentos específicos; revisar Git antes de editar. Mantener cambios en fuentes, no dist. No sobrescribir trabajo pendiente. Validar cambios funcionales, registrar evidencia y limitaciones, y mantener este archivo como resumen vigente. Añadir entradas al histórico en lugar de borrar decisiones anteriores.

Capturas QA en `private/` y originales del Escritorio/Downloads no se incluyen en Git: un clon nuevo no los tendrá. Los recursos públicos necesarios sí están en `apps/portfolio/public/`. Esta documentación preserva contexto, no es copia de seguridad de materiales originales ni de cuentas externas.
