document.addEventListener("DOMContentLoaded", async () => {
    const PROJECTS = await import('../projects-list.js').then(module => module.default);
    const projectsContainer = document.getElementById("projects-container");

    // Create a grid card element for each project
    function createProjectCard(project, index) {
        const article = document.createElement('article');
        article.className = 'project-card';
        article.setAttribute('role', 'listitem');
        article.tabIndex = 0;
        article.dataset.index = index;

        const img = document.createElement('img');
        img.className = 'project-thumb';
        img.src = `imgs/${project.image}`;
        img.alt = project.title + ' thumbnail';

        const body = document.createElement('div');
        body.className = 'project-body';

        const title = document.createElement('h3');
        title.className = 'project-title';
        title.textContent = project.title;

        const desc = document.createElement('p');
        desc.className = 'project-desc';
        desc.textContent = project.description;

        body.appendChild(title);
        body.appendChild(desc);

        article.appendChild(img);
        article.appendChild(body);

        // open modal when clicking card or pressing Enter/Space
        article.addEventListener('click', () => openProjectModal(index));
        article.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openProjectModal(index);
            }
        });

        return article;
    }

    // Render all projects into the grid
    PROJECTS.forEach((p, i) => {
        const card = createProjectCard(p, i);
        projectsContainer.appendChild(card);
    });

    // Modal logic (simple, animated)
    const modal = document.getElementById('project-modal');
    const backdrop = document.getElementById('project-modal-backdrop');
    const content = modal.querySelector('.project-modal-content');
    const closeBtn = document.getElementById('project-modal-close');
    const imgEl = document.getElementById('project-modal-img');
    const titleEl = document.getElementById('project-modal-title');
    const descEl = document.getElementById('project-modal-desc');
    const skillsEl = document.getElementById('project-modal-skills');
    const linkEl = document.getElementById('project-modal-link');

    let lastFocused = null;
    let animTimeout = null;

    function openProjectModal(index) {
        const project = PROJECTS[index];
        if (!project) return;
        lastFocused = document.activeElement;

        imgEl.src = `imgs/${project.image}`;
        imgEl.alt = project.title + ' image';
        titleEl.textContent = project.title;
        descEl.textContent = project.longDescription || project.description || '';
        skillsEl.innerHTML = '';
        (project.skills || []).forEach(s => {
            const sp = document.createElement('span'); sp.className = 'skill'; sp.textContent = s; skillsEl.appendChild(sp);
        });
        if (project.link) {
            linkEl.href = project.link;
            linkEl.style.display = 'inline-block';
        } else {
            linkEl.href = '#';
            linkEl.style.display = 'none';
        }

        modal.setAttribute('aria-hidden', 'false');
        modal.classList.add('open');
        // start animations
        backdrop.classList.remove('backdrop-out');
        content.classList.remove('anim-out');
        backdrop.classList.add('backdrop-in');
        content.classList.add('anim-in');
        document.body.style.overflow = 'hidden';

        // focus after animation
        const onAnimEnd = (e) => {
            if (e.target !== content) return;
            content.removeEventListener('animationend', onAnimEnd);
            content.setAttribute('tabindex','-1');
            content.focus();
            window.addEventListener('keydown', onKey);
            clearTimeout(animTimeout);
        };
        content.addEventListener('animationend', onAnimEnd);
        animTimeout = setTimeout(() => { content.setAttribute('tabindex','-1'); content.focus(); window.addEventListener('keydown', onKey); }, 450);
    }

    function closeProjectModal() {
        // start exit animations
        backdrop.classList.remove('backdrop-in');
        content.classList.remove('anim-in');
        backdrop.classList.add('backdrop-out');
        content.classList.add('anim-out');
        window.removeEventListener('keydown', onKey);

        const onAnimOutEnd = (e) => {
            if (e.target !== content) return;
            content.removeEventListener('animationend', onAnimOutEnd);
            finalizeClose();
        };
        content.addEventListener('animationend', onAnimOutEnd);
        // fallback
        clearTimeout(animTimeout);
        animTimeout = setTimeout(finalizeClose, 500);
    }

    function finalizeClose() {
        modal.setAttribute('aria-hidden','true');
        modal.classList.remove('open');
        backdrop.classList.remove('backdrop-out');
        content.classList.remove('anim-out');
        document.body.style.overflow = '';
        if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    function onKey(e) {
        if (e.key === 'Escape') closeProjectModal();
        if (e.key === 'Tab') {
            const focusable = Array.from(modal.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])'))
                .filter(el => !el.hasAttribute('disabled'));
            if (focusable.length === 0) return;
            const first = focusable[0]; const last = focusable[focusable.length-1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    }

    backdrop.addEventListener('click', closeProjectModal);
    closeBtn.addEventListener('click', closeProjectModal);

    const topbarProjectsLink = document.getElementById('topbar-projects-link');
    if (topbarProjectsLink) topbarProjectsLink.addEventListener('click', (e) => {
        e.preventDefault();
        const firstCard = projectsContainer.querySelector('.project-card');
        if (firstCard) {
            firstCard.scrollIntoView({behavior: 'smooth', block: 'center'});
            openProjectModal(0)
        } else openProjectModal(0);
    });

});
