(function () {
    'use strict';

    // Config: how many projects to show in the curated showcase
    const SHOW_COUNT = 5;

    // Deterministic default featured projects (titles must match entries in projects-list.js)
    const DEFAULT_FEATURED_TITLES = [
        'Home Lab',
        'Image Captioning',
        'Portfolio',
        'Berni',
        'Image Distortion Correction'
    ];

    // Track whether we've shown the default selection already
    let defaultShown = false;

    // Return an ordered array of project objects matching DEFAULT_FEATURED_TITLES.
    // If some titles are missing, fill the remaining slots using the existing pickCurated logic.
    function getDefaultFeatured(projects, n) {
        const selected = [];
        for (const title of DEFAULT_FEATURED_TITLES) {
            if (selected.length >= n) break;
            const p = projects.find(x => x && x.title === title);
            if (p) selected.push(p);
        }

        if (selected.length >= n) return selected.slice(0, n);

        // Fill remaining slots with curated picks from the remaining pool
        const remainingPool = projects.filter(p => p && !selected.includes(p));
        const fill = pickCurated(remainingPool, n - selected.length);
        return selected.concat(fill).slice(0, n);
    }

    // Fallback small dataset if PROJECTS isn't present
    const fallback = [
        {
            title: 'Portfolio',
            description: "Personal website presenting Antoine's profile with modern web design and AI-powered automation.",
            image: 'url(\'imgs/projects/portfolio.png\')',
            link: '#'
        }
    ];

    function getProjectsArray() {
        // If the site bundles modules differently, PROJECTS may be a default export; try both.
        if (typeof PROJECTS !== 'undefined' && Array.isArray(PROJECTS)) return PROJECTS;
        if (window && window.PROJECTS && Array.isArray(window.PROJECTS)) return window.PROJECTS;
        return fallback;
    }

    function pickCurated(projects, n) {
        // Curated pick: pick projects that have images and a link first, then fill the rest randomly.
        const withImage = projects.filter(p => p && p.image);
        const preferred = withImage.filter(p => p.link);
        const pool = preferred.concat(withImage.filter(p => !p.link)).concat(projects.filter(p => !p.image));

        // Shuffle pool deterministically per call
        const shuffled = pool.slice().sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.min(n, shuffled.length));
    }

    function buildCard(project) {
        const card = document.createElement('article');
        card.className = 'project-card';

        // Background image container for a refined, minimal overlay
        const bg = document.createElement('div');
        bg.className = 'project-bg';
        if (project.image) {
            bg.style.backgroundImage = `url('imgs/${project.image}')`;
        }

        const meta = document.createElement('div');
        meta.className = 'project-meta';

        const title = document.createElement('h3');
        title.className = 'project-title';
        title.textContent = project.title || 'Untitled';

        const desc = document.createElement('p');
        desc.className = 'project-desc';
        desc.textContent = project.description || '';

        meta.appendChild(title);
        meta.appendChild(desc);

        // Link overlay
        if (project.link) {
            const a = document.createElement('a');
            a.className = 'project-link';
            a.href = project.link;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.setAttribute('aria-label', `Open ${project.title}`);

            const linkLabel = document.createElement('span');
            linkLabel.className = 'project-link-label';
            linkLabel.textContent = 'Open';
            a.appendChild(linkLabel);
            meta.appendChild(a);
        }

        card.appendChild(bg);
        card.appendChild(meta);
        return card;
    }

    function renderShowcase() {
        const container = document.getElementById('projects-showcase');
        if (!container) return;
        container.innerHTML = '';

        const projects = getProjectsArray();
        // On first render show a deterministic featured list; afterwards use curated/random picks
        const chosen = !defaultShown ? (function(){ defaultShown = true; return getDefaultFeatured(projects, SHOW_COUNT); })() : pickCurated(projects, SHOW_COUNT);

        // Create a visually varied layout: first one large, others smaller
        chosen.forEach((p, i) => {
            const card = buildCard(p);
            if (i === 0) card.classList.add('project-card--hero');
            else if (i === 1 || i === 3) card.classList.add('project-card--tall');
            else card.classList.add('project-card--small');
            // Start hidden by default; observer or shuffle will remove this to animate in
            card.classList.add('project-enter');
            container.appendChild(card);
        });

        // Update 'more' link to point to GitHub if possible
        const more = document.getElementById('projects-more');
        if (more) {
            more.href = 'https://github.com/Arrrlinks?tab=repositories';
            more.target = '_blank';
            more.rel = 'noopener noreferrer';
        }
    }

    // New: animated shuffle between current cards and newly chosen ones (class-based fallback-only implementation)
    (function () {
        const exitStagger = 80; // ms between each card exit
        const exitDuration = 480; // conservative value matching CSS transitions
        const enterStagger = 80; // ms between each enter
        const enterInitialDelay = 10;
        let isAnimating = false;

        function finishEnterPhase(container, nodes, done) {
            // Remove inline style artifacts to restore normal flow
            nodes.forEach(n => {
                n.style.opacity = '';
                n.style.transform = '';
            });
            // call done after expected time
            setTimeout(done, 20);
        }

        function animateShuffle() {
            if (isAnimating) return;
            const container = document.getElementById('projects-showcase');
            if (!container) return;

            const currentCards = Array.from(container.children);
            const projects = getProjectsArray();
            const newChosen = pickCurated(projects, SHOW_COUNT);

            isAnimating = true;

            function done() { isAnimating = false; }

            // If there are no current cards, just append new ones with enter animation
            if (currentCards.length === 0) {
                container.innerHTML = '';
                const newNodes = newChosen.map((p, i) => {
                    const card = buildCard(p);
                    if (i === 0) card.classList.add('project-card--hero');
                    else if (i === 1 || i === 3) card.classList.add('project-card--tall');
                    else card.classList.add('project-card--small');
                    card.classList.add('project-enter');
                    return card;
                });
                newNodes.forEach(n => container.appendChild(n));

                // Force layout then remove enter class in stagger
                container.getBoundingClientRect();
                newNodes.forEach((n, i) => {
                    const delay = enterInitialDelay + i * enterStagger;
                    setTimeout(() => n.classList.remove('project-enter'), delay);
                });

                setTimeout(() => { finishEnterPhase(container, newNodes, done); }, enterInitialDelay + newNodes.length * enterStagger + 520);
                return;
            }

            // Exit phase: stagger adding project-exit using rAF for better timing
            let finished = 0;
            const expected = currentCards.length;
            let finishedCalled = false;

            function finishExitPhase() {
                if (finishedCalled) return;
                finishedCalled = true;

                // remove old nodes and insert new ones as entering
                container.innerHTML = '';
                const newNodes = newChosen.map((p, i) => {
                    const card = buildCard(p);
                    if (i === 0) card.classList.add('project-card--hero');
                    else if (i === 1 || i === 3) card.classList.add('project-card--tall');
                    else card.classList.add('project-card--small');
                    card.classList.add('project-enter');
                    return card;
                });
                newNodes.forEach(n => container.appendChild(n));

                // Force layout, then remove enter class staggered
                container.getBoundingClientRect();
                newNodes.forEach((n, i) => setTimeout(() => n.classList.remove('project-enter'), enterInitialDelay + i * enterStagger));

                setTimeout(() => { finishEnterPhase(container, newNodes, done); }, enterInitialDelay + newNodes.length * enterStagger + 520);
            }

            // Add transitionend listeners and trigger exit stagger
            currentCards.forEach((card, i) => {
                const onEnd = (ev) => {
                    if (ev.propertyName === 'opacity' || ev.propertyName === 'transform') {
                        card.removeEventListener('transitionend', onEnd);
                        finished += 1;
                        if (finished >= expected) finishExitPhase();
                    }
                };
                card.addEventListener('transitionend', onEnd);

                // Use setTimeout + rAF to ensure the class addition occurs in the next frame
                setTimeout(() => {
                    requestAnimationFrame(() => card.classList.add('project-exit'));
                }, i * exitStagger);
            });

            // Fallback guard: ensure progress even if transitionend doesn't fire
            setTimeout(() => finishExitPhase(), currentCards.length * exitStagger + exitDuration + 120);
        }

        // Wire shuffle button
        const refresh = document.getElementById('projects-refresh');
        if (refresh) {
            // remove any existing listeners to avoid duplicates
            refresh.replaceWith(refresh.cloneNode(true));
        }
        // re-query fresh button and wire
        const fresh = document.getElementById('projects-refresh');
        if (fresh) {
            fresh.addEventListener('click', (e) => {
                e.preventDefault();
                animateShuffle();
            });
        }

        // Export for debugging if needed
        window._animateProjectShuffle = animateShuffle;
    })();

    function init() {
        // Allow external scripts to set window.PROJECTS from modules if needed
        if (typeof module !== 'undefined' && module.exports) {
            // CommonJS environment — try to import or require; no-op in browser
        }

        // Removed duplicate listener to renderShowcase here to avoid immediate DOM replacement
        // when the shuffle button is intended to animate the transition.

        // Initial render after DOM load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', renderShowcase);
        } else {
            renderShowcase();
        }
    }

    init();

})();

// Artistic entrance animation for the Projects section (scroll-triggered)
document.addEventListener('DOMContentLoaded', () => {
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;

    const title = projectsSection.querySelector('#projects-title');
    const controls = projectsSection.querySelector('.projects-controls');
    const container = document.getElementById('projects-showcase');

    // Prepare initial hidden states (reuse .hidden from about.css)
    [title, controls].forEach(el => { if (el) el.classList.add('hidden'); });

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            // Artistic header reveal
            if (title) title.classList.add('fade-in');
            if (controls) setTimeout(() => controls.classList.add('fade-in-up'), 220);

            // Staggered cards entrance (use project-enter class which we already animate)
            if (container) {
                const cards = Array.from(container.children);
                // put cards in entrance start state
                cards.forEach(c => c.classList.add('project-enter'));
                // force layout
                container.getBoundingClientRect();
                // remove project-enter staggered
                cards.forEach((c, i) => setTimeout(() => c.classList.remove('project-enter'), 260 + i * 90));
            }

            obs.unobserve(projectsSection);
        });
    }, { threshold: 0.22 });

    observer.observe(projectsSection);

    // Developer helper: manually play the projects entrance animation (for dev/testing)
    window._playProjectsEntrance = () => {
        if (!projectsSection) return;
        if (title) title.classList.add('fade-in');
        if (controls) setTimeout(() => controls.classList.add('fade-in-up'), 220);

        if (container) {
            const cards = Array.from(container.children);
            cards.forEach(c => c.classList.add('project-enter'));
            container.getBoundingClientRect();
            cards.forEach((c, i) => setTimeout(() => c.classList.remove('project-enter'), 260 + i * 90));
        }
    };

});
