export const G=11.8, FLOOR=.58, BLAST=2.15, COOLDOWN=1.35;
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function launchVelocity(origin,target,time){return {x:(target.x-origin.x)/time,y:(target.y-origin.y+.5*G*time*time)/time,z:(target.z-origin.z)/time};}
export function flightTime(origin,target){return clamp(.84+Math.hypot(target.x-origin.x,target.z-origin.z)*.045,.95,1.3);}
export function flightPoint(origin,velocity,t){return {x:origin.x+velocity.x*t,y:origin.y+velocity.y*t-.5*G*t*t,z:origin.z+velocity.z*t};}
export function blastDamage(distance,blocked=false){if(distance>BLAST)return 0;return blocked?1:distance<1.12?2:1;}
export function circleBoxHit(p,box,r=.27){const x=clamp(p.x,box.x-box.w/2,box.x+box.w/2),z=clamp(p.z,box.z-box.d/2,box.z+box.d/2);return Math.hypot(p.x-x,p.z-z)<r&&p.y-r<box.top&&p.y+r>FLOOR;}
export function withinTeam(x,z,team){return {x:clamp(x,team===0?-4.05:.65,team===0?-.65:4.05),z:clamp(z,-2.05,2.05)};}
export function coverBetween(a,b,blocks){return blocks.some(block=>{if(!block.alive)return false;for(let t=.15;t<.95;t+=.1){const x=a.x+(b.x-a.x)*t,z=a.z+(b.z-a.z)*t;if(Math.abs(x-block.x)<block.w/2+.08&&Math.abs(z-block.z)<block.d/2+.08)return true;}return false;});}
export function stepProjectile(p,dt,blocks){
 const previous={...p.position};p.velocity.y-=G*dt;p.position.x+=p.velocity.x*dt;p.position.y+=p.velocity.y*dt;p.position.z+=p.velocity.z*dt;
 let bounced=false,hit=null;
 for(const b of blocks){if(!b.alive||!circleBoxHit(p.position,b))continue;hit=b;bounced=true;
  if(previous.y-.27>=b.top-.08&&p.velocity.y<0){p.position.y=b.top+.29;p.velocity.y=Math.abs(p.velocity.y)*.34;p.velocity.x*=.72;p.velocity.z*=.72;}
  else if(Math.abs(previous.x-b.x)>b.w/2+.12){p.position.x=previous.x;p.velocity.x*=-.36;p.velocity.z*=.78;}
  else{p.position.z=previous.z;p.velocity.z*=-.36;p.velocity.x*=.78;}
  break;
 }
 if(p.position.y<FLOOR+.37){p.position.y=FLOOR+.37;if(Math.abs(p.velocity.y)>1){p.velocity.y=Math.abs(p.velocity.y)*.31;p.velocity.x*=.34;p.velocity.z*=.34;bounced=true;}else p.velocity.y=0;p.velocity.x*=Math.exp(-dt*5);p.velocity.z*=Math.exp(-dt*5);}
 if(Math.abs(p.position.x)>4.48){p.position.x=clamp(p.position.x,-4.48,4.48);p.velocity.x*=-.3;bounced=true;}
 if(Math.abs(p.position.z)>2.48){p.position.z=clamp(p.position.z,-2.48,2.48);p.velocity.z*=-.3;bounced=true;}
 return {bounced,hit};
}
export function predict(origin,target,blocks){const v=launchVelocity(origin,target,flightTime(origin,target)),p={position:{...origin},velocity:{...v}},points=[{...origin}];for(let i=0;i<129;i++){stepProjectile(p,1/60,blocks);if(i%5===0)points.push({...p.position});}return {points,landing:{...p.position},velocity:v};}
