const VERSI = '202611261515'; /* naikkan angka ini setiap ada perubahan supaya browser memuat file terbaru */
/* Halaman utama Kiara Arcade: lobi, kartu cerita dari Pijar, dan pemutar game.
   Tiap game ada di folder games/ dan dibuka di dalam iframe. Ilustrasi ada di art.js. */

/* cerita singkat diceritakan oleh Pijar; c1 dan c2 = warna kotak game */
const GAMES = [
  { key:'dash',  name:'Kiara Dash',  ctrl:'Ketuk layar',    goal:'Nyalakan PJU',   c1:'#ffc46b', c2:'#ff7a3d',
    say:'Lampu di jalan dusun banyak yang padam! Bantu Mang Teten lari sambil menyambar panel surya, ya.' },
  { key:'drive', name:'Kiara Drive', ctrl:'Kiri dan kanan', goal:'Kejar cahaya',   c1:'#9b7bff', c2:'#4a2fd1',
    say:'Malam ini gelap sekali. Temani Mang Teten menyetir dan kejar cahaya PJU sebelum baterai habis!' },
  { key:'stack', name:'Kiara Stack', ctrl:'Ketuk layar',    goal:'Tiang lurus',    c1:'#7fe0ff', c2:'#2f8fe8',
    say:'Dusun butuh tiang PJU baru. Susun tiangnya lurus-lurus, lalu pasang panel surya di puncak!' },
  { key:'grid',  name:'Kiara Beam',  ctrl:'Ketuk cermin',   goal:'Sinar ke panel', c1:'#5ee6c8', c2:'#169e9a',
    say:'Sinar matahari terhalang pohon. Putar cermin supaya sinarnya sampai ke panel surya!' },
  { key:'tilt',  name:'Kiara Tilt',  ctrl:'Ketuk layar',    goal:'Energi 90%',     c1:'#ffa3c7', c2:'#e4508f',
    say:'Matahari bergeser tiap bulan. Kunci sudut panel yang pas supaya energinya penuh!' },
  { key:'sci',   name:'Kiara Lab',   ctrl:'Pilih bab',      goal:'Jawab kuis',     c1:'#c59bff', c2:'#7a3fe0',
    say:'Mau tahu cara kerja PJU surya? Yuk coba simulasinya di lab bareng aku!' }
];
const BY_KEY = Object.fromEntries(GAMES.map(g => [g.key, g]));
const $ = id => document.getElementById(id);

/* ---------- Lobi ---------- */
$('tiles').innerHTML = GAMES.map((g, i) => `
  <button class="tile" type="button" data-g="${g.key}" aria-label="${g.name}" style="--c1:${g.c1};--c2:${g.c2};--i:${i}">
    <span class="num" aria-hidden="true">${i + 1}</span>
    <span class="art">${art(g.key)}</span>
    <span class="plate">${g.name.replace('Kiara ', '')}</span>
  </button>`).join('');

/* ---------- Kartu cerita ---------- */
const intro = $('intro');
let pending = null;

function showIntro(k) {
  const g = BY_KEY[k];
  pending = k;
  $('in-t').textContent = g.name;
  const a = $('in-i');
  a.innerHTML = art(k);
  a.style.setProperty('--c1', g.c1);
  a.style.setProperty('--c2', g.c2);
  $('in-s').textContent = g.say;
  $('in-k').textContent = g.ctrl;
  $('in-g').textContent = g.goal;
  intro.classList.remove('hide');
  intro.scrollTop = 0;
  document.documentElement.style.overflow = 'hidden';
  $('in-go').focus();
}
function hideIntro() {
  intro.classList.add('hide');
  pending = null;
  document.documentElement.style.overflow = '';
}

document.querySelectorAll('.tile').forEach(b => b.addEventListener('click', () => showIntro(b.dataset.g)));
$('in-go').addEventListener('click', () => { const k = pending; hideIntro(); openGame(k); });
$('in-x').addEventListener('click', hideIntro);
intro.addEventListener('click', e => { if (e.target === intro) hideIntro(); });
addEventListener('keydown', e => { if (e.key === 'Escape' && !intro.classList.contains('hide')) hideIntro(); });

/* ---------- Pemutar game ---------- */
const play = $('play');
let frame = null, lastKey = null;

function openGame(k) {
  closeGame();
  lastKey = k;
  frame = document.createElement('iframe');
  frame.title = BY_KEY[k].name;
  frame.setAttribute('allow', 'autoplay');
  frame.src = `games/${k}.html?v=${VERSI}`;
  play.insertBefore(frame, play.firstChild);
  play.classList.remove('hide');
  hmStart(k);
  document.documentElement.style.overflow = 'hidden';
  try { history.pushState({ g: k }, ''); } catch (e) {}
  frame.addEventListener('load', () => { try { frame.contentWindow.focus(); } catch (e) {} });
}
function closeGame() {
  hmStop();
  hKey = null; /* di lobi tidak ada musik, jadi sentuhan di lobi tidak menyalakannya lagi */
  if (frame) { frame.remove(); frame = null; }
  play.classList.add('hide');
  document.documentElement.style.overflow = '';
  if (lastKey) {
    const b = document.querySelector(`.tile[data-g="${lastKey}"]`);
    if (b) b.focus({ preventScroll: true });
  }
}

/* kirim status musik ke tombol musik di dalam game */
const tellMusic = () => { if (frame) frame.contentWindow.postMessage({ sa: 'music-state', on: hOn, title: hmTitle() }, '*'); };

/* pesan dari dalam game: tombol kembali, tombol musik, dan ganti level */
addEventListener('message', e => {
  if (!frame || e.source !== frame.contentWindow) return;
  const d = e.data;
  if (d === 'sa-back') {
    if (history.state && history.state.g) history.back(); else closeGame();
  } else if (d && d.sa === 'tap') {
    /* sentuhan di dalam game ikut membangunkan audio */
    hUnlock();
  } else if (d && d.sa === 'music-ask') {
    tellMusic();
  } else if (d && d.sa === 'music-toggle') {
    hOn = !hOn;
    try { localStorage.setItem('kiara_music', hOn ? '1' : '0'); } catch (err) {}
    if (hOn) { hUnlock(); hmStart(hKey); } else hmStop();
    tellMusic();
  } else if (d && d.sa === 'music-set') {
    /* tombol Suara bawaan game ikut mengatur musik */
    hOn = !!d.on;
    try { localStorage.setItem('kiara_music', hOn ? '1' : '0'); } catch (err) {}
    if (hOn) { hUnlock(); hmStart(hKey || lastKey); } else hmStop();
    tellMusic();
  } else if (d && d.sa === 'music') {
    /* Kiara Stack memberi tahu level yang dipilih: siang, malam, atau hujan */
    hmStart(lastKey === 'stack' ? 'stack-' + d.key : d.key);
    tellMusic();
  }
});
addEventListener('popstate', closeGame);

/* ---------- Lobi selalu muat satu layar di laptop ----------
   Ukuran kotak game dihitung ulang sampai judul dan tulisan kelompok terlihat tanpa digulir,
   apa pun zoom browser atau skala layar Windows. */
function fitLobby() {
  const hub = $('hub'), hero = document.querySelector('.hero'), top = document.querySelector('.topbar'), foot = document.querySelector('.foot');
  if (innerWidth < 760) { hub.style.removeProperty('--tw'); return; }
  let tw = Math.min(270, (innerHeight * .35 - 62) * .95);
  const over = () => foot.getBoundingClientRect().bottom > innerHeight - 8 || hero.getBoundingClientRect().top < top.getBoundingClientRect().bottom + 6;
  hub.style.setProperty('--tw', tw + 'px');
  for (let i = 0; i < 80 && over() && tw > 100; i++) { tw -= 4; hub.style.setProperty('--tw', tw + 'px'); }
}
addEventListener('resize', fitLobby);
addEventListener('load', fitLobby);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitLobby);
fitLobby();
