// Mobile Menu Logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg', 'bg-slate-900/80', 'backdrop-blur-md');
        navbar.classList.remove('glass');
    } else {
        navbar.classList.remove('shadow-lg', 'bg-slate-900/80', 'backdrop-blur-md');
        navbar.classList.add('glass');
    }
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-up').forEach((el) => {
    observer.observe(el);
});

// Projects Modal Logic
const modalOverlay = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.custom-close-btn');

const projectsData = {
    'project-1': {
        title: 'Sistema POS & Venta de Boletas',
        image: 'img/Pos.png',
        tags: ['Angular', 'Node.js', 'API REST', 'PosgreSql', 'WebSockets'],
        description: 'Plataforma integral desarrollada para la gestión de miles de asistentes. Integra un punto de venta (POS) físico sincronizado en tiempo real con la venta online mediante WebSockets.',
        features: [
            'Sincronización de inventario en tiempo real',
            'Dashboard para administradores y promotores',
            'Integración con impresoras térmicas Bluetooth/USB',
            'Lectura y validación rápida de códigos QR',
            'Pasarelas de pago integradas (Stripe y locales)'
        ]
    },
    'project-2': {
        title: 'ERP Corporativo B2B a Medida',
        image: 'img/Proyecto_ERP.png',
        tags: ['Angular', 'Firestore', 'JavaScript', 'Bootstrap'],
        description: 'Software de planificación de recursos empresariales diseñado específicamente para el sector logístico y de manufactura, digitalizando la contabilidad, RRHH e inventarios reemplazando silos de información.',
        features: [
            'Módulo contable con generación de reportes financieros',
            'Control de inventario multi-almacén con alertas de stock',
            'Gestión de nómina y recursos humanos',
            'Trazabilidad completa de operaciones y auditoría',
            'Arquitectura segura basada en roles y permisos (RBAC)'
        ]
    },
    'project-3': {
        title: 'Sitios Web Alta Conversión (Turismo)',
        image: 'img/project3.png',
        mediaType: 'video',
        video: 'media/pagina_mulata.webm',
        tags: ['HTML5', 'TailwindCSS', 'JavaScript', 'SEO'],
        description: 'Conjunto de landing pages y sitios web comerciales con un alto impacto visual y rendimiento optimizado. Diseñadas para agencias de viajes internacionales y locales con gran tráfico de usuarios.',
        features: [
            'Diseño 100% responsivo y "mobile-first"',
            'Animaciones fluidas y micro-interacciones (Glassmorphism)',
            'Optimización extrema para Core Web Vitals (99/100 Lighthouse)',
            'Integración con CRMs y herramientas de marketing',
            'Cotizadores dinámicos integrados'
        ]
    },
    'project-4': {
        title: 'Intranet & Arquitectura Cloud',
        image: 'img/project4.png',
        tags: ['Google Cloud', 'Firebase', 'React/Angular', 'NoSQL'],
        description: 'Despliegue de infraestructura segura y en tiempo real usando servicios de Google Cloud Platform y Firebase. Creado como solución interna para comunicación e intercambio de archivos seguro.',
        features: [
            'Autenticación empresarial con Single Sign-On (SSO)',
            'Almacenamiento seguro de documentos con encripción',
            'Funciones Serverless (Cloud Functions) para tareas automatizadas',
            'Chat interno en tiempo real',
            'Base de datos NoSQL altamente escalable'
        ]
    }
};

function openModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;
    const mediaHtml = data.mediaType === 'video'
        ? `<video controls autoplay muted loop playsinline preload="metadata" class="w-full h-full object-cover">
                <source src="${data.video}" type="video/webm">
           </video>`
        : `<img src="${data.image}" onerror="this.src='img/portada.jpeg'" alt="${data.title}" class="w-full h-full object-cover">`;

    modalBody.innerHTML = `
        <div class="relative w-full h-64 sm:h-80 md:h-96 rounded-t-3xl overflow-hidden bg-slate-800">
            ${mediaHtml}
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
            <div class="absolute bottom-6 left-6 right-6">
                <h3 class="text-3xl md:text-4xl font-bold text-white mb-3">${data.title}</h3>
                <div class="flex flex-wrap gap-2">
                    ${data.tags.map(tag => `<span class="px-3 py-1 bg-primary/20 text-primary border border-primary/30 text-xs font-semibold rounded-md backdrop-blur-md">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
        <div class="p-6 md:p-8">
            <div class="mb-8">
                <h4 class="text-xl font-semibold mb-4 text-slate-200 border-b border-slate-700/50 pb-2">Descripción del Proyecto</h4>
                <p class="text-slate-400 font-light leading-relaxed text-base">${data.description}</p>
            </div>
            <div>
                <h4 class="text-xl font-semibold mb-4 text-slate-200 border-b border-slate-700/50 pb-2">Funcionalidades Principales</h4>
                <ul class="space-y-3">
                    ${data.features.map(feature => `
                        <li class="flex items-start gap-3">
                            <div class="mt-1 bg-green-500/20 text-green-400 rounded-full p-1"><i class="ph ph-check text-sm"></i></div>
                            <span class="text-slate-300 font-light text-base">${feature}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            <div class="mt-10 pt-6 border-t border-slate-700/50 flex justify-end gap-4">
                <button onclick="closeModal()" class="px-6 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors font-medium">Cerrar</button>
                <a href="#contacto" onclick="closeModal()" class="px-6 py-2 rounded-lg bg-primary hover:bg-indigo-600 text-white transition-colors font-medium shadow-[0_0_15px_rgba(99,102,241,0.3)]">Solicitar Demo</a>
            </div>
        </div>
    `;

    setTimeout(() => {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent background scrolling
    }, 10);
}

function closeModal() {
    modalOverlay.classList.remove('active');
    setTimeout(() => {
        document.body.style.overflow = 'auto'; // allow background scrolling
    }, 300); // match transition duration
}

// Ensure close on click outside
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

closeBtn.addEventListener('click', closeModal);
