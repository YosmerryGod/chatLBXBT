// Navbar + Sidebar AI-Futuristic
import { renderHeroMobile } from './heroMobile.js';

function handleNewChatClick() {
  const main = document.querySelector('main');
  if (main) main.remove();
  renderHeroMobile(); // atau fungsi apapun yang kamu pakai untuk reset tampilan
}

export function renderNavbarMobile() {
  // === SIDEBAR ===
  const sidebar = document.createElement('div');
  sidebar.id = 'sidebar';
  sidebar.style.cssText = `
    position: fixed;
    top: 0;
    left: -60%;
    width: 60%;
    height: 100vh;
    background: rgba(31, 31, 31, 0.97);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    padding: 1.5rem 1rem;
    z-index: 102;
    transition: left 0.3s ease;
    color: #F4B400;
    box-shadow: 4px 0 12px rgba(0,0,0,0.3);
  `;

  const overlay = document.createElement('div');
  overlay.id = 'overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.4);
    z-index: 99;
    display: none;
  `;
  overlay.onclick = () => toggleSidebar(false);
  document.body.appendChild(overlay);

  const toggleSidebar = (show) => {
    sidebar.style.left = show ? '0' : '-60%';
    overlay.style.display = show ? 'block' : 'none';
  };

  // === SIDEBAR HEADER ===
  const sidebarHeader = document.createElement('div');
  sidebarHeader.style.cssText = `
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  `;

  const logo = document.createElement('img');
  logo.src = '../assets/logo.png';
  logo.style.cssText = `height: 9vw; width: 9vw; border-radius: 50%;`;

  const closeBtn = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  closeBtn.setAttribute("viewBox", "0 0 24 24");
  closeBtn.style.cssText = `width: 6vw; height: 6vw; cursor: pointer; stroke: #F4B400; fill: none; stroke-width: 2;`;
  closeBtn.innerHTML = `
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  `;
  closeBtn.onclick = () => toggleSidebar(false);

  sidebarHeader.appendChild(logo);
  sidebarHeader.appendChild(closeBtn);

  const createSidebarItem = (iconSVG, labelText, onClick) => {
    const item = document.createElement('div');
    item.style.cssText = `
  display: flex;
  align-items: center;
  gap: 1vw;
  margin: 1.2rem 0;
  cursor: pointer;
  padding-left: 1rem;         /* ➕ Tambah jarak dari kiri */
  font-size: 2rem;          /* 🔍 Perbesar teks */
  font-weight: 500;
`;

    item.innerHTML = `
      ${iconSVG} <span>${labelText}</span>
    `;
    item.onclick = onClick;
    return item;
  };

  const newChatItem = createSidebarItem(`
    <svg viewBox="0 0 24 24" width="6vw" height="6vw" fill="none" stroke="#F4B400" stroke-width="2">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>`,
    "Start New Chat", () => {
      toggleSidebar(false);
      handleNewChatClick();
    }
  );

  const searchItem = createSidebarItem(`
    <svg viewBox="0 0 24 24" width="6vw" height="6vw" fill="none" stroke="#F4B400" stroke-width="2">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>`,
    "Find a Chat", () => {}
  );

  const socialBox = document.createElement('div');
  socialBox.style.cssText = `
    position: absolute;
    bottom: 3vh;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding-top: 1rem;
    border-top: 1px solid #555;
    gap: 2vw;
  `;
  socialBox.innerHTML = `
    <a href="https://linktr.ee/lilbeanfun" target="_blank"><svg viewBox='0 0 24 24' width='6vw' height='6vw' stroke='#F4B400' fill='none' stroke-width='2'><circle cx='12' cy='12' r='10'></circle><line x1='2' y1='12' x2='22' y2='12'></line><path d='M12 2a15.3 15.3 0 0 1 0 20'></path><path d='M12 2a15.3 15.3 0 0 0 0 20'></path></svg></a>
    <a href="https://twitter.com/lilbeanBSC" target="_blank"><svg viewBox="0 0 120 120" width="6vw" height="6vw" fill="#F4B400"><path d="M0 0 L45 0 L75 45 L120 0 L120 30 L90 60 L120 120 L75 120 L45 75 L0 120 L0 90 L30 60 L0 0 Z" /></svg></a>
    <a href="https://t.me/lilbeanfun" target="_blank"><svg viewBox="0 0 24 24" width="6vw" height="6vw" fill="none" stroke="#F4B400" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4L12 14.01l-3-3L2 12l20-8z" /><path d="M12 14.01L12 22" /></svg></a>
  `;

  sidebar.appendChild(sidebarHeader);
  sidebar.appendChild(newChatItem);
  sidebar.appendChild(searchItem);
  sidebar.appendChild(socialBox);
  document.body.appendChild(sidebar);

  // === NAVBAR ===
  const navbar = document.createElement('nav');
  navbar.style.cssText = `
    width: 100%;
    height: 15vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 101;
    background-color: transparent;
  `;

  const hamburgerBtn = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  hamburgerBtn.setAttribute("viewBox", "0 0 24 24");
  hamburgerBtn.style.cssText = `width: 7vw; height: 7vw; cursor: pointer; stroke: #F4B400; fill: none; stroke-width: 2;`;
  hamburgerBtn.innerHTML = `<line x1="3" y1="7" x2="21" y2="7"></line><line x1="3" y1="17" x2="21" y2="17"></line>`;
  hamburgerBtn.onclick = () => toggleSidebar(true);

  const centerBox = document.createElement('div');
  centerBox.style.cssText = `display: flex; align-items: center; gap: 0.8vw; font-size: 4vw; font-weight: bold; cursor: pointer;`;

  const title = document.createElement('span');
  title.textContent = 'NeuroBean ';
  title.style.color = '#F4B400';

  const version = document.createElement('span');
  version.textContent = '1.0';
  version.style.color = '#C49000';

  const dropdownArrow = document.createElement('span');
  dropdownArrow.innerHTML = '&#9660;';
  dropdownArrow.style.cssText = `font-size: 4vw; color: #C49000;`;

  centerBox.appendChild(title);
  centerBox.appendChild(version);
  centerBox.appendChild(dropdownArrow);

  // === DROPDOWN ===
  const versionDropdown = document.createElement('div');
  versionDropdown.style.cssText = `
    position: absolute;
    top: 14dvw;
    left: 50%;
    transform: translateX(-50%);
    background-color: #1F1F1F;
    border: 1px solid #444;
    border-radius: 0.5rem;
    padding: 1vw 0;
    z-index: 200;
    display: none;
    flex-direction: column;
    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    width: 70vw;
  `;

  const versionOptions = [
    { text: 'NeuroBean 1.0', active: true },
    { text: 'NeuroBean 1.0 Plus', active: false },
    { text: 'NeuroBean 2.0', active: false }
  ];

  versionOptions.forEach(({ text, active }) => {
    const item = document.createElement('div');
    item.innerHTML = active
      ? `<span>${text}</span>`
      : `<span>${text}</span><span style="font-size: 3vw; color: #888;">soon</span>`;
    item.style.cssText = `
      display: flex;
      justify-content: space-between;
      padding: 2.5vw 4vw;
      font-size: 4vw;
      font-weight: ${active ? 'bold' : 'normal'};
      color: ${active ? '#F4B400' : '#777'};
      cursor: ${active ? 'pointer' : 'default'};
      transition: background 0.2s ease;
    `;
    if (active) {
      item.onmouseenter = () => item.style.backgroundColor = '#2A2A2A';
      item.onmouseleave = () => item.style.backgroundColor = 'transparent';
      item.onclick = () => {
        version.textContent = text.replace('NeuroBean ', '');
        versionDropdown.style.display = 'none';
      };
    }
    versionDropdown.appendChild(item);
  });

  document.body.appendChild(versionDropdown);
  centerBox.onclick = () => {
    versionDropdown.style.display = versionDropdown.style.display === 'flex' ? 'none' : 'flex';
  };

  const newChatIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  newChatIcon.setAttribute("viewBox", "0 0 24 24");
  newChatIcon.style.cssText = `width: 7vw; height: 7vw; cursor: pointer; stroke: #F4B400; fill: none; stroke-width: 2;`;
  newChatIcon.innerHTML = `
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
  `;
  newChatIcon.onclick = handleNewChatClick;

  navbar.appendChild(hamburgerBtn);
  navbar.appendChild(centerBox);
  navbar.appendChild(newChatIcon);
  document.body.appendChild(navbar);
}

