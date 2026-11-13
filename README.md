# Kevin Garzón · Portafolio

Sitio público de diseño gráfico, dirección de arte, UX/UI, fotografía y video. Portada y ocho casos de proyecto. **Estado actualizado al 12 de noviembre de 2026: publicado en https://kevingarzon.com/**. Último cambio funcional publicado: `c4af12d`; despliegue confirmado por Kevin en la conversación. Esta actualización de documentación se prepara después de ese commit.

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

Abrir http://127.0.0.1:8766/. El servidor recompila al guardar y solo escucha en loopback. No abrir el HTML generado como archivo: los módulos necesitan HTTP.

```sh
npm run check
npm run build
```

`check` construye y comprueba las nueve páginas, recursos, enlaces locales, estructura y SEO. No sustituye pruebas visuales, de accesibilidad ni disponibilidad de enlaces externos. `build` genera `dist/`; nunca editarlo directamente.

## Dónde trabajar

| Ruta | Responsabilidad |
| --- | --- |
| `apps/portfolio/src/index.html` y `src/sections/` | Portada y secciones compartidas |
| `apps/portfolio/src/pages/` | Ocho casos en HTML |
| `apps/portfolio/content/` | Identidad, enlaces e inventarios de procedencia |
| `apps/portfolio/public/` | Recursos optimizados y JavaScript del sitio |
| `libs/ui/styles/` | Tokens, estilos compartidos y particulares; `v2.css` cierra la cascada |
| `libs/ui/motion/` | Movimiento del hero heredado; comprobar qué carga la plantilla actual |
| `scripts/` | Compilación, servidor y validación |
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
