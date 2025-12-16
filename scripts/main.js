(function () {
    'use strict';

    // Configuration
    const CAT_IMAGES_DIR = './imgs/cats/';
    // List of files in the cats folder. Keep in sync with the directory contents.
    const CAT_FILES = [
        'cat.webp',
        'cat-bandana-red.webp',
        'cat-bandana-purple.webp',
        'cat-big-hat.webp',
        'cat-cap.webp',
        'cat-chef-hat.webp',
        'cat-frog-hat.webp',
        'cat-hat-on-head.webp',
        'cat-magic-hat.webp',
    ];

    // Preload images
    const preloaded = [];
    CAT_FILES.forEach((f) => {
        const img = new Image();
        img.src = CAT_IMAGES_DIR + f;
        preloaded.push(img);
    });

    // expose for debugging (prevents 'never queried' warning)
    try { window.__preloadedCatImages = preloaded; } catch (e) { /* noop in strict environments */ }

    // Utility: pick a random file, optionally excluding the current one
    function pickRandom(exclude) {
        const candidates = CAT_FILES.filter((f) => f !== exclude);
        if (candidates.length === 0) return exclude; // fallback
        const i = Math.floor(Math.random() * candidates.length);
        return candidates[i];
    }

    // Main: attach handler
    document.addEventListener('DOMContentLoaded', () => {
        const cat = document.getElementById('floating-cat');
        if (!cat) return;

        // Ensure initial src is set to something within the folder (if not, set default)
        const currentSrc = cat.getAttribute('src') || '';
        const currentFile = currentSrc.split('/').pop();
        if (!CAT_FILES.includes(currentFile)) {
            cat.src = CAT_IMAGES_DIR + 'cat.png';
        }

        let isAnimating = false;

        cat.addEventListener('click', (e) => {
            e.preventDefault();
            if (isAnimating) return; // debounce

            const cur = cat.getAttribute('src').split('/').pop();
            const nextFile = pickRandom(cur);
            if (!nextFile || nextFile === cur) return;

            isAnimating = true;
            // add a class for a quick press feedback
            cat.classList.add('cat-swap-anim');

            // small timeout to let the press animation show
            setTimeout(() => {
                // swap image
                cat.src = CAT_IMAGES_DIR + nextFile;

                // ensure the image is loaded before removing anim state
                const temp = new Image();
                temp.src = cat.src;
                temp.onload = () => {
                    setTimeout(() => {
                        cat.classList.remove('cat-swap-anim');
                        isAnimating = false;
                    }, 120);
                };
                temp.onerror = () => {
                    // if load fails, revert to original
                    cat.src = CAT_IMAGES_DIR + cur;
                    cat.classList.remove('cat-swap-anim');
                    isAnimating = false;
                };
            }, 120);
        });
    });
})();
