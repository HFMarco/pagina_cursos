# Aula — prototipo estático

Prototipo inicial de una academia de un solo docente y varios cursos. No requiere instalación ni compilación: es HTML, CSS y JavaScript. El reproductor usa un clip CC0 de muestra alojado en MDN y limita la reproducción de demostración a 10 segundos.

## Publicarlo en Cloudflare Pages

### Recomendado: conectar un repositorio Git

1. Crea un repositorio en GitHub y sube `index.html`, `styles.css`, `app.js` y `README.md` a la raíz de la rama `main`.
2. En Cloudflare, abre **Workers & Pages → Create application → Pages → Connect to Git**.
3. Autoriza GitHub y selecciona el repositorio.
4. En la configuración del despliegue, deja el framework sin seleccionar, usa `main` como rama de producción, deja vacío el comando de compilación y usa `.` como directorio de salida.
5. Pulsa **Save and Deploy**. Cloudflare publicará el sitio en una dirección `*.pages.dev` y volverá a desplegarlo cada vez que actualices la rama.

### Subida directa

También puedes elegir **Workers & Pages → Create application → Pages → Drag and drop your files** y subir la carpeta del sitio o un ZIP con los archivos. Cloudflare te dará una dirección `*.pages.dev`. Este método no se puede convertir después en un proyecto conectado a Git; si quieres despliegues automáticos desde Git, elige la integración Git desde el principio.

La página y sus archivos estáticos son públicos. Pages sirve la interfaz, no procesa cuentas, pagos, matrículas ni permisos de acceso a cursos.

## Editar los cursos

Los datos de ejemplo están al inicio de `app.js`, en el arreglo `courses`: títulos, categorías, cantidad de lecciones y temario. Ahora solo se puede reproducir la primera lección de cada curso; las otras aparecen como espacios de ejemplo.

Para cambiar el video de muestra, sustituye la URL de `demoVideo` en `app.js`. La prueba detiene el clip a los 10 segundos mediante `sampleLimitSeconds`. Al tener videos reales, cada lección debe guardar su propia URL y duración.

## Video y crecimiento

- Para esta prueba, el archivo de video no se guarda en el repositorio: se carga desde una URL pública. Un clip de terceros sirve para probar el reproductor, no para alojar contenido propio.
- Cloudflare Pages aloja los archivos de la interfaz; no conviene incluir ahí una biblioteca grande de videos.
- Como siguiente paso gratuito/de bajo costo, se puede probar Cloudflare R2 con un bucket de desarrollo público. El plan gratuito incluye 10 GB-mes de almacenamiento estándar, pero la dirección pública `r2.dev` tiene límites variables y está destinada a pruebas.
- Para una academia real con bastantes videos, conviene un servicio de video como Cloudflare Stream: se encarga de guardar, codificar y entregar los videos; cobra por minutos almacenados y reproducidos.
- Un video no listado de YouTube también sirve para una maqueta gratuita, pero cualquier persona con el enlace puede verlo y compartirlo; no es control de acceso.

Para aceptar lecciones de hasta 30 minutos, el reproductor HTML no necesita cambiar. Se reemplaza el límite de la demo por la duración real de cada video; más adelante el servidor debe validar el máximo de 1,800 segundos al cargar/publicar. Para cursos privados o pagados también hará falta autenticación y autorización del lado del servidor; esconder un enlace en JavaScript no protege el contenido.

## Framework más adelante

La versión actual está lista para publicar tal cual, sin framework. Si el catálogo crece y se quiere reutilizar componentes, una ruta sencilla es migrar a Astro o Vite + React. Cloudflare Pages reconoce esos frameworks y compila automáticamente desde Git al elegir el preset adecuado; la carpeta publicada normalmente será `dist` para Vite y Astro. Cloudflare también genera enlaces de vista previa para otras ramas.
