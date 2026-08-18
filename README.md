# Trisa Barai — Personal Portfolio Website

A modern, professional, responsive personal portfolio website created for **Trisa Barai** (Computer Science Student & Aspiring Software Developer).

Built with semantic **HTML5**, modern **Vanilla CSS3**, and clean **Vanilla JavaScript**. Designed with a **Blue theme**, high-contrast **Black & White typography**, and **strictly 5 core sections** with complete multi-device responsiveness.

---

## 📁 1. Project Directory & Files

```
portfolio/
│
├── index.html       # Clean HTML5 markup containing strictly 5 sections
├── style.css        # Pure Vanilla CSS design system with responsive media queries
├── script.js        # Vanilla JS for navbar, mobile drawer menu, AI classifier demo & form
├── images/          # Image and vector assets
│   ├── avatar.svg   # Modern developer avatar graphic (placeholder for your photo)
│   └── fake-review-demo.svg # Flagship ML project architecture illustration
└── README.md        # Complete guide & documentation
```

---

## 🌐 2. The 5 Portfolio Sections

1. **Home**:
   - "Hi, I'm Trisa Barai"
   - "Computer Science Student & Aspiring Software Developer"
   - Short introduction
   - **View My Project** and **Contact Me** action buttons
   - Quick contact strip with Email (`baraitrisa@gmail.com`) and Phone (`8653024020`)
   - Developer avatar card with floating status tags
2. **About Me**:
   - Short, professional introduction
   - Core interests tags: *Software Development, Web Development, Python, Java, C, C++, Data Structures, Algorithms, DBMS, SQL, Artificial Intelligence*
3. **Skills**:
   - 13 skill cards with blue glow hover effects:
     * **C**, **C++**, **Java**, **Python**, **HTML**, **CSS**, **JavaScript**, **SQL**, **DBMS**, **Data Structures**, **DAA**, **Operating Systems**, **Git & GitHub**
4. **Project (Single Featured Project)**:
   - **Fake Review Detection System**
   - Full description & key features breakdown
   - Tech stack tags: *Python, Machine Learning, HTML, CSS, JavaScript, Flask, SQL*
   - Action buttons: **GitHub** & **Live Demo**
   - **Interactive Live Review Classifier Demo** built into the card for instant testing
5. **Contact ("Let's Work Together")**:
   - Contact cards for **Email** (`baraitrisa@gmail.com`) with one-click copy button, **Phone** (`8653024020` / `+91 8653024020`), and **GitHub**
   - Responsive contact form (Name, Email, Message, Send Message button) with instant client-side validation & toast feedback
6. **Footer**:
   - `© 2026 Trisa Barai. All Rights Reserved.` with direct email and phone contact details.

---

## ✏️ 3. How to Customize Your Photo & Links

### 🖼️ Where to Add Your Photo
1. Copy your picture (e.g. `myphoto.jpg` or `profile.png`) into the **`images/`** folder.
2. Open [`index.html`](file:///c:/Users/barai/OneDrive/Documents/trisaportfolio/index.html) and locate line **163**:
   ```html
   <!-- Change this: -->
   <img src="images/avatar.svg" alt="Trisa Barai" class="hero-avatar">

   <!-- To: -->
   <img src="images/myphoto.jpg" alt="Trisa Barai" class="hero-avatar">
   ```

### 🐙 Where to Add Your GitHub Link
Open [`index.html`](file:///c:/Users/barai/OneDrive/Documents/trisaportfolio/index.html) and search for `https://github.com`:
* **Mobile Drawer**: Line 96
* **Project Section**: Line 405
* **Contact Section**: Line 523

---

## 💻 4. How to Run the Website on Your Laptop

### Method 1: Double-Click (Simplest)
Open Windows File Explorer, navigate to your portfolio folder, and double-click [`index.html`](file:///c:/Users/barai/OneDrive/Documents/trisaportfolio/index.html).

### Method 2: Python Web Server
Open PowerShell in this folder and run:
```powershell
python -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.

---

## 📱 5. Responsive Design Across Devices

- **Android Mobile Phones (320px – 480px)**: The navigation collapses into a slide-out hamburger drawer with touch shortcuts. Buttons become full-width for comfortable tapping, cards stack neatly in a single column, and `overflow-x: hidden` prevents any horizontal scrolling.
- **Tablets (481px – 768px)**: Adapts to balanced 2-column cards.
- **Laptops & Desktops (1025px+)**: Wide multi-column layout with fixed blurred glass navigation and hover animations.

---

## 📄 License
© 2026 Trisa Barai. All Rights Reserved.
