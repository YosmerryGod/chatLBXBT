export function applyGlobalStyleMobile() {
  const style = document.createElement('style');
  style.textContent = `
    /* Global reset */
    *, *::before, *::after {
      box-sizing: border-box;
    }

    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: #1F1F1F;
      font-family: Arial, sans-serif;
      -webkit-tap-highlight-color: transparent;
    }

    img {
      max-width: 100%;
      height: auto;
      display: block;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    button, input {
      font-family: inherit;
      outline: none;
      border: none;
    }

    button {
      cursor: pointer;
      transition: all 0.2s ease;
    }

    /* === Mobile Styles === */
    @media (max-width: 600px) {
      #chat-box {
        font-size: 0.9rem;
      }

      nav div {
        font-size: 1rem !important;
      }

      button {
        padding: 0.7rem 1rem !important;
        font-size: 0.95rem !important;
        border-radius: 8px;
      }

      input {
        font-size: 0.9rem !important;
        padding: 0.6rem 0.8rem;
        border-radius: 6px;
      }

      nav {
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
      }
    }

    /* Touch improvements */
    input, button, textarea, select {
      touch-action: manipulation;
    }
  `;
  document.head.appendChild(style);
}
