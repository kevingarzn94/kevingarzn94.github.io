// Progressive enhancement: links remain a horizontal, scrollable gallery without JS.
const gallery = document.querySelector('.wedding-gallery');
const galleryLinks = [...document.querySelectorAll('[data-gallery]')];
const photoDialog = document.querySelector('.photo-dialog');
let currentPhoto = 0;
const wrap = index => (index + galleryLinks.length) % galleryLinks.length;
const controls = document.createElement('div');
controls.className = 'gallery-controls';
controls.innerHTML = '<button type="button" data-slide-prev aria-label="Foto anterior">←</button><p aria-live="polite" aria-atomic="true"></p><button type="button" data-slide-next aria-label="Foto siguiente">→</button>';
gallery.after(controls);
gallery.classList.add('is-carousel');
gallery.setAttribute('role', 'region');
gallery.setAttribute('aria-roledescription', 'carrusel');
function selectPhoto(index) {
  currentPhoto = wrap(index);
  galleryLinks.forEach((link, i) => {
    let offset = wrap(i - currentPhoto);
    if (offset > galleryLinks.length / 2) offset -= galleryLinks.length;
    link.style.setProperty('--offset', offset);
    link.style.setProperty('--distance', Math.abs(offset));
    link.style.zIndex = String(10 - Math.abs(offset));
    link.classList.toggle('is-selected', offset === 0);
    link.classList.toggle('is-near', Math.abs(offset) <= 2);
    link.tabIndex = offset === 0 ? 0 : -1;
    link.setAttribute('aria-hidden', String(offset !== 0));
    if (Math.abs(offset) <= 2) link.querySelector('img').loading = 'eager';
  });
  controls.querySelector('p').textContent = `${String(currentPhoto + 1).padStart(2, '0')} / ${galleryLinks.length} · ${galleryLinks[currentPhoto].querySelector('img').alt}`;
}
function showPhoto(index) {
  selectPhoto(index);
  const link = galleryLinks[currentPhoto];
  const img = photoDialog.querySelector('.photo-full');
  img.src = link.href;
  img.alt = link.querySelector('img').alt;
  document.getElementById('photo-position').textContent = `${String(currentPhoto + 1).padStart(2, '0')} / ${galleryLinks.length} · SAVE THE DATE`;
  document.getElementById('photo-description').textContent = img.alt;
}
let suppressClick = false;
for (const [index, link] of galleryLinks.entries()) {
  link.draggable = false;
  link.querySelector('img').draggable = false;
  link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (suppressClick) return;
    if (index !== currentPhoto) { selectPhoto(index); return; }
    showPhoto(index);
    photoDialog.showModal();
    document.documentElement.classList.add('gallery-open');
  });
}
controls.querySelector('[data-slide-prev]').addEventListener('click', () => selectPhoto(currentPhoto - 1));
controls.querySelector('[data-slide-next]').addEventListener('click', () => selectPhoto(currentPhoto + 1));
gallery.addEventListener('keydown', event => {
  if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  selectPhoto(event.key === 'Home' ? 0 : event.key === 'End' ? galleryLinks.length - 1 : currentPhoto + (event.key === 'ArrowRight' ? 1 : -1));
  galleryLinks[currentPhoto].focus({preventScroll:true});
});
let start = null;
gallery.addEventListener('pointerdown', event => {
  if (!event.isPrimary || event.button !== 0) return;
  start = {x:event.clientX, y:event.clientY};
  suppressClick = false;
});
gallery.addEventListener('pointerup', event => {
  if (!start) return;
  const dx = event.clientX - start.x, dy = event.clientY - start.y;
  start = null;
  if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
    suppressClick = true;
    selectPhoto(currentPhoto + (dx < 0 ? 1 : -1));
    setTimeout(() => { suppressClick = false; }, 0);
  }
});
gallery.addEventListener('pointercancel', () => { start = null; });
photoDialog.querySelector('[data-close]').addEventListener('click', () => photoDialog.close());
photoDialog.querySelector('[data-prev]').addEventListener('click', () => showPhoto(currentPhoto - 1));
photoDialog.querySelector('[data-next]').addEventListener('click', () => showPhoto(currentPhoto + 1));
photoDialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault(); showPhoto(currentPhoto + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
photoDialog.addEventListener('close', () => {
  document.documentElement.classList.remove('gallery-open');
  galleryLinks[currentPhoto].focus({preventScroll:true});
});
selectPhoto(0);
