(function () {
    'use strict';

    /* ── GSAP ───────────────────────────────────────────── */
    gsap.registerPlugin(ScrollTrigger);

    /* ── Lenis + GSAP integration ───────────────────────── */
    const lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    /* ── Entrance timeline ──────────────────────────────── */
    const E = 'expo.out';
    const tl = gsap.timeline({ defaults: { ease: E } });

    // Images reveal (curtain rising + descale)
    tl.to('.himg', {
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.7,
        stagger: 0.28,
    }, 0.15);

    tl.to('.himg img', {
        scale: 1,
        duration: 2.2,
        stagger: 0.28,
    }, 0.15);

    // Eyebrow
    tl.to('.htitle__eyebrow', { opacity: 1, y: 0, duration: 1.0 }, 0.7);

    // "José" — bloco inteiro
    tl.to('.htitle__first', { opacity: 1, y: 0, duration: 1.0 }, 0.9);

    // "Cunto" — bloco inteiro, ligeiramente atrasado
    tl.to('.htitle__last', { opacity: 1, y: 0, duration: 1.2 }, 1.05);

    // Subtitle
    tl.to('.htitle__sub',  { opacity: 1, y: 0, duration: 0.9 }, 1.5);

    // Year
    tl.to('.hyear',        { opacity: 1,        duration: 1.2 }, 1.5);

    // Meta + CTA + scroll
    tl.to('.hmeta',        { opacity: 1, y: 0,  duration: 0.9 }, 1.65);
    tl.to('.hcta',         { opacity: 1,        duration: 0.9 }, 1.75);
    tl.to('.hscroll',      { opacity: 1, y: 0,  duration: 0.9 }, 1.85);

    // Scroll line grows
    tl.to('#js-sline', {
        height: 56,
        duration: 1.4,
        ease: 'power2.inOut',
    }, 2.1);

    /* ── Scroll parallax ────────────────────────────────── */
    const scrubTargets = [
        { sel: '.himg-1',  y: -70, scrub: 1.5 },
        { sel: '.himg-2',  y: -40, scrub: 2.0 },
        { sel: '.himg-3',  y: -90, scrub: 1.2 },
        { sel: '.htitle',  y: -95, scrub: 1.3 },
    ];

    scrubTargets.forEach(({ sel, y, scrub }) => {
        gsap.to(sel, {
            y,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub,
            },
        });
    });

    /* ── Image hover — elegant scale ────────────────────── */
    document.querySelectorAll('.himg').forEach((fig) => {
        const img     = fig.querySelector('img');
        const overlay = fig.querySelector('.himg__overlay');

        fig.addEventListener('mouseenter', () => {
            gsap.to(img,     { scale: 1.055, duration: 0.85, ease: E });
            gsap.to(overlay, { opacity: 0.06, duration: 0.5 });
        });
        fig.addEventListener('mouseleave', () => {
            gsap.to(img,     { scale: 1,    duration: 1.3,  ease: E });
            gsap.to(overlay, { opacity: 0,   duration: 0.5 });
        });
    });

    /* ── Custom cursor ──────────────────────────────────── */
    const isTouch = window.matchMedia('(hover: none)').matches;
    const cursorEl = document.getElementById('js-cursor');
    const ringEl   = document.getElementById('js-ring');

    if (!isTouch && cursorEl && ringEl) {
        let mx = window.innerWidth  / 2;
        let my = window.innerHeight / 2;
        let rx = mx, ry = my;

        // Inicializa a posição para não ficar no canto (0,0)
        gsap.set(cursorEl, { x: mx, y: my });
        gsap.set(ringEl, { x: rx, y: ry });

        let hasMoved = false;

        document.addEventListener('mousemove', (e) => {
            if (!hasMoved) {
                document.body.classList.add('has-moved');
                hasMoved = true;
            }
            mx = e.clientX; my = e.clientY;
            gsap.set(cursorEl, { x: mx, y: my });
        }, { passive: true });

        (function ringLoop() {
            rx += (mx - rx) * 0.11;
            ry += (my - ry) * 0.11;
            gsap.set(ringEl, { x: rx, y: ry });
            requestAnimationFrame(ringLoop);
        }());

        document.querySelectorAll('.himg, figure').forEach((el) => {
            el.addEventListener('mouseenter', () => document.body.classList.add('on-img'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('on-img'));
        });
        document.querySelectorAll('a, button').forEach((el) => {
            el.addEventListener('mouseenter', () => document.body.classList.add('on-link'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('on-link'));
        });
    }

    /* ── Navbar scroll state ────────────────────────────── */
    const nav = document.getElementById('js-nav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    /* ── Mobile burger menu ──────────────────────────────── */
    const burger     = document.getElementById('js-burger');
    const mobileMenu = document.getElementById('js-nav-mobile');

    if (burger && mobileMenu) {
        burger.addEventListener('click', () => {
            const isOpen = burger.classList.toggle('is-open');
            mobileMenu.classList.toggle('is-open', isOpen);
            burger.setAttribute('aria-expanded', String(isOpen));
            mobileMenu.setAttribute('aria-hidden', String(!isOpen));
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        mobileMenu.querySelectorAll('.nav__mobile-link').forEach((link) => {
            link.addEventListener('click', () => {
                burger.classList.remove('is-open');
                mobileMenu.classList.remove('is-open');
                burger.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            });
        });
    }

    /* ── Portfolio — header entrance ────────────────────── */
    if (document.querySelector('.pf-header')) {
        const pfHdrTl = gsap.timeline({
            scrollTrigger: { trigger: '.pf-header', start: 'top 80%' }
        });
        pfHdrTl
            .from('.pf-header__eyebrow', { opacity: 0, y: 12, duration: 1.0, ease: E })
            .from('.pf-header__title',   { opacity: 0, y: 64, duration: 1.5, ease: E }, '-=0.75')
            .from('.pf-header__meta',    { opacity: 0,        duration: 1.0, ease: E }, '-=0.9');
    }

    /* ── Portfolio — stacking reveal + parallax ──────────── */
    document.querySelectorAll('.pf-fig').forEach((fig) => {
        const img = fig.querySelector('img');

        /* Curtain reveal — same motion language as hero images */
        gsap.to(fig, {
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.75,
            ease: E,
            scrollTrigger: { trigger: fig, start: 'top 88%' }
        });

        /* Parallax — figure lifts as it exits viewport */
        gsap.to(fig, {
            y: -48,
            ease: 'none',
            scrollTrigger: {
                trigger: fig,
                start: 'top bottom',
                end:   'bottom top',
                scrub: 2.0,
            }
        });

        /* Hover — subtle enlarge on img inside the clipped container */
        if (!window.matchMedia('(hover: none)').matches) {
            fig.addEventListener('mouseenter', () =>
                gsap.to(img, { scale: 1.06, duration: 1.0, ease: E })
            );
            fig.addEventListener('mouseleave', () =>
                gsap.to(img, { scale: 1,    duration: 1.5, ease: E })
            );
        }
    });

    /* ── Portfolio — label fade-ins ──────────────────────── */
    gsap.utils.toArray('.pf-ch__num, .pf-ch__tag, .pf-full__label').forEach((el) => {
        gsap.from(el, {
            opacity: 0,
            duration: 1.4,
            ease: E,
            scrollTrigger: { trigger: el, start: 'top 90%' }
        });
    });

}());
