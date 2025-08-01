export function renderSidebar() {
  const sidebar = document.createElement('aside');
  sidebar.className = `
    w-[260px] h-screen bg-[#121212] text-white fixed top-0 left-0 z-30 
    flex flex-col justify-between p-4 border-r border-[#2A2A2A]
  `;

  // === Top Section ===
  const topContent = document.createElement('div');
  topContent.className = 'flex flex-col gap-6';

  // === New Chat Button ===
  const newAnalysisBtn = document.createElement('button');
  newAnalysisBtn.textContent = '+ New Chat';
  newAnalysisBtn.className = `
    bg-[#F4B400] text-black py-3 px-4 rounded-lg text-base font-semibold 
    hover:bg-yellow-400 transition
  `;

  newAnalysisBtn.onclick = () => {
  // Bersihkan <main> lama dan input jika ada
  const oldMain = document.querySelector('main');
  const inputBar = document.querySelector('.fixed.bottom-8');
  const bottomInfo = document.querySelector('.fixed.bottom-1');

  if (oldMain) oldMain.remove();
  if (inputBar) inputBar.remove();
  if (bottomInfo) bottomInfo.remove();

  // Render ulang tampilan awal
  import('./hero.js').then(({ renderHeroSection }) => {
    renderHeroSection();
  });
};


  // === Temple Section ===
  const templeWrapper = document.createElement('div');
  templeWrapper.className = 'flex flex-col gap-2';

  const sectionTitle = document.createElement('h3');
  sectionTitle.textContent = 'Ask Me Anything';
  sectionTitle.className = 'text-sm text-gray-400 uppercase tracking-wide mb-1';

  const chats = [
  { title: '📊 BTC Market Update', prompt: 'Analyze BTC market' },
  { title: '🧠 ETH Sentiment', prompt: 'Summarize Ethereum sentiment' },
  { title: '💡 DeFi Opportunities', prompt: 'List DeFi tokens with volume spike' },
];

  const list = document.createElement('div');
  list.className = 'flex flex-col gap-2';

  chats.forEach(item => {
  const btn = document.createElement('button');
  btn.className = 'text-left bg-[#1A1A1A] hover:bg-[#2A2A2A] p-3 rounded-md text-sm';
  btn.innerHTML = `<div class="font-semibold">${item.title}</div>`;

  btn.onclick = async () => {
    const question = item.prompt;

    const intro = document.getElementById('introWrapper');
    if (intro) intro.remove();

    const chatWindow = document.getElementById('chatWindow');
    if (!chatWindow) return;

    // === User Bubble
    const userWrap = document.createElement('div');
    userWrap.className = 'flex justify-end w-full';

    const userBubble = document.createElement('div');
    userBubble.className = `
      bg-yellow-500 text-black text-sm px-4 py-2 rounded-xl max-w-[70%]
    `;
    userBubble.textContent = question;

    userWrap.appendChild(userBubble);
    chatWindow.appendChild(userWrap);

    setTimeout(() => {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 100);

    // === AI Loading
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

    // === Get AI Response
    const response = await import('../func/handleExample.js').then(mod => mod.handleMSG1(question));
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

  list.appendChild(btn);
});


  templeWrapper.appendChild(sectionTitle);
  templeWrapper.appendChild(list);

  topContent.appendChild(newAnalysisBtn);
  topContent.appendChild(templeWrapper);

  // === Bottom: Connect Wallet ===
  const bottomContent = document.createElement('div');
  bottomContent.className = 'pt-4 border-t border-[#2A2A2A]';

  const connectBtn = document.createElement('button');
  connectBtn.textContent = 'Connect Wallet';
  connectBtn.className = `
    w-full bg-[#F4B400] hover:bg-[#2A2A2A] text-black py-3 px-4 
    rounded-md text-sm transition font-bold
  `;

  connectBtn.onclick = () => {
    alert("Wallet connect feature coming soon!");
  };

  bottomContent.appendChild(connectBtn);

  // === Gabungkan semua
  sidebar.appendChild(topContent);
  sidebar.appendChild(bottomContent);
  document.body.appendChild(sidebar);
}
