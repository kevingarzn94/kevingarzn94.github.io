# Accesibilidad del portafolio · 3 de noviembre de 2026

La portada y los ocho casos completaron las pruebas de escritorio y móvil. Después de los ajustes, axe-core 4.14.0 no señaló infracciones automáticas en ninguna de las 18 combinaciones de página y ancho. Quedan comprobaciones humanas, especialmente los cuatro vídeos. Este resultado no acredita conformidad completa con [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/).

## Cobertura y resultados

| Páginas | Escritorio, 1440 px | Móvil, 390 px | Espaciado a 320 px y texto al 200 % a 390 px |
| --- | --- | --- | --- |
| Portada, Ahead, Wedding Art, Centauro, Colonia 72, Bimbo, Breakers Fest, Viajero Co y La Colombia Real | 9 exploraciones sin infracciones automáticas | 9 exploraciones sin infracciones automáticas | 18 escenarios sin desplazamiento horizontal de la página |

Se probó la compilación local en Chrome. Los anchos móviles se simularon en navegador. Se usaron reglas A y AA disponibles de WCAG 2, 2.1 y 2.2 y buenas prácticas. Se desactivaron las animaciones durante el análisis estático para que el contenido estuviera visible. La prueba de espaciado aplicó interlineado de 1,5, separación de párrafos de 2 em, letras de 0,12 em y palabras de 0,16 em. El aumento al 200 % duplicó los tamaños de texto; no equivale al zoom nativo del sistema. El control de ancho del documento no descarta que un componente recorte texto internamente.

## Barreras corregidas

| Dónde | Qué impedía o dificultaba el uso | Ajuste y verificación |
| --- | --- | --- |
| Centauro y Bimbo | En secciones blancas, algunas palabras de titulares medían solo 1,84:1 y 2,8:1 de contraste, respectivamente. | Se oscurecieron los acentos de texto sobre blanco. También se ajustaron los titulares equivalentes de Breakers, Viajero y La Colombia Real. |
| Ahead | El texto pequeño de la muestra Terracota alcanzaba 3,56:1; los pasos inactivos del índice también perdían contraste. | Se conservó el color de marca de la muestra, con letras negras opacas, y se aumentó la opacidad del texto del índice. |
| Ahead y Breakers Fest | Una secuencia horizontal podía quedar fuera del recorrido con teclado en móvil. | Las secuencias reciben foco y tienen nombre. En Ahead también se identificó la región de piezas sociales. |
| Viajero Co | Ocho enlaces decían «Ampliar pantalla» visualmente, pero sus nombres accesibles omitían «pantalla». | Ahora el nombre empieza con la frase visible e identifica la pantalla concreta. |
| Controles compartidos y móvil | El nombre del interruptor no coincidía con «Movimiento»; la ampliación ponía presión sobre la cabecera y las columnas. | Se alineó el nombre y se permitió que navegación, texto y columnas se acomoden al ancho disponible. |

## Interacción y contenido

Se probaron los dos sentidos del abanico, las pestañas de Ahead, el acordeón, la apertura y cierre del índice móvil, el interruptor de movimiento, la galería de Wedding Art y la ampliación de Viajero. En los dos visores, una comprobación de foco simultánea en varias páginas dio un resultado ambiguo en escritorio. Se repitió por separado con teclado: Intro abrió el visor y llevó el foco a Cerrar; Escape lo devolvió exactamente al enlace de la foto o pantalla que lo abrió.

Las 277 apariciones de imágenes en el HTML generado tienen atributo alt. La presencia de ese atributo no establece que cada descripción comunique todo el contenido visual relevante. Las secuencias horizontales intencionales se evaluaron por separado del desbordamiento de la página.

## Pendientes priorizados

1. **Vídeos:** los dos de Ahead, el Save the Date de Wedding Art y la pieza de La Colombia Real contienen pista de audio y no incluyen una pista HTML de subtítulos. Revisar voz, sonidos significativos, texto en pantalla y posibles subtítulos incrustados. Crear subtítulos sincronizados para el audio informativo y una alternativa para la información visual que no se explique en el audio. La reproducción audiovisual no formó parte del barrido automático.
2. **Lectores de pantalla y dispositivos físicos:** recorrer portada → abanico → proyecto → visor → contacto con VoiceOver en iPhone y macOS y TalkBack en Android. Comprobar orden de lectura, anuncios del elemento activo, gestos y retorno del foco. El árbol accesible de Chrome no reproduce la experiencia hablada.
3. **Revisión visual y editorial:** comprobar títulos y controles sobre cada fondo fotográfico, nombres accesibles marcados como indeterminados y el espaciado dentro de componentes al aplicar zoom nativo. Leer las descripciones de pantallas, piezas de marca y fotografías junto con sus imágenes. El contraste indeterminado sobre imágenes no cuenta como aprobado.
4. **Documentos y destinos externos:** esta auditoría cubre el sitio HTML local. La estructura interna de los PDF y la accesibilidad de prototipos y álbumes enlazados requieren evaluación propia.

Verificación de entrega: pasaron la comprobación de recursos y enlaces del repositorio y la compilación de las nueve páginas. Los cambios son locales.
