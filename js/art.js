/* Ilustrasi bergaya 3D untuk tiap game: tanpa garis tepi, volume dibentuk dari gradasi,
   kilau, dan bayangan lembut. Dipakai di lobi dan kartu cerita. */

const lg = (id, c, x2 = 0, y2 = 1) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${c.map((s, i) => `<stop offset="${i / (c.length - 1)}" stop-color="${s}"/>`).join('')}</linearGradient>`;
const rg = (id, c, cx = .35, cy = .3, r = .8) =>
  `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${c.map((s, i) => `<stop offset="${i / (c.length - 1)}" stop-color="${s}"/>`).join('')}</radialGradient>`;
const blur = (id, d = 3) => `<filter id="${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${d}"/></filter>`;
const ground = (k, cx, cy, rx, ry, o = .28) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#0b1a5c" opacity="${o}" filter="url(#${k}b)"/>`;

/* koin emas tebal */
const coin = (k, x, y, r) => `
  <ellipse cx="${x}" cy="${y + r * .22}" rx="${r}" ry="${r}" fill="#d9780a"/>
  <circle cx="${x}" cy="${y}" r="${r}" fill="url(#${k}coin)"/>
  <circle cx="${x}" cy="${y}" r="${r * .62}" fill="#ffb21e" opacity=".55"/>
  <ellipse cx="${x - r * .35}" cy="${y - r * .4}" rx="${r * .32}" ry="${r * .18}" fill="#fff" opacity=".85" transform="rotate(-35 ${x - r * .35} ${y - r * .4})"/>`;
const coinDefs = k => rg(`${k}coin`, ['#fff3a8', '#ffcf3d', '#f59a0c'], .35, .3, .85);

/* bintang kilau empat sudut */
const spark = (x, y, s, o = 1) => `<path d="M${x} ${y - s}Q${x + s * .14} ${y - s * .14} ${x + s} ${y}Q${x + s * .14} ${y + s * .14} ${x} ${y + s}Q${x - s * .14} ${y + s * .14} ${x - s} ${y}Q${x - s * .14} ${y - s * .14} ${x} ${y - s}z" fill="#fff" opacity="${o}"/>`;

/* balok isometrik: tiga sisi dengan terang berbeda */
const box = (cx, y, w, h, top, left, right) => {
  const q = w / 4, hw = w / 2;
  return `<path d="M${cx} ${y}L${cx + hw} ${y + q}L${cx} ${y + 2 * q}L${cx - hw} ${y + q}z" fill="${top}"/>
    <path d="M${cx - hw} ${y + q}L${cx} ${y + 2 * q}V${y + 2 * q + h}L${cx - hw} ${y + q + h}z" fill="${left}"/>
    <path d="M${cx + hw} ${y + q}L${cx} ${y + 2 * q}V${y + 2 * q + h}L${cx + hw} ${y + q + h}z" fill="${right}"/>`;
};

/* panel surya miring dengan ketebalan */
const panel = (k, pts, depth = 5) => {
  const [a, b, c, d] = pts;
  const lerp = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
  const L = (p, q) => `M${p[0]} ${p[1]}L${q[0]} ${q[1]}`;
  const grid = [1 / 3, 2 / 3].map(t => L(lerp(a, b, t), lerp(d, c, t))).join('') + L(lerp(a, d, .5), lerp(b, c, .5));
  return `<path d="M${d[0]} ${d[1]}L${c[0]} ${c[1]}L${c[0]} ${c[1] + depth}L${d[0]} ${d[1] + depth}z" fill="#c9780c"/>
    <path d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}L${c[0]} ${c[1]}L${d[0]} ${d[1]}z" fill="url(#${k}frame)"/>
    <path d="M${lerp(a, c, .06).join(' ')}L${lerp(b, d, .06).join(' ')}L${lerp(c, a, .06).join(' ')}L${lerp(d, b, .06).join(' ')}z" fill="url(#${k}cell)"/>
    <path d="${grid}" stroke="#9fd2ff" stroke-width="1.4" opacity=".7"/>
    <path d="M${lerp(a, c, .08).join(' ')}L${lerp(lerp(a, b, .5), c, .08).join(' ')}L${lerp(a, d, .5).join(' ')}z" fill="#fff" opacity=".28"/>`;
};
const panelDefs = k => lg(`${k}frame`, ['#ffe27a', '#ffb21e', '#f08a00']) + lg(`${k}cell`, ['#7cc4ff', '#3b6ff0', '#2443c9'], 1, 1);

/* tiang silinder */
const pole = (k, x, y1, y2, w = 7) => `<rect x="${x - w / 2}" y="${y1}" width="${w}" height="${y2 - y1}" rx="${w / 2}" fill="url(#${k}pole)"/>`;
const poleDefs = k => lg(`${k}pole`, ['#8a98c7', '#e8eeff', '#9aa8d6', '#5d6aa3'], 1, 0);

/* matahari bulat bercahaya */
const sun = (k, x, y, r) => `<circle cx="${x}" cy="${y}" r="${r * 1.9}" fill="url(#${k}halo)"/>
  <circle cx="${x}" cy="${y}" r="${r}" fill="url(#${k}sun)"/>
  <ellipse cx="${x - r * .35}" cy="${y - r * .38}" rx="${r * .38}" ry="${r * .24}" fill="#fff" opacity=".75" transform="rotate(-30 ${x - r * .35} ${y - r * .38})"/>`;
const sunDefs = k => rg(`${k}sun`, ['#fff8c4', '#ffd23d', '#ff9a0c', '#f07400'], .38, .32, .8) + rg(`${k}halo`, ['#fff3a0', 'rgba(255,220,100,0)'], .5, .5, .5);

const ART = {
  dash: k => `<defs>${blur(k + 'b', 3)}${panelDefs(k)}${poleDefs(k)}${coinDefs(k)}
      ${lg(k + 'base', ['#ffd45a', '#f29a12'])}${lg(k + 'bolt', ['#fffbd0', '#ffe23d', '#ffb21e'])}
      ${lg(k + 'spd', ['rgba(255,255,255,0)', '#fff'], 1, 0)}</defs>
    ${ground(k, 66, 90, 34, 5)}
    <rect x="4" y="38" width="26" height="6" rx="3" fill="url(#${k}spd)"/><rect x="0" y="51" width="30" height="6" rx="3" fill="url(#${k}spd)"/><rect x="8" y="64" width="20" height="6" rx="3" fill="url(#${k}spd)"/>
    ${pole(k, 66, 58, 86)}
    <ellipse cx="66" cy="88" rx="17" ry="5" fill="#d9780a"/><ellipse cx="66" cy="85.5" rx="17" ry="5" fill="url(#${k}base)"/>
    ${panel(k, [[36, 30], [94, 18], [100, 50], [42, 62]], 6)}
    <path d="M101 4L88 24h9l-6 16 17-22h-9l7-14z" fill="url(#${k}bolt)"/><path d="M101 4l-6 9 4 0z" fill="#fff" opacity=".7"/>
    ${coin(k, 104, 66, 9)}${coin(k, 90, 82, 7)}`,

  drive: k => `<defs>${blur(k + 'b', 3)}
      ${lg(k + 'body', ['#ffc98a', '#ff8a3d', '#e2541a'])}${lg(k + 'win', ['#e9f8ff', '#9fdcff', '#5fb6f5'], 1, 1)}
      ${rg(k + 'tire', ['#5a5f8f', '#2b2f5c', '#151838'], .4, .35, .7)}${rg(k + 'hub', ['#ffffff', '#c9d3f0', '#8d9ac8'], .4, .35, .7)}
      ${rg(k + 'lamp', ['#ffffff', '#fff36b', '#ffb21e'], .4, .4, .7)}${lg(k + 'beam', ['rgba(255,240,140,.85)', 'rgba(255,240,140,0)'], 1, 0)}</defs>
    ${ground(k, 58, 89, 50, 6)}
    <path d="M98 52l24-15v38z" fill="url(#${k}beam)"/>
    <path d="M12 74V60c0-6 4-9 10-9h11l11-15h33l13 15h9c6 0 9 4 9 9v14z" fill="url(#${k}body)"/>
    <path d="M18 57c20-3 56-3 80 0" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".55" fill="none"/>
    <path d="M12 68h96v6H12z" fill="#c8461a" opacity=".55"/>
    <path d="M47 40h28l9 11H39z" fill="url(#${k}win)"/><path d="M61 40h3v11h-3z" fill="#e2541a"/>
    <path d="M50 42h7l-5 8h-7z" fill="#fff" opacity=".8"/>
    <circle cx="99" cy="61" r="5" fill="url(#${k}lamp)"/>
    <circle cx="34" cy="76" r="11" fill="url(#${k}tire)"/><circle cx="34" cy="76" r="4.8" fill="url(#${k}hub)"/>
    <circle cx="84" cy="76" r="11" fill="url(#${k}tire)"/><circle cx="84" cy="76" r="4.8" fill="url(#${k}hub)"/>`,

  stack: k => `<defs>${blur(k + 'b', 3)}${lg(k + 'rock', ['#c98a55', '#7a4a28'])}${lg(k + 'grass', ['#b6f58a', '#5fd13c'])}</defs>
    ${ground(k, 60, 94, 40, 4, .22)}
    <path d="M18 76l42 21 42-21-6 6-36 15-36-15z" fill="url(#${k}rock)"/>
    ${box(60, 56, 84, 4, 'url(#' + k + 'grass)', '#46b52c', '#38a024')}
    ${box(60, 58, 44, 13, '#ffffff', '#dbe4ff', '#b6c4f2')}
    ${box(60, 44, 36, 12, '#ffe27a', '#ffb21e', '#e88a0a')}
    ${box(60, 31, 28, 11, '#ffffff', '#dbe4ff', '#b6c4f2')}
    ${box(60, 12, 50, 3, '#5d95ff', '#3b5bdb', '#2a3fb0')}
    <path d="M60 12l25 12.5" stroke="#bfe0ff" stroke-width="1.3" opacity=".7"/><path d="M60 37l-25-12.5" stroke="#bfe0ff" stroke-width="1.3" opacity=".7"/>
    <path d="M47 18l9 4.5-9 4.5-9-4.5z" fill="#fff" opacity=".35"/>
    ${spark(102, 26, 7)}${spark(18, 40, 4, .8)}`,

  grid: k => `<defs>${blur(k + 'b', 3)}${blur(k + 'g', 2.5)}${sunDefs(k)}${panelDefs(k)}${lg(k + 'mir', ['#ffffff', '#cfdcff', '#8fa3e0'], 1, 1)}</defs>
    <path d="M40 40L80 74L106 40" stroke="#fff36b" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity=".6" filter="url(#${k}g)"/>
    <path d="M40 40L80 74L106 40" stroke="#fffbe0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    ${sun(k, 28, 30, 15)}
    ${ground(k, 80, 88, 18, 3, .22)}
    <path d="M64 80l32-8 3 5-32 8z" fill="#7383c4"/><path d="M63 76l32-8 4 4-32 8z" fill="url(#${k}mir)"/><path d="M70 75l12-3" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    ${panel(k, [[94, 20], [116, 26], [112, 44], [90, 38]], 4)}
    ${spark(60, 22, 5, .9)}`,

  tilt: k => `<defs>${blur(k + 'b', 3)}${sunDefs(k)}${panelDefs(k)}${poleDefs(k)}
      ${lg(k + 'h1', ['#b6f58a', '#5fd13c', '#3aa624'])}</defs>
    ${sun(k, 40, 56, 21)}
    <path d="M0 70c18-12 38-14 60-6s40 8 60-6v42H0z" fill="url(#${k}h1)"/>
    <path d="M0 70c18-12 38-14 60-6" stroke="#e4ffcf" stroke-width="3" opacity=".7" fill="none"/>
    <path d="M0 86c30-10 60-6 120 0v14H0z" fill="#3aa624" opacity=".6"/>
    ${pole(k, 90, 54, 84)}
    ${panel(k, [[70, 50], [104, 36], [110, 48], [76, 62]], 5)}
    ${spark(16, 20, 5, .9)}`,

  sci: k => `<defs>${blur(k + 'b', 3)}${lg(k + 'liq', ['#9bffe0', '#2fd3a6', '#109c86'])}${lg(k + 'glass', ['rgba(255,255,255,.65)', 'rgba(255,255,255,.2)'], 1, 0)}
      ${rg(k + 'bub', ['#ffffff', 'rgba(255,255,255,.2)'], .35, .3, .7)}</defs>
    ${ground(k, 60, 92, 32, 4)}
    <path d="M51 12h18v26l21 38a8 8 0 0 1-7 12H37a8 8 0 0 1-7-12l21-38z" fill="url(#${k}glass)"/>
    <path d="M38 62h44l8 14a8 8 0 0 1-7 12H37a8 8 0 0 1-7-12z" fill="url(#${k}liq)"/>
    <ellipse cx="60" cy="62" rx="22" ry="3.5" fill="#c9fff0"/>
    <path d="M48 9h24a3 3 0 0 1 0 6H48a3 3 0 0 1 0-6z" fill="#e9f0ff"/>
    <path d="M55 18v20L40 66" stroke="#fff" stroke-width="4" stroke-linecap="round" fill="none" opacity=".75"/>
    <circle cx="52" cy="76" r="4.5" fill="url(#${k}bub)"/><circle cx="66" cy="70" r="3.2" fill="url(#${k}bub)"/><circle cx="62" cy="81" r="2.4" fill="url(#${k}bub)"/>
    <circle cx="76" cy="50" r="4.5" fill="url(#${k}bub)"/><circle cx="85" cy="38" r="3" fill="url(#${k}bub)"/>
    ${spark(24, 30, 8)}${spark(98, 20, 6)}`
};
const art = k => `<svg viewBox="0 0 120 100" aria-hidden="true">${ART[k]('a' + k + Math.random().toString(36).slice(2, 6))}</svg>`;
