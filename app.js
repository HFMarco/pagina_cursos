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

function setAuthMode(mode) {
  const registering = mode === 'register';
  document.querySelector('#login-panel').hidden = registering;
  document.querySelector('#register-panel').hidden = !registering;
  loginTab.classList.toggle('active', !registering);
  registerTab.classList.toggle('active', registering);
  loginTab.setAttribute('aria-selected', String(!registering));
  registerTab.setAttribute('aria-selected', String(registering));
  authMessage.textContent = 'Prototipo: el formulario valida los datos, pero todavía no crea cuentas reales.';
}

document.querySelector('#open-auth').addEventListener('click', () => {
  setAuthMode('login');
  authDialog.showModal();
});
loginTab.addEventListener('click', () => setAuthMode('login'));
registerTab.addEventListener('click', () => setAuthMode('register'));

document.querySelector('#register-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const name = new FormData(event.currentTarget).get('name').trim();
  authMessage.textContent = `Formulario validado para ${name}. Aún falta conectar un servicio de autenticación para crear la cuenta.`;
});

document.querySelector('#login-form').addEventListener('submit', (event) => {
  event.preventDefault();
  authMessage.textContent = 'Formulario validado. La autenticación real todavía no está conectada.';
});

renderCourses();
video.querySelector('source').src = demoVideo;
video.load();
selectCourse(selectedCourseId);
