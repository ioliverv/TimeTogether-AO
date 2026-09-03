// ═══ MONTHLY DECORATIONS — Garden, constellation, necklace & card thread ═══
// Each decoration reveals one more element per unlocked month.

// ─── Flower palettes, indexed by month ───
const FLOWER_TYPES = [
    // 0 — cat face (month 1)
    { bloomSize: '38px', petalLight: '#ffffff', petalDark: '#d8d4ce', petalCount: 8, style: 'cat',
      centerLight: '#fff9b0', centerDark: '#e8c000' },
    // 1 — Spiderman: red/blue petals, colours applied per-petal in JS (month 2)
    { bloomSize: '40px', petalLight: null, petalDark: null, petalCount: 6, style: 'spiderman',
      centerLight: '#fff099', centerDark: '#ccbb00' },
    // 2 — ivory bloom with ice-blue accents (month 3)
    { bloomSize: '40px', petalLight: '#ffffff', petalDark: '#78bee7', petalCount: 6, style: 'normal',
      centerLight: '#f7fdff', centerDark: '#285775' },
    // 3 — magenta
    { bloomSize: '38px', petalLight: '#f0b8d8', petalDark: '#d860a0', petalCount: 6, style: 'normal',
      centerLight: '#fffbd0', centerDark: '#e8b800' },
    // 4 — lavender
    { bloomSize: '32px', petalLight: '#e0ccf5', petalDark: '#9855c8', petalCount: 6, style: 'normal',
      centerLight: '#fffbd0', centerDark: '#e8b800' },
    // 5 — baby pink
    { bloomSize: '36px', petalLight: '#fce4ec', petalDark: '#f06890', petalCount: 6, style: 'normal',
      centerLight: '#fffbd0', centerDark: '#e8b800' },
    // 6 — deep pink
    { bloomSize: '34px', petalLight: '#ffccdd', petalDark: '#e85080', petalCount: 6, style: 'normal',
      centerLight: '#fffbd0', centerDark: '#e8b800' },
    // 7 — coral
    { bloomSize: '38px', petalLight: '#ffd0b8', petalDark: '#f07848', petalCount: 6, style: 'normal',
      centerLight: '#fffbd0', centerDark: '#e8b800' },
    // 8 — purple
    { bloomSize: '30px', petalLight: '#f0e0f8', petalDark: '#a060c0', petalCount: 6, style: 'normal',
      centerLight: '#fffbd0', centerDark: '#e8b800' },
    // 9 — sunflower
    { bloomSize: '42px', petalLight: '#fff9c4', petalDark: '#f8cc20', petalCount: 8, style: 'daisy',
      centerLight: '#8b4a00', centerDark: '#5a2e00' },
    // 10 — light pink
    { bloomSize: '32px', petalLight: '#fce4ec', petalDark: '#ef607a', petalCount: 6, style: 'normal',
      centerLight: '#fffbd0', centerDark: '#e8b800' },
    // 11 — gold (anniversary)
    { bloomSize: '44px', petalLight: '#fff8e8', petalDark: '#c9a96e', petalCount: 6, style: 'normal',
      centerLight: '#fff8cc', centerDark: '#c9a96e' },
];

// ─── Stem & animation timing; x placement is derived from the index ───
const GARDEN_FLOWERS = [
    { type: 0,  stemH: '28px', swayAngle: '5deg',  swayDur: '3.2s', swayDelay: '0s',   growDelay: '0.2s' },
    { type: 1,  stemH: '40px', swayAngle: '-4deg', swayDur: '2.8s', swayDelay: '0.5s', growDelay: '0.4s' },
    { type: 2,  stemH: '22px', swayAngle: '6deg',  swayDur: '3.6s', swayDelay: '0.9s', growDelay: '0.6s' },
    { type: 3,  stemH: '36px', swayAngle: '-3deg', swayDur: '3.0s', swayDelay: '0.2s', growDelay: '0.8s' },
    { type: 4,  stemH: '30px', swayAngle: '4deg',  swayDur: '2.6s', swayDelay: '0.7s', growDelay: '1.0s' },
    { type: 5,  stemH: '32px', swayAngle: '-5deg', swayDur: '3.4s', swayDelay: '0.3s', growDelay: '1.2s' },
    { type: 6,  stemH: '25px', swayAngle: '4deg',  swayDur: '2.9s', swayDelay: '0.8s', growDelay: '1.4s' },
    { type: 7,  stemH: '38px', swayAngle: '-6deg', swayDur: '3.1s', swayDelay: '0.1s', growDelay: '1.6s' },
    { type: 8,  stemH: '28px', swayAngle: '5deg',  swayDur: '2.7s', swayDelay: '0.6s', growDelay: '1.8s' },
    { type: 9,  stemH: '20px', swayAngle: '-4deg', swayDur: '3.3s', swayDelay: '1.0s', growDelay: '2.0s' },
    { type: 10, stemH: '26px', swayAngle: '3deg',  swayDur: '3.5s', swayDelay: '0.4s', growDelay: '2.2s' },
    { type: 11, stemH: '34px', swayAngle: '-5deg', swayDur: '2.8s', swayDelay: '0.2s', growDelay: '2.4s' },
];

// ─── Constellation: 12 stars tracing a heart, in viewport % ───
const STAR_POSITIONS = [
    { x: 33, y: 16 },  //  1 — upper-left lobe
    { x: 18, y: 28 },  //  2 — left arc, top
    { x: 11, y: 43 },  //  3 — left side
    { x: 18, y: 59 },  //  4 — left arc, bottom
    { x: 34, y: 71 },  //  5 — lower left
    { x: 50, y: 80 },  //  6 — bottom point
    { x: 66, y: 71 },  //  7 — lower right
    { x: 82, y: 59 },  //  8 — right arc, bottom
    { x: 89, y: 43 },  //  9 — right side
    { x: 82, y: 28 },  // 10 — right arc, top
    { x: 67, y: 16 },  // 11 — upper-right lobe
    { x: 50, y: 27 },  // 12 — centre dip, closes the heart
];

const STAR_SIZES = [
    '0.9rem', '1.0rem', '0.85rem', '1.05rem',
    '0.9rem', '1.25rem', '0.9rem', '1.0rem',
    '0.88rem', '1.05rem', '0.9rem', '1.4rem',
];

// ─── Necklace charms: hand-drawn SVG for months 1-2, emoji beyond ───
const CHARM_SVG = {
    cat: `<svg class="charm-svg charm-svg--cat" viewBox="0 0 32 32">
        <path d="M6.5 10 L11 3 L12.8 11.5 Z" fill="#a08060"/>
        <path d="M25.5 10 L21 3 L19.2 11.5 Z" fill="#a08060"/>
        <ellipse cx="16" cy="18.5" rx="10.5" ry="8.8" fill="#fdf7ee"/>
        <circle cx="12" cy="17.5" r="1.5" fill="#3a2e22"/>
        <circle cx="20" cy="17.5" r="1.5" fill="#3a2e22"/>
        <path d="M16 20.2 l-1.5 1.6h3Z" fill="#f0829e"/>
        <g stroke="#a08060" stroke-width="0.7" stroke-linecap="round">
            <path d="M6 19 L0.5 18.2"/>
            <path d="M6 21 L0.5 21.6"/>
            <path d="M26 19 L31.5 18.2"/>
            <path d="M26 21 L31.5 21.6"/>
        </g>
    </svg>`,
    ring: `<svg class="charm-svg charm-svg--ring" viewBox="0 0 32 32">
        <defs>
            <linearGradient id="charmRingGold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#f0dcae"/>
                <stop offset="1" stop-color="#a3803f"/>
            </linearGradient>
        </defs>
        <circle cx="16" cy="20" r="8.2" fill="none" stroke="url(#charmRingGold)" stroke-width="3.2"/>
        <path d="M16 5.5 L19.5 11.5 L16 15 L12.5 11.5 Z" fill="#f6dbe4" stroke="#c9a96e" stroke-width="0.6"/>
        <path d="M14.3 9.5 L16 6.6 L17.7 9.5" fill="none" stroke="#ffffff" stroke-width="0.6" opacity="0.8"/>
    </svg>`,
    vip: `<svg class="charm-svg charm-svg--vip" viewBox="0 0 32 32" aria-label="Cita VIP">
        <path d="M4 6 H28 V11 C25.8 11.5 25.8 15.5 28 16 V26 H4 V16 C6.2 15.5 6.2 11.5 4 11 Z" fill="#0b2438" stroke="#dff4ff" stroke-width="1.3"/>
        <path d="M8 9 H24" stroke="#66bce9" stroke-width="1" opacity="0.85"/>
        <text x="16" y="21" text-anchor="middle" fill="#ffffff" font-family="serif" font-size="8" font-weight="700">VIP</text>
    </svg>`,
};

const CHARM_DATA = [
    { kind: 'cat',   label: 'mes 1',  threadH: '18px', swingAngle: '5deg',  swingDur: '3.2s', swingDelay: '0.0s' },
    { kind: 'ring',  label: 'mes 2',  threadH: '24px', swingAngle: '-4deg', swingDur: '2.8s', swingDelay: '0.5s' },
    { kind: 'vip',   label: 'mes 3', threadH: '16px', swingAngle: '6deg',  swingDur: '3.5s', swingDelay: '0.2s' },
    { kind: 'emoji', icon: '✨', label: 'mes 4',  threadH: '22px', swingAngle: '-5deg', swingDur: '2.6s', swingDelay: '0.8s' },
    { kind: 'emoji', icon: '🎵', label: 'mes 5',  threadH: '20px', swingAngle: '4deg',  swingDur: '3.0s', swingDelay: '0.3s' },
    { kind: 'emoji', icon: '🦋', label: 'mes 6',  threadH: '26px', swingAngle: '-6deg', swingDur: '2.9s', swingDelay: '0.6s' },
    { kind: 'emoji', icon: '🌊', label: 'mes 7',  threadH: '18px', swingAngle: '5deg',  swingDur: '3.3s', swingDelay: '0.1s' },
    { kind: 'emoji', icon: '⭐', label: 'mes 8',  threadH: '23px', swingAngle: '-4deg', swingDur: '2.7s', swingDelay: '0.7s' },
    { kind: 'emoji', icon: '🎆', label: 'mes 9',  threadH: '19px', swingAngle: '6deg',  swingDur: '3.1s', swingDelay: '0.4s' },
    { kind: 'emoji', icon: '🍂', label: 'mes 10', threadH: '21px', swingAngle: '-5deg', swingDur: '2.8s', swingDelay: '0.9s' },
    { kind: 'emoji', icon: '☃️', label: 'mes 11', threadH: '17px', swingAngle: '4deg',  swingDur: '3.4s', swingDelay: '0.2s' },
    { kind: 'emoji', icon: '👑', label: 'mes 12', threadH: '25px', swingAngle: '-3deg', swingDur: '2.5s', swingDelay: '0.5s' },
];

// ═════════════════════════════════════════════════════════════════════
// BUILDERS
// ═════════════════════════════════════════════════════════════════════

// ─── Cat face overlay: ears, eyes, blush, nose, whiskers ───
function _addCatFace(bloom) {
    const earL = document.createElement('div');
    earL.className = 'cat-ear cat-ear-l';
    bloom.appendChild(earL);

    const earR = document.createElement('div');
    earR.className = 'cat-ear cat-ear-r';
    bloom.appendChild(earR);

    const eyeL = document.createElement('div');
    eyeL.className = 'cat-eye cat-eye-l';
    bloom.appendChild(eyeL);

    const eyeR = document.createElement('div');
    eyeR.className = 'cat-eye cat-eye-r';
    bloom.appendChild(eyeR);

    const blushL = document.createElement('div');
    blushL.className = 'cat-blush cat-blush-l';
    bloom.appendChild(blushL);

    const blushR = document.createElement('div');
    blushR.className = 'cat-blush cat-blush-r';
    bloom.appendChild(blushR);

    const nose = document.createElement('div');
    nose.className = 'cat-nose';
    bloom.appendChild(nose);

    const WHISKER_ROWS = [46, 54, 62]; // % from bloom top
    ['l', 'r'].forEach(side => {
        WHISKER_ROWS.forEach((topPct, i) => {
            const whisker = document.createElement('div');
            whisker.className = `cat-whisker cat-whisker-${side}`;
            whisker.style.top = `${topPct}%`;
            const angle = (i - 1) * 8; // fan out: -8 / 0 / +8 deg
            whisker.style.setProperty('--wk-angle', `${side === 'l' ? angle : -angle}deg`);
            bloom.appendChild(whisker);
        });
    });
}

// ─── Spiderman face overlay: web strands + eye mask ───
function _addSpiderFace(bloom) {
    const web = document.createElement('div');
    web.className = 'spider-web';
    for (let i = 0; i < 4; i++) {
        const strand = document.createElement('div');
        strand.className = 'spider-web-strand';
        strand.style.setProperty('--sw-rot', `${i * 45}deg`);
        web.appendChild(strand);
    }
    bloom.appendChild(web);

    const mask = document.createElement('div');
    mask.className = 'spider-mask';
    const eyeL = document.createElement('div');
    eyeL.className = 'spider-eye spider-eye-l';
    const eyeR = document.createElement('div');
    eyeR.className = 'spider-eye spider-eye-r';
    mask.appendChild(eyeL);
    mask.appendChild(eyeR);
    bloom.appendChild(mask);
}

// ─── Full CSS flower; index drives placement ───
function _createCSSFlower(f, index) {
    const ft         = FLOWER_TYPES[f.type] || FLOWER_TYPES[2];
    const petalCount = ft.petalCount || 6;
    const style      = ft.style      || 'normal';
    const isDaisy    = style === 'daisy';
    const isSpider   = style === 'spiderman';
    const isCat      = style === 'cat';

    // Alternating petal colours for the Spiderman bloom
    const SPIDER_COLORS = [
        { light: '#ff3030', dark: '#aa0010' },  // red
        { light: '#3060ee', dark: '#0030aa' },  // blue
    ];

    const flower = document.createElement('div');
    flower.className = 'garden-flower';
    if (f.type === 2) flower.classList.add('garden-flower--midnight');
    flower.style.setProperty('--gf-side',       index % 2 === 0 ? -1 : 1);
    flower.style.setProperty('--gf-rank',       Math.floor(index / 2));
    flower.style.setProperty('--gf-stem-h',     f.stemH);
    flower.style.setProperty('--gf-sway-angle', f.swayAngle);
    flower.style.setProperty('--gf-sway-dur',   f.swayDur);
    flower.style.setProperty('--gf-sway-delay', f.swayDelay);
    flower.style.setProperty('--gf-grow-delay', f.growDelay);
    flower.style.setProperty('--gf-bloom-size', ft.bloomSize);
    if (!isSpider) {
        flower.style.setProperty('--gf-petal-light', ft.petalLight);
        flower.style.setProperty('--gf-petal-dark',  ft.petalDark);
    }

    // Petals
    const bloom = document.createElement('div');
    bloom.className = 'flower-bloom';

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        const rot   = (i / petalCount) * 360;

        if (isDaisy || isCat) {
            petal.className = 'flower-petal flower-petal--daisy';
        } else if (isSpider) {
            petal.className = 'flower-petal flower-petal--spider';
            const c = SPIDER_COLORS[i % 2];
            petal.style.background =
                `radial-gradient(ellipse at 50% 20%, ${c.light}, ${c.dark})`;
        } else {
            petal.className = 'flower-petal';
        }

        petal.style.setProperty('--petal-rot', `${rot}deg`);
        bloom.appendChild(petal);
    }

    // Centre dot, or a face for the cat / Spiderman blooms
    if (!isCat && !isSpider) {
        const center = document.createElement('div');
        center.className = 'flower-center-dot';
        if (ft.centerLight && ft.centerDark) {
            center.style.background =
                `radial-gradient(circle at 38% 38%, ${ft.centerLight}, ${ft.centerDark})`;
            center.style.boxShadow = `0 0 6px ${ft.centerDark}cc`;
        }
        bloom.appendChild(center);
    } else if (isCat) {
        _addCatFace(bloom);
    } else if (isSpider) {
        _addSpiderFace(bloom);
    }

    // Stem + leaves
    const stem  = document.createElement('div');
    stem.className = 'flower-stem';
    const leafL = document.createElement('div');
    leafL.className = 'flower-leaf-l';
    stem.appendChild(leafL);
    const leafR = document.createElement('div');
    leafR.className = 'flower-leaf-r';
    stem.appendChild(leafR);

    flower.appendChild(bloom);
    flower.appendChild(stem);
    return flower;
}

// ─── Garden ───
function buildGarden(unlocked, containerId) {
    const id = containerId || 'garden-container';
    const container = document.getElementById(id);
    if (!container) return;
    container.innerHTML = '';

    const count = Math.min(unlocked, GARDEN_FLOWERS.length);
    GARDEN_FLOWERS.slice(0, count).forEach((f, i) => {
        container.appendChild(_createCSSFlower(f, i));
    });
}

// ─── Heart constellation ───
function buildConstellation(unlocked, containerId) {
    const container = document.getElementById(containerId || 'constellation-container');
    if (!container) return;
    container.innerHTML = '';

    const count = Math.min(unlocked, STAR_POSITIONS.length);
    if (count === 0) return;

    // Connecting lines
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.classList.add('constellation-svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('preserveAspectRatio', 'none');
    container.appendChild(svg);

    // Segment between each consecutive pair
    for (let i = 0; i < count - 1; i++) {
        const a = STAR_POSITIONS[i];
        const b = STAR_POSITIONS[i + 1];
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1', a.x); line.setAttribute('y1', a.y);
        line.setAttribute('x2', b.x); line.setAttribute('y2', b.y);
        line.classList.add('constellation-line');
        line.style.animationDelay = `${i * 0.12}s`;
        svg.appendChild(line);
    }

    // Month 12 closes the heart: last star back to the first
    if (count === 12) {
        const a = STAR_POSITIONS[11];
        const b = STAR_POSITIONS[0];
        const cl = document.createElementNS(svgNS, 'line');
        cl.setAttribute('x1', a.x); cl.setAttribute('y1', a.y);
        cl.setAttribute('x2', b.x); cl.setAttribute('y2', b.y);
        cl.classList.add('constellation-line');
        cl.style.animationDelay = '1.5s';
        svg.appendChild(cl);
    }

    // Star points
    STAR_POSITIONS.slice(0, count).forEach((pos, i) => {
        const star = document.createElement('div');
        star.className = 'star-point';
        star.style.left = `${pos.x}%`;
        star.style.top  = `${pos.y}%`;
        star.style.setProperty('--sp-size',          STAR_SIZES[i]);
        star.style.setProperty('--sp-appear-delay',  `${i * 0.1}s`);
        star.style.setProperty('--sp-twinkle-dur',   `${2.0 + (i % 5) * 0.35}s`);
        star.style.setProperty('--sp-twinkle-delay', `${(i % 4) * 0.5}s`);
        star.textContent = '★';
        container.appendChild(star);
    });
}

// ─── Memory necklace ───
function buildNecklace(unlocked, containerId) {
    const container = document.getElementById(containerId || 'necklace-container');
    if (!container) return;
    container.innerHTML = '';

    if (unlocked === 0) return;

    const count = Math.min(unlocked, CHARM_DATA.length);

    // Cord
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.classList.add('necklace-cord-svg');
    svg.setAttribute('viewBox', '0 0 100 10');
    svg.setAttribute('preserveAspectRatio', 'none');
    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', 'M 0 4 Q 50 8 100 4');
    path.classList.add('necklace-cord-path');
    svg.appendChild(path);
    container.appendChild(svg);

    // Charm row
    const charmsRow = document.createElement('div');
    charmsRow.className = 'necklace-charms';

    CHARM_DATA.slice(0, count).forEach((charm, slot) => {
        const iconHTML = charm.kind === 'emoji' ? charm.icon : CHARM_SVG[charm.kind];
        charmsRow.appendChild(_createCharmEl(charm, iconHTML, charm.label, slot));
    });

    container.appendChild(charmsRow);
}

function _createCharmEl(charm, iconHTML, label, slot) {
    const el = document.createElement('div');
    el.className = 'necklace-charm';
    el.style.setProperty('--ch-thread-h',     charm.threadH);
    el.style.setProperty('--ch-swing-angle',  charm.swingAngle);
    el.style.setProperty('--ch-swing-dur',    charm.swingDur);
    el.style.setProperty('--ch-swing-delay',  charm.swingDelay);
    el.style.setProperty('--ch-appear-delay', `${slot * 0.09}s`);

    el.innerHTML = `
        <div class="charm-thread"></div>
        <div class="charm-icon">${iconHTML}</div>
        <div class="charm-label">${label}</div>
    `;
    return el;
}

// ═════════════════════════════════════════════════════════════════════
// CARD THREAD — ribbon linking consecutive unlocked cards
// ═════════════════════════════════════════════════════════════════════

// Theme colour per month; unlisted fall back to site gold.
const CARD_THREAD_COLORS = {
    1: '#c9a96e',   // site gold
    2: '#e6362f',   // Spiderman red
    3: '#66bce9',   // VIP blue
};
const CARD_THREAD_DEFAULT_COLOR = '#c9a96e';

function _cardThreadColor(month) {
    return CARD_THREAD_COLORS[month] || CARD_THREAD_DEFAULT_COLOR;
}

// Measures live card positions — rebuild on render and on resize.
function buildCardThread() {
    const grid = document.getElementById('months-grid');
    if (!grid) return;

    const oldSvg = document.getElementById('card-thread-svg');
    if (oldSvg) oldSvg.remove();

    const cards = [...grid.querySelectorAll('.month-card.unlocked')];
    if (cards.length < 2) return;

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.id = 'card-thread-svg';
    svg.classList.add('card-thread-svg');

    const gridRect = grid.getBoundingClientRect();
    svg.setAttribute('width', gridRect.width);
    svg.setAttribute('height', gridRect.height);
    svg.setAttribute('viewBox', `0 0 ${gridRect.width} ${gridRect.height}`);

    const defs = document.createElementNS(svgNS, 'defs');
    svg.appendChild(defs);

    const paths = [];

    cards.slice(0, -1).forEach((cardA, i) => {
        const cardB   = cards[i + 1];
        const monthA  = parseInt(cardA.querySelector('.month-card-number').textContent, 10);
        const monthB  = parseInt(cardB.querySelector('.month-card-number').textContent, 10);
        const colorA  = _cardThreadColor(monthA);
        const colorB  = _cardThreadColor(monthB);

        const ra = cardA.getBoundingClientRect();
        const rb = cardB.getBoundingClientRect();
        const sameRow = Math.abs(ra.top - rb.top) < 4;

        let x1, y1, x2, y2, d;
        if (sameRow) {
            // Same row: straight run across the gap
            y1 = ra.top + ra.height / 2 - gridRect.top;
            y2 = rb.top + rb.height / 2 - gridRect.top;
            x1 = ra.right - gridRect.left;
            x2 = rb.left - gridRect.left;
            d = `M ${x1} ${y1} L ${x2} ${y2}`;
        } else {
            // Row wrap: drop, cross, rise — never over another card
            x1 = ra.left + ra.width / 2 - gridRect.left;
            x2 = rb.left + rb.width / 2 - gridRect.left;
            y1 = ra.bottom - gridRect.top;
            y2 = rb.top - gridRect.top;
            const yMid = (y1 + y2) / 2;
            d = `M ${x1} ${y1} L ${x1} ${yMid} L ${x2} ${yMid} L ${x2} ${y2}`;
        }

        const gradId = `card-thread-grad-${i}`;
        const grad = document.createElementNS(svgNS, 'linearGradient');
        grad.setAttribute('id', gradId);
        grad.setAttribute('gradientUnits', 'userSpaceOnUse');
        grad.setAttribute('x1', x1); grad.setAttribute('y1', y1);
        grad.setAttribute('x2', x2); grad.setAttribute('y2', y2);
        [['0%', colorA], ['50%', colorA], ['50%', colorB], ['100%', colorB]].forEach(([offset, color]) => {
            const stop = document.createElementNS(svgNS, 'stop');
            stop.setAttribute('offset', offset);
            stop.setAttribute('stop-color', color);
            grad.appendChild(stop);
        });
        defs.appendChild(grad);

        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', d);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', `url(#${gradId})`);
        path.classList.add('card-thread-path');
        svg.appendChild(path);

        // Satin highlight tracing the same path
        const sheen = document.createElementNS(svgNS, 'path');
        sheen.setAttribute('d', d);
        sheen.classList.add('card-thread-sheen');
        svg.appendChild(sheen);

        paths.push({ path, sheen, delay: i * 0.15 });
    });

    grid.insertBefore(svg, grid.firstChild);

    // Draw-on effect, staggered from the first card to the last
    requestAnimationFrame(() => {
        paths.forEach(({ path, sheen, delay }) => {
            const len = path.getTotalLength();
            [path, sheen].forEach(el => {
                el.style.strokeDasharray  = len;
                el.style.strokeDashoffset = len;
            });
            void path.getBoundingClientRect(); // force reflow before animating
            [path, sheen].forEach(el => {
                el.style.transition = `stroke-dashoffset 0.9s ease ${delay}s`;
            });
            requestAnimationFrame(() => {
                path.style.strokeDashoffset = '0';
                sheen.style.strokeDashoffset = '0';
            });
        });
    });
}

let _cardThreadResizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(_cardThreadResizeTimer);
    _cardThreadResizeTimer = setTimeout(() => {
        if (document.querySelector('#months-grid .month-card.unlocked')) buildCardThread();
    }, 200);
});
