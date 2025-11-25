// ==========================================
// CHATBOT ANEP - Asistente Pedagógico (v2.1)
// Integrado con Worker Cloudflare + Gemini 2.5
// ==========================================

(function () {
  'use strict';

  // ========== INYECTAR CSS ==========
  const style = document.createElement('style');
  style.textContent = `
    .chatbot-wrapper {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    .chatbot-toggle {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary, #6366f1) 0%, var(--primary-dark, #4f46e5) 100%);
      color: white;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      transition: all 0.3s ease;
    }

    .chatbot-toggle:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 20px rgba(99, 102, 241, 0.6);
    }

    .chatbot-toggle.active {
      background: #ef4444;
    }

    .chatbot-window {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 380px;
      height: 550px;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
      display: none;
      flex-direction: column;
      overflow: hidden;
      animation: slideUp 0.3s ease;
    }

    .chatbot-window.active {
      display: flex;
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .chatbot-header {
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: white;
      padding: 1rem 1.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .chatbot-header-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .chatbot-header-title h3 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
    }

    .chatbot-header-subtitle {
      font-size: 0.75rem;
      opacity: 0.9;
      margin: 0;
    }

    .chatbot-close {
      background: transparent;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      opacity: 0.8;
      transition: opacity 0.2s;
      padding: 0;
    }

    .chatbot-close:hover { opacity: 1; }

    .chatbot-messages {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      background: #f8fafc;
    }

    .chatbot-message {
      display: flex;
      gap: 0.75rem;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .chatbot-message.user { flex-direction: row-reverse; }

    .chatbot-message-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      flex-shrink: 0;
    }

    .chatbot-message.bot .chatbot-message-avatar {
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: white;
    }

    .chatbot-message.user .chatbot-message-avatar {
      background: #10b981;
      color: white;
    }

    .chatbot-message-content {
      max-width: 75%;
      padding: 0.75rem 1rem;
      border-radius: 12px;
      line-height: 1.5;
      font-size: 0.9rem;
      word-break: break-word;
    }

    .chatbot-message.bot .chatbot-message-content {
      background: white;
      color: #1e293b;
      border: 1px solid #e2e8f0;
    }

    .chatbot-message.user .chatbot-message-content {
      background: #6366f1;
      color: white;
    }

    .chatbot-message-content strong { font-weight: 600; }
    .chatbot-message-content em { font-style: italic; }
    .chatbot-message-content ul { margin: 0.5em 0 0.5em 1.2em; }
    .chatbot-message-content li { margin-bottom: 0.4em; }

    .chatbot-input-area {
      padding: 1rem;
      background: white;
      border-top: 1px solid #e2e8f0;
      display: flex;
      gap: 0.75rem;
      align-items: center;
    }

    .chatbot-input {
      flex: 1;
      border: 2px solid #e2e8f0;
      border-radius: 24px;
      padding: 0.75rem 1rem;
      font-size: 0.9rem;
      outline: none;
      transition: border-color 0.2s;
      font-family: inherit;
    }

    .chatbot-input:focus { border-color: #6366f1; }

    .chatbot-send {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #6366f1;
      color: white;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      transition: all 0.2s;
      flex-shrink: 0;
    }

    .chatbot-send:hover:not(:disabled) {
      background: #4f46e5;
      transform: scale(1.1);
    }

    .chatbot-send:disabled { opacity: 0.5; cursor: not-allowed; }

    .chatbot-welcome {
      text-align: center;
      padding: 2rem 1rem;
      color: #64748b;
    }

    .chatbot-welcome h4 { color: #1e293b; margin-bottom: 0.5rem; font-size: 1.1rem; }

    .chatbot-welcome p {
      font-size: 0.9rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .chatbot-tooltip {
      position: absolute;
      bottom: 70px;
      right: 0;
      background: var(--accent, #f59e0b);
      color: white;
      padding: 1rem 2.5rem 1rem 1rem;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(245, 158, 11, 0.4);
      max-width: 280px;
      z-index: 10000;
      animation: tooltipBounce 2s ease-in-out infinite;
      position: relative;
    }

    .chatbot-tooltip::after {
      content: '';
      position: absolute;
      bottom: -8px;
      right: 24px;
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 10px solid var(--accent, #f59e0b);
    }

    .chatbot-tooltip-title {
      font-weight: 700;
      font-size: 0.95rem;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .chatbot-tooltip p {
      margin: 0;
      font-size: 0.85rem;
      line-height: 1.4;
    }

    .chatbot-tooltip-close {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: transparent;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background 0.2s;
      padding: 0;
      line-height: 1;
      z-index: 10001;
      font-weight: bold;
    }

    .chatbot-tooltip-close:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .chatbot-tooltip.hidden {
      display: none !important;
    }

    @keyframes tooltipBounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    @media (max-width: 768px) {
      .chatbot-window {
        width: calc(100vw - 40px);
        height: calc(100vh - 140px);
        right: 20px;
        bottom: 90px;
      }

      .chatbot-tooltip {
        max-width: 240px;
        right: 0;
      }
    }

    @media (max-width: 480px) {
      .chatbot-window {
        width: 100vw;
        height: 100vh;
        right: 0;
        bottom: 0;
        border-radius: 0;
      }

      .chatbot-tooltip {
        max-width: calc(100vw - 100px);
        right: 0;
        font-size: 0.8rem;
      }
    }

    .chatbot-messages::-webkit-scrollbar { width: 6px; }
    .chatbot-messages::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 3px; }
  `;
  document.head.appendChild(style);

  // ========== HTML ==========
  const chatbotHTML = `
    <div class="chatbot-wrapper">
      <div class="chatbot-tooltip" id="chatbotTooltip">
        <button class="chatbot-tooltip-close" id="chatbotTooltipClose" aria-label="Cerrar" type="button">×</button>
        <div class="chatbot-tooltip-title">💡 Oportunidad de Profundización</div>
        <p>Consultá al Asistente Pedagógico para resolver dudas sobre el uso crítico de IA.</p>
      </div>
      <button class="chatbot-toggle" id="chatbotToggle" aria-label="Abrir asistente pedagógico">💬</button>
      <div class="chatbot-window" id="chatbotWindow">
        <div class="chatbot-header">
          <div class="chatbot-header-title">
            <span>🤖</span>
            <div>
              <h3>Asistente Pedagógico ANEP</h3>
              <p class="chatbot-header-subtitle">Consultame sobre IA educativa</p>
            </div>
          </div>
          <button class="chatbot-close" id="chatbotClose">×</button>
        </div>
        <div class="chatbot-messages" id="chatbotMessages">
          <div class="chatbot-welcome">
            <h4>👋 ¡Hola! Soy tu asistente pedagógico</h4>
            <p>Estoy aquí para ayudarte con dudas sobre el uso crítico de IA en educación, basándome en el Marco ANEP.</p>
          </div>
        </div>
        <div class="chatbot-input-area">
          <input type="text" id="chatbotInput" class="chatbot-input" placeholder="Escribí tu consulta..." maxlength="500" />
          <button class="chatbot-send" id="chatbotSend">➤</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', chatbotHTML);

  // ========== CONFIG ==========
  const CONFIG = {
    WORKER_URL: 'https://dawn-math-0c97.suscripcionessh.workers.dev',
  };

  const TOOLTIP_DISMISSED_KEY = 'chatbot_tooltip_dismissed';

  // ========== ELEMENTOS ==========
  const el = {
    toggle: document.getElementById('chatbotToggle'),
    window: document.getElementById('chatbotWindow'),
    close: document.getElementById('chatbotClose'),
    messages: document.getElementById('chatbotMessages'),
    input: document.getElementById('chatbotInput'),
    send: document.getElementById('chatbotSend'),
    tooltip: document.getElementById('chatbotTooltip'),
    tooltipClose: document.getElementById('chatbotTooltipClose'),
  };

  let isOpen = false, isTyping = false;

  // ========== FUNCIONES ==========
  const scrollToBottom = () => {
    setTimeout(() => {
      el.messages.scrollTo({ top: el.messages.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  const markdownToHTML = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\n/g, "<br>")
      .replace(/^- (.*)/gm, "<ul><li>$1</li></ul>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
  };

  const addMessage = (content, type = 'bot') => {
    const welcome = el.messages.querySelector('.chatbot-welcome');
    if (welcome) welcome.remove();

    const msg = document.createElement('div');
    msg.className = `chatbot-message ${type}`;
    msg.innerHTML = `
      <div class="chatbot-message-avatar">${type === 'bot' ? '🤖' : '👤'}</div>
      <div class="chatbot-message-content">${markdownToHTML(content)}</div>
    `;
    el.messages.appendChild(msg);
    scrollToBottom();
  };

  const sendMessage = async (message) => {
    if (!message || isTyping) return;

    addMessage(message, 'user');
    el.input.value = '';
    el.send.disabled = true;
    el.input.disabled = true;
    isTyping = true;

    addMessage('⌛ Pensando...', 'bot');

    try {
      const response = await fetch(CONFIG.WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      el.messages.lastElementChild.remove(); // elimina "pensando"

      let reply = data.reply || '❌ No se pudo generar respuesta.';
      reply = reply.replace(/\\n/g, '\n').replace(/\n{2,}/g, '\n\n');
      addMessage(reply, 'bot');
    } catch (err) {
      console.error(err);
      addMessage('❌ Error al conectar con el asistente. Intentá de nuevo.', 'bot');
    } finally {
      el.send.disabled = false;
      el.input.disabled = false;
      el.input.focus();
      isTyping = false;
    }
  };

  const dismissTooltip = () => {
    el.tooltip.classList.add('hidden');
    localStorage.setItem(TOOLTIP_DISMISSED_KEY, 'true');
  };

  // ========== EVENTOS ==========
  el.toggle.addEventListener('click', () => {
    isOpen = !isOpen;
    el.window.classList.toggle('active', isOpen);
    el.toggle.classList.toggle('active', isOpen);
    el.toggle.textContent = isOpen ? '✕' : '💬';
    
    // Ocultar tooltip al abrir el chatbot
    if (isOpen) {
      el.tooltip.classList.add('hidden');
    }
  });

  el.close.addEventListener('click', () => el.toggle.click());
  el.send.addEventListener('click', () => sendMessage(el.input.value));
  el.input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(el.input.value);
    }
  });

  // Evento del botón de cierre del tooltip con múltiples métodos
  el.tooltipClose.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dismissTooltip();
  });

  // También permitir cerrar haciendo click en el tooltip completo
  el.tooltip.addEventListener('click', (e) => {
    if (e.target === el.tooltipClose || e.target.closest('#chatbotTooltipClose')) {
      e.preventDefault();
      e.stopPropagation();
      dismissTooltip();
    }
  });

  // ========== INICIALIZACIÓN DEL TOOLTIP ==========
  // Verificar si el tooltip ya fue cerrado previamente
  if (localStorage.getItem(TOOLTIP_DISMISSED_KEY) === 'true') {
    el.tooltip.classList.add('hidden');
  }

  console.log('💬 Chatbot Pedagógico ANEP (v2.1) iniciado');
})();
