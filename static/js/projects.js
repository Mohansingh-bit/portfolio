/* ══════════════════════════════════════════
   projects.js — Project card animations
   ══════════════════════════════════════════ */
(function () {

  function setup(id, fn, color) {
    const c = document.getElementById(id);
    if (!c) return;
    const ctx = c.getContext('2d');
    function rs() { c.width = c.offsetWidth || 400; c.height = c.offsetHeight || 300; }
    rs(); window.addEventListener('resize', rs, { passive: true });
    let t = 0;
    (function loop() {
      ctx.clearRect(0, 0, c.width, c.height);
      fn(ctx, c.width, c.height, color, t);
      t += .013; requestAnimationFrame(loop);
    })();
  }

  /* Also works for class-based canvases */
  document.querySelectorAll('.pcard-canvas').forEach(c => {
    const color = c.dataset.color || '#00e5b0';
    const id    = parseInt(c.dataset.id);
    const ctx   = c.getContext('2d');
    function rs() { c.width = c.offsetWidth || 400; c.height = c.offsetHeight || 300; }
    rs(); window.addEventListener('resize', rs, { passive: true });
   const fns = { 1: drawLock, 2: drawSnake, 3: drawAPI, 4: drawChart, 5: drawCafe };    const fn = fns[id] || drawChart;
    let t = 0;
    (function loop() {
      ctx.clearRect(0, 0, c.width, c.height);
      fn(ctx, c.width, c.height, color, t);
      t += .013; requestAnimationFrame(loop);
    })();
  });

  /* 1 — Lock animation */
  function drawLock(ctx, w, h, col, t) {
    const cx = w / 2, cy = h / 2;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * .45);
    g.addColorStop(0, col + '1a'); g.addColorStop(1, 'transparent');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = col + '99'; ctx.lineWidth = 2;
    ctx.strokeRect(cx - 32, cy - 8, 64, 50);
    ctx.beginPath(); ctx.arc(cx, cy - 8, 22, Math.PI, 0); ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy + 16, 8, 0, Math.PI * 2);
    ctx.strokeStyle = col + '55'; ctx.stroke();
    for (let i = 0; i < 8; i++) {
      const a = t * .7 + (i / 8) * Math.PI * 2;
      const r = 58 + Math.sin(t + i) * 9;
      ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 3, 0, Math.PI * 2);
      ctx.fillStyle = col + 'cc'; ctx.fill();
    }
  }

  /* 2 — Snake animation */
  function drawSnake(ctx, w, h, col, t) {
    const seg = 18, rows = Math.floor(h / seg), cols = Math.floor(w / seg);
    ctx.strokeStyle = 'rgba(108,92,231,.12)'; ctx.lineWidth = .5;
    for (let r = 0; r <= rows; r++) { ctx.beginPath(); ctx.moveTo(0, r * seg); ctx.lineTo(w, r * seg); ctx.stroke(); }
    for (let c = 0; c <= cols; c++) { ctx.beginPath(); ctx.moveTo(c * seg, 0); ctx.lineTo(c * seg, h); ctx.stroke(); }
    const len = 14;
    for (let s = len; s >= 0; s--) {
      const ta = t - s * .16;
      const sx = (cols / 2 + Math.sin(ta * .65) * (cols * .32)) * seg;
      const sy = (rows / 2 + Math.cos(ta * .48) * (rows * .32)) * seg;
      const al = s === 0 ? 1 : (len - s) / len * .75;
      ctx.fillStyle = col + Math.floor(al * 255).toString(16).padStart(2, '0');
      ctx.fillRect(sx, sy, seg - 2, seg - 2);
    }
    ctx.fillStyle = '#ff5f57';
    ctx.fillRect(Math.floor(cols * .7) * seg, Math.floor(rows * .38) * seg, seg - 2, seg - 2);
  }

/* 3 — REST API animation */
function drawAPI(ctx, w, h, col, t) {
  const cx = w / 2, cy = h / 2;

  // Background glow
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * .45);
  g.addColorStop(0, col + '18'); g.addColorStop(1, 'transparent');
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);

  // Endpoint boxes
  const endpoints = ['GET /all', 'POST /add', 'PATCH /price', 'DELETE /cafe', 'GET /random'];
  endpoints.forEach((ep, i) => {
    const y = cy - 80 + i * 36;
    const active = Math.floor(t * 1.5) % endpoints.length === i;
    const alpha = active ? 'ee' : '44';

    // Box
    ctx.fillStyle = col + (active ? '22' : '0a');
    ctx.strokeStyle = col + alpha;
    ctx.lineWidth = 1;
    ctx.fillRect(cx - 90, y - 12, 180, 26);
    ctx.strokeRect(cx - 90, y - 12, 180, 26);

    // Method color
    const method = ep.split(' ')[0];
    const methodColors = { GET: '#00e5b0', POST: '#0af', PATCH: '#fdcb6e', DELETE: '#fd79a8' };
    ctx.fillStyle = methodColors[method] || col;
    ctx.font = `bold 9px JetBrains Mono, monospace`;
    ctx.fillText(method, cx - 82, y + 5);

    // Route text
    ctx.fillStyle = active ? '#fff' : col + '88';
    ctx.font = `9px JetBrains Mono, monospace`;
    ctx.fillText(ep.split(' ')[1], cx - 52, y + 5);

    // Active indicator — animated dot
    if (active) {
      ctx.beginPath();
      ctx.arc(cx + 75, y + 1, 4, 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.fill();
    }
  });

  // Animated data packet moving right
  const px = (cx - 90) + ((t * 60) % 180);
  const activeY = cy - 80 + (Math.floor(t * 1.5) % endpoints.length) * 36;
  ctx.beginPath();
  ctx.arc(px, activeY + 1, 3, 0, Math.PI * 2);
  ctx.fillStyle = col + 'cc';
  ctx.fill();

  // JSON response label at bottom
  ctx.fillStyle = col + '66';
  ctx.font = '8px JetBrains Mono, monospace';
  ctx.fillText('{ "status": 200, "response": "ok" }', cx - 90, cy + 108);
}
  /* 4 — Bar chart / Data animation */
  function drawChart(ctx, w, h, col, t) {
    const data = [.4, .72, .55, .88, .62, .91, .5, .76, .85, .48];
    const bw = (w - 52) / (data.length * 2 - 1);
    const mh = h - 58;
    ctx.strokeStyle = 'rgba(253,203,110,.2)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(26, 18); ctx.lineTo(26, h - 28); ctx.lineTo(w - 26, h - 28); ctx.stroke();
    data.forEach((d, i) => {
      const ah = mh * d * Math.min(1, (t - i * .08) * .55); if (ah <= 0) return;
      const x = 26 + i * (bw * 2); const y = h - 28 - ah;
      const gr = ctx.createLinearGradient(0, y, 0, h - 28);
      gr.addColorStop(0, col + 'ee'); gr.addColorStop(1, col + '28');
      ctx.fillStyle = gr; ctx.fillRect(x, y, bw, ah);
    });
    ctx.beginPath();
    data.forEach((d, i) => {
      const x = 26 + i * bw * 2 + bw / 2; const y = h - 28 - mh * d;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.strokeStyle = col + 'bb'; ctx.lineWidth = 1.5; ctx.stroke();
    const di = Math.floor(((t * .4) % 1) * data.length);
    const hx = 26 + di * bw * 2 + bw / 2; const hy = h - 28 - mh * data[di];
    ctx.beginPath(); ctx.arc(hx, hy, 5, 0, Math.PI * 2); ctx.fillStyle = col; ctx.fill();
  }

})();



function drawCafe(ctx, w, h, col, t) {
  const cx = w/2, cy = h/2;
  // Background glow
  const g = ctx.createRadialGradient(cx,cy,0,cx,cy,w*.4);
  g.addColorStop(0, col+'22'); g.addColorStop(1,'transparent');
  ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
  // Cup body
  ctx.fillStyle = col+'cc';
  ctx.beginPath();
  ctx.moveTo(cx-30, cy-20);
  ctx.lineTo(cx-22, cy+28);
  ctx.lineTo(cx+22, cy+28);
  ctx.lineTo(cx+30, cy-20);
  ctx.closePath(); ctx.fill();
  // Cup handle
  ctx.strokeStyle = col+'cc'; ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(cx+34, cy+8, 14, -Math.PI*.6, Math.PI*.6);
  ctx.stroke();
  // Saucer
  ctx.fillStyle = col+'aa';
  ctx.beginPath();
  ctx.ellipse(cx, cy+32, 36, 7, 0, 0, Math.PI*2);
  ctx.fill();
  // Steam waves
  for(let i=0;i<3;i++){
    const sx = cx - 18 + i*18;
    const sy = cy - 28 + Math.sin(t*2+i*1.2)*6;
    ctx.strokeStyle = col+'66'; ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(sx, cy-20);
    ctx.bezierCurveTo(sx-8, sy-10, sx+8, sy-20, sx, sy-30);
    ctx.stroke();
  }
  // Wifi symbol above cup
  const wx = cx, wy = cy-65;
  for(let i=1;i<=3;i++){
    ctx.strokeStyle = col+Math.floor((i/3)*200+55).toString(16).padStart(2,'0');
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(wx, wy+i*10, i*10, Math.PI*1.2, Math.PI*1.8);
    ctx.stroke();
  }
  ctx.beginPath(); ctx.arc(wx, wy+32, 3, 0, Math.PI*2);
  ctx.fillStyle=col; ctx.fill();
}