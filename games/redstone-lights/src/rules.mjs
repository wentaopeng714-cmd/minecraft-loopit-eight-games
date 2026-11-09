export const DIRS=[[0,-1],[1,0],[0,1],[-1,0]];
export const LEVELS=[
 {n:3,path:[[0,1],[0,0],[1,0],[1,1],[2,1],[2,2]]},
 {n:3,path:[[0,0],[1,0],[1,1],[0,1],[0,2],[1,2],[2,2],[2,1],[2,0]]},
 {n:4,path:[[0,2],[0,1],[1,1],[1,0],[2,0],[3,0],[3,1],[2,1],[2,2],[3,2],[3,3]]},
 {n:4,path:[[0,3],[0,2],[1,2],[1,1],[0,1],[0,0],[1,0],[2,0],[2,1],[2,2],[2,3],[3,3]]},
 {n:4,path:[[0,0],[0,1],[1,1],[1,0],[2,0],[3,0],[3,1],[2,1],[2,2],[1,2],[0,2],[0,3],[1,3],[2,3],[3,3],[3,2]]}
];
const direction=(a,b)=>DIRS.findIndex(([x,y])=>b[0]-a[0]===x&&b[1]-a[1]===y);
export function makeBoard(level){const l=LEVELS[(level-1)%LEVELS.length],{n,path}=l;const map=new Map();for(let i=0;i<path.length;i++){const p=path[i],prev=path[i-1]||[-1,p[1]],next=path[i+1]||[n,p[1]];map.set(p.join(','),[direction(p,prev),direction(p,next)]);}return {n,start:path[0][1],end:path.at(-1)[1],path,cells:Array.from({length:n*n},(_,i)=>({x:i%n,y:Math.floor(i/n),ports:map.get((i%n)+','+Math.floor(i/n))||((i+level)%2?[0,2]:[0,1]),rot:(i*3+level+Math.floor(i/n))%4}))};}
export function ports(cell){return cell.ports.map(d=>(d+cell.rot)%4);}
export function power(board){const active=new Set(),first=board.cells.find(c=>c.x===0&&c.y===board.start);if(!ports(first).includes(3))return {active,solved:false};const queue=[first];active.add(first.x+','+first.y);while(queue.length){const c=queue.shift();for(const d of ports(c)){const [dx,dy]=DIRS[d],next=board.cells.find(n=>n.x===c.x+dx&&n.y===c.y+dy);if(!next||!ports(next).includes((d+2)%4))continue;const k=next.x+','+next.y;if(!active.has(k)){active.add(k);queue.push(next);}}}const last=board.cells.find(c=>c.x===board.n-1&&c.y===board.end);return {active,solved:active.has(last.x+','+last.y)&&ports(last).includes(1)};}
