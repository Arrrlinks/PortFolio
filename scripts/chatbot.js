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

  const MAX_HISTORY = 8;
  let conversation = [];

  function setOpen(open){
    root.setAttribute('aria-hidden', String(!open));
    panel.setAttribute('aria-hidden', String(!open));
    if(open){
      input.focus();
    }
  }

  function toggleOpen() {
    const isOpen = root.getAttribute('aria-hidden') === 'false';
    setOpen(!isOpen);
  }

  toggle.addEventListener('click', ()=> toggleOpen());
  closeBtn.addEventListener('click', ()=> setOpen(false));

  function appendMessage(text, who='bot', opts={}){
    const el = document.createElement('div');
    el.className = 'message ' + who + (opts.new? ' new':'');
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;

    if(!opts.skipHistory && (who === 'user' || who === 'bot')){
      conversation.push({ role: who, text });
      if(conversation.length > 200) conversation.shift();
    }

    return el;
  }

  function showTyping(){
    const el = document.createElement('div');
    el.className = 'message bot typing';
    el.textContent = '4nt0ine is typing...';
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
    return el;
  }

  async function sendMessage(text){
    appendMessage(text, 'user');
    input.value = '';
    const typingEl = showTyping();

    try{
      const recent = JSON.stringify(conversation.slice(-MAX_HISTORY));
      const params = new URLSearchParams();
      params.append('message', text);
      params.append('history', JSON.stringify(recent));

      const res = await fetch(WEBHOOK_URL + '?' + params.toString(), {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });

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

  document.addEventListener('click', (ev)=>{
    if(!root.contains(ev.target) && root.getAttribute('aria-hidden') === 'false'){
      setOpen(false);
    }
  });

  document.addEventListener('keydown', (ev)=>{
    if(ev.key === 'Escape' && root.getAttribute('aria-hidden') === 'false'){
      setOpen(false);
      toggle.focus();
    }
  });

  root.setAttribute('aria-hidden', 'true');
  panel.setAttribute('aria-hidden', 'true');

  setTimeout(()=>{
    appendMessage('Hello! I\'m 4nt0ine, I\'m a chatbot made to answer your questions, ask me about my projects, experience, or how I built this site.', 'bot');
  }, 700);

})();

//TODO: Format messages better (markdown, code blocks, links, etc.)
function formatData(data){
  if(typeof data === 'string'){
    return data.replace(/(\*\*|__)(.*?)\1/g, '$2') // bold
               .replace(/~~(.*?)~~/g, '$1')       // strikethrough
               .replace(/`(.*?)`/g, '$1');        // inline code
  }
  return JSON.stringify(data);
}