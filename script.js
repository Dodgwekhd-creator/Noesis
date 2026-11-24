(function () {
  'use strict';

  /* =======================================================================
   * CHECK REDUCED MOTION PREFERENCE
   * ======================================================================= */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // === EDIT NOESIS DATA HERE ===
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
      statusLabel: 'Active Flagship Release'
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
      id: 'builder-01',
      monogram: '01',
      monogramClass: 'monogram-indigo',
      name: 'Builder 01',
      role: 'Founder & Lead Developer',
      bio: 'Architects zero-dependency web applications, procedural logic engines, and interactive cognitive systems from the ground up.',
      focusAreas:
        'Deterministic state machines, procedural puzzle generation, zero-framework Vanilla JS performance, and offline-first web tools.',
      skills: ['HTML5 / CSS3', 'Vanilla JS', 'Procedural Systems', 'Interactive Engines']
    },
    {
      id: 'builder-02',
      monogram: '02',
      monogramClass: 'monogram-violet',
      name: 'Builder 02',
      role: 'Co-Founder & Lead Web Designer',
      bio: 'Shapes visual direction, modern interface layouts, and cohesive user experiences across every NOESIS web build.',
      focusAreas:
        'Editorial web aesthetics, clean typography systems, responsive layout craft, and intuitive user interface design.',
      skills: ['Web Design', 'UI / UX', 'Visual Systems', 'Responsive Layouts']
    }
  ];

  /* =======================================================================
   * 1. SVG ICON LIBRARY
   * ======================================================================= */
  const LEVELING_BOLT_SVG =
    '<svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>';

  /* =======================================================================
   * 2. RENDER PROJECTS & TEAM ROSTER + MODAL
   * ======================================================================= */
  const projectsGrid = document.getElementById('projectsGrid');
  const teamGrid = document.getElementById('teamGrid');
  const memberModal = document.getElementById('memberModal');
  const modalBody = document.getElementById('modalBody');

  function renderProjects() {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = NOESIS_PROJECTS.map((p, idx) => {
      const cardClass = p.flagship ? 'project-card surface-card flagship reveal' : 'project-card surface-card upcoming reveal';
      const iconHTML = p.hasLightningIcon
        ? `<span class="leveling-icon" aria-hidden="true">${LEVELING_BOLT_SVG}</span>`
        : '';

      const footerHTML = p.flagship
        ? `
          <div class="upcoming-status" style="color:#047857;border-top-style:solid;">
            <span>●</span>
            <span>${p.statusLabel}</span>
          </div>
        `
        : `
          <div class="upcoming-status">
            <span>◌</span>
            <span>${p.statusLabel}</span>
          </div>
        `;

      return `
        <article class="${cardClass}" data-reveal-delay="${idx}">
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
    teamGrid.innerHTML = NOESIS_TEAM.map((m, idx) => `
      <article class="member-card surface-card reveal" data-member-id="${m.id}" data-reveal-delay="${idx}" tabindex="0" role="button" aria-label="View details for ${m.name}">
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
      </article>
    `).join('');

    // 3D tilt + spotlight hover & modal click wiring
    teamGrid.querySelectorAll('.member-card').forEach((card) => {
      const member = NOESIS_TEAM.find((m) => m.id === card.dataset.memberId);
      setupCardTilt(card);
      card.addEventListener('click', () => openMemberModal(member));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openMemberModal(member);
        }
      });
    });
  }

  /* Shared 3D tilt + spotlight for project-card and member-card */
  function setupCardTilt(card) {
    card.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch' || prefersReducedMotion) return;
      const rect = card.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      card.style.setProperty('--mx', nx.toFixed(3));
      card.style.setProperty('--my', ny.toFixed(3));
      const rx = -(ny - 0.5) * 8;
      const ry = (nx - 0.5) * 8;
      card.style.transform = `perspective(800px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
      card.style.setProperty('--mx', '0.5');
      card.style.setProperty('--my', '0.5');
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
    `;
    memberModal.classList.add('open');
    spawnClickSparks(window.innerWidth * 0.5, window.innerHeight * 0.5);
  }

  function closeMemberModal() {
    memberModal.classList.remove('open');
  }

  document.getElementById('modalCloseBtn').addEventListener('click', closeMemberModal);
  memberModal.addEventListener('click', (e) => {
    if (e.target === memberModal) closeMemberModal();
  });

  /* =======================================================================
   * 3. TOAST, MOBILE NAV, SCROLL PROGRESS & REVEAL
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

  // Scroll Progress Bar
  const scrollProgressEl = document.getElementById('scrollProgress');
  function updateScrollProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgressEl.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // IntersectionObserver Fade-Up Reveals with staggered delays
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
            const delay = parseInt(entry.target.dataset.revealDelay || '0', 10);
            const ms = delay * 100;
            if (ms > 0) {
              setTimeout(() => entry.target.classList.add('is-visible'), ms);
            } else {
              entry.target.classList.add('is-visible');
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  /* =======================================================================
   * 4. MAGNETIC BUTTON HOVER EFFECT
   * ======================================================================= */
  function initMagneticButtons() {
    if (prefersReducedMotion) return;
    document.querySelectorAll('.magnetic-btn').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width * 0.5;
        const cy = rect.top + rect.height * 0.5;
        const dx = (e.clientX - cx) * 0.28;
        const dy = (e.clientY - cy) * 0.28;
        btn.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(1.04)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* =======================================================================
   * 5. 60FPS ENHANCED MAGNETIC DOT MATRIX HTML5 CANVAS ENGINE
   *    — Harmonic wave drift, iridescent multi-color gradient,
   *      cursor repulsion, click ripples + sparkling particle bursts
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
    time: 0
  };

  const pointer = {
    x: -9999,
    y: -9999,
    active: false
  };

  // Active radial shockwave ripples
  const ripples = [];

  // Sparkling click-burst particles
  const sparks = [];

  // Iridescent multi-color ramp: slate -> indigo -> violet -> cyan -> pink
  const COLOR_STEPS = 24;
  const COLOR_RAMP = new Array(COLOR_STEPS);
  (function buildColorRamp() {
    const keyframes = [
      { r: 203, g: 213, b: 225, a: 0.6 },   // slate #cbd5e1
      { r: 79,  g: 70,  b: 229, a: 0.82 },   // indigo #4f46e5
      { r: 139, g: 92,  b: 246, a: 0.88 },   // violet #8b5cf6
      { r: 6,   g: 182, b: 212, a: 0.92 },   // cyan #06b6d4
      { r: 236, g: 72,  b: 153, a: 0.96 }    // pink #ec4899
    ];
    for (let i = 0; i < COLOR_STEPS; i++) {
      const t = i / (COLOR_STEPS - 1);
      const seg = t * (keyframes.length - 1);
      const idx = Math.min(keyframes.length - 2, Math.floor(seg));
      const lt = seg - idx;
      const a = keyframes[idx];
      const b = keyframes[idx + 1];
      const r = Math.round(a.r + (b.r - a.r) * lt);
      const g = Math.round(a.g + (b.g - a.g) * lt);
      const bl = Math.round(a.b + (b.b - a.b) * lt);
      const alpha = (a.a + (b.a - a.a) * lt).toFixed(2);
      COLOR_RAMP[i] = `rgba(${r},${g},${bl},${alpha})`;
    }
  })();

  function buildMatrixGrid() {
    matrix.width = window.innerWidth;
    matrix.height = window.innerHeight;
    matrix.dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(matrix.width * matrix.dpr);
    canvas.height = Math.floor(matrix.height * matrix.dpr);
    ctx.setTransform(matrix.dpr, 0, 0, matrix.dpr, 0, 0);

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

  /* Spawn a burst of micro-sparks at a point */
  function spawnClickSparks(sx, sy) {
    const count = 8 + Math.floor(Math.random() * 5); // 8-12
    const sparkColors = ['#4f46e5', '#8b5cf6', '#06b6d4', '#ec4899', '#f59e0b', '#10b981'];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6;
      const speed = 2.5 + Math.random() * 4;
      sparks.push({
        x: sx,
        y: sy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
        decay: 0.018 + Math.random() * 0.012,
        size: 1.8 + Math.random() * 2.2,
        color: sparkColors[Math.floor(Math.random() * sparkColors.length)]
      });
    }
  }

  function stepMatrixPhysics() {
    matrix.time += 0.016;

    // Advance shockwave ripples
    for (let i = ripples.length - 1; i >= 0; i--) {
      const rp = ripples[i];
      rp.radius += rp.speed;
      rp.strength = Math.max(0, 1 - rp.radius / rp.maxRadius);
      if (rp.radius >= rp.maxRadius) {
        ripples.splice(i, 1);
      }
    }

    // Advance sparks
    for (let i = sparks.length - 1; i >= 0; i--) {
      const sp = sparks[i];
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.vy += 0.08; // gravity
      sp.vx *= 0.985;
      sp.vy *= 0.985;
      sp.life -= sp.decay;
      if (sp.life <= 0) {
        sparks.splice(i, 1);
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

    const pActive = pointer.active;
    const mx = pointer.x;
    const my = pointer.y;
    const radius = 185;
    const radiusSq = radius * radius;
    const rippleCount = ripples.length;
    const time = matrix.time;

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

      // 1. Subtle organic harmonic wave drift (always on)
      const wavePhase = homeX * 0.008 + homeY * 0.006 - time * 0.6;
      const waveDx = Math.cos(wavePhase * 0.7 + time * 0.3) * 2.2;
      const waveDy = Math.sin(wavePhase) * 3.0;
      const targetX = homeX + waveDx;
      const targetY = homeY + waveDy;
      const waveE = (Math.sin(wavePhase) + 1) * 0.12;
      eTarget = Math.max(eTarget, waveE);

      // 2. Spring restoring force toward target
      pvx += (targetX - cx) * stiffness;
      pvy += (targetY - cy) * stiffness;

      // 3. Cursor magnetic repulsion
      if (pActive) {
        const dx = cx - mx;
        const dy = cy - my;
        const distSq = dx * dx + dy * dy;
        if (distSq < radiusSq && distSq > 0.01) {
          const dist = Math.sqrt(distSq);
          const falloff = 1 - dist / radius;
          const smooth = falloff * falloff;
          const invD = 1 / dist;
          const push = smooth * 6.4;
          pvx += dx * invD * push;
          pvy += dy * invD * push;
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

      energy[i] += (eTarget - energy[i]) * 0.18;
    }
  }

  function renderMatrix() {
    ctx.clearRect(0, 0, matrix.width, matrix.height);

    const n = matrix.count;
    const x = matrix.x;
    const y = matrix.y;
    const energy = matrix.energy;

    // Crisp micro-dots with iridescent color
    for (let i = 0; i < n; i++) {
      const e = energy[i];
      const cIdx = Math.min(COLOR_STEPS - 1, (e * (COLOR_STEPS - 1) + 0.5) | 0);
      const rad = 1.55 + e * 2.05;
      ctx.fillStyle = COLOR_RAMP[cIdx];
      ctx.beginPath();
      ctx.arc(x[i], y[i], rad, 0, Math.PI * 2);
      ctx.fill();
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

    // Render sparks
    for (let i = 0; i < sparks.length; i++) {
      const sp = sparks[i];
      ctx.globalAlpha = sp.life;
      ctx.fillStyle = sp.color;
      ctx.beginPath();
      ctx.arc(sp.x, sp.y, sp.size * sp.life, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function animateMatrix() {
    if (!prefersReducedMotion) {
      stepMatrixPhysics();
      renderMatrix();
    }
    requestAnimationFrame(animateMatrix);
  }

  /* =======================================================================
   * 6. INPUT LISTENERS — Pointer, touch, keyboard
   * ======================================================================= */
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
      'a, button, .member-card, .project-card, .navbar-wrap, .modal-card'
    );
    if (!hitInteractive) {
      emitRipple(e.clientX, e.clientY);
      spawnClickSparks(e.clientX, e.clientY);
    }
  });

  // Click sparks on CTA buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-primary, .btn-secondary, .btn-playground, .nav-cta');
    if (btn) {
      const rect = btn.getBoundingClientRect();
      spawnClickSparks(rect.left + rect.width * 0.5, rect.top + rect.height * 0.5);
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
          'a, button, .member-card, .project-card, .navbar-wrap, .modal-card'
        );
        if (!hitInteractive) {
          emitRipple(t.clientX, t.clientY);
          spawnClickSparks(t.clientX, t.clientY);
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

  // Keyboard shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (memberModal.classList.contains('open')) {
        closeMemberModal();
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
        spawnClickSparks(
          pointer.active ? pointer.x : matrix.width * 0.5,
          pointer.active ? pointer.y : matrix.height * 0.5
        );
      }
    }
  });

  window.addEventListener('resize', buildMatrixGrid);

  /* =======================================================================
   * 7. WIRE UP PROJECT CARD TILTS AFTER RENDER
   * ======================================================================= */
  function wireProjectCards() {
    document.querySelectorAll('.project-card').forEach((card) => {
      setupCardTilt(card);
    });
  }

  /* =======================================================================
   * 8. BOOTSTRAP ON WINDOW LOAD
   * ======================================================================= */
  window.addEventListener('load', () => {
    renderProjects();
    renderTeam();
    wireProjectCards();
    initScrollReveal();
    initMagneticButtons();
    buildMatrixGrid();
    updateScrollProgress();
    requestAnimationFrame(animateMatrix);
  });
})();
