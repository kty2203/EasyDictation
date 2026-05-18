// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 50) {
    navbar.style.background = 'rgba(21, 21, 28, 0.95)';
  } else {
    navbar.style.background = 'rgba(21, 21, 28, 0.8)';
  }
  lastScroll = currentScroll;
});

// ===== Intersection Observer — fade-in animations =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply initial hidden state and observe
document.querySelectorAll('.lesson-card, .category-card, .stat-item, .cta-box').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`;
  observer.observe(el);
});

// ===== Smooth scroll for nav links =====
document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (navLink) {
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        navLink.classList.add('active');
      }
    }
  });
});

// ===== Counter animation for stats =====
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString() + suffix;
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statItems = entry.target.querySelectorAll('.stat-item h3');
      const targets = [
        { value: 500, suffix: '+' },
        { value: 10000, suffix: '+' },
        { value: 1200, suffix: '+' },
        { value: 95, suffix: '%' }
      ];
      statItems.forEach((el, i) => {
        if (targets[i]) {
          animateCounter(el, targets[i].value, targets[i].suffix);
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsSection = document.getElementById('stats');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// ===== Hamburger menu toggle (mobile) =====
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');

if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', () => {
    const isOpen = navLinks.style.display === 'flex';
    navLinks.style.display = isOpen ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '72px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'rgba(21, 21, 28, 0.98)';
    navLinks.style.padding = '16px 24px';
    navLinks.style.borderBottom = '1px solid var(--border)';
  });
}

// ===== Auth Modal Logic =====
const authModalHTML = `
  <div class="auth-modal-overlay" id="authModal">
    <div class="auth-modal-container">
      <button class="auth-close-btn" id="authCloseBtn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
      
      <!-- Login View -->
      <div class="auth-card" id="loginView">
        <div class="auth-header">
          <a href="#" class="logo" style="justify-content: center; margin-bottom: 24px;">
            <div class="logo-icon">🎧</div>
            EasyDictation
          </a>
          <h2>Chào mừng trở lại!</h2>
          <p>Đăng nhập để tiếp tục hành trình luyện nghe.</p>
        </div>
        
        <form class="auth-form" onsubmit="event.preventDefault(); document.getElementById('authModal').classList.remove('active');">
          <div class="form-group">
            <label>Email</label>
            <input type="email" placeholder="Nhập địa chỉ email..." required>
          </div>
          <div class="form-group">
            <label>Mật khẩu</label>
            <input type="password" placeholder="Nhập mật khẩu..." required>
          </div>
          
          <div class="form-options">
            <label class="remember-me">
              <input type="checkbox"> 
              <span>Ghi nhớ đăng nhập</span>
            </label>
            <a href="#" class="forgot-pass">Quên mật khẩu?</a>
          </div>
          
          <button type="submit" class="btn btn-primary btn-full">Đăng nhập</button>
        </form>
        
        <div class="auth-footer">
          <p>Chưa có tài khoản? <a href="#" id="switchToRegister">Đăng ký ngay</a></p>
        </div>
      </div>

      <!-- Register View -->
      <div class="auth-card" id="registerView" style="display: none;">
        <div class="auth-header">
          <a href="#" class="logo" style="justify-content: center; margin-bottom: 24px;">
            <div class="logo-icon">🎧</div>
            EasyDictation
          </a>
          <h2>Tạo tài khoản mới</h2>
          <p>Tham gia cùng hàng ngàn học viên khác.</p>
        </div>
        
        <form class="auth-form" onsubmit="event.preventDefault(); document.getElementById('authModal').classList.remove('active');">
          <div class="form-group">
            <label>Họ và tên</label>
            <input type="text" placeholder="Nhập họ tên của bạn..." required>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" placeholder="Nhập địa chỉ email..." required>
          </div>
          <div class="form-group">
            <label>Mật khẩu</label>
            <input type="password" placeholder="Tạo mật khẩu..." required>
          </div>
          
          <button type="submit" class="btn btn-primary btn-full">Đăng ký tài khoản</button>
        </form>
        
        <div class="auth-footer">
          <p>Đã có tài khoản? <a href="#" id="switchToLogin">Đăng nhập</a></p>
        </div>
      </div>

    </div>
  </div>
`;

document.body.insertAdjacentHTML('beforeend', authModalHTML);

const authModal = document.getElementById('authModal');
const authCloseBtn = document.getElementById('authCloseBtn');
const loginView = document.getElementById('loginView');
const registerView = document.getElementById('registerView');

const switchToRegister = document.getElementById('switchToRegister');
const switchToLogin = document.getElementById('switchToLogin');

function openAuthModal(view) {
  authModal.classList.add('active');
  if (view === 'register') {
    loginView.style.display = 'none';
    registerView.style.display = 'block';
  } else {
    registerView.style.display = 'none';
    loginView.style.display = 'block';
  }
}

function closeAuthModal() {
  authModal.classList.remove('active');
}

document.querySelectorAll('#loginBtn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    openAuthModal('login');
  });
});

document.querySelectorAll('#registerBtn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    openAuthModal('register');
  });
});

authCloseBtn.addEventListener('click', closeAuthModal);

authModal.addEventListener('click', (e) => {
  if (e.target === authModal) {
    closeAuthModal();
  }
});

switchToRegister.addEventListener('click', (e) => {
  e.preventDefault();
  loginView.style.display = 'none';
  registerView.style.display = 'block';
});

switchToLogin.addEventListener('click', (e) => {
  e.preventDefault();
  registerView.style.display = 'none';
  loginView.style.display = 'block';
});
