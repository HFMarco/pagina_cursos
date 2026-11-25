// Catálogo estático de demostración. Más adelante puede venir de Supabase.
const demoVideo = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
const sampleLimitSeconds = 10;

const courses = [
  {
    id: 'redes', title: 'Redes desde cero', category: 'Networking', level: 'Inicial', duration: '2 h 30 min', lessons: 8,
    theme: 'moss', mark: '01', label: 'INFRAESTRUCTURA',
    shortDescription: 'Entiende cómo se conectan los dispositivos y cómo viajan los datos por una red.',
    description: 'Construye una base práctica en redes: desde los conceptos esenciales hasta el direccionamiento y el diagnóstico de conectividad.',
    lessonTitle: 'Bienvenido al laboratorio de redes',
    lessonDescription: 'Preview temporal del reproductor. El clip se detiene al llegar a 10 segundos; aquí irá una clase real del curso.',
    chapters: ['Introducción al curso', 'Modelo OSI y TCP/IP', 'Direccionamiento IPv4', 'Subnetting paso a paso', 'Switching y routing', 'DNS y DHCP', 'Diagnóstico de conectividad', 'Laboratorio final'],
    outcomes: ['Explicar el recorrido de los datos usando OSI y TCP/IP.', 'Leer direcciones IPv4 y calcular subredes básicas.', 'Usar herramientas de diagnóstico para encontrar fallas comunes.']
  },
  {
    id: 'ciberseguridad', title: 'Fundamentos de ciberseguridad', category: 'Seguridad defensiva', level: 'Inicial', duration: '3 h 15 min', lessons: 12,
    theme: 'blue', mark: '02', label: 'DEFENSA DIGITAL',
    shortDescription: 'Aprende principios de seguridad y reconoce amenazas frecuentes en entornos digitales.',
    description: 'Una introducción práctica a la protección de cuentas, dispositivos y datos, con foco en prevención y respuesta básica.',
    lessonTitle: 'Principios de seguridad digital',
    lessonDescription: 'Preview temporal del reproductor. La clase real reemplazará este clip de muestra.',
    chapters: ['Introducción a la seguridad', 'Confidencialidad, integridad y disponibilidad', 'Amenazas y vulnerabilidades', 'Contraseñas y autenticación', 'Reconoce el phishing', 'Seguridad del navegador', 'Copias de seguridad', 'Actualizaciones seguras', 'Introducción a incidentes', 'Registro de evidencias', 'Plan de respuesta', 'Repaso final'],
    outcomes: ['Distinguir amenazas, vulnerabilidades y riesgos.', 'Aplicar medidas básicas para proteger cuentas y dispositivos.', 'Reconocer señales de phishing y reportar incidentes de forma ordenada.']
  },
  {
    id: 'linux', title: 'Linux para seguridad', category: 'Herramientas', level: 'Inicial', duration: '2 h', lessons: 6,
    theme: 'rose', mark: '03', label: 'TERMINAL Y SISTEMA',
    shortDescription: 'Familiarízate con la terminal, los usuarios, permisos y herramientas esenciales.',
    description: 'Aprende a moverte por Linux y administrar tareas comunes con una base útil para redes y ciberseguridad.',
    lessonTitle: 'Tu entorno de trabajo',
    lessonDescription: 'Preview temporal del reproductor. La clase real reemplazará este clip de muestra.',
    chapters: ['Introducción al entorno Linux', 'Comandos básicos de terminal', 'Archivos y directorios', 'Permisos y usuarios', 'Procesos y servicios', 'Laboratorio guiado'],
    outcomes: ['Navegar el sistema de archivos desde la terminal.', 'Leer permisos y ejecutar comandos con criterio.', 'Usar herramientas base para observar procesos y servicios.']
  }
];

const courseGrid = document.querySelector('#course-grid');
const lessonList = document.querySelector('#lesson-list');
const video = document.querySelector('#lesson-video');
const videoError = document.querySelector('#video-error');
const homeView = document.querySelector('#home-view');
const courseView = document.querySelector('#course-view');
const studentHub = document.querySelector('#student-hub');
const authDialog = document.querySelector('#auth-dialog');
const purchaseDialog = document.querySelector('#purchase-dialog');
const authMessage = document.querySelector('#auth-message');
const loginTab = document.querySelector('#login-tab');
const registerTab = document.querySelector('#register-tab');
const authTabs = document.querySelector('#auth-tabs');
const authForms = document.querySelector('#auth-forms');
const authSession = document.querySelector('#auth-session');
const accessButton = document.querySelector('#open-auth');
const memberChip = document.querySelector('#member-chip');
const authConfig = window.SUPABASE_CONFIG || {};
const hasSupabaseConfig = Boolean(
  window.supabase?.createClient &&
  /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(authConfig.url || '') &&
  /^(sb_publishable_|eyJ)/.test(authConfig.publishableKey || '')
);
const supabaseClient = hasSupabaseConfig
  ? window.supabase.createClient(authConfig.url, authConfig.publishableKey)
  : null;

let activeSession = null;
let selectedCourse = null;

function renderCourses() {
  courseGrid.innerHTML = courses.map((course) => `
    <article class="course-card">
      <div class="course-cover ${course.theme}">
        <span class="cover-symbol">${course.mark}</span>
        <span class="cover-label">${course.label}</span>
        <span class="course-preview-tag">PREVIEW DISPONIBLE</span>
      </div>
      <div class="course-info">
        <p class="course-category">${course.category}</p>
        <h3>${course.title}</h3>
        <p class="course-summary">${course.shortDescription}</p>
        <div class="course-meta"><span>${course.level}</span><span>${course.duration}</span><span>${course.lessons} clases</span></div>
        <div class="course-card-actions"><span class="price-teaser">Precio por definir</span><button class="course-open" type="button" data-course-id="${course.id}">Ver programa <span>→</span></button></div>
      </div>
    </article>
  `).join('');

  courseGrid.querySelectorAll('[data-course-id]').forEach((button) => {
    button.addEventListener('click', () => openCourse(button.dataset.courseId));
  });
}

function renderCourseLessons(course) {
  lessonList.innerHTML = course.chapters.map((chapter, index) => `
    <li>
      <button class="lesson-item ${index === 0 ? 'current' : 'locked'}" type="button" data-lesson-index="${index}" aria-current="${index === 0}">
        <span class="lesson-number">${index === 0 ? '▶' : '⌑'}</span>
        <span class="lesson-name">${chapter}</span>
        <span class="lesson-duration">${index === 0 ? '00:10 · preview' : 'Con acceso'}</span>
      </button>
    </li>
  `).join('');

  lessonList.querySelectorAll('[data-lesson-index]').forEach((button) => {
    button.addEventListener('click', () => {
      if (Number(button.dataset.lessonIndex) !== 0) {
        openPurchaseDialog(course);
        return;
      }
      lessonList.querySelectorAll('.lesson-item').forEach((item) => item.classList.remove('current'));
      button.classList.add('current');
      video.pause();
      video.currentTime = 0;
      document.querySelector('#lesson-title').textContent = course.lessonTitle;
      document.querySelector('#lesson-description').textContent = course.lessonDescription;
    });
  });
}

function openCourse(courseId) {
  const course = courses.find((item) => item.id === courseId);
  if (!course) return;
  selectedCourse = course;
  homeView.hidden = true;
  courseView.hidden = false;
  window.location.hash = `curso/${course.id}`;
  document.querySelector('#course-breadcrumb').innerHTML = `Catálogo <span>/</span> ${course.title}`;
  document.querySelector('#detail-category').textContent = `${course.category.toUpperCase()} · RUTA DE APRENDIZAJE`;
  document.querySelector('#detail-title').textContent = course.title;
  document.querySelector('#detail-description').textContent = course.description;
  document.querySelector('#detail-level').textContent = `Nivel ${course.level}`;
  document.querySelector('#detail-duration').textContent = course.duration;
  document.querySelector('#detail-lessons').textContent = `${course.lessons} clases`;
  document.querySelector('#syllabus-course-title').textContent = course.title;
  document.querySelector('#lesson-count').textContent = `${course.lessons} clases`;
  document.querySelector('#lesson-kicker').textContent = `PREVIEW · ${course.category.toUpperCase()}`;
  document.querySelector('#lesson-title').textContent = course.lessonTitle;
  document.querySelector('#lesson-description').textContent = course.lessonDescription;
  document.querySelector('#course-outcomes').innerHTML = course.outcomes.map((outcome) => `<li>${outcome}</li>`).join('');
  renderCourseLessons(course);
  video.pause();
  video.currentTime = 0;
  videoError.hidden = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showHome(anchor = 'inicio') {
  courseView.hidden = true;
  homeView.hidden = false;
  selectedCourse = null;
  if (window.location.hash.startsWith('#curso/')) window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${anchor}`);
  if (anchor !== 'inicio') requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openPurchaseDialog(course) {
  const selected = course || selectedCourse;
  if (!selected) return;
  document.querySelector('#purchase-title').textContent = 'Compra próximamente';
  document.querySelector('#purchase-message').textContent = `Estamos preparando las opciones de compra para “${selected.title}”. Aún no se aceptan pagos ni se habilitan matrículas.`;
  purchaseDialog.showModal();
}

function setAuthMode(mode) {
  const registering = mode === 'register';
  document.querySelector('#login-panel').hidden = registering;
  document.querySelector('#register-panel').hidden = !registering;
  loginTab.classList.toggle('active', !registering);
  registerTab.classList.toggle('active', registering);
  loginTab.setAttribute('aria-selected', String(!registering));
  registerTab.setAttribute('aria-selected', String(registering));
  authMessage.textContent = hasSupabaseConfig
    ? ''
    : 'Falta configurar supabase-config.js con la Project URL y la Publishable key.';
}

function showAuthState(session) {
  activeSession = session;
  const user = session?.user;
  authTabs.hidden = Boolean(user);
  authForms.hidden = Boolean(user);
  authSession.hidden = !user;
  studentHub.hidden = !user;
  document.querySelector('#public-nav').hidden = Boolean(user);
  document.querySelector('#member-nav').hidden = !user;
  accessButton.hidden = Boolean(user);
  memberChip.hidden = !user;

  if (user) {
    const fullName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'estudiante';
    document.querySelector('#student-greeting').textContent = fullName;
    document.querySelector('#member-name').textContent = fullName;
    document.querySelector('#session-title').textContent = `Hola, ${fullName}.`;
    document.querySelector('#session-email').textContent = user.email || '';
    const verified = Boolean(user.email_confirmed_at || user.confirmed_at);
    const verification = document.querySelector('#session-verification');
    verification.textContent = verified ? 'Correo verificado' : 'Correo pendiente de verificación';
    verification.classList.toggle('verified', verified);
    authMessage.textContent = 'Sesión activa en este navegador.';
  }
}

function formatAuthError(error) {
  const message = (error?.message || '').toLowerCase();
  if (message.includes('invalid login credentials')) return 'El correo o la contraseña no coinciden.';
  if (message.includes('email not confirmed')) return 'Confirma tu correo antes de iniciar sesión.';
  if (message.includes('user already registered')) return 'Ya existe una cuenta con ese correo. Prueba acceder.';
  if (message.includes('password should be at least')) return 'La contraseña debe tener al menos 8 caracteres.';
  if (message.includes('rate limit')) return 'Se alcanzó el límite de intentos. Espera un momento y vuelve a probar.';
  return error?.message || 'No se pudo completar la solicitud. Inténtalo de nuevo.';
}

function openAuth(mode = 'login') {
  if (!activeSession) setAuthMode(mode);
  authDialog.showModal();
}

accessButton.addEventListener('click', () => openAuth('login'));
memberChip.addEventListener('click', () => authDialog.showModal());
loginTab.addEventListener('click', () => setAuthMode('login'));
registerTab.addEventListener('click', () => setAuthMode('register'));
document.querySelector('#back-to-home').addEventListener('click', () => showHome('catalogo'));
document.querySelector('#detail-back-footer').addEventListener('click', () => showHome('catalogo'));
document.querySelector('#purchase-button').addEventListener('click', () => openPurchaseDialog());
document.querySelectorAll('[data-purchase]').forEach((button) => button.addEventListener('click', () => openPurchaseDialog()));
document.querySelectorAll('[data-home-link]').forEach((link) => link.addEventListener('click', (event) => {
  event.preventDefault();
  const anchor = link.getAttribute('href').slice(1);
  showHome(anchor);
}));

document.querySelector('#register-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!supabaseClient) {
    authMessage.textContent = 'Completa supabase-config.js y vuelve a desplegar el sitio para habilitar el registro.';
    return;
  }
  const values = new FormData(event.currentTarget);
  const name = String(values.get('name') || '').trim();
  const email = String(values.get('email') || '').trim();
  const password = String(values.get('password') || '');
  const submitButton = event.currentTarget.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  authMessage.textContent = 'Creando cuenta…';
  const { data, error } = await supabaseClient.auth.signUp({
    email, password,
    options: { data: { full_name: name }, emailRedirectTo: `${window.location.origin}${window.location.pathname}` }
  });
  submitButton.disabled = false;
  if (error) {
    authMessage.textContent = formatAuthError(error);
    return;
  }
  if (data.session) {
    showAuthState(data.session);
    authMessage.textContent = 'Cuenta creada. Tu sesión ya está activa.';
  } else {
    authMessage.textContent = `Cuenta creada para ${email}. Revisa tu correo y pulsa el enlace de confirmación antes de acceder.`;
  }
});

document.querySelector('#login-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!supabaseClient) {
    authMessage.textContent = 'Completa supabase-config.js y vuelve a desplegar el sitio para habilitar el acceso.';
    return;
  }
  const values = new FormData(event.currentTarget);
  const email = String(values.get('email') || '').trim();
  const password = String(values.get('password') || '');
  const submitButton = event.currentTarget.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  authMessage.textContent = 'Verificando acceso…';
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
  submitButton.disabled = false;
  if (error) {
    authMessage.textContent = formatAuthError(error);
    return;
  }
  showAuthState(data.session);
  authMessage.textContent = 'Acceso correcto.';
});

document.querySelector('#sign-out').addEventListener('click', async () => {
  if (!supabaseClient) return;
  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    authMessage.textContent = formatAuthError(error);
    return;
  }
  showAuthState(null);
  setAuthMode('login');
  authMessage.textContent = 'Sesión cerrada.';
});

video.addEventListener('timeupdate', () => {
  if (video.currentTime >= sampleLimitSeconds) {
    video.pause();
    video.currentTime = sampleLimitSeconds;
  }
});
video.addEventListener('error', () => { videoError.hidden = false; });
video.addEventListener('loadeddata', () => { videoError.hidden = true; });

if (supabaseClient) {
  supabaseClient.auth.getSession().then(({ data, error }) => {
    if (error) authMessage.textContent = formatAuthError(error);
    showAuthState(data?.session || null);
  });
  supabaseClient.auth.onAuthStateChange((_event, session) => showAuthState(session));
}

renderCourses();
video.querySelector('source').src = demoVideo;
video.load();
if (window.location.hash.startsWith('#curso/')) {
  openCourse(window.location.hash.slice('#curso/'.length));
}
