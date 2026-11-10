export function moveExplorer(position,movement,dt,pools=[],bounds=13.5){
 const x=Math.max(-bounds,Math.min(bounds,position.x+movement.x*3.3*dt)),z=Math.max(-15,Math.min(15,position.z+movement.z*3.3*dt));
 const allowed=(a,b)=>pools.every(p=>Math.hypot(a-p.x,b-p.z)>=p.r+.3),out={x:position.x,z:position.z};if(allowed(x,out.z))out.x=x;if(allowed(out.x,z))out.z=z;return out;
}
export function canInvite(player,wolf){return Math.hypot(player.x-wolf.x,player.z-wolf.z)<=3;}
export function deliveryScore(wolves){return Math.max(0,Math.floor(wolves))*200;}

export function arrivedAtCamp(wolf,camp,waiting=false){return !waiting&&Math.hypot(wolf.x-camp.x,wolf.z-camp.z)<=3.7;}
