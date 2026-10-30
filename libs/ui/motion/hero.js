// Preserve links shared before projects moved to their own pages.
const legacyRoutes = {
  '#caso-ahead': 'proyecto-ahead.html#caso-ahead',
  '#proceso-ahead': 'proyecto-ahead.html#proceso-ahead',
  '#caso-ml': 'proyecto-colombia-real.html#caso-ml',
  '#caso-prodesa': 'index.html#trabajo'
};
function redirectLegacyProject() {
  const target = legacyRoutes[location.hash];
  if (target) location.replace(target);
}
redirectLegacyProject();
addEventListener('hashchange', redirectLegacyProject);
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const desktop = matchMedia('(min-width: 851px) and (pointer: fine)');
const host = document.querySelector('.hero-board');
if (host && desktop.matches && !motion.matches) {
  import('./hero-3d.js').then(module => module.mountHero(host,motion)).catch(error => {
    console.warn('La composición estática permanece disponible.', error);
  });
}
if(host&&!motion.matches){import('./hero-3d.js').then(module=>module.mountAtmosphere(document.querySelector('.hero'),motion)).catch(()=>{});}
