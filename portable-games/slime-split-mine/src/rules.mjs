export function splitVelocity(v,angle=.32){return [-angle,angle].map(a=>({x:v.x*Math.cos(a)-v.z*Math.sin(a),z:v.x*Math.sin(a)+v.z*Math.cos(a)}));}
export function circleBox(p,r,b){const dx=p.x-b.x,dz=p.z-b.z,px=b.w/2+r-Math.abs(dx),pz=b.d/2+r-Math.abs(dz);if(px<=0||pz<=0)return null;return px<pz?{x:Math.sign(dx)||1,z:0,depth:px}:{x:0,z:Math.sign(dz)||1,depth:pz};}
export function mineRow(turn){return Array.from({length:6},(_,i)=>({x:(i-2.5)*.94,z:-5.45,hp:(i+turn)%4===0?3:2,type:(i+turn)%3===0?'diamond_ore':(i+turn)%4===0?'gold_block':'stone',w:.83,d:.83})).filter((_,i)=>(i+turn)%5!==0);}
