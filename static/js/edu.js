/* ══════════════════════════════════════════
   edu.js — Education floating books + particles
   ══════════════════════════════════════════ */
(function () {
  const c = document.getElementById('eduCanvas');
  if (!c) return;
  const ctx = c.getContext('2d');

  function rs() {
    c.width  = c.parentElement.offsetWidth;
    c.height = c.parentElement.offsetHeight;
  }
  rs();

  const COLORS = ['#00e5b0', '#0af', '#a29bfe', '#fd79a8', '#fdcb6e', '#00cec9'];
  let books = [];

  function createBooks() {
    books = Array.from({ length: 18 }, (_, i) => ({
      x:     Math.random() * c.width,
      y:     Math.random() * c.height,
      w:     18 + Math.random() * 14,
      h:     28 + Math.random() * 22,
      vx:    (Math.random() - .5) * .3,
      vy:    (Math.random() - .5) * .3,
      rot:   Math.random() * Math.PI * 2,
      vrot:  (Math.random() - .5) * .008,
      color: COLORS[i % COLORS.length],
      alpha: Math.random() * .18 + .06,
      open:  Math.random() > .5,
    }));
  }
  createBooks();

  window.addEventListener('resize', () => { rs(); createBooks(); }, { passive: true });

  function drawBook(b) {
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.rotate(b.rot);
    ctx.globalAlpha = b.alpha;

    if (b.open) {
      ctx.fillStyle = b.color;
      ctx.beginPath();
      ctx.moveTo(0, -b.h/2); ctx.lineTo(-b.w, -b.h/2);
      ctx.lineTo(-b.w, b.h/2); ctx.lineTo(0, b.h/2); ctx.closePath(); ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0, -b.h/2); ctx.lineTo(b.w, -b.h/2);
      ctx.lineTo(b.w, b.h/2); ctx.lineTo(0, b.h/2); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = b.color; ctx.lineWidth = 1.5;
      ctx.globalAlpha = b.alpha * 1.5;
      ctx.beginPath(); ctx.moveTo(0, -b.h/2); ctx.lineTo(0, b.h/2); ctx.stroke();
      ctx.globalAlpha = b.alpha * .6; ctx.lineWidth = .5;
      for (let l = 1; l < 4; l++) {
        const ly = -b.h/2 + (b.h / 4) * l;
        ctx.beginPath(); ctx.moveTo(-b.w + 4, ly); ctx.lineTo(-4, ly); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(4, ly); ctx.lineTo(b.w - 4, ly); ctx.stroke();
      }
    } else {
      ctx.fillStyle = b.color;
      ctx.fillRect(-b.w/2, -b.h/2, b.w, b.h);
      ctx.fillStyle = 'rgba(0,0,0,.15)';
      ctx.fillRect(-b.w/2, -b.h/2, 4, b.h);
      ctx.strokeStyle = b.color; ctx.lineWidth = .6;
      ctx.globalAlpha = b.alpha * .5;
      for (let l = 1; l < 3; l++) {
        const ly = -b.h/2 + (b.h / 3) * l;
        ctx.beginPath(); ctx.moveTo(-b.w/2 + 8, ly); ctx.lineTo(b.w/2 - 4, ly); ctx.stroke();
      }
    }
    ctx.restore();
  }

  (function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    books.forEach(b => {
      b.x += b.vx; b.y += b.vy; b.rot += b.vrot;
      if (b.x < -50)          { b.x = -50;          b.vx *= -1; }
      if (b.x > c.width + 50) { b.x = c.width + 50; b.vx *= -1; }
      if (b.y < -50)          { b.y = -50;           b.vy *= -1; }
      if (b.y > c.height + 50){ b.y = c.height + 50; b.vy *= -1; }
      drawBook(b);
    });
    requestAnimationFrame(draw);
  })();
})();
