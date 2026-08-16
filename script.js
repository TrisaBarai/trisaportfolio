/**
 * ============================================================================
 * TRISA BARAI - PORTFOLIO INTERACTION SCRIPT (VANILLA JAVASCRIPT)
 * ============================================================================
 * 
 * Features Included:
 * 1. Sticky Navigation Bar & Dynamic Active Nav Link Observer
 * 2. Mobile Drawer Menu Open/Close Controls & Backdrop
 * 3. Fake Review Detection AI Live Interactive Analyzer & Heuristic Engine
 * 4. One-Click Copy Email to Clipboard with Tooltip
 * 5. Contact Form Validation with Instant Toast Alert
 * 6. Scroll-to-Top Button
 * 
 * All code is written in clean, modern vanilla JavaScript with no dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================================================
  // 1. STICKY NAVBAR & ACTIVE NAV LINK OBSERVER
  // ==========================================================================
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Add shadow and reduce background opacity on scroll
  const handleScrollHeader = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScrollHeader, { passive: true });
  handleScrollHeader();

  // Highlight active link based on currently visible section
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -40% 0px',
    threshold: 0
  };

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
      }
    });
  }, observerOptions);

  sections.forEach((sec) => sectionObserver.observe(sec));


  // ==========================================================================
  // 2. MOBILE NAVIGATION DRAWER (FOR ANDROID PHONES & TABLETS)
  // ==========================================================================
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openDrawer = () => {
    mobileDrawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'true');
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = ''; // Restore background scrolling
    if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
  };

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  // Close mobile drawer when any link inside it is clicked
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  // Close drawer if user presses Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('active')) {
      closeDrawer();
    }
  });


  // ==========================================================================
  // 3. FAKE REVIEW DETECTION AI - NLP & CLASSIFICATION ENGINE
  // ==========================================================================
  
  /**
   * Evaluates a review string using Natural Language Processing heuristics,
   * spam keyword detection, punctuation frequency, and sentence structure.
   */
  const evaluateReviewText = (text) => {
    const raw = (text || '').trim();
    if (!raw || raw.length < 4) {
      return null;
    }

    const words = raw.match(/\b\w+\b/g) || [];
    const wordCount = words.length;
    const upperChars = (raw.match(/[A-Z]/g) || []).length;
    const totalChars = Math.max(raw.length, 1);
    const capsRatio = upperChars / totalChars;
    const exclamationCount = (raw.match(/[!?]/g) || []).length;

    // Common promotional spam / fake bot patterns
    const spamKeywords = [
      '100% recommended', 'best ever', 'buy now', 'click here', 
      'guaranteed', 'must buy', 'free gift', 'discount code',
      'waste of money', 'dont buy', 'fake product', 'scam',
      'definitely buy', 'click link', 'five stars', '5 stars'
    ];

    let detectedKeywords = [];
    spamKeywords.forEach((kw) => {
      if (raw.toLowerCase().includes(kw)) {
        detectedKeywords.push(kw);
      }
    });

    let spamScore = 0.0;
    let reasons = [];

    // Rule 1: High Caps Ratio (Shouting pattern)
    if (capsRatio > 0.3 && totalChars > 15) {
      spamScore += 0.35;
      reasons.push('Excessive capitalization detected.');
    }

    // Rule 2: Excessive Punctuation
    if (exclamationCount >= 3) {
      spamScore += 0.3;
      reasons.push(`Multiple exclamation marks (${exclamationCount} found).`);
    }

    // Rule 3: Promotional Keyword Matches
    if (detectedKeywords.length > 0) {
      spamScore += Math.min(0.45, detectedKeywords.length * 0.22);
      reasons.push(`Promotional spam phrase: "${detectedKeywords.join('", "')}".`);
    }

    // Rule 4: Length check
    if (wordCount < 5) {
      spamScore += 0.2;
      reasons.push('Review is overly brief and lacks specifics.');
    }

    // Rule 5: Natural sentence bonus (organic human reviews)
    if (wordCount >= 16 && detectedKeywords.length === 0 && capsRatio < 0.15) {
      spamScore = Math.max(0.04, spamScore - 0.35);
      reasons.push('Natural sentence structure with balanced descriptive vocabulary.');
    }

    spamScore = Math.max(0.04, Math.min(0.96, spamScore));

    const isFake = spamScore >= 0.48;
    const verdict = isFake ? 'Suspicious / Fake Review' : 'Genuine Review';
    const confidence = isFake ? Math.round(spamScore * 100) : Math.round((1 - spamScore) * 100);

    return {
      raw,
      isFake,
      verdict,
      confidence,
      reasons: reasons.length > 0 ? reasons.join(' ') : 'Normal organic review characteristics.'
    };
  };

  // Sample texts for testing
  const sampleGenuineText = "I have been using this laptop for the past 3 weeks for coding and study. The battery easily lasts around 8 hours on a single charge and the keyboard is very comfortable. Good value for money.";
  const sampleFakeText = "BEST PRODUCT EVER IN THE WORLD!!!! EVERYONE MUST BUY NOW 100% RECOMMENDED CLICK LINK FOR DISCOUNT 5 STARS FOR SURE BUY NOW!!!";

  const liveReviewInput = document.getElementById('live-review-input');
  const sampleGenuineBtn = document.getElementById('sample-genuine-btn');
  const sampleFakeBtn = document.getElementById('sample-fake-btn');
  const runAnalysisBtn = document.getElementById('run-analysis-btn');
  const clearAnalysisBtn = document.getElementById('clear-analysis-btn');
  const testerResultBox = document.getElementById('tester-result-box');
  const verdictPill = document.getElementById('verdict-pill');
  const confidenceText = document.getElementById('confidence-text');
  const resultReasons = document.getElementById('result-reasons');
  const openDemoBtn = document.getElementById('open-demo-btn');

  // Trigger analysis function
  const runAnalysis = () => {
    if (!liveReviewInput) return;
    const text = liveReviewInput.value;
    const result = evaluateReviewText(text);

    if (!result) {
      alert('Please enter at least 4 characters of review text to analyze.');
      return;
    }

    if (testerResultBox) {
      testerResultBox.style.display = 'flex';
      
      if (verdictPill) {
        verdictPill.className = `verdict-pill ${result.isFake ? 'fake' : 'genuine'}`;
        verdictPill.innerHTML = result.isFake 
          ? '<i class="fa-solid fa-triangle-exclamation"></i> Suspicious / Fake' 
          : '<i class="fa-solid fa-circle-check"></i> Genuine Review';
      }

      if (confidenceText) {
        confidenceText.textContent = `Confidence: ${result.confidence}%`;
      }

      if (resultReasons) {
        resultReasons.textContent = `Analysis: ${result.reasons}`;
      }
    }
  };

  if (sampleGenuineBtn && liveReviewInput) {
    sampleGenuineBtn.addEventListener('click', () => {
      liveReviewInput.value = sampleGenuineText;
      runAnalysis();
    });
  }

  if (sampleFakeBtn && liveReviewInput) {
    sampleFakeBtn.addEventListener('click', () => {
      liveReviewInput.value = sampleFakeText;
      runAnalysis();
    });
  }

  if (runAnalysisBtn) {
    runAnalysisBtn.addEventListener('click', runAnalysis);
  }

  if (clearAnalysisBtn && liveReviewInput) {
    clearAnalysisBtn.addEventListener('click', () => {
      liveReviewInput.value = '';
      if (testerResultBox) testerResultBox.style.display = 'none';
      liveReviewInput.focus();
    });
  }

  if (openDemoBtn && liveReviewInput) {
    openDemoBtn.addEventListener('click', () => {
      liveReviewInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      liveReviewInput.focus();
      if (!liveReviewInput.value) {
        liveReviewInput.value = sampleGenuineText;
        runAnalysis();
      }
    });
  }


  // ==========================================================================
  // 4. ONE-CLICK COPY EMAIL TO CLIPBOARD
  // ==========================================================================
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyTooltip = document.getElementById('copy-tooltip');
  const emailText = document.getElementById('email-text');

  if (copyEmailBtn && emailText) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = emailText.textContent.trim();
      
      try {
        await navigator.clipboard.writeText(email);
        if (copyTooltip) {
          copyTooltip.classList.add('show');
          setTimeout(() => {
            copyTooltip.classList.remove('show');
          }, 2000);
        }
        showToast('Email Copied!', `${email} copied to clipboard.`);
      } catch (err) {
        // Fallback for older browser engines
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('Email Copied!', `${email} copied to clipboard.`);
      }
    });
  }


  // ==========================================================================
  // 5. CONTACT FORM VALIDATION & TOAST NOTIFICATIONS
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const toast = document.getElementById('toast');
  const toastTitle = document.getElementById('toast-title');
  const toastMessage = document.getElementById('toast-message');

  const showToast = (title, message) => {
    if (!toast) return;
    if (toastTitle) toastTitle.textContent = title;
    if (toastMessage) toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      const nameGroup = nameInput ? nameInput.closest('.form-group') : null;
      if (nameInput && nameInput.value.trim().length < 2) {
        if (nameGroup) nameGroup.classList.add('has-error');
        isValid = false;
      } else if (nameGroup) {
        nameGroup.classList.remove('has-error');
      }

      // Validate Email
      const emailGroup = emailInput ? emailInput.closest('.form-group') : null;
      if (emailInput && !validateEmail(emailInput.value.trim())) {
        if (emailGroup) emailGroup.classList.add('has-error');
        isValid = false;
      } else if (emailGroup) {
        emailGroup.classList.remove('has-error');
      }

      // Validate Message
      const messageGroup = messageInput ? messageInput.closest('.form-group') : null;
      if (messageInput && messageInput.value.trim().length < 8) {
        if (messageGroup) messageGroup.classList.add('has-error');
        isValid = false;
      } else if (messageGroup) {
        messageGroup.classList.remove('has-error');
      }

      if (isValid) {
        const senderName = nameInput.value.trim();
        contactForm.reset();
        showToast('Message Sent!', `Thank you ${senderName}, Trisa has received your message.`);
      }
    });

    // Clear error states as user types
    [nameInput, emailInput, messageInput].forEach((input) => {
      if (input) {
        input.addEventListener('input', () => {
          const group = input.closest('.form-group');
          if (group) group.classList.remove('has-error');
        });
      }
    });
  }


  // ==========================================================================
  // 6. SCROLL TO TOP BUTTON
  // ==========================================================================
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  const handleScrollTopVisibility = () => {
    if (window.scrollY > 350) {
      if (scrollTopBtn) scrollTopBtn.classList.add('show');
    } else {
      if (scrollTopBtn) scrollTopBtn.classList.remove('show');
    }
  };

  window.addEventListener('scroll', handleScrollTopVisibility, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
