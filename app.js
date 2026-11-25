// Datos de demostración. Más adelante pueden venir de un CMS o una API.
const demoVideo = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

const courses = [
  {
    id: 'redes',
    title: 'Redes desde cero',
    category: 'Networking',
    lessons: 8,
    progress: 22,
    theme: 'moss',
    mark: '01',
    label: 'ORDENA TUS IDEAS',
    lessonTitle: 'Bienvenido al laboratorio de redes',
    description: 'Clip genérico de prueba del reproductor. La maqueta lo detiene al llegar a 10 segundos.',
    chapters: ['Introducción · video demo', 'Modelo OSI y TCP/IP', 'Direccionamiento IPv4']
  },
  {
    id: 'ciberseguridad',
    title: 'Fundamentos de ciberseguridad',
    category: 'Seguridad defensiva',
    lessons: 12,
    progress: 0,
    theme: 'blue',
    mark: '02',
    label: 'DECIDE CON CLARIDAD',
    lessonTitle: 'Principios de seguridad digital',
    description: 'Lección de muestra. Este prototipo usa un clip público genérico para revisar el reproductor.',
    chapters: ['Introducción · video demo', 'Confidencialidad, integridad y disponibilidad', 'Reconoce el phishing']
  },
  {
    id: 'linux',
    title: 'Linux para seguridad',
    category: 'Herramientas',
    lessons: 6,
    progress: 0,
    theme: 'rose',
    mark: '03',
    label: 'COMPARTE MEJOR',
    lessonTitle: 'Tu entorno de trabajo',
    description: 'Lección de muestra. El diseño está organizado para agregar más cursos y lecciones.',
    chapters: ['Introducción · video demo', 'Comandos básicos de terminal', 'Permisos y usuarios']
  }
];

const courseGrid = document.querySelector('#course-grid');
const lessonList = document.querySelector('#lesson-list');
const video = document.querySelector('#lesson-video');
const videoError = document.querySelector('#video-error');
const sampleLimitSeconds = 10;
let selectedCourseId = courses[0].id;

function renderCourses() {
  courseGrid.innerHTML = courses.map((course) => `
    <button class="course-card ${course.id === selectedCourseId ? 'selected' : ''}" type="button"
      data-course-id="${course.id}" aria-pressed="${course.id === selectedCourseId}">
      <span class="course-cover ${course.theme}">
        <span class="cover-symbol">${course.mark}</span>
        <span class="cover-label">${course.label}</span>
      </span>
      <span class="course-info">
        <span class="course-category">${course.category}</span>
        <span class="course-info-title">${course.title}</span>
        <span class="course-meta"><span>${course.lessons} lecciones</span><span>${course.progress ? `${course.progress}% completado` : 'Aún por empezar'}</span></span>
        <span class="progress-track" aria-hidden="true"><span style="width:${course.progress}%"></span></span>
      </span>
    </button>
  `).join('');

  courseGrid.querySelectorAll('[data-course-id]').forEach((card) => {
    card.addEventListener('click', () => selectCourse(card.dataset.courseId));
  });
}

function renderLessonList(course) {
  lessonList.innerHTML = course.chapters.map((chapter, index) => {
    const isAvailable = index === 0;
    return `
      <li>
        <button class="lesson-item ${index === 0 ? 'current' : ''}" type="button" ${isAvailable ? '' : 'disabled'}
          aria-current="${index === 0 ? 'true' : 'false'}">
          <span class="lesson-number">${isAvailable ? '▶' : String(index + 1).padStart(2, '0')}</span>
          <span class="lesson-name">${chapter}</span>
          <span class="lesson-duration">${isAvailable ? '00:10' : 'Próximamente'}</span>
        </button>
      </li>
    `;
  }).join('');
}

function selectCourse(courseId) {
  const course = courses.find((item) => item.id === courseId);
  if (!course) return;
  selectedCourseId = course.id;
  renderCourses();
  renderLessonList(course);
  document.querySelector('#syllabus-course-title').textContent = course.title;
  document.querySelector('#lesson-title').textContent = course.lessonTitle;
  document.querySelector('#lesson-description').textContent = course.description;
  document.querySelector('#lesson-kicker').textContent = `LECCIÓN 01 · ${course.category.toUpperCase()}`;
  document.querySelector('#lesson-count').textContent = `${course.chapters.length} visibles`;
  video.pause();
  video.currentTime = 0;
  videoError.hidden = true;
}

video.addEventListener('timeupdate', () => {
  if (video.currentTime >= sampleLimitSeconds) {
    video.pause();
    video.currentTime = sampleLimitSeconds;
  }
});

video.addEventListener('error', () => { videoError.hidden = false; });
video.addEventListener('loadeddata', () => { videoError.hidden = true; });

const authDialog = document.querySelector('#auth-dialog');
const authMessage = document.querySelector('#auth-message');
const loginTab = document.querySelector('#login-tab');
const registerTab = document.querySelector('#register-tab');
const authTabs = document.querySelector('#auth-tabs');
const authForms = document.querySelector('#auth-forms');
const authSession = document.querySelector('#auth-session');
const accessButton = document.querySelector('#open-auth');
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
  accessButton.innerHTML = user
    ? '<span aria-hidden="true">✓</span> Mi cuenta'
    : '<span aria-hidden="true">↗</span> Acceder';
  accessButton.setAttribute('aria-label', user ? 'Abrir información de cuenta' : 'Acceder a tu cuenta');

  if (user) {
    document.querySelector('#session-title').textContent = `Hola${user.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ''}.`;
    document.querySelector('#session-email').textContent = user.email || '';
    const verified = Boolean(user.email_confirmed_at || user.confirmed_at);
    document.querySelector('#session-verification').textContent = verified
      ? 'Correo verificado'
      : 'Correo pendiente de verificación';
    document.querySelector('#session-verification').classList.toggle('verified', verified);
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

accessButton.addEventListener('click', () => {
  if (!activeSession) setAuthMode('login');
  authDialog.showModal();
});
loginTab.addEventListener('click', () => setAuthMode('login'));
registerTab.addEventListener('click', () => setAuthMode('register'));

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
    email,
    password,
    options: {
      data: { full_name: name },
      emailRedirectTo: `${window.location.origin}${window.location.pathname}`
    }
  });
  submitButton.disabled = false;

  if (error) {
    authMessage.textContent = formatAuthError(error);
    return;
  }

  if (data.session) {
    authMessage.textContent = 'Cuenta creada. Tu sesión ya está activa.';
    showAuthState(data.session);
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
selectCourse(selectedCourseId);
