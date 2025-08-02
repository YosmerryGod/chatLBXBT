export function renderSidebar() {
  const isMobile = window.innerWidth < 768;

  // === Overlay untuk mobile ===
  const overlay = document.createElement('div');
  overlay.id = 'sidebarOverlay';
  overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-40 hidden';
  document.body.appendChild(overlay);

  // === SIDEBAR DEKSTOP (>=768px) ===
  if (!isMobile) {
    const sidebar = document.createElement('aside');
    sidebar.className = `
      w-[260px] h-screen bg-[#121212] text-white fixed top-0 left-0 z-30 
      flex flex-col justify-between p-4 border-r border-[#2A2A2A]
    `;

    const topContent = document.createElement('div');
    topContent.className = 'flex flex-col gap-6';

    const newAnalysisBtn = document.createElement('button');
    newAnalysisBtn.textContent = '+ New Chat';
    newAnalysisBtn.className = `
      bg-[#F4B400] text-black py-3 px-4 rounded-lg text-base font-semibold 
      hover:bg-yellow-400 transition
    `;
    newAnalysisBtn.onclick = () => {
      const oldMain = document.querySelector('main');
      const inputBar = document.querySelector('.fixed.bottom-8');
      const bottomInfo = document.querySelector('.fixed.bottom-1');

      if (oldMain) oldMain.remove();
      if (inputBar) inputBar.remove();
      if (bottomInfo) bottomInfo.remove();

      import('./hero.js').then(({ renderHeroSection }) => {
        renderHeroSection();
      });
    };

    const chats = [
  {
    title: '📘 About LBXBT Project',
    prompt: 'Provide a professional overview of the LBXBT project, including its vision and core features.'
  },
  {
    title: '📊 LBXBT Tokenomics',
    prompt: 'Explain the tokenomics of LBXBT, including total supply, distribution model, and utility.'
  },
  {
    title: '🛣️ LBXBT Roadmap',
    prompt: 'Present the official development roadmap of the LBXBT project with major milestones.'
  },
  {
    title: '📈 Analyze BTC/USDT Market',
    prompt: 'Perform a technical and sentiment analysis of the BTCUSDT trading pair.'
  },
  {
    title: '🤖 AI Agent Capabilities',
    prompt: 'Describe the AI Agent integrated in LBXBT, including its use cases and how it assists users.'
  }
];


    const templeWrapper = document.createElement('div');
    templeWrapper.className = 'flex flex-col gap-2';

    const sectionTitle = document.createElement('h3');
    sectionTitle.textContent = 'Ask Me Anything';
    sectionTitle.className = 'text-sm text-gray-400 uppercase tracking-wide mb-1';

    const list = document.createElement('div');
    list.className = 'flex flex-col gap-2';

    chats.forEach(item => {
      const btn = document.createElement('button');
      btn.className = 'text-left bg-[#1A1A1A] hover:bg-[#2A2A2A] p-3 rounded-md text-sm';
      btn.innerHTML = `<div class="font-semibold">${item.title}</div>`;
      btn.onclick = () => handleExampleChat(item.prompt);
      list.appendChild(btn);
    });

    templeWrapper.appendChild(sectionTitle);
    templeWrapper.appendChild(list);
    topContent.appendChild(newAnalysisBtn);
    topContent.appendChild(templeWrapper);

    const bottomContent = document.createElement('div');
    bottomContent.className = 'pt-4 border-t border-[#2A2A2A]';

    const connectBtn = document.createElement('button');
    connectBtn.textContent = 'Connect Wallet';
    connectBtn.className = `
      w-full bg-[#F4B400] hover:bg-[#2A2A2A] text-black py-3 px-4 
      rounded-md text-sm transition font-bold
    `;
    connectBtn.onclick = () => alert("Wallet connect feature coming soon!");

    bottomContent.appendChild(connectBtn);
    sidebar.appendChild(topContent);
    sidebar.appendChild(bottomContent);
    document.body.appendChild(sidebar);
  }

  // === SIDEBAR MOBILE (<768px) ===
else {
  // Sidebar Mini (lebih kecil, center icon)
  const sidebarMini = document.createElement('div');
  sidebarMini.className = `
    fixed top-0 left-0 h-screen w-12 bg-[#121212] text-white z-50 
    flex flex-col justify-between items-center py-4
  `;

  const hamburgerBtn = document.createElement('button');
  hamburgerBtn.innerHTML = '☰';
  hamburgerBtn.className = `
    bg-[#F4B400] text-black w-8 h-8 text-base font-bold 
    rounded-md flex items-center justify-center mx-auto
  `;
  sidebarMini.appendChild(hamburgerBtn);

  const walletBtn = document.createElement('button');
  walletBtn.innerHTML = `
  <img src="./assets/wallet.webp" alt="Wallet Icon" class="w-5 h-5 object-contain filter brightness-0" />
`;

walletBtn.className = `
  bg-[#F4B400] w-8 h-8 rounded-md 
  flex items-center justify-center mx-auto
`;


  walletBtn.onclick = () => alert("Wallet connect feature coming soon!");
  sidebarMini.appendChild(walletBtn);

  document.body.appendChild(sidebarMini);

  // Sidebar Besar (slide-in)
  const sidebarFull = document.createElement('aside');
  sidebarFull.className = `
    fixed top-0 left-0 h-screen w-[220px] bg-[#121212] text-white z-50 
    transform translate-x-[-100%] transition-transform duration-300 ease-in-out 
    flex flex-col justify-between p-4 border-r border-[#2A2A2A]
  `;

  const topContent = document.createElement('div');
  topContent.className = 'flex flex-col gap-6';

  const newAnalysisBtn = document.createElement('button');
  newAnalysisBtn.textContent = '+ New Chat';
  newAnalysisBtn.className = `
    bg-[#F4B400] text-black py-3 px-4 rounded-md text-base font-semibold 
    hover:bg-yellow-400 transition
  `;
  newAnalysisBtn.onclick = () => {
    import('./hero.js').then(({ renderHeroSection }) => {
      renderHeroSection();
      sidebarFull.classList.add('translate-x-[-100%]');
      overlay.classList.add('hidden');
    });
  };

  const chats = [
  {
    title: '📘 About LBXBT Project',
    prompt: 'Provide a professional overview of the LBXBT project, including its vision and core features.'
  },
  {
    title: '📊 LBXBT Tokenomics',
    prompt: 'Explain the tokenomics of LBXBT, including total supply, distribution model, and utility.'
  },
  {
    title: '🛣️ LBXBT Roadmap',
    prompt: 'Present the official development roadmap of the LBXBT project with major milestones.'
  },
  {
    title: '📈 Analyze BTC/USDT Market',
    prompt: 'Perform a technical and sentiment analysis of the BTCUSDT trading pair.'
  },
  {
    title: '🤖 AI Agent Capabilities',
    prompt: 'Describe the AI Agent integrated in LBXBT, including its use cases and how it assists users.'
  }
];


  const templeWrapper = document.createElement('div');
  templeWrapper.className = 'flex flex-col gap-2';

  const sectionTitle = document.createElement('h3');
  sectionTitle.textContent = 'Ask Me Anything';
  sectionTitle.className = 'text-sm text-gray-400 uppercase tracking-wide mb-1';

  const list = document.createElement('div');
  list.className = 'flex flex-col gap-2';

  chats.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'text-left bg-[#1A1A1A] hover:bg-[#2A2A2A] p-3 rounded-md text-sm';
    btn.innerHTML = `<div class="font-semibold">${item.title}</div>`;
    btn.onclick = () => {
      handleExampleChat(item.prompt);
      sidebarFull.classList.add('translate-x-[-100%]');
      overlay.classList.add('hidden');
    };
    list.appendChild(btn);
  });

  templeWrapper.appendChild(sectionTitle);
  templeWrapper.appendChild(list);
  topContent.appendChild(newAnalysisBtn);
  topContent.appendChild(templeWrapper);

  const bottomContent = document.createElement('div');
  bottomContent.className = 'pt-4 border-t border-[#2A2A2A]';

  const connectBtn = document.createElement('button');
  connectBtn.textContent = 'Connect Wallet';
  connectBtn.className = `
    w-full bg-[#F4B400] hover:bg-[#2A2A2A] text-black py-3 px-4 
    rounded-md text-sm transition font-bold
  `;
  connectBtn.onclick = () => alert("Wallet connect feature coming soon!");

  bottomContent.appendChild(connectBtn);
  sidebarFull.appendChild(topContent);
  sidebarFull.appendChild(bottomContent);
  document.body.appendChild(sidebarFull);

  // Tampilkan / Sembunyikan sidebar besar
  hamburgerBtn.onclick = () => {
    sidebarFull.classList.remove('translate-x-[-100%]');
    overlay.classList.remove('hidden');
  };

  overlay.onclick = () => {
    sidebarFull.classList.add('translate-x-[-100%]');
    overlay.classList.add('hidden');
  };
}



  // === Reusable Chat Handler ===
  async function handleExampleChat(promptText) {
    const chatWindow = document.getElementById('chatWindow');
    if (!chatWindow) return;

    const intro = document.getElementById('introWrapper');
    if (intro) intro.remove();

    const userWrap = document.createElement('div');
    userWrap.className = 'flex justify-end w-full';

    const userBubble = document.createElement('div');
    userBubble.className = 'bg-yellow-500 text-black text-sm px-4 py-2 rounded-xl max-w-[70%]';
    userBubble.textContent = promptText;

    userWrap.appendChild(userBubble);
    chatWindow.appendChild(userWrap);

    const loadingWrap = document.createElement('div');
    loadingWrap.className = 'flex justify-start w-full';

    const loadingBubble = document.createElement('div');
    loadingBubble.className = 'bg-[#2A2A2A] text-gray-400 italic text-sm px-4 py-2 rounded-xl max-w-[70%]';
    loadingBubble.innerHTML = `
      <div class="flex items-center gap-2">
        <img src="./assets/logo.webp" alt="LBXBT" class="w-6 h-6 rounded-full" />
        <span>LBXBT is thinking...</span>
      </div>
    `;

    loadingWrap.appendChild(loadingBubble);
    chatWindow.appendChild(loadingWrap);

    const response = await import('../func/handleExample.js').then(m => m.handleMSG1(promptText));
    loadingWrap.remove();

    const aiWrap = document.createElement('div');
    aiWrap.className = 'flex justify-start w-full items-start gap-2';

    const avatar = document.createElement('img');
    avatar.src = './assets/logo.webp';
    avatar.alt = 'LBXBT';
    avatar.className = 'w-10 h-10 rounded-full mt-1';

    const aiBubble = document.createElement('div');
    aiBubble.className = 'bg-[#2A2A2A] text-yellow-400 text-sm px-4 py-2 rounded-xl max-w-[70%] whitespace-pre-wrap overflow-y-auto max-h-[300px]';

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
  }
}
