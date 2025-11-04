document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.projects, .project');
    if (!container) return;

    const root = document.documentElement;
    const styles = getComputedStyle(root);
    const quaternary = styles.getPropertyValue('--quaternary-color').trim();
    const primary = styles.getPropertyValue('--primary-color').trim();

    // Normalize any CSS color to computed rgb(...) form
    function normalizeColor(color) {
        const el = document.createElement('div');
        el.style.color = color;
        document.body.appendChild(el);
        const normalized = getComputedStyle(el).color;
        document.body.removeChild(el);
        return normalized;
    }

    const primaryNorm = normalizeColor(primary);
    const quaternaryNorm = normalizeColor(quaternary);
    let currentTheme = 'violet'; // track current theme

    function setThemeOrange() {
        root.style.setProperty('--primary-color', '#ff8c00');
        root.style.setProperty('--primary-color-light', '#172600');
        root.style.setProperty('--secondary-color', '#fff');
        root.style.setProperty('--text-color', '#000');

        // Hide project elements instantly
        document.querySelectorAll('.project, .project-overlay').forEach(el => {
            el.style.opacity = '0';
        });
    }

    function setThemeViolet() {
        // Show project elements instantly
        document.querySelectorAll('.project, .project-overlay').forEach(el => {
            el.style.opacity = '1';
        });
        root.style.setProperty('--background-color', '#fff');
        root.style.setProperty('--text-color', '#fff');
        root.style.setProperty('--primary-color', '#6200ea');
        root.style.setProperty('--primary-color-light', '#e8d9ff');

    }

    function updateBackground() {
        const rect = container.getBoundingClientRect();
        const elemCenterY = rect.top + rect.height / 2;
        const viewportCenterY = window.innerHeight / 2;

        const goingToOrange = elemCenterY < viewportCenterY;

        if (goingToOrange && currentTheme !== 'orange') {
            document.body.style.backgroundColor = quaternary;
            setThemeOrange();
            currentTheme = 'orange';
        } else if (!goingToOrange && currentTheme !== 'violet') {
            document.body.style.backgroundColor = primary;
            setThemeViolet();
            currentTheme = 'violet';
        }
    }

    function onScrollOrResize() {
        updateBackground();
    }

    // Initial background color
    const initialBg = getComputedStyle(document.body).backgroundColor;
    if (initialBg === 'rgba(0, 0, 0, 0)' || initialBg === 'transparent') {
        document.body.style.backgroundColor = primary;
    }

    // Initial setup
    updateBackground();

    // Event listeners
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    window.addEventListener('orientationchange', onScrollOrResize);
});
