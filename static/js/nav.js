/* ══════════════════════════════════════════
   nav.js — Nav scroll behaviour + tab title
   ══════════════════════════════════════════ */

/* Sticky nav */
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('sc', window.scrollY > 40);
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* Rotating tab title */
(function () {
  const titles = [
    'Mohan Singh — Python Developer',
    'Mohan Singh — Flask Backend Dev',
    'Mohan Singh — ML Enthusiast',
    'Mohan Singh — BCA Graduate 2025',
    'Mohan Singh — Open To Work 🟢',
  ];
  let i = 0;
  setInterval(() => {
    document.title = titles[i];
    i = (i + 1) % titles.length;
  }, 2000);
})();
