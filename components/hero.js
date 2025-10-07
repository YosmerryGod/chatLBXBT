import { handleMSG1, handleMessage0 } from '../func/handleExample.js';

export function renderHeroSection() {
  const isMobile = window.innerWidth < 768;
  const leftMargin = isMobile ? 'ml-6' : 'ml-[260px]';

  const inputLeft = isMobile ? 'left-14' : 'left-[260px]';

  const oldMain = document.querySelector('main');
  if (oldMain) oldMain.remove();

  const main = document.createElement('main');
  main.className = `
    ${leftMargin} min-h-screen bg-[#1F1F1F] text-white 
    px-6 pt-[80px] flex flex-col items-center justify-start gap-4
  `;

  const introWrapper = document.createElement('div');
  introWrapper.id = 'introWrapper';
  introWrapper.className = 'flex flex-col items-center justify-center gap-4';

  const logoImg = document.createElement('img');
  logoImg.src = './assets/logo.webp';
  logoImg.alt = 'LBXBT Logo';
  logoImg.className = 'w-28 h-28 rounded-full object-cover shadow-lg';

  const headline = document.createElement('h1');
  headline.textContent = 'Welcome to LBXBT AI';
  headline.className = 'text-4xl font-bold text-white text-center mt-4';

  const subText = document.createElement('p');
  subText.textContent = 'Your advanced BSC token analysis platform powered by AI';
  subText.className = 'text-gray-400 text-center max-w-md';

  introWrapper.appendChild(logoImg);
  introWrapper.appendChild(headline);
  introWrapper.appendChild(subText);

  const chatWindow = document.createElement('div');
  chatWindow.id = 'chatWindow';
  chatWindow.className = `
    flex flex-col w-full max-w-full px-6 py-6 space-y-4 mb-36 overflow-y-auto
  `;
  chatWindow.style.maxHeight = 'calc(100vh - 180px)';

  // Tambahkan welcome message dari AI
  const showWelcomeMessage = () => {
    const welcomeText = `Hello! 👋

I am LBXBT AI, your professional BSC token analysis assistant.

🔍 **My Capabilities:**
• Advanced market analysis and insights
• Real-time token performance tracking
• Technical analysis and trend predictions
• Risk assessment and due diligence

🚀 **Latest Update:**
We've just launched our official token on four.meme!

**Contract Address:**
0xcb4c7c13693928ef2d9f22610d8e0f12f3154444

**Official Link:**
https://four.meme/token/0xcb4c7c13693928ef2d9f22610d8e0f12f3154444

How can I assist you with your BSC token analysis today?`;

    const aiWrap = document.createElement('div');
    aiWrap.className = 'flex justify-start w-full items-start gap-2';

    const avatar = document.createElement('img');
    avatar.src = './assets/logo.webp';
    avatar.alt = 'LBXBT';
    avatar.className = 'w-10 h-10 rounded-full mt-1';

    const aiBubble = document.createElement('div');
    aiBubble.className = `
      bg-[#2A2A2A] text-yellow-400 text-sm px-4 py-2 rounded-xl max-w-[70%] whitespace-pre-wrap overflow-y-auto max-h-[400px]
    `;
    aiBubble.innerHTML = '';

    aiWrap.appendChild(avatar);
    aiWrap.appendChild(aiBubble);
    chatWindow.appendChild(aiWrap);

    // Typing effect untuk welcome message
    let i = 0;
    const typingInterval = setInterval(() => {
      aiBubble.innerHTML += welcomeText[i];
      i++;
      chatWindow.scrollTop = chatWindow.scrollHeight;
      if (i >= welcomeText.length) clearInterval(typingInterval);
    }, 10);
  };

  // Tampilkan welcome message setelah 500ms
  setTimeout(() => {
    showWelcomeMessage();
  }, 500);

  const inputWrapper = document.createElement('div');
  inputWrapper.className = `
    fixed bottom-8 ${inputLeft} right-4 flex items-center gap-2 bg-[#121212]
    border border-[#333] rounded-lg px-4 py-3 z-40 max-w-4xl mx-auto
  `;

  const input = document.createElement('textarea');
  input.rows = 1;
  input.className = `
    flex-1 resize-none overflow-hidden bg-transparent text-white 
    placeholder-gray-500 text-sm focus:outline-none
  `;
  input.placeholder = 'Ask LBXBT AI to analyze any BSC token...';

  const maxHeight = 200;
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    const newHeight = Math.min(input.scrollHeight, maxHeight);
    input.style.height = newHeight + 'px';
    input.style.overflowY = (input.scrollHeight > maxHeight) ? 'auto' : 'hidden';
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitBtn.click();
    }
  });

  const submitBtn = document.createElement('button');
  submitBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 bg-yellow-400 rounded-full p-2 hover:bg-yellow-500 transition" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="10,8 16,12 10,16" fill="none" />
    </svg>
  `;
  submitBtn.className = 'hover:scale-110 transition';

  submitBtn.onclick = async () => {
    const question = input.value.trim();
    if (!question) return;

    const intro = document.getElementById('introWrapper');
    if (intro) intro.remove();

    const userWrap = document.createElement('div');
    userWrap.className = 'flex justify-end w-full';

    const userBubble = document.createElement('div');
    userBubble.className = `
      bg-yellow-500 text-black text-sm px-4 py-2 rounded-xl max-w-[70%]
    `;
    userBubble.textContent = question;

    userWrap.appendChild(userBubble);
    chatWindow.appendChild(userWrap);
    input.value = '';
    input.style.height = 'auto';

    setTimeout(() => {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 100);

    const aiLoadingWrap = document.createElement('div');
    aiLoadingWrap.className = 'flex justify-start w-full';

    const loadingBubble = document.createElement('div');
    loadingBubble.className = `
      bg-[#2A2A2A] text-gray-400 italic text-sm px-4 py-2 rounded-xl max-w-[70%]
    `;
    loadingBubble.innerHTML = `
      <div class="flex items-center gap-2">
        <img src="./assets/logo.webp" alt="LBXBT" class="w-6 h-6 rounded-full" />
        <span>LBXBT is thinking...</span>
      </div>
    `;

    aiLoadingWrap.appendChild(loadingBubble);
    chatWindow.appendChild(aiLoadingWrap);

    setTimeout(() => {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 100);

    const response = await handleMSG1(question);
    aiLoadingWrap.remove();

    const aiWrap = document.createElement('div');
    aiWrap.className = 'flex justify-start w-full items-start gap-2';

    const avatar = document.createElement('img');
    avatar.src = './assets/logo.webp';
    avatar.alt = 'LBXBT';
    avatar.className = 'w-10 h-10 rounded-full mt-1';

    const aiBubble = document.createElement('div');
    aiBubble.className = `
      bg-[#2A2A2A] text-yellow-400 text-sm px-4 py-2 rounded-xl max-w-[70%] whitespace-pre-wrap overflow-y-auto max-h-[300px]
    `;
    aiBubble.innerHTML = '';

    aiWrap.appendChild(avatar);
    aiWrap.appendChild(aiBubble);
    chatWindow.appendChild(aiWrap);

    let i = 0;
    const typingInterval = setInterval(() => {
      aiBubble.innerHTML += response[i];
      i++;
      chatWindow.scrollTop = chatWindow.scrollHeight;
      if (i >= response.length) clearInterval(typingInterval);
    }, 5);
  };

  inputWrapper.appendChild(input);
  inputWrapper.appendChild(submitBtn);

  const bottomInfo = document.createElement('div');
  bottomInfo.className = `
    fixed bottom-1 ${inputLeft} right-4 text-center text-gray-500 text-xs z-30
  `;
  bottomInfo.textContent = 'LBXBT AI can analyze BSC tokens, provide market insights, and technical analysis.';

  main.appendChild(introWrapper);
  main.appendChild(chatWindow);
  document.body.appendChild(main);
  document.body.appendChild(inputWrapper);
  document.body.appendChild(bottomInfo);
}

