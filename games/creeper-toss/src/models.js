import * as THREE from 'three';
import {SkinObject} from 'skinview3d';
export const SCALE=.072;
export function box(parent,w,h,d,mat,x=0,y=0,z=0){const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;}
export function skinBox(w,h,d,u,v,tex,s){const g=new THREE.BoxGeometry(w*s,h*s,d*s),uv=g.attributes.uv,W=tex.image.width,H=tex.image.height;const faces=[[u+d+w,v+d,d,h],[u,v+d,d,h],[u+d,v,w,d],[u+d+w,v,w,d],[u+d,v+d,w,h],[u+2*d+w,v+d,w,h]];faces.forEach(([x,y,fw,fh],i)=>[[x,y],[x+fw,y],[x,y+fh],[x+fw,y+fh]].forEach(([px,py],j)=>uv.setXY(i*4+j,px/W,1-py/H)));return g;}
export function makeSteve(tex,stone,team){
 const root=new THREE.Group(),body=new THREE.Group();root.add(body);const skin=new SkinObject();skin.map=tex;skin.scale.setScalar(SCALE);skin.position.y=24*SCALE;body.add(skin);
 const color=team===0?'#398dc6':'#c85843',armor=new THREE.MeshStandardMaterial({color,map:stone,roughness:.8,metalness:.06});
 box(skin.body,8.65,8.7,4.65,armor,0,-.8,0);for(const arm of [skin.leftArm,skin.rightArm])box(arm,4.6,3,4.6,armor,0,-2.8,0);
 const trim=new THREE.MeshStandardMaterial({color:team===0?'#a2d8e4':'#f1bc90',roughness:.7});box(skin.body,8.9,.7,4.9,trim,0,3.6,0);
 const grip=new THREE.Group();grip.position.set(0,-10.1,1.65);grip.scale.setScalar(1/SCALE);skin.rightArm.add(grip);
 const face=new THREE.Group();skin.head.add(face);const faceSkin=new THREE.MeshStandardMaterial({color:'#b58a6a',roughness:1}),dark=new THREE.MeshStandardMaterial({color:'#433128',roughness:1}),white=new THREE.MeshStandardMaterial({color:'#fff2d6'});
 const lids=[-2,2].map(x=>box(face,2.1,1.1,.035,faceSkin,x,3.6,4.04));
 const brows=[-2,2].map(x=>box(face,2.2,.45,.035,dark,x,5.15,4.055));
 const mouth=new THREE.Group();face.add(mouth);box(mouth,4,2.6,.03,faceSkin,0,1.25,4.04);const open=box(mouth,1.8,1.7,.035,dark,0,1.2,4.07);const teeth=box(mouth,2.5,.65,.04,white,0,1.8,4.08);const smile=new THREE.Group();mouth.add(smile);box(smile,2,.5,.04,dark,0,.55,4.08);box(smile,.5,1,.04,dark,-1.15,1.1,4.08);box(smile,.5,1,.04,dark,1.15,1.1,4.08);
 function expression(kind,time){const blink=time%4.4<.11;lids.forEach(l=>l.visible=blink||kind==='lose');brows.forEach((b,i)=>{b.visible=kind!=='neutral';b.position.y=kind==='surprise'?5.8:5.1;b.rotation.z=(kind==='focus'? .22:kind==='lose'?-.22:0)*(i?1:-1);});mouth.visible=['surprise','throw','win'].includes(kind);open.visible=kind==='surprise';teeth.visible=kind==='throw';smile.visible=kind==='win';}
 expression('neutral',1);root.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});
 return {root,body,skin,grip,expression,armor};
}
export function makeCreeper(tex,team=0,s=.036){
 const root=new THREE.Group(),model=new THREE.Group();model.position.y=-13*s;root.add(model);const mat=new THREE.MeshStandardMaterial({map:tex,roughness:1});
 const add=(w,h,d,u,v,x,y,z,parent=model)=>{const mesh=new THREE.Mesh(skinBox(w,h,d,u,v,tex,s),mat);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;};
 const head=add(8,8,8,0,0,0,22*s,0);const faceInk=new THREE.MeshStandardMaterial({color:'#102012',roughness:1});for(const [x,y,w,h]of[[-2,1,2,2],[2,1,2,2],[0,-1,2,2],[0,-2,4,2],[-1.5,-3,1,2],[1.5,-3,1,2]]){const face=new THREE.Mesh(new THREE.PlaneGeometry(w*s,h*s),faceInk);face.position.set(x*s,(22+y)*s,4.025*s);model.add(face);}add(8,12,4,16,16,0,12*s,0);const legs=[];for(const x of [-2*s,2*s])for(const z of [-2*s,2*s]){const p=new THREE.Group();p.position.set(x,6*s,z);model.add(p);add(4,6,4,0,16,0,-3*s,0,p);legs.push(p);}
 return {root,head,legs,mat,team};
}
export function makeVillager(tex){
 const root=new THREE.Group(),mat=new THREE.MeshStandardMaterial({map:tex,roughness:1}),robe=new THREE.MeshStandardMaterial({color:'#77604b',roughness:1}),s=.064;
 const head=new THREE.Group();head.position.y=1.37;root.add(head);const h=new THREE.Mesh(skinBox(8,10,8,0,0,tex,s),mat);h.position.y=.13;head.add(h);const nose=new THREE.Mesh(skinBox(2,4,2,24,0,tex,s),mat);nose.position.set(0,.01,.32);head.add(nose);const body=new THREE.Mesh(skinBox(8,12,6,16,20,tex,s),mat);body.position.y=.89;root.add(body);box(root,.56,.32,.35,robe,0,.53,0);const arms=box(root,.7,.18,.2,robe,0,1.03,.29);for(const x of [-.14,.14])box(root,.19,.48,.23,robe,x,.24,0);root.traverse(o=>{if(o.isMesh)o.castShadow=true;});return {root,head,arms};
}
