# Kevin Garzón · Portafolio

Sitio público de diseño gráfico, dirección de arte, UX/UI, fotografía y video. Portada y ocho casos de proyecto, en español (raíz) e inglés (`/en/`). **Estado al 17 de noviembre de 2026: publicado en https://kevingarzon.com/**. Último cambio funcional: `0c62422` (portada renovada, versión en inglés, preguntas frecuentes y color rosa coral), publicado el 16/11 (workflow n.º 18 en verde, comprobado en producción: ES y EN responden 200, interruptor, preguntas, sitemap de 18 URL y rosa coral).

## Retomar aquí · sesión del 16 y 17 de noviembre de 2026 (cerrada)

La conversación se cerró sin memoria ni archivos temporales: todo el contexto necesario queda en este README, `docs/continuidad.md` y `docs/estado.md`. Para continuar, abrir un chat nuevo y pedir que lea este README.

**Qué se hizo:** diagnóstico de Search Console (avisos de noindex por rastreos anteriores al 12/11; validación iniciada por Kevin), PageSpeed móvil 97/100/100/100, PDF de Ahead 9,3 → 5,9 MB, servicios con fotos propias y WhatsApp por servicio, proceso «Un buen comienzo» en cuatro pestañas, cierre de Behance rediseñado, textos de Sobre mí y recorrido («Opitech · Freelance · Findasense · DDB · Fullreto.co · Totto»), versión completa en inglés con interruptor ES|EN, preguntas frecuentes plegables (respuestas aprobadas por Kevin) y cambio del coral al **rosa coral** `#ff9aa8` / frambuesa `#c2335a` con uso sobrio (el coral se percibía como el color de Claude).

**Pendientes para la próxima sesión (recordárselos a Kevin al empezar):**
1. **Search Console:** sitemap reenviado el 17/11 («Correcto», 18 páginas descubiertas, incluye `/en/`). Google confirmó por correo el inicio de la validación de «noindex» (7 páginas) y «Página con redirección» (1). Pendiente: revisar el correo de resultado; las variantes `www`/`http` seguirán como redirección (normal). No reenviar ni volver a validar mientras esté en curso.
2. **Testimonios reales** de 2–3 clientes (Ahead, Colonia, Michelle y Felipe…) con nombre, cargo y autorización de cada persona. Kevin los consigue.
3. **Medición de visitas sin cookies** con Cloudflare Web Analytics: Kevin crea cuenta en dash.cloudflare.com → Web Analytics → Add a site → `kevingarzon.com` → instalación manual (fragmento JS; no mover el DNS de Porkbun) y comparte el fragmento para agregarlo al build en ES y EN.
4. **Resultados verificables en los casos** (alcance, visitas, cifras): solo con datos que entregue Kevin; no inventar.
5. **Revisar decisiones de traducción** al inglés: «moño» → «bow» (Wedding, foto 06), «candidatura presidencial» → «presidential campaign» (La Colombia Real), titular de Colonia «Arrive. Rest. Live Colonia.», eslóganes de Breakers y Bimbo conservados en español.
6. Al cambiar cualquier texto en español, actualizar su par en `apps/portfolio/src/en/` y validar con `python3 -I scripts/i18n-structure.py <es> <en>`. Si cambian el acento o los títulos, regenerar las imágenes para compartir con `node scripts/og-images.mjs`.

## Empezar aquí en cada sesión (ChatGPT, Claude o cualquier colaborador)

1. Leer [AGENTS.md](AGENTS.md): alcance y restricciones obligatorias.
2. Leer [continuidad vigente](docs/continuidad.md): decisiones aprobadas, historia, publicación y pendientes reales.
3. Consultar [estado](docs/estado.md) y el documento específico del cambio.
4. Ejecutar `git status --short` y `git log -8 --oneline`. Conservar cambios ajenos; contrastar los documentos con el código actual.
5. Antes de entregar cambios funcionales, ejecutar `npm run check` y `npm run build`, y revisar las vistas/interacciones afectadas. Registrar alcance y limitaciones.
6. Actualizar `docs/continuidad.md` y añadir una entrada fechada en `docs/estado.md`. Diferenciar preparado, validado, enviado a GitHub y desplegado. No llamar publicado a un cambio solo porque pasó build.

Las notas antiguas son historia, no tareas pendientes automáticamente. En particular, **no restaurar noindex, switches de movimiento ni el estado “en desarrollo” de Colonia**. No se necesita el chat eliminado para continuar. Las capturas privadas y archivos fuera de Git no quedan respaldados por estos documentos.

## Desarrollo local

Node.js 22 o superior; no necesita instalar dependencias.

```sh
npm start
```

Abrir http://127.0.0.1:8766/. El servidor recompila al guardar y solo escucha en loopback. Si cambia `scripts/build.mjs`, detenerlo y volver a ejecutar `npm start`. No abrir el HTML generado como archivo: los módulos necesitan HTTP.

```sh
npm run check
npm run build
```

`check` construye y comprueba las nueve páginas, la 404, recursos, enlaces locales, imágenes para compartir, navegación entre casos, estructura y SEO. No sustituye pruebas visuales, de accesibilidad ni disponibilidad de enlaces externos. `build` genera `dist/`; nunca editarlo directamente.

## Dónde trabajar

| Ruta | Responsabilidad |
| --- | --- |
| `apps/portfolio/src/index.html` y `src/sections/` | Portada y secciones compartidas |
| `apps/portfolio/src/pages/` | Ocho casos en HTML |
| `apps/portfolio/src/en/` | Versión en inglés (`/en/`): misma estructura; validar con `scripts/i18n-structure.py` |
| `apps/portfolio/content/` | Identidad, enlaces e inventarios de procedencia; `cases.json` ordena los casos y genera anterior/siguiente |
| `apps/portfolio/public/` | Recursos optimizados y JavaScript del sitio |
| `libs/ui/styles/` | Tokens, estilos compartidos y particulares; `v2.css` cierra la cascada |
| `scripts/` | Compilación, servidor y validación; `og-images.mjs` regenera las imágenes para compartir (local, opcional) |
| `docs/` | Decisiones, informes y continuidad versionada |
| `private/`, `dist/` | Material privado local y salida generada, excluidos de Git |

Los JSON de inventario no generan automáticamente las páginas. `site.json` sí resuelve variables compartidas; revisar también HTML al cambiar contenido.

## Publicación y documentación

Hosting: GitHub Pages; dominio y DNS: Porkbun. Repositorio: https://github.com/kevingarzn94/kevingarzn94.github.io . Un push a `main`, incluso documental, dispara el workflow. Confirmar Actions en verde después de publicar. No reutilizar cuentas ni destinos de Ahead/Opitech.

- [Continuidad vigente e historial de commits](docs/continuidad.md)
- [Publicación y dominio](docs/github-pages.md)
- [SEO orgánico, HTTPS y Search Console](docs/seo-https.md)
- [Arquitectura](docs/arquitectura.md)
- [Sistema de diseño](docs/design-system.md)
- [Contenido y fuentes](docs/contenido-y-fuentes.md)
- [Bitácora histórica](docs/estado.md)
- [Revisión previa a publicación](docs/revision-prepublicacion-2026-11-12.md)
- [Auditoría de accesibilidad y límites](docs/auditoria-accesibilidad-2026-11-03.md)

## Instrucción para iniciar otro chat

> Retomemos este portafolio. Lee README.md, AGENTS.md y docs/continuidad.md antes de editar. Contrasta el estado con Git, respeta las decisiones aprobadas y los créditos. Trabaja solo en este repositorio. Mi siguiente solicitud es: [describir el ajuste]. Al terminar, valida y actualiza la trazabilidad, sin publicar salvo que te lo indique.
