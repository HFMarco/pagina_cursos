# Cyber Aula — prototipo estático

Prototipo de una academia de redes y ciberseguridad de un solo docente, con rutas de preparación Fortinet, Cisco CCNA y MikroTik. No requiere instalación ni compilación: es HTML, CSS y JavaScript.

La portada pública presenta las rutas de certificación, beneficios de la academia, contacto, preguntas frecuentes y redes sociales. Cualquier visitante puede ver la introducción de 10 segundos; las lecciones restantes quedan bloqueadas hasta tener matrícula. Al iniciar sesión se abre el espacio personal, una vista separada con sus cursos, certificados y soporte. Si no tiene cursos habilitados, aparece un mensaje de estado vacío. La barra superior cambia según la sesión.

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
4. Copia ahí los archivos actualizados (`index.html`, `styles.css`, `app.js`, `supabase-schema.sql` y `README.md`), reemplazando los anteriores si corresponde. Conserva tu `supabase-config.js` ya configurado; la copia del espacio de Codex puede tener los campos vacíos.
5. Abre esa carpeta en VS Code. En **Source Control**, revisa los cambios, escribe un mensaje como `Actualiza academia de ciberseguridad`, pulsa **Commit** y luego **Sync Changes** o **Push**.
6. Cloudflare Pages compilará/publicará el commit automáticamente. Revisa el estado en **Workers & Pages → tu proyecto → Deployments**.

Si la terminal dice `fatal: not a git repository`, confirma que abriste la carpeta clonada del repositorio y no otra carpeta. Si ya tienes un repositorio remoto, clónalo con **Git: Clone**; no inicialices una carpeta distinta con `git init`.

## Editar los cursos

Los datos de ejemplo están al inicio de `app.js`, en el arreglo `courses`: títulos, categorías, ruta de certificación, niveles, duración, temario, descripción y resultados de aprendizaje. Los IDs de curso son `fortinet`, `ccna` y `mikrotik`. Cada ficha permite ver la preview; las lecciones adicionales quedan bloqueadas para visitantes y se habilitan en la interfaz al detectar una matrícula activa. La preparación del curso no equivale a la certificación oficial: el alumno debe cumplir los requisitos y aprobar el examen correspondiente.

Antes de grabar o publicar un temario definitivo, revisa los objetivos oficiales vigentes: [Fortinet Training & Certification](https://www.fortinet.com/training-certification), [Cisco CCNA](https://www.cisco.com/web/go/ccna/) y [MikroTik Training](https://mikrotik.com/training/about). Los programas y exámenes pueden actualizarse.

La tarjeta de compra es ilustrativa: todavía no procesa pagos ni crea matrículas. Las matrículas y certificados se consultan en Supabase. El dashboard se actualiza automáticamente al recibir eventos Realtime; también vuelve a consultar los datos al regresar a la pestaña o ventana.

### Activar matrículas, certificados y actualizaciones automáticas

1. En tu proyecto Supabase, abre **SQL Editor**, copia el contenido de `supabase-schema.sql` y ejecútalo. Crea las tablas `enrollments` y `certificates`, activa Row Level Security para que cada alumno solo pueda leer sus propios registros y publica las tablas para Realtime.
2. Para probar el flujo sin pagos, abre **Table Editor → enrollments → Insert row**. En `user_id` coloca el UUID del alumno, que puedes copiar desde **Authentication → Users**. Usa un `course_id` exactamente como `fortinet`, `ccna` o `mikrotik`, y `status` = `active`. Al guardar, el curso aparecerá en su espacio sin que tenga que pulsar F5.
3. Los certificados se muestran al insertar un registro en `certificates` con el `user_id`, `course_id` y, opcionalmente, `certificate_url`.

La página no permite que un alumno se otorgue una matrícula a sí mismo. Para la prueba, créala desde el panel de Supabase. Cuando integres pagos, el servidor o webhook de pago deberá crear el registro después de confirmar la transacción; no insertes matrículas desde el navegador.

El formulario de contacto de demostración prepara un correo dirigido a `soporte@cyberaula.example`; no almacena ni envía datos a un servidor. El teléfono, WhatsApp y perfiles sociales son ejemplos: reemplázalos por los canales reales antes de publicar.

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

La interfaz indica si el correo fue confirmado. La tabla de matrículas controla qué cursos muestra el espacio personal, pero esta versión estática no protege el archivo de video contra quien conozca su URL. Antes de vender clases privadas, sirve los videos con URLs firmadas o un proveedor que valide acceso en servidor. La clave publicable puede estar en el repositorio; nunca publiques la Secret key ni una `service_role`.
