document.addEventListener('DOMContentLoaded', () => {
    const circle = document.querySelector('.circle');
    const overlay = document.querySelector('.circle-overlay');
    if (circle) {
        circle.style.animation = 'circleToDown 1.2s ease forwards';
    }
    if (overlay) {
        overlay.style.animation = 'circleToDown 1.2s ease forwards';
    }
});

(function () {
    const circle = document.querySelector('.circle');
    const overlay = document.querySelector('.circle-overlay');
    if (!circle || !overlay) return;

    // read base diameter (falls back to 600 if not set)
    function getBaseDiameter() {
        const w = parseFloat(getComputedStyle(circle).width) || 600;
        return w;
    }

    let baseDiameter = getBaseDiameter();
    let targetScale = 1;

    function updateTargetScale() {
        baseDiameter = getBaseDiameter();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        // diameter needed to cover the viewport (diagonal) with a small margin
        const neededDiameter = Math.sqrt(vw * vw + vh * vh) * 1.02;
        targetScale = Math.max(1, neededDiameter / baseDiameter);
    }

    updateTargetScale();

    // throttle with rAF
    let scheduled = false;

    function onScroll() {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(() => {
            const maxScrollForEffect = window.innerHeight * 2.5;
            const progress = Math.min(1, Math.max(0, window.scrollY / maxScrollForEffect));
            const scale = 1 + (targetScale - 1)*2 * progress;
            const transform = `translateX(-50%) scale(${scale})`;
            circle.style.transform = transform;
            overlay.style.transform = transform;
            scheduled = false;
            if (progress >= 1) {
                circle.style.display = 'none';
                overlay.style.display = 'none';
                const rootStyles = getComputedStyle(document.documentElement);
                document.body.style.backgroundColor = rootStyles.getPropertyValue('--primary-color').trim() || '#fff';
            } else {
                circle.style.display = 'block';
                overlay.style.display = 'block';
                const rootStyles = getComputedStyle(document.documentElement);
                document.body.style.backgroundColor = rootStyles.getPropertyValue('--background-color').trim() || '#fff';
            }
        });
    }

    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', () => {
        updateTargetScale();
        onScroll(); // update immediately to adapt
    }, {passive: true});

    // ensure initial state matches current scroll position
    onScroll();
}());