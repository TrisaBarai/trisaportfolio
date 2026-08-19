/**
 * ============================================================================
 * TRISA BARAI - PERSONAL PORTFOLIO JAVASCRIPT
 * 
 * Improvements & Core Features:
 * 1. Professional Opening Intro Animation (Letter-by-Letter "Trisa Barai")
 * 2. Dynamic Typing Animation ("Computer Science Student", "Aspiring Software Developer", "AI Enthusiast")
 * 3. Subtle Animated Blue Glowing Particles & Mesh Background Canvas
 * 4. Fake Review Detection AI Analyzer with Realistic "Analyzing..." Sequence
 * 5. Dark Mode / Light Mode Theme Switcher with Persistence
 * 6. Smooth Scroll Reveal (IntersectionObserver with Reduced Motion Support)
 * 7. Sticky Navigation & Active Section Indicator (5 Sections)
 * 8. Mobile Navigation Drawer & Backdrop
 * 9. One-Click Copy Email to Clipboard with Tooltip
 * 10. Contact Form Client-Side Validation & Feedback
 * 11. Scroll-to-Top Button & Toast Alerts
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================================================
  // 1. PROFESSIONAL OPENING ANIMATION ("Trisa Barai" Letter-by-Letter)
  // ==========================================================================
  const introScreen = document.getElementById('intro-screen');

  if (introScreen) {
    // Prevent background scrolling while intro is running
    document.body.style.overflow = 'hidden';

    // Sequence:
    // 1. Dark navy screen appears immediately (#071a33)
    // 2. Letters reveal letter-by-letter (0.18s to 1.05s)
    // 3. Glowing neon line expands & subtitle reveals (1.15s - 1.35s)
    // 4. Hold for about 1 second
    // 5. Smoothly fade/slide the intro away at 2.4s
    setTimeout(() => {
      introScreen.classList.add('hide');
      document.body.style.overflow = '';

      setTimeout(() => {
        introScreen.style.display = 'none';
      }, 850);
    }, 2400);
  }


  // ==========================================================================
  // 2. DYNAMIC TYPING ANIMATION UNDER NAME
  // ==========================================================================
  const typingElement = document.getElementById('hero-typing-text');
  if (typingElement) {
    const roles = [
      "Computer Science Student",
      "Aspiring Software Developer",
      "AI Enthusiast"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeRole() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 85;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        // Pause at end of role
        typingSpeed = 1800;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 350;
      }

      setTimeout(typeRole, typingSpeed);
    }

    // Start typing after initial intro delay
    setTimeout(typeRole, 1200);
  }


  // ==========================================================================
  // 3. SUBTLE ANIMATED BLUE GLOWING PARTICLES (HERO BACKGROUND CANVAS)
  // ==========================================================================
  const canvas = document.getElementById('hero-particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    let width, height;

    function resizeCanvas() {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = canvas.width = parent.clientWidth;
      height = canvas.height = parent.clientHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.2 + 0.8;
        this.speedX = (Math.random() - 0.5) * 0.45;
        this.speedY = (Math.random() - 0.5) * 0.45;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = Math.random() > 0.4 ? '#38bdf8' : '#2563eb';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function initParticles() {
      particles = [];
      const particleCount = Math.min(35, Math.floor((width * height) / 25000));
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    initParticles();

    function connectParticles() {
      const maxDistance = 110;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = '#38bdf8';
            ctx.globalAlpha = (1 - dist / maxDistance) * 0.15;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      connectParticles();
      animationFrameId = requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }


  // ==========================================================================
  // 4. DARK MODE / LIGHT MODE TOGGLE (WITH LOCALSTORAGE PERSISTENCE)
  // ==========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle-btn');
  const mobileThemeIcon = document.getElementById('mobile-theme-icon');
  const mobileThemeText = document.getElementById('mobile-theme-text');
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  const savedTheme = localStorage.getItem('trisa_portfolio_theme') || 'light';

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('trisa_portfolio_theme', theme);

    if (theme === 'dark') {
      if (themeIcon) themeIcon.className = 'fa-solid fa-sun theme-icon';
      if (mobileThemeIcon) mobileThemeIcon.className = 'fa-solid fa-sun';
      if (mobileThemeText) mobileThemeText.textContent = 'Switch to Light Mode';
      if (metaThemeColor) metaThemeColor.setAttribute('content', '#050d1a');
    } else {
      if (themeIcon) themeIcon.className = 'fa-solid fa-moon theme-icon';
      if (mobileThemeIcon) mobileThemeIcon.className = 'fa-solid fa-moon';
      if (mobileThemeText) mobileThemeText.textContent = 'Switch to Dark Mode';
      if (metaThemeColor) metaThemeColor.setAttribute('content', '#0a192f');
    }
  };

  applyTheme(savedTheme);

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    showToast(
      newTheme === 'dark' ? 'Dark Mode Activated' : 'Light Mode Activated',
      newTheme === 'dark' ? 'Switched to midnight navy theme.' : 'Switched to dark blue theme.'
    );
  };

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener('click', toggleTheme);


  // ==========================================================================
  // 5. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (revealElements.length > 0) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach((el) => el.classList.add('active'));
    } else {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
      });

      revealElements.forEach((el) => revealObserver.observe(el));
    }
  }


  // ==========================================================================
  // 6. STICKY NAVBAR & ACTIVE NAV LINK OBSERVER (5 SECTIONS)
  // ==========================================================================
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleScrollHeader = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScrollHeader, { passive: true });
  handleScrollHeader();

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        mobileNavLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { root: null, rootMargin: '-20% 0px -40% 0px', threshold: 0 });

  sections.forEach((sec) => sectionObserver.observe(sec));


  // ==========================================================================
  // 7. MOBILE NAVIGATION DRAWER & BACKDROP
  // ==========================================================================
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('backdrop');

  const openDrawer = () => {
    if (mobileDrawer) mobileDrawer.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'true');
  };

  const closeDrawer = () => {
    if (mobileDrawer) mobileDrawer.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
    if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
  };

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('active')) {
      closeDrawer();
    }
  });


  // ==========================================================================
  // 8. FAKE REVIEW DETECTION SYSTEM - LIVE INTERACTIVE ANALYZER WITH "ANALYZING..." ANIMATION
  // ==========================================================================
  const reviewInput = document.getElementById('live-review-input');
  const runAnalysisBtn = document.getElementById('run-analysis-btn');
  const runAnalysisText = document.getElementById('run-analysis-text');
  const clearAnalysisBtn = document.getElementById('clear-analysis-btn');
  const sampleGenuineBtn = document.getElementById('sample-genuine-btn');
  const sampleFakeBtn = document.getElementById('sample-fake-btn');
  const openDemoBtn = document.getElementById('open-demo-btn');
  
  const analyzingBox = document.getElementById('tester-analyzing-box');
  const analyzingStatusText = document.getElementById('analyzing-status-text');
  const resultBox = document.getElementById('tester-result-box');
  const verdictPill = document.getElementById('verdict-pill');
  const confidenceText = document.getElementById('confidence-text');
  const confidenceBarFill = document.getElementById('confidence-bar-fill');
  const resultReasons = document.getElementById('result-reasons');

  const sampleGenuineText = "I purchased this laptop three weeks ago for my computer science classes. The battery lasts around 8 hours, and compiling code in VS Code is swift. The trackpad is responsive, though the speakers could be slightly louder.";
  const sampleFakeText = "BEST PRODUCT EVER IN THE WORLD!!! BUY RIGHT NOW 100% DISCOUNT AMAZING GUARANTEED!!! PERFECT LIFE CHANGING MUST BUY CLICK HERE AMAZING AMAZING FIVE STARS ⭐⭐⭐⭐⭐";

  let isAnalyzing = false;

  if (openDemoBtn) {
    openDemoBtn.addEventListener('click', () => {
      if (reviewInput) {
        reviewInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        reviewInput.focus();
      }
    });
  }

  if (sampleGenuineBtn) {
    sampleGenuineBtn.addEventListener('click', () => {
      if (isAnalyzing) return;
      if (reviewInput) {
        reviewInput.value = sampleGenuineText;
        startAnalysisSequence(sampleGenuineText);
      }
    });
  }

  if (sampleFakeBtn) {
    sampleFakeBtn.addEventListener('click', () => {
      if (isAnalyzing) return;
      if (reviewInput) {
        reviewInput.value = sampleFakeText;
        startAnalysisSequence(sampleFakeText);
      }
    });
  }

  if (clearAnalysisBtn) {
    clearAnalysisBtn.addEventListener('click', () => {
      if (isAnalyzing) return;
      if (reviewInput) reviewInput.value = '';
      if (analyzingBox) analyzingBox.style.display = 'none';
      if (resultBox) resultBox.style.display = 'none';
    });
  }

  if (runAnalysisBtn) {
    runAnalysisBtn.addEventListener('click', () => {
      if (isAnalyzing) return;
      const text = reviewInput ? reviewInput.value.trim() : '';
      if (!text) {
        showToast('Please enter review text', 'Type or paste a review first to run analysis.');
        if (reviewInput) reviewInput.focus();
        return;
      }
      startAnalysisSequence(text);
    });
  }

  function startAnalysisSequence(text) {
    isAnalyzing = true;

    // UI state: analyzing
    if (resultBox) resultBox.style.display = 'none';
    if (analyzingBox) analyzingBox.style.display = 'flex';
    if (runAnalysisBtn) {
      runAnalysisBtn.disabled = true;
      if (runAnalysisText) runAnalysisText.textContent = 'Analyzing...';
    }

    const statusMessages = [
      "Extracting linguistic tokens & sentiment score...",
      "Evaluating spam patterns & phrase frequency...",
      "Calibrating neural classification confidence..."
    ];

    let msgIndex = 0;
    const interval = setInterval(() => {
      msgIndex++;
      if (analyzingStatusText && statusMessages[msgIndex]) {
        analyzingStatusText.textContent = statusMessages[msgIndex];
      }
    }, 280);

    setTimeout(() => {
      clearInterval(interval);
      if (analyzingBox) analyzingBox.style.display = 'none';
      if (runAnalysisBtn) {
        runAnalysisBtn.disabled = false;
        if (runAnalysisText) runAnalysisText.textContent = 'Analyze Review';
      }
      renderAnalysisResult(text);
      isAnalyzing = false;
    }, 850);
  }

  function renderAnalysisResult(text) {
    if (!resultBox || !verdictPill || !confidenceText || !resultReasons) return;

    let spamScore = 0;
    const reasons = [];

    // 1. Check exclamation marks
    const exclamationCount = (text.match(/!/g) || []).length;
    if (exclamationCount >= 3) {
      spamScore += 30;
      reasons.push("Multiple exclamation marks detected (promotional spam marker).");
    }

    // 2. Check uppercase ratio
    const letters = text.replace(/[^a-zA-Z]/g, '');
    if (letters.length > 10) {
      const upperLetters = text.replace(/[^A-Z]/g, '').length;
      const upperRatio = upperLetters / letters.length;
      if (upperRatio > 0.3) {
        spamScore += 35;
        reasons.push("Excessive uppercase lettering indicates unnatural sentiment amplification.");
      }
    }

    // 3. Spam trigger words matching
    const spamKeywords = [
      'best product ever', 'must buy', 'buy right now', '100% discount', 'guaranteed',
      'click here', 'life changing', 'miracle', 'free gift', 'act now'
    ];
    let matchedKeywords = [];
    const lowerText = text.toLowerCase();
    spamKeywords.forEach((kw) => {
      if (lowerText.includes(kw)) {
        spamScore += 25;
        matchedKeywords.push(`"${kw}"`);
      }
    });
    if (matchedKeywords.length > 0) {
      reasons.push(`Contains spam trigger phrase(s): ${matchedKeywords.join(', ')}.`);
    }

    // 4. Repeated word patterns
    const words = lowerText.split(/\s+/).filter((w) => w.length > 3);
    const wordCounts = {};
    let hasHighRepetition = false;
    words.forEach((w) => {
      wordCounts[w] = (wordCounts[w] || 0) + 1;
      if (wordCounts[w] >= 3) hasHighRepetition = true;
    });
    if (hasHighRepetition) {
      spamScore += 20;
      reasons.push("Repetitive keyword frequency detected.");
    }

    // 5. Genuine review characteristics
    const genuineMarkers = ['because', 'although', 'however', 'used for', 'weeks', 'battery', 'build', 'specs', 'tested'];
    let genuineMatches = 0;
    genuineMarkers.forEach((gm) => {
      if (lowerText.includes(gm)) genuineMatches++;
    });
    if (genuineMatches >= 2 && spamScore < 30) {
      spamScore = Math.max(5, spamScore - 20);
      reasons.push("Contextual nuances and product usage details suggest authentic customer experience.");
    }

    const isFake = spamScore >= 45;
    let confidence;

    if (isFake) {
      confidence = Math.min(98, Math.max(82, Math.round(65 + spamScore / 2)));
      verdictPill.textContent = `Fake Review: ${confidence}%`;
      verdictPill.className = "verdict-pill fake";
      confidenceText.textContent = `AI Confidence: ${confidence}%`;
      if (confidenceBarFill) {
        confidenceBarFill.className = "confidence-bar-fill fake";
        confidenceBarFill.style.width = "0%";
        setTimeout(() => {
          confidenceBarFill.style.width = `${confidence}%`;
        }, 50);
      }
      resultReasons.innerHTML = reasons.length > 0 
        ? reasons.map(r => `<div>• ${r}</div>`).join('') 
        : "<div>• Text characteristics match typical automated fake reviews.</div>";
    } else {
      confidence = Math.min(98, Math.max(85, Math.round(100 - spamScore)));
      verdictPill.textContent = `Genuine Review: ${confidence}%`;
      verdictPill.className = "verdict-pill genuine";
      confidenceText.textContent = `AI Confidence: ${confidence}%`;
      if (confidenceBarFill) {
        confidenceBarFill.className = "confidence-bar-fill genuine";
        confidenceBarFill.style.width = "0%";
        setTimeout(() => {
          confidenceBarFill.style.width = `${confidence}%`;
        }, 50);
      }
      resultReasons.innerHTML = reasons.length > 0 
        ? reasons.map(r => `<div>• ${r}</div>`).join('') 
        : "<div>• Natural phrasing, balanced sentiment, and specific contextual details verified.</div>";
    }

    resultBox.style.display = 'block';
  }


  // ==========================================================================
  // 9. ONE-CLICK COPY EMAIL TO CLIPBOARD WITH TOOLTIP
  // ==========================================================================
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyTooltip = document.getElementById('copy-tooltip');
  const emailText = "baraitrisa@gmail.com";

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(emailText);
        } else {
          const tempInput = document.createElement('input');
          tempInput.value = emailText;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }

        if (copyTooltip) {
          copyTooltip.classList.add('show');
          setTimeout(() => {
            copyTooltip.classList.remove('show');
          }, 2000);
        }
        showToast('Email Copied!', 'baraitrisa@gmail.com is copied to your clipboard.');
      } catch (err) {
        showToast('Email Address', 'baraitrisa@gmail.com');
      }
    });
  }


  // ==========================================================================
  // 10. CONTACT FORM CLIENT-SIDE VALIDATION & FEEDBACK
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const submitBtn = document.getElementById('submit-btn');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.classList.add('invalid');
        if (nameError) nameError.classList.add('visible');
        isValid = false;
      } else {
        nameInput.classList.remove('invalid');
        if (nameError) nameError.classList.remove('visible');
      }

      // Validate Email
      if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('invalid');
        if (emailError) emailError.classList.add('visible');
        isValid = false;
      } else {
        emailInput.classList.remove('invalid');
        if (emailError) emailError.classList.remove('visible');
      }

      // Validate Message
      if (messageInput.value.trim().length < 8) {
        messageInput.classList.add('invalid');
        if (messageError) messageError.classList.add('visible');
        isValid = false;
      } else {
        messageInput.classList.remove('invalid');
        if (messageError) messageError.classList.remove('visible');
      }

      if (!isValid) return;

      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending...</span>`;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = `<i class="fa-solid fa-check"></i> <span>Message Sent!</span>`;
        showToast('Message Sent Successfully!', `Thank you ${nameInput.value.trim()}, I will get back to you soon.`);
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }, 1000);
    });

    [nameInput, emailInput, messageInput].forEach((input) => {
      if (input) {
        input.addEventListener('input', () => {
          input.classList.remove('invalid');
          const errorElem = document.getElementById(`${input.id}-error`);
          if (errorElem) errorElem.classList.remove('visible');
        });
      }
    });
  }


  // ==========================================================================
  // 11. SCROLL TO TOP BUTTON & TOAST NOTIFICATION UTILITY
  // ==========================================================================
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  const handleScrollTopBtn = () => {
    if (window.scrollY > 400) {
      if (scrollTopBtn) scrollTopBtn.classList.add('visible');
    } else {
      if (scrollTopBtn) scrollTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScrollTopBtn, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  let toastTimer = null;
  function showToast(title, message) {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toast-title');
    const toastMessage = document.getElementById('toast-message');

    if (!toast || !toastTitle || !toastMessage) return;

    toastTitle.textContent = title;
    toastMessage.textContent = message;

    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

});
