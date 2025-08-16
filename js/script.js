// الكود المعدل لملف script.js
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS Animation
  AOS.init({
    duration: 800,
    easing: 'ease',
    once: true,
    offset: 100
  });

  // تحديد إذا كنا في الصفحة الرئيسية
  const isHomePage = window.location.pathname === '/' || 
                    window.location.pathname === '/index.html' || 
                    window.location.pathname.endsWith('.html') === false;
  
  if (isHomePage) {
    document.body.classList.add('home-page');
  }

  // بقية الكود الأصلي...
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Mobile Menu Toggle
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  navbarToggler.addEventListener('click', function() {
    navbarCollapse.classList.toggle('show');
  });

  // Add active class to current section in navigation
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });
});
// التحكم في النافذة المنبثقة
  const contactBtn = document.getElementById('contactBtn');
  const closeModal = document.getElementById('closeModal');
  const contactModal = document.getElementById('contactModal');
  const cancelBtn = document.getElementById('cancelBtn');
  const mainNavbar = document.getElementById('mainNavbar'); // ← ✅ أضف هذا السطر

  function openContactModal() {
    contactModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (mainNavbar) mainNavbar.classList.add('d-none'); // ← ✅ إخفاء الـ navbar
  }

  function closeContactModal() {
    contactModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    if (mainNavbar) mainNavbar.classList.remove('d-none'); // ← ✅ إظهار الـ navbar
  }

  contactBtn.addEventListener('click', openContactModal);
  closeModal.addEventListener('click', closeContactModal);
  cancelBtn.addEventListener('click', closeContactModal);

  contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
      closeContactModal();
    }
  });

  // منع التمرير عند فتح النافذة على الهاتف
  document.addEventListener('touchmove', function(e) {
    if (contactModal.classList.contains('active')) {
      e.preventDefault();
    }
  }, { passive: false });
 // عند النقر على أي رابط داخل قائمة الهامبرجر، تُغلق تلقائيًا
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: true
        });
        bsCollapse.hide();
      }
    });
  });
  const hamburgerBtn = document.getElementById('hamburgerToggle');
  const navbarCollapse = document.getElementById('navbarNav');

  // فتح/إغلاق يدوي عند النقر على زر الهامبرجر
  hamburgerBtn.addEventListener('click', () => {
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
      toggle: false
    });
    if (navbarCollapse.classList.contains('show')) {
      bsCollapse.hide();
    } else {
      bsCollapse.show();
    }
  });

  // إغلاق القائمة عند النقر على أي رابط
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false
      });
      bsCollapse.hide();
    });
 
  });
window.addEventListener('scroll', function () {
  const heroSection = document.getElementById('hero-section');
  const socialIcons = document.querySelector('.hero-social-icons');
  const rect = heroSection.getBoundingClientRect();

  // ❌ اختفِ فقط عندما يخرج القسم بالكامل من الشاشة (أسفله فوق أعلى الشاشة)
  if (rect.bottom <= 0) {
    socialIcons.style.display = 'none';
  } else {
    socialIcons.style.display = 'block';
  }
});
// تأكد من هذا الكود في ملف script.js
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    // إزالة النشط من جميع الروابط
    document.querySelectorAll('.nav-link').forEach(navLink => {
      navLink.classList.remove('active');
      navLink.parentElement.classList.remove('active');
    });
    
    // إضافة النشط للرابط المحدد
    this.classList.add('active');
    this.parentElement.classList.add('active');
  });
});
// ✅ حل مشكلة سحب نافذة التواصل بالكامل عند ظهور الكيبورد بالهواتف
const modal = document.querySelector('.contact-modal-content');

let isDragging = false;
let startY;
let scrollTop;

modal.addEventListener('touchstart', function(e) {
  isDragging = true;
  startY = e.touches[0].pageY - modal.offsetTop;
  scrollTop = modal.scrollTop;
}, { passive: true });

modal.addEventListener('touchmove', function(e) {
  if (!isDragging) return;
  const y = e.touches[0].pageY - modal.offsetTop;
  const walk = startY - y;
  modal.scrollTop = scrollTop + walk;
}, { passive: true });

modal.addEventListener('touchend', function() {
  isDragging = false;
});
