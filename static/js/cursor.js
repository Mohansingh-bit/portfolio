/* ══════════════════════════════════════════
   cursor.js — Custom cursor
   ══════════════════════════════════════════ */
(function () {
  const cur  = document.getElementById('cursor');
  const curR = document.getElementById('cursorRing');
  if (!cur) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
  });

  (function trailLoop() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    curR.style.left = rx + 'px';
    curR.style.top  = ry + 'px';
    requestAnimationFrame(trailLoop);
  })();
})();
