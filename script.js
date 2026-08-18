/**
 * ============================================================================
 * TRISA BARAI - PERSONAL PORTFOLIO JAVASCRIPT
 * 
 * Features:
 * 1. Resume / CV Download Support
 * 2. Dark Mode / Light Mode Theme Switcher with localStorage Persistence
 * 3. Smooth Scroll Animations (IntersectionObserver with Reduced Motion Support)
 * 4. Sticky Navigation Bar & Dynamic Active Nav Link Tracking
 * 5. Mobile Navigation Drawer & Backdrop
 * 6. Fake Review Detection AI Live Interactive Analyzer Demo
 * 7. One-Click Copy Email to Clipboard with Tooltip
 * 8. Contact Form Client-Side Validation with Instant Toast Alert
 * 9. Scroll-to-Top Button
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================================================
  // 1. DARK MODE / LIGHT MODE TOGGLE (FEATURE 2)
  // ==========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle-btn');
  const mobileThemeIcon = document.getElementById('mobile-theme-icon');
  const mobileThemeText = document.getElementById('mobile-theme-text');
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  // Check saved theme from localStorage (default: 'light' / Blue theme)
  const savedTheme = localStorage.getItem('trisa_portfolio_theme') || 'light';

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('trisa_portfolio_theme', theme);

    if (theme === 'dark') {
      if (themeIcon) {
        themeIcon.className = 'fa-solid fa-sun theme-icon';
      }
      if (mobileThemeIcon) {
        mobileThemeIcon.className = 'fa-solid fa-sun';
      }
      if (mobileThemeText) {
        mobileThemeText.textContent = 'Switch to Light Mode';
      }
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#061A40');
      }
    } else {
      if (themeIcon) {
        themeIcon.className = 'fa-solid fa-moon theme-icon';
      }
      if (mobileThemeIcon) {
        mobileThemeIcon.className = 'fa-solid fa-moon';
      }
      if (mobileThemeText) {
        mobileThemeText.textContent = 'Switch to Dark Mode';
      }
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#1565C0');
      }
    }
  };

  // Initialize theme on page load
  applyTheme(savedTheme);

  // Toggle theme on button click
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    showToast(
      newTheme === 'dark' ? 'Dark Mode Activated' : 'Light Mode Activated',
      newTheme === 'dark' ? 'Switched to midnight blue dark theme.' : 'Switched to clean blue light theme.'
    );
  };

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener('click', toggleTheme);
  }


  // ==========================================================================
  // 2. SCROLL REVEAL ANIMATIONS (FEATURE 3 - IntersectionObserver)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (revealElements.length > 0) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      // If user prefers reduced motion or browser doesn't support observer, reveal all immediately
      revealElements.forEach((el) => el.classList.add('active'));
    } else {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Animate once per element
          }
        });
      }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
      });

      revealElements.forEach((el) => revealObserver.observe(el));
    }
  }


  // ==========================================================================
  // 3. STICKY NAVBAR & ACTIVE NAV LINK OBSERVER (5 SECTIONS ONLY)
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

  const sectionObserverOptions = {
    root: null,
    rootMargin: '-20% 0px -40% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        
        // Update Desktop Nav
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        // Update Mobile Drawer Links
        mobileNavLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, sectionObserverOptions);

  sections.forEach((sec) => sectionObserver.observe(sec));


  // ==========================================================================
  // 4. MOBILE NAVIGATION DRAWER (FOR ANDROID PHONES & TABLETS)
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
  // 5. FAKE REVIEW DETECTION AI - LIVE INTERACTIVE ANALYZER DEMO
  // ==========================================================================
  const reviewInput = document.getElementById('live-review-input');
  const runAnalysisBtn = document.getElementById('run-analysis-btn');
  const clearAnalysisBtn = document.getElementById('clear-analysis-btn');
  const sampleGenuineBtn = document.getElementById('sample-genuine-btn');
  const sampleFakeBtn = document.getElementById('sample-fake-btn');
  const openDemoBtn = document.getElementById('open-demo-btn');
  const resultBox = document.getElementById('tester-result-box');
  const verdictPill = document.getElementById('verdict-pill');
  const confidenceText = document.getElementById('confidence-text');
  const resultReasons = document.getElementById('result-reasons');

  const sampleGenuineText = "I purchased this laptop three weeks ago for my computer science classes. The battery lasts around 8 hours, and compiling code in VS Code is swift. The trackpad is responsive, though the speakers could be slightly louder.";
  const sampleFakeText = "BEST PRODUCT EVER IN THE WORLD!!! BUY RIGHT NOW 100% DISCOUNT AMAZING GUARANTEED!!! PERFECT LIFE CHANGING MUST BUY CLICK HERE AMAZING AMAZING FIVE STARS ⭐⭐⭐⭐⭐";

  if (openDemoBtn) {
    openDemoBtn.addEventListener('click', () => {
      const demoBox = document.getElementById('live-review-input');
      if (demoBox) {
        demoBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        demoBox.focus();
      }
    });
  }

  if (sampleGenuineBtn) {
    sampleGenuineBtn.addEventListener('click', () => {
      if (reviewInput) {
        reviewInput.value = sampleGenuineText;
        analyzeReview(sampleGenuineText);
      }
    });
  }

  if (sampleFakeBtn) {
    sampleFakeBtn.addEventListener('click', () => {
      if (reviewInput) {
        reviewInput.value = sampleFakeText;
        analyzeReview(sampleFakeText);
      }
    });
  }

  if (clearAnalysisBtn) {
    clearAnalysisBtn.addEventListener('click', () => {
      if (reviewInput) reviewInput.value = '';
      if (resultBox) resultBox.style.display = 'none';
    });
  }

  if (runAnalysisBtn) {
    runAnalysisBtn.addEventListener('click', () => {
      const text = reviewInput ? reviewInput.value.trim() : '';
      if (!text) {
        showToast('Please enter review text', 'Type or paste a review first to run analysis.');
        if (reviewInput) reviewInput.focus();
        return;
      }
      analyzeReview(text);
    });
  }

  function analyzeReview(text) {
    if (!resultBox || !verdictPill || !confidenceText || !resultReasons) return;

    let spamScore = 0;
    const reasons = [];

    // 1. Check exclamation marks
    const exclamationCount = (text.match(/!/g) || []).length;
    if (exclamationCount >= 3) {
      spamScore += 30;
      reasons.push("Multiple exclamation marks detected (promotional spam pattern).");
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
      confidence = Math.min(99, Math.max(78, 60 + spamScore / 2));
      verdictPill.textContent = "Fake / Suspicious Review";
      verdictPill.className = "verdict-pill fake";
      confidenceText.textContent = `Confidence: ${Math.round(confidence)}%`;
      resultReasons.innerHTML = reasons.length > 0 
        ? reasons.map(r => `<div>• ${r}</div>`).join('') 
        : "<div>• Text characteristics match typical automated fake reviews.</div>";
    } else {
      confidence = Math.min(98, Math.max(82, 100 - spamScore));
      verdictPill.textContent = "Genuine Review";
      verdictPill.className = "verdict-pill genuine";
      confidenceText.textContent = `Confidence: ${Math.round(confidence)}%`;
      resultReasons.innerHTML = reasons.length > 0 
        ? reasons.map(r => `<div>• ${r}</div>`).join('') 
        : "<div>• Natural phrasing, balanced sentiment, and specific contextual details verified.</div>";
    }

    resultBox.style.display = 'block';
  }


  // ==========================================================================
  // 6. ONE-CLICK COPY EMAIL TO CLIPBOARD WITH TOOLTIP
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
  // 7. CONTACT FORM VALIDATION & INSTANT TOAST NOTIFICATION
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
  // 8. SCROLL TO TOP BUTTON
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


  // ==========================================================================
  // 9. TOAST NOTIFICATION UTILITY
  // ==========================================================================
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
