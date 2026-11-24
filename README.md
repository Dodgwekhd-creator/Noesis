# NOESIS — Independent Web & Cognitive Studio

A lightweight, zero-dependency studio website built with pure HTML5, CSS3, and Vanilla JavaScript, powered by a 60fps interactive **Magnetic Dot Matrix** canvas.

## Features

- **Magnetic Dot Matrix Canvas:** Full-viewport, DPR-aware HTML5 Canvas engine using typed arrays (`Float32Array`) and spring-damper physics for smooth 60fps motion.
- **Interactive Field Controls:** Floating control pill to switch between **Repel**, **Attract**, and **Wave** physics modes, toggle between **Micro-Dots (`•`)** and **Crosshairs (`+`)**, trigger radial shockwave pulses, or enter **Canvas Focus Mode**.
- **Projects Showcase:** Highlights the flagship build (**LEVELING v4.0** — cognitive training engine and procedural puzzle web app) alongside upcoming studio pipeline slots.
- **Interactive Team Cards:** Responsive profile cards with subtle 3D pointer-tilt hover physics and a detail modal displaying focus areas and skill tags.
- **Zero Dependencies:** Pure semantic HTML5, modern CSS custom properties, inline SVGs, and Vanilla ES6 JavaScript—no frameworks, bundlers, or build steps required.

## Canvas Controls & Shortcuts

| Action | Effect |
| :--- | :--- |
| **Move Cursor / Touch** | Bends and energizes the surrounding dot matrix |
| **Click Empty Space / `Space`** | Emits a radial shockwave ripple across the field |
| **Canvas Button** | Fades out the page UI to interact with the full-screen matrix |
| **`Esc`** | Exits Canvas Focus Mode or closes an open profile modal |

## Project Structure

```text
.
├── index.html   # Page markup, semantic sections, modal, and canvas controls
├── style.css    # Editorial light-theme design tokens, layout, and animations
├── script.js    # Studio data, UI rendering, scroll reveals, and 60fps canvas engine
└── README.md    # Project overview and documentation
