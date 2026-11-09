import * as THREE from 'three';
import { SkinObject } from 'skinview3d';
import { COLS,ROWS,UNIT,MAX_RAILS,GROUND,START,GOAL,GEMS,BLOCKED,key,same,pos,inBounds,buildable,addRail,complete,advanceSpeed,fuseStep,patrol,connectRails,shouldHit } from './route.mjs';
import {assessDelivery,deliveryGoal} from './goals.mjs';
import './style.css';

const $=id=>document.getElementById(id), game=$('game');
const clamp=THREE.MathUtils.clamp, lerp=THREE.MathUtils.lerp;
const V=(x=0,y=0,z=0)=>new THREE.Vector3(x,y,z);
const state={phase:'loading',path:[{...START}],speed:0,distance:0,brake:false,time:0,rideTime:0,gems:new Set(),brakes:0,toastUntil:0,transition:0,crashTime:0,hearts:3,protectedUntil:0,mustRelease:false,guide:true};
const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.65));
renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
$('world').appendChild(renderer.domElement);renderer.domElement.tabIndex=0;renderer.domElement.setAttribute('aria-label','Railway map. Drag from the cart or use arrow keys to draw.');
const scene=new THREE.Scene();scene.background=new THREE.Color('#c8dfdf');scene.fog=new THREE.Fog('#c8dfdf',23,65);
const camera=new THREE.PerspectiveCamera(45,1,.08,100);
const sun=new THREE.DirectionalLight('#fff0c9',2.45);sun.position.set(-12,24,12);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-18;sun.shadow.camera.right=18;sun.shadow.camera.top=18;sun.shadow.camera.bottom=-18;sun.shadow.camera.far=65;sun.shadow.bias=-.0003;sun.shadow.normalBias=.035;scene.add(sun);
scene.add(new THREE.HemisphereLight('#e9f6f6','#6b7951',2));
const cameraTarget=V(),wantedCamera=V(),wantedTarget=V();
let width=1,height=1,portrait=false;
const loader=new THREE.TextureLoader();
const textureNames=['dirt','stone','cobblestone','grass_block_side','grass_top_green','oak_planks','oak_log','oak_log_top','oak_leaves','steve','creeper','villager','emerald'];
const textures=Object.fromEntries(await Promise.all(textureNames.map(async n=>{const t=await loader.loadAsync(`${import.meta.env.BASE_URL}assets/${n}.png`);t.magFilter=THREE.NearestFilter;t.minFilter=THREE.NearestMipmapNearestFilter;t.colorSpace=THREE.SRGBColorSpace;return[n,t];})));
const material=(color,map,roughness=1)=>new THREE.MeshStandardMaterial({color,map:map?textures[map]:null,roughness});
const mats={grass:material('#b9d38b','grass_top_green'),side:material('#ffffff','grass_block_side'),dirt:material('#b79878','dirt'),stone:material('#d3d5cb','stone'),cobble:material('#e6dfc7','cobblestone'),plank:material('#e4c68b','oak_planks'),log:material('#d9bd8c','oak_log'),logtop:material('#dcc48e','oak_log_top'),leaf:material('#789d45','oak_leaves'),leaf2:material('#a7b958','oak_leaves'),roof:material('#c7764e','oak_planks'),cream:material('#e6d7af','oak_planks'),metal:material('#a3b4b2',null,.47),darkmetal:material('#334746',null,.7),gold:material('#efc96d',null,.6),black:material('#26332c'),window:material('#609196',null,.55),wheat:material('#e7c677'),crop:material('#6e983f'),white:material('#f6eedb')};
const grassMaterials=[mats.side,mats.side,mats.grass,mats.dirt,mats.side,mats.side];
const unitBox=new THREE.BoxGeometry(1,1,1), temp=new THREE.Object3D();
const batches=new Map();
function box(x,y,z,w,h,d,mat,ry=0){let list=batches.get(mat);if(!list)batches.set(mat,list=[]);list.push({x,y,z,w,h,d,ry});}
function finalizeBatches(){for(const [mat,list] of batches){const mesh=new THREE.InstancedMesh(unitBox,mat,list.length);list.forEach((b,i)=>{temp.position.set(b.x,b.y,b.z);temp.scale.set(b.w,b.h,b.d);temp.rotation.set(0,b.ry,0);temp.updateMatrix();mesh.setMatrixAt(i,temp.matrix);});mesh.castShadow=true;mesh.receiveShadow=true;scene.add(mesh);}batches.clear();}
function dynamicBox(parent,w,h,d,mat,x=0,y=0,z=0){const m=new THREE.Mesh(unitBox,mat);m.scale.set(w,h,d);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
const rnd=(()=>{let n=41;return()=>{n=(1664525*n+1013904223)>>>0;return n/4294967296;};})();

// A layered, textured block landscape. Buildable tiles share a continuous ground surface.
for(let r=-2;r<ROWS+3;r++)for(let c=-3;c<COLS+3;c++){
 const p=pos({c,r}),river=r===4;
 if(river){box(p.x,-.58,p.z,UNIT,1.15,UNIT,mats.dirt);continue;}
 box(p.x,.045,p.z,UNIT,1.07,UNIT,grassMaterials);
 if(r===ROWS+2||c===-3||c===COLS+2)box(p.x,-1.1-rnd()*.3,p.z,UNIT,1.5,UNIT,mats.dirt);
}
const waterMat=new THREE.MeshStandardMaterial({color:'#4caaa8',roughness:.35,metalness:.12,transparent:true,opacity:.91});
const water=new THREE.Mesh(new THREE.BoxGeometry(24,.18,1.6),waterMat);water.position.set(0,.25,0);water.receiveShadow=true;scene.add(water);
const ripples=[];for(let i=0;i<22;i++){const m=new THREE.Mesh(new THREE.PlaneGeometry(.25+rnd()*.5,.018),new THREE.MeshBasicMaterial({color:'#c9e8d9',transparent:true,opacity:.32}));m.rotation.x=-Math.PI/2;m.position.set(-11+rnd()*22,.347,(rnd()-.5)*1.2);scene.add(m);ripples.push(m);}
for(const c of [1,5]){const p=pos({c,r:4});box(p.x,.54,0,UNIT,.14,UNIT*1.2,mats.plank);for(const sx of [-.72,.72]){box(p.x+sx,.92,0,.1,.8,UNIT*1.25,mats.log);for(const z of [-.74,.74])box(p.x+sx,.65,z,.17,1.7,.17,mats.log);}}
function tree(x,z,s=1){box(x,1.8*s,z,.43*s,2.7*s,.43*s,mats.log);box(x,3.24*s,z,2*s,1.4*s,2*s,mats.leaf);box(x-.25*s,3.97*s,z+.1*s,1.42*s,.65*s,1.6*s,mats.leaf2);box(x+.75*s,2.82*s,z-.25*s,.85*s,.8*s,1.3*s,mats.leaf);}
for(const [c,r] of [[2,3],[3,2],[0,5]]){const p=pos({c,r});tree(p.x,p.z,.78);}
for(let i=0;i<24;i++){const x=(rnd()<.5?-1:1)*(6.5+rnd()*6),z=-10+rnd()*24;if(Math.abs(z)<1.3)continue;tree(x,z,.7+rnd()*.35);}
for(const [c,r] of [[3,6],[3,5]]){const p=pos({c,r});box(p.x,.99,p.z,1.25,.84,1.25,mats.stone);box(p.x+.26,1.62,p.z-.1,.7,.45,.8,mats.cobble);}
for(let i=0;i<32;i++){const c=Math.floor(rnd()*COLS),r=Math.floor(rnd()*ROWS);if(r===4||BLOCKED.has(`${c},${r}`)||same({c,r},START)||same({c,r},GOAL))continue;const p=pos({c,r});const x=p.x+(rnd()-.5)*1.2,z=p.z+(rnd()-.5)*1.2;box(x,.68,z,.055,.2,.055,mats.crop);if(i%3===0)box(x,.8,z,.13,.1,.13,i%2?mats.white:mats.gold);}
function fence(x,z,count,axis='x'){for(let i=0;i<=count;i++){box(x+(axis==='x'?i*.8:0),1,z+(axis==='z'?i*.8:0),.15,.9,.15,mats.log);}box(x+(axis==='x'?count*.4:0),1.1,z+(axis==='z'?count*.4:0),axis==='x'?count*.8:.08,.13,axis==='z'?count*.8:.08,mats.plank);}
function house(x,z,w=2.8){box(x,1.8,z,w,2.5,2.9,mats.cream);for(const a of [-1,1])for(const b of [-1,1])box(x+a*(w/2-.1),1.75,z+b*1.35,.2,2.7,.2,mats.log);for(let i=0;i<4;i++){const y=3.05+i*.29,ww=w+.7-i*.63;box(x,y,z,ww,.3,3.45,mats.roof);}box(x,1.35,z+1.48,.58,1.55,.12,mats.log);box(x-.9,1.9,z+1.49,.65,.62,.05,mats.window);box(x+.9,1.9,z+1.49,.65,.62,.05,mats.window);box(x-.9,1.9,z+1.55,.04,.68,.04,mats.cream);box(x+.9,1.9,z+1.55,.04,.68,.04,mats.cream);box(x+1.05,3.6,z-.75,.4,1,.4,mats.cobble);}
house(-4.2,-7.65,2.8);house(7.3,-8.3,3);house(-8.9,-9.5,3.2);
fence(-5.6,-5.8,3);fence(6.35,-3.4,3,'z');
for(let row=0;row<4;row++)for(let col=0;col<5;col++){box(6.75+row*.3,.65,-5+col*.4,.15,.12,.3,mats.dirt);box(6.75+row*.3,.95,-5+col*.4,.045,.48,.045,mats.wheat);}
const goalPos=pos(GOAL),startPos=pos(START);
box(goalPos.x,.66,goalPos.z-1.1,3.5,.18,3.5,mats.plank);
for(const x of [goalPos.x-1.4,goalPos.x+1.4])box(x,1.85,goalPos.z-1.15,.2,2.5,.2,mats.log);
box(goalPos.x,3.15,goalPos.z-1.15,3.45,.28,2.9,mats.roof);
box(goalPos.x,2.7,goalPos.z+.1,2.7,.61,.15,mats.log);
function sign(text,w=512,h=128,color='#faebbb',bg='#574c32'){const cv=document.createElement('canvas');cv.width=w;cv.height=h;const cx=cv.getContext('2d');cx.fillStyle=bg;cx.fillRect(0,0,w,h);cx.strokeStyle='#d4bd7a';cx.lineWidth=7;cx.strokeRect(8,8,w-16,h-16);cx.fillStyle=color;cx.font=`${h*.4}px Silkscreen,monospace`;cx.textAlign='center';cx.textBaseline='middle';cx.fillText(text,w/2,h/2+1);const tex=new THREE.CanvasTexture(cv);tex.colorSpace=THREE.SRGBColorSpace;return tex;}
const stationSign=new THREE.Mesh(new THREE.PlaneGeometry(2.54,.55),new THREE.MeshStandardMaterial({map:sign('OAKVALE')}));stationSign.position.set(goalPos.x,2.71,goalPos.z+.185);scene.add(stationSign);
const flags=[];for(const x of [-1.7,1.7]){box(goalPos.x+x,2.08,goalPos.z-.2,.045,2.9,.045,mats.log);const f=new THREE.Mesh(new THREE.PlaneGeometry(.62,.43,4,1),new THREE.MeshStandardMaterial({color:'#ecb858',side:THREE.DoubleSide,roughness:1}));f.position.set(goalPos.x+x+.3,3.2,goalPos.z-.2);scene.add(f);flags.push(f);}
function torch(x,z){box(x,1,z,.11,.8,.11,mats.log);box(x,1.42,z,.2,.16,.2,mats.gold);const flame=new THREE.Mesh(new THREE.OctahedronGeometry(.13),new THREE.MeshBasicMaterial({color:'#ffe9a2'}));flame.position.set(x,1.59,z);scene.add(flame);return flame;}
const flames=[torch(startPos.x-.95,startPos.z-.5),torch(goalPos.x-1.6,goalPos.z+.45),torch(goalPos.x+1.6,goalPos.z+.45)];
for(let i=0;i<7;i++){const x=-18+i*6;box(x,1+rnd()*3,-20,4+rnd()*4,6+rnd()*7,5,mats.stone);box(x,5+rnd()*4,-20,3,1,4,mats.leaf2);}
finalizeBatches();
const clouds=[];for(let i=0;i<7;i++){const group=new THREE.Group();for(let j=0;j<4;j++)dynamicBox(group,2+j*.3,.6+j*.1,1.7,mats.white,j*1.4,.3*(j%2),j%2);group.position.set(-22+i*7,11+rnd()*3,-18+rnd()*5);scene.add(group);clouds.push(group);}

// Real Minecraft skin geometry and UVs, supplied by the MIT skinview3d component.
function makeSteve(){const root=new THREE.Group(),skin=new SkinObject();skin.map=textures.steve;skin.modelType='default';skin.scale.setScalar(.057);root.add(skin);skin.position.y=1.368;skin.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});return {root,skin};}
const steve=makeSteve();
const cart=new THREE.Group();scene.add(cart);
dynamicBox(cart,1.16,.12,1.56,mats.darkmetal,0,.22,0);
dynamicBox(cart,1.03,.14,1.4,mats.plank,0,.31,0);
for(const side of [-1,1]){dynamicBox(cart,.1,.48,1.5,mats.metal,side*.56,.51,0);dynamicBox(cart,.14,.08,1.65,mats.darkmetal,side*.56,.78,0);}
for(const side of [-1,1]){dynamicBox(cart,1.18,.49,.1,mats.metal,0,.51,side*.75);dynamicBox(cart,1.27,.08,.13,mats.darkmetal,0,.78,side*.75);}
dynamicBox(cart,.9,.15,.35,mats.plank,0,.48,-.15);
for(const x of [-.46,.46])for(const z of [-.76,.76])dynamicBox(cart,.08,.08,.035,mats.darkmetal,x,.57,z);
const wheels=[];for(const x of [-.64,.64])for(const z of [-.5,.5]){const g=new THREE.Group();g.position.set(x,.22,z);g.rotation.z=Math.PI/2;const m=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,.13,12),mats.darkmetal);m.castShadow=true;g.add(m);const hub=new THREE.Mesh(new THREE.CylinderGeometry(.095,.095,.145,8),mats.metal);g.add(hub);cart.add(g);wheels.push(g);}
cart.add(steve.root);steve.skin.position.y=1.1;steve.skin.leftLeg.rotation.x=-Math.PI*.48;steve.skin.rightLeg.rotation.x=-Math.PI*.48;steve.skin.leftArm.rotation.x=-1.18;steve.skin.rightArm.rotation.x=-1.18;steve.skin.leftArm.rotation.z=-.04;steve.skin.rightArm.rotation.z=.04;
cart.position.set(startPos.x,GROUND+.13,startPos.z);cart.rotation.y=.25;
const eyelids=[];const eyelidMat=material('#be9272');for(const x of [-2,2]){const lid=new THREE.Mesh(new THREE.BoxGeometry(2,1.1,.04),eyelidMat);lid.position.set(x,3.6,4.025);lid.visible=false;steve.skin.head.add(lid);eyelids.push(lid);}

function skinBox(w,h,d,u,v,tex,scale){const geo=new THREE.BoxGeometry(w*scale,h*scale,d*scale);const uv=geo.attributes.uv;const W=tex.image.width,H=tex.image.height;const faces=[[u+d+w,v+d,d,h],[u,v+d,d,h],[u+d,v,w,d],[u+d+w,v,w,d],[u+d,v+d,w,h],[u+2*d+w,v+d,w,h]];faces.forEach(([x,y,fw,fh],i)=>{const values=[[x,y],[x+fw,y],[x,y+fh],[x+fw,y+fh]];values.forEach(([px,py],j)=>uv.setXY(i*4+j,px/W,1-py/H));});return geo;}
const creepers=[];
for(const [c,r,phase] of [[5,6,0],[5,2,3.1],[1,2,1.5]]){
 const root=new THREE.Group(),s=.068,mat=new THREE.MeshStandardMaterial({map:textures.creeper,roughness:1});
 const add=(w,h,d,u,v,x,y,z,parent=root)=>{const m=new THREE.Mesh(skinBox(w,h,d,u,v,textures.creeper,s),mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;};
 const head=add(8,8,8,0,0,0,22*s,0);add(8,12,4,16,16,0,12*s,0);
 const legs=[];for(const x of [-2*s,2*s])for(const z of [-2*s,2*s]){const joint=new THREE.Group();joint.position.set(x,6*s,z);root.add(joint);add(4,6,4,0,16,0,-3*s,0,joint);legs.push(joint);}
 const center=pos({c,r});root.position.set(center.x+1.7,GROUND,center.z);scene.add(root);
 const signal=new THREE.Group();signal.position.set(center.x+.94,GROUND,center.z+.56);dynamicBox(signal,.09,1.55,.09,mats.log,0,.77,0);dynamicBox(signal,.34,.48,.22,mats.darkmetal,0,1.42,0);const lamp=new THREE.Mesh(new THREE.BoxGeometry(.21,.2,.03),new THREE.MeshBasicMaterial({color:'#8fa65b'}));lamp.position.set(0,1.42,.13);signal.add(lamp);scene.add(signal);
 creepers.push({root,head,legs,mat,center,c,r,phase,fuse:0,lamp});
}
const villager=new THREE.Group();villager.position.set(goalPos.x+1.15,GROUND+.18,goalPos.z+.35);scene.add(villager);
const robe=material('#786049','oak_planks'),skinMat=material('#bd9471'),brow=material('#463c30');
const villagerMat=new THREE.MeshStandardMaterial({map:textures.villager,roughness:1});const vBody=new THREE.Mesh(skinBox(8,12,6,16,20,textures.villager,.074),villagerMat);vBody.position.y=.96;vBody.castShadow=true;villager.add(vBody);dynamicBox(villager,.64,.35,.4,robe,0,.62,0);const vHead=new THREE.Group();vHead.position.y=1.52;villager.add(vHead);const vFace=new THREE.Mesh(skinBox(8,10,8,0,0,textures.villager,.074),villagerMat);vFace.position.y=.16;vFace.castShadow=true;vHead.add(vFace);const vNose=new THREE.Mesh(skinBox(2,4,2,24,0,textures.villager,.074),villagerMat);vNose.position.set(0,.04,.36);vHead.add(vNose);const vArms=dynamicBox(villager,.78,.2,.2,robe,0,1.11,.36);for(const x of [-.16,.16])dynamicBox(villager,.2,.54,.25,mats.darkmetal,x,.29,0);
villager.rotation.y=-.55;

const gemObjects=GEMS.map((p,i)=>{const q=pos(p);const group=new THREE.Group();group.position.set(q.x,1.18,q.z);const a=new THREE.Mesh(new THREE.OctahedronGeometry(.25,0),new THREE.MeshStandardMaterial({color:'#6ed39c',emissive:'#235a39',emissiveIntensity:.4,roughness:.25,metalness:.15}));a.scale.set(.75,1.2,.65);group.add(a);const ring=new THREE.Mesh(new THREE.RingGeometry(.32,.35,24),new THREE.MeshBasicMaterial({color:'#e3e8af',side:THREE.DoubleSide,transparent:true,opacity:.5}));ring.rotation.x=-Math.PI/2;ring.position.y=-.54;group.add(ring);scene.add(group);return{p,group,ring,baseY:1.18,index:i};});
const tipMarker=new THREE.Group();const tipRing=new THREE.Mesh(new THREE.RingGeometry(.74,.82,4),new THREE.MeshBasicMaterial({color:'#fff2b9',side:THREE.DoubleSide,depthWrite:false}));tipRing.rotation.x=-Math.PI/2;tipRing.rotation.z=Math.PI/4;tipMarker.add(tipRing);tipMarker.position.set(startPos.x,GROUND+.035,startPos.z);scene.add(tipMarker);
const goalRing=new THREE.Mesh(new THREE.RingGeometry(.6,.68,4),new THREE.MeshBasicMaterial({color:'#dded9e',side:THREE.DoubleSide}));goalRing.rotation.x=-Math.PI/2;goalRing.rotation.z=Math.PI/4;goalRing.position.set(goalPos.x,GROUND+.045,goalPos.z);scene.add(goalRing);
const hover=new THREE.Mesh(new THREE.PlaneGeometry(UNIT*.91,UNIT*.91),new THREE.MeshBasicMaterial({color:'#e4efb1',transparent:true,opacity:.32,depthWrite:false,side:THREE.DoubleSide}));hover.rotation.x=-Math.PI/2;hover.position.y=GROUND+.025;hover.visible=false;scene.add(hover);
const gridPoints=[];for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++){if(!buildable({c,r}))continue;const p=pos({c,r}),d=UNIT*.46,s=.2;for(const x of [-1,1])for(const z of [-1,1]){gridPoints.push(p.x+x*d,GROUND+.012,p.z+z*d,p.x+x*(d-s),GROUND+.012,p.z+z*d,p.x+x*d,GROUND+.012,p.z+z*d,p.x+x*d,GROUND+.012,p.z+z*(d-s));}}const gridGeo=new THREE.BufferGeometry();gridGeo.setAttribute('position',new THREE.Float32BufferAttribute(gridPoints,3));const gridLines=new THREE.LineSegments(gridGeo,new THREE.LineBasicMaterial({color:'#edf3be',transparent:true,opacity:.62}));gridLines.visible=false;scene.add(gridLines);

const neighborGroup=new THREE.Group();scene.add(neighborGroup);
const neighborTiles=[];for(let i=0;i<4;i++){const tile=new THREE.Mesh(new THREE.PlaneGeometry(UNIT*.84,UNIT*.84),new THREE.MeshBasicMaterial({color:'#f5e7a0',side:THREE.DoubleSide,transparent:true,opacity:.4,depthWrite:false}));tile.rotation.x=-Math.PI/2;tile.visible=false;neighborGroup.add(tile);neighborTiles.push(tile);}
function updateNeighbors(){const tip=state.path.at(-1),cells=[[0,-1],[1,0],[-1,0],[0,1]].map(([dc,dr])=>({c:tip.c+dc,r:tip.r+dr}));cells.forEach((cell,i)=>{const tile=neighborTiles[i];tile.visible=!complete(state.path)&&buildable(cell)&&!state.path.some(p=>same(p,cell));if(tile.visible){const p=pos(cell);tile.position.set(p.x,GROUND+.025,p.z);}});}
const guideCells=[...Array.from({length:8},(_,i)=>({c:1,r:8-i})),...Array.from({length:4},(_,i)=>({c:2+i,r:1})),{...GOAL}];
const guideGroup=new THREE.Group();scene.add(guideGroup);const guideDots=[];for(let i=1;i<guideCells.length;i++){const a=pos(guideCells[i-1]),b=pos(guideCells[i]);for(let j=1;j<=4;j++){const dot=new THREE.Mesh(new THREE.BoxGeometry(.13,.035,.13),new THREE.MeshBasicMaterial({color:'#fff2ba'}));dot.position.set(lerp(a.x,b.x,j/4),GROUND+.06,lerp(a.z,b.z,j/4));guideGroup.add(dot);guideDots.push(dot);}}
$('hint').onclick=()=>{state.guide=!state.guide;$('hint').textContent=state.guide?'GUIDE ON':'GUIDE OFF';};
function mapLabel(id,point,yOffset=0){const p=point.clone().project(camera),el=$(id);el.style.left=((p.x+1)*width/2)+'px';el.style.top=((1-p.y)*height/2+yOffset)+'px';}
let railGroup=new THREE.Group(),curve=null,totalLength=0;scene.add(railGroup);
class OffsetCurve extends THREE.Curve {constructor(source,offset){super();this.source=source;this.offset=offset;}getPoint(t,target=V()){const p=this.source.getPoint(t),d=this.source.getTangent(t);return target.set(p.x+d.z*this.offset,p.y,p.z-d.x*this.offset);}}
function disposeGroup(g){g.traverse(o=>{if(o.geometry&&o.geometry!==unitBox)o.geometry.dispose();});scene.remove(g);}
function rebuildRails(){
 disposeGroup(railGroup);railGroup=new THREE.Group();scene.add(railGroup);
 if(state.path.length<2){curve=null;totalLength=0;return;}
 const points=state.path.map(p=>{const q=pos(p);return V(q.x,GROUND+.1,q.z);});curve=new THREE.CatmullRomCurve3(points,false,'centripetal');curve.arcLengthDivisions=600;totalLength=curve.getLength();
 const n=Math.ceil(totalLength/.3),ties=new THREE.InstancedMesh(unitBox,mats.plank,n+1);ties.castShadow=true;ties.receiveShadow=true;
 for(let i=0;i<=n;i++){const t=i/n,p=curve.getPointAt(t),d=curve.getTangentAt(t);temp.position.set(p.x,GROUND+.035,p.z);temp.scale.set(.98,.075,.17);temp.rotation.set(0,Math.atan2(d.x,d.z),0);temp.updateMatrix();ties.setMatrixAt(i,temp.matrix);}railGroup.add(ties);
 for(const offset of [-.3,.3]){const m=new THREE.Mesh(new THREE.TubeGeometry(new OffsetCurve(curve,offset),Math.max(16,state.path.length*10),.042,5,false),mats.metal);m.castShadow=true;m.receiveShadow=true;railGroup.add(m);}
}

const particles=[];const particleGeo=new THREE.BoxGeometry(1,1,1);
function burst(point,color,count=12,power=1){const mat=new THREE.MeshStandardMaterial({color,roughness:1});for(let i=0;i<count;i++){const mesh=new THREE.Mesh(particleGeo,mat);mesh.scale.setScalar(.045+rnd()*.085);mesh.position.copy(point);scene.add(mesh);particles.push({mesh,v:V((rnd()-.5)*power,(.8+rnd())*power,(rnd()-.5)*power),life:.5+rnd()*.6,max:1});}}

let audio=null,muted=false,engine=null,engineGain=null,hissGain=null;
function startAudio(){if(audio){audio.resume();return;}audio=new(window.AudioContext||window.webkitAudioContext)();engineGain=audio.createGain();engineGain.gain.value=0;engineGain.connect(audio.destination);engine=audio.createOscillator();engine.type='triangle';engine.frequency.value=45;engine.connect(engineGain);engine.start();const buffer=audio.createBuffer(1,audio.sampleRate*2,audio.sampleRate),data=buffer.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*.3;const source=audio.createBufferSource();source.buffer=buffer;source.loop=true;const filter=audio.createBiquadFilter();filter.type='highpass';filter.frequency.value=3500;hissGain=audio.createGain();hissGain.gain.value=0;source.connect(filter);filter.connect(hissGain);hissGain.connect(audio.destination);source.start();}
function tone(f,d=.09,type='triangle',gain=.06,delay=0){if(!audio||muted)return;const o=audio.createOscillator(),g=audio.createGain(),t=audio.currentTime+delay;o.type=type;o.frequency.setValueAtTime(f,t);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(gain,t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(audio.destination);o.start(t);o.stop(t+d+.01);}
function chime(){[523,659,784,1047].forEach((f,i)=>tone(f,.3,'sine',.055,i*.12));}

function toast(message,duration=2.1,danger=false){$('toast').textContent=message;$('toast').classList.add('visible');$('toast').classList.toggle('danger',danger);state.toastUntil=state.time+duration;}
function phase(value){state.phase=value;game.dataset.phase=value;}
function show(id,visible){$(id).classList.toggle('hidden',!visible);}
let career={arrival:false,cargo:0,clean:false,routes:[],best:0};try{const r=JSON.parse(localStorage.getItem('minecart-routebook')||'{}');career={arrival:!!r.arrival,cargo:Math.min(3,Math.max(0,Number(r.cargo)||0)),clean:!!r.clean,routes:Array.isArray(r.routes)?r.routes.filter(x=>typeof x==='string').slice(-60):[],best:Math.max(0,Number(r.best)||0)};}catch{}
function goalUI(){const building=state.phase==='build',planned=GEMS.filter(g=>state.path.some(p=>same(p,g))).length,cargo=building?planned:state.gems.size,arrived=['arriving','success'].includes(state.phase),ready=complete(state.path),progress=totalLength?Math.round(state.distance/totalLength*100):0;
 $('journey-goals').innerHTML=`<span class="${ready?'done':'active'}">${ready?'✓':'1'} TRACK</span><span class="${cargo===3?'done':ready?'active':''}">2 ${building?'PLAN':'CARGO'} ${cargo}/3</span><span class="${arrived?'done':!building?'active':''}">${arrived?'✓':3} ${arrived?'ARRIVED':building?'OAKVALE':progress+'% TO OAKVALE'}</span>`;
 $('live-points').textContent=building?'100 PTS / EMERALD':state.gems.size*100+' CARGO PTS';$('career-goal').textContent=deliveryGoal(career);$('emerald-label').textContent=building?'ON ROUTE / 3':'COLLECTED / 3';}
function updateBuildUI(){const ready=complete(state.path);$('rail-count').textContent=MAX_RAILS-state.path.length;$('emerald-count').textContent=GEMS.filter(g=>state.path.some(p=>same(p,g))).length;$('ride').disabled=!ready;$('ride').innerHTML=ready?'RIDE MY TRACK <span>→</span>':'REACH THE STATION <span>→</span>';$('build-hint-title').textContent=ready?'Connected! Let’s ride.':'Drag or tap a glowing tile.';$('build-hint-sub').textContent=ready?'Hold to go. Release to stop. Three hearts.':'Follow the dots, or make your own route.';const tip=pos(state.path.at(-1));tipMarker.position.set(tip.x,GROUND+.035,tip.z);game.dataset.route=state.path.map(key).join(';');game.dataset.ready=String(ready);updateNeighbors();goalUI();}
function updateHearts(){$('heart-count').textContent='♥'.repeat(state.hearts)+'♡'.repeat(3-state.hearts);$('heart-stat').setAttribute('aria-label',state.hearts+' hearts remaining');game.dataset.hearts=String(state.hearts);}
function beginBuild(clear=false){phase('build');state.transition=0;state.brake=false;state.speed=0;state.distance=0;state.rideTime=0;if(clear)state.path=[{...START}];for(const c of creepers){c.fuse=0;c.root.visible=true;}for(const g of gemObjects)g.group.visible=true;state.gems.clear();steve.root.visible=true;steve.root.position.set(0,0,0);steve.root.rotation.set(0,0,0);steve.skin.position.y=1.1;steve.skin.leftLeg.rotation.x=-Math.PI*.48;steve.skin.rightLeg.rotation.x=-Math.PI*.48;for(const part of ['head','body','leftLeg','rightLeg'])steve.skin[part].visible=true;cart.position.set(startPos.x,GROUND+.13,startPos.z);cart.rotation.set(0,.25,0);cart.scale.setScalar(1);tipMarker.visible=true;goalRing.visible=true;show('intro',false);show('result',false);show('ride-controls',false);show('hud',true);show('build-controls',true);$('step-number').textContent='01';$('step-label').textContent='BUILD YOUR WAY';$('objective').textContent='Connect to Oakvale.';show('mission-strip',true);show('rail-stat',true);show('heart-stat',false);show('crossing-callout',false);rebuildRails();updateBuildUI();renderer.domElement.focus({preventScroll:true});}
function ride(){if(state.phase!=='build'||!complete(state.path)||!curve)return;startAudio();phase('boarding');state.transition=0;state.distance=0;state.speed=0;state.rideTime=0;state.brakes=0;state.brake=true;state.hearts=3;state.protectedUntil=0;state.mustRelease=false;updateHearts();state.gems.clear();creepers.forEach(c=>c.fuse=0);show('build-controls',false);show('ride-controls',true);show('rail-stat',false);show('heart-stat',true);tipMarker.visible=false;hover.visible=false;$('emerald-count').textContent='0';$('step-number').textContent='02';$('step-label').textContent='ENJOY THE RIDE';$('objective').textContent='Next stop: Oakvale Station';$('go-label').textContent='HOLD TO GO';$('go-sub').textContent='Let go to stop · Hold Space on desktop';goalUI();toast('Hold = move · Release = stop · Reach Oakvale to earn 500 points.',3);tone(440,.2,'sine',.04);}
function setGo(held){if(!['ride','boarding'].includes(state.phase))return;if(!held)state.mustRelease=false;if(held&&state.mustRelease)return;if(!held&&!state.brake){state.brakes++;tone(180,.12,'triangle',.025);}state.brake=!held;$('brake').classList.toggle('pressed',held);}
function takeHit(c){state.hearts--;updateHearts();c.root.visible=false;c.fuse=0;state.protectedUntil=state.time+2.5;state.speed=0;state.brake=true;state.mustRelease=true;state.distance=Math.max(0,state.distance-1.3);$('brake').classList.remove('pressed');burst(cart.position.clone().add(V(0,.8,0)),'#e2b576',24,2.5);tone(95,.24,'sawtooth',.045);if(state.hearts<=0){finish(false);return;}toast('Bump! '+state.hearts+' hearts left. Release, then hold to continue.',3,true);}
function finish(success){if(!['ride','boarding'].includes(state.phase))return;phase(success?'arriving':'crash');state.transition=0;state.crashTime=0;state.brake=true;$('brake').classList.remove('pressed');show('ride-controls',false);show('crossing-callout',false);show('hud',false);show('mission-strip',false);$('toast').classList.remove('visible');hover.visible=false;if(success){chime();burst(cart.position.clone().add(V(0,1,0)),'#e7cf78',25,1.5);}else{for(const c of creepers)if(c.root.position.distanceTo(cart.position)<2.4)c.root.visible=false;tone(90,.3,'sawtooth',.065);burst(cart.position.clone().add(V(0,.8,0)),'#c29364',38,3.5);burst(cart.position.clone().add(V(0,1.2,0)),'#e9c56f',18,2.7);}}
function result(success){phase(success?'success':'failure');show('result',true);const delivery=assessDelivery(success,state.gems.size,state.hearts);if(success){career.arrival=true;career.cargo=Math.max(career.cargo,state.gems.size);career.clean=career.clean||state.hearts===3;const route=state.path.map(key).join(';');if(!career.routes.includes(route))career.routes.push(route);career.routes=career.routes.slice(-60);}career.best=Math.max(career.best,delivery.score);try{localStorage.setItem('minecart-routebook',JSON.stringify(career));}catch{}
 $('result-tag').textContent=success?'DELIVERY COMPLETE':'DELIVERY NOT FINISHED';$('result-title').textContent=success?'Hello, Oakvale!':'Try that crossing again.';$('result-copy').textContent=success?'Your railway reached the station. Collect every emerald and keep all three hearts for all three stamps.':'The railway stays built. Let go before a red crossing, wait for green, then hold to go.';
 $('delivery-score').textContent=delivery.score+' PTS';$('delivery-breakdown').textContent=`Arrival ${delivery.parts.arrival} + Emeralds ${delivery.parts.cargo} + Hearts ${delivery.parts.safety}`;
 $('delivery-stamps').innerHTML=['ARRIVED','3 EMERALDS','3 HEARTS'].map((label,i)=>`<span class="${delivery.stamps[i]?'earned':''}">${delivery.stamps[i]?'★':'☆'} ${label}</span>`).join('');$('next-target').textContent=deliveryGoal(career);$('routebook').textContent=`ROUTEBOOK: ${career.routes.length} unique deliveries · BEST ${career.best} PTS`;
 $('result-stats').innerHTML=`<div><b>${state.gems.size}/3</b><small>EMERALDS</small></div><div><b>${state.hearts}/3</b><small>HEARTS LEFT</small></div><div><b>${Math.ceil(state.rideTime)}s</b><small>RIDE TIME</small></div>`;$('again').innerHTML=success?'BUILD THE NEXT DELIVERY <span>→</span>':'EDIT MY TRACK <span>→</span>';show('retry-ride',true);$('retry-ride').textContent=success?'RIDE THIS TRACK AGAIN':'RETRY THIS DELIVERY';steve.root.visible=true;game.dataset.score=String(delivery.score);}


$('begin').onclick=()=>{startAudio();beginBuild(true);tone(330,.1);};$('ride').onclick=ride;$('undo').onclick=()=>{if(state.path.length>1){state.path.pop();rebuildRails();updateBuildUI();tone(230,.07);}};$('clear').onclick=()=>beginBuild(true);$('edit').onclick=()=>beginBuild();$('again').onclick=()=>beginBuild(state.phase==='success');$('retry-ride').onclick=()=>{beginBuild();ride();};
const brake=$('brake');brake.addEventListener('pointerdown',e=>{e.preventDefault();brake.setPointerCapture(e.pointerId);setGo(true);});for(const name of ['pointerup','pointercancel','lostpointercapture'])brake.addEventListener(name,()=>setGo(false));
$('sound').onclick=()=>{startAudio();muted=!muted;$('sound').classList.toggle('muted',muted);$('sound').setAttribute('aria-label',muted?'Enable sound':'Mute sound');};
let paused=false;function openHelp(){paused=true;show('modal',true);setGo(false);}function closeHelp(){paused=false;show('modal',false);} $('help').onclick=openHelp;$('close-help').onclick=closeHelp;$('got-it').onclick=closeHelp;

const raycaster=new THREE.Raycaster(),groundPlane=new THREE.Plane(V(0,1,0),-GROUND),pointer=new THREE.Vector2();
let dragging=false,lastCell=null;
function pointCell(e){const rect=renderer.domElement.getBoundingClientRect();pointer.set(((e.clientX-rect.left)/rect.width)*2-1,-((e.clientY-rect.top)/rect.height)*2+1);raycaster.setFromCamera(pointer,camera);const p=V();if(!raycaster.ray.intersectPlane(groundPlane,p))return null;return{c:Math.round(p.x/UNIT+3),r:Math.round(p.z/UNIT+4)};}
function appendCell(cell,quiet=false){const old=state.path,result=addRail(old,cell);if(result.error){if(!quiet)toast(result.error,1.3);return false;}if(result.path.length===old.length)return false;state.path=result.path;rebuildRails();updateBuildUI();if(state.path.length>old.length){const q=pos(cell);burst(V(q.x,GROUND+.11,q.z),'#d4bc7f',5,.65);tone(220+(state.path.length%5)*28,.055,'triangle',.035);if(complete(state.path))chime();}return true;}
function drawTo(cell){if(!cell||!inBounds(cell))return;const old=state.path,result=connectRails(old,cell);if(result.error){toast(result.error,1.2);return;}if(result.path.length===old.length&&result.path.every((p,i)=>same(p,old[i])))return;state.path=result.path;rebuildRails();updateBuildUI();const q=pos(state.path.at(-1));burst(V(q.x,GROUND+.11,q.z),'#d4bc7f',6,.65);tone(260,.07,'triangle',.04);if(complete(state.path))chime();}
renderer.domElement.addEventListener('pointerdown',e=>{if(state.phase!=='build'||paused)return;e.preventDefault();startAudio();const cell=pointCell(e);if(!cell)return;dragging=true;lastCell=cell;renderer.domElement.setPointerCapture(e.pointerId);const found=state.path.findIndex(p=>same(p,cell));if(found>=0){state.path=state.path.slice(0,found+1);rebuildRails();updateBuildUI();}else drawTo(cell);});
renderer.domElement.addEventListener('pointermove',e=>{if(state.phase!=='build'||paused)return;const cell=pointCell(e);if(!cell||!inBounds(cell)){hover.visible=false;return;}const p=pos(cell);hover.position.set(p.x,GROUND+.025,p.z);hover.material.color.set(buildable(cell)?'#e9f3b9':'#cf7e5d');hover.visible=true;if(dragging&&(!lastCell||!same(cell,lastCell))){drawTo(cell);lastCell=cell;}});
for(const name of ['pointerup','pointercancel','lostpointercapture'])renderer.domElement.addEventListener(name,()=>{dragging=false;lastCell=null;});
window.addEventListener('keydown',e=>{if(paused){if(e.key==='Escape')closeHelp();return;}if(e.code==='Space'&&['ride','boarding'].includes(state.phase)){e.preventDefault();setGo(true);return;}if(state.phase!=='build')return;const dirs={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0],w:[0,-1],s:[0,1],a:[-1,0],d:[1,0]};if(dirs[e.key]){e.preventDefault();const p=state.path.at(-1),[dc,dr]=dirs[e.key];appendCell({c:p.c+dc,r:p.r+dr});}if(e.key==='Enter')ride();if(e.key==='Backspace'){e.preventDefault();$('undo').click();}});
window.addEventListener('keyup',e=>{if(e.code==='Space')setGo(false);});window.addEventListener('blur',()=>{state.brake=true;$('brake').classList.remove('pressed');});document.addEventListener('visibilitychange',()=>{if(document.hidden){state.brake=true;if(audio)audio.suspend();}else if(audio&&!muted)audio.resume();});

function resize(){width=innerWidth;height=innerHeight;portrait=width<650;renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();}window.addEventListener('resize',resize);resize();
const lookAhead=V(),cartDirection=V(0,0,-1);let lastTick=performance.now(),bump=0;
function targetCamera(){
 const p=pos(START),q=cart.position;
 if(state.phase==='intro'){
  wantedCamera.set(p.x+(portrait?4.3:5.3),portrait?4.8:4.3,p.z+(portrait?5.7:6.1));wantedTarget.set(p.x+(portrait?.15:-1.1),portrait?.9:1.1,p.z-.2);camera.fov=portrait?46:43;
 }else if(state.phase==='build'){
  const aspect=width/height,dist=Math.max(portrait?22:26,14/aspect);wantedCamera.set(1,dist*.88,dist*.7+1);wantedTarget.set(.15,0,portrait?1.05:1.0);camera.fov=43;
 }else if(['boarding','ride'].includes(state.phase)){
  const t=totalLength?clamp(state.distance/totalLength,0,1):0,point=curve.getPointAt(t);const ahead=curve.getPointAt(clamp(t+2.8/totalLength,0,1));cartDirection.copy(ahead).sub(point).normalize();
  wantedCamera.copy(point).addScaledVector(cartDirection,-.22);wantedCamera.y=GROUND+1.36+Math.sin(state.distance*26)*.012*state.speed;wantedTarget.copy(ahead);wantedTarget.y=GROUND+1.27;camera.fov=lerp(camera.fov,portrait?74:69,.06);
 }else{
  wantedCamera.set(q.x+(portrait?.1:1),GROUND+(portrait?3.1:3),q.z+(portrait?8.5:6.2));wantedTarget.set(q.x+(portrait?.1:1.15),GROUND+.25,q.z+.2);camera.fov=portrait?46:43;
 }
 camera.updateProjectionMatrix();
}
let lastHazardMessage=-10;
function tick(now){requestAnimationFrame(tick);const raw=Math.min((now-lastTick)/1000,.045);lastTick=now;const dt=paused||document.hidden?0:raw;state.time+=dt;state.transition+=dt;
 if(state.toastUntil<state.time)$('toast').classList.remove('visible');
 for(const c of creepers){const t=state.time+c.phase,{offset,velocity}=patrol(state.time,c.phase);c.offset=offset;c.root.position.set(c.center.x+offset,GROUND+.01+Math.abs(Math.sin(t*8))*.012*Math.min(1,Math.abs(velocity)),c.center.z);if(Math.abs(velocity)>.01)c.root.rotation.y=velocity>0?Math.PI/2:-Math.PI/2;c.legs.forEach((l,i)=>l.rotation.x=Math.sin(t*11+(i%2?Math.PI:0))*.38*Math.min(1,Math.abs(velocity)));const toward=Math.atan2(cart.position.x-c.root.position.x,cart.position.z-c.root.position.z);c.head.rotation.y=clamp(toward-c.root.rotation.y,-.6,.6);c.lamp.material.color.set(Math.abs(offset)<1.25?'#eb9c54':'#a5d174');if(!['ride','boarding'].includes(state.phase))c.fuse=Math.max(0,c.fuse-dt*3);c.mat.emissive.set(c.fuse>.2&&Math.sin(state.time*22)>0?'#a4ac88':'#000000');c.mat.emissiveIntensity=.7;}
 if(state.phase==='boarding'){const d=curve.getTangentAt(0);cart.rotation.y=lerp(cart.rotation.y,Math.atan2(d.x,d.z),.1);for(const part of ['head','body','leftLeg','rightLeg'])steve.skin[part].visible=state.transition<.45;if(state.transition>.95){phase('ride');state.transition=0;}}
 if(state.phase==='ride'){
  state.rideTime+=dt;state.speed=advanceSpeed(state.speed,state.brake,dt);state.distance=Math.min(totalLength,state.distance+state.speed*dt);const t=state.distance/totalLength,p=curve.getPointAt(t),tangent=curve.getTangentAt(t);cart.position.copy(p);cart.position.y=GROUND+.13+Math.sin(state.distance*22)*.012*state.speed;cart.rotation.y=Math.atan2(tangent.x,tangent.z);cart.rotation.x=lerp(cart.rotation.x,state.brake?.032:-.012,.1);cart.rotation.z=Math.sin(state.distance*3)*.008*state.speed;steve.root.visible=true;for(const part of ['head','body','leftLeg','rightLeg'])steve.skin[part].visible=false;wheels.forEach(w=>w.rotation.y=state.distance/.2);
  let danger=0;for(const c of creepers){if(!c.root.visible)continue;const dist=Math.hypot(c.root.position.x-p.x,c.root.position.z-p.z);c.fuse=fuseStep(c.fuse,dist,dt);danger=Math.max(danger,c.fuse);if(shouldHit(dist,state.speed,state.brake,state.protectedUntil,state.time)){takeHit(c);break;}}
  for(const g of gemObjects)if(!state.gems.has(g.index)&&Math.hypot(g.group.position.x-p.x,g.group.position.z-p.z)<.8){state.gems.add(g.index);g.group.visible=false;tone(880,.18,'sine',.05);tone(1320,.2,'sine',.04,.07);burst(g.group.position.clone(),'#8fdfb1',10,.9);$('emerald-count').textContent=state.gems.size;goalUI();toast('+100 · EMERALD '+state.gems.size+'/3',1.4);}
  const nextCrossing=creepers.filter(c=>c.root.visible).map(c=>({c,index:state.path.findIndex(cell=>Math.abs(cell.c-c.c)<=1&&cell.r===c.r)})).filter(x=>x.index>=0&&(x.index/(state.path.length-1)-t)*totalLength>-.7).sort((a,b)=>a.index-b.index)[0];const closeCrossing=nextCrossing&&(nextCrossing.index/(state.path.length-1)-t)*totalLength<8;const crossingBlocked=closeCrossing&&Math.abs(nextCrossing.c.root.position.x-pos(state.path[nextCrossing.index]).x)<1.25;
  $('journey-label').textContent=closeCrossing?(crossingBlocked?'RED CROSSING · LET GO TO STOP':'GREEN CROSSING · HOLD TO GO'):'NEXT STOP: OAKVALE';
  show('crossing-callout',!!closeCrossing);if(closeCrossing){$('crossing-callout').classList.toggle('red',!!crossingBlocked);$('crossing-callout').textContent=crossingBlocked?'STOP · LET GO':'CLEAR · HOLD TO GO';}
  $('go-label').textContent=state.mustRelease?'RELEASE, THEN HOLD':state.brake?'HOLD TO GO':crossingBlocked?'LET GO TO STOP':'RELEASE TO STOP';$('go-sub').textContent=state.mustRelease?'Your route and emeralds are safe':state.brake?'Press and hold to move':'Let go and the cart brakes';$('brake').classList.toggle('danger',!!crossingBlocked);
  if(hissGain)hissGain.gain.setTargetAtTime(muted?0:danger*.12,audio.currentTime,.05);
  $('speed').textContent=`${Math.round(state.speed*4.2)} km/h`;$('progress').style.width=`${t*100}%`;game.dataset.progress=t.toFixed(3);game.dataset.braking=String(state.brake);goalUI();
  if(state.distance>=totalLength&&state.phase==='ride')finish(true);
 }else if(hissGain)hissGain.gain.setTargetAtTime(0,audio.currentTime,.1);
 if(state.phase==='arriving'){state.speed=Math.max(0,state.speed-dt*3);steve.root.visible=state.transition>.4;if(steve.root.visible)for(const part of ['head','body','leftLeg','rightLeg'])steve.skin[part].visible=true;const u=clamp((state.transition-.4)/1.05,0,1),s=u*u*(3-2*u);steve.root.position.set(.95*s,.04*s+Math.sin(u*Math.PI)*.63,-.85*s);steve.root.rotation.y=Math.PI*s;steve.skin.position.y=lerp(1.1,1.368,s);steve.skin.leftLeg.rotation.x=lerp(-Math.PI*.48,0,s);steve.skin.rightLeg.rotation.x=lerp(-Math.PI*.48,0,s);if(state.transition>1.65)result(true);}
 if(state.phase==='crash'){state.crashTime+=dt;steve.root.visible=state.transition>.4;if(steve.root.visible)for(const part of ['head','body','leftLeg','rightLeg'])steve.skin[part].visible=true;steve.root.rotation.y=lerp(steve.root.rotation.y,-cart.rotation.y,.08);cart.rotation.z=lerp(cart.rotation.z,-.25,.1);cart.position.y=GROUND+.14+Math.abs(Math.sin(state.transition*9))*Math.exp(-state.transition*4)*.4;if(state.transition>1.25)result(false);}
 if(['build','intro','success','failure','arriving'].includes(state.phase)){
  steve.skin.head.rotation.y=lerp(steve.skin.head.rotation.y,state.phase==='build'?Math.sin(state.time*.6)*.2:-.25,.04);steve.skin.head.rotation.x=Math.sin(state.time*.9)*.025;
  const waving=state.phase==='success'||(state.phase==='intro'&&state.time%6<2.1);steve.skin.leftArm.rotation.x=lerp(steve.skin.leftArm.rotation.x,-1.18,.12);steve.skin.rightArm.rotation.x=lerp(steve.skin.rightArm.rotation.x,waving?-.3:-1.18,.12);steve.skin.rightArm.rotation.z=lerp(steve.skin.rightArm.rotation.z,waving?1.8+Math.sin(state.time*6)*.18:.04,.12);
 }
 eyelids.forEach(l=>l.visible=state.time%4.7<.12);gridLines.visible=state.phase==='build';
 vHead.rotation.y=Math.sin(state.time*.7)*.12;vHead.rotation.x=state.phase==='success'?Math.sin(state.time*4)*.1:Math.sin(state.time*.9)*.02;vArms.position.y=1.11+(state.phase==='success'?Math.sin(state.time*6)*.05:Math.sin(state.time*1.6)*.009);
 for(const g of gemObjects){g.group.rotation.y=state.time*.8;g.group.position.y=g.baseY+Math.sin(state.time*2+g.index)*.09;g.ring.position.y=GROUND+.025-g.group.position.y;}
 tipMarker.visible=state.phase==='build';tipMarker.scale.setScalar(1+Math.sin(state.time*3)*.055);goalRing.material.color.set(complete(state.path)?'#fff2b5':'#c4e6a2');
 ripples.forEach((r,i)=>{r.position.x+=dt*.22;if(r.position.x>12)r.position.x=-12;r.material.opacity=.18+Math.sin(state.time*1.4+i)*.09;});clouds.forEach(c=>{c.position.x+=dt*.04;if(c.position.x>30)c.position.x=-30;});flames.forEach((f,i)=>{f.scale.setScalar(1+Math.sin(state.time*9+i)*.08);});flags.forEach((f,i)=>f.rotation.y=Math.sin(state.time*2+i)*.13);
 for(let i=particles.length-1;i>=0;i--){const p=particles[i];p.life-=dt;if(p.life<=0){scene.remove(p.mesh);particles.splice(i,1);continue;}p.v.y-=dt*4;p.mesh.position.addScaledVector(p.v,dt);p.mesh.rotation.x+=dt*3;p.mesh.rotation.z+=dt*2;p.mesh.scale.multiplyScalar(Math.pow(.55,dt));}
 if(engineGain){const active=state.phase==='ride'&&!muted&&!paused;engineGain.gain.setTargetAtTime(active?state.speed*.006:0,audio.currentTime,.1);engine.frequency.setTargetAtTime(38+state.speed*19,audio.currentTime,.1);}
 targetCamera();const k=1-Math.exp(-dt*(state.phase==='ride'?9:3.8));camera.position.lerp(wantedCamera,k);cameraTarget.lerp(wantedTarget,k);camera.lookAt(cameraTarget);
 neighborGroup.visible=state.phase==='build';guideGroup.visible=state.phase==='build'&&state.guide&&!complete(state.path);guideDots.forEach((dot,i)=>dot.material.opacity=.6+Math.sin(state.time*4-i*.3)*.3);show('start-label',state.phase==='build'&&state.path.length===1);show('goal-label',state.phase==='build');if(state.phase==='build'){mapLabel('start-label',V(startPos.x,GROUND+1.9,startPos.z),-10);mapLabel('goal-label',V(goalPos.x,GROUND+.3,goalPos.z),8);}renderer.render(scene,camera);
}
await document.fonts.ready;stationSign.material.map=sign('OAKVALE');phase('intro');targetCamera();camera.position.copy(wantedCamera);cameraTarget.copy(wantedTarget);camera.lookAt(cameraTarget);$('intro-record').textContent=deliveryGoal(career);$('loading').classList.add('hidden');requestAnimationFrame(tick);
