import {setup,THREE,V,steve,villager,critter,equip,data,help,guide,guideShow,$,sparkleWater} from './support.js';
import {moveExplorer,canInvite,deliveryScore,arrivedAtCamp} from './rules.mjs';
import {present,cameraDrag} from './presentation.js';
const w=await setup(['wolf','bone','zombie','lamp_on'],['wolf','zombie']);present('explorer');
const CAMP=V(0,0,-10),START=V(0,0,10),POOLS=[{x:-4,z:3,r:1.8},{x:4,z:-2,r:1.9}];
const cam={yaw:0,tilt:.05,drag:null};
let hero,host,guard,threatRing,pack=[],waters=[],heading,stage=1,bank=0,seconds=0,hits=0,inv=0,attack=0,call=0,done=false,stay=false,delivered=0,footprints=[],moving=0;
const following=()=>pack.filter(p=>p.state==='following');
const targetWolf=()=>pack.filter(p=>p.state==='waiting').sort((a,b)=>a.a.root.position.distanceTo(hero.root.position)-b.a.root.position.distanceTo(hero.root.position))[0];
function ui(){
 const n=following().length,atCamp=following().filter(p=>arrivedAtCamp(p.a.root.position,CAMP,stay)).length,nearCamp=hero.root.position.distanceTo(CAMP)<2.4,near=targetWolf();
 w.objective('BRING THREE WOLVES HOME',delivered+'/3 safe · '+n+' following · '+(nearCamp?(delivered===3?'ALL THREE SAFE AT CAMP':atCamp+' companions ready to deliver'):near?'Nearest Wolf '+Math.round(near.a.root.position.distanceTo(hero.root.position))+'m away':'Return to the camp lantern'),delivered/3);
 w.stats('♥ '+(3-hits),delivered+' HOME · '+n+' WITH YOU');w.actionLabels(nearCamp&&n?'SEND HOME':'CALL WOLF',nearCamp&&n?'Bank the rescue reward':'Use the Bone within 3m',stay?'FOLLOW ME':'WAIT HERE',stay?'Bring companions along':'Keep them out of danger');
 $('main').disabled=!!call;w.ui();data({stage,delivered,following:n,atCamp,hits,stay,player:hero.root.position.toArray(),cameraYaw:Number(cam.yaw.toFixed(2)),wolves:pack.map(p=>({state:p.state,position:p.a.root.position.toArray()})),camp:CAMP.toArray(),callReady:!call});
}
function finish(won=false){
 if(done)return;done=true;hero.act(won?'win':'balance');if(won){w.score+=Math.max(0,300-Math.floor(seconds)*2-hits*40);bank=w.score;}ui();
 w.result({won,title:won?'The whole pack is home!':hits>=3?'A little too close to the Zombie.':'Camp progress recorded.',copy:won?'Three friends are safe by the lantern. The next forest rescue moves the Wolves and the patrol.':'Walk close to a Wolf, call with the Bone, then bring it to the camp. Only delivered Wolves earn rescue points.',breakdown:delivered+' rescued ×200 · '+hits+' scares · '+Math.floor(seconds)+'s',next:'NEXT FOREST RESCUE →',canContinue:won||delivered>0});
}
function activate(){
 if(call||done)return;const n=following();
 if(hero.root.position.distanceTo(CAMP)<2.4&&n.length){
  const arriving=n.filter(p=>arrivedAtCamp(p.a.root.position,CAMP,stay));if(!arriving.length){stay=false;w.notice('WAIT FOR THE PACK · Companions are catching up.','good',1.8);ui();return;}const pts=deliveryScore(arriving.length);delivered+=arriving.length;w.score+=pts;bank=w.score;arriving.forEach((p,i)=>{p.state='home';p.a.root.position.copy(CAMP).add(V((pack.indexOf(p)-1)*1.1,0,-.7));p.a.root.rotation.y=.2;p.a.react=1.5;});
  hero.act('win');w.notice('SAFE AT CAMP · +'+pts,'good',2);w.burst(CAMP.clone().add(V(0,1,0)),'#eed27c',18,2);w.tone(830,.18);if(delivered===3){finish(true);return;}ui();return;
 }
 const p=targetWolf();if(!p||!canInvite(hero.root.position,p.a.root.position)){w.notice('Walk closer to a Wolf · Bone reach 3m','good',1.5);return;}call=.001;hero.act('cast');hero.expression='happy';stay=false;guideShow(false);w.tone(650,.12);ui();
}
const game={
 async init(){
  w.camera=new THREE.PerspectiveCamera(64,w.width/w.height,.08,100);w.scene.background.set('#bddbd1');w.scene.fog.color.set('#bddbd1');w.scene.fog.near=23;w.scene.fog.far=60;
  w.ground(32,38);w.house(0,-13,1.5,'#ceab72');w.fence(-3.8,-11.7,4);w.fence(1.2,-11.7,4);
  for(let z=8;z>=-10;z-=1.4)w.static(.35*Math.sin(z*.6),-.01,z,1.4,.035,1.45,w.mat('#ceb17c','dirt'));
  for(const p of POOLS){waters.push(sparkleWater(w,w.scene,p.x,.025,p.z,p.r*1.8,p.r*1.7));for(let i=0;i<7;i++){const a=i*Math.PI*2/7;w.static(p.x+Math.cos(a)*p.r,.3,p.z+Math.sin(a)*p.r,.5,.6,.6,w.mat('#abb29a','stone'));}}
  for(let z=-15;z<=15;z+=4)for(const side of[-1,1])w.tree(side*(10.8+(z%3)*.3),z,1.1+(z%2)*.08);
  for(const [x,z]of [[-7,-9],[7,9],[-7,7],[7,-10]])w.tree(x,z,.9);
  for(const x of[-2,2]){w.static(x,1.3,-9,.25,2.6,.25,w.mat('#a88755','oak_log'));w.static(x,2.7,-9,.65,.6,.65,w.mat('#fff','lamp_on'));}
  w.flowers(190,14,2);w.flush();w.ring(CAMP.clone(),1.8,'#f2cb65');host=villager(w);host.root.position.set(1,0,-11.4);
  hero=steve(w);equip(w,hero,'bone',.61);guard=critter(w,'zombie',1.7);threatRing=w.ring(V(),1.2,'#e78358');threatRing.visible=false;
  for(let i=0;i<3;i++){const a=critter(w,'wolf',.95),mark=w.ring(V(),.7,'#e9d992');pack.push({a,state:'waiting',mark});}
  const flag=new THREE.Group();flag.position.copy(CAMP);w.scene.add(flag);w.box(flag,.12,4.6,.12,w.mat('#876d43','oak_log'),0,2.3,0);w.box(flag,1.5,.85,.08,w.mat('#eccb68','wool'),.6,4,0);
  heading=document.createElement('div');heading.id='compass';heading.style.cssText='position:absolute;top:205px;left:16px;z-index:2;color:#fff2cc;background:#183d32bb;padding:8px 12px;border-radius:20px;font-size:11px;pointer-events:none';$('game').append(heading);
  w.controls({main:true,alt:true,joystick:true});help(['Move with the left stick or WASD. Drag the scene to turn the third-person camera.','Walk within 3m of a Wolf and tap CALL WOLF. Lead it to the gold camp flag and SEND HOME.','WAIT HERE keeps companions in a safe spot. Dodge the red Zombie warning; three scares end the rescue. Each delivered Wolf earns 200.']);guide('WALK TO THE WOLF · CALL WITH THE BONE');this.reset(false);
 },
 resize(){w.camera.aspect=w.width/w.height;w.camera.updateProjectionMatrix();},
 reset(next){
  stage=next?stage+1:1;if(!next)bank=0;w.score=bank;done=false;delivered=0;hits=0;seconds=0;attack=0;inv=0;call=0;stay=false;cam.yaw=0;cam.tilt=.05;cam.drag=null;hero.root.position.copy(START);hero.root.rotation.y=Math.PI;hero.act('idle');footprints=[START.clone()];
  const positions=stage%2?[[1.7,6.2],[-6,-1],[5,-7]]:[[1.7,6.2],[6,1],[-5,-7]];pack.forEach((p,i)=>{p.state='waiting';p.a.root.position.set(positions[i][0],0,positions[i][1]);p.a.root.rotation.y=0;p.a.react=.5;p.mark.position.copy(p.a.root.position).setY(.04);p.mark.visible=true;});w.controls({main:true,alt:true,joystick:true});guideShow(true);ui();
 },
 pointer(type,e){cameraDrag(cam,type,e,[-.15,.45]);},
 action(id,down){if(!down||done)return;if(id==='main')activate();else{stay=!stay;following().forEach(p=>p.a.react=.6);w.notice(stay?'WAIT HERE · Companions hold their spot.':'FOLLOW ME · Companions return to your trail.','good',1.4);ui();}},
 update(dt,phase){
  const mv=phase==='play'&&!done?w.navigation():{x:0,z:0};moving=Math.hypot(mv.x,mv.z);hero.animate(dt,w.time,moving);host.animate(w.time,delivered>0);waters.forEach(p=>p.animate(w.time));
  if(phase==='play'&&!done){
   seconds+=dt;inv=Math.max(0,inv-dt);const p=moveExplorer(hero.root.position,mv,dt,[...POOLS,{x:0,z:-13,r:2.1}]);hero.root.position.set(p.x,0,p.z);
   if(moving>.1){const target=Math.atan2(mv.x,mv.z);hero.root.rotation.y+=Math.atan2(Math.sin(target-hero.root.rotation.y),Math.cos(target-hero.root.rotation.y))*Math.min(1,dt*12);footprints.push(hero.root.position.clone());if(footprints.length>220)footprints.shift();}
   if(call){call+=dt;if(call>=.28){const wolf=targetWolf();if(wolf&&canInvite(hero.root.position,wolf.a.root.position)){wolf.state='following';wolf.a.react=1.4;w.notice('A NEW FRIEND · Lead the Wolf to CAMP.','good',2);w.burst(wolf.a.root.position.clone().add(V(0,1,0)),'#efc06f',10,1.4);}call=0;ui();}}
   const gp=V(Math.sin(w.time*.55)*5.2,0,-2+Math.cos(w.time*.35)*2),gd=gp.clone().sub(guard.root.position);guard.root.position.copy(gp);guard.root.rotation.y=Math.atan2(gd.x,gd.z);
   if(gp.distanceTo(hero.root.position)<1.45&&inv<=0){attack+=dt;threatRing.visible=true;threatRing.position.copy(gp).setY(.04);threatRing.material.opacity=.45+Math.sin(w.time*15)*.3;if(attack>.9){hits++;inv=2.2;attack=0;hero.act('hurt');w.thump();w.notice('SCARED · Step away from the red warning.','bad',1.8);if(hits>=3){finish(false);return;}ui();}}else{attack=0;threatRing.visible=false;}
   following().forEach((p,i)=>{if(stay)return;const target=footprints[Math.max(0,footprints.length-1-(i+1)*18)]||hero.root.position,d=target.clone().sub(p.a.root.position);if(d.length()>.45){p.a.root.position.addScaledVector(d,Math.min(1,dt*3.9/d.length()));p.a.root.rotation.y=Math.atan2(d.x,d.z);}});if(w.frameNo%12===0)ui();
  }
  guard.animate(dt,w.time,1);pack.forEach((p,i)=>{p.a.animate(dt,w.time+i,p.state==='following'&&!stay?moving:0);p.mark.visible=p.state==='waiting';});
  const hp=hero.root.position,dir=V(-Math.sin(cam.yaw),0,-Math.cos(cam.yaw));w.camera.position.copy(hp).add(V(-dir.x*5.3,3.4+cam.tilt*3,-dir.z*5.3));w.camera.lookAt(hp.clone().addScaledVector(dir,2.3).add(V(0,.85,0)));
  if(phase==='result'){hero.skin.rightArm.rotation.x=.15;w.camera.position.copy(CAMP).add(V(6,4.6,8));w.camera.lookAt(CAMP.clone().add(V(0,-1.2,0)));const desired=Math.atan2(6,8);hero.root.rotation.y+=Math.atan2(Math.sin(desired-hero.root.rotation.y),Math.cos(desired-hero.root.rotation.y))*Math.min(1,dt*5);}
  const angle=Math.atan2(CAMP.x-hp.x,-(CAMP.z-hp.z))+cam.yaw;heading.textContent=(Math.sin(angle)<-.3?'◀ ':Math.sin(angle)>.3?'▶ ':'↑ ')+'CAMP '+Math.round(hp.distanceTo(CAMP))+'m';
 },finish(){finish(false);}
};await w.ready(game);
