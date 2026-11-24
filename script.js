(function () {
  'use strict';

  // === EDIT NOESIS DATA HERE ===
  const NOESIS_CONTACT_EMAIL = 'priya22635@gmail.com';

  const NOESIS_PROJECTS = [
    {
      id: 'leveling-v4',
      flagship: true,
      badge: 'LIVE · v4.0',
      badgeClass: 'badge-live',
      title: 'LEVELING v4.0',
      hasLightningIcon: true,
      description:
        'A zero-dependency, single-file cognitive training engine and procedural puzzle web app built with HTML5, CSS3, and Vanilla JavaScript.',
      pills: ['20 Campaign Levels', '12 Practice Archetypes', 'Review Queue', 'Zero Dependencies'],
      liveUrl: 'https://dodgwekhd-creator.github.io/LEVELING-v4.0/',
      repoUrl: 'https://github.com/Dodgwekhd-creator/LEVELING-v4.0'
    },
    {
      id: 'project-02',
      flagship: false,
      badge: 'IN DEVELOPMENT',
      badgeClass: 'badge-dev',
      title: 'Project 02',
      hasLightningIcon: false,
      description:
        'Next interactive web experiment currently in early architecture and visual prototyping.',
      pills: ['Upcoming', 'Web Architecture'],
      statusLabel: 'In Progress — Stay Tuned'
    },
    {
      id: 'project-03',
      flagship: false,
      badge: 'CONCEPT',
      badgeClass: 'badge-concept',
      title: 'Project 03',
      hasLightningIcon: false,
      description:
        'Reserved slot for upcoming cognitive tools and design-driven web experiences.',
      pills: ['Research', 'UI / Systems'],
      statusLabel: 'Queued in Studio Pipeline'
    }
  ];

  const NOESIS_TEAM = [
    {
      id: 'pranay-kanojia',
      monogram: 'PK',
      monogramClass: 'monogram-indigo',
      name: 'Pranay Kanojia',
      role: 'Founder & Lead Developer',
      bio: 'Architects zero-dependency web applications, procedural logic engines, and interactive cognitive systems from the ground up.',
      focusAreas:
        'Deterministic state machines, procedural puzzle generation, zero-framework Vanilla JS performance, and offline-first web tools.',
      skills: ['HTML5 / CSS3', 'Vanilla JS', 'Procedural Systems', 'Interactive Engines'],
      linkType: 'github',
      linkUrl: 'https://github.com/Dodgwekhd-creator',
      linkLabel: 'GitHub · Dodgwekhd-creator'
    },
    {
      id: 'pranika',
      monogram: 'PR',
      monogramClass: 'monogram-violet',
      name: 'Pranika',
      role: 'Co-Founder & Lead Web Designer',
      bio: 'Shapes visual direction, modern interface layouts, and cohesive user experiences across every NOESIS web build.',
      focusAreas:
        'Editorial web aesthetics, clean typography systems, responsive layout craft, and intuitive user interface design.',
      skills: ['Web Design', 'UI / UX', 'Visual Systems', 'Responsive Layouts'],
      linkType: 'instagram',
      linkUrl: 'https://instagram.com/pranika_xo_7',
      linkLabel: 'Instagram · @pranika_xo_7'
    }
  ];

  /* =======================================================================
   * 1. SVG ICON LIBRARY
   * ======================================================================= */
  const LEVELING_BOLT_SVG =
    '<svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>';

  const SOCIAL_SVGS = {
    github:
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-1.94c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.26 5.67.42.36.79 1.07.79 2.16v3.2c0 .31.21.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>',
    instagram:
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>'
  };

  /* =======================================================================
   * 2. RENDER PROJECTS & TEAM ROSTER + MODAL
   * ======================================================================= */
  const projectsGrid = document.getElementById('projectsGrid');
  const teamGrid = document.getElementById('teamGrid');
  const memberModal = document.getElementById('memberModal');
  const modalBody = document.getElementById('modalBody');

  function renderProjects() {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = NOESIS_PROJECTS.map((p) => {
      const cardClass = p.flagship ? 'project-card surface-card flagship reveal' : 'project-card surface-card upcoming reveal';
      const iconHTML = p.hasLightningIcon
        ? `<span class="leveling-icon" aria-hidden="true">${LEVELING_BOLT_SVG}</span>`
        : '';

      const footerHTML = p.flagship
        ? `
          <div class="project-actions">
            <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-primary">Launch Live Demo ↗</a>
            <a href="${p.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-secondary">GitHub Repo</a>
          </div>
        `
        : `
          <div class="upcoming-status">
            <span>◌</span>
            <span>${p.statusLabel}</span>
          </div>
        `;

      return `
        <article class="${cardClass}">
          <div>
            <div class="project-top">
              <span class="project-badge ${p.badgeClass}">${p.badge}</span>
            </div>
            <div class="project-title-row">
              ${iconHTML}
              <h3 class="project-title">${p.title}</h3>
            </div>
            <p class="project-desc">${p.description}</p>
            <div class="pill-list">
              ${p.pills.map((pill) => `<span class="tag-pill">${pill}</span>`).join('')}
            </div>
          </div>
          ${footerHTML}
        </article>
      `;
    }).join('');
  }

  function renderTeam() {
    if (!teamGrid) return;
    teamGrid.innerHTML = NOESIS_TEAM.map((m) => `
      <article class="member-card surface-card reveal" data-member-id="${m.id}" tabindex="0" role="button" aria-label="View details for ${m.name}">
        <div>
          <div class="member-header">
            <div class="monogram ${m.monogramClass}">${m.monogram}</div>
            <span class="inspect-label">View Bio →</span>
          </div>
          <h3 class="member-name">${m.name}</h3>
          <div class="member-role">${m.role}</div>
          <p class="member-bio">${m.bio}</p>
          <div class="pill-list">
            ${m.skills.map((s) => `<span class="tag-pill">${s}</span>`).join('')}
          </div>
        </div>
        <div class="member-footer">
          <a
            href="${m.linkUrl}"
            target="_blank"
            rel="noopener noreferrer"
            class="member-link-btn"
            onclick="event.stopPropagation()"
          >
            ${SOCIAL_SVGS[m.linkType]}
            <span>${m.linkLabel}</span>
          </a>
        </div>
      </article>
    `).join('');

    // Subtle 3D tilt hover & modal click wiring
    teamGrid.querySelectorAll('.member-card').forEach((card) => {
      const member = NOESIS_TEAM.find((m) => m.id === card.dataset.memberId);

      card.addEventListener('pointermove', (e) => {
        if (e.pointerType === 'touch') return;
        const rect = card.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `rotateX(${(-ny * 6).toFixed(2)}deg) rotateY(${(nx * 6).toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });

      card.addEventListener('click', () => openMemberModal(member));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openMemberModal(member);
        }
      });
    });
  }

  function openMemberModal(member) {
    if (!member) return;
    modalBody.innerHTML = `
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.1rem;padding-right:2.2rem;">
        <div class="monogram ${member.monogramClass}">${member.monogram}</div>
        <div>
          <h3 id="modalMemberName" class="member-name" style="margin-bottom:0.1rem;">${member.name}</h3>
          <div class="member-role" style="margin-bottom:0;">${member.role}</div>
        </div>
      </div>
      <p class="member-bio" style="margin-bottom:0;">${member.bio}</p>
      <div class="modal-focus-box">
        <div class="modal-focus-label">// Focus Areas</div>
        <p style="font-size:0.86rem;color:var(--text-secondary);line-height:1.58;">${member.focusAreas}</p>
      </div>
      <div class="pill-list" style="margin-top:1.15rem;">
        ${member.skills.map((s) => `<span class="tag-pill">${s}</span>`).join('')}
      </div>
      <div style="margin-top:1.35rem;padding-top:1rem;border-top:1px solid var(--border-default);">
        <a href="${member.linkUrl}" target="_blank" rel="noopener noreferrer" class="member-link-btn">
          ${SOCIAL_SVGS[member.linkType]}
          <span>${member.linkLabel}</span>
        </a>
      </div>
    `;
    memberModal.classList.add('open');
  }

  function closeMemberModal() {
    memberModal.classList.remove('open');
  }

  document.getElementById('modalCloseBtn').addEventListener('click', closeMemberModal);
  memberModal.addEventListener('click', (e) => {
    if (e.target === memberModal) closeMemberModal();
  });

  /* =======================================================================
   * 3. TOAST, CLIPBOARD COPY, MOBILE NAV & SCROLL REVEAL
   * ======================================================================= */
  const toastEl = document.getElementById('toast');
  let toastTimer = null;

  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
  }

  // Mobile Hamburger Menu
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
  });
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // IntersectionObserver Fade-Up Reveals
  function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  /* =======================================================================
   * 4. 60FPS "MAGNETIC DOT MATRIX" HTML5 CANVAS ENGINE (Typed Arrays)
   * ======================================================================= */
  const canvas = document.getElementById('matrixCanvas');
  const ctx = canvas.getContext('2d');

  const matrix = {
    width: window.innerWidth,
    height: window.innerHeight,
    dpr: Math.min(window.devicePixelRatio || 1, 2),
    spacing: 34,
    count: 0,
    hx: new Float32Array(0),
    hy: new Float32Array(0),
    x: new Float32Array(0),
    y: new Float32Array(0),
    vx: new Float32Array(0),
    vy: new Float32Array(0),
    energy: new Float32Array(0),
    mode: 'repel',   // 'repel' | 'attract' | 'wave'
    shape: 'dots',   // 'dots' | 'cross'
    focusMode: false,
    time: 0
  };

  const pointer = {
    x: -9999,
    y: -9999,
    active: false
  };

  // Active radial shockwave ripples: { x, y, radius, maxRadius, speed, strength }
  const ripples = [];

  // Precomputed 16-step color ramp from subtle slate (#cbd5e1) to crisp indigo (#4f46e5)
  const COLOR_STEPS = 16;
  const COLOR_RAMP = new Array(COLOR_STEPS);
  (function buildColorRamp() {
    const sR = 203, sG = 213, sB = 225; // #cbd5e1
    const eR = 79,  eG = 70,  eB = 229; // #4f46e5
    for (let i = 0; i < COLOR_STEPS; i++) {
      const t = i / (COLOR_STEPS - 1);
      const r = Math.round(sR + (eR - sR) * t);
      const g = Math.round(sG + (eG - sG) * t);
      const b = Math.round(sB + (eB - sB) * t);
      const a = (0.72 + t * 0.28).toFixed(2);
      COLOR_RAMP[i] = `rgba(${r},${g},${b},${a})`;
    }
  })();

  function buildMatrixGrid() {
    matrix.width = window.innerWidth;
    matrix.height = window.innerHeight;
    matrix.dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(matrix.width * matrix.dpr);
    canvas.height = Math.floor(matrix.height * matrix.dpr);
    ctx.setTransform(matrix.dpr, 0, 0, matrix.dpr, 0, 0);

    // Responsive spacing (~32-36px) so mobile & desktop both feel crisp and balanced
    matrix.spacing = matrix.width < 640 ? 32 : 35;

    const cols = Math.floor(matrix.width / matrix.spacing) + 1;
    const rows = Math.floor(matrix.height / matrix.spacing) + 1;
    const offsetX = (matrix.width - (cols - 1) * matrix.spacing) * 0.5;
    const offsetY = (matrix.height - (rows - 1) * matrix.spacing) * 0.5;

    const total = cols * rows;
    matrix.count = total;
    matrix.hx = new Float32Array(total);
    matrix.hy = new Float32Array(total);
    matrix.x = new Float32Array(total);
    matrix.y = new Float32Array(total);
    matrix.vx = new Float32Array(total);
    matrix.vy = new Float32Array(total);
    matrix.energy = new Float32Array(total);

    let idx = 0;
    for (let r = 0; r < rows; r++) {
      const py = offsetY + r * matrix.spacing;
      for (let c = 0; c < cols; c++) {
        const px = offsetX + c * matrix.spacing;
        matrix.hx[idx] = px;
        matrix.hy[idx] = py;
        matrix.x[idx] = px;
        matrix.y[idx] = py;
        idx++;
      }
    }
  }

  function emitRipple(originX, originY) {
    const cx = typeof originX === 'number' ? originX : matrix.width * 0.5;
    const cy = typeof originY === 'number' ? originY : matrix.height * 0.5;
    const maxR = Math.hypot(matrix.width, matrix.height) * 0.72;
    ripples.push({
      x: cx,
      y: cy,
      radius: 0,
      maxRadius: maxR,
      speed: 13.5,
      strength: 1.0
    });
  }

  function stepMatrixPhysics() {
    matrix.time += 0.032;

    // Advance shockwave ripples
    for (let i = ripples.length - 1; i >= 0; i--) {
      const rp = ripples[i];
      rp.radius += rp.speed;
      rp.strength = Math.max(0, 1 - rp.radius / rp.maxRadius);
      if (rp.radius >= rp.maxRadius) {
        ripples.splice(i, 1);
      }
    }

    const n = matrix.count;
    const hx = matrix.hx;
    const hy = matrix.hy;
    const x = matrix.x;
    const y = matrix.y;
    const vx = matrix.vx;
    const vy = matrix.vy;
    const energy = matrix.energy;

    const mode = matrix.mode;
    const isWave = mode === 'wave';
    const isAttract = mode === 'attract';
    const pActive = pointer.active;
    const mx = pointer.x;
    const my = pointer.y;
    const radius = matrix.focusMode ? 225 : 175;
    const radiusSq = radius * radius;
    const rippleCount = ripples.length;

    // Spring-damper tuning for crisp magnetic iron-filing feel
    const stiffness = 0.088;
    const damping = 0.79;

    for (let i = 0; i < n; i++) {
      const homeX = hx[i];
      const homeY = hy[i];
      let cx = x[i];
      let cy = y[i];
      let pvx = vx[i];
      let pvy = vy[i];
      let eTarget = 0;

      // 1. Target home (with optional gentle harmonic wave in Wave mode)
      let targetX = homeX;
      let targetY = homeY;
      if (isWave) {
        const wavePhase = homeX * 0.014 + homeY * 0.011 - matrix.time * 1.45;
        const s = Math.sin(wavePhase);
        targetX += Math.cos(wavePhase * 0.7) * 5.5;
        targetY += s * 7.5;
        eTarget = Math.max(eTarget, (s + 1) * 0.24);
      }

      // 2. Spring restoring force toward target
      pvx += (targetX - cx) * stiffness;
      pvy += (targetY - cy) * stiffness;

      // 3. Cursor magnetic field interaction
      if (pActive) {
        const dx = cx - mx;
        const dy = cy - my;
        const distSq = dx * dx + dy * dy;

        if (distSq < radiusSq && distSq > 0.01) {
          const dist = Math.sqrt(distSq);
          const falloff = 1 - dist / radius;
          const smooth = falloff * falloff;
          const invD = 1 / dist;

          if (isAttract) {
            const pull = smooth * 5.2;
            pvx -= dx * invD * pull;
            pvy -= dy * invD * pull;
          } else if (isWave) {
            const swirl = smooth * 3.8;
            pvx += (-dy * invD) * swirl + (dx * invD) * (smooth * 2.2);
            pvy += (dx * invD) * swirl + (dy * invD) * (smooth * 2.2);
          } else {
            // Default: Repel
            const push = smooth * 6.4;
            pvx += dx * invD * push;
            pvy += dy * invD * push;
          }

          eTarget = Math.max(eTarget, Math.min(1, falloff * 1.35));
        }
      }

      // 4. Radial shockwave ripples
      for (let r = 0; r < rippleCount; r++) {
        const rp = ripples[r];
        const dx = cx - rp.x;
        const dy = cy - rp.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const band = Math.abs(dist - rp.radius);
        const bandWidth = 54;

        if (band < bandWidth) {
          const wave = (1 - band / bandWidth) * rp.strength;
          const impulse = wave * 7.2;
          pvx += (dx / dist) * impulse;
          pvy += (dy / dist) * impulse;
          eTarget = Math.max(eTarget, Math.min(1, wave * 1.4));
        }
      }

      // 5. Integrate velocity & position
      pvx *= damping;
      pvy *= damping;
      cx += pvx;
      cy += pvy;

      x[i] = cx;
      y[i] = cy;
      vx[i] = pvx;
      vy[i] = pvy;

      // Smooth energy interpolation for color & scale transitions
      energy[i] += (eTarget - energy[i]) * 0.2;
    }
  }

  function renderMatrix() {
    ctx.clearRect(0, 0, matrix.width, matrix.height);

    const n = matrix.count;
    const x = matrix.x;
    const y = matrix.y;
    const energy = matrix.energy;
    const isCross = matrix.shape === 'cross';

    if (isCross) {
      ctx.lineCap = 'round';
      // Draw in 16 color buckets or direct crisp strokes
      for (let i = 0; i < n; i++) {
        const e = energy[i];
        const cIdx = Math.min(COLOR_STEPS - 1, (e * (COLOR_STEPS - 1) + 0.5) | 0);
        const half = 2.6 + e * 2.4;
        const px = x[i];
        const py = y[i];

        ctx.strokeStyle = COLOR_RAMP[cIdx];
        ctx.lineWidth = 1.15 + e * 0.65;
        ctx.beginPath();
        ctx.moveTo(px - half, py);
        ctx.lineTo(px + half, py);
        ctx.moveTo(px, py - half);
        ctx.lineTo(px, py + half);
        ctx.stroke();
      }
    } else {
      // Crisp micro-dots
      for (let i = 0; i < n; i++) {
        const e = energy[i];
        const cIdx = Math.min(COLOR_STEPS - 1, (e * (COLOR_STEPS - 1) + 0.5) | 0);
        const rad = 1.55 + e * 2.05;

        ctx.fillStyle = COLOR_RAMP[cIdx];
        ctx.beginPath();
        ctx.arc(x[i], y[i], rad, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Subtle visual ring for active ripples
    for (let r = 0; r < ripples.length; r++) {
      const rp = ripples[r];
      ctx.beginPath();
      ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(79, 70, 229, ${(rp.strength * 0.16).toFixed(3)})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  function animateMatrix() {
    stepMatrixPhysics();
    renderMatrix();
    requestAnimationFrame(animateMatrix);
  }

  /* =======================================================================
   * 5. CONTROL PILL, CANVAS FOCUS MODE & INPUT LISTENERS
   * ======================================================================= */
  const btnFocusCanvas = document.getElementById('btnFocusCanvas');
  const btnExitCanvas = document.getElementById('btnExitCanvas');

  function setCanvasFocus(enabled) {
    matrix.focusMode = enabled;
    document.body.classList.toggle('canvas-focus', enabled);
    btnFocusCanvas.classList.toggle('focus-active', enabled);
    btnFocusCanvas.textContent = enabled ? 'Exit' : 'Canvas';
    if (enabled) {
      closeMemberModal();
      emitRipple(matrix.width * 0.5, matrix.height * 0.5);
    }
  }

  btnFocusCanvas.addEventListener('click', () => setCanvasFocus(!matrix.focusMode));
  btnExitCanvas.addEventListener('click', () => setCanvasFocus(false));

  // Mode toggles: Repel | Attract | Wave
  document.querySelectorAll('#modeControls .ctrl-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      matrix.mode = btn.dataset.mode;
      document.querySelectorAll('#modeControls .ctrl-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Shape toggles: Dots (•) | Crosshairs (+)
  document.querySelectorAll('#shapeControls .ctrl-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      matrix.shape = btn.dataset.shape;
      document.querySelectorAll('#shapeControls .ctrl-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Pulse button
  document.getElementById('btnPulse').addEventListener('click', () => {
    emitRipple(matrix.width * 0.5, matrix.height * 0.5);
  });

  // Window pointer & touch tracking (canvas has pointer-events: none)
  window.addEventListener('mousemove', (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.active = true;
  });

  window.addEventListener('mouseleave', () => {
    pointer.active = false;
  });

  window.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    const hitInteractive = e.target.closest(
      'a, button, .member-card, .project-card, .contact-card, .navbar-wrap, .matrix-pill, .canvas-exit-bar, .modal-card'
    );
    if (!hitInteractive || matrix.focusMode) {
      if (!e.target.closest('.matrix-pill, .canvas-exit-bar')) {
        emitRipple(e.clientX, e.clientY);
      }
    }
  });

  window.addEventListener(
    'touchstart',
    (e) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        pointer.x = t.clientX;
        pointer.y = t.clientY;
        pointer.active = true;
        const hitInteractive = e.target.closest(
          'a, button, .member-card, .project-card, .contact-card, .navbar-wrap, .matrix-pill, .canvas-exit-bar, .modal-card'
        );
        if (!hitInteractive || matrix.focusMode) {
          if (!e.target.closest('.matrix-pill, .canvas-exit-bar')) {
            emitRipple(t.clientX, t.clientY);
          }
        }
      }
    },
    { passive: true }
  );

  window.addEventListener(
    'touchmove',
    (e) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        pointer.x = t.clientX;
        pointer.y = t.clientY;
        pointer.active = true;
      }
    },
    { passive: true }
  );

  window.addEventListener('touchend', () => {
    pointer.active = false;
  });

  // Keyboard shortcuts: Esc closes modal / exits canvas mode; Space pulses dot matrix
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (memberModal.classList.contains('open')) {
        closeMemberModal();
      } else if (matrix.focusMode) {
        setCanvasFocus(false);
      }
      return;
    }

    if (e.code === 'Space') {
      const activeTag = document.activeElement ? document.activeElement.tagName : '';
      const isControl =
        activeTag === 'BUTTON' ||
        activeTag === 'A' ||
        activeTag === 'INPUT' ||
        activeTag === 'TEXTAREA' ||
        (document.activeElement && document.activeElement.getAttribute('role') === 'button');
      if (!isControl && !memberModal.classList.contains('open')) {
        e.preventDefault();
        emitRipple(pointer.active ? pointer.x : undefined, pointer.active ? pointer.y : undefined);
      }
    }
  });

  window.addEventListener('resize', buildMatrixGrid);

  /* =======================================================================
   * 6. BOOTSTRAP ON WINDOW LOAD
   * ======================================================================= */
  window.addEventListener('load', () => {
    renderProjects();
    renderTeam();
    initScrollReveal();
    buildMatrixGrid();
    requestAnimationFrame(animateMatrix);
  });
})();
