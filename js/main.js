// Sticky nav border + mobile menu
const nav=document.getElementById('nav'),menu=document.getElementById('menu'),burger=document.getElementById('burger');
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>10),{passive:true});
burger.addEventListener('click',()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
menu.addEventListener('click',e=>{if(e.target.tagName==='A')menu.classList.remove('open')});

// Reveal on scroll
document.querySelectorAll('.card,.sec-head,.stats div,.form').forEach(el=>el.classList.add('reveal'));
const rv=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rv.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>rv.observe(el));

// Count-up stats
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;io.unobserve(e.target);
  const end=+e.target.dataset.count,st=performance.now();
  (function f(n){const p=Math.min((n-st)/1400,1);e.target.textContent=Math.floor(end*p).toLocaleString();if(p<1)requestAnimationFrame(f)})(st);
}),{threshold:.6});
document.querySelectorAll('[data-count]').forEach(el=>io.observe(el));

// Contact form
const form=document.getElementById('form'),msg=document.getElementById('msg');
form.addEventListener('submit',e=>{
  e.preventDefault();
  if(!form.checkValidity()){msg.style.color='#ff3d8b';msg.textContent='Please enter your name and a valid email.';return}
  msg.style.color='';msg.textContent='Thanks — your request has been received. We will reply within one business day.';
  form.reset();
});
