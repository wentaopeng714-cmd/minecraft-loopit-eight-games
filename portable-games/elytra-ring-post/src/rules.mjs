export function ringCenter(d){return {x:Math.sin(d/42)*3.1,y:6+Math.sin(d/63)*1.7};}
export function throughRing(x,y,ring,radius=1.55){return Math.hypot(x-ring.x,y-ring.y)<=radius;}
export function flightScore(combo){return 100+Math.min(10,combo)*20;}
