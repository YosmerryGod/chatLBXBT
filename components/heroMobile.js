import { askGemini } from '../func/askGemini.js';
import { handleMSG1 } from '../func/handleExample.js';

const chatHistory = [];

export function renderHeroMobile() {
  document.body.style.margin = '0';
  document.body.style.height = '100vh';
  document.body.style.overflow = 'hidden';

  const navbar = document.querySelector('nav');
const navbarHeight = navbar?.offsetHeight || 200;

const hero = document.createElement('main');
hero.style.cssText = `
  margin-top: ${navbarHeight}px;
  height: calc(100vh - ${navbarHeight}px);
  display: flex;
  flex-direction: column;
  background-color: #1F1F1F;
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
  background-color: #1F1F1F;
  padding: 1rem;
  scrollbar-width: thin;
  position: relative;
`;


  const style = document.createElement('style');
  style.textContent = `
    #chat-box::-webkit-scrollbar { width: 6px; }
    #chat-box::-webkit-scrollbar-track { background: transparent; }
    #chat-box::-webkit-scrollbar-thumb { background-color: #5e5e5e; border-radius: 3px; }
    #chat-box { scrollbar-width: thin; scrollbar-color: #5e5e5e transparent; }

    .template-box::-webkit-scrollbar { display: none; }
    .template-box { scrollbar-width: none; -ms-overflow-style: none; }
    .template-box.dragging { cursor: grabbing; user-select: none; }

    #chat-input::-webkit-scrollbar { width: 0px; background: transparent; }
    #chat-input { scrollbar-width: none; }

    #chat-input::placeholder {
      font-size: 2rem;
      color: #aaa;
    }
  `;
  document.head.appendChild(style);

  // === Placeholder + Desc ===
  const placeholder = document.createElement('div');
  placeholder.id = 'placeholder';
  placeholder.style.cssText = `
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
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
    font-size: clamp(2rem, 6vw, 3rem);
    font-weight: 600;
  `;

  const desc = document.createElement('div');
  desc.textContent = 'how can i help you today?';
  desc.style.cssText = `
    color: #ffffff;
    font-size: clamp(1.2rem, 4vw, 1.5rem);
    margin-top: 0.3rem;
    opacity: 0.9;
  `;

  placeholder.appendChild(title);
  placeholder.appendChild(desc);

  // === Template Box ===
  const templateBox = document.createElement('div');
  templateBox.className = 'template-box';
  templateBox.style.cssText = `
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    flex-wrap: nowrap;
    gap: 1rem;
    height: 15rem;
    padding: 1.2rem 0;
    scroll-snap-type: x mandatory;
    background-color: #1F1F1F;
    -webkit-overflow-scrolling: touch;
  `;

  const templateWrapper = document.createElement('div');
  templateWrapper.style.cssText = `padding: 0 1rem; box-sizing: border-box;`;
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

  templates.forEach(templateText => {
    const btn = document.createElement('button');
    btn.textContent = templateText;
    btn.style.cssText = `
      flex: 0 0 auto;
      white-space: nowrap;
      padding: 1.2rem 2rem;
      background-color: transparent;
      border: 1px solid #CD9800;
      border-radius: 10px;
      color: #CD9800;
      cursor: pointer;
      font-size: 2rem;
      font-weight: 500;
      scroll-snap-align: start;
    `;
    btn.onclick = () => {
      input.value = templateText;
      button.click();
    };
    templateBox.appendChild(btn);
  });

  // === Drag scroll logic
  let isDown = false;
  let startX, scrollLeft;
  templateBox.addEventListener('mousedown', (e) => {
    isDown = true;
    templateBox.classList.add('dragging');
    startX = e.pageX - templateBox.offsetLeft;
    scrollLeft = templateBox.scrollLeft;
  });
  templateBox.addEventListener('mouseleave', () => {
    isDown = false;
    templateBox.classList.remove('dragging');
  });
  templateBox.addEventListener('mouseup', () => {
    isDown = false;
    templateBox.classList.remove('dragging');
  });
  templateBox.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - templateBox.offsetLeft;
    const walk = (x - startX) * 1.5;
    templateBox.scrollLeft = scrollLeft - walk;
  });

  // === Chat Input
  const inputWrapper = document.createElement('div');
  inputWrapper.style.cssText = `
    width: 100%;
    position: relative;
    padding: 1rem;
    background-color: #1F1F1F;
    margin-bottom: 30%;
  `;

  input.id = 'chat-input';
  input.placeholder = 'Ask anything...';
  input.style.cssText = `
    width: 100%;
    height: 50vw;
    min-height: 3rem;
    max-height: 200px;
    padding: 0.8rem 3rem 2.5rem 1rem;
    font-size: 1.3rem;
    border-radius: 8px;
    border: none;
    outline: none;
    resize: none;
    line-height: 1.4;
    overflow-y: auto;
    box-sizing: border-box;
    background-color: #2B2B2B;
    color: white;
  `;

  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = input.scrollHeight + 'px';
  });

  button.textContent = '➤';
  button.style.cssText = `
    position: absolute;
    bottom: 1.8rem;
    right: 1.6rem;
    background-color: #F4B400;
    color: black;
    border: none;
    padding: 0.9rem 1.2rem;
    font-size: 1.3rem;
    border-radius: 8px;
    font-weight: bold;
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
