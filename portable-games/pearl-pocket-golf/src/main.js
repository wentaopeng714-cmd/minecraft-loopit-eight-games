import {setup,THREE,V,steve,villager,equip,prop,frame,data,help,guide,guideShow,badge,$,clamp} from './support.js';
import {landingAt,reachPoint,courseScore} from './rules.mjs';import {present} from './presentation.js';
const w=await setup(['ender_pearl','obsidian','diamond','wool','end_stone']);present('pearl');
let hero,host,held,projectile,course=1,bank=0,throws=0,misses=0,treasures=0,at=0,islands=[],aim=V(),arc,marker,flight=null,cast=0,finishAt=0,visited=new Set(),gems=[],flash=0;
function ui(){
 const safe=landingAt(aim.x,aim.z,islands)>=0,range=hero.root.position.distanceTo(V(aim.x,.57,aim.z));
 w.objective(finishAt?'PEARL MAIL DELIVERED':'TELEPORT TO THE PURPLE FLAG',finishAt?'The Villager has your delivery.':(safe?'GREEN · SAFE LANDING':'RED · AIM ONTO AN ISLAND')+' · '+range.toFixed(1)+'m / 5.4m',Math.max(0,-hero.root.position.z+4.4)/10.8);
 w.stats('♥ '+(4-misses),throws+' THROWS · '+treasures+' DIAMONDS');$('main').disabled=!!(flight||cast||finishAt);w.ui();
 data({course,throws,misses,treasures,island:at,aim:[Number(aim.x.toFixed(2)),Number(aim.z.toFixed(2))],safe,heroPosition:hero.root.position.toArray(),aimYaw:Number(w.fps.yaw.toFixed(3)),aimPitch:Number(w.fps.pitch.toFixed(3)),islands:islands.map(p=>({x:p.x,z:p.z,w:p.w,d:p.d}))});
}
function focusNext(){
 const choices=islands.filter(p=>p.z<hero.root.position.z-.3&&Math.hypot(p.x-hero.root.position.x,p.z-hero.root.position.z)<=5.4).sort((a,b)=>b.z-a.z);
 const p=choices[0]||islands.at(-1),d=V(p.x-hero.root.position.x,0,p.z-hero.root.position.z),range=throws===0?d.length():Math.min(d.length()*.5,1.7);
 w.fps.yaw=Math.atan2(-d.x,-d.z);w.fps.pitch=-Math.atan2(1.62,range);w.fps.swing=1;
}
function throwOrigin(){const yaw=w.fps.yaw;return hero.root.position.clone().add(V(0,.85,0)).addScaledVector(V(-Math.sin(yaw),0,-Math.cos(yaw)),.85).addScaledVector(V(Math.cos(yaw),0,-Math.sin(yaw)),.17);}
function updateAim(){
 const f=w.fps,ray=new THREE.Raycaster();ray.setFromCamera(new THREE.Vector2(0,0),f.camera);
 const p=ray.ray.intersectPlane(new THREE.Plane(V(0,1,0),-.57),V());
 const ahead=f.camera.getWorldDirection(V()).setY(0).normalize(),point=p||hero.root.position.clone().addScaledVector(ahead,5.4),r=reachPoint(hero.root.position,point);
 aim.set(r.x,.58,r.z);const safe=landingAt(aim.x,aim.z,islands)>=0;marker.position.copy(aim).setY(.60);marker.material.color.set(safe?'#a2f5b9':'#f09198');
 const from=throwOrigin(),array=arc.geometry.attributes.position.array;
 for(let i=0;i<=30;i++){const t=i/30;array[i*3]=from.x+(aim.x-from.x)*t;array[i*3+1]=from.y+(aim.y-from.y)*t+Math.sin(t*Math.PI)*.6;array[i*3+2]=from.z+(aim.z-from.z)*t;}
 arc.geometry.attributes.position.needsUpdate=true;arc.geometry.computeBoundingSphere();arc.material.color.set(safe?'#baf8c5':'#e4a3b5');
}
function throwPearl(){
 if(flight||cast||finishAt||w.phase!=='play')return;
 if(Math.hypot(aim.x-hero.root.position.x,aim.z-hero.root.position.z)<.85){w.notice('LOOK TOWARD ANOTHER ISLAND · Slide up to aim farther.','good',1.8);return;}
 throws++;cast=.001;hero.act('cast');hero.expression='focus';w.fps.swing=0;guideShow(false);ui();
}
function resetCourse(){throws=0;misses=0;treasures=0;at=0;cast=0;flight=null;finishAt=0;visited=new Set([0]);held.visible=true;projectile.visible=false;hero.root.position.set(islands[0].x,.57,islands[0].z);hero.act('idle');gems.forEach((g,i)=>g.visible=islands[i].gem);focusNext();}
function land(){
 const n=landingAt(aim.x,aim.z,islands);projectile.visible=false;held.visible=true;
 if(n<0){misses++;hero.act('hurt');w.notice('VOID · Look onto a platform before throwing.','bad',2);w.tone(150,.18);flash=.3;if(misses>=4){w.result({won:false,title:'A pearl too far.',copy:'Slide the view until the footprint turns green. A nearer island is often a safer setup.',breakdown:throws+' throws · '+treasures+' Diamonds',canContinue:false});return;}}
 else{const p=islands[n];at=n;hero.root.position.set(aim.x,.57,aim.z);hero.act('balance');w.tone(840,.13);flash=.7;w.burst(hero.root.position.clone().add(V(0,.7,0)),'#cba6e7',14,1.5);
  if(!visited.has(n)){visited.add(n);if(p.gem){treasures++;gems[n].visible=false;w.score=bank+treasures*125;w.notice('DIAMOND COLLECTED · +125','good',1.3);}}
  if(n===islands.length-1){finishAt=w.time;w.score=bank+courseScore(throws,treasures,misses);bank=w.score;hero.act('win');arc.visible=false;marker.visible=false;}
 }
 if(!finishAt)focusNext();ui();
}
const game={
 async init(){
  const positions=[[0,4.4,2.2,2.2],[-2,1.5,2.1,2.1],[1.8,-1.3,2,2],[-2,-3.9,2,2],[3.2,1.2,1.8,1.8],[1.1,-6.4,2.5,2.4]];
  islands=positions.map((a,i)=>({x:a[0],z:a[1],w:a[2],d:a[3],gem:i>0&&i<positions.length-1}));
  for(let i=0;i<islands.length;i++){const p=islands[i];w.box(w.scene,p.w,.5,p.d,w.mat('#fff','end_stone'),p.x,.27,p.z);w.box(w.scene,p.w*.65,2.1,p.d*.65,w.mat('#a69cac','obsidian'),p.x,-1,p.z);const gem=prop(w,'diamond',.48);gem.position.set(p.x,1.15,p.z);w.scene.add(gem);gem.visible=p.gem;gems.push(gem);}
  const last=islands.at(-1);w.box(w.scene,.11,3.5,.11,w.mat('#d6cbdd','iron_block'),last.x+.8,2,last.z);w.box(w.scene,1.15,.7,.06,w.mat('#b786d9','wool'),last.x+.3,3.35,last.z);
  for(const [x,z,h]of[[-7,2,8],[7,-3,11],[-6,-9,10],[8,-14,13]]){w.box(w.scene,1.5,h,1.5,w.mat('#a99cbd','obsidian',{emissive:'#292133',emissiveIntensity:.15}),x,h/2-3,z);w.box(w.scene,.75,.25,.75,w.mat('#deb9f4',null,{emissive:'#b378cc',emissiveIntensity:.4}),x,h-2.8,z);}
  hero=steve(w);held=equip(w,hero,'ender_pearl',.43);projectile=prop(w,'ender_pearl',.16);w.scene.add(projectile);marker=w.ring(V(),.38,'#baebce');
  arc=new THREE.Line(new THREE.BufferGeometry().setAttribute('position',new THREE.BufferAttribute(new Float32Array(31*3),3)),new THREE.LineBasicMaterial({color:'#c9f3c7',transparent:true,opacity:.82}));w.scene.add(arc);
  host=villager(w);host.root.position.set(last.x-.5,.57,last.z-.6);host.root.scale.setScalar(.75);
  w.installView({actor:hero,tool:prop(w,'ender_pearl',.47),first:true,height:1.62,toolScale:.5});w.fps.camera.fov=76;w.fps.button.classList.add('hidden');
  const f=document.createElement('div');f.id='teleport-flash';$('game').append(f);
  w.scene.background.set('#81759f');w.scene.fog.color.set('#81759f');w.scene.fog.near=18;w.scene.fog.far=45;
  w.controls({main:true});w.actionLabels('THROW','Tap or Space');help(['First-person Pearl aiming: slide the scene to look toward an island. The curved trail ends at your crosshair landing.','A green footprint is safe. Tap THROW or Space to toss the Pearl and teleport where it lands.','Reach the purple flag with fewer throws. Optional islands hold Diamonds. Four void throws end the trip.']);guide('SLIDE TO AIM · THROW WHEN THE FOOTPRINT IS GREEN');resetCourse();
 },
 resize(){frame(w,V(.1,.7,-.6),9,V(1.5,14,17),8.7);},
 reset(next){course=next?course+1:1;if(!next)bank=0;w.score=bank;w.fps.preferFirst=true;arc.visible=true;marker.visible=true;w.controls({main:true});resetCourse();guideShow(true);},
 pointer(type){if(type==='up'&&!w.fps.drag){}},
 action(id,down){if(id==='main'&&down)throwPearl();},
 update(dt,phase){
  hero.animate(dt,w.time);host.animate(w.time,!!finishAt);gems.forEach((g,i)=>{g.rotation.y+=dt;g.position.y=1.15+Math.sin(w.time*2+i)*.1;});
  flash=Math.max(0,flash-dt*2);$('teleport-flash').style.opacity=String(flash*.55);
  if(phase!=='play')return;w.fps.pitch=clamp(w.fps.pitch,-1.05,-.06);
  if(!flight&&!cast&&!finishAt){updateAim();if(w.frameNo%8===0)ui();}
  if(cast){cast+=dt;if(cast>.25){flight={t:0,from:throwOrigin(),to:aim.clone()};projectile.position.copy(flight.from);projectile.visible=true;held.visible=false;cast=0;w.tone(390,.09);}}
  if(w.fps.weapon)w.fps.weapon.visible=!flight;
  if(flight){flight.t+=dt;const t=clamp(flight.t/.72,0,1);projectile.position.lerpVectors(flight.from,flight.to,t);projectile.position.y+=Math.sin(t*Math.PI)*.6;projectile.rotation.y+=dt*7;if(t>=1){aim.copy(flight.to);flight=null;land();}}
  if(finishAt&&w.time-finishAt>1)w.result({title:'Pearl mail, hand delivered.',copy:'You aimed every teleport from the island. Try an optional Diamond detour or a shorter route.',breakdown:throws+' throws · '+treasures+' Diamonds · '+misses+' misses',next:'ANOTHER PEARL TRIP →'});
 },
 finish(){w.result({title:'Pearl trip recorded.',copy:'Only collected Diamonds count until you reach the flag.',breakdown:throws+' throws · '+treasures+' Diamonds',next:'NEW PEARL TRIP →'});}
};await w.ready(game);
