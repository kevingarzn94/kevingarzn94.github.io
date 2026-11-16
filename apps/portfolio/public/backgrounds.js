const bgEn = document.documentElement.lang === 'en';
// Fondos fotográficos, retrato y pasos del inicio. El movimiento sigue la preferencia del dispositivo.
const preference = matchMedia('(prefers-reduced-motion: reduce)');
const updates = [];
function applyMotion() {
 document.documentElement.dataset.motion = preference.matches ? 'off' : 'on';
 updates.forEach(update => update());
}
preference.addEventListener('change', applyMotion);
applyMotion();

// Only the first photo ships in the HTML; the rest load once the page is ready,
// the slideshow is on screen and motion is allowed (reduced motion shows the first photo only).
let pageLoaded = document.readyState === 'complete';
addEventListener('load', () => { pageLoaded = true; updates.forEach(update => update()); }, { once: true });
function hydrate(backdrop) {
 for (const image of backdrop.querySelectorAll('img[data-src]')) { image.src = image.dataset.src; image.removeAttribute('data-src'); }
}

// Pause the slideshow while it is off-screen, the tab is hidden or motion is reduced.
for (const backdrop of document.querySelectorAll('.photo-backdrop')) {
 const section = backdrop.closest('section');
 let visible = false;
 const update = () => {
  const paused = !visible || document.hidden || document.documentElement.dataset.motion === 'off';
  section.classList.toggle('background-paused', paused);
  if (!paused && pageLoaded) hydrate(backdrop);
 };
 updates.push(update);
 new IntersectionObserver(entries => { visible = entries[0].isIntersecting; update(); }).observe(section);
 document.addEventListener('visibilitychange', update);
 update();
}

const portrait = document.querySelector('.about-visual');
if (portrait) new IntersectionObserver(entries => portrait.classList.toggle('motion-away', !entries[0].isIntersecting)).observe(portrait);

const panel = document.querySelector('.start-panel');
if (panel) {
 panel.addEventListener('pointermove', event => {
  if (document.documentElement.dataset.motion === 'off') return;
  const bounds = panel.getBoundingClientRect();
  panel.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`);
  panel.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`);
 });
 panel.addEventListener('pointerleave', () => { panel.style.removeProperty('--spot-x'); panel.style.removeProperty('--spot-y'); });
}

const process = document.querySelector('[data-process]');
if (process) {
 const tabs = [...process.querySelectorAll('[role="tab"]')];
 const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
 const next = process.querySelector('[data-next]');
 const select = (index, focus) => {
  tabs.forEach((tab, i) => {
   const active = i === index;
   tab.setAttribute('aria-selected', String(active));
   tab.tabIndex = active ? 0 : -1;
   panels[i].hidden = !active;
  });
  process.style.setProperty('--step', index);
  process.dataset.last = String(index === tabs.length - 1);
  if (next) next.firstChild.textContent = index === tabs.length - 1 ? (bgEn ? 'Back to start ' : 'Volver al inicio ') : (bgEn ? 'Next step ' : 'Siguiente paso ');
  if (focus) tabs[index].focus();
 };
 const current = () => tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true');
 tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => select(i));
  tab.addEventListener('keydown', event => {
   const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
   let target = null;
   if (event.key in keys) target = (i + keys[event.key] + tabs.length) % tabs.length;
   if (event.key === 'Home') target = 0;
   if (event.key === 'End') target = tabs.length - 1;
   if (target === null) return;
   event.preventDefault();
   select(target, true);
  });
 });
 next?.addEventListener('click', () => select((current() + 1) % tabs.length));
 process.classList.add('is-ready');
 select(0);
}
