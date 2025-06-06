import { renderHeroSection } from './hero.js';

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

  // === LEFT ICON ===
  const leftIcon = document.createElement('img');
  leftIcon.src = '../assets/icon-newChat.png';
  leftIcon.alt = 'Icon';
  leftIcon.style.cssText = `
    height: 25px;
    width: 25px;
    object-fit: cover;
    cursor: pointer;
    transition: transform 0.2s ease;
  `;
  leftIcon.onmouseenter = () => leftIcon.style.transform = 'scale(1.2)';
  leftIcon.onmouseleave = () => leftIcon.style.transform = 'scale(1)';

  // === CENTER LOGO ===
  const title = document.createElement('img');
title.src = '../assets/logo.png';
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
  box-shadow: 0 0 0 10px #0D0D0D;
  transition: transform 0.6s ease, box-shadow 0.3s ease;
  cursor: pointer;
`;

title.onmouseenter = () => {
  title.style.boxShadow = '0 0 6px 4px #fff063, 0 0 0 10px #0D0D0D';
};
title.onmouseleave = () => {
  title.style.boxShadow = '0 0 0 10px #0D0D0D';
};

title.onclick = () => {
  // Tambah animasi rotasi dan membesar
  title.style.transform = 'scale(1.3) rotate(360deg)';

  // Setelah animasi selesai, redirect ke website
  setTimeout(() => {
    window.location.href = 'https://www.lilbean.fun';
  }, 600); // waktu harus sesuai dengan duration animasi
};


  // === LOGIN BUTTON ===
  const loginButton = document.createElement('button');
  loginButton.textContent = 'Log In';
  loginButton.style.cssText = `
    padding: 0.5rem 1rem;
    background-color: black;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
    z-index: 101;
    transition: all 0.2s ease;
  `;
  loginButton.onmouseenter = () => {
    loginButton.style.backgroundColor = '#333';
    loginButton.style.transform = 'translateY(-2px)';
  };
  loginButton.onmouseleave = () => {
    loginButton.style.backgroundColor = 'black';
    loginButton.style.transform = 'translateY(0)';
  };
  loginButton.onclick = () => alert('🔐 You clicked Log In');

  // === CENTER WRAPPER ===
  const centerWrapper = document.createElement('div');
  centerWrapper.style.cssText = `
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  `;
  centerWrapper.appendChild(title);

  navbar.appendChild(leftIcon);
  navbar.appendChild(centerWrapper);
  navbar.appendChild(loginButton);
  document.body.appendChild(navbar);
}
