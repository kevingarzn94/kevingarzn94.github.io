export async function mountHero(host, motion) {
  const THREE = await import('./vendor/three/three.module.js');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(37,1,.1,100);
  camera.position.set(0,0,9);
  const renderer = new THREE.WebGLRenderer({alpha:true,antialias:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const canvas=renderer.domElement;
  canvas.className='hero-canvas'; canvas.setAttribute('aria-hidden','true');
  const group=new THREE.Group(); scene.add(group);
  const loader=new THREE.TextureLoader();
  const data=[
    ['assets/ahead.webp','proyecto-ahead.html','AHEAD / MARCA + WEB',-1.0,.9,-.5,-.035,3.25,2.05],
    ['assets/wedding-portada.jpg','proyecto-wedding-art.html','WEDDING ART / FOTO + VIDEO',.55,-.35,.5,.025,3.55,2.55],
    ['assets/centauro.jpg','proyecto-centauro.html','CENTAURO / IDENTIDAD',-1.2,-1.65,.05,-.025,2.25,1.6]
  ];
  const hits=[],cards=[];
  try {
    for (const [src,url,label,x,y,z,angle,w,h] of data) {
      const photo=await loader.loadAsync(src);
      photo.colorSpace=THREE.SRGBColorSpace;
      // Card artwork preserves the complete project image, plus a readable caption.
      const art=document.createElement('canvas'); art.width=1024; art.height=Math.round(1024*h/w);
      const ctx=art.getContext('2d'); ctx.fillStyle='#29252d';ctx.fillRect(0,0,art.width,art.height);
      const pad=8,caption=82,spaceW=art.width-2*pad,spaceH=art.height-2*pad-caption;
      ctx.fillStyle='#20221f';ctx.fillRect(pad,pad,spaceW,spaceH);
      const scale=Math.min(spaceW/photo.image.width,spaceH/photo.image.height);
      const iw=photo.image.width*scale, ih=photo.image.height*scale;
      ctx.drawImage(photo.image,pad+(spaceW-iw)/2,pad+(spaceH-ih)/2,iw,ih);
      ctx.fillStyle='#f4efe6';ctx.font='500 23px Arial';ctx.fillText(label,28,art.height-30);ctx.fillText('↗',art.width-52,art.height-30);
      const texture=new THREE.CanvasTexture(art);texture.colorSpace=THREE.SRGBColorSpace;photo.dispose();
      const card=new THREE.Group();card.position.set(x,y,z);card.rotation.set(-.06,.12,angle);
      const frame=new THREE.Mesh(new THREE.BoxGeometry(w+.04,h+.04,.08),new THREE.MeshBasicMaterial({color:0x37323d}));
      const face=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:texture}));face.position.z=.045;face.userData.url=url;
      card.add(frame,face);group.add(card);hits.push(face);cards.push({card,y,angle});
    }
  } catch(error) { renderer.dispose(); throw error; }
  const ring=new THREE.Mesh(new THREE.TorusGeometry(2.35,.014,8,100),new THREE.MeshBasicMaterial({color:0x897b9f}));
  ring.position.z=-1;ring.rotation.set(.3,.45,.2);// Removed decorative ring to keep the scene quiet.
  const pointer=new THREE.Vector2(),ray=new THREE.Raycaster();let hovered=null,inside=false,paused=false,inView=true;
  function readPointer(e){const box=canvas.getBoundingClientRect();pointer.set((e.clientX-box.left)/box.width*2-1,-(e.clientY-box.top)/box.height*2+1);ray.setFromCamera(pointer,camera);hovered=ray.intersectObjects(hits)[0]?.object;canvas.style.cursor=hovered?'pointer':'default';}
  canvas.addEventListener('pointermove',e=>{inside=true;readPointer(e)});
  canvas.addEventListener('pointerleave',()=>{inside=false;pointer.set(0,0);hovered=null});
  canvas.addEventListener('click',e=>{readPointer(e);if(hovered)location.href=hovered.userData.url});
  host.append(canvas);host.classList.add('is-3d');
  function resize(){const b=host.getBoundingClientRect();renderer.setSize(b.width,b.height,false);camera.aspect=b.width/b.height;camera.position.z=Math.max(9,5.7/(2*Math.tan(THREE.MathUtils.degToRad(camera.fov/2))*camera.aspect));camera.updateProjectionMatrix();}
  new ResizeObserver(resize).observe(host);resize();
  function frame(time){if(document.hidden||!inView)return;const moving=document.documentElement.dataset.motion!=='off'&&!motion.matches;
    if(moving){group.rotation.y=THREE.MathUtils.lerp(group.rotation.y,moving&&inside?pointer.x*.24:0,.045);
    group.rotation.x=THREE.MathUtils.lerp(group.rotation.x,moving&&inside?-pointer.y*.15:0,.045);
    cards.forEach(({card,y,angle},i)=>{card.position.y=y+(moving?Math.sin(time*.0007+i)*.11:0);card.rotation.z=angle;});}
    renderer.render(scene,camera);
  }
  renderer.setAnimationLoop(frame);
  new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;renderer.setAnimationLoop(inView&&!document.hidden?frame:null)}).observe(host);
  document.addEventListener('visibilitychange',()=>renderer.setAnimationLoop(!document.hidden&&inView?frame:null));
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();renderer.setAnimationLoop(null);host.classList.remove('is-3d');canvas.remove()});

}

export async function mountAtmosphere(hero,motion){
 const THREE=await import('./vendor/three/three.module.js');
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:false});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
 const canvas=renderer.domElement;canvas.className='hero-atmosphere';canvas.setAttribute('aria-hidden','true');hero.prepend(canvas);
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(45,1,.1,40);camera.position.z=12;
 const count=240,positions=new Float32Array(count*3),base=new Float32Array(count*3);
 for(let i=0;i<count;i++){let x=(i%30)/29*22-11,y=Math.floor(i/30)/7*9-4.5;positions[i*3]=x;positions[i*3+1]=y;positions[i*3+2]=Math.sin(x*.5+y)*.6;}base.set(positions);
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));
 const material=new THREE.PointsMaterial({color:0xcbb6ed,size:.025,transparent:true,opacity:.42,depthWrite:false});const points=new THREE.Points(geometry,material);scene.add(points);
 let px=0,py=0,inView=true;hero.addEventListener('pointermove',e=>{const b=hero.getBoundingClientRect();px=(e.clientX-b.left)/b.width-.5;py=(e.clientY-b.top)/b.height-.5});hero.addEventListener('pointerleave',()=>{px=py=0});
 new ResizeObserver(()=>{const b=hero.getBoundingClientRect();renderer.setSize(b.width,b.height,false);camera.aspect=b.width/b.height;camera.updateProjectionMatrix()}).observe(hero);
 function frame(time){if(document.hidden||!inView)return;const paused=motion.matches||matchMedia('(max-width:850px)').matches||document.documentElement.dataset.motion==='off';if(!paused){for(let i=0;i<count;i++){const x=base[i*3],y=base[i*3+1];positions[i*3+2]=Math.sin(x*.45+y*.6+time*.00018)*.6;positions[i*3+1]=y+Math.sin(x*.4+time*.00012)*.25;}geometry.attributes.position.needsUpdate=true;points.rotation.y+=(px*.12-points.rotation.y)*.025;points.rotation.x+=(-py*.08-points.rotation.x)*.025;}renderer.render(scene,camera)}
 renderer.setAnimationLoop(frame);new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;renderer.setAnimationLoop(inView&&!document.hidden?frame:null)}).observe(hero);document.addEventListener('visibilitychange',()=>renderer.setAnimationLoop(inView&&!document.hidden?frame:null));canvas.addEventListener('webglcontextlost',()=>{renderer.setAnimationLoop(null);canvas.remove()});
}
