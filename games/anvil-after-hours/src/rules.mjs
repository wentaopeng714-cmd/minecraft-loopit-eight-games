export function strikeTargets(mobs,lane,z=0,reach=.82){return mobs.filter(m=>!m.done&&m.lane===lane&&Math.abs(m.z-z)<=reach);}
export function strikeScore(kills,friendlies){return kills*100+(kills>1?(kills-1)*75:0)-friendlies*100;}
export function spawnPlan(index){return {lane:(index*7+Math.floor(index/4))%3,friendly:index%5===3,armored:index>18&&index%4===0,speed:Math.min(2.25,1.05+Math.floor(index/9)*.12)};}
