document.addEventListener('DOMContentLoaded', () => {
    const fonts = [
        "'Rubik Pixels', sans-serif",
        "'Frijole', cursive",
        "'Galindo', cursive",
        "'Rubik Iso', sans-serif",
        "'Rubik Dirt', sans-serif",
        "'Rubik Glitch', sans-serif",
        "'Pixelify Sans', sans-serif",
        "'Coral Pixels', sans-serif",
        "'Doto', sans-serif"
    ];

    const rootStyles = getComputedStyle(document.documentElement);
    const black = rootStyles.getPropertyValue('--secondary-color').trim() || '#000';
    const circle = document.querySelector('.circle');

    // store original paddings for first and last name divs (numbers in px)
    const firstNameDiv = document.querySelector('.name-container div:first-child');
    const lastNameDiv = document.querySelector('.name-container div:last-child');
    const parsePx = v => {
        if (!v) return 0;
        const m = v.toString().match(/([-0-9.]+)px/);
        return m ? Math.round(parseFloat(m[1])) : 0;
    };
    const firstOrigPaddingRight = firstNameDiv ? parsePx(getComputedStyle(firstNameDiv).paddingRight) : 0;
    const lastOrigPaddingLeft = lastNameDiv ? parsePx(getComputedStyle(lastNameDiv).paddingLeft) : 0;

    // current accumulated reduction (px) applied to each side
    let firstReduction = 0;
    let lastReduction = 0;

    function randomFont(exclude) {
        const choices = fonts.filter(f => f !== exclude);
        return choices[Math.floor(Math.random() * choices.length)];
    }

    function applyPaddingUpdates() {
        if (firstNameDiv) {
            const newPad = Math.max(0, firstOrigPaddingRight - firstReduction);
            firstNameDiv.style.paddingRight = newPad + 'px';
        }
        if (lastNameDiv) {
            const newPad = Math.max(0, lastOrigPaddingLeft - lastReduction);
            lastNameDiv.style.paddingLeft = newPad + 'px';
        }
    }

    document.querySelectorAll('.typo-effect').forEach(el => {
        const defaultFont = getComputedStyle(el).fontFamily || fonts[0];
        const text = el.textContent;
        el.textContent = ''; // clear original
        const fragment = document.createDocumentFragment();
        const spans = [];

        for (const ch of text) {
            const span = document.createElement('span');
            span.className = 'typo-letter';
            span.style.display = 'inline-block';
            span.style.whiteSpace = 'pre'; // preserve spaces
            span.textContent = ch === ' ' ? '\u00A0' : ch; // non-breaking space
            span.style.color = black; // keep text black by default
            span.style.filter = 'none';
            span.style.transition = 'filter 180ms ease, font-size 120ms ease, font-family 120ms ease';
            span.dataset.defaultFont = defaultFont;
            span._revertTimer = null;

            // track whether this span currently contributes to padding reduction
            span._activeForPadding = false;
            span._padDelta = 0;

            // Hover handlers
            span.addEventListener('mouseenter', () => {
                // clear any pending revert for this span
                if (span._revertTimer) {
                    clearTimeout(span._revertTimer);
                    span._revertTimer = null;
                }

                // compute a small padding reduction based on visual width of this letter
                // measure width (ensure it's in DOM)
                const rect = span.getBoundingClientRect();
                const letterWidth = rect.width || 8; // fallback
                // use a fraction of width so we don't remove full width (adjust factor as desired)
                const delta = Math.round(letterWidth * 0.55);

                // if not already active, add its delta to the right side
                if (!span._activeForPadding) {
                    span._padDelta = delta;
                    span._activeForPadding = true;

                    // determine which name div this span belongs to and add reduction there
                    if (el === firstNameDiv) {
                        firstReduction += span._padDelta;
                    } else if (el === lastNameDiv) {
                        lastReduction += span._padDelta;
                    }
                    applyPaddingUpdates();
                }

                span.style.fontFamily = randomFont(span.dataset.defaultFont);
            });

            span.addEventListener('mouseleave', () => {
                if (span._revertTimer) clearTimeout(span._revertTimer);
                // when the revert happens, restore font and remove this span's padding reduction
                span._revertTimer = setTimeout(() => {
                    span.style.fontFamily = span.dataset.defaultFont;
                    span._revertTimer = null;

                    if (span._activeForPadding) {
                        // subtract its delta and update padding
                        if (el === firstNameDiv) {
                            firstReduction = Math.max(0, firstReduction - span._padDelta);
                        } else if (el === lastNameDiv) {
                            lastReduction = Math.max(0, lastReduction - span._padDelta);
                        }
                        span._activeForPadding = false;
                        span._padDelta = 0;
                        applyPaddingUpdates();
                    }
                }, 2000);
            });

            fragment.appendChild(span);
            spans.push(span);
        }

        el.appendChild(fragment);
    });
});