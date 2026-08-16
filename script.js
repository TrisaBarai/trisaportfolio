/**
 * ============================================================================
 * TRISA BARAI - PORTFOLIO INTERACTION SCRIPT (VANILLA JAVASCRIPT)
 * ============================================================================
 * 
 * Features Included:
 * 1. Sticky Navigation Bar & Dynamic Active Nav Link Observer
 * 2. Mobile Drawer Menu Open/Close Controls & Backdrop
 * 3. Project Filter Tabs (Web, Algorithms, DBMS, All)
 * 4. Fake Review Detection AI Live Interactive Analyzer & Modal
 * 5. One-Click Copy Email to Clipboard with Tooltip
 * 6. Contact Form Validation with Instant Toast Alert
 * 7. Scroll-to-Top Button
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

  // Add shadow and reduce padding on scroll
  const handleScrollHeader = () => {
    if (window.scrollY > 30) {
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
    rootMargin: '-25% 0px -45% 0px',
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
  // 2. MOBILE NAVIGATION DRAWER
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
  // 3. PROJECT FILTER TABS
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.projects-grid .project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Set active filter button style
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category') || '';
        
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  // ==========================================================================
  // 4. FAKE REVIEW DETECTION AI - NLP & CLASSIFICATION ENGINE
  // ==========================================================================
  
  /**
   * Evaluates a review string using Natural Language Processing heuristics,
   * spam keyword detection, punctuation frequency, and sentence structure.
   */
  const evaluateReviewText = (text) => {
    const raw = (text || '').trim();
    if (!raw || raw.length < 5) {
      return null;
    }

    const words = raw.match(/\b\w+\b/g) || [];
    const wordCount = words.length;
    const upperChars = (raw.match(/[A-Z]/g) || []).length;
    const totalChars = Math.max(raw.length, 1);
    const capsRatio = upperChars / totalChars;
    const exclamationCount = (raw.match(/[!?]/g) || []).length;

    // Spam / bot review trigger phrases
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
    if (capsRatio > 0.28 && totalChars > 15) {
      spamScore += 0.32;
      reasons.push('Excessive capitalization detected (often used in bot spam).');
    }

    // Rule 2: Excessive Punctuation
    if (exclamationCount >= 3) {
      spamScore += 0.28;
      reasons.push(`Multiple exclamation / question marks (${exclamationCount} found).`);
    }

    // Rule 3: Promotional Keyword Matches
    if (detectedKeywords.length > 0) {
      spamScore += Math.min(0.45, detectedKeywords.length * 0.22);
      reasons.push(`Contained spam trigger phrases: "${detectedKeywords.join('", "')}".`);
    }

    // Rule 4: Length check (extremely short reviews have low information density)
    if (wordCount < 6) {
      spamScore += 0.2;
      reasons.push('Review is overly brief and lacks specific product details.');
    }

    // Rule 5: Natural sentence bonus (organic human reviews have balanced structure)
    if (wordCount >= 18 && detectedKeywords.length === 0 && capsRatio < 0.12) {
      spamScore = Math.max(0.04, spamScore - 0.35);
      reasons.push('Natural sentence structure with organic descriptive vocabulary.');
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
      spamProbability: Math.round(spamScore * 100),
      reasons: reasons.length > 0 ? reasons : ['Normal review characteristics.']
    };
  };

  // --- Quick Tester in Featured Card ---
  const sampleGenuineText = "I have been using this laptop for the past 3 weeks for coding and web browsing. The battery easily lasts around 8 hours on a single charge and the keyboard is very comfortable for long sessions. Satisfied with the purchase.";
  const sampleFakeText = "BEST PRODUCT EVER IN THE WORLD!!!! EVERYONE MUST BUY NOW 100% RECOMMENDED CLICK LINK FOR DISCOUNT 5 STARS FOR SURE BUY NOW!!!";

  const quickResultBox = document.getElementById('quick-tester-result');
  const sampleBtns = document.querySelectorAll('.sample-btn');

  sampleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-sample');
      const textToTest = type === 'genuine' ? sampleGenuineText : sampleFakeText;
      const res = evaluateReviewText(textToTest);

      if (res && quickResultBox) {
        const tagClass = res.isFake ? 'fake' : 'genuine';
        const iconClass = res.isFake ? 'fa-triangle-exclamation text-danger' : 'fa-circle-check text-success';
        
        quickResultBox.innerHTML = `
          <div class="quick-verdict-box">
            <div>
              <span class="verdict-tag ${tagClass}">
                <i class="fa-solid ${iconClass}"></i> ${res.verdict}
              </span>
            </div>
            <span class="verdict-score">Confidence: ${res.confidence}%</span>
          </div>
        `;
      }
    });
  });

  // --- Interactive Demo Modal ---
  const demoModal = document.getElementById('demo-modal');
  const openDemoBtn = document.getElementById('open-demo-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const loadGenuineBtn = document.getElementById('load-sample-genuine');
  const loadFakeBtn = document.getElementById('load-sample-fake');
  const reviewInput = document.getElementById('review-input-text');
  const analyzeBtn = document.getElementById('analyze-review-btn');
  const clearReviewBtn = document.getElementById('clear-review-btn');
  const modalResultBox = document.getElementById('modal-result-box');

  const openModal = () => {
    if (demoModal) {
      demoModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (demoModal) {
      demoModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (openDemoBtn) openDemoBtn.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (demoModal) {
    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) closeModal();
    });
  }

  // Load sample texts in modal
  if (loadGenuineBtn && reviewInput) {
    loadGenuineBtn.addEventListener('click', () => {
      reviewInput.value = sampleGenuineText;
      runModalAnalysis();
    });
  }

  if (loadFakeBtn && reviewInput) {
    loadFakeBtn.addEventListener('click', () => {
      reviewInput.value = sampleFakeText;
      runModalAnalysis();
    });
  }

  if (clearReviewBtn && reviewInput) {
    clearReviewBtn.addEventListener('click', () => {
      reviewInput.value = '';
      if (modalResultBox) modalResultBox.style.display = 'none';
      reviewInput.focus();
    });
  }

  const runModalAnalysis = () => {
    if (!reviewInput) return;
    const text = reviewInput.value;
    const res = evaluateReviewText(text);

    if (!res) {
      alert('Please enter or paste at least 5 characters of review text.');
      return;
    }

    if (modalResultBox) {
      modalResultBox.style.display = 'flex';
      
      const tag = document.getElementById('result-status-tag');
      const conf = document.getElementById('result-confidence');
      const metricVerdict = document.getElementById('metric-verdict');
      const metricSpam = document.getElementById('metric-spam-prob');
      const metricSentiment = document.getElementById('metric-sentiment');
      const reasonsUl = document.getElementById('reasons-ul');

      if (tag) {
        tag.className = `result-status-tag ${res.isFake ? 'fake' : 'genuine'}`;
        tag.textContent = res.verdict;
      }

      if (conf) conf.textContent = `Confidence: ${res.confidence}%`;
      if (metricVerdict) metricVerdict.textContent = res.isFake ? 'Fake / Bot' : 'Genuine';
      if (metricSpam) metricSpam.textContent = `${res.spamProbability}%`;
      if (metricSentiment) metricSentiment.textContent = res.isFake ? 'Promotional / Inflated' : 'Balanced Organic';

      if (reasonsUl) {
        reasonsUl.innerHTML = res.reasons.map((r) => `<li>${r}</li>`).join('');
      }
    }
  };

  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', runModalAnalysis);
  }


  // ==========================================================================
  // 5. ONE-CLICK COPY EMAIL TO CLIPBOARD
  // ==========================================================================
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyTooltip = document.getElementById('copy-tooltip');
  const emailLink = document.getElementById('email-link');

  if (copyEmailBtn && emailLink) {
    copyEmailBtn.addEventListener('click', async () => {
      const emailText = emailLink.textContent.trim();
      
      try {
        await navigator.clipboard.writeText(emailText);
        if (copyTooltip) {
          copyTooltip.classList.add('show');
          setTimeout(() => {
            copyTooltip.classList.remove('show');
          }, 2000);
        }
        showToast('Email Copied!', `${emailText} copied to clipboard.`);
      } catch (err) {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = emailText;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('Email Copied!', `${emailText} copied to clipboard.`);
      }
    });
  }


  // ==========================================================================
  // 6. CONTACT FORM VALIDATION & TOAST NOTIFICATION
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const toast = document.getElementById('toast');
  const toastTitle = document.getElementById('toast-title');
  const toastDesc = document.getElementById('toast-desc');
  const toastClose = document.getElementById('toast-close');

  const showToast = (title, description) => {
    if (!toast) return;
    if (toastTitle) toastTitle.textContent = title;
    if (toastDesc) toastDesc.textContent = description;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  };

  if (toastClose) {
    toastClose.addEventListener('click', () => {
      toast.classList.remove('show');
    });
  }

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
      if (messageInput && messageInput.value.trim().length < 10) {
        if (messageGroup) messageGroup.classList.add('has-error');
        isValid = false;
      } else if (messageGroup) {
        messageGroup.classList.remove('has-error');
      }

      if (isValid) {
        // Clear inputs
        contactForm.reset();
        showToast('Message Sent Successfully!', 'Thank you, Trisa will respond to your message soon.');
      }
    });

    // Clear error states on input typing
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
  // 7. SCROLL TO TOP BUTTON
  // ==========================================================================
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  const handleScrollTopVisibility = () => {
    if (window.scrollY > 400) {
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


  // ==========================================================================
  // 8. OTHER PROJECTS DEMO ALERT HANDLERS
  // ==========================================================================
  const demoAlertBtns = document.querySelectorAll('.project-demo-alert-btn');
  demoAlertBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projName = btn.getAttribute('data-project') || 'Project';
      showToast(`${projName}`, 'Demo link placeholder! You can link this to your live deployment or GitHub demo.');
    });
  });

});
