# Trisa Barai — Personal Portfolio Website

A modern, professional, ultra-responsive developer portfolio website built for **Trisa Barai** (Computer Science & Software Engineering Student), featuring a primary blue theme, high-contrast typography, interactive AI demo for the **Fake Review Detection System**, skill cards, education timeline, and resume download.

---

## Table of Contents
1. [Folder & File Structure](#1-folder--file-structure)
2. [How to Add Your Photo](#2-how-to-add-your-photo)
3. [How to Add Your Resume](#3-how-to-add-your-resume)
4. [How to Add Your GitHub Link](#4-how-to-add-your-github-link)
5. [How to Add Your LinkedIn Link](#5-how-to-add-your-linkedin-link)
6. [How to Run the Website on Your Laptop](#6-how-to-run-the-website-on-your-laptop)
7. [How Responsiveness Works](#7-how-responsiveness-works)
8. [How to Upload & Publish to GitHub Pages (Free)](#8-how-to-upload--publish-to-github-pages-free)

---

## 1. Folder & File Structure

```
trisaportfolio/
│
├── index.html              # Main HTML5 webpage containing all 9 sections
├── style.css               # Vanilla CSS3 styling, modern blue color palette & media queries
├── script.js               # Vanilla JavaScript for mobile menu, AI analyzer demo & contact form
│
├── images/                 # Image assets & illustrations
│   ├── avatar.svg          # Modern developer illustration avatar
│   └── fake-review-demo.svg# Architecture diagram for Fake Review Detection System
│
├── resume/                 # Resume folder
│   ├── resume.pdf          # Your downloadable resume PDF
│   └── README.md           # Instructions for replacing resume
│
├── projects/               # Project documentation folder
│   └── fake-review-system/ # Notes & specifications for Fake Review Detection System
│
├── backend/                # Optional Python Flask + SQLite Backend API
│   ├── app.py              # Flask server with ML review classification endpoint
│   ├── database.py         # Database utilities
│   ├── requirements.txt    # Python dependencies
│   └── README.md           # Guide on running backend locally
│
├── resume.pdf              # Root copy of resume for direct download links
└── README.md               # Beginner-friendly guide (this document)
```

---

## 2. How to Add Your Photo

1. Prepare your photo (JPEG, PNG, or WebP) and rename it to something simple like `profile.jpg` or `myphoto.png`.
2. Copy your photo into the `images/` folder:
   ```
   images/profile.jpg
   ```
3. Open `index.html` in VS Code or any text editor.
4. Locate the avatar image inside the **Hero Section** (around Line 140):
   ```html
   <!-- Find this line: -->
   <img src="images/avatar.svg" alt="Trisa Barai - Software Engineering Student" class="hero-avatar-img">
   
   <!-- Change it to: -->
   <img src="images/profile.jpg" alt="Trisa Barai" class="hero-avatar-img">
   ```
5. Save the file and refresh your browser. Your photo will now appear with the ambient glowing blue border!

---

## 3. How to Add Your Resume

1. Export your real resume from MS Word, Canva, or Google Docs as a PDF named `resume.pdf`.
2. Copy and replace the `resume.pdf` in both places:
   * Inside the `resume/` folder (`resume/resume.pdf`)
   * In the main root directory (`resume.pdf`)
3. All download buttons on the site (Hero button, Navigation Drawer, and dedicated Resume Section) are already configured to download `resume/resume.pdf` automatically with the filename `Trisa_Barai_Resume.pdf`.

---

## 4. How to Add Your GitHub Link

Open `index.html` and search for `https://github.com`. Replace it with your actual profile link (e.g., `https://github.com/yourusername`):

1. **In the Header / Drawer Socials** (Around Line 70)
2. **In the Hero Socials Bar** (Around Line 120):
   ```html
   <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="GitHub Profile">
     <i class="fa-brands fa-github"></i>
   </a>
   ```
3. **In the Featured Project Card** (Around Line 325):
   ```html
   <a href="https://github.com/yourusername/fake-review-detection" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
     <i class="fa-brands fa-github"></i>
     <span>View on GitHub</span>
   </a>
   ```
4. **In the Contact Section & Footer** (Around Line 460 & 530).

---

## 5. How to Add Your LinkedIn Link

Open `index.html` and search for `https://linkedin.com`. Replace it with your actual LinkedIn profile:

1. **In the Hero Section Socials** (Around Line 125):
   ```html
   <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="LinkedIn Profile">
     <i class="fa-brands fa-linkedin-in"></i>
   </a>
   ```
2. **In the Contact Section Card** (Around Line 445):
   ```html
   <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" class="contact-card-value">
     linkedin.com/in/yourusername
   </a>
   ```
3. **In the Footer** (Around Line 535).

---

## 6. How to Run the Website on Your Laptop

You have 3 easy ways to run the website locally:

### Option A: Double Click (Easiest)
- Simply open your project folder in File Explorer on Windows.
- Double-click `index.html`.
- It will instantly open and work in your default browser (Chrome, Edge, Firefox).

### Option B: VS Code Live Server (Recommended for Editing)
1. Open the `trisaportfolio` folder in **VS Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click on `index.html` and click **"Open with Live Server"**.
4. Any time you save a file, the browser will automatically refresh with your changes!

### Option C: Python Simple Server
Open your terminal in the portfolio folder and run:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.

---

## 7. How Responsiveness Works

The website is engineered from the ground up to be 100% responsive without horizontal scrolling:

1. **Flexible CSS Grid & Flexbox**: All skill cards, project cards, and bio pillars automatically calculate how many items fit side-by-side depending on screen width.
2. **Viewport Meta Tag**:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```
   Ensures Android and iOS mobile browsers scale pages to device dimensions rather than rendering desktop zoom.
3. **Mobile Drawer Navigation**: On screens narrower than `768px`, the top navigation links collapse into a clean hamburger button that opens an animated drawer.
4. **Adaptive Breakpoints (`style.css`)**:
   * **Desktops (> 1024px)**: Multi-column side-by-side layouts.
   * **Laptops / Tablets (769px - 1024px)**: Balanced single/dual column grids.
   * **Mobile Phones (≤ 480px)**: Full-width touch-friendly buttons, single column cards, and large tap targets.

---

## 8. How to Upload & Publish to GitHub Pages (Free)

Host your portfolio online for free on your own `https://yourusername.github.io/trisaportfolio` link:

### Step 1: Initialize Git and Commit
Open terminal in your portfolio folder:
```bash
git add .
git commit -m "Initial commit of Trisa Barai portfolio"
```

### Step 2: Create a New Repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Name the repository `trisaportfolio` (or `yourusername.github.io`).
3. Set visibility to **Public**.
4. Click **Create repository**.

### Step 3: Push Your Code to GitHub
In your terminal, copy and run the commands shown on GitHub:
```bash
git branch -M main
git remote add origin https://github.com/yourusername/trisaportfolio.git
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. On your GitHub repository page, click **Settings** (gear icon at the top).
2. On the left sidebar, click **Pages**.
3. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
4. Wait 1-2 minutes. GitHub will display your live website URL:
   `https://yourusername.github.io/trisaportfolio/`

🎉 **Congratulations! Your portfolio is live for recruiters and companies worldwide!**
