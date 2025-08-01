import { renderHeroSection } from './hero.js';

export function renderNavbar() {
  let sidebarExpanded = false;

  // === Sidebar ===
  const sidebar = document.createElement('aside');
  sidebar.id = 'sidebar';
  sidebar.className = `
    w-18 h-screen bg-[#121212] fixed top-0 left-0 z-20 border-r border-[#333]
    flex flex-col pt-[2.5dvh] items-start gap-8 transition-all duration-300 ease-in-out
  `;

  // === Logo Row ===
  const logoRow = document.createElement('div');
  logoRow.className = 'w-full flex justify-between items-center px-4 relative';

  const logoContainer = document.createElement('div');
  logoContainer.className = 'w-9 h-9 relative';

  const logoImg = document.createElement('img');
  logoImg.src = './assets/logo.png';
  logoImg.className = 'w-full h-full rounded-full absolute top-0 left-0 cursor-pointer z-[1] transition-opacity duration-200';

  const hamburgerIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  hamburgerIcon.setAttribute("viewBox", "0 0 24 24");
  hamburgerIcon.setAttribute("fill", "none");
  hamburgerIcon.setAttribute("stroke", "#F4B400");
  hamburgerIcon.setAttribute("stroke-width", "2");
  hamburgerIcon.setAttribute("stroke-linecap", "round");
  hamburgerIcon.setAttribute("stroke-linejoin", "round");
  hamburgerIcon.innerHTML = `
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  `;
  hamburgerIcon.classList.add('w-9', 'h-9', 'absolute', 'top-0', 'left-0', 'cursor-pointer', 'z-[2]', 'opacity-0', 'pointer-events-none', 'transition-opacity', 'duration-200');

  logoContainer.appendChild(logoImg);
  logoContainer.appendChild(hamburgerIcon);

  const closeBtn = document.createElement('span');
  closeBtn.textContent = '✕';
  closeBtn.className = 'text-[#F4B400] text-xl font-bold cursor-pointer hidden';
  closeBtn.onclick = () => toggleSidebar();

  logoRow.appendChild(logoContainer);
  logoRow.appendChild(closeBtn);
  sidebar.appendChild(logoRow);

  logoContainer.onmouseenter = () => {
    if (!sidebarExpanded) {
      logoImg.style.opacity = '0';
      hamburgerIcon.style.opacity = '1';
    }
  };
  logoContainer.onmouseleave = () => {
    if (!sidebarExpanded) {
      logoImg.style.opacity = '1';
      hamburgerIcon.style.opacity = '0';
    }
  };

  logoContainer.onclick = () => {
    if (!sidebarExpanded) {
      toggleSidebar();
    } else {
      window.open('https://lilbean.fun', '_blank');
    }
  };

  function createIcon(svgPath) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "#F4B400");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.innerHTML = svgPath;
    svg.classList.add('w-6', 'h-6', 'cursor-pointer', 'opacity-85', 'hover:scale-125', 'hover:opacity-100', 'transition-all', 'duration-200');
    return svg;
  }

  function createSidebarItem(icon, labelText) {
    const wrapper = document.createElement('div');
    wrapper.className = 'flex items-center gap-3 w-full pl-4';

    const label = document.createElement('span');
    label.textContent = labelText;
    label.className = 'text-[#F4B400] text-sm font-medium whitespace-nowrap hidden';

    wrapper.appendChild(icon);
    wrapper.appendChild(label);
    wrapper.label = label;
    return wrapper;
  }

  const newChat = createSidebarItem(createIcon(`<path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />`), "New Chat");
  newChat.addEventListener('click', () => {
    const main = document.querySelector('main');
    if (main) main.remove();
    renderHeroSection();
  });

  const search = createSidebarItem(createIcon(`<circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />`), "Search Chat");

  sidebar.appendChild(newChat);
  sidebar.appendChild(search);
  document.body.appendChild(sidebar);

  // === Topbar ===
  const topbar = document.createElement('nav');
  topbar.id = 'topbar';
  topbar.className = `
    h-[10dvh] w-[calc(100%-4rem)] bg-transparent text-[#F4B400] fixed top-0 left-[4rem] z-30
    flex items-center justify-between px-4 shadow-sm font-sans transition-all duration-300
  `;

  const leftWrapper = document.createElement('div');
  leftWrapper.className = 'flex items-center gap-2 relative';

  const appTitle = document.createElement('span');
  appTitle.textContent = 'neuroBean 1.0';
  appTitle.className = 'font-bold text-xl text-[#F4B400]';

  const dropdownIcon = document.createElement('span');
  dropdownIcon.textContent = '▼';
  dropdownIcon.className = 'text-xs cursor-pointer pt-[2px] transition-transform duration-200';
  dropdownIcon.onmouseenter = () => dropdownIcon.style.transform = 'rotate(180deg)';
  dropdownIcon.onmouseleave = () => dropdownIcon.style.transform = 'rotate(0deg)';

  const dropdownMenu = document.createElement('div');
  dropdownMenu.className = `
    absolute top-10 left-4 w-[220px] bg-[#111] border border-[#444] rounded-lg
    p-3 z-50 hidden flex-col shadow-lg
  `;

  const options = [
    { label: 'NeuroBean 1.0', active: true },
    { label: 'NeuroBean 1.0 Plus', active: false },
    { label: 'NeuroBean 2.0', active: false },
  ];

  options.forEach(opt => {
    const item = document.createElement('div');
    item.innerHTML = opt.active
      ? opt.label
      : `<span>${opt.label}</span><span class='text-xs text-[#888] float-right'>soon</span>`;
    item.className = `
      px-4 py-2 ${opt.active ? 'text-[#F4B400] font-bold cursor-pointer hover:bg-[#222]' : 'text-[#777]'}
      text-sm transition-colors
    `;
    if (opt.active) {
      item.onclick = () => {
        appTitle.textContent = opt.label;
        dropdownMenu.style.display = 'none';
      };
    }
    dropdownMenu.appendChild(item);
  });

  leftWrapper.appendChild(appTitle);
  leftWrapper.appendChild(dropdownIcon);
  leftWrapper.appendChild(dropdownMenu);

  dropdownIcon.onclick = () => {
    dropdownMenu.style.display = dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
  };

  const incognitoIcon = createIcon(`
    <path d="M9 9l-1-2h8l-1 2" />
    <circle cx="9" cy="13" r="2" />
    <circle cx="15" cy="13" r="2" />
  `);
  incognitoIcon.classList.add('w-10', 'h-10', 'ml-4');

  topbar.appendChild(leftWrapper);
  topbar.appendChild(incognitoIcon);
  document.body.appendChild(topbar);

  function toggleSidebar() {
    sidebarExpanded = !sidebarExpanded;
    sidebar.classList.toggle('w-60');
    sidebar.classList.toggle('w-18');
    closeBtn.classList.toggle('hidden');
    topbar.style.left = sidebarExpanded ? '15rem' : '4rem';
    topbar.style.width = sidebarExpanded ? 'calc(100% - 15rem)' : 'calc(100% - 4rem)';

    [newChat, search].forEach(item => {
      item.label.classList.toggle('inline', sidebarExpanded);
      item.label.classList.toggle('hidden', !sidebarExpanded);
    });
  }
}
