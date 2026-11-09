export function supported(blocks){const alive=blocks.filter(b=>b.alive&&!b.dynamic),keys=new Set(),q=alive.filter(b=>b.y===0);q.forEach(b=>keys.add(b.key));while(q.length){const b=q.shift();for(const n of alive){if(keys.has(n.key))continue;const d=Math.abs(n.x-b.x)+Math.abs(n.y-b.y)+Math.abs(n.z-b.z);if(d===1){keys.add(n.key);q.push(n);}}}return keys;}
export function blastHits(b,p,radius=1.45){return Math.hypot(b.x-p.x,(b.y-p.y)*.9,b.z-p.z)<radius;}

export function fuseStep(charge,dt){if(charge.done||!charge.lit)return {...charge,explodes:false};const time=Math.max(0,charge.time-dt);return {...charge,time,explodes:time<=0};}
