import { askGemini } from '../func/askGemini.js';
import { handleMSG1 } from '../func/handleExample.js';

const chatHistory = [];

export function renderHeroSection() {
  const existingMain = document.querySelector('main');
  if (existingMain) existingMain.remove();

  document.body.style.margin = '0';
  document.body.style.height = '100vh';
  document.body.style.overflow = 'hidden';

  const sidebar = document.querySelector('#sidebar');
  const isCollapsed = sidebar?.classList.contains('collapsed');
  const sidebarWidth = isCollapsed ? 60 : 75;

  const navbar = document.querySelector('#topbar');
  const navbarHeight = navbar?.offsetHeight || 60;

  const hero = document.createElement('main');
  hero.style.cssText = `
    margin-top: ${navbarHeight}px;
    margin-left: ${sidebarWidth}px;
    width: calc(100vw - ${sidebarWidth}px);
    height: calc(100vh - ${navbarHeight}px);
    display: flex;
    flex-direction: column;
    background-color: #1F1F1F;
    box-sizing: border-box;
    overflow: hidden;
    transition: all 0.3s ease;
    position: relative;
    z-index: 2;
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
    scrollbar-width: none;
    -ms-overflow-style: none;
  `;

  const placeholder = document.createElement('div');
  placeholder.className = 'placeholder';
  placeholder.textContent = 'Welcome to Neuro Bean Assistant';
  placeholder.style.cssText = `
  color: #CD9800;
  font-size: 2rem;
  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 0.1rem;
  pointer-events: none;
`;

const desc = document.createElement('div');
  desc.className = 'desc';
  desc.textContent = 'how can i help you today?';
  desc.style.cssText = `
  color:rgb(253, 253, 253);
  font-size: 1rem;
  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 3rem;
  pointer-events: none;
`;


  const templateBox = document.createElement('div');
  templateBox.className = 'template-box';
  templateBox.style.cssText = `
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 1rem;
    background-color: #1F1F1F;
  `;

  const templates = [
    'Explain what the LilBean project is about',
    'Who is ChatBean and what can it do?',
    "Give me today's BTC market analysis",
    'What is the roadmap for LilBean?',
    'Tell me about the utility of LilBean',
    'How does LilBean differ from other bots?'
  ];

  templates.forEach(temp => {
    const btn = document.createElement('button');
    btn.textContent = temp;
    btn.style.cssText = `
      padding: 0.75rem 1rem;
      background-color: transparent;
      border: 1px solid #CD9800;
      border-radius: 0.5rem;
      color: #CD9800;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      width: 100%;
      text-align: center;
    `;
    btn.onclick = () => {
      input.value = temp;
      sendBtn.click();
    };
    templateBox.appendChild(btn);
  });

  const inputWrapper = document.createElement('div');
  inputWrapper.style.cssText = `
    width: 100%;
    position: relative;
    padding: 1rem;
    background-color: #1F1F1F;
  `;

  const input = document.createElement('textarea');
  input.id = 'chat-input';
  input.placeholder = 'Ask anything...';
  input.style.cssText = `
    width: 100%;
    min-height: 3rem;
    max-height: 12.5rem;
    padding: 0.8rem 3rem 2.5rem 1rem;
    font-size: 1rem;
    border-radius: 0.5rem;
    border: none;
    outline: none;
    resize: none;
    overflow-y: auto;
    background-color: #2B2B2B;
    color: white;
  `;

  const sendBtn = document.createElement('button');
  sendBtn.textContent = '➤';
  sendBtn.style.cssText = `
    position: absolute;
    bottom: 1.8rem;
    right: 1.6rem;
    background-color: #F4B400;
    color: black;
    border: none;
    padding: 0.5rem 0.8rem;
    border-radius: 0.5rem;
    font-weight: bold;
    cursor: pointer;
  `;

sendBtn.onclick = async () => {
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  input.style.height = 'auto';

  // Hapus template box jika masih ada
  const templateBox = document.querySelector('.template-box');
  if (templateBox) templateBox.remove();

  // Hapus placeholder dan desc jika masih ada
  const placeholder = document.querySelector('.placeholder');
  if (placeholder) placeholder.remove();

  const desc = document.querySelector('.desc');
  if (desc) desc.remove();

  addMessage('user', text);
  chatHistory.push({ role: 'user', content: text });

  const bubble = addMessage('bot', '⏳ NeuroBean is thinking...');
  const response = await generateResponse();

  chatHistory.push({ role: 'bot', content: response });
  typeResponse(bubble, response, true);
};



  inputWrapper.appendChild(input);
  inputWrapper.appendChild(sendBtn);

  hero.appendChild(chatBox);
  hero.appendChild(placeholder);
  hero.appendChild(desc);
  hero.appendChild(templateBox);
  hero.appendChild(inputWrapper);
  document.body.appendChild(hero);
}

// Helper functions remain unchanged
function addMessage(sender, text, parseBold = false) {
  const chatBox = document.getElementById('chat-box');
  const placeholder = chatBox.querySelector('.placeholder');
  if (placeholder) placeholder.remove();

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
    border-radius: 0.75rem;
    background-color: ${sender === 'user' ? '#2B2B2B' : 'transparent'};
    color: white;
    line-height: 1.4;
  `;

  if (parseBold) {
    bubble.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
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
    const context = lastMessage.map(msg => `${msg.role === 'user' ? 'You' : 'NeuroBean'}: ${msg.content}`).join('\n');
    const reply = await handleMSG1(context);
    return reply || "Sorry NeuroBean Error";
  } catch (err) {
    console.error("Gemini error:", err);
    return "Error Call NeuroBean";
  }
}

function typeResponse(element, text, parseBold = false, delay = 10) {
  let i = 0;
  let targetText = parseBold ? text.replace(/\*\*(.*?)\*\*/g, (_, p1) => `<strong>${p1}</strong>`) : text;
  if (parseBold) element.innerHTML = ''; else element.textContent = '';

  const interval = setInterval(() => {
    if (parseBold) element.innerHTML = targetText.slice(0, i + 1);
    else element.textContent += text.charAt(i);

    i++;
    if (i >= targetText.length) clearInterval(interval);
  }, delay);
}
