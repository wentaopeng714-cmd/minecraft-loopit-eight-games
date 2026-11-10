export function tileAt(x,z,n=11,u=.9){const ix=Math.round(x/u)+(n-1)/2,iz=Math.round(z/u)+(n-1)/2;return ix<0||iz<0||ix>=n||iz>=n?null:[ix,iz];}
export function collapseTime(firstStep,now,delay=.95){return firstStep!==null&&now-firstStep>=delay;}
export function chooseNeighbor(x,z,tiles,n=11){const choices=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1]].map(([dx,dz])=>[x+dx,z+dz]).filter(([a,b])=>a>=0&&b>=0&&a<n&&b<n&&tiles[b*n+a]?.alive);choices.sort((a,b)=>(tiles[a[1]*n+a[0]].marked!==null?1:0)-(tiles[b[1]*n+b[0]].marked!==null?1:0));return choices[0]||null;}
