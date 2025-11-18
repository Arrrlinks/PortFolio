(function(){
  // Elements
  const root = document.getElementById('chatbot');
  const toggle = document.getElementById('chatbot-toggle');
  const panel = root.querySelector('.chatbot-panel');
  const closeBtn = document.getElementById('chatbot-close');
  const form = document.getElementById('chatbot-form');
  const input = document.getElementById('chatbot-input');
  const messages = document.getElementById('chatbot-messages');

  const WEBHOOK_URL = 'https://n8n.antoinef.fr/webhook/antoinef-chatbot';

  const MAX_HISTORY = 8; // number of recent messages to send with each request
  let conversation = []; // stores { role: 'user'|'bot', text: '...' }

  function setOpen(open){
    root.setAttribute('aria-hidden', String(!open));
    // toggle aria-hidden on panel for accessibility
    panel.setAttribute('aria-hidden', String(!open));
    if(open){
      input.focus();
    }
  }

  toggle.addEventListener('click', ()=> setOpen(true));
  closeBtn.addEventListener('click', ()=> setOpen(false));

  // Basic utility to append messages
  function appendMessage(text, who='bot', opts={}){
    const el = document.createElement('div');
    el.className = 'message ' + who + (opts.new? ' new':'');
    el.textContent = text;
    messages.appendChild(el);
    // keep scroll at bottom
    messages.scrollTop = messages.scrollHeight;

    // add to in-memory history unless explicitly skipped (typing, system)
    if(!opts.skipHistory && (who === 'user' || who === 'bot')){
      conversation.push({ role: who, text });
      // keep conversation from growing indefinitely
      if(conversation.length > 200) conversation.shift();
    }

    return el;
  }

  function showTyping(){
    const el = document.createElement('div');
    el.className = 'message bot typing';
    el.textContent = 'Antoine is typing...';
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
    return el;
  }

  async function sendMessage(text){
    // render user message
    appendMessage(text, 'user');
    input.value = '';
    // show typing indicator
    const typingEl = showTyping();

    try{
      // prepare history (last N messages)
      const recent = JSON.stringify(conversation.slice(-MAX_HISTORY));

      // Send message as application/x-www-form-urlencoded for simple webhook
      const params = new URLSearchParams();
      params.append('message', text);
      params.append('history', JSON.stringify(recent));

      const res = await fetch(WEBHOOK_URL + '?' + params.toString(), {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });

      // remove typing
      typingEl.remove();

      if(!res.ok){
        appendMessage('Sorry, I could not reach the chatbot (status ' + res.status + ')', 'bot');
        return;
      }

      const data = await res.json();
      const out = (data && data.output) ? formatData(data.output) : (JSON.stringify(data) || '404: No response');
      appendMessage(out, 'bot', {new:true});
    }catch(err){
      typingEl.remove();
      appendMessage('Network error: ' + (err.message || err), 'bot');
      console.error(err);
    }
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const v = input.value && input.value.trim();
    if(!v) return;
    sendMessage(v);
  });

  // Allow toggling by clicking outside panel when open
  document.addEventListener('click', (ev)=>{
    if(!root.contains(ev.target) && root.getAttribute('aria-hidden') === 'false'){
      setOpen(false);
    }
  });

  // keyboard accessibility: Esc closes
  document.addEventListener('keydown', (ev)=>{
    if(ev.key === 'Escape' && root.getAttribute('aria-hidden') === 'false'){
      setOpen(false);
      toggle.focus();
    }
  });

  // initial state
  root.setAttribute('aria-hidden', 'true');
  panel.setAttribute('aria-hidden', 'true');

  // small welcome message
  setTimeout(()=>{
    appendMessage('Hello! I\'m 4nt0ine, I\'m a chatbot made to answer your questions, ask me about my projects, experience, or how I built this site.', 'bot');
  }, 700);

})();

function formatData(data){
  if(typeof data === 'string'){
    return data.replace(/(\*\*|__)(.*?)\1/g, '$2') // bold
               .replace(/~~(.*?)~~/g, '$1')       // strikethrough
               .replace(/`(.*?)`/g, '$1');        // inline code
  }
  return JSON.stringify(data);
}