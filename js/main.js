// Round intro (click to skip)
const intro=document.getElementById('intro');
const endIntro=()=>{intro.classList.add('done');flash()};
setTimeout(endIntro,2300);intro.addEventListener('click',endIntro);

// Screen flash
const fl=document.getElementById('flash');
function flash(){fl.classList.remove('go');void fl.offsetWidth;fl.classList.add('go')}
setInterval(()=>{if(Math.random()<.5)flash()},7000);

// Nav
const nav=document.getElementById('nav'),menu=document.getElementById('menu'),burger=document.getElementById('burger');
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>10),{passive:true});
burger.addEventListener('click',()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
menu.addEventListener('click',e=>{if(e.target.closest('a'))menu.classList.remove('open')});

// Round timer
const timer=document.getElementById('timer');let t=99;
setInterval(()=>{t=t<=0?99:t-1;timer.textContent=String(t).padStart(2,'0')},1000);

// Reveal on scroll
document.querySelectorAll('.card,.sec-head,.stats div,.form').forEach(el=>el.classList.add('reveal'));
const rv=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rv.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>rv.observe(el));

// Count-up
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;io.unobserve(e.target);
  const end=+e.target.dataset.count,st=performance.now();
  (function f(n){const p=Math.min((n-st)/1500,1);e.target.textContent=Math.floor(end*p).toLocaleString();if(p<1)requestAnimationFrame(f)})(st);
}),{threshold:.6});
document.querySelectorAll('[data-count]').forEach(el=>io.observe(el));

// Hit sparks + screen shake on buttons
addEventListener('pointerdown',e=>{
  const s=document.createElement('div');s.className='spark';s.style.left=e.clientX+'px';s.style.top=e.clientY+'px';
  for(let i=0;i<10;i++){const b=document.createElement('i');b.style.setProperty('--a',(i*36+Math.random()*20)+'deg');s.appendChild(b)}
  document.body.appendChild(s);setTimeout(()=>s.remove(),500);
  if(e.target.closest('.btn')){document.body.classList.remove('shake');void document.body.offsetWidth;document.body.classList.add('shake')}
});

// Embers
const c=document.getElementById('embers'),x=c.getContext('2d');let ps=[];
function size(){c.width=innerWidth;c.height=innerHeight}size();addEventListener('resize',size);
const mk=()=>({x:Math.random()*c.width,y:c.height+10,r:Math.random()*2.2+.6,v:Math.random()*1.2+.4,d:Math.random()*2-1,a:Math.random()*.6+.3});
for(let i=0;i<70;i++){const p=mk();p.y=Math.random()*c.height;ps.push(p)}
if(!matchMedia('(prefers-reduced-motion: reduce)').matches)(function loop(){
  x.clearRect(0,0,c.width,c.height);
  for(const p of ps){p.y-=p.v;p.x+=p.d*.4+Math.sin(p.y/40)*.3;p.a-=.0015;
    if(p.y<-10||p.a<=0)Object.assign(p,mk());
    x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fillStyle=`rgba(255,${120+p.r*40|0},30,${p.a})`;x.shadowColor='#e10600';x.shadowBlur=8;x.fill()}
  requestAnimationFrame(loop)
})();

// Form
const form=document.getElementById('form'),msg=document.getElementById('msg');
form.addEventListener('submit',e=>{
  e.preventDefault();
  if(!form.checkValidity()){msg.style.color='#ff5a4d';msg.textContent='Enter your fighter name and a valid email.';return}
  msg.style.color='';msg.textContent='Registered! Prepare for battle — we will reply within one business day.';
  form.reset();
});
