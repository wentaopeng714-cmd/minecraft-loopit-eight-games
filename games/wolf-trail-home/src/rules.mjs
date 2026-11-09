export const key=(x,z)=>x+','+z;
export function routeTo(start,end,blocked,bounds={x:3,z:4}){const q=[[start]],seen=new Set([key(...start)]);while(q.length){const path=q.shift(),p=path.at(-1);if(p[0]===end[0]&&p[1]===end[1])return path;for(const d of[[1,0],[-1,0],[0,1],[0,-1]]){const n=[p[0]+d[0],p[1]+d[1]],k=key(...n);if(Math.abs(n[0])>bounds.x||Math.abs(n[1])>bounds.z||blocked.has(k)||seen.has(k))continue;seen.add(k);q.push([...path,n]);}}return [];}
export function rescuePoints(wolves,hits,seconds){return Math.max(0,wolves*200+Math.max(0,300-Math.floor(seconds)*3)-hits*50);}
