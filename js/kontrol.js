/* Kontrol bersama di dalam tiap game:
   1. tombol musik di samping tombol kembali, mengatur musik yang diputar halaman utama
   2. tombol "Kembali ke beranda" di setiap kartu menu, jeda, dan hasil */
(function () {
  var home = function () { parent.postMessage('sa-back', '*'); };
  var ICON_ON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/></svg>';
  var ICON_OFF = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/><path d="M3 3l18 18"/></svg>';

  function musicButton() {
    var b = document.createElement('button');
    b.id = 'kmus'; b.type = 'button'; b.innerHTML = ICON_ON;
    b.setAttribute('aria-label', 'Musik nyala atau mati');
    b.addEventListener('pointerdown', function (e) { e.stopPropagation(); });
    b.addEventListener('click', function (e) { e.stopPropagation(); parent.postMessage({ sa: 'music-toggle' }, '*'); });
    document.body.appendChild(b);
    addEventListener('message', function (e) {
      if (e.source !== parent || !e.data || e.data.sa !== 'music-state') return;
      b.innerHTML = e.data.on ? ICON_ON : ICON_OFF;
      b.classList.toggle('off', !e.data.on);
      b.title = e.data.on ? 'Musik ' + e.data.title : 'Musik mati';
    });
    parent.postMessage({ sa: 'music-ask' }, '*');
  }

  function homeButtons() {
    var card = document.getElementById('card');
    if (!card) return;
    var add = function () {
      if (!card.firstChild || card.querySelector('.khome')) return;
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'khome'; b.textContent = 'Kembali ke beranda';
      b.addEventListener('click', home);
      card.appendChild(b);
    };
    new MutationObserver(add).observe(card, { childList: true });
    add();
  }

  /* beri tahu halaman utama setiap ada sentuhan, supaya audio di HP tetap menyala */
  ['pointerdown', 'touchend'].forEach(function (ev) {
    addEventListener(ev, function () { parent.postMessage({ sa: 'tap' }, '*'); }, { capture: true, passive: true });
  });

  function start() { musicButton(); homeButtons(); }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
