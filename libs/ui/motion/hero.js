const hero = document.querySelector('.hero');
const stage = document.querySelector('.playground');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
hero.addEventListener('pointermove', event => {
  if (motion.matches || event.pointerType === 'touch') return;
  const rect = hero.getBoundingClientRect();
  stage.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width - .5) * 32}px`);
  stage.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height - .5) * 24}px`);
});
hero.addEventListener('pointerleave', () => {
  stage.style.setProperty('--mx', '0px');
  stage.style.setProperty('--my', '0px');
});
