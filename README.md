# Cyber Aula — prototipo estático

Prototipo de una academia de redes y ciberseguridad de un solo docente. No requiere instalación ni compilación: es HTML, CSS y JavaScript.

La portada pública presenta el catálogo, datos de cada curso y previews. Al iniciar sesión aparece el espacio personal con cursos, certificados y soporte. Si el usuario no tiene matrículas, se muestra el estado vacío. Al abrir un curso se oculta la portada y se ve la ficha, el programa, los resultados de aprendizaje y la preview del reproductor. El clip temporal de MDN se limita a 10 segundos.

## Publicarlo en Cloudflare Pages

### Recomendado: conectar un repositorio Git

1. Crea un repositorio en GitHub y sube `index.html`, `styles.css`, `app.js`, `supabase-config.js` y `README.md` a la raíz de la rama `main`.
2. En Cloudflare, abre **Workers & Pages → Create application → Pages → Connect to Git**.
3. Autoriza GitHub y selecciona el repositorio.
4. En la configuración del despliegue, deja el framework sin seleccionar, usa `main` como rama de producción, deja vacío el comando de compilación y usa `.` como directorio de salida.
5. Pulsa **Save and Deploy**. Cloudflare publicará el sitio en una dirección `*.pages.dev` y volverá a desplegarlo cada vez que actualices la rama.

### Subida directa

También puedes elegir **Workers & Pages → Create application → Pages → Drag and drop your files** y subir la carpeta del sitio o un ZIP con los archivos. Cloudflare te dará una dirección `*.pages.dev`. Este método no se puede convertir después en un proyecto conectado a Git; si quieres despliegues automáticos desde Git, elige la integración Git desde el principio.

La página y sus archivos estáticos son públicos. Pages sirve la interfaz, no procesa cuentas, pagos, matrículas ni permisos de acceso a cursos.

## Trabajar desde VS Code

### Extensiones útiles

- **Live Server** (Ritwick Dey): vista previa local y recarga al guardar.
- **Prettier - Code formatter**: formato consistente para HTML, CSS y JavaScript.
- **GitLens** (opcional): historial y cambios de Git dentro del editor. VS Code ya incluye integración básica con Git.

No hace falta una extensión de Cloudflare para que los despliegues funcionen: al conectar el repositorio con Pages, cada `git push` a la rama de producción genera un nuevo despliegue.

### Abrir el repositorio correcto

1. Instala Git para Windows si aún no está instalado. Comprueba en la terminal de VS Code con `git --version`.
2. Abre la paleta con `Ctrl+Shift+P`, ejecuta **Git: Clone** e ingresa la URL HTTPS del repositorio GitHub que ya está conectado a Cloudflare Pages.
3. Selecciona una carpeta local y abre el repositorio clonado en VS Code.
4. Copia ahí los archivos actualizados (`index.html`, `styles.css`, `app.js` y `README.md`), reemplazando los anteriores si corresponde. Conserva tu `supabase-config.js` ya configurado; la copia del espacio de Codex puede tener los campos vacíos.
5. Abre esa carpeta en VS Code. En **Source Control**, revisa los cambios, escribe un mensaje como `Actualiza academia de ciberseguridad`, pulsa **Commit** y luego **Sync Changes** o **Push**.
6. Cloudflare Pages compilará/publicará el commit automáticamente. Revisa el estado en **Workers & Pages → tu proyecto → Deployments**.

Si la terminal dice `fatal: not a git repository`, confirma que abriste la carpeta clonada del repositorio y no otra carpeta. Si ya tienes un repositorio remoto, clónalo con **Git: Clone**; no inicialices una carpeta distinta con `git init`.

## Editar los cursos

Los datos de ejemplo están al inicio de `app.js`, en el arreglo `courses`: títulos, categorías, niveles, duración, temario, descripción y resultados de aprendizaje. Cada ficha permite ver la preview; la primera lección se reproduce y las siguientes abren el aviso de compra próxima.

La tarjeta de compra es ilustrativa. No hay pasarela de pago, tabla de matrículas ni creación automática de certificados todavía; por eso las cuentas autenticadas ven el estado vacío hasta conectar esos datos.

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

## Activar acceso y verificación de correo

El formulario usa Supabase Auth para crear cuentas, confirmar el correo e iniciar/cerrar sesión. La página nunca guarda la contraseña por su cuenta. Antes de publicarlo:

1. Crea un proyecto en Supabase.
2. En **Authentication → Providers → Email**, deja habilitados los registros y **Confirm email**.
3. En **Authentication → URL Configuration**, configura el **Site URL** con la URL de producción `https://TU-PROYECTO.pages.dev/` y agrégala también a **Redirect URLs**. Si pruebas con Live Server, agrega su URL local, por ejemplo `http://127.0.0.1:5500/**`.
4. En Supabase, copia la **Project URL** y la **Publishable key** a `supabase-config.js`. La clave publicable está diseñada para uso en el navegador; nunca uses una Secret key ni una `service_role` en el frontend.
5. Guarda, sube el cambio al repositorio y espera el despliegue de Cloudflare Pages.

La interfaz indica si el correo fue confirmado. La autenticación no restringe todavía las páginas ni los videos: esa autorización se debe implementar aparte, en servidor, antes de usar cursos privados o pagados. La clave publicable puede estar en el repositorio, pero no contiene privilegios secretos.
