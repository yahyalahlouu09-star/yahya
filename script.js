const body = document.body;

const setActiveNav = () => {
    const links = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    links.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === currentPage);
    });
};

const revealOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
};

const initHeroBlob = () => {
    const blob = document.querySelector('.hero-blob');
    if (!blob) return;

    document.addEventListener('mousemove', (event) => {
        const x = (event.clientX / window.innerWidth - 0.5) * 16;
        const y = (event.clientY / window.innerHeight - 0.5) * 16;
        blob.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
};

const initTypewriter = () => {
    const tagline = document.querySelector('.hero-tagline');
    if (!tagline) return;

    const text = tagline.dataset.text || tagline.textContent;
    tagline.textContent = '';

    let index = 0;
    const interval = setInterval(() => {
        tagline.textContent += text[index] || '';
        index += 1;
        if (index >= text.length) {
            clearInterval(interval);
        }
    }, 45);
};

const createToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('visible'));

    window.setTimeout(() => toast.classList.remove('visible'), 2800);
    window.setTimeout(() => toast.remove(), 3200);
};

const initContactForm = () => {
    const form = document.querySelector('#contact-form');
    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const name = formData.get('name')?.toString().trim();
        const email = formData.get('email')?.toString().trim();
        const message = formData.get('message')?.toString().trim();

        if (!name || !email || !message) {
            createToast('Merci de remplir tous les champs.');
            return;
        }

        createToast('Votre message a bien été envoyé !');
        form.reset();
    });
};

const initPage = () => {
    setActiveNav();
    revealOnScroll();
    initHeroBlob();
    initTypewriter();
    initContactForm();
    body.classList.add('loaded');
};

window.addEventListener('DOMContentLoaded', initPage);
window.addEventListener('beforeunload', () => body.classList.remove('loaded'));