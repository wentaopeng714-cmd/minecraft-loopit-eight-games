export const COLS=7, ROWS=9, UNIT=1.65, MAX_RAILS=28, GROUND=.58;
export const START={c:1,r:8}, GOAL={c:5,r:0};
export const GEMS=[{c:1,r:1},{c:4,r:6},{c:5,r:2}];
export const BLOCKED=new Set(['0,0','1,0','0,1','6,0','6,1','6,2','3,6','3,5','2,3','3,2','0,5']);
export const key=p=>`${p.c},${p.r}`;
export const same=(a,b)=>a.c===b.c&&a.r===b.r;
export const pos=p=>({x:(p.c-3)*UNIT,z:(p.r-4)*UNIT});
export const inBounds=p=>p.c>=0&&p.c<COLS&&p.r>=0&&p.r<ROWS;
export function buildable(p){return inBounds(p)&&!BLOCKED.has(key(p))&&(p.r!==4||p.c===1||p.c===5);}
export function addRail(path,cell){
  if(!buildable(cell))return {path,error:cell.r===4?'Use a wooden bridge to cross.':'That spot is blocked.'};
  const found=path.findIndex(p=>same(p,cell));
  if(found>=0)return {path:path.slice(0,found+1),error:null};
  if(path.length>=MAX_RAILS)return {path,error:'Out of rails. Undo a little detour.'};
  const tip=path[path.length-1];
  if(Math.abs(tip.c-cell.c)+Math.abs(tip.r-cell.r)!==1)return {path,error:'Connect to the end of your track.'};
  if(same(tip,GOAL))return {path,error:'Your track is ready to ride.'};
  return {path:[...path,{...cell}],error:null};
}
export function complete(path){return path.length>1&&same(path[0],START)&&same(path[path.length-1],GOAL);}
export function validate(path){
  if(!path.length||!same(path[0],START)||path.length>MAX_RAILS)return false;
  const seen=new Set();
  return path.every((p,i)=>{const k=key(p);if(!buildable(p)||seen.has(k))return false;seen.add(k);return !i||Math.abs(p.c-path[i-1].c)+Math.abs(p.r-path[i-1].r)===1;});
}
export function advanceSpeed(speed,braking,dt){const target=braking?0:2.3;return Math.max(0,Math.min(target>speed?target:Infinity,speed+(target>speed?1.05:-5.7)*dt));}
export function fuseStep(fuse,distance,dt){return Math.max(0,Math.min(1.35,fuse+(distance<1.62?1:-2.7)*dt));}
export function connectRails(path,target,maxSteps=12){
 const existing=path.findIndex(p=>same(p,target));if(existing>=0)return {path:path.slice(0,existing+1),error:null};
 if(!buildable(target))return {path,error:target.r===4?'Use a wooden bridge.':'Choose a glowing tile.'};
 if(complete(path))return {path,error:null};
 const start=path.at(-1),used=new Set(path.slice(0,-1).map(key)),queue=[[start]],seen=new Set([key(start)]);
 while(queue.length){const route=queue.shift(),tip=route.at(-1);if(same(tip,target)){let next=path;for(const cell of route.slice(1)){const result=addRail(next,cell);if(result.error)return result;next=result.path;}return {path:next,error:null};}if(route.length>maxSteps)continue;
 const dirs=[[0,-1],[1,0],[-1,0],[0,1]].sort((a,b)=>(Math.abs(tip.c+a[0]-target.c)+Math.abs(tip.r+a[1]-target.r))-(Math.abs(tip.c+b[0]-target.c)+Math.abs(tip.r+b[1]-target.r)));
 for(const [dc,dr] of dirs){const p={c:tip.c+dc,r:tip.r+dr},k=key(p);if(!buildable(p)||used.has(k)||seen.has(k))continue;seen.add(k);queue.push([...route,p]);}}
 return {path,error:'Tap a closer glowing tile.'};
}
export function shouldHit(distance,speed,stopped,protectedUntil,time){return !stopped&&time>=protectedUntil&&speed>.25&&distance<.78;}
export function patrol(time,phase=0){
 const t=((time+phase)%12+12)%12;
 const smooth=x=>x*x*(3-2*x);
 if(t<2.8)return {offset:-2.4,velocity:0};
 if(t<5){const x=(t-2.8)/2.2;return {offset:-2.4+4.8*smooth(x),velocity:4.8*6*x*(1-x)/2.2};}
 if(t<8)return {offset:2.4,velocity:0};
 if(t<10.2){const x=(t-8)/2.2;return {offset:2.4-4.8*smooth(x),velocity:-4.8*6*x*(1-x)/2.2};}
 return {offset:-2.4,velocity:0};
}
