# Trisa Barai — Personal Portfolio Website

A modern, professional, ultra-responsive developer portfolio website created for **Trisa Barai** (Computer Science Student & Aspiring Software Developer), designed with a **blue background theme**, **black and white text & accents**, a single featured **Fake Review Detection System** project, and a dedicated **"Let's Work Together"** contact section.

---

## 📁 1. Folder & File Structure

```
trisaportfolio/
│
├── index.html       # Clean HTML5 markup containing Home, About, Skills, Project, Contact & Footer
├── style.css        # Blue theme stylesheet with responsive media queries for mobile, tablet & laptop
├── script.js        # Vanilla JS for navbar, mobile hamburger menu, AI review classifier demo & form
│
├── images/          # Image assets
│   ├── avatar.svg   # Modern developer tech avatar graphic
│   └── fake-review-demo.svg # Flagship project architecture graphic
│
└── README.md        # Beginner-friendly documentation (this guide)
```

---

## 🎨 2. Design System & Theme Details

* **Background Colors**: Deep navy & royal blue tones (`#0a192f`, `#0d223f`, `#102646`).
* **Text & Accents**: Crisp white (`#ffffff`), soft white (`#e2e8f0`), and dark high-contrast black (`#000000` / `#0a192f`).
* **Interactive Elements**:
  - Translucent frosted-glass card surfaces with subtle blue glow borders.
  - Active section observer that highlights the navbar link automatically as you scroll.
  - Mobile slide-out drawer navigation menu for Android phones and tablets.
  - Instant live AI Fake Review Detector with quick preset buttons (`Genuine Sample` vs `Fake Sample`).
  - One-click copy email button with tooltip feedback.
  - Interactive contact form with real-time field validation.

---

## ✏️ 3. How to Customize Your Links & Photos

### A. How to Add Your Own Photo
1. Copy your picture (e.g., `myphoto.jpg` or `profile.png`) into the `images/` folder.
2. Open [`index.html`](file:///c:/Users/barai/OneDrive/Documents/trisaportfolio/index.html) and find line **126**:
   ```html
   <!-- Change this: -->
   <img src="images/avatar.svg" alt="Trisa Barai" class="hero-avatar">

   <!-- To: -->
   <img src="images/myphoto.jpg" alt="Trisa Barai" class="hero-avatar">
   ```

### B. How to Update Your GitHub Link
Open [`index.html`](file:///c:/Users/barai/OneDrive/Documents/trisaportfolio/index.html) and search for `https://github.com`. Update it with your GitHub URL (e.g., `https://github.com/TrisaBarai`):
* In the **Project Section** (around Line 310)
* In the **Contact Section** (around Line 410)

### C. Contact Details Included:
* **Email**: `baraitrisa@gmail.com`
* **Phone**: `+91 8653024020`

---

## 🚀 4. How to Run the Website on Your Laptop

### Method 1: Double-Click (Zero Setup)
Double-click [`index.html`](file:///c:/Users/barai/OneDrive/Documents/trisaportfolio/index.html) in your Windows File Explorer. It will open instantly in any web browser.

### Method 2: Python Built-in Server
Open PowerShell in the `trisaportfolio` directory and run:
```powershell
python -m http.server 8000
```
Then open your browser and navigate to: **`http://localhost:8000`**

### Method 3: VS Code Live Server
1. Open this folder in **VS Code**.
2. Install the extension **Live Server**.
3. Right-click [`index.html`](file:///c:/Users/barai/OneDrive/Documents/trisaportfolio/index.html) and select **"Open with Live Server"**.

---

## 📱 5. How Responsiveness is Built

* **Android Mobile Phones (320px - 480px)**: The navigation collapses into a smooth hamburger drawer menu, cards stack vertically, buttons become full-width for comfortable touch tapping, and margins adapt cleanly without any horizontal overflow.
* **Tablets (481px - 1024px)**: Grids dynamically display 2-column cards with optimized spacing.
* **Laptops & Desktops (1025px+)**: Expanded multi-column layout with ambient glowing backdrops and responsive typography.

---

## 🌐 6. How to Upload to GitHub Pages (Free Web Hosting)

1. Create a new repository on [GitHub](https://github.com) named `portfolio` (or `<your-username>.github.io`).
2. Run these commands in PowerShell:
   ```powershell
   git init
   git add .
   git commit -m "Create Trisa Barai portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** → **Pages**.
   - Under **Branch**, select **`main`** and **`/ (root)`**.
   - Click **Save**.
4. Your website will be live in 1–2 minutes at: `https://<your-username>.github.io/<your-repo-name>/`.
