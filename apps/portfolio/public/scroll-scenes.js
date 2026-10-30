// Shared scroll choreography. Native scrolling and reduced-motion remain intact.
(() => {
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const hero=document.querySelector('.hero-dark,.case-opening,.project-heading');
 const copy=hero?.querySelector('.hero-copy,.case-opening-copy')||hero;
 const frames=[...document.querySelectorAll('.project-image,.case-figure')];
 let pending=false;
 const enabled=()=>!reduce.matches&&document.documentElement.dataset.motion!=='off';
 function paint(){
  pending=false;
  if(hero&&copy){const b=hero.getBoundingClientRect();const p=Math.min(1,Math.max(0,-b.top/Math.max(1,b.height)));copy.style.setProperty('--scroll-y',enabled()?`${p*100}px`:'0px');copy.style.setProperty('--scroll-opacity',enabled()?String(1-p*.65):'1');}
  for(const frame of frames){const b=frame.getBoundingClientRect();if(b.bottom<0||b.top>innerHeight)continue;const p=Math.max(-1,Math.min(1,(b.top+b.height/2-innerHeight/2)/innerHeight));frame.style.setProperty('--frame-y',enabled()?`${p*28}px`:'0px');}
 }
 const queue=()=>{if(!pending){pending=true;requestAnimationFrame(paint)}};
 addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue);reduce.addEventListener('change',queue);new MutationObserver(queue).observe(document.documentElement,{attributes:true,attributeFilter:['data-motion']});
 copy?.classList.add('scroll-copy');frames.forEach(frame=>frame.classList.add('scroll-frame'));paint();
})();
