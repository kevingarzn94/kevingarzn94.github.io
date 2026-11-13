> ARCHIVO HISTÓRICO. Para iniciar una sesión usar [continuidad vigente](continuidad.md) y README. Los pendientes de HTTPS, noindex y publicación de este documento fueron resueltos posteriormente. No ejecutar su instrucción sugerida sin contrastar el estado actual.

# Continuidad de sesión · 5 de noviembre de 2026

Resumen para retomar el trabajo desde Codex o Claude después de borrar el chat. Resume decisiones y resultados de la conversación, contrastados con el repositorio local el 5 de noviembre. No es una transcripción. Las comprobaciones de servicios externos que figuran aquí son históricas del 4 de noviembre, salvo indicación contraria.

## Punto de partida

- Propietario y autor del portafolio: Kevin Garzón. Conversación y acompañamiento en español, con instrucciones concretas y paso a paso cuando se trabaja en paneles de configuración.
- Carpeta local: `/Users/kevingarzon/Desktop/Work/Pagina Web Kevin`.
- Repositorio: https://github.com/kevingarzn94/kevingarzn94.github.io . El usuario es `kevingarzn94` (sin la «o» de Garzón).
- Dominio principal elegido y comprado: https://kevingarzon.com/ . Registrador: Porkbun. Hosting: GitHub Pages.
- Último commit funcional local al preparar este resumen: `94eac62`, «Mejora la accesibilidad y la navegación del portafolio». La sesión registra su publicación exitosa mediante GitHub Actions.
- Leer primero `AGENTS.md`, este archivo y `docs/auditoria-accesibilidad-2026-11-03.md`. `docs/estado.md` contiene la evolución detallada. Sus notas antiguas de «sin publicar» describen momentos anteriores y no el estado final de esta sesión.

## Diseño e interacción acordados

El feedback original pedía dominio profesional, navegación más evidente del abanico, un símbolo menos parecido al logo de Claude y mejor legibilidad/accesibilidad.

- Conservar la esencia animada del abanico tanto en landing como en proyectos. Tarjetas cuadradas 1:1, apertura ligada al scroll e interacción. Navegación mediante flechas, arrastre y teclado.
- Kevin aprobó flechas discretas, sin círculo o fondo permanente, con área táctil de 44 × 44 px. Mostrar solo el nombre de proyecto/tarjeta, sin «2/5». Se retiró la instrucción visible «Arrastra o usa las flechas».
- Asterisco propio de seis brazos rectos y extremos planos. Evitar el acento coral en ese símbolo. Mantenerlo interactivo y respetar movimiento reducido.
- Kevin pidió conservar especialmente la animación del asterisco al cierre de Ahead. Se dejó gris neutro claro. `docs/estado.md` registra el token compartido `--asterisk-gray` y el valor `#929292` para ese cierre. Consultar el CSS vigente antes de modificarlo.
- Sobre mí incorpora el uso de IA bajo la dirección, estructura e ideación de Kevin. Proyectos confirmados por él: Ahead, Mauricio Lizcano/La Colombia Real, Colonia 72 y Amor a mordiscos. Apoyo en creación de imagen/vídeo y, en web, estructura, desarrollo y prototipos. Mantener esta atribución sin inventar herramientas ni resultados.

## Accesibilidad completada y límites

Se mejoraron tamaños secundarios, contraste, foco, nombres accesibles y adaptación de navegación y columnas. La auditoría documentada del 3 de noviembre cubrió las nueve páginas a 1440 y 390 px con axe-core 4.14.0, sin infracciones automáticas tras corregirlas. También se revisaron espaciado, ampliación de texto e interacciones. Esto no acredita conformidad WCAG completa.

Pendientes del informe, todavía abiertos en esta sesión:

1. Revisar audio e información visual de cuatro vídeos (dos de Ahead, Wedding Art y La Colombia Real), subtítulos y alternativas necesarias.
2. Pruebas con VoiceOver/TalkBack y dispositivos físicos. La simulación móvil de Chrome no las sustituye.
3. Revisión editorial de alt, contraste sobre fotos, zoom nativo y posible recorte dentro de componentes.
4. Accesibilidad de PDFs y destinos externos.

Consultar el informe para cobertura, resultados y límites exactos. No presentar todos estos pendientes como resueltos.

## Dominio y DNS

Se consideraron nombres como kev.work y kevingarzon, y se compararon Namecheap/Porkbun. Kevin eligió y compró `kevingarzon.com` en Porkbun el 4 de noviembre de 2026. El carrito mostraba USD 11.81 por un año y renovación estimada de USD 11.81; son importes históricos, no garantía de precio futuro.

Configuración confirmada en capturas de Porkbun y consultas públicas durante la sesión:

| Tipo | Host en Porkbun | Destino | TTL |
| --- | --- | --- | --- |
| ALIAS | Vacío (dominio raíz) | `kevingarzn94.github.io` | 600 |
| CNAME | `www` | `kevingarzn94.github.io` | 600 |

Los antiguos destinos `uixie.porkbun.com` se sustituyeron. El CNAME antes comodín `*` pasó a `www`. Los MX de reenvío de correo de Porkbun y TXT existentes se conservaron. Los nameservers siguen siendo de Porkbun. Las capturas muestran renovación automática, privacidad WHOIS y bloqueo de transferencia activos.

GitHub Pages tiene el dominio personalizado `kevingarzon.com`, con origen de publicación GitHub Actions. La comprobación DNS terminó en verde. No se contrató hosting adicional para alojar este portafolio en Porkbun. Su panel mostraba además un servicio gratuito link-in-bio/redirección y «URL Forwarding: Configured»; no se verificó su cancelación. Si hay problemas futuros, inspeccionar la configuración vigente antes de modificar servicios o registros.

## HTTPS pendiente de confirmación final

Últimas verificaciones públicas del 4 de noviembre, alrededor de las 15:03 (Bogotá):

- `https://kevingarzon.com/` respondía HTTP 200 con el portafolio y certificado válido.
- `https://www.kevingarzon.com/` apuntaba a GitHub pero fallaba la validación del certificado. Una consulta previa mostró un certificado genérico de GitHub, sin cobertura de ese nombre.
- `http://kevingarzon.com/` devolvía HTTP 200 sin redirección a HTTPS.

La captura de GitHub de las 15:07 mostraba DNS correcto y aprovisionamiento TLS en paso 3 de 3, «Certificado activo». Indicaba esperar 30–60 minutos para disponibilidad global. La casilla «Habilitar HTTPS» aún estaba deshabilitada mientras finalizaba el proceso (el aviso mencionaba hasta 24 horas).

Primer trabajo al retomar este tema:

1. Comprobar de nuevo HTTPS del dominio raíz y de `www`, y las redirecciones desde HTTP. No reutilizar como diagnóstico actual los resultados del 4 de noviembre.
2. Consultar https://github.com/kevingarzn94/kevingarzn94.github.io/settings/pages y activar «Enforce HTTPS / Habilitar HTTPS» cuando esté disponible.
3. Si `www` sigue fallando, revisar DNS y aprovisionamiento del certificado antes de cambiar registros. La documentación de GitHub contempla quitar y volver a añadir el dominio para reiniciar la emisión si esta se atasca; valorar el estado actual antes de ejecutarlo.

Referencia: https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https

## Seguridad de la cuenta

Kevin confirmó que completó la autenticación de dos factores de GitHub el 4 de noviembre. Usa iPhone y la app Contraseñas de Apple. Hubo intentos fallidos por un código ya guardado; se confirmó en GitHub que 2FA aún estaba deshabilitado, se eliminó solo ese código del intento previo en el iPhone y se vinculó un QR nuevo. Después Kevin confirmó el éxito. No reiniciar esa configuración por las incidencias históricas.

Se indicó guardar los códigos de recuperación. No hubo confirmación explícita de que los hubiera guardado. La activación de 2FA en Porkbun no se verificó en esta conversación.

Este resumen excluye contraseñas, QR de autenticación, secretos TOTP, códigos de recuperación y datos personales de registro mostrados en capturas. No incorporar esos materiales al repositorio.

## Trabajo local y publicación

- Node.js 22 o superior. `npm start` sirve en `http://127.0.0.1:8766/`, compila y observa cambios.
- `npm run check` y `npm run build` antes de entregar cambios funcionales, según `AGENTS.md`.
- Editar fuentes en `apps/portfolio/src/`, contenido en `apps/portfolio/content/`, recursos en `apps/portfolio/public/`, estilos en `libs/ui/styles/` y movimiento en `libs/ui/motion/`. `dist/` es generado.
- El workflow `.github/workflows/` publica `dist/` en GitHub Pages al hacer push a `main`, después de check/build. Un push documental a main también puede disparar ese flujo.
- `private/` contiene material local excluido de Git y del servidor. Este resumen no respalda esos archivos ni las capturas del escritorio.
- Respetar la restricción de `AGENTS.md` sobre Ahead como referencia de solo lectura. No modificar ni publicar su proyecto ni utilizar sus identificadores de hosting.
- Sigue presente `noindex, nofollow` en las nueve plantillas, y `scripts/check.mjs` lo exige. Con el dominio propio ya comprado, decidir con Kevin si quiere indexación antes de cambiarlo. No se acordó retirarlo en esta sesión.

## Instrucción sugerida para un nuevo chat

«Retomemos mi portafolio en esta carpeta. Lee AGENTS.md, docs/continuidad-2026-11-05.md y el informe de accesibilidad. Dime el estado actual y verifica primero HTTPS y www de kevingarzon.com. Conserva las decisiones visuales aprobadas y distingue los pendientes históricos de lo que compruebes ahora.»
