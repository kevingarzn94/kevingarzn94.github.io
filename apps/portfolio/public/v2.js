// Sistema v2: coreografía ligada al scroll nativo (Ahead, Wedding Art, portada).
// Content stays visible without JS; motion respects prefers-reduced-motion and the global switch.
(() => {
 const root = document.documentElement;
 const reduce = matchMedia('(prefers-reduced-motion: reduce)');
 const motion = () => !reduce.matches && root.dataset.motion !== 'off';
 const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
 root.classList.add('av-js');

 const hero = document.querySelector('.av-hero');
 const fan = document.querySelector('[data-fan]');
 const story = document.querySelector('.av-story');
 const index = document.querySelector('.av-index');
 const percent = index?.querySelector('.av-percent');
 const links = [...(index?.querySelectorAll('a') || [])];
 const acts = [...document.querySelectorAll('[data-act]')];
 const scrubs = [...document.querySelectorAll('[data-scrub]')];
 const pin = document.querySelector('[data-pin]');
 const contact = document.querySelector('#contacto');
 const steps = [...document.querySelectorAll('[data-journey-step]')];
 const frames = [...document.querySelectorAll('[data-journey-frame]')];

 // Entrances: toggled once per element, never hide content when motion is off.
 const reveals = [...document.querySelectorAll('[data-reveal]')];
 const showAll = () => reveals.forEach(el => el.classList.add('is-in'));
 const io = new IntersectionObserver(entries => {
  for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
 }, { threshold: 0, rootMargin: '0px 0px -6% 0px' });
 reveals.forEach(el => { if (el.getBoundingClientRect().top < innerHeight * .9) el.classList.add('is-in'); else io.observe(el); });
 // Respaldo: si el observador se salta algo (scroll rápido, imágenes que cambian la altura), revelar lo que ya pasó por pantalla.
 let sweep = 0;
 const sweepReveal = () => { sweep = 0; for (const el of reveals) if (!el.classList.contains('is-in') && el.getBoundingClientRect().top < innerHeight * .94) { el.classList.add('is-in'); io.unobserve(el); } };
 addEventListener('scroll', () => { if (!sweep) sweep = setTimeout(sweepReveal, 160); }, { passive: true });
 addEventListener('load', sweepReveal);

 let queued = false;
 function paint() {
  queued = false;
  const on = motion();
  const vh = innerHeight;

  // Hero fan opens as the hero leaves the viewport.
  if (hero && fan) {
   const b = hero.getBoundingClientRect();
   const p = clamp(-b.top / Math.max(1, b.height * .6));
   fan.style.setProperty('--s', on ? (.38 + p * .62).toFixed(3) : '.62');
  }

  // Progress per element: 0 when entering from below, 1 when its center reaches mid-screen.
  for (const el of scrubs) {
   const b = el.getBoundingClientRect();
   if (b.bottom < -vh || b.top > vh * 2) continue;
   const p = clamp((vh - b.top) / (vh * .5 + b.height * .5));
   el.style.setProperty('--p', on ? p.toFixed(3) : '1');
  }

  // Pinned identity reveal.
  if (pin) {
   const b = pin.getBoundingClientRect();
   const p = clamp(-b.top / Math.max(1, b.height - vh));
   pin.style.setProperty('--p', on ? p.toFixed(3) : '1');
  }

  // Act index and reading progress.
  if (index && story) {
   const sb = story.getBoundingClientRect();
   const total = Math.max(1, sb.height - vh);
   const prog = clamp(-sb.top / total);
   index.style.setProperty('--progress', (prog * 100).toFixed(1) + '%');
   if (percent) percent.textContent = String(Math.round(prog * 100)).padStart(2, '0') + '%';
   let current = null;
   for (const act of acts) if (act.getBoundingClientRect().top < vh * .45) current = act;
   for (const link of links) {
    if (current && link.hash === '#' + current.id) link.setAttribute('aria-current', 'step');
    else link.removeAttribute('aria-current');
   }
   const heroGone = hero ? hero.getBoundingClientRect().bottom < vh * .5 : true;
   const beforeEnd = contact ? contact.getBoundingClientRect().top > vh * .6 : true;
   index.classList.toggle('is-visible', heroGone && beforeEnd);
  }

  // Sticky Figma archive follows the step being read.
  if (steps.length) {
   let active = 0;
   const threshold = innerWidth < 760 ? vh * .8 : vh * .58;
   steps.forEach((step, i) => { if (step.getBoundingClientRect().top < threshold) active = i; });
   frames.forEach((frame, i) => { const on = i === active; frame.classList.toggle('is-active', on); frame.setAttribute('aria-hidden', String(!on)); });
   steps.forEach((step, i) => step.classList.toggle('is-active', i === active));
  }
 }
 const queue = () => { if (!queued) { queued = true; requestAnimationFrame(paint); } };
 addEventListener('scroll', queue, { passive: true });
 addEventListener('resize', queue);
 reduce.addEventListener('change', () => { if (!motion()) showAll(); queue(); });
 new MutationObserver(() => { if (!motion()) showAll(); queue(); }).observe(root, { attributes: true, attributeFilter: ['data-motion'] });
 if (!motion()) showAll();
 paint();

 // Accessible tabs (arrow keys, Home, End).
 const tabs = [...document.querySelectorAll('.av-tabs [role=tab]')];
 function select(tab) {
  for (const item of tabs) {
   const active = item === tab;
   item.setAttribute('aria-selected', String(active));
   item.tabIndex = active ? 0 : -1;
   document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
  }
 }
 tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => select(tab));
  tab.addEventListener('keydown', event => {
   const keys = { ArrowRight: (i + 1) % tabs.length, ArrowLeft: (i + tabs.length - 1) % tabs.length, Home: 0, End: tabs.length - 1 };
   if (event.key in keys) { event.preventDefault(); select(tabs[keys[event.key]]); tabs[keys[event.key]].focus(); }
  });
 });

 // Fan cards respond to the pointer with a gentle tilt.
 if (fan) {
  fan.addEventListener('pointermove', event => {
   if (!motion() || event.pointerType !== 'mouse') return;
   const b = fan.getBoundingClientRect();
   fan.style.setProperty('--mx', ((event.clientX - b.left) / b.width - .5).toFixed(3));
   fan.style.setProperty('--my', ((event.clientY - b.top) / b.height - .5).toFixed(3));
  });
  fan.addEventListener('pointerleave', () => { fan.style.setProperty('--mx', '0'); fan.style.setProperty('--my', '0'); });
 }

 // Project index: a floating preview follows the cursor (mouse only; rows keep their own thumbnails on touch).
 const list = document.querySelector('[data-preview-list]');
 if (list && matchMedia('(pointer: fine)').matches) {
  const preview = document.createElement('div');
  preview.className = 'av-preview';
  preview.setAttribute('aria-hidden', 'true');
  preview.innerHTML = '<img alt="">';
  document.body.append(preview);
  const img = preview.querySelector('img');
  let x = 0, y = 0, px = 0, py = 0, raf = 0;
  const follow = () => {
   px += (x - px) * (motion() ? .18 : 1); py += (y - py) * (motion() ? .18 : 1);
   preview.style.transform = `translate(${px}px, ${py}px) translate(-50%, -50%)`;
   raf = Math.abs(x - px) + Math.abs(y - py) > .5 ? requestAnimationFrame(follow) : 0;
  };
  for (const row of list.querySelectorAll('[data-preview]')) {
   row.addEventListener('pointerenter', event => {
    img.src = row.dataset.preview;
    if (!preview.classList.contains('is-visible')) { px = x = event.clientX; py = y = event.clientY; }
    preview.classList.add('is-visible');
   });
   row.addEventListener('pointerleave', () => preview.classList.remove('is-visible'));
  }
  list.addEventListener('pointermove', event => { x = event.clientX; y = event.clientY; if (!raf) raf = requestAnimationFrame(follow); });
  addEventListener('scroll', () => preview.classList.remove('is-visible'), { passive: true });
 }
})();
