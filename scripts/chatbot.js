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

    function appendMessage(text, who = 'bot', opts = {}) {
        const el = document.createElement('div');
        el.className = 'message ' + who + (opts.new ? ' new' : '');
        if (opts.html) {
            el.innerHTML = text;
        } else {
            el.textContent = text;
        }
        messages.appendChild(el);
        messages.scrollTop = messages.scrollHeight;

        if (!opts.skipHistory && (who === 'user' || who === 'bot')) {
            conversation.push({role: who, text});
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
                method: 'GET', headers: {'Accept': 'application/json'}
            });

            typingEl.remove();

            if (!res.ok) {
                appendMessage('Sorry, I could not reach the chatbot (status ' + res.status + ')', 'bot');
                return;
            }

            const data = await res.json();
            const out = (data && data.output) ? formatData(data.output) : (JSON.stringify(data) || '404: No response');
            // out is safe HTML produced by formatData -> render as HTML
            appendMessage(out, 'bot', {new: true, html: true});
        } catch (err) {
            typingEl.remove();
            appendMessage('Network error: ' + (err.message || err), 'bot');
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