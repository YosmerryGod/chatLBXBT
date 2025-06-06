import { askGemini } from '../func/askGemini.js';
import { handleMSG1 } from '../func/handleExample.js';

const chatHistory = [];

export function renderHeroSection() {
  const navbar = document.querySelector('nav');
  const navbarHeight = navbar?.offsetHeight || 60;

  const hero = document.createElement('main');
  hero.style.cssText = `
    margin-top: ${navbarHeight}px;
    height: calc(100vh - ${navbarHeight}px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
    box-sizing: border-box;
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
    position: relative;
  `;

  const placeholder = document.createElement('div');
  placeholder.className = 'placeholder';
  placeholder.textContent = 'hello NeuroBean';
  placeholder.style.cssText = `
    color: #CD9800;
    font-size: 2rem;
    text-align: center;
    margin: auto;
    pointer-events: none;
    position: absolute;
    top: 40%;
    left: 0;
    right: 0;
  `;
  chatBox.appendChild(placeholder);

  const templateBox = document.createElement('div');
  templateBox.className = 'template-box';
  templateBox.style.cssText = `
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    gap: 0.5rem;
    margin-bottom: 1rem;
    padding: 0.5rem 0.25rem;
    scroll-snap-type: x mandatory;
  `;

  const templates = ['tokenomics', 'Roadmap', 'help me analysis BTC'];
  const input = document.createElement('input');
  const button = document.createElement('button');

  templates.forEach(templateText => {
    const btn = document.createElement('button');
    btn.textContent = templateText;
    btn.style.cssText = `
      flex: 0 0 auto;
      padding: 0.5rem 1rem;
      background-color: transparent;
      border: 1px solid #CD9800;
      border-radius: 8px;
      color: #CD9800;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 500;
      scroll-snap-align: start;
    `;
    btn.onclick = () => {
      input.value = templateText;
      button.click();
    };
    templateBox.appendChild(btn);
  });

  const inputWrapper = document.createElement('div');
  inputWrapper.style.cssText = `
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
  `;

  input.type = 'text';
  input.id = 'chat-input';
  input.placeholder = 'Type your message...';
  input.style.cssText = `
    flex: 1;
    padding: 0.8rem;
    font-size: 1rem;
    border-radius: 8px;
    border: none;
    outline: none;
  `;

  button.textContent = '➤';
  button.style.cssText = `
    background-color: #F4B400;
    color: black;
    border: none;
    padding: 0.8rem 1.2rem;
    border-radius: 12px;
    font-weight: bold;
    cursor: pointer;
  `;

  button.onclick = async () => {
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    addMessage('user', text);
    chatHistory.push({ role: 'user', content: text });

    const bubble = addMessage('bot', '⏳ Satochi is thinking...');
    const response = await generateResponse();

    chatHistory.push({ role: 'bot', content: response });
    bubble.textContent = '';
    typeResponse(bubble, response);
  };

  inputWrapper.appendChild(input);
  inputWrapper.appendChild(button);
  hero.appendChild(chatBox);
  hero.appendChild(templateBox);
  hero.appendChild(inputWrapper);
  document.body.appendChild(hero);
}

function addMessage(sender, text, parseBold = false) {
  const chatBox = document.getElementById('chat-box');
  const placeholder = chatBox.querySelector('.placeholder');
  if (placeholder) placeholder.remove();

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
    background-color: ${sender === 'user' ? '#3b82f6' : '#4b5563'};
    color: white;
    word-wrap: break-word;
    line-height: 1.4;
  `;

  if (parseBold) {
    const formatted = text.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');
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
    const context = chatHistory
      .map(msg => `${msg.role === 'user' ? 'You' : 'Satochi'}: ${msg.content}`)
      .join('\n');

    const prompt = `You're Satochi Clone AI 🧠 from HelloBean. Reply in a fun, meme-style tone based on the conversation below:\n\n${context}\n\nSatochi:`;

    const reply = await handleMSG1(context);
    return reply || "Maaf, aku tidak bisa menjawab.";
  } catch (err) {
    console.error("Gemini error:", err);
    return "⚠️ Gagal menghubungi AI.";
  }
}

function typeResponse(element, text, delay = 10) {
  let i = 0;
  const interval = setInterval(() => {
    element.textContent += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(interval);
  }, delay);
}
