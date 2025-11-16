// Projects horizontal scroller: vertical page scroll -> horizontal translate, hover/focus/keyboard support, View Transition navigation
(function () {
    const section = document.querySelector('.projects-section');
    if (!section) return;

    const wrapper = section.querySelector('.projects-wrapper');
    const list = section.querySelector('.projects-list');
    let cards = Array.from(section.querySelectorAll('.project-card'));

    // Small util: throttle
    function throttle(fn, wait) {
        let last = 0;
        return function (...args) {
            const now = Date.now();
            if (now - last >= wait) {
                last = now;
                fn.apply(this, args);
            }
        };
    }

    // Compute list scroll width
    function getListWidth() {
        return list.scrollWidth;
    }

    // Layout the section so vertical scroll corresponds to horizontal range
    function layoutSection() {
        if (!cards.length) return;

        // Ensure padding so first/last can center
        const half = Math.round(wrapper.clientWidth / 2);
        const first = cards[0];
        const last = cards[cards.length - 1];
        const leftPad = Math.max(24, half - Math.round(first.offsetWidth / 2));
        const rightPad = Math.max(24, half - Math.round(last.offsetWidth / 2));
        list.style.paddingLeft = leftPad + 'px';
        list.style.paddingRight = rightPad + 'px';

        // Vertical scroll span needed to move horizontally through content
        const listWidth = getListWidth();
        const horizontalNeeded = Math.max(0, listWidth - wrapper.clientWidth);
        const extra = window.innerHeight * 0.6; // breathing room
        const totalScrollHeight = horizontalNeeded + wrapper.clientHeight + extra;
        section.style.minHeight = Math.max(window.innerHeight, totalScrollHeight) + 'px';
    }

    // Compute translateX for a given progress [0..1]
    function computeTranslateForProgress(progress) {
        const targetCenter = wrapper.clientWidth / 2;
        const centers = cards.map(c => c.offsetLeft + c.offsetWidth / 2);
        const first = centers[0] || 0;
        const last = centers[centers.length - 1] || first;
        const minTx = targetCenter - first; // when first centered
        const maxTx = targetCenter - last;  // when last centered
        return minTx + (maxTx - minTx) * progress;
    }

    // Get progress based on window scroll when wrapper is sticky
    function getScrollProgress() {
        const sectionRect = section.getBoundingClientRect();
        const sectionPageTop = window.scrollY + sectionRect.top;
        const stickyTop = parseFloat(getComputedStyle(wrapper).top) || 0;
        const start = sectionPageTop - stickyTop;
        const end = sectionPageTop + sectionRect.height - stickyTop - wrapper.clientHeight;
        if (end <= start) return 0;
        const scrollY = window.scrollY;
        return Math.min(1, Math.max(0, (scrollY - start) / (end - start)));
    }

    // Toggle header fixed class while the projects scroller is active
    const header = section.querySelector('.projects-header');
    function updateHeaderSticky() {
        if (!header) return;
        // Use wrapper's viewport position to decide when the header should be fixed
        const wrapperRect = wrapper.getBoundingClientRect();
        const headerTop = parseFloat(getComputedStyle(header).top) || 72;
        const headerHeight = header.offsetHeight || 48;
        // If the wrapper has reached the headerTop position (sticky) and still has space, fix the header
        if (wrapperRect.top <= headerTop && wrapperRect.bottom >= headerTop + headerHeight) {
            header.classList.add('projects-header--fixed');
            // prevent layout jump by reserving header space
            section.style.paddingTop = headerHeight + 'px';
        } else {
            header.classList.remove('projects-header--fixed');
            section.style.paddingTop = '';
        }
    }

    // Update horizontal transform based on scroll
    function updateFromScroll() {
        if (!cards.length) return;
        const p = getScrollProgress();
        const tx = computeTranslateForProgress(p);
        list.style.transform = `translateX(${tx}px)`;
        updateActiveCard();
        updateHeaderSticky();
    }

    // Center a given card (clamped)
    function scrollCardIntoView(card) {
        if (!card) return;
        const centerRel = card.offsetLeft + card.offsetWidth / 2;
        const targetCenter = wrapper.clientWidth / 2;
        const desired = targetCenter - centerRel;
        const centers = cards.map(c => c.offsetLeft + c.offsetWidth / 2);
        const minTx = targetCenter - (centers[0] || 0);
        const maxTx = targetCenter - (centers[centers.length - 1] || 0);
        const tx = Math.max(Math.min(desired, minTx), maxTx);
        list.style.transform = `translateX(${tx}px)`;
        updateActiveCard();
    }

    // Determine and mark active (closest to wrapper center)
    function updateActiveCard() {
        if (!cards.length) return;
        const wRect = wrapper.getBoundingClientRect();
        const center = wRect.left + wRect.width / 2;
        let closest = null;
        let minDist = Infinity;
        cards.forEach(c => {
            const r = c.getBoundingClientRect();
            const cCenter = r.left + r.width / 2;
            const d = Math.abs(cCenter - center);
            if (d < minDist) {
                minDist = d;
                closest = c;
            }
        });
        cards.forEach(c => c.classList.toggle('active', c === closest));
    }

    // Navigation with View Transition API (respects modifier keys to allow new tab)
    function navigateHref(href, event) {
        // if modifier key or middle click, let the browser handle it (open new tab)
        if (event && (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button === 1)) {
            window.open(href, '_blank');
            return;
        }
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                window.location.href = href;
            });
        } else {
            document.documentElement.classList.add('view-transition-fallback');
            setTimeout(() => window.location.href = href, 220);
        }
    }

    // Event handlers
    let hoveringCard = null;
    // Hover handlers: do not programmatically focus or center cards on hover.
    // We only toggle a CSS class so designers can style :hover visually if desired.
    function onCardMouseEnter(e) {
        const card = e.currentTarget;
        card.classList.add('hovered');
    }

    function onCardMouseLeave(e) {
        const card = e.currentTarget;
        card.classList.remove('hovered');
        // Do not change active card or scroll; keep keyboard/focus behavior intact.
    }

    function onLinkClick(e) {
        // allow ctrl/meta/new tab: check modifier
        const href = e.currentTarget.getAttribute('href');
        if (!href) return;
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button === 1) return; // allow browser default
        e.preventDefault();
        e.stopPropagation();
        navigateHref(href, e);
    }

    function onLinkKeyDown(e) {
        // Arrow navigation between links
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
            const link = e.currentTarget;
            const card = link.closest('.project-card');
            const i = cards.indexOf(card);
            if (i === -1) return;
            const nextIndex = e.key === 'ArrowRight' ? Math.min(cards.length - 1, i + 1) : Math.max(0, i - 1);
            const nextCard = cards[nextIndex];
            const nextLink = nextCard && nextCard.querySelector('a.project-link');
            if (nextLink) {
                nextLink.focus();
                scrollCardIntoView(nextCard);
            }
        }
    }

    // focus/blur handlers for anchors
    function onLinkFocus(e) {
        const card = e.currentTarget.closest('.project-card');
        if (card) {
            hoveringCard = card;
            scrollCardIntoView(card);
            cards.forEach(c => c.classList.toggle('active', c === card));
        }
    }

    function onLinkBlur() {
        hoveringCard = null;
        updateFromScroll();
    }

    // Wheel handler: only intercept horizontal-intent or shift+wheel
    let pointerOver = false;
    wrapper.addEventListener('pointerenter', () => (pointerOver = true));
    wrapper.addEventListener('pointerleave', () => (pointerOver = false));
    wrapper.addEventListener('wheel', (e) => {
        if (!pointerOver || !cards.length) return;
        const dx = e.deltaX;
        const dy = e.deltaY;
        const horizontalIntent = Math.abs(dx) > Math.abs(dy) || e.shiftKey;
        if (!horizontalIntent) return; // allow normal vertical scrolling
        e.preventDefault();
        // read current translateX
        const st = getComputedStyle(list).transform;
        let cur = 0;
        if (st && st !== 'none') {
            const m = st.match(/matrix\(([-0-9., ]+)\)/);
            if (m) cur = parseFloat(m[1].split(',')[4]) || 0;
            else {
                const m2 = st.match(/matrix3d\(([-0-9., ]+)\)/);
                if (m2) cur = parseFloat(m2[1].split(',')[12]) || 0;
            }
        }
        const move = (dx || dy) * -0.8; // scale and invert
        const newTx = cur + move;
        const targetCenter = wrapper.clientWidth / 2;
        const centers = cards.map(c => c.offsetLeft + c.offsetWidth / 2);
        const minTx = targetCenter - (centers[0] || 0);
        const maxTx = targetCenter - (centers[centers.length - 1] || 0);
        const clamped = Math.max(Math.min(newTx, minTx), maxTx);
        list.style.transform = `translateX(${clamped}px)`;
        if (!hoveringCard) updateActiveCard();
    }, {passive: false});

    // Attach handlers to cards/links
    function attachHandlers() {
        cards = Array.from(section.querySelectorAll('.project-card'));
        cards.forEach(card => {
            card.removeEventListener('mouseenter', onCardMouseEnter);
            card.removeEventListener('mouseleave', onCardMouseLeave);
            card.addEventListener('mouseenter', onCardMouseEnter);
            card.addEventListener('mouseleave', onCardMouseLeave);
            const link = card.querySelector('a.project-link');
            if (link) {
                link.removeEventListener('click', onLinkClick);
                link.removeEventListener('keydown', onLinkKeyDown);
                link.removeEventListener('focus', onLinkFocus);
                link.removeEventListener('blur', onLinkBlur);
                link.addEventListener('click', onLinkClick);
                link.addEventListener('keydown', onLinkKeyDown);
                link.addEventListener('focus', onLinkFocus);
                link.addEventListener('blur', onLinkBlur);
            }
        });
    }

    // Recompute layout and update
    const recalc = throttle(() => {
        layoutSection();
        updateFromScroll();
    }, 120);

    // Ensure images loaded before layout
    function waitImagesThenLayout() {
        const imgs = Array.from(list.querySelectorAll('img'));
        if (!imgs.length) {
            recalc();
            return;
        }
        let loaded = 0;
        imgs.forEach(img => {
            if (img.complete) loaded++; else img.addEventListener('load', () => {
                loaded++;
                if (loaded === imgs.length) recalc();
            }, {once: true});
        });
        if (loaded === imgs.length) recalc();
    }

    // Resize/scroll listeners
    window.addEventListener('resize', recalc);
    window.addEventListener('orientationchange', recalc);
    window.addEventListener('scroll', throttle(() => {
        if (!hoveringCard) updateFromScroll();
    }, 16));

    // Initial setup
    attachHandlers();
    waitImagesThenLayout();

    // Expose a small debug helper (optional) for console testing
    window.__projectsScroller = {
        recalc: () => {
            layoutSection();
            updateFromScroll();
        },
        centerIndex: i => {
            const c = cards[i];
            if (c) scrollCardIntoView(c);
        }
    };
})();
