# HTTPS e indexación · 12 de noviembre de 2026

## Diagnóstico público

- `http://kevingarzon.com` devuelve 200 sin redirigir a HTTPS.
- `http://www.kevingarzon.com` redirige a la variante sin www, pero conserva HTTP.
- Las dos variantes HTTPS responden sin error de validación TLS en curl; www redirige a https://kevingarzon.com/.
- El HTML público de inicio contiene `noindex, nofollow`, confirmado por descarga directa. Es un bloqueo explícito de indexación, heredado de la etapa previa al dominio.
- No se encontraron cargas HTTP en las plantillas; las referencias HTTP del proveedor Three son comentarios o namespaces, no evidencia de contenido mixto.

Esto explica una causa concreta del aviso de seguridad, aunque no demuestra qué conexión exacta usó cada captura del teléfono.

## Implementación local

- Indexación habilitada en las nueve plantillas.
- URL oficial centralizada en content/site.json, sin www, coherente con la redirección pública existente.
- Canonical y metadatos Open Graph por página.
- Sitemap XML y robots.txt generados a partir de las páginas compiladas.
- Datos estructurados Person y WebSite con nombre, profesión y perfiles ya presentes en el contenido público. No se añaden resultados comerciales ni credenciales.
- Título de portada: Kevin Garzón | Diseñador y director de arte en Bogotá.
- Check actualizado para evitar que regrese noindex y comprobar canonical, sitemap y JSON-LD.

Check, build y diff verificados. Sin publicación ni cambios de DNS o ajustes de cuenta. No se han medido Core Web Vitals ni se afirma una mejora de velocidad por estos cambios de indexación.

## Completar HTTPS

1. Abrir https://github.com/kevingarzn94/kevingarzn94.github.io/settings/pages con la cuenta propietaria.
2. Activar **Enforce HTTPS**. No borrar ni cambiar el dominio.
3. Si está deshabilitado, revisar el estado del certificado y el diagnóstico DNS que muestra GitHub antes de modificar registros.
4. Comprobar que http://kevingarzon.com y http://www.kevingarzon.com terminan en https://kevingarzon.com/.
5. Usar https://kevingarzon.com/ en los enlaces de Instagram, Behance y LinkedIn. Si el teléfono conserva el aviso, abrir una pestaña nueva con esa URL y revisar el detalle del aviso.

Referencia: https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https

## Después de publicar

1. Abrir https://search.google.com/search-console y agregar la propiedad de dominio kevingarzon.com.
2. Verificarla con el TXT exacto proporcionado por Google en el proveedor DNS. No inventar ni compartir credenciales.
3. Enviar https://kevingarzon.com/sitemap.xml en Sitemaps.
4. Inspeccionar https://kevingarzon.com/, probar la URL publicada y solicitar indexación. Revisar cualquier exclusión que informe Search Console.
5. Mantener el nombre profesional y el enlace oficial coherentes en los perfiles propios. No asumir que otros perfiles homónimos de los resultados pertenecen a Kevin.
6. Observar impresiones, clics y consultas por nombre en Rendimiento. La indexación puede tardar días o semanas y no garantiza una posición determinada.

Referencias:
- https://developers.google.com/search/docs/crawling-indexing/block-indexing
- https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- https://developers.google.com/search/help/site-position-in-search-faq

La prioridad es SEO orgánico. SEM implica anuncios pagados y no corrige la exclusión por noindex ni compra una mejor posición orgánica. No se han creado campañas ni realizado gastos.

## Revisión orgánica de contenido y carga — 12/11/2026

Estado confirmado posteriormente en producción y capturas del usuario: HTTPS forzado; propiedad de dominio verificada en Search Console; sitemap correcto con nueve páginas descubiertas; solicitud de indexación enviada y prueba publicada apta para indexación. Esto no confirma aún indexación ni posición.

Ajustes locales posteriores:
- Nombre completo, profesión y Bogotá, Colombia en el párrafo de presentación.
- Servicio web identificado como UX/UI y servicio audiovisual explicado como fotografía, video y dirección de arte.
- Descripción de portada y metadatos de Ahead, Wedding, Bimbo y Breakers más concretos, sin alterar sus créditos ni el hero creativo.
- Dimensiones intrínsecas añadidas a imágenes de las secciones compartidas para reservar proporciones antes de cargar; se respetan las dimensiones definidas por CSS.
- Logo de la tarjeta de Ahead con carga diferida, coherente con su imagen de portada.

Inventario local de recursos: portada con aproximadamente 1318 KiB en imágenes sin lazy antes del ajuste del logo (26 KiB pasan a carga diferida). Es suma de tamaños de archivos, no transferencia medida ni ahorro garantizado al iniciar: el navegador decide cuándo cargar imágenes cercanas al viewport. Los cuatro videos de los casos ya usan preload=none. No se descargó ni recomprimió el material visual.

PageSpeed Insights API devolvió 429 por cuota agotada; no se obtuvo puntuación móvil, LCP, INP ni CLS. Queda pendiente una medición de laboratorio en PageSpeed/Lighthouse y, cuando haya tráfico suficiente, los datos de campo. No se atribuye una mejora de Core Web Vitals a estos cambios sin medirla.

Verificación: check, build y diff correctos; presentación revisada en navegador a 390 px sin desbordamiento horizontal. Captura privada en private/qa-seo-20261112/about-mobile.jpg.

Acción externa recomendada: usar el enlace https://kevingarzon.com/ y una identidad profesional coherente en los perfiles propios de Instagram, Behance y LinkedIn. No se modificaron perfiles ni se crearon anuncios. Cambios de esta revisión aún sin publicar.
