# Cyber Aula — prototipo estático

Prototipo de una academia de redes y ciberseguridad de un solo docente, con rutas de preparación Fortinet, Cisco CCNA y MikroTik. No requiere instalación ni compilación: es HTML, CSS y JavaScript.

La portada pública mantiene la introducción, presenta tres cursos con ilustraciones, cifras referenciales y motivos para elegir la academia. Contacto es una vista independiente abierta desde la barra superior y desde el botón final de la portada. Las clases están disponibles en el área del estudiante solo si tiene una matrícula activa. Al iniciar sesión se abre el espacio personal, una vista separada con sus cursos, certificados y soporte.

## Publicarlo en Cloudflare Pages

### Recomendado: conectar un repositorio Git

1. Crea un repositorio en GitHub y sube `index.html`, `styles.css`, `app.js`, `supabase-config.js`, `README.md` y la carpeta `assets/` a la raíz de la rama `main`.
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
4. Copia ahí los archivos actualizados (`index.html`, `styles.css`, `app.js`, `supabase-schema.sql` y `README.md`) y la carpeta completa `assets/`, reemplazando los anteriores si corresponde. Las imágenes se cargan desde `./assets/course-fortinet.svg`, `./assets/course-ccna.svg` y `./assets/course-mikrotik.svg`. Conserva tu `supabase-config.js` ya configurado; la copia del espacio de Codex puede tener los campos vacíos.
5. Abre esa carpeta en VS Code. En **Source Control**, revisa los cambios, escribe un mensaje como `Actualiza academia de ciberseguridad`, pulsa **Commit** y luego **Sync Changes** o **Push**.
6. Cloudflare Pages compilará/publicará el commit automáticamente. Revisa el estado en **Workers & Pages → tu proyecto → Deployments**.

Si la terminal dice `fatal: not a git repository`, confirma que abriste la carpeta clonada del repositorio y no otra carpeta. Si ya tienes un repositorio remoto, clónalo con **Git: Clone**; no inicialices una carpeta distinta con `git init`.

## Editar los cursos

Los datos de ejemplo están al inicio de `app.js`, en el arreglo `courses`. El temario de Fortinet está organizado como módulos, con lecciones tipo video y teoría. Las personas sin acceso pueden consultar los títulos del programa; el reproductor y el contenido teórico se muestran bloqueados. La ruta se basa en el examen Fortinet NSE 4 - FortiOS 8.0 Administrator; revisa sus objetivos vigentes y practica en laboratorio. Este curso de preparación no es una certificación oficial.

El campo `pricePen` fija el precio que se muestra en las tarjetas y en la ficha del curso. Está en `0.10` soles como valor temporal de prueba. Esto todavía es solo un precio mostrado; el checkout de Culqi no está integrado.

Antes de grabar o publicar un temario definitivo, revisa los objetivos oficiales vigentes: [Fortinet Training & Certification](https://www.fortinet.com/training-certification), [Cisco CCNA](https://www.cisco.com/web/go/ccna/) y [MikroTik Training](https://mikrotik.com/training/about). Los programas y exámenes pueden actualizarse.

El botón **Simular compra** crea un registro de prueba de S/ 0.10 en `demo_purchases`. No cobra dinero, no está conectado a Culqi y mantiene el acceso asociado a la cuenta Supabase. Las matrículas reales continúan en `enrollments`. El dashboard se actualiza automáticamente mediante Realtime y al regresar a la pestaña.

### Activar matrículas, certificados y actualizaciones automáticas

1. En tu proyecto Supabase, abre **SQL Editor**, copia el contenido actualizado de `supabase-schema.sql` y ejecútalo. Si las tablas ya existen, el script crea la tabla nueva `demo_purchases` y configura sus permisos.
2. Publica la versión actualizada del sitio y entra con un usuario de prueba.
3. Abre **Cursos → Ver temario → Simular compra**. Inicia sesión si te lo pide y vuelve al curso. La compra queda guardada en Supabase; si vuelves a entrar con esa cuenta, el acceso sigue habilitado. En **Table Editor → demo_purchases** puedes revisar el registro.
4. Los certificados se muestran al insertar un registro en `certificates` con `user_id`, `course_id` y, opcionalmente, `certificate_url`.

La compra simulada es deliberadamente accesible para cualquier usuario autenticado: úsala solo para probar. No la confundas con una matrícula pagada. Cuando integres Culqi, el servidor/webhook debe validar la transacción y crear el registro de matrícula; desactiva o elimina `demo_purchases` antes de vender.

El formulario de contacto de demostración prepara un correo dirigido a `soporte@cyberaula.example`; no almacena ni envía datos a un servidor. El teléfono y WhatsApp son ejemplos: reemplázalos por los canales reales antes de publicar.

Las lecciones de video son espacios reservados; falta subir los videos reales a Cloudflare Stream y enlazar cada reproducción. La teoría ya está redactada por módulo y se muestra después de habilitar acceso.

## Video y crecimiento

- Para esta prueba, las lecciones muestran una portada de video pendiente; todavía no se han cargado videos de Fortinet.
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

La interfaz indica si el correo fue confirmado. **Aviso sobre el bloqueo actual:** como la web es estática, el temario de teoría incluido en `app.js` se descarga al navegador y una persona técnica podría inspeccionar el código aunque la interfaz muestre candados. Es un bloqueo visual para esta prueba, no una protección de contenido de producción. Antes de vender, traslada lecciones a un backend con autorización por matrícula y videos de Stream con URLs firmadas; nunca publiques la Secret key ni una `service_role`.
