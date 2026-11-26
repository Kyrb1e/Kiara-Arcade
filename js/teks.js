/* Merapikan teks yang tampil di game: tanda titik dua diganti spasi.
   Berlaku untuk teks di halaman dan teks yang digambar di kanvas. */
(function () {
  var fix = function (t) { return typeof t === 'string' && t.indexOf(':') > -1 ? t.replace(/(\S):\s+/g, '$1 ') : t; };
  var C = window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype;
  if (C) ['fillText', 'strokeText', 'measureText'].forEach(function (n) {
    var o = C[n];
    C[n] = function (t) { var a = [].slice.call(arguments); a[0] = fix(t); return o.apply(this, a); };
  });
  var SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1 };
  function walk(n) {
    if (n.nodeType === 3) { var v = fix(n.nodeValue); if (v !== n.nodeValue) n.nodeValue = v; return; }
    if (n.nodeType !== 1 || SKIP[n.nodeName]) return;
    for (var c = n.firstChild; c; c = c.nextSibling) walk(c);
  }
  function start() {
    walk(document.body);
    new MutationObserver(function (ms) {
      ms.forEach(function (m) {
        if (m.type === 'characterData') walk(m.target);
        else m.addedNodes.forEach(walk);
      });
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
