# Decisión de arquitectura

Referencia consultada en modo lectura: Ahead (README, libs/ui/README, organización apps/landing y contenido/marca.ts).

Se adoptan la separación de app / UI / documentación, el contenido editable y los tokens visuales. La publicación se prepara en un directorio generado separado del código fuente.

Se elige HTML estático renderizado en compilación, CSS y JavaScript de interacción. El contenido aparece en el HTML inicial para motores de búsqueda y funciona sin JavaScript. No hay necesidad actual de sesiones, reservas, bases de datos ni panel administrativo. Angular SSR, Supabase y el monorepo operativo de Ahead no se trasladan: pertenecen a las necesidades de aquel producto.

El hero conserva una alternativa estática con prefers-reduced-motion. Las tarjetas son enlaces nativos y el caso ampliado usa details/summary con teclado. Los breakpoints cubren móvil, tablet y escritorio; revisión visual pendiente en dispositivos físicos.

Para agregar proyectos con mayor profundidad, crear páginas HTML de caso y ampliar el compilador. Para fotografía, incorporar archivos originales optimizados, alt descriptivo, créditos y derechos confirmados.
