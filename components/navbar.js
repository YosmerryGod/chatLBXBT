import { renderHeroSection } from './hero.js';

export function renderNavbar() {
  let sidebarExpanded = false;

  const sidebar = document.createElement('aside');
  sidebar.id = 'sidebar';
  sidebar.style.cssText = `
    width: 4.5rem;
    height: 100dvh;
    background-color:rgb(18, 18, 18);
    display: flex;
    flex-direction: column;
    padding-top: 2.5dvh;
    align-items: flex-start;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    border-right: 1px solid #333;
    gap: 2rem;
    transition: width 0.3s ease, padding-left 0.3s ease;
    cursor: default;
  `;

  const logoRow = document.createElement('div');
  logoRow.style.cssText = `
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    position: relative;
  `;

  const logoContainer = document.createElement('div');
  logoContainer.style.cssText = `width: 2.25rem; height: 2.25rem; position: relative;`;

  const logoImg = document.createElement('img');
  logoImg.src = '../assets/logo.png';
  logoImg.style.cssText = `
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    z-index: 1;
    transition: opacity 0.2s ease;
  `;

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
  hamburgerIcon.style.cssText = `
    width: 2.25rem;
    height: 2.25rem;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    z-index: 2;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
  `;

  logoContainer.appendChild(logoImg);
  logoContainer.appendChild(hamburgerIcon);

  const closeBtn = document.createElement('span');
  closeBtn.textContent = '✕';
  closeBtn.style.cssText = `
    color: #F4B400;
    font-size: 1.25rem;
    font-weight: bold;
    cursor: pointer;
    display: none;
  `;
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

  const createIcon = (svgPath) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "#F4B400");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.style.cssText = `
      width: 1.5rem;
      height: 1.5rem;
      cursor: pointer;
      opacity: 0.85;
      transition: transform 0.2s ease, opacity 0.2s ease;
    `;
    svg.innerHTML = svgPath;
    svg.onmouseenter = () => {
      svg.style.transform = 'scale(1.2)';
      svg.style.opacity = 1;
    };
    svg.onmouseleave = () => {
      svg.style.transform = 'scale(1)';
      svg.style.opacity = 0.85;
    };
    return svg;
  };

  function createSidebarItem(icon, labelText) {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      display: flex;
      align-items: center;
      gap: 0.8rem;
      width: 100%;
      padding-left: 1rem;
    `;

    const label = document.createElement('span');
    label.textContent = labelText;
    label.style.cssText = `
      color: #F4B400;
      font-size: 0.9rem;
      font-weight: 500;
      white-space: nowrap;
      display: none;
    `;

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
  const library = createSidebarItem(createIcon(`<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>`), "Perpustakaan");

  sidebar.appendChild(newChat);
  sidebar.appendChild(search);

  // Social media icons
  const socialWrapper = document.createElement('div');
  socialWrapper.style.cssText = `
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 1rem 0.5rem;
    margin-top: auto;
    border-top: 1px solid #333;
    display: none;
  `;

  const createSocialIcon = (href, path) => {
    const link = document.createElement('a');
    link.href = href;
    link.target = '_blank';
    link.style.cssText = `width: 1rem; height: 1rem;`;

    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("viewBox", "0 0 24 24");
    icon.setAttribute("fill", "none");
    icon.setAttribute("stroke", "#F4B400");
    icon.setAttribute("stroke-width", "2");
    icon.setAttribute("stroke-linecap", "round");
    icon.setAttribute("stroke-linejoin", "round");
    icon.style.cssText = `width: 100%; height: 100%;`;

    icon.innerHTML = path;
    link.appendChild(icon);
    return link;
  };

  const websiteIcon = createSocialIcon("https://linktr.ee/lilbeanfun", `<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/>`);
  const twitterIcon = createSocialIcon("https://twitter.com/lilbeanBSC", `<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43 1s-4.17 2-5.93 2.63A4.48 4.48 0 0 0 5 6.4v1A10.66 10.66 0 0 1 1 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c13 8 27-7 20-20z"/>`);
  const telegramIcon = createSocialIcon("https://t.me/lilbeanFun", `<path d="M21 3L3 10.53l5.91 2.36L18.71 6.1c.28-.17.51.06.33.34l-6.45 9.94-.78 4.44 2.45-3.18 3.64 2.67"/>`);

  socialWrapper.appendChild(websiteIcon);
  socialWrapper.appendChild(twitterIcon);
  socialWrapper.appendChild(telegramIcon);
  sidebar.appendChild(socialWrapper);

  document.body.appendChild(sidebar);

  const topbar = document.createElement('nav');
  topbar.id = 'topbar';
  topbar.style.cssText = `
    height: 10dvh;
    width: calc(100% - 4rem);
    background-color: rgba(46, 45, 45, 0);
    color: #F4B400;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    position: fixed;
    top: 0;
    left: 4rem;
    z-index: 30;
    box-shadow: 0 1px 2px rgba(61, 61, 61, 0.18);
    font-family: Arial, sans-serif;
    transition: left 0.3s ease, width 0.3s ease;
  `;

  const leftWrapper = document.createElement('div');
  leftWrapper.style.cssText = `display: flex; align-items: center; gap: 0.5rem;`;

  const appTitle = document.createElement('span');
  appTitle.textContent = 'neuroBean 1.0';
  appTitle.style.cssText = `font-weight: bold; font-size: 1.5rem; color: #F4B400;`;

  const dropdownIcon = document.createElement('span');
  dropdownIcon.textContent = '▼';
  dropdownIcon.style.cssText = `
    font-size: 0.7rem;
    cursor: pointer;
    padding-top: 2px;
    transition: transform 0.2s;
  `;
  dropdownIcon.onmouseenter = () => dropdownIcon.style.transform = 'rotate(180deg)';
  dropdownIcon.onmouseleave = () => dropdownIcon.style.transform = 'rotate(0deg)';

  leftWrapper.appendChild(appTitle);
  leftWrapper.appendChild(dropdownIcon);

  const incognitoIcon = createIcon(`
    <path d="M9 9l-1-2h8l-1 2" />
    <circle cx="9" cy="13" r="2" />
    <circle cx="15" cy="13" r="2" />
  `);
  incognitoIcon.style.width = '2.5rem';
  incognitoIcon.style.height = '2.5rem';
  incognitoIcon.style.marginLeft = '1rem';

  topbar.appendChild(leftWrapper);
  topbar.appendChild(incognitoIcon);
  document.body.appendChild(topbar);

  function toggleSidebar() {
    sidebarExpanded = !sidebarExpanded;
    sidebar.style.width = sidebarExpanded ? '15rem' : '4.5rem';
    closeBtn.style.display = sidebarExpanded ? 'block' : 'none';
    topbar.style.left = sidebarExpanded ? '15rem' : '4rem';
    topbar.style.width = sidebarExpanded ? 'calc(100% - 15rem)' : 'calc(100% - 4rem)';

    [newChat, search, library].forEach(item => {
      item.label.style.display = sidebarExpanded ? 'inline' : 'none';
    });

    socialWrapper.style.display = sidebarExpanded ? 'flex' : 'none';

    logoImg.style.opacity = sidebarExpanded ? '1' : '1';
    hamburgerIcon.style.opacity = sidebarExpanded ? '0' : '0';

    const main = document.querySelector('main');
    if (main) {
      main.style.marginLeft = sidebarExpanded ? '15rem' : '4.5rem';
      main.style.width = sidebarExpanded ? 'calc(100vw - 15rem)' : 'calc(100vw - 4.5rem)';
    }
  }
}
