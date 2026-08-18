# Trisa Barai — Personal Portfolio Website

A modern, professional, responsive personal portfolio website created for **Trisa Barai** (Computer Science Student & Aspiring Software Developer).

Built with semantic **HTML5**, modern **Vanilla CSS3**, and clean **Vanilla JavaScript**. Designed with a **Blue theme** (supporting both Clean Blue Light Mode and Midnight Blue Dark Mode), high-contrast **Black & White typography**, and **strictly 5 core sections** with complete multi-device responsiveness.

---

## 📁 1. Project Directory & Files

```
portfolio/
│
├── index.html       # Clean HTML5 markup containing strictly 5 sections
├── style.css        # Pure Vanilla CSS design system with dual-theme and animations
├── script.js        # Vanilla JS for theme toggle, scroll animations, AI classifier demo & form
├── images/          # Image and vector assets
│   ├── avatar.svg   # Modern developer avatar graphic (placeholder for your photo)
│   └── fake-review-demo.svg # Flagship ML project architecture illustration
├── resume/          # Resume folder
│   └── resume.pdf   # Placeholder CV file (ready to replace with your real CV)
└── README.md        # Complete guide & documentation
```

---

## ✨ 2. Key Refinements & Features

### 🌟 1. Punchy, Refined Hero Section & Streamlined CTAs
- **Refined Intro**: Highlighting focus on building robust software systems, modern web architectures, and AI-driven solutions.
- **Top-Priority Primary CTA**: Dominant glowing **"Download CV"** button.
- **Secondary Action**: Clean **"View My Project"** button.
- **Navigation Contact**: Primary **"Let's Connect"** action button in the fixed navbar.

### 🔗 2. LinkedIn & GitHub Integration
- Added dedicated **LinkedIn** profile cards and direct links in:
  * Hero quick contact strip
  * Navigation mobile drawer
  * Dedicated card in the Contact section
  * Footer

### 🎓 3. Education Highlight Block
- Prominently integrated into the **About Me** section:
  * **Degree**: Bachelor of Technology (B.Tech) in Computer Science & Engineering
  * **Expected Graduation**: 2026
  * **Focus Areas**: DAA, DBMS, Operating Systems, OOP (Java/C++), and Applied Machine Learning.

### 🖼️ 4. Visual Project Architecture Showcase
- Embedded an AI NLP system architecture illustration (`images/fake-review-demo.svg`) directly within the **Fake Review Detection System** project card alongside the interactive live demo tester.

### 🌓 5. Dark Mode / Light Mode Toggle
- Toggle button with sun/moon icon located in both the Desktop navigation bar and the Mobile drawer menu.
- **Default Theme**: Clean Blue Theme / Light Mode.
- **Dark Mode**: Deep Midnight Navy Blue with glowing blue highlights.
- **Persistent**: Remembers visitor preference using `localStorage`.

### 🎬 6. Smooth Scroll Animations
- Sections, cards, and skill cards smoothly fade in and slide up via `IntersectionObserver` with `@media (prefers-reduced-motion: reduce)` accessibility support.

---

## 🌐 3. The 5 Portfolio Sections

1. **Home**:
   - "Hi, I'm Trisa Barai"
   - "Computer Science Student & Aspiring Software Developer"
   - Refined introduction focusing on AI and algorithms
   - **Download CV** (Dominant CTA) and **View My Project** buttons
   - Quick contact strip with Email (`baraitrisa@gmail.com`), Phone (`8653024020`), LinkedIn, and GitHub
2. **About Me**:
   - Professional introduction
   - **Education Highlight Card** (B.Tech CSE, Expected Graduation 2026)
   - Core interests tags (Software Development, Web Development, Python, Java, C, C++, Data Structures, Algorithms, DBMS, SQL, AI)
3. **Skills**:
   - 13 skill cards: *C, C++, Java, Python, HTML, CSS, JavaScript, SQL, DBMS, Data Structures, DAA, Operating Systems, Git & GitHub*
4. **Project (Single Featured Project)**:
   - **Fake Review Detection System**
   - Visual architecture showcase preview
   - Key features breakdown & tech stack tags
   - GitHub & Live Demo actions
   - **Interactive Live Review Classifier Demo**
5. **Contact ("Let's Work Together")**:
   - Contact cards for **Email** (`baraitrisa@gmail.com`), **Phone** (`8653024020`), **LinkedIn**, and **GitHub**
   - Responsive contact form with client-side validation & toast feedback
6. **Footer**:
   - `© 2026 Trisa Barai. All Rights Reserved.` with direct email, phone, and LinkedIn links.

---

## 💻 4. How to Run Locally

Double-click [`index.html`](file:///c:/Users/barai/OneDrive/Documents/trisaportfolio/index.html) or run `python -m http.server 8000` and open `http://localhost:8000`.

---

## 📄 License
© 2026 Trisa Barai. All Rights Reserved.
