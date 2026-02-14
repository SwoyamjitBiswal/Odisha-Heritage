# Utkala Gaurav - The Soul of Odisha

This project is a modern, responsive frontend website showcasing the rich culture, heritage, and identity of Odisha, India. It is built with HTML5, CSS3, and Vanilla JavaScript, featuring a dynamic, multilingual interface and live animations.

## 🎨 Design & Features

*   **Theme:** A premium dark theme enhanced with a vibrant color palette and subtle, continuous "live glow" animations on content cards.
*   **Dynamic Content:** All content is loaded dynamically from a central `assets/json/data.json` file.
*   **Multilingual Support:** A fully functional language toggle allows users to switch between English and Odia.
*   **Interactive Animations:**
    *   The hero text animates into view using **GSAP**.
    *   Content cards and section titles fade and slide into view on scroll using the **IntersectionObserver API**.
*   **Smooth Scrolling:** Implemented with **Locomotive Scroll** for a fluid user experience.
*   **Detail Pages:** Users can click on any content card to view a dedicated page with more detailed information.
*   **Responsive:** The site is fully responsive, adapting from a grid layout on desktops to stacked/scrollable cards on mobile devices.

## 📂 Project Structure

```
.
├── index.html
├── detail.html
├── styles/
│   └── main.css
├── scripts/
│   ├── app.js
│   └── detail.js
├── assets/
│   ├── json/
│   │   └── data.json
│   └── images/
├── loco.css
└── README.md
```

## 🛠️ How to Run & Deploy

This is a static website and requires no build steps.

1.  **Run Locally:** For the best experience (to allow the `fetch` API to work correctly for loading JSON data), serve the files using a local server. A popular choice is the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for VS Code.
2.  **Deploy:** The project is ready for deployment. You can host it on any static web hosting service, such as:
    *   **GitHub Pages**
    *   **Netlify**
    *   **Vercel**

Simply upload the contents of this repository to your chosen host.

---
*This project was initialized from a portfolio template and has been completely redesigned and repurposed to celebrate the spirit of Odisha.*