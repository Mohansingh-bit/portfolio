/* ══════════════════════════════════════════
   scroll.js — Scroll reveal + skill bars
   ══════════════════════════════════════════ */

/* Scroll Reveal */
(function () {
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('on', 'visible'), i * 85);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: .07 });

  document.querySelectorAll('.rv, .reveal').forEach(el => obs.observe(el));
})();

/* Skill Bars */
(function () {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-item, .sk-item').forEach((item, i) => {
          setTimeout(() => item.classList.add('active', 'act'), i * 120);
        });
        obs.unobserve(e.target);
      }
    });
  }, { threshold: .2 });

  document.querySelectorAll('.skills-bars, .sk-bars').forEach(el => obs.observe(el));
})();
