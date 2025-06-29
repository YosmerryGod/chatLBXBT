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
    left: -50%;
    width: 50%;
    height: 100vh;
    background: rgba(31, 31, 31, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 4px 0 20px rgba(244,180,0,0.2);
    display: flex;
    flex-direction: column;
    padding: 1rem;
    z-index: 102;
    transition: left 0.3s ease;
    color: #F4B400;
  `;

  const overlay = document.createElement('div');
  overlay.id = 'overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.3);
    z-index: 99;
    display: none;
  `;
  overlay.onclick = () => toggleSidebar(false);
  document.body.appendChild(overlay);

  const toggleSidebar = (show) => {
    sidebar.style.left = show ? '0' : '-60%';
    overlay.style.display = show ? 'block' : 'none';
  };

  // === SIDEBAR HEADER (Logo + Close) ===
  const sidebarHeader = document.createElement('div');
  sidebarHeader.style.cssText = `
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: clamp(1rem, 5vh, 4rem);
`;

  const logo = document.createElement('img');
  logo.src = '../assets/logo.png';
  logo.style.cssText = `height: 7vw; width: 7vw; border-radius: 50%;`;

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

  const newChatItem = document.createElement('div');
newChatItem.onclick = () => {
  toggleSidebar(false);  // Tutup sidebar dulu
  handleNewChatClick();  // Jalankan fungsi newChat
};
  newChatItem.innerHTML = `
    <svg viewBox="0 0 24 24" width="6vw" height="6vw" fill="none" stroke="#F4B400" stroke-width="2">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg> <span style="margin-left: 1vw;">New Chat</span>
  `;
  newChatItem.style.cssText = `
  display: flex;
  align-items: center;
  margin-top: 4vh;          // 🔸 Tambahan → kasih jarak dari atas
  margin-bottom: 1vh;
  gap: 1vw;
  font-size: 2.5rem;        // 🔸 Perbesar teks
  transform: scale(1.2);    // 🔸 Perbesar seluruh elemen (ikon + teks)
`;
  const searchItem = document.createElement('div');
  searchItem.innerHTML = `
    <svg viewBox="0 0 24 24" width="6vw" height="6vw" fill="none" stroke="#F4B400" stroke-width="2">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg> <span style="margin-left: 1vw;">Search Chat</span>
  `;
  searchItem.style.cssText = `display: flex; align-items: center; margin-top: 1rem; gap: 1vw; font-size: 2.5rem;`;

  const socialBox = document.createElement('div');
  socialBox.style.cssText = `
    display: flex;
    justify-content: space-around;
    margin-top: auto;
    padding-top: 2rem;
    border-top: 1px solid #555;
    gap: 2vw;
  `;
  socialBox.innerHTML = `
  <a href="https://linktr.ee/lilbeanfun" target="_blank" style="display:inline-flex;">
    <svg viewBox='0 0 24 24' width='6vw' height='6vw' fill='none' stroke='#F4B400' stroke-width='2'>
      <circle cx='12' cy='12' r='10'></circle>
      <line x1='2' y1='12' x2='22' y2='12'></line>
      <path d='M12 2a15.3 15.3 0 0 1 0 20'></path>
      <path d='M12 2a15.3 15.3 0 0 0 0 20'></path>
    </svg>
  </a>
<a href="https://twitter.com/lilbeanBSC" target="_blank" style="display:inline-flex;" title="Follow on X">
  <svg viewBox="0 0 120 120" width="6vw" height="6vw" fill="#F4B400" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0 L45 0 L75 45 L120 0 L120 30 L90 60 L120 120 L75 120 L45 75 L0 120 L0 90 L30 60 L0 0 Z" />
  </svg>
</a>

<a href="https://t.me/lilbeanfun" target="_blank" style="display:inline-flex;" title="Join Telegram">
  <svg viewBox="0 0 24 24" width="6vw" height="6vw" fill="none" stroke="#F4B400" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22 4L12 14.01l-3-3L2 12l20-8z" />
    <path d="M12 14.01L12 22" />
  </svg>
</a>

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
    background-color: rgba(244, 179, 0, 0);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 101;
  `;

  const hamburgerBtn = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  hamburgerBtn.setAttribute("viewBox", "0 0 24 24");
  hamburgerBtn.style.cssText = `width: 7vw; height: 7vw; cursor: pointer; fill: none; stroke: #F4B400; stroke-width: 2;`;
  hamburgerBtn.innerHTML = `
    <line x1="3" y1="7" x2="21" y2="7"></line>
    <line x1="3" y1="17" x2="21" y2="17"></line>
  `;
  hamburgerBtn.onclick = () => toggleSidebar(true);

  const centerBox = document.createElement('div');
  centerBox.style.cssText = `
    display: flex;
    align-items: center;
    gap: 0.8vw;
    font-size: 4.2vw;
    font-weight: bold;
    cursor: pointer;
  `;

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

  const newChatIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  newChatIcon.setAttribute("viewBox", "0 0 24 24");
  newChatIcon.style.cssText = `width: 7vw; height: 7vw; cursor: pointer; fill: none; stroke: #F4B400; stroke-width: 2;`;
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
