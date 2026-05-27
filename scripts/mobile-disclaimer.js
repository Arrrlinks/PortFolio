// Mobile Disclaimer Handler
(function() {
    const STORAGE_KEY = 'mobile-disclaimer-dismissed';
    const MOBILE_QUERY = '(max-width: 1000px)';

    function isMobileDevice() {
        return window.matchMedia(MOBILE_QUERY).matches;
    }

    function isDismissed() {
        return sessionStorage.getItem(STORAGE_KEY) === 'true';
    }

    function clearLegacyDismissal() {
        if (localStorage.getItem(STORAGE_KEY) === 'true') {
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    function setPageScrollLock(locked) {
        const html = document.documentElement;
        const body = document.body;
        if (locked) {
            html.style.overflow = 'hidden';
            body.style.overflow = 'hidden';
            html.style.overflowY = 'hidden';
            body.style.overflowY = 'hidden';
        } else {
            html.style.overflow = '';
            body.style.overflow = '';
            html.style.overflowY = 'auto';
            body.style.overflowY = 'auto';
            html.style.overflowX = '';
            body.style.overflowX = '';
        }
    }

    function dismissDisclaimer() {
        sessionStorage.setItem(STORAGE_KEY, 'true');
        const disclaimer = document.querySelector('.mobile-disclaimer');
        if (disclaimer) {
            disclaimer.classList.add('hidden');
        }
        setPageScrollLock(false);
    }

    function updateVisibility() {
        const disclaimer = document.querySelector('.mobile-disclaimer');
        if (!disclaimer) return;

        if (isMobileDevice() && !isDismissed()) {
            disclaimer.classList.remove('hidden');
            setPageScrollLock(true);
        } else {
            disclaimer.classList.add('hidden');
            setPageScrollLock(false);
        }
    }

    function initializeDisclaimer() {
        const continueButton = document.querySelector('.mobile-disclaimer-button');
        if (!continueButton) return;

        clearLegacyDismissal();
        updateVisibility();
        requestAnimationFrame(updateVisibility);

        continueButton.addEventListener('click', dismissDisclaimer);

        const onResize = () => updateVisibility();
        window.addEventListener('resize', onResize);
        window.addEventListener('orientationchange', onResize);
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', onResize);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeDisclaimer);
    } else {
        initializeDisclaimer();
    }
})();
