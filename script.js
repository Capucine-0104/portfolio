/**
 * Portfolio Capucine Piquart
 * Scripts pour animations et interactions améliorées
 */

// ============================================
// ANNÉE DYNAMIQUE - Footer
// ============================================
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// ============================================
// MENU HAMBURGER & SCROLL FLUIDE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navLinks.length) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Fermer le menu sur mobile
                if (window.innerWidth < 992 && navbarCollapse && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }

                // Scroll fluide
                const targetId = this.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        const navbarHeight = document.querySelector('.navbar').offsetHeight;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                        history.pushState(null, null, targetId);
                    }
                }
            });
        });
    }

    // ============================================
    // ANIMATION D'APPARITION AU SCROLL
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animer les cartes
    const animateElements = document.querySelectorAll('.project-card-compact, .skill-card, .exp-card, .veille-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ============================================
    // EFFET DE SURVOL SUR LES BOUTONS DES MODALS
    // ============================================
    const modalButtons = document.querySelectorAll('[data-bs-toggle="modal"]');
    modalButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modalId = this.getAttribute('data-bs-target');
            if (modalId) {
                console.log(`Ouverture de la modal: ${modalId}`);
            }
        });
    });
});

// ==================================
// GESTION DU SCROLL POUR LA NAVBAR
// ==================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (navbar) {
        if (currentScroll > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }
});
// ============================================
// LIGHTBOX — AGRANDISSEMENT PHOTOS
// ============================================
let lightboxImages = [];
let lightboxIndex = 0;

function openLightbox(el) {
    const img = el.querySelector('img');
    if (!img) return;

    // Collect all images from the same modal-screenshots container
    const container = el.closest('.modal-screenshots') || el.closest('.modal-body');
    const allPlaceholders = container ? container.querySelectorAll('.screenshot-placeholder img') : [img];

    lightboxImages = Array.from(allPlaceholders);
    lightboxIndex = lightboxImages.indexOf(img);

    showLightboxImage(lightboxIndex);
    document.getElementById('lightbox').classList.add('active');
    document.addEventListener('keydown', lightboxKeyHandler);
}

function showLightboxImage(index) {
    const img = lightboxImages[index];
    if (!img) return;
    document.getElementById('lightbox-img').src = img.src;
    document.getElementById('lightbox-img').alt = img.alt;
    const caption = img.closest('.screenshot-placeholder')?.querySelector('p')?.textContent || img.alt;
    document.getElementById('lightbox-caption').textContent = caption;
    // Show/hide nav arrows
    document.querySelector('.lightbox-prev').style.visibility = lightboxImages.length > 1 ? 'visible' : 'hidden';
    document.querySelector('.lightbox-next').style.visibility = lightboxImages.length > 1 ? 'visible' : 'hidden';
}

function lightboxNav(dir) {
    lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
    showLightboxImage(lightboxIndex);
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.removeEventListener('keydown', lightboxKeyHandler);
}

function lightboxKeyHandler(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') lightboxNav(1);
    if (e.key === 'ArrowLeft') lightboxNav(-1);
}