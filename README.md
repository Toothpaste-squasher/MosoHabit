# MosoHabit Tuition Website

A premium, interactive landing page for **MosoHabit Tuition**—a specialised online tutoring service helping Years 7–12 students in Canberra achieve top marks in BSSS Mathematics, Physics, and Science.

---

## 🎋 Brand Metaphor: The Moso Bamboo

The name **MosoHabit** and the website's core visual theme are inspired by the metaphor of the **Moso Bamboo**:
*   For the first four years, the Moso bamboo grows entirely underground, establishing a massive, complex root network invisible to the eye.
*   In the fifth year, it suddenly breaks ground and grows explosively to over 80 feet in just 1–2 months.
*   Similarly, academic success relies on consistent study habits and foundational understanding (the roots) before explosive grades (the shoot) are unlocked.

---

## ✨ Features

*   **Interactive Bamboo Growth Tracker**: A floating glassmorphic widget in the bottom-right corner.
    *   **Underground Growth (Scroll 0% to 93%)**: Slowly scrolls downwards to grow a wobbly tap root, lateral roots, and branching capillary roots in a staggered sequence, perfectly representing foundation-building.
    *   **Explosive Growth (Scroll 93% to 100%)**: Shoots up 9 segments of stalk, wobbly joint nodes, and upward-pointing bamboo leaves rapidly as the user reaches the booking form.
*   **Wiggling "Click me!" Seedling Trigger**: When minimized by default, a floating green seedling button is shown with a subtle, pulsating tooltip prompting visitors to expand it.
*   **ACT BSSS Compliance**: Explicitly tailored to the Canberra college BSSS system, including a friendly but clear academic integrity notice linking to the official [ACT BSSS Academic Integrity policy](https://www.bsss.act.edu.au/academic_integrity_information).
*   **Fully Responsive & Interactive FAQ Accordion**: Sleek card layout styling, smooth sliding animations, and clean, bulleted rates structures.
*   **Australian English Spelling**: Checked and standardised page-wide (e.g., *specialised*, *prioritise*, *personalised*, *practise*).

---

## 📂 File Structure

*   **`index.html`**: Semantic layout containing hero sections, tutor story, teaching philosophies, offerings, FAQ accordion, and the vector coordinates/timeline curves for the SVG growth tracker.
*   **`style.css`**: Styling system built on Vanilla CSS variables. Handles glassmorphic blurs, hover transparencies, leaf pop-up spring transitions (`cubic-bezier`), and keyframe animations.
*   **`script.js`**: Calculates scroll position dynamically relative to the `#contact` section, triggers staggered root/stalk animations, and handles widget minimizing/restoration.

---

## 🚀 Getting Started

Simply open `index.html` directly in any web browser, or serve it locally using a lightweight server:

### VS Code Live Server
1. Install the **Live Server** extension.
2. Click **Go Live** in the status bar to launch.

### Python Simple Server
Run the following command in your terminal inside the project directory:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

### Node.js (npx)
Run:
```bash
npx serve .
```
