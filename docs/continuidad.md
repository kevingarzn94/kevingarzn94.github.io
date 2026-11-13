# Continuidad vigente · 12 de noviembre de 2026

Documento de inicio para futuras sesiones sin acceso al chat original. Complementa AGENTS.md. Resume la historia del repositorio y las confirmaciones de Kevin; no es una nueva auditoría en vivo de servicios externos. El código y Git deben contrastarse al retomar.

## Estado de entrega

- Portafolio publicado: https://kevingarzon.com/ (canónica sin www).
- Repositorio personal: `kevingarzn94/kevingarzn94.github.io`, rama `main`. No confundir el usuario GitHub con la escritura del dominio.
- Último commit funcional: `c4af12d`, “Refuerza SEO organico y estabilidad visual”. Kevin compartió push exitoso y confirmó que el despliegue terminó.
- Hosting GitHub Pages vía Actions; DNS en Porkbun. HTTPS forzado confirmado durante esta sesión. No requiere contratar hosting adicional.
- Nueve páginas: portada y Ahead, Wedding Art, Centauro, Colonia, La Colombia Real, Bimbo, Breakers Fest y Viajero. Tres tarjetas adicionales enlazan a Behance, no son internas.
- Esta entrega posterior solo actualiza documentación. No modifica diseño, DNS ni cuentas; su commit/push aún debe registrarse cuando ocurra.

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

## Validación y pendientes reales

Completado históricamente: check/build y diff de los cambios funcionales; revisión de nueve páginas a 320, 390, 820 y 1440 px del ajuste de márgenes; interacciones y foco según informe de prepublicación. Último ajuste orgánico revisado en móvil a 390 px sin overflow. Auditoría automática de noviembre sin infracciones en su cobertura, **no certificación WCAG**.

Pendientes:
1. Consultar Search Console cuando haya datos: indexación de las nueve URLs, exclusiones, consultas, impresiones y clics. No confundir falta inicial de datos con error.
2. Kevin debe confirmar enlaces a la web e identidad coherente en sus perfiles propios de Instagram, Behance y LinkedIn. No asumir que los perfiles homónimos de búsqueda son suyos.
3. Medir rendimiento móvil real: API PageSpeed devolvió 429 por cuota; no hay puntuación ni LCP/INP/CLS verificados. Inventarios de peso son solo tamaños de archivos, no mediciones de carga. Usar Lighthouse/PageSpeed cuando esté disponible y datos de campo cuando existan.
4. Accesibilidad: audio/subtítulos y alternativas de cuatro videos; VoiceOver/TalkBack y dispositivos físicos; alt editorial, contraste sobre fotos, zoom y PDFs externos. Consultar auditoría para alcance exacto.
5. Consolidar reglas de componentes a futuro solo en el alcance que Kevin solicite; no rehacer diseño ni migrar framework automáticamente.

## Continuidad operativa

Leer README y documentos específicos; revisar Git antes de editar. Mantener cambios en fuentes, no dist. No sobrescribir trabajo pendiente. Validar cambios funcionales, registrar evidencia y limitaciones, y mantener este archivo como resumen vigente. Añadir entradas al histórico en lugar de borrar decisiones anteriores.

Capturas QA en `private/` y originales del Escritorio/Downloads no se incluyen en Git: un clon nuevo no los tendrá. Los recursos públicos necesarios sí están en `apps/portfolio/public/`. Esta documentación preserva contexto, no es copia de seguridad de materiales originales ni de cuentas externas.
