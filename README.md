# NOESIS — Independent Web & Cognitive Studio

A lightweight, zero-dependency studio website built with pure HTML5, CSS3, and Vanilla JavaScript, powered by a 60fps interactive **Magnetic Dot Matrix** canvas and a full-screen **Animation Playground**.

## Features

- **Iridescent Magnetic Dot Matrix Canvas:** Full-viewport, DPR-aware HTML5 Canvas engine using typed arrays (`Float32Array`) and spring-damper physics. Combines organic harmonic wave drift with lively cursor repulsion, an iridescent multi-color energy gradient (slate → indigo → violet → cyan → pink), and click-triggered shockwave ripples with sparkling micro-particle bursts.
- **Scroll Progress Bar:** Top-of-page animated gradient bar (indigo → cyan → pink) that tracks scroll position.
- **Kinetic Hero Animations:** Vibrant flowing gradient sheen on the NOESIS title, staggered spring-bounce entrance animations for all hero elements, ambient floating motion on the status badge, and a playful 3D spin on the brand hexagon.
- **Magnetic Buttons:** Primary, secondary, hero, and navbar buttons smoothly pull toward the cursor on hover with snappy elastic spring-back on leave.
- **Spotlight + 3D Tilt Cards:** Cursor-tracking radial spotlight glow and smooth 3D perspective tilt on both project cards and team member cards, with floating/pop animations on tag pills when hovering a card.
- **Click Sparkles:** Lightweight bursts of 8–12 crisp colored micro-sparks whenever a CTA button is clicked, a modal opens, or the user clicks empty space.
- **Bouncy Scroll Reveals & Modal Pop:** `.reveal` elements and the team detail modal use spring easing (`cubic-bezier(0.34, 1.56, 0.64, 1)`) with staggered delays for a joyful, tactile feel.
- **Animation Playground (`playground.html`):** A dedicated full-screen pure-animation sandbox with 4 switchable 60fps interactive modes, a palette cycler, optional Web Audio synth, and full touch support.
- **Projects Showcase:** Highlights the flagship build (**LEVELING v4.0** — cognitive training engine and procedural puzzle web app) alongside upcoming studio pipeline slots.
- **Interactive Team Cards:** Responsive profile cards with 3D pointer-tilt + spotlight hover physics and a spring-pop detail modal displaying focus areas and skill tags.
- **Zero Dependencies:** Pure semantic HTML5, modern CSS custom properties, inline SVGs, and Vanilla ES6 JavaScript — no frameworks, bundlers, or build steps required.
- **Reduced Motion Support:** Respects `@media (prefers-reduced-motion: reduce)` cleanly across all animations.

## Animation Playground Modes

| Mode | Description |
| :--- | :--- |
| **Gravity Forge** | 1,400+ glowing particles with additive blending and motion trails. Cursor attracts/swirls; Left-Click drops a Black Hole, Right-Click drops a White Hole repulsor; `Space` triggers a Supernova shockwave with screen shake. |
| **Neon Flow** | Kinetic ribbon & flow-field particles that paint luminous neon trails following cursor movement and velocity. |
| **Prism Matrix** | High-energy crosshair matrix with vibrant prism waves, vortex swirl on drag, and chain-reaction shockwaves on click. |
| **Spark Fireworks** | Click or drag to launch physics-driven colorful firework rockets with bouncy gravity sparks that ricochet off the bottom edge. |

## Controls & Shortcuts

### Main Page (`index.html`)

| Action | Effect |
| :--- | :--- |
| **Move Cursor / Touch** | Repels the dot matrix and activates iridescent color gradient |
| **Click Empty Space / `Space`** | Emits a radial shockwave ripple + sparkling particle burst |
| **`Esc`** | Closes an open profile modal |

### Playground (`playground.html`)

| Action | Effect |
| :--- | :--- |
| **`1` / `2` / `3` / `4`** | Switch animation mode |
| **`Space`** | Trigger burst / supernova |
| **`C`** | Clear all particles |
| **`H` / `Esc`** | Toggle / restore UI visibility |
| **Click Palette button** | Cycle through Prism, Cyber Neon, Solar Flare, Aurora palettes |
| **Audio button** | Toggle optional pentatonic synth chimes (muted by default) |

## Project Structure

```text
.
├── index.html       # Main page markup, semantic sections, modal, scroll progress bar
├── style.css        # Editorial light-theme tokens, layout, animations, spring physics, spotlight cards
├── script.js        # Studio data, UI rendering, scroll reveals, magnetic buttons, 60fps canvas engine
├── playground.html  # Full-screen animation sandbox page
├── playground.css   # Dark cosmic theme, glassmorphic control dock, screen-shake animation
├── playground.js    # 4 switchable 60fps interactive canvas modes, audio synth, palette system
└── README.md        # Project overview and documentation
```
