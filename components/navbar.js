import { renderHeroSection } from './hero.js';
import { renderLoginModal } from './login.js';

export function renderNavbar() {
  const navbar = document.createElement('nav');
  navbar.style.cssText = `
    width: 100%;
    height: 50px;
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
  leftIcon.onclick = () => {
  const main = document.querySelector('main');
  if (main) main.remove(); // hapus section sebelumnya
  renderHeroSection();     // render ulang dari awal
};

  // === CENTER LOGO ===
  const title = document.createElement('img');
title.src = '../assets/logo.png';
title.alt = 'HelloBean Logo';
title.style.cssText = `
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
  flex: 1;
  display: block;
  margin: 0 auto;
  margin-top: 40px;
  box-shadow: 0 0 0 10px #1F1F1F;
  transition: transform 0.6s ease, box-shadow 0.3s ease;
  cursor: pointer;
`;

title.onmouseenter = () => {
  title.style.boxShadow = '0 0 1px #1F1F1F, 0 0 0 2px #1F1F1F';
  title.style.transform ='scale(1.2)';
};
title.onmouseleave = () => {
  title.style.boxShadow = '0 0 0 10px #1F1F1F';
   title.style.transform ='scale(1)';
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
    background-color: #1F1F1F;
    width: 90px;
    color: #F4B400;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
    z-index: 101;
    transition: all 0.2s ease;
  `;
  loginButton.onmouseenter = () => {
    loginButton.style.backgroundColor = '#333';
    loginButton.style.color = 'red';
    loginButton.style.transform = 'scale(1.2)';
  };
  loginButton.onmouseleave = () => {
    loginButton.style.backgroundColor = '#1F1F1F';
    loginButton.style.color = '#F4B400';
    loginButton.style.transform = 'scale(1)';
  };
  loginButton.onclick = () => renderLoginModal();

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
