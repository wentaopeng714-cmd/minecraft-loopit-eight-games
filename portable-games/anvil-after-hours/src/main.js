import {setup,THREE,V,steve,villager,critter,anvil,frame,data,help,guide,guideShow,$,clamp,lerp} from './support.js';
import {strikeTargets,strikeScore,spawnPlan} from './rules.mjs';import {present} from './presentation.js';
const w=await setup(['zombie','anvil','anvil_top','iron_block','lamp_on'],['zombie']);present('foundry');
const HANG=6.65,RAIL=8;
let hero,host,hammer,shadow,rope,mobs=[],rollers=[],kills=0,saved=0,gate=5,index=0,spawn=0,seconds=0,bestCombo=0,x=0,targetX=0,t=-1,struck=false,dragging=false,milestone=8;
function ui(){
 w.objective('CRUSH ZOMBIES · SPARE VILLAGERS','Next belt shift: '+milestone+' Zombies · Drag the hanging Anvil, release to strike',kills/milestone);w.stats('GATE '+gate,kills+' ZOMBIES · '+saved+' SAFE');w.ui();$('main').disabled=t>=0;w.actionLabels(t>=0?'LIFTING…':'CLANG','Drag anywhere · release to drop');
 data({kills,saved,gate,craneX:Number(x.toFixed(2)),ready:t<0,milestone,mobs:mobs.map(m=>({x:Number(m.x.toFixed(2)),friendly:m.friendly,hp:m.hp,done:m.done,stun:Number(m.stun.toFixed(1))})),seconds:Math.floor(seconds)});
}
function drop(){if(w.phase!=='play'||t>=0)return;t=0;struck=false;targetX=x;hero.act('hit');hero.expression='focus';w.tone(310,.07);guideShow(false);ui();}
function newMob(){
 const p=spawnPlan(index++),a=p.friendly?villager(w):critter(w,'zombie',2.05),m={...p,a,x:-4.7,hp:p.armored?2:1,done:false,life:0,stun:0};a.root.position.set(m.x,0,0);a.root.rotation.y=Math.PI/2;
 if(p.armored)w.box(a.root,1,.66,.5,w.mat('#c0c9c6','iron_block'),0,1.22,0);
 if(p.friendly)m.tag=w.label('FRIEND ♥',a.root,V(0,2.35,0),'world-tag blue');mobs.push(m);
 if(index%7===0){const b=critter(w,'zombie',1.9);b.root.position.set(-5.35,0,0);b.root.rotation.y=Math.PI/2;mobs.push({...p,a:b,x:-5.35,hp:1,friendly:false,done:false,life:0,stun:0});}
}
function finish(){hero.act(gate>0?'win':'hurt');w.result({won:gate>0,title:gate>0?'The night shift is yours.':'A few escaped the press.',copy:'Slide the Anvil over a Zombie and release a little ahead of its feet. Let blue-tagged Villagers ride through. Each shift introduces faster and armored threats.',breakdown:kills+' Zombies · '+saved+' Villagers safe · best combo '+bestCombo+' · '+Math.floor(seconds)+'s',next:'ANOTHER BELT SHIFT →',canContinue:gate>0});}
function setCrane(e){if(t>=0)return;const rect=w.renderer.domElement.getBoundingClientRect();targetX=clamp(((e.clientX-rect.left)/rect.width-.5)*(w.camera.right-w.camera.left),-3.75,3.75);x=targetX;}
const game={
 async init(){
  w.scene.background.set('#454951');w.scene.fog.color.set('#454951');w.ground(13,8,0,'stonebrick',0,-.7);
  for(let xx=-5;xx<=5;xx+=1)w.static(xx,3.5,-1.5,1,7,.35,w.mat('#696d6d','stonebrick'));
  for(const xx of[-4.8,4.8]){w.static(xx,4.4,0,.35,8.8,.35,w.mat('#777b77','iron_block'));w.static(xx,8.6,.3,.65,.6,.6,w.mat('#f0cd7c','lamp_on'));}
  w.static(0,RAIL,0,10,.22,.35,w.mat('#c6a464','iron_block'));w.static(0,-.16,0,9.5,.26,1.8,w.mat('#404b4b','iron_block'));
  for(let xx=-4.5;xx<=4.5;xx+=.5){const r=w.box(w.scene,.38,.18,1.65,w.mat('#9b9d8b','iron_block'),xx,-.06,0);rollers.push(r);w.box(w.scene,.16,.04,.35,w.mat(xx%1===0?'#efbc55':'#414740'),xx,.035,.85);}
  for(const xx of[-3.6,3.6]){w.static(xx,1,-1.26,1.1,1.3,.2,w.mat('#d29d4b','lamp_on',{emissive:'#bb622a',emissiveIntensity:.32}));}
  for(const xx of[-3,3]){w.static(xx,3.2,-.8,2,.2,1,w.mat('#8c8e79','iron_block'));w.static(xx,6.6,-1.2,1.1,1.6,.12,w.mat('#809d9e','iron_block'));}for(const xx of[-1.4,1.4]){const gear=new THREE.Mesh(new THREE.TorusGeometry(1.1,.17,4,10),w.mat('#9d8b66','iron_block'));gear.position.set(xx,4.6,-1.23);w.scene.add(gear);rollers.push(gear);}w.flush();hammer=anvil(w,w.scene);hammer.scale.setScalar(1.2);rope=w.box(w.scene,.06,1,.06,w.mat('#d9c794','iron_block'),0,4,0);shadow=w.ring(V(0,.04,0),.83,'#efc96c');
  hero=steve(w);hero.root.position.set(3,3.3,-.8);hero.root.scale.setScalar(.8);hero.root.rotation.y=-Math.PI/2;host=villager(w);host.root.position.set(-3,3.3,-.8);host.root.scale.setScalar(.8);
  w.controls({main:true});help(['Side-view press: drag the hanging Anvil left or right, then release to drop. Space drops at its current position.','Aim a little ahead of a moving Zombie. One hit is 100; crush a group for a combo. Blue-tagged Villagers must pass unharmed.','Armored Zombies need two hits and stop briefly after the first. Five escapes or friendly hits end the shift. Every eight kills powers a new belt shift.']);guide('DRAG THE ANVIL OVER A ZOMBIE · RELEASE TO CLANG');ui();
 },resize(){frame(w,V(0,4,0),w.portrait?4.6:6.2,V(0,2,20),9.6);},
 reset(next){for(const m of mobs){w.scene.remove(m.a.root);if(m.tag)w.removeLabel(m.tag);}mobs=[];kills=0;saved=0;gate=5;index=next?9:0;spawn=.45;seconds=0;bestCombo=0;x=0;targetX=0;t=-1;struck=false;dragging=false;milestone=8;hero.act('idle');w.controls({main:true});guideShow(true);ui();},
 pointer(type,e){if(type==='down'&&t<0){dragging=true;setCrane(e);}if(type==='move'&&dragging)setCrane(e);if(type==='up'&&dragging){dragging=false;drop();}if(type==='cancel')dragging=false;},
 action(id,down){if(id==='main'&&down)drop();},
 update(dt,phase){
  hero.animate(dt,w.time);host.animate(w.time,saved>0);rollers.forEach((r,i)=>{if(r.geometry.type==='TorusGeometry')r.rotation.z+=dt;else r.position.y=-.06+Math.sin(w.time*10+i)*.012;});
  if(phase==='play'){
   seconds+=dt;spawn-=dt;if(spawn<=0){newMob();spawn=Math.max(1.05,2.1-index*.012);}
   for(const m of mobs){m.stun=Math.max(0,m.stun-dt);if(m.friendly)m.a.animate(w.time,false,!m.done&&!m.stun?1:0);else m.a.animate(dt,w.time,!m.done&&!m.stun?1:0);
    if(!m.done){if(!m.stun)m.x+=dt*m.speed;m.a.root.position.x=m.x;if(m.x>4.6){m.done=true;if(m.friendly){saved++;w.score+=75;w.notice('VILLAGER SAFE · +75','good',1);}else{gate--;hero.act('hurt');w.notice('ZOMBIE ESCAPED · Gate −1','bad',1.8);w.thump();}ui();}}
    else{m.life+=dt;m.a.root.scale.multiplyScalar(Math.max(.01,1-dt*2.5));if(m.life>.8){w.scene.remove(m.a.root);if(m.tag)w.removeLabel(m.tag);}}
   }mobs=mobs.filter(m=>!m.done||m.life<=.8);
   if(t>=0){t+=dt;if(t>=.25&&!struck){struck=true;let dead=0,friendly=0;for(const m of strikeTargets(mobs,x)){m.hp--;if(m.hp<=0){m.done=true;m.life=0;if(m.friendly){friendly++;gate--;}else{dead++;kills++;}}else{m.stun=1.5;m.a.react=1;w.notice('ARMOR CRACKED · Hit once more','good',1.5);}}
     const pts=strikeScore(dead,friendly);w.score=Math.max(0,w.score+pts);bestCombo=Math.max(bestCombo,dead);w.burst(V(x,.3,0),dead?'#c7d4a2':'#b6b9ad',18,2.6);w.thump();w.tone(dead?610:friendly?150:220,.12);
     if(dead)w.notice((dead>1?'DOUBLE CLANG':'ZOMBIE CRUSHED')+' · +'+pts,'good',1.3);if(friendly)w.notice('FRIENDLY HIT · Gate −1, points −100','bad',2);
     if(kills>=milestone){w.score+=250;milestone+=8;w.notice('BELT SHIFT POWERED · +250','good',2);}ui();}
    if(t>1.25){t=-1;ui();}
   }if(gate<=0){finish();return;}if(w.frameNo%12===0)ui();
  }
  hammer.position.set(x,t<0?HANG:t<.25?HANG*(1-(t/.25)**2):t<.48?0:Math.min(HANG,(t-.48)*9),0);
  rope.position.x=x;rope.scale.y=Math.max(.08,RAIL-hammer.position.y-.9);rope.position.y=RAIL-rope.scale.y/2;
  shadow.position.x=x;shadow.material.color.set(mobs.some(m=>!m.done&&!m.friendly&&Math.abs(m.x-x)<.9)?'#b8e99b':'#efc96c');
 },finish
};await w.ready(game);
