/* Musik latar Kiara Arcade, satu lagu orisinal untuk tiap game (WebAudio, tanpa file audio).
   Diputar dari halaman utama supaya tidak putus saat game dimuat ulang.
   Notasi melodi "C5/0.5" artinya nada C5 selama setengah ketukan, "-" artinya diam.
   Tiap lagu 8 birama x 4 ketukan lalu berulang. */

const SONGS = {
  dash: {
    title: 'Lari Pagi Kiarakoneng', bpm: 132, wave: 'square', lp: 2600, lv: .07,
    lead: 'E5/.5 G5/.5 C6/.5 G5/.5 E5/.5 G5/.5 C6/1 | D5/.5 G5/.5 B5/.5 G5/.5 D6/1 B5/1 | C5/.5 E5/.5 A5/.5 E5/.5 C6/1 A5/1 | F5/.5 A5/.5 C6/.5 A5/.5 F5/1 -/1 | E5/.5 G5/.5 C6/.5 E6/.5 D6/.5 C6/.5 G5/1 | D5/.5 G5/.5 B5/.5 D6/.5 B5/1 G5/1 | A5/.5 C6/.5 F6/.5 C6/.5 A5/.5 F5/.5 A5/1 | B5/.5 D6/.5 G6/1 F6/.5 D6/.5 B5/1',
    chords: ['C3', 'G2', 'A2', 'F2', 'C3', 'G2', 'F2', 'G2'], bass: 'bounce', hat: 'off8', kick: true
  },
  drive: {
    title: 'Patroli Malam', bpm: 96, wave: 'sawtooth', lp: 1300, lv: .06,
    lead: 'A4/1.5 C5/.5 E5/2 | F5/1.5 E5/.5 C5/2 | G5/1.5 E5/.5 C5/1 D5/1 | B4/3 -/1 | A4/1.5 C5/.5 E5/1 A5/1 | G5/1.5 F5/.5 E5/2 | E5/1 G5/1 C6/2 | B5/2 G5/1 D5/1',
    chords: ['A1', 'F1', 'C2', 'G1', 'A1', 'F1', 'C2', 'G1'], bass: 'pulse', bassWave: 'sawtooth', hat: 'off8', kick: true, pad: true, delay: .32
  },
  stack: {
    title: 'Tiang demi Tiang', bpm: 112, wave: 'triangle', lp: 3200, lv: .16, pluck: true,
    lead: 'F5/.5 A5/.5 C6/.5 A5/.5 F5/.5 -/.5 C5/1 | E5/.5 G5/.5 C6/.5 G5/.5 E5/1 -/1 | D5/.5 F5/.5 A5/.5 D6/.5 C6/.5 A5/.5 F5/1 | D5/.5 F5/.5 Bb5/1 A5/.5 G5/.5 F5/1 | C6/.5 A5/.5 F5/.5 A5/.5 C6/1 F6/1 | E6/.5 D6/.5 C6/.5 G5/.5 E5/1 G5/1 | D6/.5 C6/.5 Bb5/.5 A5/.5 G5/1 Bb5/1 | A5/.5 G5/.5 F5/.5 E5/.5 F5/2',
    chords: ['F2', 'C2', 'D2', 'Bb1', 'F2', 'C2', 'Bb1', 'C2'], bass: 'oompah', hat: 'off8'
  },
  grid: {
    title: 'Jalur Cahaya', bpm: 84, wave: 'sine', lp: 5000, lv: .16, bell: true,
    lead: 'D5/1 A5/1 F5/2 | E5/1 C5/1 A4/2 | Bb4/1 D5/1 F5/1 A5/1 | G5/3 E5/1 | D5/1 F5/1 A5/1 D6/1 | C6/2 A5/2 | Bb5/1 A5/1 F5/1 D5/1 | E5/2 C5/2',
    chords: ['D2', 'A1', 'Bb1', 'C2', 'D2', 'A1', 'Bb1', 'C2'], bass: 'whole', pad: true, delay: .42
  },
  tilt: {
    title: 'Angin Cakrawala', bpm: 104, wave: 'triangle', lp: 3600, lv: .15,
    lead: 'B4/.5 D5/.5 G5/1 A5/.5 B5/.5 G5/1 | E5/.5 G5/.5 B5/1 A5/1 G5/1 | E5/.5 G5/.5 C6/1 B5/.5 A5/.5 G5/1 | A5/1.5 B5/.5 A5/1 D5/1 | B4/.5 D5/.5 G5/1 B5/.5 D6/.5 B5/1 | E6/1 D6/.5 B5/.5 G5/2 | C6/.5 B5/.5 A5/.5 G5/.5 E5/1 G5/1 | A5/.5 B5/.5 A5/.5 F#5/.5 G5/2',
    chords: ['G2', 'E2', 'C2', 'D2', 'G2', 'E2', 'C2', 'D2'], bass: 'root2', hat: 'eighth'
  },
  sci: {
    title: 'Laboratorium Tenang', bpm: 70, wave: 'sine', lp: 2400, lv: .13, bell: true,
    lead: 'B4/2 E5/2 | G5/3 E5/1 | D5/2 B4/2 | A4/4 | B4/2 G5/2 | E5/3 C5/1 | D5/2 G5/2 | F#5/4',
    chords: ['E2', 'C2', 'G1', 'D2', 'E2', 'C2', 'G1', 'D2'], bass: 'whole', pad: true, delay: .5
  }
};
/* variasi lagu Kiara Stack mengikuti level yang dipilih di dalam game */
SONGS['stack-siang'] = SONGS.stack;
SONGS['stack-malam'] = Object.assign({}, SONGS.stack, { title: 'Tiang di Bawah Bulan', bpm: 88, wave: 'sine', lp: 1800, hat: null, pad: true, delay: .4 });
SONGS['stack-hujan'] = Object.assign({}, SONGS.stack, { title: 'Tiang di Tengah Hujan', bpm: 96, lp: 1500, hat: null, rain: true, delay: .35 });

/* ---------- mesin musik ---------- */
const NOTE = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const midi = n => { const m = /^([A-G])([#b]?)(-?\d)$/.exec(n); return 12 * (+m[3] + 1) + NOTE[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0); };
const hz = m => 440 * Math.pow(2, (m - 69) / 12);
function parse(s) {
  const out = []; let t = 0;
  s.replace(/\|/g, ' ').trim().split(/\s+/).forEach(tok => {
    const [n, d] = tok.split('/'); const dur = +d;
    if (n !== '-') out.push([midi(n), t, dur]);
    t += dur;
  });
  return out;
}
const TRIAD = r => [r, r + 7, r + 12, r + 16];
const CACHE = {};
const song = k => { const s = SONGS[k] || SONGS.dash; if (!CACHE[k]) CACHE[k] = { notes: parse(s.lead), roots: s.chords.map(midi) }; return [s, CACHE[k]]; };

let hAC = null, hM = null, hNB = null, hOn = true, hKey = null;
try { hOn = localStorage.getItem('kiara_music') !== '0'; } catch (e) {}

function tone(t, m, dur, type, vol, dest, opt = {}) {
  const o = hAC.createOscillator(), g = hAC.createGain();
  o.type = type; o.frequency.value = hz(m);
  if (opt.detune) o.detune.value = opt.detune;
  const a = opt.attack || .015, rel = opt.pluck ? Math.min(dur, .35) : dur;
  g.gain.setValueAtTime(.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + a);
  g.gain.exponentialRampToValueAtTime(vol * (opt.pluck ? .08 : .4), t + rel * .9);
  g.gain.exponentialRampToValueAtTime(.0001, t + rel + (opt.tail || .15));
  o.connect(g); g.connect(dest); o.start(t); o.stop(t + rel + (opt.tail || .15) + .05);
  if (opt.bell) { /* lapisan oktaf lembut agar terdengar seperti lonceng */
    const o2 = hAC.createOscillator(), g2 = hAC.createGain();
    o2.type = 'sine'; o2.frequency.value = hz(m + 12);
    g2.gain.setValueAtTime(.0001, t); g2.gain.exponentialRampToValueAtTime(vol * .35, t + .01); g2.gain.exponentialRampToValueAtTime(.0001, t + .6);
    o2.connect(g2); g2.connect(dest); o2.start(t); o2.stop(t + .7);
  }
}
function noise(sec) { const b = hAC.createBuffer(1, Math.floor(hAC.sampleRate * sec), hAC.sampleRate), d = b.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; return b; }
function hat(t, dest, v = .03) {
  if (!hNB) hNB = noise(.06);
  const s = hAC.createBufferSource(), f = hAC.createBiquadFilter(), g = hAC.createGain();
  s.buffer = hNB; f.type = 'highpass'; f.frequency.value = 7500;
  g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.0001, t + .05);
  s.connect(f); f.connect(g); g.connect(dest); s.start(t);
}
function kick(t, dest) {
  const o = hAC.createOscillator(), g = hAC.createGain();
  o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(45, t + .12);
  g.gain.setValueAtTime(.35, t); g.gain.exponentialRampToValueAtTime(.0001, t + .18);
  o.connect(g); g.connect(dest); o.start(t); o.stop(t + .2);
}

function loop(M, start) {
  const [S, C] = song(M.key), spb = 60 / S.bpm, bw = S.bassWave || 'sine', bv = bw === 'sawtooth' ? .07 : .2;
  C.notes.forEach(n => tone(start + n[1] * spb, n[0], n[2] * spb * .95, S.wave, S.lv, M.lead, { pluck: S.pluck, bell: S.bell }));
  C.roots.forEach((r, b) => {
    const t0 = start + b * 4 * spb;
    if (S.bass === 'bounce') for (let i = 0; i < 4; i++) tone(t0 + i * spb, i % 2 ? r + 7 : r, spb * .45, bw, bv, M.bass);
    if (S.bass === 'pulse') for (let i = 0; i < 8; i++) tone(t0 + i * spb / 2, r + (i === 6 ? 12 : 0), spb * .4, bw, bv, M.bass, { pluck: true });
    if (S.bass === 'oompah') for (let i = 0; i < 4; i++) tone(t0 + i * spb, i % 2 ? r + 12 : r, spb * .5, bw, bv * (i % 2 ? .6 : 1), M.bass, { pluck: true });
    if (S.bass === 'whole') tone(t0, r, 4 * spb * .95, bw, bv * .9, M.bass, { attack: .3, tail: .6 });
    if (S.bass === 'root2') { tone(t0, r, 2 * spb * .8, bw, bv, M.bass); tone(t0 + 2 * spb, r + 7, 2 * spb * .8, bw, bv * .8, M.bass); }
    if (S.pad) TRIAD(r + 12).slice(1).forEach((m, i) => tone(t0, m, 4 * spb, 'sine', .035, M.pad, { attack: .6, tail: .8, detune: i * 4 }));
    for (let i = 0; i < 8; i++) {
      const t = t0 + i * spb / 2;
      if (S.hat === 'off8' && i % 2) hat(t, M.master);
      if (S.hat === 'eighth') hat(t, M.master, i % 2 ? .025 : .015);
      if (S.kick && i % 4 === 0) kick(t, M.master);
    }
  });
}

function hmStop() {
  if (!hM || !hAC) return;
  const M = hM; hM = null; clearInterval(M.timer);
  M.master.gain.setTargetAtTime(0, hAC.currentTime, .1);
  setTimeout(() => { try { M.master.disconnect(); if (M.rain) M.rain.stop(); } catch (e) {} }, 700);
}
function hmStart(key) {
  hKey = key;
  if (!hOn || !key) return;
  try {
    if (!hAC) hAC = new (window.AudioContext || window.webkitAudioContext)();
    if (hAC.state === 'suspended') hAC.resume();
    if (hM && hM.key === key) return;
    hmStop();
    const [S] = song(key);
    const master = hAC.createGain(), lead = hAC.createBiquadFilter(), bass = hAC.createGain(), pad = hAC.createGain();
    master.gain.value = .0001; master.connect(hAC.destination); master.gain.setTargetAtTime(.8, hAC.currentTime, .4);
    lead.type = 'lowpass'; lead.frequency.value = S.lp; lead.connect(master);
    bass.connect(master); pad.connect(master);
    if (S.delay) { /* gema lembut */
      const d = hAC.createDelay(1), fb = hAC.createGain(), wet = hAC.createGain();
      d.delayTime.value = S.delay; fb.gain.value = .3; wet.gain.value = .28;
      lead.connect(d); d.connect(fb); fb.connect(d); d.connect(wet); wet.connect(master);
    }
    const M = { key, master, lead, bass, pad, next: hAC.currentTime + .1, rain: null, timer: 0 };
    if (S.rain) {
      const r = hAC.createBufferSource(), f = hAC.createBiquadFilter(), g = hAC.createGain();
      r.buffer = noise(2); r.loop = true; f.type = 'bandpass'; f.frequency.value = 1100; f.Q.value = .6; g.gain.value = .05;
      r.connect(f); f.connect(g); g.connect(master); r.start(); M.rain = r;
    }
    hM = M;
    const len = 32 * 60 / S.bpm;
    const tick = () => { if (hAC.currentTime + 3 > M.next) { loop(M, M.next); M.next += len; } };
    tick(); M.timer = setInterval(tick, 500);
  } catch (e) {}
}
function hmTitle() { const s = SONGS[hKey]; return s ? s.title : ''; }
document.addEventListener('visibilitychange', () => { if (hAC) { if (document.hidden) hAC.suspend(); else if (hOn) hAC.resume(); } });
