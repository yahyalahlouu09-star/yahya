const body = document.body;

const setActiveNav = () => {
    const links = document.querySelectorAll('.navbar a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    links.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === currentPage);
    });
};

const initMobileMenu = () => {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-links');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('active');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', (event) => {
        const target = event.target;
        if (!menu.contains(target) && !toggle.contains(target)) {
            menu.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        }
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

        const subject = 'Nouveau message depuis votre portfolio';
        const body = `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        const mailto = `mailto:yahyalahlouu09@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        createToast('Ouverture du client mail...');
        window.location.href = mailto;
    });
};

const getQueryParam = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
};

const displaySuccessMessage = () => {
    const success = getQueryParam('success');
    if (success === 'true') {
        const successElement = document.querySelector('#form-success');
        if (successElement) {
            successElement.hidden = false;
        }
        createToast('Message envoyé ! Merci, je vous contacte bientôt.');
    }
};

const initPage = () => {
    setActiveNav();
    initMobileMenu();
    revealOnScroll();
    initHeroBlob();
    initTypewriter();
    initContactForm();
    displaySuccessMessage();
    body.classList.add('loaded');
};

window.addEventListener('DOMContentLoaded', initPage);
window.addEventListener('beforeunload', () => body.classList.remove('loaded'));