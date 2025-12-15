(function () {
    // Elements
    const root = document.getElementById('chatbot');
    const toggle = document.getElementById('chatbot-toggle');
    const panel = root.querySelector('.chatbot-panel');
    const closeBtn = document.getElementById('chatbot-close');
    const form = document.getElementById('chatbot-form');
    const input = document.getElementById('chatbot-input');
    const messages = document.getElementById('chatbot-messages');

    const WEBHOOK_URL = 'https://n8n.antoinef.fr/webhook/antoinef-chatbot';

    const MAX_HISTORY = 8;
    let conversation = [];

    // Predefined error message sequences; each sequence is an array of messages shown one after another
    const ERROR_SEQUENCES = [
        [
            "I'm currently not available<br> Please try again in a few seconds.",
        ],
        [
            "Oops — I can't answer right now.<br>Try again shortly, please.",
        ],
        [
            "Service temporarily offline.<br> Come back in a few seconds.",
        ],
        [
            "I'm currently not available<br>Please try again in a few seconds.",
        ],
        [
            "Oops — I can't answer right now.<br>Try again shortly, please.",
        ],
        [
            "Service temporarily offline.<br>Come back in a few seconds.",
        ],
        [
            "Currently unavailable.<br>Please check back shortly.",
        ],
        [
            "Not available right now.<br>Please retry in a few seconds.",
        ]
    ];

    // Show a random error sequence: display each message in order (streamed if requested)
    async function showRandomErrorSequence() {
        const seq = ERROR_SEQUENCES[Math.floor(Math.random() * ERROR_SEQUENCES.length)];
        for (let i = 0; i < seq.length; i++) {
            // stream each message like a bot reply and wait for it to finish
            const el = appendMessage(seq[i], 'bot', { new: true, html: true, stream: 'word', delay: 80 });
            // wait for streaming to finish if available
            if (el && el.done && typeof el.done.then === 'function') {
                try { await el.done; } catch (e) { /* ignore */ }
            } else {
                // fallback small delay
                await new Promise(r => setTimeout(r, 500));
            }
            // small pause between messages
            await new Promise(r => setTimeout(r, 220));
        }
    }

    function setOpen(open) {
        root.setAttribute('aria-hidden', String(!open));
        panel.setAttribute('aria-hidden', String(!open));
        if (open) {
            input.focus();
        }
    }

    function toggleOpen() {
        const isOpen = root.getAttribute('aria-hidden') === 'false';
        setOpen(!isOpen);
    }

    toggle.addEventListener('click', () => toggleOpen());
    closeBtn.addEventListener('click', () => setOpen(false));

    // helper to strip HTML -> plain text for streaming
    function stripHtml(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html || '';
        return tmp.textContent || tmp.innerText || '';
    }

    function appendMessage(text, who = 'bot', opts = {}) {
        const el = document.createElement('div');
        el.className = 'message ' + who + (opts.new ? ' new' : '');

        // default done promise (resolved immediately)
        el.done = Promise.resolve();

        // streaming mode: show word-by-word (plain text)
        if (who === 'bot' && opts.stream === 'word') {
            // create a dedicated child to hold the streaming plain text
            const streamChild = document.createElement('div');
            streamChild.className = 'streaming-content';
            // preserve whitespace/newlines while streaming
            streamChild.style.whiteSpace = 'pre-wrap';
            el.appendChild(streamChild);
            messages.appendChild(el);
            messages.scrollTop = messages.scrollHeight;

            const plain = stripHtml(text);
            const words = plain.split(/(\s+)/); // keep spaces so spacing is preserved
            let i = 0;
            streamChild.textContent = '';

            // create a promise that resolves when streaming finishes
            let resolveDone;
            el.done = new Promise(res => { resolveDone = res; });

            const delay = typeof opts.delay === 'number' ? opts.delay : 120; // ms per word/space chunk
            const timer = setInterval(() => {
                if (i >= words.length) {
                    clearInterval(timer);

                    // after streaming finishes, render the final HTML if requested
                    if (opts.html) {
                        // build DOM in a temporary container and move its children into the message
                        const tmp = document.createElement('div');
                        tmp.innerHTML = text;
                        // remove only the streaming child
                        if (el.contains(streamChild)) el.removeChild(streamChild);
                        // move parsed nodes into el
                        Array.from(tmp.childNodes).forEach(n => el.appendChild(n));
                    } else {
                        // ensure full plain text is present
                        streamChild.textContent = plain;
                    }

                    // after rendering final content, save to history unless skipped
                    if (!opts.skipHistory && (who === 'user' || who === 'bot')) {
                        // store plain-text history for consistency
                        conversation.push({ role: who, text: plain });
                        if (conversation.length > 200) conversation.shift();
                    }

                    messages.scrollTop = messages.scrollHeight;
                    // resolve the done promise so callers can await streaming completion
                    if (typeof resolveDone === 'function') resolveDone();
                    return;
                }
                streamChild.textContent += words[i];
                messages.scrollTop = messages.scrollHeight;
                i += 1;
            }, delay);

            return el;
        }

        // default behavior (non-streaming)
        if (opts.html) {
            el.innerHTML = text;
        } else {
            el.textContent = text;
        }
        messages.appendChild(el);
        messages.scrollTop = messages.scrollHeight;

        if (!opts.skipHistory && (who === 'user' || who === 'bot')) {
            conversation.push({ role: who, text });
            if (conversation.length > 200) conversation.shift();
        }

        return el;
    }

    function showTyping() {
        const el = document.createElement('div');
        el.className = 'message bot typing';
        el.textContent = '4nt0ine is typing...';
        messages.appendChild(el);
        messages.scrollTop = messages.scrollHeight;
        return el;
    }

    async function sendMessage(text) {
        appendMessage(text, 'user');
        input.value = '';
        const typingEl = showTyping();

        try {
            const recent = JSON.stringify(conversation.slice(-MAX_HISTORY));
            const params = new URLSearchParams();
            params.append('message', text);
            params.append('history', JSON.stringify(recent));

            const res = await fetch(WEBHOOK_URL + '?' + params.toString(), {
                method: 'GET', headers: { 'Accept': 'application/json' }
            });

            typingEl.remove();

            if (!res.ok) {
                // network/server error -> show a random friendly error sequence
                await showRandomErrorSequence();
                return;
            }

            const data = await res.json();

            // if model responded with an error flag, show friendly error sequence
            if (data && (data.error === 1 || data.error === '1')) {
                await showRandomErrorSequence();
                return;
            }

            const out = (data && data.output) ? formatData(data.output) : (JSON.stringify(data) || '404: No response');
            // out is safe HTML produced by formatData -> render as HTML
            appendMessage(out, 'bot', { new: true, html: true, stream: 'word', delay: 60 });
        } catch (err) {
            typingEl.remove();
            // network exception -> show friendly error sequence
            await showRandomErrorSequence();
            console.error(err);
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const v = input.value && input.value.trim();
        if (!v) return;
        sendMessage(v);
    });

    document.addEventListener('click', (ev) => {
        if (!root.contains(ev.target) && root.getAttribute('aria-hidden') === 'false') {
            setOpen(false);
        }
    });

    document.addEventListener('keydown', (ev) => {
        if (ev.key === 'Escape' && root.getAttribute('aria-hidden') === 'false') {
            setOpen(false);
            toggle.focus();
        }
    });

    root.setAttribute('aria-hidden', 'true');
    panel.setAttribute('aria-hidden', 'true');

    setTimeout(() => {
        appendMessage('Hello! I\'m 4nt0ine, I\'m a chatbot made to answer your questions, ask me about my projects, experience, or how I built this site.', 'bot');
    }, 700);

})();

function formatData(data) {
    // If it's not a string, stringify safely.
    if (typeof data !== 'string') {
        try {
            return '<pre><code>' + escapeHtml(JSON.stringify(data, null, 2)) + '</code></pre>';
        } catch (e) {
            return escapeHtml(String(data));
        }
    }

    // Helpers
    function escapeHtml(s) {
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function isSafeUrl(url) {
        try {
            if (!url) return false;
            url = url.trim();
            if (url.startsWith('/')) return true;
            const allowed = ['http:', 'https:', 'mailto:', 'tel:'];
            const parsed = new URL(url);
            return allowed.includes(parsed.protocol);
        } catch (e) {
            return false;
        }
    }

    let src = escapeHtml(data);

    const codeBlocks = [];
    src = src.replace(/```(?:[^\n]*\n)?([\s\S]*?)```/g, (m, inside) => {
        const idx = codeBlocks.length;
        codeBlocks.push(inside);
        return `__CODEBLOCK_${idx}__`;
    });

    src = src.replace(/__CODEBLOCK_(\d+)__/g, (m, idx) => {
        const content = codeBlocks[Number(idx)] || '';
        return '<pre><code>' + content + '</code></pre>';
    });

    src = src.replace(/`([^`]+)`/g, (m, txt) => {
        return '<code>' + txt + '</code>';
    });

    src = src.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, text, url) => {
        const parts = url.split('"')[0].trim();
        const href = parts;
        const linkText = text;
        if (isSafeUrl(href)) {
            const safeHref = escapeHtml(href);
            return `<a href="${safeHref}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
        }
        return `${linkText} (${escapeHtml(href)})`;
    });

    src = src.replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>');

    src = src.replace(/~~(.*?)~~/g, '<s>$1</s>');

    src = src.replace(/(?<!\*)\*(?!\*)([^*]+)\*(?!\*)/g, '<em>$1</em>');
    src = src.replace(/(?<!_)_(?!_)([^_]+)_(?!_)/g, '<em>$1</em>');

    const paragraphs = src.split(/\n\n+/).map(p => p.replace(/\n/g, '<br>'));
    src = paragraphs.map(p => `<p>${p}</p>`).join('');

    return src;
}