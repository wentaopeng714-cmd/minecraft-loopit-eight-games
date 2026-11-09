export function landingAt(x,z,islands){return islands.findIndex(p=>Math.abs(x-p.x)<=p.w/2-.12&&Math.abs(z-p.z)<=p.d/2-.12);}
export function reachPoint(from,to,max=5.4){const dx=to.x-from.x,dz=to.z-from.z,d=Math.hypot(dx,dz),k=d>max?max/d:1;return {x:from.x+dx*k,z:from.z+dz*k};}
export function courseScore(throws,treasures,misses){return Math.max(100,500+treasures*125+Math.max(0,12-throws)*30-misses*50);}
