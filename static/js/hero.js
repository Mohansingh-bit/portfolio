/* hero.js — Canvas + Typing */

/* ── Canvas ── */
(function(){
  const c = document.getElementById('heroCanvas');
  if(!c) return;
  const ctx = c.getContext('2d');
  let t=0, mx=.5, my=.5;

  function rs(){ c.width=window.innerWidth; c.height=window.innerHeight; }
  rs(); window.addEventListener('resize',rs,{passive:true});

  const pts = Array.from({length:55},()=>({
    x:Math.random(), y:Math.random(),
    vx:(Math.random()-.5)*.0004, vy:(Math.random()-.5)*.0004,
    r:Math.random()*1.4+.4, a:Math.random()*.4+.08
  }));

  const grid=[];
  for(let gx=0;gx<=14;gx++) for(let gy=0;gy<=9;gy++) grid.push({gx,gy});

  document.addEventListener('mousemove',e=>{ mx=e.clientX/innerWidth; my=e.clientY/innerHeight; });

  function draw(){
    ctx.clearRect(0,0,c.width,c.height);

    /* blobs */
    [{x:.2+mx*.1,y:.3+my*.1,r:.35,col:'#00e5b0'},
     {x:.8-mx*.08,y:.7-my*.08,r:.28,col:'#0af'},
     {x:.5,y:.5,r:.18,col:'#00e5b0'}].forEach(b=>{
      const bx=b.x*c.width,by=b.y*c.height,br=b.r*Math.min(c.width,c.height);
      const g=ctx.createRadialGradient(bx,by,0,bx,by,br);
      g.addColorStop(0,b.col+'14'); g.addColorStop(1,'transparent');
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(bx,by,br,0,Math.PI*2); ctx.fill();
    });

    /* grid dots */
    grid.forEach(({gx,gy})=>{
      const x=(gx/14)*c.width, y=(gy/9)*c.height;
      const a=Math.max(.025,.18-Math.hypot(x/c.width-mx,y/c.height-my)*.22);
      ctx.beginPath(); ctx.arc(x,y,1,0,Math.PI*2);
      ctx.fillStyle=`rgba(0,229,176,${a})`; ctx.fill();
    });

    /* particles */
    pts.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>1) p.vx*=-1;
      if(p.y<0||p.y>1) p.vy*=-1;
      ctx.beginPath(); ctx.arc(p.x*c.width,p.y*c.height,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(0,229,176,${p.a})`; ctx.fill();
    });

    /* scan line */
    const sy=((t*.28)%1)*c.height;
    const sg=ctx.createLinearGradient(0,sy-36,0,sy+36);
    sg.addColorStop(0,'transparent'); sg.addColorStop(.5,'rgba(0,229,176,.04)'); sg.addColorStop(1,'transparent');
    ctx.fillStyle=sg; ctx.fillRect(0,sy-36,c.width,72);

    t+=.007; requestAnimationFrame(draw);
  }
  draw();
})();

/* ── Typing ── */
(function(){
  const el = document.getElementById('heroTyping');
  if(!el) return;
  const roles=['Python Developer','Flask Backend Dev','ML Enthusiast','Problem Solver','BCA Graduate 2025'];
  let ri=0,ci=0,del=false;
  function tick(){
    const w=roles[ri];
    if(!del){ el.textContent=w.slice(0,ci+1); ci++;
      if(ci===w.length){setTimeout(()=>{del=true;tick();},2000);return;}
    }else{ el.textContent=w.slice(0,ci-1); ci--;
      if(ci===0){del=false;ri=(ri+1)%roles.length;}
    }
    setTimeout(tick,del?45:90);
  }
  tick();
})();