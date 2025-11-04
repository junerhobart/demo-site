const body = document.body;
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.primary-nav ul');
const animatedItems = document.querySelectorAll('[data-animate]');
const yearTarget = document.querySelector('#current-year');

if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
}

if (navToggle && navList) {
    const toggleNav = () => {
        const isOpen = navList.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        body.classList.toggle('nav-active', isOpen);
    };

    navToggle.addEventListener('click', toggleNav);

    navList.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('is-open')) {
                toggleNav();
            }
        });
    });
}

const reveal = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
};

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(reveal, {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.15,
    });

    animatedItems.forEach((item) => observer.observe(item));
} else {
    animatedItems.forEach((item) => item.classList.add('is-visible'));
}


