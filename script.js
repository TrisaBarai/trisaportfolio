/**
 * TRISA BARAI PORTFOLIO - JAVASCRIPT LOGIC & INTERACTIONS
 * Features:
 * 1. Mobile Drawer Navigation & Backdrop
 * 2. Sticky Header & Active Nav Link Observer
 * 3. Project Filter Tabs
 * 4. One-Click Copy Email with Tooltip
 * 5. Interactive Contact Form Validation & Toast Notification
 * 6. Scroll-To-Top Button
 * 7. IntersectionObserver Scroll Reveal Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==================== 1. STICKY NAVBAR & ACTIVE LINK OBSERVER ====================
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleNavbarScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // Active Nav Link using IntersectionObserver
  const navObserverOptions = {
    root: null,
    rootMargin: '-30% 0px -50% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach((sec) => navObserver.observe(sec));

  // ==================== 2. MOBILE DRAWER NAVIGATION ====================
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openMobileMenu = () => {
    mobileDrawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    hamburgerBtn.setAttribute('aria-expanded', 'true');
  };

  const closeMobileMenu = () => {
    mobileDrawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  };

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileMenu);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeMobileMenu);
  if (backdrop) backdrop.addEventListener('click', closeMobileMenu);

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  // ==================== 3. PROJECT FILTER TABS ====================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('hidden');
          // Add re-reveal effect
          card.style.animation = 'none';
          card.offsetHeight; // trigger reflow
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Project demo buttons demo feedback
  const demoButtons = document.querySelectorAll('.project-demo-btn');
  demoButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const projectName = button.getAttribute('data-project') || 'Project';
      showToast('Live Preview', `Opening demo environment for "${projectName}". (Integrated in repo)`);
    });
  });

  // ==================== 4. COPY EMAIL TO CLIPBOARD ====================
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyTooltip = document.getElementById('copy-tooltip');
  const emailLink = document.getElementById('email-link');

  if (copyEmailBtn && emailLink) {
    copyEmailBtn.addEventListener('click', async () => {
      const emailText = emailLink.textContent.trim();
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(emailText);
        } else {
          // Fallback
          const textarea = document.createElement('textarea');
          textarea.value = emailText;
          textarea.style.position = 'fixed';
          textarea.style.left = '-999999px';
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }

        // Show tooltip
        copyTooltip.classList.add('show');
        setTimeout(() => {
          copyTooltip.classList.remove('show');
        }, 2200);

        showToast('Email Copied', 'trisa.barai@example.com copied to your clipboard!');
      } catch (err) {
        showToast('Copy Failed', 'Please copy the email manually.');
      }
    });
  }

  // ==================== 5. CONTACT FORM VALIDATION & FEEDBACK ====================
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('submit-btn');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const clearErrors = () => {
    [nameInput, emailInput, messageInput].forEach((input) => {
      if (input) input.classList.remove('invalid');
    });
    [nameError, emailError, messageError].forEach((err) => {
      if (err) err.classList.remove('visible');
    });
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      let isValid = true;

      // Name validation
      if (!nameInput.value.trim()) {
        nameInput.classList.add('invalid');
        nameError.classList.add('visible');
        isValid = false;
      }

      // Email validation
      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        emailInput.classList.add('invalid');
        emailError.classList.add('visible');
        isValid = false;
      }

      // Message validation
      if (!messageInput.value.trim() || messageInput.value.trim().length < 8) {
        messageInput.classList.add('invalid');
        messageError.classList.add('visible');
        isValid = false;
      }

      if (isValid) {
        const originalBtnHtml = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending...</span>';

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
          contactForm.reset();

          showToast('Message Sent Successfully!', 'Thank you, I have received your message and will reply soon.');
        }, 800);
      }
    });

    // Real-time error dismissal
    [nameInput, emailInput, messageInput].forEach((input) => {
      if (input) {
        input.addEventListener('input', () => {
          input.classList.remove('invalid');
          const errEl = document.getElementById(`${input.id}-error`);
          if (errEl) errEl.classList.remove('visible');
        });
      }
    });
  }

  // ==================== 6. TOAST NOTIFICATION SYSTEM ====================
  const toast = document.getElementById('toast');
  const toastTitle = document.getElementById('toast-title');
  const toastDesc = document.getElementById('toast-desc');
  const toastClose = document.getElementById('toast-close');
  let toastTimer = null;

  function showToast(title, description) {
    if (!toast) return;

    if (toastTitle) toastTitle.textContent = title;
    if (toastDesc) toastDesc.textContent = description;

    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  if (toastClose) {
    toastClose.addEventListener('click', () => {
      if (toast) toast.classList.remove('show');
    });
  }

  // ==================== 7. SCROLL-TO-TOP BUTTON ====================
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  const handleScrollTopVisibility = () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScrollTopVisibility, { passive: true });
  handleScrollTopVisibility();

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==================== 8. SCROLL REVEAL ANIMATIONS ====================
  const revealElements = document.querySelectorAll('.reveal-fade');

  const revealObserverOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Reveal once
      }
    });
  }, revealObserverOptions);

  revealElements.forEach((el) => revealObserver.observe(el));
});
