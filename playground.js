(function () {
  'use strict';

  /* =======================================================================
   * PLAYGROUND — 4 switchable 60fps interactive canvas animation modes
   * ======================================================================= */

  const canvas = document.getElementById('pgCanvas');
  const ctx = canvas.getContext('2d');
  const dock = document.getElementById('dock');
  const restorePill = document.getElementById('restorePill');
  const backPill = document.getElementById('backPill');
  const btnPalette = document.getElementById('btnPalette');
  const btnBurst = document.getElementById('btnBurst');
  const btnClear = document.getElementById('btnClear');
  const btnAudio = document.getElementById('btnAudio');
  const btnHide = document.getElementById('btnHide');

  let W = window.innerWidth;
  let H = window.innerHeight;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  function resizeCanvas() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    if (currentMode === 'prism') initPrismGrid();
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  /* ---- Pointer state ---- */
  const ptr = { x: W * 0.5, y: H * 0.5, px: W * 0.5, py: H * 0.5, down: false, active: false, rightDown: false };

  function ptrMove(x, y) {
    ptr.px = ptr.x;
    ptr.py = ptr.y;
    ptr.x = x;
    ptr.y = y;
    ptr.active = true;
  }

  canvas.addEventListener('mousemove', (e) => ptrMove(e.clientX, e.clientY));
  canvas.addEventListener('mousedown', (e) => {
    ptrMove(e.clientX, e.clientY);
    if (e.button === 0) { ptr.down = true; onPointerDown(e.clientX, e.clientY, false); }
    if (e.button === 2) { ptr.rightDown = true; onPointerDown(e.clientX, e.clientY, true); }
  });
  canvas.addEventListener('mouseup', (e) => {
    if (e.button === 0) ptr.down = false;
    if (e.button === 2) ptr.rightDown = false;
  });
  canvas.addEventListener('mouseleave', () => { ptr.active = false; ptr.down = false; ptr.rightDown = false; });
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());

  // Touch support
  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (e.touches.length > 0) {
      const t = e.touches[0];
      ptrMove(t.clientX, t.clientY);
      ptr.down = true;
      ptr.active = true;
      onPointerDown(t.clientX, t.clientY, false);
    }
  }, { passive: false });
  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (e.touches.length > 0) {
      const t = e.touches[0];
      ptrMove(t.clientX, t.clientY);
    }
  }, { passive: false });
  canvas.addEventListener('touchend', () => { ptr.down = false; ptr.active = false; });

  /* ---- Palettes ---- */
  const PALETTES = {
    Prism:      ['#4f46e5', '#8b5cf6', '#06b6d4', '#ec4899', '#f59e0b', '#10b981'],
    'Cyber Neon': ['#00ff88', '#00ccff', '#ff00ff', '#ffff00', '#ff4444', '#8844ff'],
    'Solar Flare': ['#ff6b35', '#f7c948', '#ff3864', '#ff9f1c', '#e63946', '#ffd166'],
    Aurora:     ['#06d6a0', '#118ab2', '#7b2cbf', '#e0aaff', '#48bfe3', '#56cfe1']
  };
  const paletteNames = Object.keys(PALETTES);
  let paletteIdx = 0;
  let palette = PALETTES[paletteNames[0]];

  function cyclePalette() {
    paletteIdx = (paletteIdx + 1) % paletteNames.length;
    palette = PALETTES[paletteNames[paletteIdx]];
    btnPalette.textContent = paletteNames[paletteIdx];
    playChime(600);
  }
  btnPalette.addEventListener('click', cyclePalette);

  function randColor() {
    return palette[Math.floor(Math.random() * palette.length)];
  }

  /* ---- Modes ---- */
  let currentMode = 'gravity';
  const modeBtns = document.querySelectorAll('#dockModes .dock-btn');
  function setMode(mode) {
    currentMode = mode;
    modeBtns.forEach((b) => b.classList.toggle('active', b.dataset.mode === mode));
    clearAll();
    if (mode === 'gravity') initGravity();
    if (mode === 'prism') initPrismGrid();
    playChime(440);
  }
  modeBtns.forEach((b) => {
    b.addEventListener('click', () => setMode(b.dataset.mode));
  });

  /* ---- Audio synth (pentatonic chimes, muted by default) ---- */
  let audioEnabled = false;
  let audioCtx = null;

  function ensureAudioCtx() {
    if (!audioCtx) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { /* silent */ }
    }
  }

  function playChime(freq) {
    if (!audioEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) { /* silent */ }
  }

  const pentatonic = [261.6, 293.7, 329.6, 392.0, 440.0, 523.3, 587.3, 659.3];
  function playRandomChime() {
    playChime(pentatonic[Math.floor(Math.random() * pentatonic.length)]);
  }

  btnAudio.addEventListener('click', () => {
    ensureAudioCtx();
    audioEnabled = !audioEnabled;
    btnAudio.textContent = audioEnabled ? '🔊 Audio' : '🔇 Audio';
    if (audioEnabled) playChime(523.3);
  });

  /* ---- Hide / Show UI ---- */
  let uiHidden = false;
  function toggleUI() {
    uiHidden = !uiHidden;
    dock.classList.toggle('hidden', uiHidden);
    restorePill.classList.toggle('hidden', !uiHidden);
    document.body.classList.toggle('ui-hidden', uiHidden);
  }

  btnHide.addEventListener('click', toggleUI);
  restorePill.addEventListener('click', () => { if (uiHidden) toggleUI(); });

  /* ---- Clear ---- */
  function clearAll() {
    gravityParticles.length = 0;
    neonTrails.length = 0;
    neonParticles.length = 0;
    fireworkRockets.length = 0;
    fireworkSparks.length = 0;
    gravityWells.length = 0;
  }
  btnClear.addEventListener('click', () => { clearAll(); if (currentMode === 'gravity') initGravity(); if (currentMode === 'prism') initPrismGrid(); playChime(330); });

  /* ---- Burst ---- */
  function triggerBurst() {
    if (currentMode === 'gravity') {
      gravitySupernovaBurst();
    } else if (currentMode === 'prism') {
      prismShockwave(W * 0.5, H * 0.5);
    } else if (currentMode === 'neon') {
      neonBurst();
    } else if (currentMode === 'fireworks') {
      for (let i = 0; i < 5; i++) launchFirework(Math.random() * W, H);
    }
    playRandomChime();
  }
  btnBurst.addEventListener('click', triggerBurst);

  /* ---- Keyboard ---- */
  window.addEventListener('keydown', (e) => {
    if (e.key === '1') setMode('gravity');
    if (e.key === '2') setMode('neon');
    if (e.key === '3') setMode('prism');
    if (e.key === '4') setMode('fireworks');
    if (e.code === 'Space') { e.preventDefault(); triggerBurst(); }
    if (e.key === 'c' || e.key === 'C') { clearAll(); if (currentMode === 'gravity') initGravity(); if (currentMode === 'prism') initPrismGrid(); }
    if (e.key === 'h' || e.key === 'H') toggleUI();
    if (e.key === 'Escape' && uiHidden) toggleUI();
  });

  /* ---- Pointer down handler per mode ---- */
  function onPointerDown(x, y, isRight) {
    if (currentMode === 'gravity') {
      if (isRight) {
        gravityWells.push({ x: x, y: y, strength: -1800, life: 1.0 });
      } else {
        gravityWells.push({ x: x, y: y, strength: 2400, life: 1.0 });
      }
      playRandomChime();
    } else if (currentMode === 'prism') {
      prismShockwave(x, y);
      playRandomChime();
    } else if (currentMode === 'fireworks') {
      launchFirework(x, y);
      playRandomChime();
    } else if (currentMode === 'neon') {
      playRandomChime();
    }
  }

  /* =======================================================================
   * MODE 1: GRAVITY FORGE
   * ======================================================================= */
  let gravityParticles = [];
  const gravityWells = [];
  const GRAVITY_COUNT = 1400;

  function initGravity() {
    gravityParticles = [];
    for (let i = 0; i < GRAVITY_COUNT; i++) {
      gravityParticles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: 1.2 + Math.random() * 1.8,
        color: randColor()
      });
    }
  }
  initGravity();

  function gravitySupernovaBurst() {
    const cx = ptr.active ? ptr.x : W * 0.5;
    const cy = ptr.active ? ptr.y : H * 0.5;
    for (let i = 0; i < gravityParticles.length; i++) {
      const p = gravityParticles[i];
      const dx = p.x - cx;
      const dy = p.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const force = 18 / (1 + dist * 0.008);
      p.vx += (dx / dist) * force;
      p.vy += (dy / dist) * force;
      p.color = randColor();
    }
    // Screen shake
    document.body.classList.add('shaking');
    setTimeout(() => document.body.classList.remove('shaking'), 300);
  }

  function stepGravity() {
    // Decay wells
    for (let i = gravityWells.length - 1; i >= 0; i--) {
      gravityWells[i].life -= 0.004;
      if (gravityWells[i].life <= 0) gravityWells.splice(i, 1);
    }

    for (let i = 0; i < gravityParticles.length; i++) {
      const p = gravityParticles[i];

      // Cursor attraction / swirl
      if (ptr.active) {
        const dx = ptr.x - p.x;
        const dy = ptr.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const f = 120 / (dist * dist + 400);
        p.vx += dx * f * 0.3;
        p.vy += dy * f * 0.3;
        // Swirl
        p.vx += -dy * f * 0.15;
        p.vy += dx * f * 0.15;
      }

      // Gravity wells
      for (let w = 0; w < gravityWells.length; w++) {
        const well = gravityWells[w];
        const dx = well.x - p.x;
        const dy = well.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const f = (well.strength * well.life) / (dist * dist + 500);
        p.vx += dx / dist * f * 0.016;
        p.vy += dy / dist * f * 0.016;
      }

      p.vx *= 0.994;
      p.vy *= 0.994;
      p.x += p.vx;
      p.y += p.vy;

      // Wrap edges
      if (p.x < -20) p.x = W + 20;
      if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20;
      if (p.y > H + 20) p.y = -20;
    }
  }

  function renderGravity() {
    // Motion trails
    ctx.fillStyle = 'rgba(10, 10, 18, 0.12)';
    ctx.fillRect(0, 0, W, H);

    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < gravityParticles.length; i++) {
      const p = gravityParticles[i];
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Render wells
    for (let i = 0; i < gravityWells.length; i++) {
      const well = gravityWells[i];
      const r = 12 + (1 - well.life) * 30;
      ctx.beginPath();
      ctx.arc(well.x, well.y, r, 0, Math.PI * 2);
      const alpha = well.life * 0.3;
      ctx.strokeStyle = well.strength > 0 ? `rgba(139,92,246,${alpha})` : `rgba(255,255,255,${alpha})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    ctx.globalCompositeOperation = 'source-over';
  }

  /* =======================================================================
   * MODE 2: NEON FLOW
   * ======================================================================= */
  let neonTrails = [];
  let neonParticles = [];
  const NEON_PARTICLE_COUNT = 300;

  function neonBurst() {
    const cx = ptr.active ? ptr.x : W * 0.5;
    const cy = ptr.active ? ptr.y : H * 0.5;
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      neonParticles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
        color: randColor(),
        size: 2 + Math.random() * 3
      });
    }
  }

  function stepNeon() {
    // Record trail from cursor
    if (ptr.active) {
      const vx = ptr.x - ptr.px;
      const vy = ptr.y - ptr.py;
      const speed = Math.sqrt(vx * vx + vy * vy);
      if (speed > 1) {
        const count = Math.min(5, Math.floor(speed * 0.3));
        for (let i = 0; i < count; i++) {
          neonTrails.push({
            x: ptr.x + (Math.random() - 0.5) * 10,
            y: ptr.y + (Math.random() - 0.5) * 10,
            vx: vx * 0.3 + (Math.random() - 0.5) * 2,
            vy: vy * 0.3 + (Math.random() - 0.5) * 2,
            life: 1.0,
            decay: 0.008 + Math.random() * 0.008,
            size: 2 + Math.random() * 4,
            color: randColor()
          });
        }
      }
    }

    // Also spawn some ambient particles
    if (neonParticles.length < NEON_PARTICLE_COUNT) {
      neonParticles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        life: 1.0,
        color: randColor(),
        size: 1 + Math.random() * 2.5
      });
    }

    // Update trails
    for (let i = neonTrails.length - 1; i >= 0; i--) {
      const t = neonTrails[i];
      t.x += t.vx;
      t.y += t.vy;
      t.vx *= 0.97;
      t.vy *= 0.97;
      t.life -= t.decay;
      if (t.life <= 0) neonTrails.splice(i, 1);
    }

    // Update ambient particles — attract toward cursor
    for (let i = neonParticles.length - 1; i >= 0; i--) {
      const p = neonParticles[i];
      if (ptr.active) {
        const dx = ptr.x - p.x;
        const dy = ptr.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const f = 50 / (dist + 100);
        p.vx += dx / dist * f * 0.1;
        p.vy += dy / dist * f * 0.1;
      }
      p.vx *= 0.99;
      p.vy *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.002;

      if (p.life <= 0 || p.x < -50 || p.x > W + 50 || p.y < -50 || p.y > H + 50) {
        neonParticles.splice(i, 1);
      }
    }
  }

  function renderNeon() {
    ctx.fillStyle = 'rgba(10, 10, 18, 0.06)';
    ctx.fillRect(0, 0, W, H);

    ctx.globalCompositeOperation = 'lighter';

    // Trails
    for (let i = 0; i < neonTrails.length; i++) {
      const t = neonTrails[i];
      ctx.globalAlpha = t.life * 0.7;
      ctx.fillStyle = t.color;
      ctx.beginPath();
      ctx.arc(t.x, t.y, t.size * t.life, 0, Math.PI * 2);
      ctx.fill();
    }

    // Ambient particles
    for (let i = 0; i < neonParticles.length; i++) {
      const p = neonParticles[i];
      ctx.globalAlpha = p.life * 0.5;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }

  /* =======================================================================
   * MODE 3: PRISM MATRIX
   * ======================================================================= */
  let prismDots = [];
  const prismRipples = [];
  let prismTime = 0;
  let prismDragVortex = false;

  function initPrismGrid() {
    prismDots = [];
    const spacing = W < 640 ? 28 : 32;
    const cols = Math.floor(W / spacing) + 1;
    const rows = Math.floor(H / spacing) + 1;
    const ox = (W - (cols - 1) * spacing) * 0.5;
    const oy = (H - (rows - 1) * spacing) * 0.5;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const px = ox + c * spacing;
        const py = oy + r * spacing;
        prismDots.push({
          hx: px, hy: py,
          x: px, y: py,
          vx: 0, vy: 0,
          energy: 0
        });
      }
    }
  }

  function prismShockwave(sx, sy) {
    const maxR = Math.hypot(W, H) * 0.72;
    prismRipples.push({ x: sx, y: sy, radius: 0, maxRadius: maxR, speed: 15, strength: 1.0 });
  }

  function stepPrism() {
    prismTime += 0.016;

    // Advance ripples
    for (let i = prismRipples.length - 1; i >= 0; i--) {
      const rp = prismRipples[i];
      rp.radius += rp.speed;
      rp.strength = Math.max(0, 1 - rp.radius / rp.maxRadius);
      if (rp.radius >= rp.maxRadius) prismRipples.splice(i, 1);
    }

    prismDragVortex = ptr.down && ptr.active;

    for (let i = 0; i < prismDots.length; i++) {
      const d = prismDots[i];
      let eTarget = 0;

      // Prism wave
      const phase = d.hx * 0.012 + d.hy * 0.009 - prismTime * 1.8;
      const waveDx = Math.cos(phase * 0.7 + prismTime * 0.5) * 4;
      const waveDy = Math.sin(phase) * 6;
      const tgtX = d.hx + waveDx;
      const tgtY = d.hy + waveDy;
      eTarget = Math.max(eTarget, (Math.sin(phase) + 1) * 0.3);

      d.vx += (tgtX - d.x) * 0.1;
      d.vy += (tgtY - d.y) * 0.1;

      // Cursor interaction
      if (ptr.active) {
        const dx = d.x - ptr.x;
        const dy = d.y - ptr.y;
        const distSq = dx * dx + dy * dy;
        const radius = 200;
        if (distSq < radius * radius && distSq > 0.01) {
          const dist = Math.sqrt(distSq);
          const falloff = 1 - dist / radius;
          const smooth = falloff * falloff;
          if (prismDragVortex) {
            // Vortex swirl on drag
            d.vx += (-dy / dist) * smooth * 6;
            d.vy += (dx / dist) * smooth * 6;
          } else {
            // Repel
            d.vx += (dx / dist) * smooth * 8;
            d.vy += (dy / dist) * smooth * 8;
          }
          eTarget = Math.max(eTarget, Math.min(1, falloff * 1.5));
        }
      }

      // Ripples
      for (let r = 0; r < prismRipples.length; r++) {
        const rp = prismRipples[r];
        const dx = d.x - rp.x;
        const dy = d.y - rp.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const band = Math.abs(dist - rp.radius);
        if (band < 60) {
          const wave = (1 - band / 60) * rp.strength;
          d.vx += (dx / dist) * wave * 10;
          d.vy += (dy / dist) * wave * 10;
          eTarget = Math.max(eTarget, Math.min(1, wave * 1.6));
        }
      }

      d.vx *= 0.78;
      d.vy *= 0.78;
      d.x += d.vx;
      d.y += d.vy;
      d.energy += (eTarget - d.energy) * 0.2;
    }
  }

  function renderPrism() {
    ctx.clearRect(0, 0, W, H);

    // Draw crosshairs
    for (let i = 0; i < prismDots.length; i++) {
      const d = prismDots[i];
      const e = d.energy;
      const cIdx = Math.min(palette.length - 1, Math.floor(e * (palette.length - 1)));
      const half = 3 + e * 4;

      ctx.strokeStyle = palette[cIdx];
      ctx.globalAlpha = 0.5 + e * 0.5;
      ctx.lineWidth = 1 + e * 0.8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(d.x - half, d.y);
      ctx.lineTo(d.x + half, d.y);
      ctx.moveTo(d.x, d.y - half);
      ctx.lineTo(d.x, d.y + half);
      ctx.stroke();
    }

    // Ripple rings
    for (let i = 0; i < prismRipples.length; i++) {
      const rp = prismRipples[i];
      ctx.beginPath();
      ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(139, 92, 246, ${(rp.strength * 0.2).toFixed(3)})`;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 1;
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
  }

  /* =======================================================================
   * MODE 4: SPARK FIREWORKS
   * ======================================================================= */
  let fireworkRockets = [];
  let fireworkSparks = [];

  function launchFirework(x, startY) {
    const targetY = 60 + Math.random() * (H * 0.4);
    fireworkRockets.push({
      x: x,
      y: startY || H,
      vy: -(6 + Math.random() * 4),
      targetY: targetY,
      color: randColor(),
      trail: []
    });
    playRandomChime();
  }

  function explodeFirework(x, y) {
    const count = 60 + Math.floor(Math.random() * 40);
    const color = randColor();
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 5;
      fireworkSparks.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        life: 1.0,
        decay: 0.008 + Math.random() * 0.01,
        size: 1.5 + Math.random() * 2.5,
        color: Math.random() > 0.3 ? color : randColor(),
        bounced: false
      });
    }
    playRandomChime();
  }

  function stepFireworks() {
    // Rockets
    for (let i = fireworkRockets.length - 1; i >= 0; i--) {
      const r = fireworkRockets[i];
      r.trail.push({ x: r.x, y: r.y });
      if (r.trail.length > 12) r.trail.shift();
      r.y += r.vy;
      r.x += (Math.random() - 0.5) * 0.5;
      if (r.y <= r.targetY) {
        explodeFirework(r.x, r.y);
        fireworkRockets.splice(i, 1);
      }
    }

    // Sparks
    for (let i = fireworkSparks.length - 1; i >= 0; i--) {
      const s = fireworkSparks[i];
      s.vy += 0.08; // gravity
      s.vx *= 0.995;
      s.vy *= 0.995;
      s.x += s.vx;
      s.y += s.vy;
      s.life -= s.decay;

      // Bounce off bottom
      if (s.y >= H - 2 && s.vy > 0) {
        s.vy *= -0.5;
        s.vx *= 0.8;
        s.y = H - 2;
        s.bounced = true;
      }

      if (s.life <= 0) fireworkSparks.splice(i, 1);
    }

    // Auto-launch on drag
    if (ptr.down && ptr.active && Math.random() < 0.15) {
      launchFirework(ptr.x, ptr.y);
    }
  }

  function renderFireworks() {
    ctx.fillStyle = 'rgba(10, 10, 18, 0.1)';
    ctx.fillRect(0, 0, W, H);

    // Rockets
    for (let i = 0; i < fireworkRockets.length; i++) {
      const r = fireworkRockets[i];
      ctx.fillStyle = r.color;
      ctx.beginPath();
      ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
      // Trail
      for (let j = 0; j < r.trail.length; j++) {
        const t = r.trail[j];
        ctx.globalAlpha = j / r.trail.length * 0.5;
        ctx.fillStyle = r.color;
        ctx.beginPath();
        ctx.arc(t.x, t.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    // Sparks
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < fireworkSparks.length; i++) {
      const s = fireworkSparks[i];
      ctx.globalAlpha = s.life;
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }

  /* =======================================================================
   * MAIN ANIMATION LOOP
   * ======================================================================= */
  function animate() {
    switch (currentMode) {
      case 'gravity':
        stepGravity();
        renderGravity();
        break;
      case 'neon':
        stepNeon();
        renderNeon();
        break;
      case 'prism':
        stepPrism();
        renderPrism();
        break;
      case 'fireworks':
        stepFireworks();
        renderFireworks();
        break;
    }
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
})();
