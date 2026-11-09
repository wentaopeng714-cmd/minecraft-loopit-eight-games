export function rivalPlan(streak){return {level:streak+1,hp:6+Math.min(2,streak),interval:6-Math.min(3,streak)*.5};}
export function duelScore(damage,cover,won,hearts){const parts={damage:Math.max(0,damage)*100,cover:Math.max(0,cover)*25,victory:won?300:0,survival:won?Math.max(0,hearts)*50:0};return {...parts,total:Object.values(parts).reduce((a,b)=>a+b,0)};}
