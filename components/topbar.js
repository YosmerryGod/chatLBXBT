import { getTopGainers } from '../func/topGainer.js';

export async function renderTopbar() {
  const topbar = document.createElement('div');
  topbar.className = `
    fixed top-0 left-[260px] right-0 h-[48px] bg-[#0A0A0A] text-sm text-gray-300 
    flex items-center z-40 border-b border-[#2A2A2A] font-medium overflow-hidden
  `;

  const wrapper = document.createElement('div');
  wrapper.className = 'relative w-full h-full flex items-center overflow-hidden';

  const marquee = document.createElement('div');
marquee.className = `
  flex gap-8 items-center whitespace-nowrap animate-scroll
`;

  marquee.style.animation = 'scroll-left 60s linear infinite';

  // 🔄 Ambil top gainers dari Binance
  const topGainers = await getTopGainers();

  // 🔥 Tampilkan berulang 3x agar scroll panjang
  for (let i = 0; i < 3; i++) {
    const prefix = document.createElement('span');
    prefix.className = 'text-orange-400';
    prefix.textContent = '🔥 Trending:';
    marquee.appendChild(prefix);

    topGainers.forEach(item => {
  const span = document.createElement('span');
  span.className = parseFloat(item.changePercent) >= 0 ? 'text-green-400 cursor-pointer hover:underline' : 'text-red-400 cursor-pointer hover:underline';
  span.textContent = `${item.symbol} ${item.changePercent > 0 ? '+' : ''}${item.changePercent}%`;

  span.onclick = async () => {
    const chatWindow = document.getElementById('chatWindow');
    if (!chatWindow) return;

    const question = `Analyze ${item.symbol} market`;

    // Remove intro if still there
    const intro = document.getElementById('introWrapper');
    if (intro) intro.remove();

    // === User bubble
    const userWrap = document.createElement('div');
    userWrap.className = 'flex justify-end w-full';
    const userBubble = document.createElement('div');
    userBubble.className = 'bg-yellow-500 text-black text-sm px-4 py-2 rounded-xl max-w-[70%]';
    userBubble.textContent = question;
    userWrap.appendChild(userBubble);
    chatWindow.appendChild(userWrap);

    setTimeout(() => {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 100);

    // === AI loading
    const aiLoadingWrap = document.createElement('div');
    aiLoadingWrap.className = 'flex justify-start w-full';
    const loadingBubble = document.createElement('div');
    loadingBubble.className = 'bg-[#2A2A2A] text-gray-400 italic text-sm px-4 py-2 rounded-xl max-w-[70%]';
    loadingBubble.innerHTML = `
      <div class="flex items-center gap-2">
        <img src="./assets/logo.webp" alt="LBXBT" class="w-6 h-6 rounded-full" />
        <span>LBXBT is thinking...</span>
      </div>
    `;
    aiLoadingWrap.appendChild(loadingBubble);
    chatWindow.appendChild(aiLoadingWrap);

    const { handleMSG1 } = await import('../func/handleExample.js');
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

  marquee.appendChild(span);
});

  }

  wrapper.appendChild(marquee);
  topbar.appendChild(wrapper);
  document.body.appendChild(topbar);

  // Inject style animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes scroll-left {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-100%); }
    }

    .animate-scroll {
      animation: scroll-left 60s linear infinite;
    }
    .group:hover .animate-scroll {
      animation-play-state: paused;
    }
  `;
  document.head.appendChild(style);
}
