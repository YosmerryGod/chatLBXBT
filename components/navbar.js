export function renderNavbar() {
  const navbar = document.createElement('nav');
  navbar.style.cssText = `
    width: 100%;
    height: 60px;
    background-color: #F4B400;
    color: black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.5);
    font-family: Arial, sans-serif;
    position: fixed;
    top: 0;
    left: 0;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    z-index: 10;
  `;

  const leftIcon = document.createElement('div');
  leftIcon.innerHTML = '🧠';
  leftIcon.title = 'New Chat';
  leftIcon.style.cssText = `font-size: 1.5rem; cursor: pointer;`;
  leftIcon.onclick = () => alert("🧠 New chat clicked");

  const title = document.createElement('img');
title.src = '../assets/logo.png'; // Ganti dengan path ke gambar kamu
title.alt = 'HelloBean Logo';
title.style.cssText = `
  height: 60px;
  width: 60px;
  border-radius: 50%;
  object-fit: cover;
  flex: 1;
  display: block;
  margin: 0 auto;
  margin-top: 19px;
  box-shadow: 0 0 0 10px #0D0D0D; /* ini stroke */
`;


  const hamburger = document.createElement('div');
  hamburger.style.cssText = `
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    cursor: pointer;
    z-index: 101;
  `;

  for (let i = 0; i < 2; i++) {
    const bar = document.createElement('div');
    bar.style.cssText = `
      width: 25px;
      height: 3px;
      background-color: black;
      border-radius: 2px;
    `;
    hamburger.appendChild(bar);
  }

  const centerWrapper = document.createElement('div');
  centerWrapper.style.cssText = `
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  `;
  centerWrapper.appendChild(title);

  navbar.appendChild(leftIcon);
  navbar.appendChild(centerWrapper);
  navbar.appendChild(hamburger);
  document.body.appendChild(navbar);

  // === OVERLAY ===
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 98;
    display: none;
  `;
  document.body.appendChild(overlay);

  // === SIDEBAR ===
  const sidebar = document.createElement('div');
  sidebar.style.cssText = `
  position: fixed;
  top: 0;
  right: -70%;
  width: 70%;
  height: 100vh;
  background: linear-gradient(to bottom, #F4B400 50%, #FFF063 100%);
  box-shadow: -2px 0 10px rgba(0,0,0,0.5);
  transition: right 0.3s ease;
  z-index: 99;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
`;

  sidebar.innerHTML = `
    <h3 style="color:black; margin-top:0;">📋 Menu</h3>
    <button style="margin-top:1rem; padding:0.5rem;">My Wallet</button>
    <button style="margin-top:0.5rem; padding:0.5rem;">Settings</button>
    <button style="margin-top:0.5rem; padding:0.5rem;">Logout</button>
  `;
  document.body.appendChild(sidebar);

  let open = false;

  function openSidebar() {
    open = true;
    sidebar.style.right = '0';
    overlay.style.display = 'block';
  }

  function closeSidebar() {
    open = false;
    sidebar.style.right = '-70%';
    overlay.style.display = 'none';
  }

  hamburger.onclick = openSidebar;
  overlay.onclick = closeSidebar;
}
