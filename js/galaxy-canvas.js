/* ============================================================
   THE MAELSTROM — Canvas Galaxy Renderer
   High-quality animated galaxy background with:
   - Deep purple/blue nebula disc
   - Bright warm galactic core with concentric rings
   - Warp storm patches (red/pink, pulsing)
   - Dense star field with twinkling
   - Sector boundary lines (concentric + radial)
   - Slow rotation + breathing glow
   ============================================================ */

(function () {
  'use strict';

  const TAU = Math.PI * 2;
  const rand = (a, b) => Math.random() * (b - a) + a;

  function initGalaxyCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, CX, CY, RA, RB; // dims, center, radii

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      CX = W * 0.48;
      CY = H * 0.46;
      RA = W * 0.44;   // semi-major axis of galaxy
      RB = H * 0.42;   // semi-minor axis
    }
    resize();
    window.addEventListener('resize', resize);

    // ── PRE-GENERATE DATA ────────────────────────────────────

    // Stars — dense field
    const N_STARS = 1800;
    const stars = [];
    for (let i = 0; i < N_STARS; i++) {
      // Spread stars evenly through the disc, with slight central concentration
      const r = Math.pow(Math.random(), 0.45);
      const angle = rand(0, TAU);
      const spread = r < 0.5 ? 1.0 : 1.3; // outer stars spread wider
      stars.push({
        angle,
        r,
        spread,
        baseAlpha: rand(0.15, 0.9),
        twinkleSpeed: rand(0.5, 3.0),
        twinkleOffset: rand(0, TAU),
        size: r < 0.15 ? rand(0.5, 1.2) : r < 0.4 ? rand(0.5, 1.5) : rand(0.4, 1.3),
        // colour temperature — inner stars warmer
        hue: r < 0.3 ? rand(30, 60) : r < 0.6 ? rand(200, 280) : rand(200, 320),
        sat: rand(10, 50),
      });
    }

    // Background scatter stars (outside galaxy disc)
    const N_BG_STARS = 400;
    const bgStars = [];
    for (let i = 0; i < N_BG_STARS; i++) {
      bgStars.push({
        x: rand(0, 1),
        y: rand(0, 1),
        alpha: rand(0.08, 0.45),
        size: rand(0.3, 1.2),
        twinkleSpeed: rand(0.3, 1.5),
        twinkleOffset: rand(0, TAU),
      });
    }

    // Warp storms — red/pink patches
    const warpStorms = [
      // (angle from center, distance fraction, size, intensity)
      { angle: -0.6, dist: 0.35, rx: 55, ry: 40, intensity: 0.85, speed: 0.7 },   // upper left
      { angle: 0.4,  dist: 0.55, rx: 70, ry: 45, intensity: 0.75, speed: 0.5 },    // right area
      { angle: 2.3,  dist: 0.65, rx: 50, ry: 35, intensity: 0.65, speed: 0.9 },    // lower right
      { angle: 1.8,  dist: 0.30, rx: 35, ry: 25, intensity: 0.55, speed: 1.1 },    // near center
      { angle: -1.4, dist: 0.50, rx: 40, ry: 30, intensity: 0.50, speed: 0.6 },    // upper area
      { angle: 3.0,  dist: 0.72, rx: 60, ry: 38, intensity: 0.60, speed: 0.8 },    // far lower right — THE MAELSTROM
    ];

    // Nebula cloud blobs — purple/blue patches that form the galaxy disc
    const nebulaClouds = [];
    for (let i = 0; i < 30; i++) {
      const r = Math.pow(rand(0.05, 0.95), 0.7);
      nebulaClouds.push({
        angle: rand(0, TAU),
        dist: r,
        rx: rand(60, 200) * (1 - r * 0.3),
        ry: rand(40, 140) * (1 - r * 0.3),
        hue: rand(240, 300),   // purple-blue range
        sat: rand(30, 70),
        light: rand(15, 35),
        alpha: rand(0.04, 0.14),
        rotSpeed: rand(-0.02, 0.02),
      });
    }

    // Sector rings (concentric ellipses)
    const sectorRings = [0.25, 0.42, 0.60, 0.78, 0.95];
    // Radial sector lines (angles)
    const sectorLines = [];
    for (let i = 0; i < 8; i++) {
      sectorLines.push(i * TAU / 8 + 0.15);
    }

    // ── RENDER FUNCTIONS ──────────────────────────────────────

    function drawBackground() {
      // Deep space gradient
      const grad = ctx.createRadialGradient(CX, CY, 0, CX, CY, Math.max(W, H) * 0.75);
      grad.addColorStop(0, '#1a0e2e');    // deep purple center
      grad.addColorStop(0.3, '#110920');
      grad.addColorStop(0.6, '#0a0615');
      grad.addColorStop(1, '#04020a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    }

    function drawNebulaClouds(time, rotation) {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      nebulaClouds.forEach(cloud => {
        const a = cloud.angle + rotation + cloud.rotSpeed * time * 0.001;
        const px = CX + Math.cos(a) * RA * cloud.dist;
        const py = CY + Math.sin(a) * RB * cloud.dist;

        const grad = ctx.createRadialGradient(px, py, 0, px, py, cloud.rx);
        const col = `hsla(${cloud.hue}, ${cloud.sat}%, ${cloud.light}%, ${cloud.alpha})`;
        const col2 = `hsla(${cloud.hue}, ${cloud.sat}%, ${cloud.light}%, 0)`;
        grad.addColorStop(0, col);
        grad.addColorStop(0.5, col);
        grad.addColorStop(1, col2);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(px, py, cloud.rx, cloud.ry, a * 0.3, 0, TAU);
        ctx.fill();
      });
      ctx.restore();
    }

    function drawGalaxyDisc(rotation) {
      // Main galaxy disc glow — layered gradients
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // Outermost faint halo
      const g1 = ctx.createRadialGradient(CX, CY, RA * 0.1, CX, CY, RA * 1.05);
      g1.addColorStop(0, 'rgba(80, 50, 120, 0.12)');
      g1.addColorStop(0.4, 'rgba(60, 35, 100, 0.08)');
      g1.addColorStop(0.7, 'rgba(40, 20, 70, 0.04)');
      g1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = g1;
      ctx.beginPath();
      ctx.ellipse(CX, CY, RA * 1.05, RB * 1.0, 0, 0, TAU);
      ctx.fill();

      // Mid disc — purple/lavender
      const g2 = ctx.createRadialGradient(CX, CY, 0, CX, CY, RA * 0.7);
      g2.addColorStop(0, 'rgba(160, 120, 200, 0.18)');
      g2.addColorStop(0.3, 'rgba(120, 80, 170, 0.12)');
      g2.addColorStop(0.6, 'rgba(80, 50, 130, 0.06)');
      g2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = g2;
      ctx.beginPath();
      ctx.ellipse(CX, CY, RA * 0.7, RB * 0.65, 0, 0, TAU);
      ctx.fill();

      ctx.restore();
    }

    function drawCore(time) {
      const pulse = 1.0 + 0.08 * Math.sin(time * 0.001);
      const breathe = 1.0 + 0.04 * Math.sin(time * 0.0015 + 1.0);

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // Warm outer glow
      const g1 = ctx.createRadialGradient(CX, CY, 0, CX, CY, RA * 0.22 * pulse);
      g1.addColorStop(0, 'rgba(255, 220, 160, 0.5)');
      g1.addColorStop(0.2, 'rgba(220, 160, 120, 0.3)');
      g1.addColorStop(0.5, 'rgba(160, 100, 140, 0.12)');
      g1.addColorStop(1, 'rgba(80, 40, 80, 0)');
      ctx.fillStyle = g1;
      ctx.beginPath();
      ctx.ellipse(CX, CY, RA * 0.22 * pulse, RB * 0.20 * pulse, 0, 0, TAU);
      ctx.fill();

      // Hot inner core
      const g2 = ctx.createRadialGradient(CX, CY, 0, CX, CY, RA * 0.08 * breathe);
      g2.addColorStop(0, 'rgba(255, 250, 230, 0.95)');
      g2.addColorStop(0.3, 'rgba(255, 230, 180, 0.7)');
      g2.addColorStop(0.6, 'rgba(255, 190, 130, 0.35)');
      g2.addColorStop(1, 'rgba(200, 140, 100, 0)');
      ctx.fillStyle = g2;
      ctx.beginPath();
      ctx.ellipse(CX, CY, RA * 0.08 * breathe, RB * 0.07 * breathe, 0, 0, TAU);
      ctx.fill();

      // Bright point
      const g3 = ctx.createRadialGradient(CX, CY, 0, CX, CY, 8);
      g3.addColorStop(0, 'rgba(255, 255, 245, 1)');
      g3.addColorStop(1, 'rgba(255, 240, 200, 0)');
      ctx.fillStyle = g3;
      ctx.beginPath();
      ctx.arc(CX, CY, 8, 0, TAU);
      ctx.fill();

      ctx.restore();
    }

    function drawCoreRings() {
      // Concentric rings around the core (like in the reference)
      ctx.save();
      ctx.strokeStyle = 'rgba(200, 180, 150, 0.18)';
      ctx.lineWidth = 0.8;
      [0.06, 0.10, 0.15].forEach(frac => {
        ctx.beginPath();
        ctx.ellipse(CX, CY, RA * frac, RB * frac, 0, 0, TAU);
        ctx.stroke();
      });
      ctx.restore();
    }

    function drawWarpStorms(time, rotation) {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      warpStorms.forEach(storm => {
        const pulse = 1.0 + 0.15 * Math.sin(time * 0.001 * storm.speed);
        const flicker = 0.7 + 0.3 * Math.sin(time * 0.002 * storm.speed + 2.0);
        const a = storm.angle + rotation;
        const px = CX + Math.cos(a) * RA * storm.dist;
        const py = CY + Math.sin(a) * RB * storm.dist;
        const srx = storm.rx * pulse;
        const sry = storm.ry * pulse;
        const alpha = storm.intensity * flicker;

        // Outer glow
        const g1 = ctx.createRadialGradient(px, py, 0, px, py, srx * 1.6);
        g1.addColorStop(0, `rgba(200, 40, 60, ${alpha * 0.5})`);
        g1.addColorStop(0.3, `rgba(160, 20, 50, ${alpha * 0.3})`);
        g1.addColorStop(0.7, `rgba(100, 10, 30, ${alpha * 0.1})`);
        g1.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = g1;
        ctx.beginPath();
        ctx.ellipse(px, py, srx * 1.6, sry * 1.5, a * 0.2, 0, TAU);
        ctx.fill();

        // Hot core
        const g2 = ctx.createRadialGradient(px, py, 0, px, py, srx * 0.5);
        g2.addColorStop(0, `rgba(255, 100, 120, ${alpha * 0.7})`);
        g2.addColorStop(0.5, `rgba(220, 50, 80, ${alpha * 0.4})`);
        g2.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = g2;
        ctx.beginPath();
        ctx.ellipse(px, py, srx * 0.5, sry * 0.45, a * 0.2, 0, TAU);
        ctx.fill();
      });

      ctx.restore();
    }

    function drawSectorGrid(rotation) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      // Concentric rings
      ctx.strokeStyle = 'rgba(140, 160, 200, 0.08)';
      ctx.lineWidth = 0.8;
      sectorRings.forEach(frac => {
        ctx.beginPath();
        ctx.ellipse(CX, CY, RA * frac, RB * frac, 0, 0, TAU);
        ctx.stroke();
      });

      // Radial lines from center to edge
      ctx.strokeStyle = 'rgba(140, 160, 200, 0.06)';
      ctx.lineWidth = 0.6;
      sectorLines.forEach(angle => {
        const a = angle + rotation;
        ctx.beginPath();
        ctx.moveTo(CX, CY);
        ctx.lineTo(
          CX + Math.cos(a) * RA * 1.1,
          CY + Math.sin(a) * RB * 1.05
        );
        ctx.stroke();
      });

      // Galaxy boundary
      ctx.strokeStyle = 'rgba(140, 160, 200, 0.10)';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.ellipse(CX, CY, RA * 0.98, RB * 0.93, 0, 0, TAU);
      ctx.stroke();

      ctx.restore();
    }

    function drawStars(time, rotation) {
      // Background scatter stars
      bgStars.forEach(s => {
        const twinkle = 0.5 + 0.5 * Math.sin(time * 0.001 * s.twinkleSpeed + s.twinkleOffset);
        const alpha = s.alpha * (0.5 + 0.5 * twinkle);
        ctx.fillStyle = `rgba(200, 210, 240, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.size, 0, TAU);
        ctx.fill();
      });

      // Galaxy disc stars
      stars.forEach(s => {
        const a = s.angle + rotation;
        const px = CX + Math.cos(a) * RA * s.r * s.spread * 0.95;
        const py = CY + Math.sin(a) * RB * s.r * s.spread * 0.90;

        // Cull off-screen
        if (px < -5 || px > W + 5 || py < -5 || py > H + 5) return;

        const twinkle = 0.5 + 0.5 * Math.sin(time * 0.001 * s.twinkleSpeed + s.twinkleOffset);
        const alpha = s.baseAlpha * (0.4 + 0.6 * twinkle);

        // Warm inner stars, cool outer stars
        const light = 70 + 20 * twinkle;
        ctx.fillStyle = `hsla(${s.hue}, ${s.sat}%, ${light}%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, s.size, 0, TAU);
        ctx.fill();

        // Bright stars get a tiny glow
        if (s.size > 1.5 && alpha > 0.6) {
          ctx.fillStyle = `hsla(${s.hue}, ${s.sat * 0.5}%, ${light}%, ${alpha * 0.15})`;
          ctx.beginPath();
          ctx.arc(px, py, s.size * 3, 0, TAU);
          ctx.fill();
        }
      });
    }

    function drawVignette() {
      // Dark edges
      const g = ctx.createRadialGradient(CX, CY, Math.min(W, H) * 0.25, CX, CY, Math.max(W, H) * 0.72);
      g.addColorStop(0, 'rgba(0, 0, 0, 0)');
      g.addColorStop(0.6, 'rgba(4, 2, 10, 0.25)');
      g.addColorStop(1, 'rgba(4, 2, 10, 0.85)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      // Extra dark corners
      const g2 = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.4, W / 2, H / 2, Math.max(W, H) * 0.8);
      g2.addColorStop(0, 'rgba(0, 0, 0, 0)');
      g2.addColorStop(1, 'rgba(4, 2, 10, 0.5)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);
    }

    // ── ANIMATION LOOP ───────────────────────────────────────

    const ROTATION_SPEED = 0.000015; // very slow rotation (radians per ms)
    let startTime = null;

    function frame(timestamp) {
      if (!startTime) startTime = timestamp;
      const time = timestamp - startTime;
      const rotation = time * ROTATION_SPEED;

      // Clear
      ctx.clearRect(0, 0, W, H);

      // Layer 1: Deep space background
      drawBackground();

      // Layer 2: Galaxy disc glow
      drawGalaxyDisc(rotation);

      // Layer 3: Nebula clouds (rotate slowly)
      drawNebulaClouds(time, rotation);

      // Layer 4: Sector grid (rotate with galaxy)
      drawSectorGrid(rotation);

      // Layer 5: Stars
      drawStars(time, rotation);

      // Layer 6: Warp storms (pulsing)
      drawWarpStorms(time, rotation);

      // Layer 7: Galactic core (on top, brightest)
      drawCore(time);
      drawCoreRings();

      // Layer 8: Vignette overlay
      drawVignette();

      requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  // ── INIT ──────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initGalaxyCanvas('galaxy-canvas'));
  } else {
    initGalaxyCanvas('galaxy-canvas');
  }
})();
