import { askGemini } from '../func/askGemini.js';
import { handleMSG1 } from '../func/handleExample.js';

const chatHistory = [];

export function renderHeroMobile() {
  document.body.style.cssText = `
    margin: 0;
    height: 100vh;
    overflow: hidden;
    background-color: #1F1F1F;
  `;

  const navbar = document.querySelector('nav');
  const navbarHeight = navbar?.offsetHeight || window.innerHeight * 0.12;

  const hero = document.createElement('main');
  hero.style.cssText = `
    margin-top: ${navbarHeight}px;
    height: calc(100vh - ${navbarHeight}px);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow: hidden;
  `;

  const chatBox = document.createElement('div');
  chatBox.id = 'chat-box';
  chatBox.style.cssText = `
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: white;
    font-size: 0.95rem;
    padding: 1.5rem 1rem;
    position: relative;
    background-color: #1F1F1F;
    padding-bottom: 20vh;
  `;

  const style = document.createElement('style');
  style.textContent = `
    #chat-box::-webkit-scrollbar { width: 0.5rem; }
    #chat-box::-webkit-scrollbar-thumb { background-color: #5e5e5e; border-radius: 0.25rem; }

    .template-box::-webkit-scrollbar { display: none; }
    .template-box { scrollbar-width: none; }

    #chat-input::-webkit-scrollbar { display: none; }
    #chat-input::placeholder {
      font-size: 1.5rem;
      color: #aaa;
    }
  `;
  document.head.appendChild(style);

  // === Placeholder ===
  const placeholder = document.createElement('div');
  placeholder.id = 'placeholder';
  placeholder.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const title = document.createElement('div');
  title.textContent = 'Welcome to Neuro Bean Assistant';
  title.style.cssText = `
    color: #CD9800;
    font-size: clamp(1.5rem, 6vw, 2.5rem);
    font-weight: 600;
  `;

  const desc = document.createElement('div');
  desc.textContent = 'how can I help you today?';
  desc.style.cssText = `
    color: #ffffff;
    font-size: clamp(1rem, 4vw, 1.25rem);
    margin-top: 0.5rem;
    opacity: 0.9;
  `;

  placeholder.appendChild(title);
  placeholder.appendChild(desc);

  // === Template ===
  const templateBox = document.createElement('div');
  templateBox.className = 'template-box';
  templateBox.style.cssText = `
    display: flex;
    overflow-x: auto;
    gap: 1rem;
    height: 10rem;
    padding: 1rem 1rem;
    scroll-snap-type: x mandatory;
    background-color: #1F1F1F;
  `;

  const templateWrapper = document.createElement('div');
  templateWrapper.style.cssText = `
    position: fixed;
    bottom: 12vh;
    left: 0;
    width: 100%;
    background-color: #1F1F1F;
    z-index: 9;
  `;
  templateWrapper.appendChild(templateBox);

  const templates = [
    'Explain what the LilBean project is about',
    'Who is ChatBean and what can it do?',
    "Give me today's BTC market analysis",
    'What is the roadmap for LilBean?',
    'Tell me about the utility of LilBean'
  ];

  const input = document.createElement('textarea');
  const button = document.createElement('button');

  templates.forEach(text => {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.style.cssText = `
      flex: 0 0 auto;
      padding: 1rem 2rem;
      background: transparent;
      border: 1px solid #CD9800;
      border-radius: 0.5rem;
      color: #CD9800;
      font-size: 1.2rem;
      font-weight: 500;
      white-space: nowrap;
      scroll-snap-align: start;
    `;
    btn.onclick = () => {
      input.value = text;
      button.click();
    };
    templateBox.appendChild(btn);
  });

  // === Drag scroll
  let isDown = false;
  let startX, scrollLeft;
  templateBox.addEventListener('mousedown', e => {
    isDown = true;
    templateBox.classList.add('dragging');
    startX = e.pageX - templateBox.offsetLeft;
    scrollLeft = templateBox.scrollLeft;
  });
  ['mouseup', 'mouseleave'].forEach(ev => {
    templateBox.addEventListener(ev, () => {
      isDown = false;
      templateBox.classList.remove('dragging');
    });
  });
  templateBox.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - templateBox.offsetLeft;
    templateBox.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });

  // === Input
  const inputWrapper = document.createElement('div');
  inputWrapper.style.cssText = `
    width: 100%;
    position: fixed;
    bottom: 2vh;
    left: 0;
    padding: 1rem;
    background-color: #1F1F1F;
    z-index: 10;
  `;

  input.id = 'chat-input';
  input.placeholder = 'Ask anything...';
  input.style.cssText = `
  width: 100%;
  height: auto;
  min-height: 8rem;
  max-height: 35vh;
  padding: 1.2rem 3rem 2.5rem 1.2rem;
  font-size: 2.5rem;
  border-radius: 0.5rem;
  background-color: #2B2B2B;
  color: white;
  border: none;
  resize: none;
  overflow-y: hidden;
  box-sizing: border-box;
  transition: height 0.2s ease;
`;


input.addEventListener('input', () => {
  input.style.height = 'auto';
  const newHeight = Math.min(input.scrollHeight, window.innerHeight * 0.35); // max 35% layar
  input.style.height = `${newHeight}px`;
});

  button.textContent = '➤';
  button.style.cssText = `
    position: absolute;
    bottom: 1.8rem;
    right: 1.6rem;
    background-color: #F4B400;
    color: black;
    border: none;
    padding: 0.8rem 1.1rem;
    font-size: 1.2rem;
    border-radius: 0.5rem;
    cursor: pointer;
  `;

  button.onclick = async () => {
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    addMessage('user', text);
    chatHistory.push({ role: 'user', content: text });
    const bubble = addMessage('bot', '⏳ NeuroBean is thinking...');
    const response = await generateResponse();
    chatHistory.push({ role: 'bot', content: response });
    typeResponse(bubble, response, true);
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      button.click();
    }
  });

  inputWrapper.appendChild(input);
  inputWrapper.appendChild(button);

  hero.appendChild(chatBox);
  hero.appendChild(placeholder);
  hero.appendChild(templateWrapper);
  hero.appendChild(inputWrapper);
  document.body.appendChild(hero);
}



// === Supporting functions ===

function addMessage(sender, text, parseBold = false) {
  const chatBox = document.getElementById('chat-box');

  // 🔥 Hapus placeholder dan template saat mulai chat
  const placeholderEl = document.getElementById('placeholder');
  if (placeholderEl) placeholderEl.remove();

  const templateBox = document.querySelector('.template-box');
  if (templateBox) templateBox.style.display = 'none';

  const wrapper = document.createElement('div');
  wrapper.style.cssText = `
    display: flex;
    justify-content: ${sender === 'user' ? 'flex-end' : 'flex-start'};
    margin-bottom: 0.75rem;
  `;

  const bubble = document.createElement('div');
  bubble.style.cssText = `
  max-width: 80%;
  padding: 0.7rem 1rem;
  border-radius: 12px;
  background-color: ${sender === 'user' ? '#2B2B2B' : 'transparent'};
  color: white;
  word-wrap: break-word;
  line-height: 1.4;
  font-size: 2rem;
  border: ${sender === 'user' ? '1px solid #F4B400' : 'none'};
`;

  if (parseBold) {
    const formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    bubble.innerHTML = formatted;
  } else {
    bubble.textContent = text;
  }

  wrapper.appendChild(bubble);
  chatBox.appendChild(wrapper);
  chatBox.scrollTop = chatBox.scrollHeight;
  return bubble;
}

async function generateResponse() {
  try {
    const lastMessage = chatHistory.slice(-1);
    const context = lastMessage.map(msg =>
      `${msg.role === 'user' ? 'You' : 'NeuroBean'}: ${msg.content}`
    ).join('\n');

    const reply = await handleMSG1(context);
    return reply || "Sorry NeuroBean Error";
  } catch (err) {
    console.error("Gemini error:", err);
    return "Error Call NeuroBean";
  }
}

function typeResponse(element, text, parseBold = false, delay = 10) {
  let i = 0;
  let targetText = text;

  if (parseBold) {
    targetText = targetText.replace(/\*\*(.*?)\*\*/g, (_, p1) => `<strong>${p1}</strong>`);
    element.innerHTML = '';
  } else {
    element.textContent = '';
  }

  const interval = setInterval(() => {
    if (parseBold) {
      element.innerHTML = targetText.slice(0, i + 1);
    } else {
      element.textContent += text.charAt(i);
    }

    i++;
    if (i >= targetText.length) clearInterval(interval);
  }, delay);
}
