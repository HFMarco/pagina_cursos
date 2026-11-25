// Datos de demostración. Más adelante pueden venir de un CMS o una API.
const demoVideo = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

const courses = [
  {
    id: 'excel',
    title: 'Excel desde cero',
    category: 'Productividad',
    lessons: 8,
    progress: 22,
    theme: 'moss',
    mark: '01',
    label: 'ORDENA TUS IDEAS',
    lessonTitle: 'Bienvenido a tu aula',
    description: 'Este clip externo sirve para probar el reproductor. Se detiene al llegar a 10 segundos.',
    chapters: ['Bienvenida · video de prueba', 'Conoce la interfaz', 'Tu primera hoja de cálculo']
  },
  {
    id: 'finanzas',
    title: 'Finanzas personales',
    category: 'Vida y negocios',
    lessons: 12,
    progress: 0,
    theme: 'blue',
    mark: '02',
    label: 'DECIDE CON CLARIDAD',
    lessonTitle: 'Introducción a tus finanzas',
    description: 'Lección de muestra. En esta maqueta, todos los cursos usan el mismo clip público de prueba.',
    chapters: ['Introducción · video de prueba', 'Registra tus ingresos', 'Crea un presupuesto sencillo']
  },
  {
    id: 'comunicacion',
    title: 'Comunicación efectiva',
    category: 'Habilidades',
    lessons: 6,
    progress: 0,
    theme: 'rose',
    mark: '03',
    label: 'COMPARTE MEJOR',
    lessonTitle: 'Comunica con intención',
    description: 'Lección de muestra. El reproductor está preparado para cambiar a videos de hasta 30 minutos.',
    chapters: ['Introducción · video de prueba', 'Escucha activa', 'Explica una idea con claridad']
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

renderCourses();
video.querySelector('source').src = demoVideo;
video.load();
selectCourse(selectedCourseId);
