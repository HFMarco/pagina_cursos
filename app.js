const demoVideo = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
const sampleLimitSeconds = 10;

const courses = [
  {
    id: 'redes', title: 'Redes desde cero', category: 'Networking', level: 'Inicial', duration: '2 h 30 min', lessons: 8,
    theme: 'moss', mark: '01', label: 'INFRAESTRUCTURA',
    shortDescription: 'Entiende cómo se conectan los dispositivos y cómo viajan los datos por una red.',
    description: 'Construye una base práctica en redes: desde los conceptos esenciales hasta el direccionamiento y el diagnóstico de conectividad.',
    introTitle: 'Bienvenido al laboratorio de redes',
    introDescription: 'Este clip es temporal y sirve para probar la preview. Reemplázalo por la introducción real del curso.',
    chapters: ['Introducción al curso', 'Modelo OSI y TCP/IP', 'Direccionamiento IPv4', 'Subnetting paso a paso', 'Switching y routing', 'DNS y DHCP', 'Diagnóstico de conectividad', 'Laboratorio final'],
    outcomes: ['Explicar el recorrido de los datos usando OSI y TCP/IP.', 'Leer direcciones IPv4 y calcular subredes básicas.', 'Usar herramientas de diagnóstico para encontrar fallas comunes.']
  },
  {
    id: 'ciberseguridad', title: 'Fundamentos de ciberseguridad', category: 'Seguridad defensiva', level: 'Inicial', duration: '3 h 15 min', lessons: 12,
    theme: 'blue', mark: '02', label: 'DEFENSA DIGITAL',
    shortDescription: 'Aprende principios de seguridad y reconoce amenazas frecuentes en entornos digitales.',
    description: 'Una introducción práctica a la protección de cuentas, dispositivos y datos, con foco en prevención y respuesta básica.',
    introTitle: 'Principios de seguridad digital',
    introDescription: 'Esta preview temporal se reemplazará por la introducción grabada del curso.',
    chapters: ['Introducción a la seguridad', 'Confidencialidad, integridad y disponibilidad', 'Amenazas y vulnerabilidades', 'Contraseñas y autenticación', 'Reconoce el phishing', 'Seguridad del navegador', 'Copias de seguridad', 'Actualizaciones seguras', 'Introducción a incidentes', 'Registro de evidencias', 'Plan de respuesta', 'Repaso final'],
    outcomes: ['Distinguir amenazas, vulnerabilidades y riesgos.', 'Aplicar medidas básicas para proteger cuentas y dispositivos.', 'Reconocer señales de phishing y reportar incidentes de forma ordenada.']
  },
  {
    id: 'linux', title: 'Linux para seguridad', category: 'Herramientas', level: 'Inicial', duration: '2 h', lessons: 6,
    theme: 'rose', mark: '03', label: 'TERMINAL Y SISTEMA',
    shortDescription: 'Familiarízate con la terminal, los usuarios, permisos y herramientas esenciales.',
    description: 'Aprende a moverte por Linux y administrar tareas comunes con una base útil para redes y ciberseguridad.',
    introTitle: 'Tu entorno de trabajo',
    introDescription: 'Esta preview temporal se reemplazará por la introducción grabada del curso.',
    chapters: ['Introducción al entorno Linux', 'Comandos básicos de terminal', 'Archivos y directorios', 'Permisos y usuarios', 'Procesos y servicios', 'Laboratorio guiado'],
    outcomes: ['Navegar el sistema de archivos desde la terminal.', 'Leer permisos y ejecutar comandos con criterio.', 'Usar herramientas base para observar procesos y servicios.']
  }
];

const publicNav = document.querySelector('#public-nav');
const memberNav = document.querySelector('#member-nav');
const accessButton = document.querySelector('#open-auth');
const memberChip = document.querySelector('#member-chip');
const homeView = document.querySelector('#home-view');
const courseView = document.querySelector('#course-view');
const dashboardView = document.querySelector('#dashboard-view');
const courseGrid = document.querySelector('#course-grid');
const lessonList = document.querySelector('#lesson-list');
const video = document.querySelector('#lesson-video');
const videoError = document.querySelector('#video-error');
const authDialog = document.querySelector('#auth-dialog');
const purchaseDialog = document.querySelector('#purchase-dialog');
const authMessage = document.querySelector('#auth-message');
const loginTab = document.querySelector('#login-tab');
const registerTab = document.querySelector('#register-tab');
const authTabs = document.querySelector('#auth-tabs');
const authForms = document.querySelector('#auth-forms');
const authSession = document.querySelector('#auth-session');
const authConfig = window.SUPABASE_CONFIG || {};
const hasSupabaseConfig = Boolean(
  window.supabase?.createClient &&
  /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(authConfig.url || '') &&
  /^(sb_publishable_|eyJ)/.test(authConfig.publishableKey || '')
);
const supabaseClient = hasSupabaseConfig ? window.supabase.createClient(authConfig.url, authConfig.publishableKey) : null;

let activeSession = null;
let selectedCourse = null;
let enrolledCourseIds = new Set();
let enrollmentChannel = null;
let certificateChannel = null;

function setRoute(route, { replace = false, scrollTo = true } = {}) {
  const cleanRoute = route.replace(/^#/, '');
  if (replace) window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${cleanRoute}`);
  else if (window.location.hash !== `#${cleanRoute}`) window.history.pushState(null, '', `#${cleanRoute}`);
  renderRoute(cleanRoute, { scrollTo });
}

function renderRoute(route = window.location.hash.slice(1), { scrollTo = true } = {}) {
  const parts = route.split('/').filter(Boolean);
  homeView.hidden = true;
  courseView.hidden = true;
  dashboardView.hidden = true;

  if (parts[0] === 'curso' && parts[1]) {
    const course = courses.find((item) => item.id === parts[1]);
    if (course) {
      renderCourse(course);
      courseView.hidden = false;
      if (scrollTo) window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
  }

  if (['alumno', 'certificados', 'soporte'].includes(parts[0])) {
    if (!activeSession?.user) {
      homeView.hidden = false;
      openAuth('login');
      return;
    }
    dashboardView.hidden = false;
    if (scrollTo && parts[0] !== 'alumno') requestAnimationFrame(() => document.getElementById(parts[0])?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    else if (scrollTo) window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  homeView.hidden = false;
  if (scrollTo && parts[0] && parts[0] !== 'inicio') requestAnimationFrame(() => document.getElementById(parts[0])?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  else if (scrollTo) window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderCourses() {
  courseGrid.innerHTML = courses.map((course) => {
    const enrolled = enrolledCourseIds.has(course.id);
    return `
      <article class="course-card ${course.theme}">
        <div class="course-cover">
          <span class="cover-symbol">${course.mark}</span><span class="cover-label">${course.label}</span>
          <span class="course-preview-tag">INTRODUCCIÓN ABIERTA</span>
          ${enrolled ? '<span class="enrolled-tag">MI CURSO</span>' : ''}
        </div>
        <div class="course-info">
          <p class="course-category">${course.category}</p><h3>${course.title}</h3>
          <p class="course-summary">${course.shortDescription}</p>
          <div class="course-meta"><span>${course.level}</span><span>${course.duration}</span><span>${course.lessons} clases</span></div>
          <div class="course-card-actions"><span class="price-teaser">Precio por definir</span><button class="course-open" type="button" data-course-id="${course.id}">${enrolled ? 'Continuar' : 'Ver preview'} <span>→</span></button></div>
        </div>
      </article>`;
  }).join('');
  courseGrid.querySelectorAll('[data-course-id]').forEach((button) => button.addEventListener('click', () => setRoute(`curso/${button.dataset.courseId}`)));
}

function renderCourse(course) {
  selectedCourse = course;
  document.querySelector('#course-breadcrumb').innerHTML = `Catálogo <span>/</span> ${course.title}`;
  document.querySelector('#detail-category').textContent = `${course.category.toUpperCase()} · RUTA DE APRENDIZAJE`;
  document.querySelector('#detail-title').textContent = course.title;
  document.querySelector('#detail-description').textContent = course.description;
  document.querySelector('#detail-level').textContent = `Nivel ${course.level}`;
  document.querySelector('#detail-duration').textContent = course.duration;
  document.querySelector('#detail-lessons').textContent = `${course.lessons} clases`;
  document.querySelector('#syllabus-course-title').textContent = course.title;
  document.querySelector('#lesson-count').textContent = `${course.lessons} clases`;
  document.querySelector('#lesson-kicker').textContent = `CLASE 01 · PREVIEW · ${course.category.toUpperCase()}`;
  document.querySelector('#lesson-title').textContent = course.introTitle;
  document.querySelector('#lesson-description').textContent = course.introDescription;
  document.querySelector('#course-outcomes').innerHTML = course.outcomes.map((outcome) => `<li>${outcome}</li>`).join('');
  const enrolled = enrolledCourseIds.has(course.id);
  const buyButton = document.querySelector('#purchase-button');
  buyButton.textContent = enrolled ? 'Ir a mis cursos' : 'Consultar acceso';
  document.querySelector('.syllabus-buy').textContent = enrolled ? 'Ir a mis cursos' : 'Consultar acceso al curso';
  renderLessons(course, enrolled);
  video.pause();
  video.currentTime = 0;
  videoError.hidden = true;
}

function renderLessons(course, enrolled) {
  lessonList.innerHTML = course.chapters.map((chapter, index) => {
    const preview = index === 0;
    const locked = !preview && !enrolled;
    return `<li><button class="lesson-item ${preview ? 'current' : locked ? 'locked' : 'included'}" type="button" data-lesson-index="${index}"><span class="lesson-number">${preview ? '▶' : locked ? '⌑' : '✓'}</span><span class="lesson-name">${chapter}</span><span class="lesson-duration">${preview ? 'Preview' : locked ? 'Bloqueada' : 'Incluida'}</span></button></li>`;
  }).join('');

  lessonList.querySelectorAll('[data-lesson-index]').forEach((button) => button.addEventListener('click', () => {
    const index = Number(button.dataset.lessonIndex);
    if (index > 0 && !enrolled) {
      openPurchaseDialog(course);
      return;
    }
    if (index > 0) {
      video.pause();
      videoError.textContent = 'El video de esta clase todavía no está cargado.';
      videoError.hidden = false;
      document.querySelector('#lesson-title').textContent = course.chapters[index];
      document.querySelector('#lesson-description').textContent = 'La matrícula está activa; el video de esta lección se publicará aquí.';
      lessonList.querySelectorAll('.lesson-item').forEach((item) => item.classList.remove('current'));
      button.classList.add('current');
      return;
    }
    lessonList.querySelectorAll('.lesson-item').forEach((item) => item.classList.remove('current'));
    button.classList.add('current');
    videoError.hidden = true;
    video.pause();
    video.currentTime = 0;
    document.querySelector('#lesson-title').textContent = course.introTitle;
    document.querySelector('#lesson-description').textContent = course.introDescription;
  }));
}

function openPurchaseDialog(course = selectedCourse) {
  if (!course) return;
  document.querySelector('#purchase-title').textContent = 'Acceso próximamente';
  document.querySelector('#purchase-message').textContent = `La compra de “${course.title}” todavía no está habilitada. Cuando conectemos pagos, la matrícula confirmada aparecerá automáticamente en Mis cursos.`;
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
  authMessage.textContent = hasSupabaseConfig ? '' : 'Falta configurar supabase-config.js con la Project URL y la Publishable key.';
}

function openAuth(mode = 'login') {
  if (!activeSession) setAuthMode(mode);
  authDialog.showModal();
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

function updateAuthChrome(user) {
  const signedIn = Boolean(user);
  publicNav.hidden = signedIn;
  memberNav.hidden = !signedIn;
  accessButton.hidden = signedIn;
  memberChip.hidden = !signedIn;
  authTabs.hidden = signedIn;
  authForms.hidden = signedIn;
  authSession.hidden = !signedIn;
  if (!signedIn) return;

  const fullName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'estudiante';
  document.querySelector('#student-greeting').textContent = fullName;
  document.querySelector('#member-name').textContent = fullName;
  document.querySelector('#session-title').textContent = `Hola, ${fullName}.`;
  document.querySelector('#session-email').textContent = user.email || '';
  const verified = Boolean(user.email_confirmed_at || user.confirmed_at);
  const verification = document.querySelector('#session-verification');
  verification.textContent = verified ? 'Correo verificado' : 'Correo pendiente de verificación';
  verification.classList.toggle('verified', verified);
}

async function loadStudentData(user) {
  const status = document.querySelector('#enrollment-status');
  const empty = document.querySelector('#my-courses-empty');
  const list = document.querySelector('#my-courses-list');
  const certEmpty = document.querySelector('#certificates-empty');
  const certList = document.querySelector('#certificates-list');
  status.hidden = true;
  status.textContent = '';
  list.hidden = true;
  certList.hidden = true;
  empty.hidden = false;
  certEmpty.hidden = false;

  const [enrollmentResult, certificateResult] = await Promise.all([
    supabaseClient.from('enrollments').select('course_id, status, purchased_at').eq('user_id', user.id).eq('status', 'active'),
    supabaseClient.from('certificates').select('course_id, certificate_url, issued_at').eq('user_id', user.id)
  ]);

  if (enrollmentResult.error) {
    status.textContent = 'No se pudo leer tu matrícula. Revisa la tabla enrollments y sus políticas en Supabase.';
    status.hidden = false;
    enrolledCourseIds = new Set();
  } else {
    const rows = enrollmentResult.data || [];
    enrolledCourseIds = new Set(rows.map((row) => row.course_id));
    const enrolledCourses = rows.map((row) => ({ ...courses.find((course) => course.id === row.course_id), purchasedAt: row.purchased_at })).filter((course) => course.id);
    document.querySelector('#enrollment-count').textContent = String(enrolledCourses.length).padStart(2, '0');
    if (enrolledCourses.length) {
      empty.hidden = true;
      list.hidden = false;
      list.innerHTML = enrolledCourses.map((course) => `<article class="enrolled-course-card ${course.theme}"><div class="enrolled-cover"><span>${course.mark}</span><i>ACCESS ACTIVE</i></div><div class="enrolled-course-copy"><p class="course-category">${course.category}</p><h3>${course.title}</h3><p>${course.shortDescription}</p><button class="course-open" type="button" data-enrolled-course="${course.id}">Entrar al curso <span>→</span></button></div></article>`).join('');
      list.querySelectorAll('[data-enrolled-course]').forEach((button) => button.addEventListener('click', () => setRoute(`curso/${button.dataset.enrolledCourse}`)));
    }
  }

  if (certificateResult.error) {
    certEmpty.innerHTML = '<p>Activa la tabla certificates para mostrar tus certificados.</p><span>Tus datos siguen protegidos por la sesión.</span>';
  } else {
    const certificates = certificateResult.data || [];
    if (certificates.length) {
      certEmpty.hidden = true;
      certList.hidden = false;
      certList.innerHTML = certificates.map((certificate) => {
        const course = courses.find((item) => item.id === certificate.course_id);
        const title = course?.title || 'Certificado de curso';
        return `<article class="certificate-row"><span class="certificate-icon">✧</span><div><strong>${title}</strong><small>${certificate.issued_at ? new Date(certificate.issued_at).toLocaleDateString('es-PE') : 'Emitido'}</small></div>${certificate.certificate_url ? `<a class="certificate-link" href="${certificate.certificate_url}" target="_blank" rel="noopener">Abrir ↗</a>` : '<span class="certificate-pending">Disponible</span>'}</article>`;
      }).join('');
    }
  }

  renderCourses();
}

function resetRealtimeChannels() {
  if (!supabaseClient) return;
  if (enrollmentChannel) supabaseClient.removeChannel(enrollmentChannel);
  if (certificateChannel) supabaseClient.removeChannel(certificateChannel);
  enrollmentChannel = null;
  certificateChannel = null;
}

function subscribeToStudentData(user) {
  if (!supabaseClient) return;
  resetRealtimeChannels();
  enrollmentChannel = supabaseClient.channel(`student-enrollments-${user.id}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'enrollments', filter: `user_id=eq.${user.id}` }, () => loadStudentData(user))
    .subscribe();
  certificateChannel = supabaseClient.channel(`student-certificates-${user.id}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'certificates', filter: `user_id=eq.${user.id}` }, () => loadStudentData(user))
    .subscribe();
}

function updateSession(session) {
  const previousId = activeSession?.user?.id;
  activeSession = session;
  const user = session?.user || null;
  updateAuthChrome(user);
  if (user && user.id !== previousId) {
    loadStudentData(user);
    subscribeToStudentData(user);
  } else if (!user && previousId) {
    enrolledCourseIds = new Set();
    resetRealtimeChannels();
    renderCourses();
  }
}

function handleRouteClick(event) {
  const link = event.target.closest('[data-route]');
  if (!link) return;
  event.preventDefault();
  setRoute(link.dataset.route);
}

document.addEventListener('click', handleRouteClick);
window.addEventListener('hashchange', () => renderRoute(window.location.hash.slice(1)));
window.addEventListener('focus', () => { if (activeSession?.user && supabaseClient) loadStudentData(activeSession.user); });
document.addEventListener('visibilitychange', () => { if (!document.hidden && activeSession?.user && supabaseClient) loadStudentData(activeSession.user); });

document.querySelector('#back-to-home').addEventListener('click', () => setRoute('catalogo'));
document.querySelector('#detail-back-footer').addEventListener('click', () => setRoute('catalogo'));
document.querySelector('#purchase-button').addEventListener('click', () => {
  if (selectedCourse && enrolledCourseIds.has(selectedCourse.id)) setRoute('alumno');
  else openPurchaseDialog();
});
document.querySelectorAll('[data-purchase]').forEach((button) => button.addEventListener('click', () => {
  if (selectedCourse && enrolledCourseIds.has(selectedCourse.id)) setRoute('alumno');
  else openPurchaseDialog();
}));
accessButton.addEventListener('click', () => openAuth('login'));
memberChip.addEventListener('click', () => authDialog.showModal());
loginTab.addEventListener('click', () => setAuthMode('login'));
registerTab.addEventListener('click', () => setAuthMode('register'));

document.querySelector('#register-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!supabaseClient) { authMessage.textContent = 'Completa supabase-config.js y vuelve a desplegar el sitio para habilitar el registro.'; return; }
  const values = new FormData(event.currentTarget);
  const name = String(values.get('name') || '').trim();
  const email = String(values.get('email') || '').trim();
  const password = String(values.get('password') || '');
  const submitButton = event.currentTarget.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  authMessage.textContent = 'Creando cuenta…';
  const { data, error } = await supabaseClient.auth.signUp({ email, password, options: { data: { full_name: name }, emailRedirectTo: `${window.location.origin}${window.location.pathname}#alumno` } });
  submitButton.disabled = false;
  if (error) { authMessage.textContent = formatAuthError(error); return; }
  if (data.session) {
    updateSession(data.session);
    authDialog.close();
    setRoute('alumno');
  } else {
    authMessage.textContent = `Cuenta creada para ${email}. Confirma el correo y luego accede; te llevaremos a tu espacio personal.`;
  }
});

document.querySelector('#login-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!supabaseClient) { authMessage.textContent = 'Completa supabase-config.js y vuelve a desplegar el sitio para habilitar el acceso.'; return; }
  const values = new FormData(event.currentTarget);
  const email = String(values.get('email') || '').trim();
  const password = String(values.get('password') || '');
  const submitButton = event.currentTarget.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  authMessage.textContent = 'Verificando acceso…';
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
  submitButton.disabled = false;
  if (error) { authMessage.textContent = formatAuthError(error); return; }
  updateSession(data.session);
  authDialog.close();
  setRoute('alumno');
});

document.querySelector('#sign-out').addEventListener('click', async () => {
  if (!supabaseClient) return;
  const { error } = await supabaseClient.auth.signOut();
  if (error) { authMessage.textContent = formatAuthError(error); return; }
  authDialog.close();
  setRoute('inicio');
});

video.addEventListener('timeupdate', () => {
  if (video.currentTime >= sampleLimitSeconds) { video.pause(); video.currentTime = sampleLimitSeconds; }
});
video.addEventListener('error', () => { videoError.hidden = false; });
video.addEventListener('loadeddata', () => { videoError.hidden = true; });

if (supabaseClient) {
  supabaseClient.auth.onAuthStateChange((event, session) => {
    updateSession(session);
    if (event === 'SIGNED_IN') setRoute('alumno');
    if (event === 'SIGNED_OUT') setRoute('inicio');
  });
  supabaseClient.auth.getSession().then(({ data, error }) => {
    if (error) authMessage.textContent = formatAuthError(error);
    updateSession(data?.session || null);
    renderRoute(window.location.hash.slice(1) || (data?.session ? 'alumno' : 'inicio'), { scrollTo: false });
  });
} else {
  renderRoute(window.location.hash.slice(1) || 'inicio', { scrollTo: false });
}

renderCourses();
video.querySelector('source').src = demoVideo;
video.load();
