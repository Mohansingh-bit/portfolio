/* ══════════════════════════════════════════
   loader.js — Page loader animation
   ══════════════════════════════════════════ */

/* Show loader lines one by one */
(function () {
  const lines = document.querySelectorAll('.lc');
  lines.forEach((line, i) => {
    setTimeout(() => {
      line.style.opacity    = '1';
      line.style.transform  = 'translateX(0)';
    }, 300 + i * 300);
  });
})();

/* Hide loader after animations done */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('out');
  }, 2200);
});