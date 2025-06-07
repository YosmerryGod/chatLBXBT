export function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
    position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);

    background-color: ${type === 'error' ? '#F4B400' : '#F4B400'};
    color: white;
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    font-size: 0.95rem;
    z-index: 99999;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;
    document.body.appendChild(toast);
    setTimeout(() => toast.style.opacity = '1', 50);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

export function renderLoginModal() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background-color: rgba(0,0,0,0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  `;

    const modal = document.createElement('div');
    modal.style.cssText = `
    background-color: #121212;
    color: white;
    border-radius: 10px;
    padding: 2rem;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 0 20px rgba(0,0,0,0.5);
    position: relative;
    font-family: Arial, sans-serif;
  `;

    const closeBtn = document.createElement('div');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = `
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
    font-size: 1.2rem;
  `;
    closeBtn.onclick = () => overlay.remove();

    const title = document.createElement('h2');
    title.textContent = 'Log In';
    title.style.marginBottom = '0.25rem';

    const signup = document.createElement('p');
    signup.innerHTML = `Don't have an account yet? <span style="color:#F4B400; cursor:pointer;">Sign Up</span>`;
    signup.style.fontSize = '0.9rem';

    // 🔗 Sign Up toast
    const signupSpan = signup.querySelector('span');
    signupSpan.onclick = () => showToast('📝 Sign Up will be available in the next version.', 'info');

    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email';
    emailLabel.style.marginTop = '1rem';

    const emailInput = document.createElement('input');
    emailInput.placeholder = 'Enter Email';
    emailInput.type = 'email';
    emailInput.style.cssText = `
    width: 100%;
    margin-top: 0.25rem;
    margin-bottom: 1rem;
    padding: 0.75rem;
    border: none;
    background-color: #1f1f1f;
    color: white;
    border-radius: 8px;
  `;

    const passLabel = document.createElement('label');
    passLabel.textContent = 'Password';

    const passInput = document.createElement('input');
    passInput.placeholder = 'Enter Password';
    passInput.type = 'password';
    passInput.style.cssText = `
    width: 100%;
    margin-top: 0.25rem;
    margin-bottom: 0.5rem;
    padding: 0.75rem;
    border: none;
    background-color: #1f1f1f;
    color: white;
    border-radius: 8px;
  `;

    const forgot = document.createElement('div');
    forgot.textContent = 'Forgot Password?';
    forgot.style.cssText = `
    text-align: right;
    font-size: 0.85rem;
    color: #F4B400;
    cursor: pointer;
    margin-bottom: 1.5rem;
  `;
    forgot.onclick = () => showToast('🔑 Password recovery will be available in the next version.', 'info');

    const loginBtn = document.createElement('button');
    loginBtn.textContent = 'Log In';
    loginBtn.style.cssText = `
    width: 100%;
    background-color: #F4B400;
    border: none;
    padding: 0.8rem;
    border-radius: 8px;
    font-weight: bold;
    color: black;
    font-size: 1rem;
    cursor: pointer;
  `;
    loginBtn.onclick = () => {
        showToast(`🔐 Log In will be available in the next version.`, 'info');
        overlay.remove();
    };

    modal.append(closeBtn, title, signup, emailLabel, emailInput, passLabel, passInput, forgot, loginBtn);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
}
