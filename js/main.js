// Matrix-style neon rain
const c=document.getElementById('rain'),x=c.getContext('2d');
let cols,drops;
function resize(){c.width=innerWidth;c.height=innerHeight;cols=Math.floor(c.width/16);drops=Array(cols).fill(0).map(()=>Math.random()*-50)}
resize();addEventListener('resize',resize);
const chars='アイウエオカキクケコ01ABCDEF<>/\\|{}$#@';
setInterval(()=>{
  x.fillStyle='rgba(7,0,15,.12)';x.fillRect(0,0,c.width,c.height);
  x.font='15px monospace';
  drops.forEach((y,i)=>{
    x.fillStyle=Math.random()<.08?'#ff2a6d':'#00f0ff';
    x.fillText(chars[Math.random()*chars.length|0],i*16,y*16);
    if(y*16>c.height&&Math.random()>.975)drops[i]=0;
    drops[i]++;
  });
},60);

// Typing effect
const lines=['> initializing neural link...','> bypassing corporate firewall...','> access granted. welcome, choom.'];
const t=document.getElementById('typing');let li=0,ci=0;
(function type(){
  const s=lines[li];
  if(ci<=s.length){t.textContent=s.slice(0,ci++);setTimeout(type,45)}
  else{setTimeout(()=>{li=(li+1)%lines.length;ci=0;type()},1400)}
})();

// Count-up stats
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;io.unobserve(e.target);
  const end=+e.target.dataset.count,st=performance.now();
  (function f(n){const p=Math.min((n-st)/1600,1);e.target.textContent=Math.floor(end*p).toLocaleString();if(p<1)requestAnimationFrame(f)})(st);
}),{threshold:.6});
document.querySelectorAll('[data-count]').forEach(el=>io.observe(el));

// Form
document.getElementById('form').addEventListener('submit',e=>{
  e.preventDefault();
  document.getElementById('msg').textContent='> TRANSMISSION RECEIVED. STAY IN THE SHADOWS.';
  e.target.reset();
});
