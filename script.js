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
        mediaType: 'video',
        video: 'media/google_cloud.mp4',
        tags: ['Google Cloud', 'Firebase', 'React/Angular', 'NoSQL'],
        description: 'Despliegue de infraestructura segura y en tiempo real usando servicios de Google Cloud Platform y Firebase. Creado como solución interna para comunicación e intercambio de archivos seguro.',
        features: [
            'Autenticación empresarial con Single Sign-On (SSO)',
            'Almacenamiento seguro de documentos con encripción',
            'Funciones Serverless (Cloud Functions) para tareas automatizadas',
            'Chat interno en tiempo real',
            'Base de datos NoSQL altamente escalable'
        ]
    },
    'project-5': {
        title: 'Ink Lovers Tattoo Studio',
        image: 'img/portada.jpeg',
        mediaType: 'video',
        video: 'media/ink_lover_studio.mp4',
        url: 'https://www.inkloverstudio.com/',
        tags: ['TailwindCSS', 'HTML5/CSS3', 'JavaScript', 'UI/UX'],
        description: 'Sitio web premium para estudio de tatuajes profesional, diseñado para optimizar conversiones y ofrecer una experiencia inmersiva e interactiva. Incluye optimización de performance mobile-first, galerías interactivas de portafolio y un widget de WhatsApp dinámico para agendamiento directo.',
        features: [
            'Diseño visual inmersivo con video background optimizado de alta fluidez',
            'Widget interactivo y flotante de WhatsApp diseñado específicamente para agendamiento',
            'Optimización SEO avanzada y performance extrema certificada por Lighthouse',
            'Galerías dinámicas de tatuajes categorizadas para mostrar el trabajo del estudio',
            'Diseño responsive adaptado meticulosamente para todos los dispositivos móviles'
        ]
    }
};

function openModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;
    const mediaHtml = data.mediaType === 'video'
        ? `<video controls autoplay muted loop playsinline preload="metadata" class="w-full h-full object-cover">
                <source src="${data.video}" type="${data.video.endsWith('.mp4') ? 'video/mp4' : 'video/webm'}">
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
            <div class="mt-10 pt-6 border-t border-slate-700/50 flex justify-end gap-4 flex-wrap">
                <button onclick="closeModal()" class="px-6 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors font-medium">Cerrar</button>
                ${data.url ? `<a href="${data.url}" target="_blank" class="px-6 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-opacity font-medium shadow-[0_0_15px_rgba(99,102,241,0.3)] flex items-center gap-2">Visitar Sitio <i class="ph ph-arrow-square-out"></i></a>` : ''}
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

// Tech Sphere 3D Interactive Animation
const sphereContainer = document.getElementById('tech-sphere');
const sphereParent = document.getElementById('tech-sphere-container');
if (sphereContainer && sphereParent) {
    const iconsData = [
        { icon: 'ph-fill ph-file-html', label: 'HTML5', color: 'from-orange-500 to-amber-500' },
        { icon: 'ph-fill ph-file-js', label: 'JavaScript', color: 'from-yellow-400 to-amber-500' },
        { icon: 'ph-fill ph-angular-logo', label: 'Angular', color: 'from-red-600 to-pink-500' },
        { icon: 'ph-fill ph-node-logo', label: 'Node.js', color: 'from-green-500 to-emerald-600' },
        { icon: 'ph-fill ph-database', label: 'SQL/NoSQL', color: 'from-blue-500 to-cyan-500' },
        { icon: 'ph-fill ph-fire', label: 'Firebase', color: 'from-orange-500 to-red-500' },
        { icon: 'ph-fill ph-cloud', label: 'Google Cloud', color: 'from-sky-500 to-indigo-500' },
        { icon: 'ph-fill ph-file-code', label: 'PHP', color: 'from-indigo-400 to-purple-600' },
        { icon: 'ph ph-cpu', label: 'APIs', color: 'from-teal-400 to-emerald-500' },
        { icon: 'ph ph-terminal', label: 'Full Stack', color: 'from-fuchsia-500 to-pink-500' }
    ];

    const numIcons = iconsData.length;
    let rx = 0.003; // Rotation speed around X axis
    let ry = 0.003; // Rotation speed around Y axis
    let targetX = 0.003;
    let targetY = 0.003;

    // Create HTML elements for each icon
    const elements = iconsData.map((data, index) => {
        const div = document.createElement('div');
        div.className = 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 glass px-2 py-1 md:px-3 md:py-2 rounded-lg md:rounded-xl flex items-center gap-1 md:gap-2 border border-slate-700/50 hover:border-primary/50 transition-colors duration-300 shadow-lg cursor-pointer select-none';
        
        div.innerHTML = `
            <div class="bg-gradient-to-r ${data.color} bg-clip-text text-transparent text-sm md:text-xl font-bold flex items-center justify-center">
                <i class="${data.icon}"></i>
            </div>
            <span class="text-[10px] md:text-xs font-semibold text-slate-300 whitespace-nowrap">${data.label}</span>
        `;
        
        sphereContainer.appendChild(div);

        // Spherical distribution (Golden Spiral / Fibonacci)
        const theta = Math.acos(1 - 2 * (index + 0.5) / numIcons);
        const phi = Math.sqrt(numIcons * Math.PI) * theta;

        return {
            element: div,
            nx: Math.sin(theta) * Math.cos(phi),
            ny: Math.sin(theta) * Math.sin(phi),
            nz: Math.cos(theta)
        };
    });

    let active = true;
    
    // Stop animation when page section is out of view for performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            active = entry.isIntersecting;
        });
    }, { threshold: 0.1 });
    observer.observe(sphereParent);

    // Track mouse movement relative to the sphere container
    document.addEventListener('mousemove', (e) => {
        if (!active) return;
        
        const rect = sphereParent.getBoundingClientRect();
        const mouseX = e.clientX - (rect.left + rect.width / 2);
        const mouseY = e.clientY - (rect.top + rect.height / 2);
        
        const distance = Math.hypot(mouseX, mouseY);
        if (distance < 600) {
            // Speed up and change direction based on mouse position
            targetX = (mouseY / 300) * 0.015;
            targetY = -(mouseX / 300) * 0.015;
        } else {
            // Default idle drift
            targetX = 0.002;
            targetY = 0.002;
        }
    });

    // Handle touch events for mobile
    document.addEventListener('touchmove', (e) => {
        if (!active || e.touches.length === 0) return;
        const touch = e.touches[0];
        const rect = sphereParent.getBoundingClientRect();
        const mouseX = touch.clientX - (rect.left + rect.width / 2);
        const mouseY = touch.clientY - (rect.top + rect.height / 2);
        
        const distance = Math.hypot(mouseX, mouseY);
        if (distance < 400) {
            targetX = (mouseY / 200) * 0.02;
            targetY = -(mouseX / 200) * 0.02;
        }
    }, { passive: true });

    function updateSphere() {
        if (!active) {
            requestAnimationFrame(updateSphere);
            return;
        }

        // Smoothly interpolate rotation speed
        rx += (targetX - rx) * 0.08;
        ry += (targetY - ry) * 0.08;

        const cosX = Math.cos(rx);
        const sinX = Math.sin(rx);
        const cosY = Math.cos(ry);
        const sinY = Math.sin(ry);

        // Dynamically compute the orbit radius based on the current window size
        const isMobile = window.innerWidth < 768;
        const currentRadius = isMobile ? 75 : 180;

        elements.forEach(item => {
            // Rotate the normalized unit vector around X
            const y1 = item.ny * cosX - item.nz * sinX;
            const z1 = item.nz * cosX + item.ny * sinX;

            // Rotate the normalized unit vector around Y
            const x2 = item.nx * cosY - z1 * sinY;
            const z2 = z1 * cosY + item.nx * sinY;

            item.nx = x2;
            item.ny = y1;
            item.nz = z2;

            // Compute screen position based on normalized coordinates and active radius
            const posX = item.nx * currentRadius;
            const posY = item.ny * currentRadius;
            const posZ = item.nz * currentRadius;

            // Apply 3D perspective projection styling
            const depth = 350;
            const scale = (depth + posZ) / depth;
            const opacity = 0.15 + 0.85 * ((posZ + currentRadius) / (2 * currentRadius));
            const zIndex = Math.round((posZ + currentRadius) * 10);

            item.element.style.transform = `translate3d(${posX}px, ${posY}px, 0px) translate(-50%, -50%) scale(${scale})`;
            item.element.style.opacity = opacity;
            item.element.style.zIndex = zIndex;
        });

        requestAnimationFrame(updateSphere);
    }

    updateSphere();
}

// 3D Coverflow Projects Carousel Logic
let activeProjectIndex = 0;
const projectGlows = [
    'rgba(217, 70, 239, 0.4)', // Fuchsia for Ink Lovers
    'rgba(249, 115, 22, 0.4)',  // Orange for Turismo
    'rgba(99, 102, 241, 0.4)',  // Indigo for POS
    'rgba(239, 68, 68, 0.4)',   // Red for ERP
    'rgba(59, 130, 246, 0.4)'   // Blue for Cloud
];

function handleCardClick(index, projectId) {
    if (index === activeProjectIndex) {
        openModal(projectId);
    } else {
        activeProjectIndex = index;
        updateCarousel();
    }
}

function updateCarousel() {
    const cards = document.querySelectorAll('.carousel-card');
    const dots = document.querySelectorAll('#carousel-dots span');
    if (!cards.length) return;

    cards.forEach((card, i) => {
        const offset = i - activeProjectIndex;
        const absOffset = Math.abs(offset);
        
        if (absOffset > 2) {
            // Hide cards that are far away
            card.style.opacity = '0';
            card.style.visibility = 'hidden';
            card.style.transform = `translateX(${offset * 150}px) scale(0.6) rotateY(${offset * -35}deg) translateZ(-300px)`;
            card.style.zIndex = '0';
            return;
        }

        card.style.visibility = 'visible';
        card.style.opacity = `${1 - absOffset * 0.35}`;
        card.style.zIndex = `${10 - absOffset}`;

        // Compute Coverflow transform variables
        const scale = 1 - absOffset * 0.12;
        const rotateY = offset * -25;
        const translateZ = absOffset * -100;
        
        // Horizontal offset: spacing out the side cards dynamically
        let translateX = offset * 180;
        if (window.innerWidth < 768) {
            translateX = offset * 110;
        }

        card.style.transform = `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
        
        // Highlight active card with a matching theme glow
        if (offset === 0) {
            card.classList.add('active-card');
            card.style.borderColor = projectGlows[i].replace('0.4', '0.6');
            card.style.boxShadow = `0 25px 60px -15px ${projectGlows[i]}, 0 0 30px 2px ${projectGlows[i].replace('0.4', '0.15')}`;
            card.style.pointerEvents = 'auto';
        } else {
            card.classList.remove('active-card');
            card.style.borderColor = 'rgba(255, 255, 255, 0.05)';
            card.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.5)';
            // Non-centered cards can still be clicked to center them, but prevent hover elements trigger inside them
            card.style.pointerEvents = 'auto';
        }
    });

    // Update Dots
    if (dots.length) {
        dots.forEach((dot, i) => {
            if (i === activeProjectIndex) {
                const activeColorClass = activeProjectIndex === 0 ? 'bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.5)]' :
                                       activeProjectIndex === 1 ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' :
                                       activeProjectIndex === 2 ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' :
                                       activeProjectIndex === 3 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' :
                                       'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]';
                dot.className = `w-6 h-2.5 rounded-full ${activeColorClass} transition-all duration-300 cursor-pointer`;
            } else {
                dot.className = 'w-2.5 h-2.5 rounded-full bg-slate-700 transition-all duration-300 cursor-pointer hover:bg-slate-600';
            }
        });
    }
}

// Button Navigation
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        const cards = document.querySelectorAll('.carousel-card');
        activeProjectIndex = (activeProjectIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    });
    nextBtn.addEventListener('click', () => {
        const cards = document.querySelectorAll('.carousel-card');
        activeProjectIndex = (activeProjectIndex + 1) % cards.length;
        updateCarousel();
    });
}

// Dot Navigation Click Handler
const dotsContainer = document.getElementById('carousel-dots');
if (dotsContainer) {
    const dots = dotsContainer.querySelectorAll('span');
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            activeProjectIndex = i;
            updateCarousel();
        });
    });
}

// Touch/Swipe Support
const carouselContainer = document.getElementById('projects-carousel');
if (carouselContainer) {
    let startX = 0;
    let endX = 0;
    
    carouselContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    carouselContainer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        const cards = document.querySelectorAll('.carousel-card');
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left -> next card
                activeProjectIndex = (activeProjectIndex + 1) % cards.length;
            } else {
                // Swipe right -> prev card
                activeProjectIndex = (activeProjectIndex - 1 + cards.length) % cards.length;
            }
            updateCarousel();
        }
    }, { passive: true });
}

// Initialize Carousel on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    updateCarousel();
});

// Also trigger update on resize
window.addEventListener('resize', () => {
    updateCarousel();
});
