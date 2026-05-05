/**
 * Portfolio Capucine P
 * Scripts pour animations et interactions
 */

// ============================================
// ANNÉE DYNAMIQUE - Footer
// ============================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================
// MENU HAMBURGER - Fermeture automatique
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments du menu
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {

            // Fermer le menu après clic sur un lien (mobile)
            if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }

            // ============================================
            // SCROLL FLUIDE avec offset pour navbar fixe
            // ============================================
            const targetId = this.getAttribute('href');

            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault();

                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Mettre à jour l'URL sans recharger
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
});