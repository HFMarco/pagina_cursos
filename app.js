const courses = [
  {
    id: 'fortinet', title: 'Fortinet NSE 4: FortiOS Administrator', category: 'Preparación Fortinet', certification: 'NSE 4 · FortiOS 8.0 Administrator', pricePen: 0.10, level: 'Inicial · Intermedio', duration: '12 h · ruta teórica', lessons: 34,
    theme: 'moss', mark: '01', label: 'FORTINET · SECURITY',
    shortDescription: 'Temario estructurado para administrar FortiGate y preparar el examen NSE 4 vigente.',
    description: 'Curso teórico con clases en video y apuntes por lección, alineado con los dominios oficiales del examen Fortinet NSE 4 - FortiOS 8.0 Administrator. Incluye práctica guiada y repaso; no reemplaza la experiencia en laboratorio ni emite una certificación oficial.',
    introTitle: '1. Introducción al curso y al examen',
    introDescription: 'Ruta basada en los objetivos publicados para FortiOS 8.0 Administrator. El examen indicado por Fortinet dura 100 minutos, contiene 50–60 preguntas y está disponible en inglés. Comprueba la guía oficial antes de reservar, porque el temario puede cambiar.',
    outcomes: ['Configurar y administrar funciones habituales de FortiGate.', 'Analizar políticas, autenticación, inspección, routing, SD-WAN y VPN.', 'Usar logs y herramientas de diagnóstico para explicar el flujo del tráfico.'],
    modules: [
      { title: '1. Introducción y fundamentos', lessons: [
        { type: 'video', title: '1.1 Clase (video): panorama del NSE 4', description: 'Presentación del curso, formato del examen, laboratorios y método de estudio. El video del instructor se añadirá al conectar Cloudflare Stream.' },
        { type: 'theory', title: '1.2 Teoría: FortiGate y flujo de tráfico', content: 'FortiGate es una plataforma de seguridad de red que aplica decisiones de control al tráfico que atraviesa sus interfaces. Para analizar un caso, identifica origen, destino, interfaz de entrada/salida, ruta, política coincidente, traducción NAT y perfiles de seguridad.\n\nFortiOS combina configuración de sistema, objetos reutilizables y políticas. Una política de firewall compara atributos como interfaces, direcciones, usuario, servicio y horario. La primera política coincidente determina el tratamiento, por eso el orden y los registros son importantes.\n\nEl examen mide conocimientos aplicados: practica la lectura de topologías, capturas de configuración, logs y síntomas, no solo la memorización de términos.' }
      ]},
      { title: '2. Despliegue y configuración del sistema · 25–35%', lessons: [
        { type: 'video', title: '2.1 Clase (video): configuración inicial y servicios', description: 'Video de laboratorio por añadir: valores de fábrica, administración segura, DHCP, FortiGuard y actualización de firmware.' },
        { type: 'theory', title: '2.2 Teoría: puesta en marcha y mantenimiento', content: 'Antes de cambiar una unidad, confirma modelo, versión, acceso por consola/GUI, interfaces y topología. Revisa el comportamiento de fábrica y asigna direcciones, rutas y servicios con un plan de administración seguro. Limita el acceso administrativo por interfaz y origen; usa credenciales robustas y protocolos cifrados.\n\nFortiGuard aporta servicios de inteligencia y actualización sujetos a licenciamiento. Verifica estado de registro, suscripciones y conectividad antes de diagnosticar una función que no actualiza. FortiGate puede prestar DHCP; comprueba el ámbito, gateway, DNS y la interfaz donde escucha.\n\nRealiza backup antes de cambios y valida que el archivo corresponda al equipo/versión adecuados. Para actualizar firmware, consulta rutas admitidas, notas de versión, compatibilidad, espacio y plan de reversión. En FortiOS 8.0 aparecen objetivos relacionados con FortiAI e integración de GenAI en CLI: revisa su alcance en la guía oficial de esa versión.' },
        { type: 'video', title: '2.3 Clase (video): HA, clúster FGCP y continuidad', description: 'Video de laboratorio por añadir: roles, sincronización, failover, interfaces de administración y actualización del clúster.' },
        { type: 'theory', title: '2.4 Teoría: alta disponibilidad FGCP', content: 'FGCP agrupa FortiGate para mantener el servicio cuando un miembro falla. Estudia los modos de operación, prioridad/elección del primario, monitoreo de interfaces, heartbeat y sincronización de sesiones. Las diferencias de configuración, conectividad de heartbeat y estado de los miembros pueden explicar una elección inesperada o falta de failover.\n\nUna interfaz de administración dedicada facilita operar cada miembro. Antes de actualizar, confirma compatibilidad, topología, respaldo y procedimiento recomendado para la versión. Tras un evento, compara estado del clúster, roles, sesiones y logs en ambos nodos.' },
        { type: 'video', title: '2.5 Clase (video): logs, FortiAnalyzer y observabilidad', description: 'Video de laboratorio por añadir: destinos de logs, registro de FortiAnalyzer, filtros y búsqueda de eventos.' },
        { type: 'theory', title: '2.6 Teoría: logging y análisis de eventos', content: 'El flujo de logs parte de la generación del evento, pasa por la configuración de registro y su almacenamiento/transporte, y termina en consulta y correlación. Las opciones de almacenamiento tienen distintas capacidades de retención y operación; no supongas que todos los logs se guardan localmente.\n\nFortiAnalyzer centraliza análisis y retención. Para registrar el dispositivo valida conectividad, autorización y estado de registro; luego filtra por tiempo, origen, destino, política, acción y tipo de evento. Usa los logs para confirmar qué regla coincidió y si perfiles, autenticación o inspección afectaron el tráfico. Revisa también visibilidad de session helpers y telemetría/hooks cuando el caso lo indique.' },
        { type: 'video', title: '2.7 Clase (video): troubleshooting, recursos y nube', description: 'Video de laboratorio por añadir: sniffer, debug flow, CPU/memoria, FortiGate VM, AWS, Azure y FortiSASE.' },
        { type: 'theory', title: '2.8 Teoría: diagnóstico, cloud y FortiSASE', content: 'Diagnostica por capas: enlace físico, interfaz/VLAN, direccionamiento, ruta, política, sesión, DNS y aplicación. Un sniffer permite observar paquetes en una interfaz; debug flow explica decisiones de procesamiento y coincidencia. Úsalos con filtros acotados y detén la depuración al terminar.\n\nCPU o memoria elevadas requieren identificar procesos, sesiones y tendencias; memory conserve mode protege el equipo al reducir operaciones que consumen memoria. No cambies parámetros a ciegas: correlaciona recursos, tráfico y logs.\n\nFortiGate VM despliega funciones de firewall en AWS/Azure; revisa interfaces virtuales, rutas, grupos de seguridad, automatización de configuración y dirección de telemetría. FortiSASE sigue la arquitectura SASE para acceso seguro remoto; estudia onboarding, componentes y funciones, incluyendo integración ZTNA, identidad/etiquetas y protecciones DLP/OCR para datos y uso de GenAI señaladas en 8.0.' }
      ]},
      { title: '3. Políticas de firewall y autenticación · 20–25%', lessons: [
        { type: 'video', title: '3.1 Clase (video): políticas, orden y modos de inspección', description: 'Video de laboratorio por añadir: objetos, servicios, coincidencia de reglas, logs, etiquetas y organización.' },
        { type: 'theory', title: '3.2 Teoría: políticas y control del tráfico', content: 'Una política relaciona interfaces de entrada/salida, origen, destino, horario, servicio, acción, NAT y perfiles. Los objetos evitan repetir direcciones y servicios; las etiquetas permiten agrupar y administrar objetos/políticas. El orden, la especificidad y el contexto de VDOM/interfaz pueden cambiar qué regla coincide.\n\nEl modo de inspección (flow o proxy) define cómo se procesa el contenido y afecta capacidades/recursos. Habilita logs adecuados para responder quién inició la sesión, qué regla coincidió y cuál fue la acción. Los cambios de FortiOS 8.0 incluyen organización por color/etiquetas y etiquetas dinámicas: aprende el concepto y confirma la sintaxis exacta en la documentación versionada.' },
        { type: 'video', title: '3.3 Clase (video): SNAT, DNAT y VIP', description: 'Video de laboratorio por añadir: NAT de salida y publicación de un servidor mediante Virtual IP.' },
        { type: 'theory', title: '3.4 Teoría: traducción de direcciones', content: 'SNAT modifica la dirección de origen de una conexión, habitualmente para que una red privada salga por una interfaz WAN. DNAT modifica el destino; una Virtual IP (VIP) suele mapear una dirección/puerto público a un servidor interno.\n\nPara resolver problemas, separa la dirección original de la traducida, valida interfaces, objetos, puertos y política asociada. Una VIP por sí sola no garantiza acceso: deben coincidir ruta de retorno, regla, servicio y controles intermedios. Evita publicar servicios innecesarios.' },
        { type: 'video', title: '3.5 Clase (video): usuarios, LDAP, RADIUS, FSSO y SSO', description: 'Video de laboratorio por añadir: autenticación local/remota, agente FSSO y diagnóstico de identidad.' },
        { type: 'theory', title: '3.6 Teoría: autenticación e identidad', content: 'LDAP consulta directorios; RADIUS delega autenticación/autorización en un servidor AAA. La autenticación activa solicita credenciales durante el acceso; la pasiva puede asociar identidad observada en la red. Comprueba conectividad, DNS, hora, certificados, grupos y formato de usuario al diagnosticar.\n\nFSSO asocia sesiones de dominio con identidades mediante agentes/controladores y collector. Valida el flujo desde DC/collector hasta FortiGate y compara el usuario detectado con los grupos usados por la política. Distingue FSSO de identidad/tagging de ZTNA y de FortiIdentity Cloud/SSO: son mecanismos relacionados, pero con fuentes y usos distintos.' }
      ]},
      { title: '4. Inspección de contenido · 25–30%', lessons: [
        { type: 'video', title: '4.1 Clase (video): inspección SSL/SSH y certificados', description: 'Video de laboratorio por añadir: certificate inspection, full inspection, CA interna y errores TLS.' },
        { type: 'theory', title: '4.2 Teoría: tráfico cifrado y certificados', content: 'Certificate inspection revisa metadatos del certificado sin descifrar el contenido de la sesión. Full SSL/SSH inspection intercepta y descifra tráfico autorizado para aplicar controles, y vuelve a cifrarlo. Para ello los endpoints deben confiar en la CA correspondiente; de lo contrario muestran alertas.\n\nDefine excepciones por necesidad legal/técnica, protege la clave de la CA y documenta su despliegue. Certificados expirados, cadenas incompletas, nombres no coincidentes, protocolos incompatibles o inspección TLS 1.3 pueden causar errores. Los objetivos 8.0 incluyen negociación TLS 1.3; consulta la guía vigente para límites y comportamiento exactos.' },
        { type: 'video', title: '4.3 Clase (video): web filter y FortiGuard', description: 'Video de laboratorio por añadir: perfiles flow/proxy, categorías, URL filters y bloqueo DLP de chatbots GenAI.' },
        { type: 'theory', title: '4.4 Teoría: filtrado web y DLP', content: 'Web filter aplica categorías FortiGuard y reglas URL para permitir, monitorizar o bloquear navegación. La inspección por certificado limita lo observable; la inspección completa permite inspección más profunda cuando está configurada y confiada en los equipos. Revisa el perfil aplicado, licencia/conectividad FortiGuard, clasificación, excepciones y logs si una URL se trata distinto a lo esperado.\n\nDLP detecta o controla salida de datos según patrones, etiquetas y política. FortiOS 8.0 menciona controles relacionados con GenAI, FortiData labels y OCR. En el examen, céntrate en el propósito, flujo de decisión y resolución de escenarios; el detalle de disponibilidad depende del producto/licencia.' },
        { type: 'video', title: '4.5 Clase (video): Application Control, antivirus e IPS', description: 'Video de laboratorio por añadir: firmas de aplicaciones, perfiles AV, protocolos, sensores IPS y eventos.' },
        { type: 'theory', title: '4.6 Teoría: controles de aplicaciones y amenazas', content: 'Application Control identifica aplicaciones más allá del puerto y permite monitorearlas o aplicar acciones según el perfil. Si no coincide, revisa el modo de inspección, política, protocolo, firmas y logs.\n\nAntivirus analiza protocolos/contenido compatibles según el perfil, modo flow/proxy y opciones de protocolo. Confirma qué tráfico se inspecciona y dónde quedan los eventos; problemas comunes incluyen exclusiones, tráfico cifrado sin inspección, límites de recursos o perfil no aplicado.\n\nIPS usa sensores y firmas para detectar/prevenir exploits y patrones de ataque. Ajusta severidad/acción con criterio; investiga CPU elevada junto a sensores, volumen y eventos. Los temas 8.0 añaden conciencia DLP/GenAI, detección AI/ML de DNS tunneling y FortiGuard Extended SaaS DB: relaciónalos con visibilidad y políticas, sin asumir que sustituyen controles básicos.' }
      ]},
      { title: '5. Routing y SD-WAN · 10–15%', lessons: [
        { type: 'video', title: '5.1 Clase (video): rutas estáticas y tabla de routing', description: 'Video de laboratorio por añadir: next hop, distancia/prioridad, tabla de rutas y balanceo.' },
        { type: 'theory', title: '5.2 Teoría: encaminamiento en FortiGate', content: 'La decisión de salida empieza con la búsqueda de la ruta más específica disponible; rutas por defecto cubren destinos sin coincidencia más específica. Una ruta estática define destino, gateway/interfaz y atributos de preferencia. La tabla de routing muestra rutas instaladas, no solo configuradas.\n\nPara diagnosticar, compara el destino, la ruta seleccionada, el next hop y la ruta de retorno. Redundancia y balanceo dependen de configuración y estado de enlaces; una política de firewall no reemplaza una ruta válida.' },
        { type: 'video', title: '5.3 Clase (video): SD-WAN y calidad de enlaces', description: 'Video de laboratorio por añadir: miembros, reglas, health checks, SLA y balanceo por utilización.' },
        { type: 'theory', title: '5.4 Teoría: SD-WAN', content: 'SD-WAN agrupa enlaces WAN y elige camino según reglas y mediciones de salud/calidad. Define miembros, sondas/health checks y criterios (latencia, pérdida, jitter o utilización, según caso). Distingue enlace caído de enlace activo pero degradado.\n\nAl revisar comportamiento, sigue la ruta lógica: regla SD-WAN coincidente, estado del miembro, calidad medida, política de firewall y ruta subyacente. El estado y uso de enlaces, la lógica de routing y el balanceo deben concordar con el caso.' }
      ]},
      { title: '6. VPN IPsec · 10–15%', lessons: [
        { type: 'video', title: '6.1 Clase (video): túnel IPsec site-to-site', description: 'Video de laboratorio por añadir: asistente, Phase 1/2, rutas, políticas, selectores y logs.' },
        { type: 'theory', title: '6.2 Teoría: IPsec y negociación', content: 'IPsec protege comunicaciones mediante asociaciones de seguridad y parámetros acordados por los extremos. En IKE, Phase 1 establece el canal de control/autenticación; Phase 2 negocia protección del tráfico (selectores, algoritmos y tiempos). Ambos peers deben tener parámetros compatibles y alcanzar sus direcciones a través de la red.\n\nEl asistente simplifica el despliegue, pero debes comprender objetos, interfaces, rutas y políticas que crea. Revisa estado de negociación, propuestas, secretos/certificados, selectores, NAT traversal, rutas y logs. Los objetivos 8.0 incluyen TLS 1.3-based VPN negotiation y opciones quantum-safe para IPsec; estudia el propósito y las condiciones documentadas, ya que la compatibilidad depende de versión/plataforma.' },
        { type: 'video', title: '6.3 Clase (video): VPN redundante y troubleshooting', description: 'Video de laboratorio por añadir: túneles mesh/parcialmente redundantes, failover y lectura de logs.' },
        { type: 'theory', title: '6.4 Teoría: redundancia y fallos de VPN', content: 'Una topología parcialmente redundante ofrece caminos alternativos sin conectar todos los pares entre sí. Planifica rutas, prioridades, monitoreo y comportamiento ante pérdida del peer/enlace. Confirma que el túnel está establecido, que los selectores abarcan las redes correctas y que existe política en ambos extremos.\n\nSi el túnel sube pero no pasa tráfico, busca rutas, políticas, NAT accidental, selectores y asimetría. Si no negocia, compara fase/propuestas, autenticación, reachability y logs de IKE/IPsec. La redundancia es útil solo si el failover y el retorno están diseñados.' }
      ]},
      { title: '7. FortiGate en nube pública y FortiSASE', lessons: [
        { type: 'video', title: '7.1 Clase (video): FortiGate VM en AWS y Azure', description: 'Video de laboratorio por añadir: despliegue virtual, redes cloud y automatización.' },
        { type: 'theory', title: '7.2 Teoría: firewall virtual y SASE', content: 'En AWS y Azure, FortiGate VM se integra con interfaces, subredes, rutas y controles de seguridad nativos de la nube. Los errores de conectividad pueden estar fuera del FortiGate: revisa tablas de rutas, security groups/NSG, direcciones y automatización. Comprende retos cloud como exposición, segmentación y cambios dinámicos.\n\nFortiSASE entrega capacidades de seguridad y acceso para usuarios remotos desde un servicio cloud. Reconoce componentes, onboarding y relación con ZTNA, identidad/etiquetas, DLP y OCR descritos en los objetivos 8.0. Usa las guías oficiales de FortiSASE y de las plataformas cloud para detalles operativos.' }
      ]},
      { title: '8. Integración, laboratorio y repaso final', lessons: [
        { type: 'video', title: '8.1 Clase (video): caso integrador de diagnóstico', description: 'Video del instructor por añadir: un caso que sigue la sesión desde interfaz y ruta hasta política, perfiles y logs.' },
        { type: 'theory', title: '8.2 Teoría: método de resolución de escenarios', content: 'Lee cada escenario identificando el síntoma, alcance y cambio reciente. Traza el paquete: interfaz de entrada, dirección/servicio, identidad, ruta, regla, NAT, inspección, salida y respuesta. Usa logs para confirmar hechos y herramientas de diagnóstico para localizar el punto donde se interrumpe el flujo.\n\nPlan de revisión: (1) configuración inicial, HA, logs y troubleshooting; (2) políticas, NAT y autenticación; (3) certificados, web filter, Application Control, antivirus e IPS; (4) rutas y SD-WAN; (5) VPN IPsec; (6) FortiGate cloud y FortiSASE. Distribuye el tiempo según ponderación oficial: despliegue 25–35%, políticas 20–25%, inspección 25–30%, routing 10–15% y VPN 10–15%. Practica con documentación Fortinet y laboratorios; el examen actual usa preguntas situacionales.' }
      ]}
    ]
  },
  {
    id: 'ccna', title: 'Cisco CCNA: redes empresariales', category: 'Preparación CCNA', certification: 'Cisco CCNA (200-301)', pricePen: 0.10, level: 'Inicial · Intermedio', duration: '8 h', lessons: 12,
    theme: 'blue', mark: '02', label: 'CISCO · CCNA',
    shortDescription: 'Construye bases de redes y practica los temas centrales de la ruta CCNA.',
    description: 'Estudia fundamentos de red, acceso, conectividad IP, servicios, seguridad y automatización con ejercicios guiados. La certificación oficial requiere rendir el examen correspondiente de Cisco.',
    introTitle: 'Tu camino hacia CCNA',
    introDescription: 'Una visión general del examen CCNA y de cómo abordaremos redes, configuración y diagnóstico.',
    chapters: ['Introducción al examen CCNA 200-301', 'Fundamentos de redes y modelos', 'Ethernet y switching', 'VLAN y enlaces troncales', 'Direccionamiento IPv4 y subnetting', 'Conceptos de IPv6', 'Routing estático y dinámico', 'Servicios IP: DHCP, DNS y NAT', 'Fundamentos de seguridad', 'Wireless y acceso', 'Automatización y programabilidad', 'Laboratorio integrador y repaso'],
    outcomes: ['Explicar fundamentos de redes y conectividad empresarial.', 'Interpretar direccionamiento IP y conceptos de switching y routing.', 'Practicar diagnóstico con una ruta alineada a los dominios publicados para CCNA.']
  },
  {
    id: 'mikrotik', title: 'MikroTik: routing y switching', category: 'Preparación MikroTik', certification: 'MTCNA · MikroTik Certified Network Associate', pricePen: 0.10, level: 'Inicial · Intermedio', duration: '6 h', lessons: 10,
    theme: 'rose', mark: '03', label: 'MIKROTIK · ROUTING',
    shortDescription: 'Practica RouterOS, direccionamiento, servicios y administración de redes.',
    description: 'Ruta de preparación para comprender RouterOS y los fundamentos que suelen cubrirse en MTCNA, con prácticas de configuración y diagnóstico. Confirma la versión y el examen oficial vigentes con MikroTik Training.',
    introTitle: 'Conoce RouterOS',
    introDescription: 'Una introducción a RouterOS, el laboratorio y los objetivos de aprendizaje de esta ruta MikroTik.',
    chapters: ['Introducción a la ruta MikroTik', 'Primer acceso y configuración RouterOS', 'Navegación por WinBox y terminal', 'Direcciones IP y DHCP', 'Bridging y switching básico', 'Routing estático', 'Firewall y NAT', 'Wireless y administración', 'Monitoreo y solución de problemas', 'Repaso orientado a MTCNA'],
    outcomes: ['Configurar tareas esenciales en RouterOS.', 'Comprender direccionamiento, DHCP, routing y NAT.', 'Practicar diagnóstico básico para prepararte para la ruta MTCNA.']
  }
];

const publicNav = document.querySelector('#public-nav');
const memberNav = document.querySelector('#member-nav');
const accessButton = document.querySelector('#open-auth');
const memberChip = document.querySelector('#member-chip');
const homeView = document.querySelector('#home-view');
const contactView = document.querySelector('#contact-view');
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
let authReturnRoute = null;
let enrolledCourseIds = new Set();
let enrollmentChannel = null;
let certificateChannel = null;
let demoPurchaseChannel = null;

function setRoute(route, { replace = false, scrollTo = true } = {}) {
  const cleanRoute = route.replace(/^#/, '');
  if (replace) window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${cleanRoute}`);
  else if (window.location.hash !== `#${cleanRoute}`) window.history.pushState(null, '', `#${cleanRoute}`);
  renderRoute(cleanRoute, { scrollTo });
}

function renderRoute(route = window.location.hash.slice(1), { scrollTo = true } = {}) {
  const parts = route.split('/').filter(Boolean);
  homeView.hidden = true;
  contactView.hidden = true;
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
    contactView.hidden = false;
    if (scrollTo) window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  if (parts[0] === 'contacto') {
    contactView.hidden = false;
    if (scrollTo) window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
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
          <img class="course-art" src="./assets/course-${course.id}.svg" alt="Ilustración del curso ${course.title}">
          ${enrolled ? '<span class="enrolled-tag">MI CURSO</span>' : ''}
        </div>
        <div class="course-info">
          <p class="course-category">${course.category}</p><h3>${course.title}</h3><p class="course-certification">${course.certification}</p>
          <p class="course-summary">${course.shortDescription}</p>
          <div class="course-meta"><span>${course.level}</span><span>${course.duration}</span><span>${course.lessons} lecciones</span></div>
          <div class="course-card-actions"><span class="price-teaser">Precio de prueba<br><strong>S/ ${course.pricePen.toFixed(2)}</strong></span><button class="course-open" type="button" data-course-id="${course.id}">${enrolled ? 'Continuar' : 'Ver temario'} <span>→</span></button></div>
        </div>
      </article>`;
  }).join('');
  courseGrid.querySelectorAll('[data-course-id]').forEach((button) => button.addEventListener('click', () => setRoute(`curso/${button.dataset.courseId}`)));
  courseGrid.querySelectorAll('.course-art').forEach((image) => image.addEventListener('error', () => {
    image.hidden = true;
    const course = courses.find((item) => image.alt.includes(item.title));
    const fallback = document.createElement('span');
    fallback.className = 'course-art-fallback';
    fallback.textContent = course?.title || 'Curso de certificación';
    image.closest('.course-cover')?.append(fallback);
  }, { once: true }));
}

function renderCourse(course) {
  selectedCourse = course;
  const enrolled = enrolledCourseIds.has(course.id);
  document.querySelector('#course-breadcrumb').innerHTML = `${enrolled ? 'Mis cursos' : 'Catálogo'} <span>/</span> ${course.title}`;
  document.querySelector('#detail-category').textContent = `${course.category.toUpperCase()} · RUTA DE APRENDIZAJE`;
  document.querySelector('#detail-title').textContent = course.title;
  document.querySelector('#detail-description').textContent = course.description;
  document.querySelector('#detail-certification').textContent = course.certification;
  document.querySelector('#course-price').textContent = `S/ ${course.pricePen.toFixed(2)}`;
  document.querySelector('#detail-level').textContent = `Nivel ${course.level}`;
  document.querySelector('#detail-duration').textContent = course.duration;
  document.querySelector('#detail-lessons').textContent = `${course.lessons} lecciones`;
  document.querySelector('#syllabus-course-title').textContent = course.title;
  const allLessons = getCourseLessons(course);
  document.querySelector('#lesson-count').textContent = `${allLessons.length} lecciones`;
  document.querySelector('#lesson-kicker').textContent = `PROGRAMA · ${course.category.toUpperCase()}`;
  document.querySelector('#lesson-title').textContent = enrolled ? course.introTitle : 'Contenido protegido';
  document.querySelector('#lesson-description').textContent = enrolled ? course.introDescription : 'Compra simulada y acceso por cuenta para ver las clases y el material teórico.';
  document.querySelector('#course-outcomes').innerHTML = course.outcomes.map((outcome) => `<li>${outcome}</li>`).join('');
  const buyButton = document.querySelector('#purchase-button');
  buyButton.innerHTML = enrolled ? 'Ir a mis cursos <span>↗</span>' : 'Simular compra · S/ 0.10 <span>↗</span>';
  buyButton.hidden = enrolled;
  document.querySelector('.syllabus-buy').textContent = enrolled ? 'Volver a Mis cursos' : 'Simular compra · S/ 0.10';
  document.querySelector('.syllabus-footnote').textContent = enrolled ? 'Acceso habilitado para esta cuenta.' : 'Las lecciones y su contenido están bloqueados hasta tener acceso.';
  document.querySelector('#back-to-home').textContent = enrolled ? '← Mis cursos' : '← Cursos';
  document.querySelector('#detail-back-footer').textContent = enrolled ? 'Volver a mis cursos →' : 'Volver al catálogo →';
  const theoryPanel = document.querySelector('#lesson-theory');
  theoryPanel.hidden = true;
  theoryPanel.textContent = '';
  video.pause();
  video.removeAttribute('src');
  video.querySelector('source').removeAttribute('src');
  video.load();
  renderLessons(course, enrolled);
}

function getCourseLessons(course) {
  if (course.modules) return course.modules.flatMap((module) => module.lessons.map((lesson) => ({ ...lesson, module: module.title })));
  return course.chapters.map((title, index) => ({ type: 'video', title: `${index + 1}. Clase: ${title}`, description: 'La lección se publicará aquí.' }));
}

function renderLessons(course, enrolled) {
  const lessons = getCourseLessons(course);
  let moduleHeading = '';
  lessonList.innerHTML = lessons.map((lesson, index) => {
    const heading = lesson.module !== moduleHeading ? `<li class="lesson-module-heading">${lesson.module || ''}</li>` : '';
    moduleHeading = lesson.module || '';
    const locked = !enrolled;
    const icon = locked ? '🔒' : lesson.type === 'video' ? '▶' : 'T';
    return `${heading}<li><button class="lesson-item ${locked ? 'locked' : index === 0 ? 'current' : 'included'}" type="button" data-lesson-index="${index}"><span class="lesson-number">${icon}</span><span class="lesson-name">${lesson.title}</span><span class="lesson-duration">${locked ? 'Bloqueada' : lesson.type === 'video' ? 'Video' : 'Teoría'}</span></button></li>`;
  }).join('');

  lessonList.querySelectorAll('[data-lesson-index]').forEach((button) => button.addEventListener('click', () => {
    const index = Number(button.dataset.lessonIndex);
    if (!enrolled) {
      openPurchaseDialog(course);
      return;
    }
    selectLesson(course, lessons[index], button);
  }));
  if (enrolled && lessons.length) {
    selectLesson(course, lessons[0], lessonList.querySelector('[data-lesson-index="0"]'));
  } else {
    videoError.textContent = '🔒 Acceso bloqueado. Simula la compra e inicia sesión para abrir las clases y la teoría.';
    videoError.hidden = false;
  }
}

function selectLesson(course, lesson, button) {
  lessonList.querySelectorAll('.lesson-item').forEach((item) => item.classList.remove('current'));
  button.classList.add('current');
  document.querySelector('#lesson-kicker').textContent = `${lesson.type === 'video' ? 'CLASE EN VIDEO' : 'MATERIAL TEÓRICO'} · ${course.category.toUpperCase()}`;
  document.querySelector('#lesson-title').textContent = lesson.title;
  document.querySelector('#lesson-description').textContent = lesson.description || 'Apunte teórico del módulo.';
  const theoryPanel = document.querySelector('#lesson-theory');
  theoryPanel.hidden = lesson.type !== 'theory';
  theoryPanel.textContent = lesson.content || '';
  video.pause();
  video.removeAttribute('src');
  video.querySelector('source').removeAttribute('src');
  video.load();
  if (lesson.type === 'video') {
    videoError.textContent = 'Video pendiente de carga. Al integrar Cloudflare Stream, cada lección tendrá su reproductor aquí.';
    videoError.hidden = false;
  } else {
    videoError.hidden = true;
  }
}

function openPurchaseDialog(course = selectedCourse) {
  if (!course) return;
  document.querySelector('#purchase-title').textContent = 'Prueba de acceso al curso';
  document.querySelector('#purchase-message').textContent = `Se registrará una compra de prueba de S/ 0.10 para “${course.title}”. No se enviará ningún pago ni se depositará dinero.`;
  document.querySelector('#simulate-purchase').hidden = false;
  purchaseDialog.showModal();
}

async function simulatePurchase() {
  if (!selectedCourse) return;
  if (!activeSession?.user) {
    authReturnRoute = `curso/${selectedCourse.id}`;
    purchaseDialog.close();
    openAuth('login');
    authMessage.textContent = 'Accede o crea una cuenta; luego vuelve al curso para registrar la compra simulada.';
    return;
  }
  if (!supabaseClient) {
    document.querySelector('#purchase-message').textContent = 'Configura Supabase para guardar la compra simulada de forma persistente.';
    return;
  }
  const button = document.querySelector('#simulate-purchase');
  button.disabled = true;
  button.textContent = 'Guardando…';
  const { error } = await supabaseClient.from('demo_purchases').insert({
    user_id: activeSession.user.id,
    course_id: selectedCourse.id,
    amount_pen: selectedCourse.pricePen,
    status: 'completed'
  });
  button.disabled = false;
  button.textContent = 'Simular compra · S/ 0.10';
  if (error) {
    const message = error.code === '23505'
      ? 'Esta cuenta ya tiene el acceso de prueba registrado.'
      : 'No se guardó. Ejecuta primero la migración supabase-schema.sql en Supabase y vuelve a intentar.';
    document.querySelector('#purchase-message').textContent = message;
    if (error.code === '23505') {
      await loadStudentData(activeSession.user);
      purchaseDialog.close();
    }
    return;
  }
  await loadStudentData(activeSession.user);
  purchaseDialog.close();
  renderCourse(selectedCourse);
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
  const demoPurchaseResult = await supabaseClient.from('demo_purchases').select('course_id, amount_pen, purchased_at').eq('user_id', user.id).eq('status', 'completed');

  if (enrollmentResult.error) {
    status.textContent = 'No se pudo leer tu matrícula. Revisa la tabla enrollments y sus políticas en Supabase.';
    status.hidden = false;
    enrolledCourseIds = new Set();
  } else {
    const rows = enrollmentResult.data || [];
    const demoRows = demoPurchaseResult.error ? [] : (demoPurchaseResult.data || []);
    enrolledCourseIds = new Set([...rows, ...demoRows].map((row) => row.course_id));
    const accessRows = [...rows, ...demoRows.filter((demo) => !rows.some((row) => row.course_id === demo.course_id))];
    const enrolledCourses = accessRows.map((row) => ({ ...courses.find((course) => course.id === row.course_id), purchasedAt: row.purchased_at, isDemo: demoRows.some((demo) => demo.course_id === row.course_id) && !rows.some((enrollment) => enrollment.course_id === row.course_id) })).filter((course) => course.id);
    document.querySelector('#enrollment-count').textContent = String(enrolledCourses.length).padStart(2, '0');
    if (enrolledCourses.length) {
      empty.hidden = true;
      list.hidden = false;
      list.innerHTML = enrolledCourses.map((course) => `<article class="enrolled-course-card ${course.theme}"><div class="enrolled-cover"><span>${course.mark}</span><i>${course.isDemo ? 'ACCESO DEMO' : 'ACCESS ACTIVE'}</i></div><div class="enrolled-course-copy"><p class="course-category">${course.category}</p><h3>${course.title}</h3><p>${course.shortDescription}</p><button class="course-open" type="button" data-enrolled-course="${course.id}">Entrar al curso <span>→</span></button></div></article>`).join('');
      list.querySelectorAll('[data-enrolled-course]').forEach((button) => button.addEventListener('click', () => setRoute(`curso/${button.dataset.enrolledCourse}`)));
    }
    if (demoPurchaseResult.error) {
      status.textContent = 'Para activar el botón de compra simulada, ejecuta la sección demo_purchases de supabase-schema.sql en Supabase.';
      status.hidden = false;
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
  const routeParts = window.location.hash.slice(1).split('/');
  if (routeParts[0] === 'curso') {
    const currentCourse = courses.find((course) => course.id === routeParts[1]);
    if (currentCourse) renderCourse(currentCourse);
  }
}

function resetRealtimeChannels() {
  if (!supabaseClient) return;
  if (enrollmentChannel) supabaseClient.removeChannel(enrollmentChannel);
  if (certificateChannel) supabaseClient.removeChannel(certificateChannel);
  if (demoPurchaseChannel) supabaseClient.removeChannel(demoPurchaseChannel);
  enrollmentChannel = null;
  certificateChannel = null;
  demoPurchaseChannel = null;
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
  demoPurchaseChannel = supabaseClient.channel(`student-demo-purchases-${user.id}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'demo_purchases', filter: `user_id=eq.${user.id}` }, () => loadStudentData(user))
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
  if (link.dataset.contactCourse) {
    const course = courses.find((item) => item.id === link.dataset.contactCourse);
    const courseField = document.querySelector('#contact-course');
    if (course && courseField) courseField.value = course.id;
  }
  setRoute(link.dataset.route);
}

document.addEventListener('click', handleRouteClick);
window.addEventListener('hashchange', () => renderRoute(window.location.hash.slice(1)));
window.addEventListener('focus', () => { if (activeSession?.user && supabaseClient) loadStudentData(activeSession.user); });
document.addEventListener('visibilitychange', () => { if (!document.hidden && activeSession?.user && supabaseClient) loadStudentData(activeSession.user); });

document.querySelector('#back-to-home').addEventListener('click', () => setRoute(activeSession?.user ? 'alumno' : 'catalogo'));
document.querySelector('#detail-back-footer').addEventListener('click', () => setRoute(activeSession?.user ? 'alumno' : 'catalogo'));
document.querySelector('#purchase-button').addEventListener('click', () => {
  if (selectedCourse && enrolledCourseIds.has(selectedCourse.id)) setRoute('alumno');
  else openPurchaseDialog();
});
document.querySelectorAll('[data-purchase]').forEach((button) => button.addEventListener('click', () => {
  if (selectedCourse && enrolledCourseIds.has(selectedCourse.id)) setRoute('alumno');
  else openPurchaseDialog();
}));
document.querySelector('#simulate-purchase').addEventListener('click', simulatePurchase);
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
  const nextRoute = authReturnRoute || 'alumno';
  authReturnRoute = null;
  setRoute(nextRoute);
});

document.querySelector('#sign-out').addEventListener('click', async () => {
  if (!supabaseClient) return;
  const { error } = await supabaseClient.auth.signOut();
  if (error) { authMessage.textContent = formatAuthError(error); return; }
  authDialog.close();
  setRoute('inicio');
});

document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = new FormData(event.currentTarget);
  const name = String(fields.get('name') || '').trim();
  const email = String(fields.get('email') || '').trim();
  const courseId = String(fields.get('course') || 'general');
  const course = courses.find((item) => item.id === courseId)?.title || 'Consulta general';
  const message = String(fields.get('message') || '').trim();
  const subject = encodeURIComponent(`Consulta ${course} · ${name}`);
  const body = encodeURIComponent(`Nombre: ${name}\nCorreo: ${email}\nInterés: ${course}\n\n${message}`);
  document.querySelector('#contact-feedback').textContent = 'Se abrirá tu aplicación de correo con el mensaje preparado. Revisa los datos y envíalo desde allí.';
  window.location.href = `mailto:soporte@cyberaula.example?subject=${subject}&body=${body}`;
});

video.addEventListener('error', () => { videoError.hidden = false; });
video.addEventListener('loadeddata', () => { videoError.hidden = true; });

if (supabaseClient) {
  supabaseClient.auth.onAuthStateChange((event, session) => {
    updateSession(session);
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
