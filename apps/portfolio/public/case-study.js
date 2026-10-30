const chapters=[...document.querySelectorAll('[data-chapter]')];
const links=[...document.querySelectorAll('.chapter-nav a')];
const progress=document.querySelector('.chapter-nav');
let queued=false;
function renderProgress(){
 queued=false;
 if(!chapters.length||!progress)return;
 let current=chapters[0];
 for(const section of chapters)if(section.getBoundingClientRect().top<innerHeight*.42)current=section;
 for(const link of links){if(link.hash==='#'+current.id)link.setAttribute('aria-current','step');else link.removeAttribute('aria-current')}
 const story=document.querySelector('.case-story');
 if(story){const bounds=story.getBoundingClientRect();const total=Math.max(1,story.offsetHeight-innerHeight+100);progress.style.setProperty('--progress',Math.min(100,Math.max(0,(-bounds.top+100)/total*100))+'%')}
 const hero=document.querySelector('.case-opening-bg');
 if(hero)hero.style.transform=document.documentElement.dataset.motion!=='off'&&!matchMedia('(prefers-reduced-motion: reduce)').matches?`translateY(${Math.min(90,scrollY*.15)}px) scale(1.12)`:'none';
}
addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(renderProgress)}},{passive:true});addEventListener('resize',renderProgress);new MutationObserver(renderProgress).observe(document.documentElement,{attributes:true,attributeFilter:['data-motion']});renderProgress();
const tabs=[...document.querySelectorAll('[role=tab]')];
function select(tab){for(const item of tabs){const active=item===tab;item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;document.getElementById(item.getAttribute('aria-controls')).hidden=!active}}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>select(tab));tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(i+1)%tabs.length;if(event.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;if(next!==undefined){event.preventDefault();select(tabs[next]);tabs[next].focus()}})});
const entrances=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;entrances.unobserve(entry.target);if(document.documentElement.dataset.motion==='off'||matchMedia('(prefers-reduced-motion: reduce)').matches)continue;const animation=entry.target.animate([{opacity:.1,transform:'translateY(75px) scale(.96)' },{opacity:1,transform:'translateY(0) scale(1)'}],{duration:1100,easing:'cubic-bezier(.16,1,.3,1)'});const cancel=new MutationObserver(()=>{if(document.documentElement.dataset.motion==='off'){animation.cancel();cancel.disconnect()}});cancel.observe(document.documentElement,{attributes:true,attributeFilter:['data-motion']});animation.onfinish=()=>cancel.disconnect()}} ,{threshold:.08});
for(const element of document.querySelectorAll('.chapter-heading,.case-split,.case-figure,.identity-stage,.web-tabs,.browser-frame,.launch-film,.wedding-gallery,.wedding-cinema,.wedding-credits,.project-story h2'))entrances.observe(element);

// Native scrolling controls a sticky archive; navigation is never intercepted.
const journeySteps=[...document.querySelectorAll('[data-journey-step]')];
const journeyFrames=[...document.querySelectorAll('[data-journey-frame]')];
let journeyQueued=false;
function updateJourney(){
 journeyQueued=false;
 if(!journeySteps.length)return;
 let active=0;
 const threshold=innerWidth<701?innerHeight*.78:innerHeight*.58;
 journeySteps.forEach((step,i)=>{if(step.getBoundingClientRect().top<threshold)active=i});
 journeyFrames.forEach((frame,i)=>{const visible=i===active;frame.classList.toggle('is-active',visible);frame.setAttribute('aria-hidden',String(!visible));frame.querySelector('a').tabIndex=visible?0:-1});
}
addEventListener('scroll',()=>{if(!journeyQueued){journeyQueued=true;requestAnimationFrame(updateJourney)}},{passive:true});
addEventListener('resize',updateJourney);updateJourney();
