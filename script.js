/**
 * ============================================================================
 * TRISA BARAI - PERSONAL PORTFOLIO JAVASCRIPT
 * 
 * Interactive & Premium Features:
 * 1. Opening Intro Animation ("Trisa Barai" Letter-by-Letter on #071a33)
 * 2. Background Animated Particle Canvas (Subtle Glowing Blue Mesh)
 * 3. Dynamic Typing Animation ("Computer Science Student", "Aspiring Software Developer")
 * 4. Theme Switcher (Dark Navy Blue & Midnight Navy with Persistence)
 * 5. Scroll Reveal & Learning Journey Animation (IntersectionObserver)
 * 6. FEATURE 1: 🤖 AI Portfolio Assistant ("Ask Trisa AI" Frontend Chat Engine)
 * 7. FEATURE 2: 💻 Developer Terminal (Interactive CLI + Typing Animation)
 * 8. FEATURE 3: 🤖 Upgraded Fake Review Detection Demo (6-Stage NLP Pipeline)
 * 9. Sticky Header & Mobile Drawer Navigation
 * 10. Copy Email to Clipboard with Tooltip Feedback
 * 11. Contact Form Client-Side Validation
 * 12. Scroll-to-Top Button & Toast Notifications
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================================================
  // 1. PREMIUM WELCOME INTRO SCREEN (#071a33 / #0a192f)
  // ==========================================================================
  const introScreen = document.getElementById('intro-screen');
  const introCanvas = document.getElementById('intro-canvas');
  const welcomeTag = document.getElementById('intro-welcome-tag');
  const typedTextEl = document.getElementById('intro-typed-text');
  const cursorEl = document.getElementById('intro-cursor');
  const subtextEl = document.getElementById('intro-subtext');
  const progressWrapper = document.getElementById('intro-progress-wrapper');
  const progressLine = document.getElementById('intro-progress-line');
  const percentText = document.getElementById('intro-percent-text');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Background Interactive Particles on Intro Canvas
  if (introCanvas) {
    const ctx = introCanvas.getContext('2d');
    let width = (introCanvas.width = window.innerWidth);
    let height = (introCanvas.height = window.innerHeight);
    const mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const resizeCanvas = () => {
      width = introCanvas.width = window.innerWidth;
      height = introCanvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);

    const isMobile = window.innerWidth <= 480 || ('ontouchstart' in window);
    const particleCount = isMobile ? 18 : Math.min(Math.floor(window.innerWidth / 18), 45);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 1,
        alpha: Math.random() * 0.45 + 0.35
      });
    }

    let animId = null;

    function renderIntroParticles() {
      ctx.clearRect(0, 0, width, height);

      // Soft Blue Radial Glow around Cursor
      if (mouse.active && !isMobile) {
        const glowGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 140);
        glowGrad.addColorStop(0, 'rgba(56, 189, 248, 0.14)');
        glowGrad.addColorStop(0.5, 'rgba(37, 99, 235, 0.05)');
        glowGrad.addColorStop(1, 'rgba(7, 26, 51, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 140, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Smooth Mouse Interaction (React very slightly to cursor)
        if (mouse.active && !isMobile) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          const maxDist = 130;

          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            const angle = Math.atan2(dy, dx);
            p.x += Math.cos(angle) * force * 2.2;
            p.y += Math.sin(angle) * force * 2.2;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#38bdf8';
        ctx.fill();
        ctx.shadowBlur = 0;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 90) {
            const lineAlpha = (1 - dist / 90) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(renderIntroParticles);
    }

    renderIntroParticles();

    if (introScreen) {
      introScreen.addEventListener('transitionend', () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
        window.removeEventListener('resize', resizeCanvas);
        if (animId) cancelAnimationFrame(animId);
      }, { once: true });
    }
  }

  // Welcome Intro Animation Sequence Execution
  if (introScreen) {
    document.body.style.overflow = 'hidden';

    if (prefersReducedMotion) {
      if (welcomeTag) welcomeTag.classList.add('visible');
      if (typedTextEl) typedTextEl.innerHTML = `Welcome to <span class="intro-phrase-name">Trisa Barai's</span> Portfolio`;
      if (subtextEl) subtextEl.classList.add('visible');
      if (progressWrapper) progressWrapper.classList.add('visible');
      if (progressLine) progressLine.style.width = '100%';
      if (percentText) percentText.textContent = '100%';

      setTimeout(() => {
        introScreen.classList.add('hide');
        document.body.style.overflow = '';
        setTimeout(() => { introScreen.style.display = 'none'; }, 400);
      }, 700);
    } else {
      // Initialize typed text element to empty
      if (typedTextEl) typedTextEl.innerHTML = '';
      if (percentText) percentText.textContent = '0%';
      if (progressLine) progressLine.style.width = '0%';

      // STEP 1: Show "WELCOME" Pill Tag with smooth fade-in (150ms)
      setTimeout(() => {
        if (welcomeTag) welcomeTag.classList.add('visible');
      }, 150);

      // STEP 2: Show sentence ONE LETTER AT A TIME (W -> We -> Wel -> Welc...) (550ms)
      const fullText = "Welcome to Trisa Barai's Portfolio";
      const nameStart = "Welcome to ".length;
      const nameEnd = "Welcome to Trisa Barai's".length;
      let charIdx = 0;

      setTimeout(() => {
        const typeInterval = setInterval(() => {
          if (charIdx <= fullText.length) {
            let formattedHtml = '';
            if (charIdx <= nameStart) {
              formattedHtml = fullText.slice(0, charIdx);
            } else if (charIdx <= nameEnd) {
              const prefix = fullText.slice(0, nameStart);
              const namePart = fullText.slice(nameStart, charIdx);
              formattedHtml = `${prefix}<span class="intro-phrase-name">${namePart}</span>`;
            } else {
              const prefix = fullText.slice(0, nameStart);
              const namePart = fullText.slice(nameStart, nameEnd);
              const suffix = fullText.slice(nameEnd, charIdx);
              formattedHtml = `${prefix}<span class="intro-phrase-name">${namePart}</span>${suffix}`;
            }

            if (typedTextEl) typedTextEl.innerHTML = formattedHtml;
            charIdx++;
          } else {
            clearInterval(typeInterval);
            if (cursorEl) cursorEl.style.display = 'none';

            // STEP 3: Show Subtitle ("Computer Science Student • Software Developer • AI Enthusiast") with smooth fade-in
            setTimeout(() => {
              if (subtextEl) subtextEl.classList.add('visible');

              // STEP 4: Show thin electric-blue loading line & count 0% -> 10% -> ... -> 100%
              setTimeout(() => {
                if (progressWrapper) progressWrapper.classList.add('visible');

                let progress = 0;
                const progressInterval = setInterval(() => {
                  progress += 2;
                  if (progress > 100) progress = 100;

                  const currentVal = Math.round(progress);
                  if (progressLine) progressLine.style.width = `${currentVal}%`;
                  if (percentText) percentText.textContent = `${currentVal}%`;

                  if (progress >= 100) {
                    clearInterval(progressInterval);
                    if (progressLine) progressLine.style.width = '100%';
                    if (percentText) percentText.textContent = '100%';

                    // STEP 5: Display "100%" clearly, wait exactly 0.5 second (500ms), then smoothly fade out
                    setTimeout(() => {
                      introScreen.classList.add('hide');
                      document.body.style.overflow = '';

                      setTimeout(() => {
                        introScreen.style.display = 'none';
                      }, 850);
                    }, 500);
                  }
                }, 28); // Smooth percentage progression 0% to 100%
              }, 350);
            }, 350);
          }
        }, 50); // Distinct 50ms per-character letter-by-letter reveal
      }, 550);
    }
  }


  // ==========================================================================
  // 2. BACKGROUND ANIMATED PARTICLES CANVAS
  // ==========================================================================
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 30), 45);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        color: 'rgba(56, 189, 248, 0.4)'
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.18 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }


  // ==========================================================================
  // 3. DYNAMIC TYPING ANIMATION UNDER HERO NAME
  // ==========================================================================
  const typingElement = document.getElementById('hero-typing-text');
  const roles = [
    'Computer Science Student',
    'Aspiring Software Developer',
    'AI & Algorithms Enthusiast',
    'Problem Solver & Builder'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeRoleEffect() {
    if (!typingElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause when word is complete
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing new word
    }

    setTimeout(typeRoleEffect, typingSpeed);
  }

  setTimeout(typeRoleEffect, 1200);


  // ==========================================================================
  // 4. DARK / LIGHT THEME TOGGLE & PERSISTENCE
  // ==========================================================================
  const htmlRoot = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle-btn');
  const mobileThemeIcon = document.getElementById('mobile-theme-icon');
  const mobileThemeText = document.getElementById('mobile-theme-text');
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  const THEME_STORAGE_KEY = 'trisa_portfolio_theme';
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'light';

  const applyTheme = (theme) => {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    if (theme === 'dark') {
      if (themeIcon) themeIcon.className = 'fa-solid fa-sun theme-icon';
      if (mobileThemeIcon) mobileThemeIcon.className = 'fa-solid fa-sun';
      if (mobileThemeText) mobileThemeText.textContent = 'Switch to Light Mode';
      if (metaThemeColor) metaThemeColor.setAttribute('content', '#050d1a');
    } else {
      if (themeIcon) themeIcon.className = 'fa-solid fa-moon theme-icon';
      if (mobileThemeIcon) mobileThemeIcon.className = 'fa-solid fa-moon';
      if (mobileThemeText) mobileThemeText.textContent = 'Switch to Dark Mode';
      if (metaThemeColor) metaThemeColor.setAttribute('content', '#071a33');
    }
  };

  applyTheme(savedTheme);

  const toggleTheme = () => {
    const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
  };

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener('click', toggleTheme);


  // ==========================================================================
  // 5. SCROLL REVEAL (IntersectionObserver)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('active'));
  }


  // ==========================================================================
  // 6. STICKY NAVBAR & ACTIVE SECTION HIGHLIGHT
  // ==========================================================================
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    if (navbar) {
      if (scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });


  // ==========================================================================
  // 7. MOBILE DRAWER NAVIGATION & BACKDROP
  // ==========================================================================
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const backdrop = document.getElementById('backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openDrawer = () => {
    if (mobileDrawer && backdrop) {
      mobileDrawer.classList.add('active');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'true');
    }
  };

  const closeDrawer = () => {
    if (mobileDrawer && backdrop) {
      mobileDrawer.classList.remove('active');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
      if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
  };

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });


  // ==========================================================================
  // FEATURE 1: 🤖 AI PORTFOLIO ASSISTANT — "Ask Trisa AI" (Frontend Engine)
  // ==========================================================================
  const aiChatToggleBtn = document.getElementById('ai-chat-toggle-btn');
  const aiChatPanel = document.getElementById('ai-chat-panel');
  const aiChatCloseBtn = document.getElementById('ai-chat-close-btn');
  const aiChatMessages = document.getElementById('ai-chat-messages');
  const aiChatForm = document.getElementById('ai-chat-form');
  const aiUserInput = document.getElementById('ai-user-input');
  const aiChips = document.querySelectorAll('.ai-chip');

  // Toggle Assistant Panel
  if (aiChatToggleBtn && aiChatPanel) {
    aiChatToggleBtn.addEventListener('click', () => {
      const isOpen = aiChatPanel.classList.contains('active');
      if (isOpen) {
        aiChatPanel.classList.remove('active');
        aiChatPanel.setAttribute('aria-hidden', 'true');
      } else {
        aiChatPanel.classList.add('active');
        aiChatPanel.setAttribute('aria-hidden', 'false');
        if (aiUserInput) aiUserInput.focus();
      }
    });
  }

  if (aiChatCloseBtn && aiChatPanel) {
    aiChatCloseBtn.addEventListener('click', () => {
      aiChatPanel.classList.remove('active');
      aiChatPanel.setAttribute('aria-hidden', 'true');
    });
  }

  // AI Knowledge Base & Pattern Matcher
  function getAIResponse(query) {
    const q = query.toLowerCase().trim();

    if (q.includes('who') || q.includes('about') || q.includes('trisa')) {
      return "Trisa Barai is a passionate **Computer Science & Engineering Student** and aspiring Software Developer specializing in algorithmic problem solving, modern web architectures, and AI-driven solutions.";
    }

    if (q.includes('skill') || q.includes('tech') || q.includes('know') || q.includes('language')) {
      return "Trisa's core technical toolkit includes:<br>• **Languages:** Python, Java, C++, C, JavaScript, SQL<br>• **Core CS:** Data Structures & Algorithms (DSA), DBMS, Operating Systems, OOP<br>• **Domains:** AI/ML, NLP Text Classification, Web Development (HTML5/CSS3/JS), Git/GitHub.";
    }

    if (q.includes('fake') || q.includes('project') || q.includes('detection') || q.includes('review') || q.includes('system')) {
      return "Trisa's flagship project is the **Fake Review Detection System**. It uses Natural Language Processing (NLP) & machine learning heuristics to preprocess unstructured text, extract sentiment and linguistic signals, and classify consumer reviews with probabilistic confidence scores. You can try the interactive demo in the Project section!";
    }

    if (q.includes('education') || q.includes('degree') || q.includes('college') || q.includes('university') || q.includes('graduate') || q.includes('year')) {
      return "Trisa is currently pursuing a **Bachelor of Technology (B.Tech) in Computer Science & Engineering**, with an expected graduation in **2026**. Key focus areas include Advanced Data Structures, DBMS, and Applied Machine Learning.";
    }

    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('call')) {
      return "You can get in touch with Trisa directly:<br>📧 **Email:** <a href='mailto:baraitrisa@gmail.com' style='color:#38bdf8;text-decoration:underline;'>baraitrisa@gmail.com</a><br>📞 **Phone:** <a href='tel:8653024020' style='color:#38bdf8;text-decoration:underline;'>+91 8653024020</a><br>💼 **LinkedIn:** <a href='https://linkedin.com' target='_blank' style='color:#38bdf8;text-decoration:underline;'>linkedin.com/in/TrisaBarai</a><br>🐙 **GitHub:** <a href='https://github.com' target='_blank' style='color:#38bdf8;text-decoration:underline;'>github.com/TrisaBarai</a>";
    }

    if (q.includes('available') || q.includes('hire') || q.includes('job') || q.includes('opportunity') || q.includes('internship') || q.includes('work')) {
      return "🎉 **Yes!** Trisa is actively available for Software Engineering internships, junior developer roles, and high-impact technical collaborations. Feel free to send a message via the Contact section!";
    }

    if (q.includes('resume') || q.includes('cv') || q.includes('download')) {
      return "You can download Trisa's CV instantly by clicking the glowing **'Download CV'** button in the Home section, or directly via <a href='resume/resume.pdf' download='Trisa_Barai_CV.pdf' style='color:#38bdf8;text-decoration:underline;'>resume/resume.pdf</a>.";
    }

    if (q.includes('hi') || q.includes('hello') || q.includes('hey')) {
      return "Hello! 😊 How can I help you today? Feel free to ask about Trisa's skills, projects, education, or availability!";
    }

    return "Thanks for asking! Trisa is a Computer Science student skilled in Python, Java, C++, DSA, and AI systems like the Fake Review Detection System. You can ask about her **skills**, **projects**, **education**, or **contact info**!";
  }

  function appendChatMessage(sender, htmlContent) {
    if (!aiChatMessages) return;

    const msgEl = document.createElement('div');
    msgEl.className = `ai-msg ai-msg-${sender}`;

    if (sender === 'bot') {
      msgEl.innerHTML = `
        <div class="ai-msg-avatar"><i class="fa-solid fa-robot"></i></div>
        <div class="ai-msg-bubble">${htmlContent}</div>
      `;
    } else {
      msgEl.innerHTML = `
        <div class="ai-msg-bubble">${htmlContent}</div>
      `;
    }

    aiChatMessages.appendChild(msgEl);
    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
  }

  function showTypingIndicator() {
    const typingEl = document.createElement('div');
    typingEl.id = 'ai-typing-indicator';
    typingEl.className = 'ai-msg ai-msg-bot';
    typingEl.innerHTML = `
      <div class="ai-msg-avatar"><i class="fa-solid fa-robot"></i></div>
      <div class="ai-msg-bubble ai-typing-indicator">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;
    aiChatMessages.appendChild(typingEl);
    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    return typingEl;
  }

  function handleUserQuery(queryText) {
    if (!queryText.trim()) return;

    appendChatMessage('user', queryText);
    if (aiUserInput) aiUserInput.value = '';

    const typingEl = showTypingIndicator();

    setTimeout(() => {
      if (typingEl) typingEl.remove();
      const responseHtml = getAIResponse(queryText);
      appendChatMessage('bot', responseHtml);
    }, 450);
  }

  if (aiChatForm) {
    aiChatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (aiUserInput && aiUserInput.value.trim()) {
        handleUserQuery(aiUserInput.value.trim());
      }
    });
  }

  aiChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-question');
      if (q) handleUserQuery(q);
    });
  });


  // ==========================================================================
  // FEATURE 2: 💻 DEVELOPER TERMINAL (CLI & Typing Simulation)
  // ==========================================================================
  const terminalInput = document.getElementById('terminal-interactive-input');
  const terminalDynamicOutput = document.getElementById('terminal-dynamic-output');
  const terminalBody = document.getElementById('terminal-body');
  const termButtons = document.querySelectorAll('.term-btn');

  function executeTerminalCommand(cmd) {
    const rawCmd = cmd.trim().toLowerCase();
    if (!rawCmd) return;

    if (rawCmd === 'clear') {
      if (terminalDynamicOutput) terminalDynamicOutput.innerHTML = '';
      return;
    }

    let outputHtml = '';

    switch (rawCmd) {
      case 'whoami':
        outputHtml = `<span class="term-role">Computer Science Student</span> &amp; <span class="term-highlight">Aspiring Software Developer</span>`;
        break;
      case 'skills':
        outputHtml = `
          <div class="term-skills-response">
            <span class="term-tag">Python</span>
            <span class="term-tag">Java</span>
            <span class="term-tag">C++</span>
            <span class="term-tag">C</span>
            <span class="term-tag">DSA</span>
            <span class="term-tag">DBMS</span>
            <span class="term-tag">AI/ML</span>
            <span class="term-tag">Web Development</span>
          </div>`;
        break;
      case 'project':
        outputHtml = `<i class="fa-solid fa-star term-star"></i> <span class="term-proj-name">Fake Review Detection System</span> <span class="term-muted">(NLP &amp; Machine Learning)</span>`;
        break;
      case 'status':
        outputHtml = `
          <div class="term-status-response">
            <div class="term-status-row"><span class="status-key">Portfolio:</span> <span class="status-val online">ONLINE [200 OK]</span></div>
            <div class="term-status-row"><span class="status-key">AI Demo:</span> <span class="status-val online">ONLINE</span></div>
            <div class="term-status-row"><span class="status-key">Projects:</span> <span class="status-val">01 Flagship System</span></div>
            <div class="term-status-row"><span class="status-key">Contact:</span> <span class="status-val available">AVAILABLE FOR OPPORTUNITIES</span></div>
          </div>`;
        break;
      case 'contact':
        outputHtml = `
          <div class="term-contact-response">
            <div>📧 Email: <span class="term-highlight">baraitrisa@gmail.com</span></div>
            <div>📞 Phone: <span class="term-highlight">+91 8653024020</span></div>
            <div>💼 LinkedIn: <span class="term-muted">linkedin.com/in/TrisaBarai</span></div>
            <div>🐙 GitHub: <span class="term-muted">github.com/TrisaBarai</span></div>
          </div>`;
        break;
      case 'education':
        outputHtml = `<div>🎓 <strong>B.Tech in Computer Science &amp; Engineering</strong> (Expected Graduation: 2026)</div>`;
        break;
      case 'help':
        outputHtml = `<div>Available commands: <span class="term-highlight">whoami, skills, project, status, contact, education, clear</span></div>`;
        break;
      default:
        outputHtml = `<div style="color:#f87171;">bash: command not found: ${rawCmd}. Type <span class="term-highlight">'help'</span> for available commands.</div>`;
        break;
    }

    if (terminalDynamicOutput) {
      const entryEl = document.createElement('div');
      entryEl.className = 'terminal-entry';
      entryEl.innerHTML = `
        <div class="terminal-prompt-line">
          <span class="terminal-user">trisa@portfolio</span>:<span class="terminal-path">~</span>$ <span class="terminal-cmd">${rawCmd}</span>
        </div>
        <div class="terminal-response">${outputHtml}</div>
      `;
      terminalDynamicOutput.appendChild(entryEl);
      if (terminalBody) terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  }

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = terminalInput.value;
        terminalInput.value = '';
        executeTerminalCommand(val);
      }
    });
  }

  termButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) executeTerminalCommand(cmd);
    });
  });


  // ==========================================================================
  // FEATURE 3: 🤖 UPGRADED FAKE REVIEW DETECTION DEMO (6-Stage NLP Pipeline)
  // ==========================================================================
  const runAnalysisBtn = document.getElementById('run-analysis-btn');
  const clearAnalysisBtn = document.getElementById('clear-analysis-btn');
  const reviewInput = document.getElementById('live-review-input');
  const sampleGenuineBtn = document.getElementById('sample-genuine-btn');
  const sampleFakeBtn = document.getElementById('sample-fake-btn');
  const openDemoBtn = document.getElementById('open-demo-btn');

  const analyzingBox = document.getElementById('tester-analyzing-box');
  const analyzingStatusText = document.getElementById('analyzing-status-text');
  const resultBox = document.getElementById('tester-result-box');
  const verdictPill = document.getElementById('verdict-pill');
  const confidenceLevelTag = document.getElementById('confidence-level-tag');
  const probabilityScoreText = document.getElementById('probability-score-text');
  const confidenceBarPercentage = document.getElementById('confidence-bar-percentage');
  const confidenceBarFill = document.getElementById('confidence-bar-fill');
  const resultReasons = document.getElementById('result-reasons');
  const pipelineStatusIndicator = document.getElementById('pipeline-status-indicator');

  const stages = [
    document.getElementById('stage-0'),
    document.getElementById('stage-1'),
    document.getElementById('stage-2'),
    document.getElementById('stage-3'),
    document.getElementById('stage-4'),
    document.getElementById('stage-5')
  ];

  const GENUINE_SAMPLE = "I purchased this laptop three months ago for my university coursework. Battery lasts around 7 hours with regular coding and browsing. The keyboard feels great and build quality is sturdy for the price.";
  const FAKE_SAMPLE = "BEST PRODUCT EVER IN THE WORLD!!! BUY NOW 100% AMAZING GUARANTEED RESULTS MUST BUY MIRACLE PRODUCT FIVE STARS ⭐⭐⭐⭐⭐";

  if (sampleGenuineBtn && reviewInput) {
    sampleGenuineBtn.addEventListener('click', () => {
      reviewInput.value = GENUINE_SAMPLE;
      reviewInput.focus();
    });
  }

  if (sampleFakeBtn && reviewInput) {
    sampleFakeBtn.addEventListener('click', () => {
      reviewInput.value = FAKE_SAMPLE;
      reviewInput.focus();
    });
  }

  if (openDemoBtn && reviewInput) {
    openDemoBtn.addEventListener('click', () => {
      reviewInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      reviewInput.focus();
    });
  }

  function setPipelineStage(activeIdx) {
    stages.forEach((stage, idx) => {
      if (!stage) return;
      stage.classList.remove('active', 'completed');
      if (idx < activeIdx) {
        stage.classList.add('completed');
      } else if (idx === activeIdx) {
        stage.classList.add('active');
      }
    });
  }

  function analyzeReviewText(text) {
    const lower = text.toLowerCase();
    const exclamationCount = (text.match(/!/g) || []).length;
    const uppercaseLetters = (text.match(/[A-Z]/g) || []).length;
    const totalLetters = (text.match(/[a-zA-Z]/g) || []).length || 1;
    const upperRatio = uppercaseLetters / totalLetters;

    const spamWords = [
      'best ever', 'buy now', '100% amazing', 'guaranteed', 'miracle',
      'must buy', 'five stars', 'unbelievable', 'free gift', 'act now',
      'waste of money', 'scam', 'fraud', 'dont buy', 'worst ever'
    ];

    let spamCount = 0;
    const detectedSignals = [];

    spamWords.forEach((word) => {
      if (lower.includes(word)) {
        spamCount++;
        detectedSignals.push(`Detected promotional phrase: "${word}"`);
      }
    });

    if (exclamationCount >= 3) {
      spamCount += 2;
      detectedSignals.push(`Excessive exclamation marks (${exclamationCount}) indicating artificial sentiment.`);
    }

    if (upperRatio > 0.35 && text.length > 20) {
      spamCount += 2;
      detectedSignals.push(`High uppercase character ratio (${Math.round(upperRatio * 100)}%), typical in spam triggers.`);
    }

    const isFake = spamCount >= 2;
    let probability;

    if (isFake) {
      probability = Math.min(78 + spamCount * 4, 98);
      if (detectedSignals.length === 0) {
        detectedSignals.push('Unusual linguistic repetition and exaggerated praise pattern.');
      }
    } else {
      probability = Math.min(88 + Math.floor(Math.random() * 8), 96);
      detectedSignals.push('Balanced descriptive vocabulary with objective user experience details.');
      detectedSignals.push('Normal punctuation distribution and realistic sentiment tone.');
    }

    return { isFake, probability, detectedSignals };
  }

  function runClassificationDemo() {
    if (!reviewInput) return;
    const text = reviewInput.value.trim();

    if (!text) {
      alert('Please enter or select a review to analyze.');
      reviewInput.focus();
      return;
    }

    if (resultBox) resultBox.style.display = 'none';
    if (analyzingBox) analyzingBox.style.display = 'flex';
    if (pipelineStatusIndicator) pipelineStatusIndicator.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';

    // Sequential 4-Step Animation
    setPipelineStage(1);
    if (analyzingStatusText) analyzingStatusText.textContent = 'Step 1/4: Text preprocessing & tokenization...';

    setTimeout(() => {
      setPipelineStage(2);
      if (analyzingStatusText) analyzingStatusText.textContent = 'Step 2/4: NLP linguistic feature extraction...';
    }, 450);

    setTimeout(() => {
      setPipelineStage(3);
      if (analyzingStatusText) analyzingStatusText.textContent = 'Step 3/4: Sentiment analysis & pattern detection...';
    }, 850);

    setTimeout(() => {
      setPipelineStage(4);
      if (analyzingStatusText) analyzingStatusText.textContent = 'Step 4/4: AI Classifier model inference...';
    }, 1250);

    setTimeout(() => {
      setPipelineStage(5);
      if (analyzingBox) analyzingBox.style.display = 'none';
      if (pipelineStatusIndicator) pipelineStatusIndicator.innerHTML = '<i class="fa-solid fa-circle-check" style="color:#10b981;"></i> Pipeline Complete';

      const analysis = analyzeReviewText(text);

      if (resultBox) {
        resultBox.style.display = 'flex';

        if (verdictPill) {
          verdictPill.className = analysis.isFake ? 'verdict-pill fake' : 'verdict-pill genuine';
          verdictPill.textContent = analysis.isFake ? '⚠️ Fake / Suspicious Review' : '✓ Genuine Review';
        }

        if (confidenceLevelTag) {
          confidenceLevelTag.textContent = 'Confidence: High';
        }

        if (probabilityScoreText) {
          probabilityScoreText.textContent = `Probability: ${analysis.probability}%`;
        }

        if (confidenceBarPercentage) {
          confidenceBarPercentage.textContent = `${analysis.probability}%`;
        }

        if (confidenceBarFill) {
          confidenceBarFill.className = analysis.isFake ? 'confidence-bar-fill fake-fill' : 'confidence-bar-fill';
          confidenceBarFill.style.width = '0%';
          setTimeout(() => {
            confidenceBarFill.style.width = `${analysis.probability}%`;
          }, 50);
        }

        if (resultReasons) {
          resultReasons.innerHTML = `<ul>${analysis.detectedSignals.map((s) => `<li>${s}</li>`).join('')}</ul>`;
        }
      }
    }, 1650);
  }

  if (runAnalysisBtn) runAnalysisBtn.addEventListener('click', runClassificationDemo);

  if (clearAnalysisBtn) {
    clearAnalysisBtn.addEventListener('click', () => {
      if (reviewInput) reviewInput.value = '';
      if (analyzingBox) analyzingBox.style.display = 'none';
      if (resultBox) resultBox.style.display = 'none';
      setPipelineStage(0);
      if (pipelineStatusIndicator) pipelineStatusIndicator.innerHTML = '<i class="fa-solid fa-circle-dot"></i> Pipeline Ready';
    });
  }


  // ==========================================================================
  // 10. COPY EMAIL TO CLIPBOARD
  // ==========================================================================
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyTooltip = document.getElementById('copy-tooltip');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('baraitrisa@gmail.com').then(() => {
        if (copyTooltip) {
          copyTooltip.classList.add('show');
          setTimeout(() => {
            copyTooltip.classList.remove('show');
          }, 2000);
        }
      });
    });
  }


  // ==========================================================================
  // 11. CONTACT FORM VALIDATION & FEEDBACK
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');

  const showToast = (title, message) => {
    if (!toast) return;
    const toastTitle = document.getElementById('toast-title');
    const toastMsg = document.getElementById('toast-message');
    if (toastTitle) toastTitle.textContent = title;
    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const msgInput = document.getElementById('message');

      let isValid = true;

      if (!nameInput || !nameInput.value.trim()) {
        const err = document.getElementById('name-error');
        if (err) err.classList.add('visible');
        if (nameInput) nameInput.classList.add('invalid');
        isValid = false;
      } else {
        const err = document.getElementById('name-error');
        if (err) err.classList.remove('visible');
        nameInput.classList.remove('invalid');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
        const err = document.getElementById('email-error');
        if (err) err.classList.add('visible');
        if (emailInput) emailInput.classList.add('invalid');
        isValid = false;
      } else {
        const err = document.getElementById('email-error');
        if (err) err.classList.remove('visible');
        emailInput.classList.remove('invalid');
      }

      if (!msgInput || msgInput.value.trim().length < 8) {
        const err = document.getElementById('message-error');
        if (err) err.classList.add('visible');
        if (msgInput) msgInput.classList.add('invalid');
        isValid = false;
      } else {
        const err = document.getElementById('message-error');
        if (err) err.classList.remove('visible');
        msgInput.classList.remove('invalid');
      }

      if (isValid) {
        showToast('Message Sent!', 'Thank you for reaching out, Trisa will reply shortly.');
        contactForm.reset();
      }
    });
  }


  // ==========================================================================
  // 12. SCROLL TO TOP BUTTON
  // ==========================================================================
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  window.addEventListener('scroll', () => {
    if (scrollTopBtn) {
      if (window.pageYOffset > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
