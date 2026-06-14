/* ==================== LOGIN MODAL FUNCTIONALITY ==================== */

function initLoginModal() {
  const overlay = document.getElementById('login-overlay');
  const modal = document.getElementById('login-modal');
  if (!overlay || !modal) return;

  // Elements
  const openBtns = document.querySelectorAll('.btn-login');
  const closeBtn = document.getElementById('login-close-btn');
  const tabs = document.querySelectorAll('.login-tab');
  const panels = document.querySelectorAll('.login-form-panel');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const loginToast = document.getElementById('login-toast');

  // Open modal
  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
  });

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      panels.forEach(p => p.classList.remove('active'));
      document.getElementById(target).classList.add('active');
    });
  });

  // Switch to register from login footer
  const switchToRegister = document.getElementById('switch-to-register');
  if (switchToRegister) {
    switchToRegister.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelector('[data-tab="register-panel"]').classList.add('active');
      panels.forEach(p => p.classList.remove('active'));
      document.getElementById('register-panel').classList.add('active');
    });
  }

  // Switch to login from register footer
  const switchToLogin = document.getElementById('switch-to-login');
  if (switchToLogin) {
    switchToLogin.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelector('[data-tab="login-panel"]').classList.add('active');
      panels.forEach(p => p.classList.remove('active'));
      document.getElementById('login-panel').classList.add('active');
    });
  }

  // Toggle password visibility
  document.querySelectorAll('.login-toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.parentElement.querySelector('input');
      const icon = btn.querySelector('iconify-icon');
      if (input.type === 'password') {
        input.type = 'text';
        icon.setAttribute('icon', 'solar:eye-linear');
      } else {
        input.type = 'password';
        icon.setAttribute('icon', 'solar:eye-closed-linear');
      }
    });
  });

  // Show toast notification
  function showLoginToast(title, message) {
    if (!loginToast) return;
    const toastTitle = loginToast.querySelector('.login-toast-content h4');
    const toastMsg = loginToast.querySelector('.login-toast-content p');
    if (toastTitle) toastTitle.textContent = title;
    if (toastMsg) toastMsg.textContent = message;
    loginToast.classList.add('show');
    setTimeout(() => {
      loginToast.classList.remove('show');
    }, 3000);
  }

  // Login form submit (hanya tampilan, tidak ada backend)
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showLoginToast('Berhasil Masuk!', 'Selamat datang kembali di Pasar Ikan Waingapu');
      setTimeout(() => {
        closeModal();
        loginForm.reset();
      }, 800);
    });
  }

  // Register form submit (hanya tampilan, tidak ada backend)
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showLoginToast('Pendaftaran Berhasil!', 'Akun Anda telah berhasil dibuat');
      setTimeout(() => {
        // Switch ke tab login
        tabs.forEach(t => t.classList.remove('active'));
        document.querySelector('[data-tab="login-panel"]').classList.add('active');
        panels.forEach(p => p.classList.remove('active'));
        document.getElementById('login-panel').classList.add('active');
        registerForm.reset();
      }, 800);
    });
  }
}

// Initialize when DOM ready
document.addEventListener('DOMContentLoaded', initLoginModal);