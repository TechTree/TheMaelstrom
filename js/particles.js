/* ============================================================
   THE MAELSTROM — Visual Effects Engine
   Galaxy Map hero + atmospheric effects + ground battle
   ============================================================ */

(function () {
  'use strict';

  const svgNS = 'http://www.w3.org/2000/svg';
  const rand = (a, b) => Math.random() * (b - a) + a;
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];

  function svgEl(tag, attrs) {
    const e = document.createElementNS(svgNS, tag);
    if (attrs) Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
    return e;
  }

  /* ==========================================================
     GALAXY MAP — full Imperium of Man style
     ========================================================== */
  function createGalaxyMap(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;

    const svg = svgEl('svg', {
      viewBox: '0 0 1400 700',
      preserveAspectRatio: 'xMidYMid slice',
      class: 'galaxy-map-svg',
    });

    // ── DEFS ──────────────────────────────────────────────
    const defs = svgEl('defs');

    // Galaxy arm gradient — beige/tan/khaki
    const gGlow = svgEl('radialGradient', { id: 'galaxyCore', cx: '50%', cy: '50%', r: '50%' });
    [['0%','#d4c4a0','0.6'],['40%','#b8a87a','0.4'],['70%','#8a7850','0.2'],['100%','#2a1a0a','0']].forEach(([o,c,op]) => {
      const s = svgEl('stop', { offset: o, 'stop-color': c, 'stop-opacity': op });
      gGlow.appendChild(s);
    });
    defs.appendChild(gGlow);

    // Warp storm red glow — muted
    const warpGlow = svgEl('radialGradient', { id: 'warpGlow', cx: '50%', cy: '50%', r: '50%' });
    [['0%','#cc1010','0.6'],['30%','#880000','0.35'],['70%','#550000','0.15'],['100%','#220000','0']].forEach(([o,c,op]) => {
      const s = svgEl('stop', { offset: o, 'stop-color': c, 'stop-opacity': op });
      warpGlow.appendChild(s);
    });
    defs.appendChild(warpGlow);

    // Maelstrom glow — present but not overpowering
    const maelGlow = svgEl('radialGradient', { id: 'maelstromGlow', cx: '50%', cy: '50%', r: '50%' });
    [['0%','#dd2020','0.75'],['30%','#aa0000','0.5'],['60%','#660000','0.25'],['85%','#330000','0.1'],['100%','#000','0']].forEach(([o,c,op]) => {
      const s = svgEl('stop', { offset: o, 'stop-color': c, 'stop-opacity': op });
      maelGlow.appendChild(s);
    });
    defs.appendChild(maelGlow);

    // Sol ring gradient
    const solGrad = svgEl('radialGradient', { id: 'solGrad', cx: '50%', cy: '50%', r: '50%' });
    [['0%','#e8d89a','0.9'],['50%','#c4a85c','0.5'],['100%','#8a6030','0']].forEach(([o,c,op]) => {
      const s = svgEl('stop', { offset: o, 'stop-color': c, 'stop-opacity': op });
      solGrad.appendChild(s);
    });
    defs.appendChild(solGrad);

    // Parchment texture filter
    const filter = svgEl('filter', { id: 'parchment' });
    const feTurb = svgEl('feTurbulence', { type: 'fractalNoise', baseFrequency: '0.65', numOctaves: '3', stitchTiles: 'stitch', result: 'noise' });
    const feBlend = svgEl('feBlend', { in: 'SourceGraphic', in2: 'noise', mode: 'multiply' });
    filter.appendChild(feTurb);
    filter.appendChild(feBlend);
    defs.appendChild(filter);

    // Glow filter for warp zones
    const glowFilter = svgEl('filter', { id: 'warpGlowFilter', x: '-50%', y: '-50%', width: '200%', height: '200%' });
    const feGauss = svgEl('feGaussianBlur', { stdDeviation: '8', result: 'blur' });
    const feMerge = svgEl('feMerge');
    const feMergeNode1 = svgEl('feMergeNode', { in: 'blur' });
    const feMergeNode2 = svgEl('feMergeNode', { in: 'SourceGraphic' });
    feMerge.appendChild(feMergeNode1);
    feMerge.appendChild(feMergeNode2);
    glowFilter.appendChild(feGauss);
    glowFilter.appendChild(feMerge);
    defs.appendChild(glowFilter);

    // Strong glow for Maelstrom
    const maelFilter = svgEl('filter', { id: 'maelFilter', x: '-100%', y: '-100%', width: '300%', height: '300%' });
    const mGauss = svgEl('feGaussianBlur', { stdDeviation: '14', result: 'blur' });
    const mMerge = svgEl('feMerge');
    const mNode1 = svgEl('feMergeNode', { in: 'blur' });
    const mNode2 = svgEl('feMergeNode', { in: 'SourceGraphic' });
    mMerge.appendChild(mNode1);
    mMerge.appendChild(mNode2);
    maelFilter.appendChild(mGauss);
    maelFilter.appendChild(mMerge);
    defs.appendChild(maelFilter);

    svg.appendChild(defs);

    // ── BACKGROUND ────────────────────────────────────────
    const bg = svgEl('rect', { x: 0, y: 0, width: 1400, height: 700, fill: '#05030a' });
    svg.appendChild(bg);

    // ── BACKGROUND STAR FIELD ─────────────────────────────
    const starGroup = svgEl('g', { opacity: '0.7' });
    for (let i = 0; i < 600; i++) {
      const x = rand(0, 1400), y = rand(0, 700);
      const r = rand(0.3, 1.8);
      const op = rand(0.2, 1);
      const star = svgEl('circle', { cx: x, cy: y, r, fill: '#fff', opacity: op });
      // Some stars slightly tinted
      if (Math.random() > 0.8) star.setAttribute('fill', pick(['#ffeedd','#ddeeff','#eeffdd']));
      starGroup.appendChild(star);
    }
    svg.appendChild(starGroup);

    // ── GALAXY ARMS — beige/tan nebula body ──────────────
    const galaxyGroup = svgEl('g');

    // Main galaxy body — large central blob, roughly oval
    const mainBody = svgEl('ellipse', {
      cx: 580, cy: 390, rx: 480, ry: 280,
      fill: 'url(#galaxyCore)', opacity: '0.85',
    });
    galaxyGroup.appendChild(mainBody);

    // Upper galaxy arm (Segmentum Obscurus / Nihilus)
    const upperArm = svgEl('ellipse', {
      cx: 850, cy: 200, rx: 420, ry: 180,
      fill: 'url(#galaxyCore)', opacity: '0.6',
      transform: 'rotate(-15, 850, 200)',
    });
    galaxyGroup.appendChild(upperArm);

    // Lower arm (Segmentum Tempestus / Sanctus)
    const lowerArm = svgEl('ellipse', {
      cx: 520, cy: 560, rx: 380, ry: 150,
      fill: 'url(#galaxyCore)', opacity: '0.5',
      transform: 'rotate(8, 520, 560)',
    });
    galaxyGroup.appendChild(lowerArm);

    // Far right arm (Ultima Segmentum)
    const rightArm = svgEl('ellipse', {
      cx: 1150, cy: 360, rx: 300, ry: 200,
      fill: 'url(#galaxyCore)', opacity: '0.45',
      transform: 'rotate(-20, 1150, 360)',
    });
    galaxyGroup.appendChild(rightArm);

    // Dense nebula patches for texture
    const nebulaData = [
      { cx: 420, cy: 320, rx: 200, ry: 130, op: 0.3 },
      { cx: 700, cy: 280, rx: 180, ry: 100, op: 0.25 },
      { cx: 300, cy: 450, rx: 160, ry: 80,  op: 0.2  },
      { cx: 900, cy: 420, rx: 220, ry: 120, op: 0.22 },
      { cx: 620, cy: 500, rx: 200, ry: 90,  op: 0.18 },
      { cx: 500, cy: 200, rx: 150, ry: 90,  op: 0.2  },
      { cx: 1050,cy: 250, rx: 180, ry: 110, op: 0.2  },
    ];
    nebulaData.forEach(n => {
      const neb = svgEl('ellipse', {
        cx: n.cx, cy: n.cy, rx: n.rx, ry: n.ry,
        fill: '#c4a870', opacity: n.op,
        filter: 'blur(20px)',
      });
      neb.style.filter = 'blur(20px)';
      galaxyGroup.appendChild(neb);
    });

    svg.appendChild(galaxyGroup);

    // (Cicatrix Maledictum and Eye of Terror removed per user preference)

    // ── THE MAELSTROM (our campaign!) ────────────────────
    const maelX = 790, maelY = 255;
    const maelGroup = svgEl('g', { filter: 'url(#maelFilter)' });

    const maelOuter = svgEl('ellipse', {
      cx: maelX, cy: maelY, rx: 68, ry: 55,
      fill: 'url(#maelstromGlow)', opacity: '0.7',
    });
    const maelInner = svgEl('ellipse', {
      cx: maelX, cy: maelY, rx: 38, ry: 30,
      fill: '#990000', opacity: '0.55',
    });
    const maelCore = svgEl('ellipse', {
      cx: maelX, cy: maelY, rx: 16, ry: 13,
      fill: '#cc2020', opacity: '0.75',
    });

    // Maelstrom pulse animation
    const maelAnim1 = svgEl('animate', {
      attributeName: 'rx', values: '68;80;68',
      dur: '2.5s', repeatCount: 'indefinite',
    });
    const maelAnim2 = svgEl('animate', {
      attributeName: 'ry', values: '55;65;55',
      dur: '2.5s', repeatCount: 'indefinite',
    });
    maelOuter.appendChild(maelAnim1);
    maelOuter.appendChild(maelAnim2);

    const maelCoreAnim = svgEl('animate', {
      attributeName: 'opacity', values: '0.8;1;0.8',
      dur: '1.8s', repeatCount: 'indefinite',
    });
    maelCore.appendChild(maelCoreAnim);

    maelGroup.appendChild(maelOuter);
    maelGroup.appendChild(maelInner);
    maelGroup.appendChild(maelCore);
    svg.appendChild(maelGroup);

    // ── OTHER WARP STORM PATCHES ─────────────────────────
    const warpPatches = [
      { cx: 480, cy: 160, rx: 32, ry: 22, op: 0.55 },  // small storm near Cadia
      { cx: 1150, cy: 190, rx: 28, ry: 20, op: 0.45 }, // far right storm
      { cx: 680, cy: 530, rx: 24, ry: 16, op: 0.4  },  // lower storm
      { cx: 320, cy: 490, rx: 20, ry: 14, op: 0.38 },  // SW storm
      { cx: 1050, cy: 440, rx: 22, ry: 15, op: 0.35 }, // SE storm
    ];
    const patchGroup = svgEl('g', { filter: 'url(#warpGlowFilter)' });
    warpPatches.forEach(p => {
      const patch = svgEl('ellipse', {
        cx: p.cx, cy: p.cy, rx: p.rx, ry: p.ry,
        fill: 'url(#warpGlow)', opacity: p.op,
      });
      patchGroup.appendChild(patch);
    });
    svg.appendChild(patchGroup);

    // ── SEGMENTUM SOLAR — concentric rings around Terra ──
    const solX = 440, solY = 385;
    const solGroup = svgEl('g');
    [130, 100, 70, 40].forEach((r, i) => {
      const ring = svgEl('circle', {
        cx: solX, cy: solY, r,
        fill: 'none',
        stroke: i === 3 ? '#e8d89a' : '#c4a870',
        'stroke-width': i === 3 ? '1.5' : '0.8',
        opacity: i === 3 ? '0.7' : '0.25',
        'stroke-dasharray': i % 2 === 0 ? '' : '6,4',
      });
      solGroup.appendChild(ring);
    });
    // Terra dot
    const terra = svgEl('circle', { cx: solX, cy: solY, r: 6, fill: '#e8d89a', opacity: '0.9' });
    const terraGlow = svgEl('circle', { cx: solX, cy: solY, r: 14, fill: '#e8d89a', opacity: '0.2' });
    solGroup.appendChild(terraGlow);
    solGroup.appendChild(terra);
    svg.appendChild(solGroup);

    // ── SECTOR BOUNDARY LINES ─────────────────────────────
    const boundaryGroup = svgEl('g', {
      stroke: '#8a7040', 'stroke-width': '0.6',
      'stroke-dasharray': '8,6', opacity: '0.3', fill: 'none',
    });
    // Vertical divider (roughly)
    boundaryGroup.appendChild(svgEl('line', { x1: 700, y1: 50, x2: 680, y2: 650 }));
    // Horizontal (mid-galaxy)
    boundaryGroup.appendChild(svgEl('line', { x1: 50, y1: 350, x2: 1350, y2: 360 }));
    // Diagonal NW-SE
    boundaryGroup.appendChild(svgEl('path', { d: 'M 150,600 Q 450,380 700,360 Q 950,340 1300,200' }));
    svg.appendChild(boundaryGroup);

    // ── STAR SYSTEM DOTS ──────────────────────────────────
    const systemDots = [
      // Major systems
      { x: 440, y: 385, r: 6,   col: '#e8d89a', label: 'TERRA & MARS',     lx: 448, ly: 378, size: '11', bold: true },
      { x: 470, y: 175, r: 3.5, col: '#c8b870', label: 'CADIA',            lx: 478, ly: 170, size: '9'  },
      { x: 380, y: 220, r: 3,   col: '#c8b870', label: 'FENRIS',           lx: 388, ly: 215, size: '9'  },
      { x: 430, y: 300, r: 3,   col: '#c8b870', label: 'ARMAGEDDON',       lx: 438, ly: 295, size: '9'  },
      { x: 700, y: 200, r: 3,   col: '#c8b870', label: 'VALHALLA',         lx: 708, ly: 195, size: '9'  },
      { x: 830, y: 220, r: 3,   col: '#c8b870', label: 'BAAL',             lx: 838, ly: 215, size: '9'  },
      { x: 750, y: 310, r: 3,   col: '#c8b870', label: 'CALASHAN',         lx: 758, ly: 305, size: '9'  },
      { x: 870, y: 330, r: 2.5, col: '#c8b870', label: 'CHORONI',          lx: 878, ly: 325, size: '8'  },
      { x: 1150,y: 390, r: 3.5, col: '#c8b870', label: 'ATIKA',            lx: 1158,ly: 385, size: '9'  },
      { x: 1280,y: 450, r: 3,   col: '#c8b870', label: 'MACRAGGE',         lx: 1288,ly: 445, size: '9'  },
      { x: 380, y: 490, r: 2.5, col: '#c8b870', label: 'MACHARIA',         lx: 388, ly: 485, size: '8'  },
      { x: 340, y: 540, r: 2.5, col: '#c8b870', label: 'KHIO',             lx: 348, ly: 535, size: '8'  },
      { x: 480, y: 560, r: 2.5, col: '#c8b870', label: 'TALLARN',          lx: 488, ly: 555, size: '8'  },
      { x: 600, y: 575, r: 2.5, col: '#c8b870', label: 'NOCTURNE',         lx: 608, ly: 570, size: '8'  },
      { x: 280, y: 600, r: 2.5, col: '#c8b870', label: 'DELIVERANCE',      lx: 288, ly: 595, size: '8'  },
      { x: 400, y: 620, r: 2.5, col: '#c8b870', label: "RYNN'S WORLD",    lx: 408, ly: 615, size: '8'  },
      { x: 520, y: 250, r: 2.5, col: '#c8b870', label: 'PROSPERO',         lx: 528, ly: 245, size: '8'  },
      { x: 1200,y: 200, r: 2.5, col: '#c8b870', label: 'ANDREIS',          lx: 1208,ly: 195, size: '8'  },
      { x: 1300,y: 280, r: 2.5, col: '#c8b870', label: 'SOTHA',            lx: 1308,ly: 275, size: '8'  },
    ];

    const sysGroup = svgEl('g');
    systemDots.forEach(s => {
      // Dot
      const dot = svgEl('circle', { cx: s.x, cy: s.y, r: s.r, fill: s.col, opacity: '0.85' });
      sysGroup.appendChild(dot);
      // Label
      const text = svgEl('text', {
        x: s.lx, y: s.ly,
        fill: s.col,
        'font-size': s.size || '9',
        'font-family': 'Cinzel, serif',
        'font-weight': s.bold ? '700' : '400',
        opacity: '0.8',
        'text-anchor': 'start',
      });
      text.textContent = s.label;
      sysGroup.appendChild(text);
    });
    svg.appendChild(sysGroup);

    // ── THE MAELSTROM LABEL (special, larger) ─────────────
    const maelLabel = svgEl('text', {
      x: maelX + 75, y: maelY - 8,
      fill: '#ff6060',
      'font-size': '11',
      'font-family': 'Cinzel, serif',
      'font-weight': '700',
      opacity: '0.95',
    });
    maelLabel.textContent = 'THE MAELSTROM';
    svg.appendChild(maelLabel);
    // Arrow line from label to spot
    const maelArrow = svgEl('line', {
      x1: maelX + 73, y1: maelY - 5,
      x2: maelX + 20, y2: maelY,
      stroke: '#ff4040', 'stroke-width': '1', opacity: '0.6',
    });
    svg.appendChild(maelArrow);


    // ── SECTOR LABELS ─────────────────────────────────────
    const sectors = [
      { x: 130, y: 100, label: 'SEGMENTUM OBSCURUS', size: '13' },
      { x: 900, y: 110, label: 'IMPERIUM NIHILUS',    size: '16' },
      { x: 200, y: 450, label: 'SEGMENTUM PACIFICUS', size: '11', rotate: '-12' },
      { x: 380, y: 390, label: 'SEGMENTUM SOLAR',     size: '12' },
      { x: 950, y: 480, label: 'ULTIMA SEGMENTUM',    size: '16' },
      { x: 200, y: 640, label: 'SEGMENTUM TEMPESTUS', size: '11' },
      { x: 550, y: 660, label: 'IMPERIUM SANCTUS',    size: '18', italic: true },
    ];

    const sectorGroup = svgEl('g');
    sectors.forEach(s => {
      const transform = s.rotate ? `rotate(${s.rotate}, ${s.x}, ${s.y})` : '';
      const text = svgEl('text', {
        x: s.x, y: s.y,
        fill: '#a89060',
        'font-size': s.size || '12',
        'font-family': s.italic ? 'Georgia, serif' : 'Cinzel, serif',
        'font-style': s.italic ? 'italic' : 'normal',
        'font-weight': s.italic ? '400' : '600',
        opacity: '0.55',
        'letter-spacing': '2',
        transform,
      });
      text.textContent = s.label;
      sectorGroup.appendChild(text);
    });
    svg.appendChild(sectorGroup);

    // ── HALO STARS label ──────────────────────────────────
    const haloLabel = svgEl('text', {
      x: 30, y: 60,
      fill: '#9090b0', 'font-size': '10',
      'font-family': 'Cinzel, serif',
      'font-weight': '600', opacity: '0.5',
      transform: 'rotate(-8, 30, 60)',
      'letter-spacing': '2',
    });
    haloLabel.textContent = 'HALO STARS';
    svg.appendChild(haloLabel);

    const eastLabel = svgEl('text', {
      x: 1355, y: 370,
      fill: '#9090b0', 'font-size': '9',
      'font-family': 'Cinzel, serif',
      'font-weight': '600', opacity: '0.5',
      transform: 'rotate(90, 1355, 370)',
      'letter-spacing': '2',
    });
    eastLabel.textContent = 'THE EASTERN FRINGE';
    svg.appendChild(eastLabel);

    // ── GRID OVERLAY — subtle cartographic lines ──────────
    const gridGroup = svgEl('g', {
      stroke: '#6a5530', 'stroke-width': '0.35',
      opacity: '0.18', fill: 'none',
    });
    // Vertical lines
    for (let x = 100; x < 1400; x += 100) {
      gridGroup.appendChild(svgEl('line', { x1: x, y1: 0, x2: x, y2: 700 }));
    }
    // Horizontal lines
    for (let y = 50; y < 700; y += 50) {
      gridGroup.appendChild(svgEl('line', { x1: 0, y1: y, x2: 1400, y2: y }));
    }
    svg.appendChild(gridGroup);

    // ── VIGNETTE OVERLAY — dark edges like a real map ─────
    const vignDefs = svgEl('radialGradient', {
      id: 'vignette', cx: '50%', cy: '50%', r: '70%',
    });
    [['60%','#05030a','0'],['100%','#05030a','0.85']].forEach(([o,c,op]) => {
      vignDefs.appendChild(svgEl('stop', { offset: o, 'stop-color': c, 'stop-opacity': op }));
    });
    defs.appendChild(vignDefs);
    const vignRect = svgEl('rect', {
      x: 0, y: 0, width: 1400, height: 700,
      fill: 'url(#vignette)',
    });
    svg.appendChild(vignRect);

    c.appendChild(svg);
  }

  /* ==========================================================
     CLOUDS (atmosphere zone)
     ========================================================== */
  function createClouds() {
    const layers = [
      { sel: '.cloud-back',  count: 10, size: [300,600], speed: [80,140] },
      { sel: '.cloud-mid',   count: 8,  size: [200,400], speed: [50,90]  },
      { sel: '.cloud-front', count: 6,  size: [150,280], speed: [30,55]  },
    ];
    layers.forEach(layer => {
      const c = document.querySelector(layer.sel);
      if (!c) return;
      const frag = document.createDocumentFragment();
      for (let i = 0; i < layer.count; i++) {
        const w = rand(...layer.size), h = w * rand(.3, .5);
        const div = document.createElement('div');
        div.className = 'cloud';
        div.style.cssText = `left:${rand(-10,100)}%;top:${rand(0,90)}%;width:${w}px;height:${h}px;--dur:${rand(...layer.speed)}s;--dx:${(Math.random()>.5?'':'-')}${rand(100,350)}px;opacity:${rand(.04,.12)}`;
        frag.appendChild(div);
      }
      c.appendChild(frag);
    });
  }

  /* ==========================================================
     LIGHTNING
     ========================================================== */
  function createLightning(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 5; i++) {
      const div = document.createElement('div');
      div.className = 'lightning-flash';
      div.style.cssText = `--x:${rand(10,90)}%;--y:${rand(15,65)}%;--dur:${rand(7,15)}s;--delay:${rand(0,10)}s`;
      frag.appendChild(div);
    }
    c.appendChild(frag);
  }

  /* ==========================================================
     GROUND BATTLE
     ========================================================== */
  function createGroundBattle(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;

    const svg = svgEl('svg', {
      viewBox: '0 0 1400 350',
      preserveAspectRatio: 'xMidYMid slice',
    });
    svg.style.cssText = 'width:100%;height:100%;position:absolute;bottom:0;left:0;opacity:.18';

    // Terrain
    svg.appendChild(svgEl('path', {
      d: 'M0,300 Q150,280 300,292 Q500,270 700,285 Q900,272 1100,288 Q1280,275 1400,292 L1400,350 L0,350Z',
      fill: '#0e0810',
    }));

    // Ruined buildings silhouettes
    const ruins = [
      'M200,230 L195,200 L200,195 L210,195 L215,200 L210,230Z',
      'M220,230 L218,210 L230,205 L242,210 L240,230Z',
      'M340,240 L335,195 L340,188 L360,188 L365,195 L360,240Z M350,200 L350,188',
      'M550,235 L546,205 L555,200 L575,200 L580,205 L576,235Z',
      'M1050,232 L1045,200 L1055,195 L1070,195 L1075,200 L1070,232Z',
    ];
    const ruinGroup = svgEl('g', { fill: '#1a0f18', stroke: '#2a1525', 'stroke-width': '1' });
    ruins.forEach(d => ruinGroup.appendChild(svgEl('path', { d })));
    svg.appendChild(ruinGroup);

    // Red Corsairs (left side) — marine silhouettes
    const chaosData = [
      'M90,272 L87,255 L84,248 L86,240 Q88,236 90,240 L92,248 L96,248 Q98,236 100,240 L102,248 L100,255 L105,272Z',
      'M140,275 L137,258 L134,251 L136,243 Q138,239 140,243 L142,251 L146,251 Q148,239 150,243 L152,251 L150,258 L155,275Z',
      'M185,270 L182,253 L179,246 L181,238 Q183,234 185,238 L187,246 L191,246 Q193,234 195,238 L197,246 L195,253 L200,270Z',
      'M240,278 L248,255 L240,245 L310,245 L318,255 L310,278Z', // Rhino
      'M340,273 L337,256 L334,249 L336,241 Q338,237 340,241 L342,249 L346,249 Q348,237 350,241 L352,249 L350,256 L355,273Z',
      'M395,270 L392,253 L389,246 L391,238 Q393,234 395,238 L397,246 L401,246 Q403,234 405,238 L407,246 L405,253 L410,270Z',
      'M460,276 L457,259 L454,252 L456,244 Q458,240 460,244 L462,252 L466,252 Q468,240 470,244 L472,252 L470,259 L475,276Z',
    ];
    const chaosGroup = svgEl('g', { fill: '#8b1a1a', opacity: '0.7' });
    chaosData.forEach(d => chaosGroup.appendChild(svgEl('path', { d })));
    svg.appendChild(chaosGroup);

    // Aeldari (right side) — sleeker, taller shapes
    const aelData = [
      'M950,270 L948,252 L946,246 L947,238 Q949,234 950,238 L952,246 L955,246 Q957,234 958,238 L960,246 L958,252 L960,270Z',
      'M1000,267 L998,249 L996,243 L997,235 Q999,231 1000,235 L1002,243 L1005,243 Q1007,231 1008,235 L1010,243 L1008,249 L1010,267Z',
      'M1055,272 L1053,254 L1051,248 L1052,240 Q1054,236 1055,240 L1057,248 L1060,248 Q1062,236 1063,240 L1065,248 L1063,254 L1065,272Z',
      'M1100,268 Q1090,258 1095,250 L1132,246 Q1142,253 1137,268Z', // jetbike
      'M1185,271 L1183,253 L1181,247 L1182,239 Q1184,235 1185,239 L1187,247 L1190,247 Q1192,235 1193,239 L1195,247 L1193,253 L1195,271Z',
      'M1240,267 L1238,249 L1236,243 L1237,235 Q1239,231 1240,235 L1242,243 L1245,243 Q1247,231 1248,235 L1250,243 L1248,249 L1250,267Z',
      'M1295,276 L1288,250 L1286,235 Q1290,225 1300,225 Q1310,225 1312,235 L1310,250 L1303,276Z', // wraith
    ];
    const aelGroup = svgEl('g', { fill: '#2050a0', opacity: '0.7' });
    aelData.forEach(d => aelGroup.appendChild(svgEl('path', { d })));
    svg.appendChild(aelGroup);

    // Clash explosions
    const clashG = svgEl('g');
    [620, 680, 740, 800, 860].forEach(x => {
      const boom = svgEl('circle', { cx: x, cy: rand(255, 280), r: rand(4, 10), fill: '#cc3000', opacity: '.5' });
      const pa = svgEl('animate', {
        attributeName: 'opacity', values: '.2;.7;.2',
        dur: rand(1.5, 2.5) + 's', repeatCount: 'indefinite',
        begin: rand(0, 2) + 's',
      });
      boom.appendChild(pa);
      clashG.appendChild(boom);
    });
    svg.appendChild(clashG);

    c.appendChild(svg);
  }

  function createGroundFire(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 22; i++) {
      const div = document.createElement('div');
      div.className = 'ground-fire';
      div.style.cssText = `left:${rand(3,95)}%;--delay:${rand(0,3)}s`;
      frag.appendChild(div);
    }
    c.appendChild(frag);
  }

  /* ==========================================================
     PARALLAX + SCROLL SPY
     ========================================================== */
  function setupParallax() {
    const heroContent = document.querySelector('.hero-content');
    const galaxyCanvas = document.getElementById('galaxy-canvas');
    const nav = document.getElementById('main-nav');

    window.addEventListener('scroll', () => {
      const sy = window.scrollY;
      const vh = window.innerHeight;
      if (heroContent) {
        const fade = Math.max(0, 1 - sy / (vh * .65));
        heroContent.style.opacity = fade;
      }
      // Subtle parallax on the canvas — drifts upward slower than scroll
      if (galaxyCanvas) {
        galaxyCanvas.style.transform = `translateY(${sy * .15}px)`;
      }
      if (nav) nav.classList.toggle('scrolled', sy > 80);
    }, { passive: true });
  }

  function setupScrollSpy() {
    const sections = document.querySelectorAll('.zone');
    const links = document.querySelectorAll('.nav-link');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(l => l.classList.toggle('active', l.getAttribute('data-target') === id));
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px' });
    sections.forEach(s => observer.observe(s));
  }

  /* ==========================================================
     INIT
     ========================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    createGalaxyMap('galaxy-map');
    createClouds();
    createLightning('lightning');
    createGroundBattle('ground-battle');
    createGroundFire('ground-fire');
    setupParallax();
    setupScrollSpy();
  });
})();
