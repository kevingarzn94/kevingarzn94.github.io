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

const panel = document.querySelector('.working-note');
if (panel) {
 panel.addEventListener('pointermove', event => {
  if (document.documentElement.dataset.motion === 'off') return;
  const bounds = panel.getBoundingClientRect();
  panel.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`);
  panel.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`);
 });
 panel.addEventListener('pointerleave', () => { panel.style.removeProperty('--spot-x'); panel.style.removeProperty('--spot-y'); });
}

for (const item of document.querySelectorAll('.start-steps li')) {
 const button = item.querySelector('button'), description = item.querySelector('p');
 const show = value => { button.setAttribute('aria-expanded', String(value)); description.hidden = !value; };
 button.addEventListener('click', () => show(button.getAttribute('aria-expanded') !== 'true'));
 button.addEventListener('keydown', event => { if (event.key === 'Escape') show(false); });
}
