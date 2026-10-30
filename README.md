# Kevin Garzón · Portafolio

Portafolio privado en desarrollo: diseño digital, UX/UI, dirección de arte y fotografía. Incluye una portada y ocho páginas de proyecto; Ahead presenta un recorrido de estrategia, identidad, lanzamiento, experiencia digital y contenido.

## Desarrollo local

Requiere Node.js 22 o superior. No necesita instalar dependencias.

```sh
npm start
```

Abrir http://127.0.0.1:8766/. El servidor escucha únicamente en loopback y recompila al guardar. Usar esta dirección en lugar de abrir `dist/index.html` como archivo: los módulos del hero necesitan HTTP.

```sh
npm run check
npm run build
```

`check` construye y verifica páginas, enlaces locales, recursos, estructura y contenido retirado. `build` genera `dist/`; no editar esa carpeta.

## Estructura

- `apps/portfolio/src/sections/`: secciones compartidas de la portada y contacto.
- `apps/portfolio/src/pages/`: internas de los ocho proyectos.
- `apps/portfolio/content/`: datos de contacto, inventario editorial y procedencia de materiales.
- `apps/portfolio/public/`: imágenes optimizadas, vídeo, scripts y Three.js local con su licencia.
- `libs/ui/styles/`: tokens, estilos generales, componentes y estilos de Ahead.
- `libs/ui/motion/`: interacción general del sitio.
- `scripts/`: compilación, servidor local y comprobaciones.
- `docs/`: arquitectura, sistema de diseño, contenido y estado.
- `private/`: material de trabajo excluido de Git y del servidor.

## Documentación

- [Arquitectura](docs/arquitectura.md)
- [Sistema de diseño](docs/design-system.md)
- [Contenido y fuentes](docs/contenido-y-fuentes.md)
- [Estado y validación](docs/estado.md)

## Privacidad

`noindex` evita solicitar indexación, pero no sustituye autenticación. Publicado en GitHub Pages desde la cuenta personal de Kevin (decisión del 29 de octubre de 2026); `noindex` se mantiene mientras se define un dominio propio. El sitio utiliza copias seleccionadas y optimizadas de los archivos originales. No se incluyen las metas financieras personales.
