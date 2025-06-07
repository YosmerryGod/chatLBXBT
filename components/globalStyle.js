export function applyGlobalStyle() {
  const style = document.createElement('style');
  style.textContent = `
    *, *::before, *::after {
      box-sizing: border-box;
    }

    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      background-color: #1F1F1F;
    }

    body {
      font-family: Arial, sans-serif;
    }

    input, button {
      font-family: inherit;
    }

    @media (max-width: 600px) {
      #chat-box {
        font-size: 0.9rem;
      }

      nav div {
        font-size: 1rem !important;
      }

      button {
        padding: 0.7rem 1rem !important;
      }

      input {
        font-size: 0.9rem !important;
      }
    }
  `;
  document.head.appendChild(style);
}
