const preference=matchMedia('(prefers-reduced-motion: reduce)');
const toggles=document.querySelectorAll('.animation-switch');
let enabled=!preference.matches;
try{if(localStorage.getItem('portfolio-motion')==='off')enabled=false}catch{}
const animations=new Set(),updates=[];
function applyMotion(){
 document.documentElement.dataset.motion=enabled&&!preference.matches?'on':'off';
 for(const toggle of toggles){toggle.setAttribute('aria-checked',String(enabled&&!preference.matches));
 toggle.disabled=preference.matches;
 toggle.title=preference.matches?'Movimiento reducido activado en tu dispositivo':'Activar o desactivar todas las animaciones';
 }
 if(!enabled||preference.matches){for(const animation of animations)animation.cancel();animations.clear()}
 updates.forEach(update=>update());
}
toggles.forEach(toggle=>toggle.addEventListener('click',()=>{enabled=!enabled;try{localStorage.setItem('portfolio-motion',enabled?'on':'off')}catch{}applyMotion()}));
preference.addEventListener('change',()=>{enabled=!preference.matches;applyMotion()});
applyMotion();
for(const backdrop of document.querySelectorAll('.photo-backdrop')){
 const section=backdrop.closest('section');let visible=false;
 const update=()=>section.classList.toggle('background-paused',!visible||document.hidden||document.documentElement.dataset.motion==='off');
 updates.push(update);new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;update()}).observe(section);document.addEventListener('visibilitychange',update);update();
}
// Animate visible content without concealing anything if scripts fail.
const observer=new IntersectionObserver(entries=>{
 for(const entry of entries){if(!entry.isIntersecting)continue;observer.unobserve(entry.target);
 if(document.documentElement.dataset.motion==='off')continue;
 const animation=entry.target.animate([{opacity:.1,transform:'translateY(52px) scale(.985)'},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:1000,easing:'cubic-bezier(.16,1,.3,1)'});
 animations.add(animation);animation.onfinish=()=>animations.delete(animation);
 }
},{threshold:.08});
// Las páginas v2 tienen sus propias entradas (v2.js).
if(!document.body.classList.contains('v2'))for(const section of document.querySelectorAll('main>section:not(.hero), .working-note, .project-story'))observer.observe(section);
const portrait=document.querySelector('.about-visual');if(portrait)new IntersectionObserver(entries=>portrait.classList.toggle('motion-away',!entries[0].isIntersecting)).observe(portrait);
const panel=document.querySelector('.working-note');
if(panel){panel.addEventListener('pointermove',event=>{if(document.documentElement.dataset.motion==='off')return;const bounds=panel.getBoundingClientRect();panel.style.setProperty('--spot-x',`${event.clientX-bounds.left}px`);panel.style.setProperty('--spot-y',`${event.clientY-bounds.top}px`)});panel.addEventListener('pointerleave',()=>{panel.style.removeProperty('--spot-x');panel.style.removeProperty('--spot-y')})}
for(const item of document.querySelectorAll('.start-steps li')){
 const button=item.querySelector('button'),description=item.querySelector('p');
 const show=value=>{button.setAttribute('aria-expanded',String(value));description.hidden=!value};
 item.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')show(true)});
 item.addEventListener('pointerleave',()=>{if(!item.contains(document.activeElement))show(false)});
 button.addEventListener('click',()=>show(button.getAttribute('aria-expanded')!=='true'));
 button.addEventListener('keydown',event=>{if(event.key==='Escape')show(false)});
 item.addEventListener('focusout',event=>{if(!item.contains(event.relatedTarget))show(false)});
 button.addEventListener('focus',()=>{if(button.matches(':focus-visible'))show(true)});
}
