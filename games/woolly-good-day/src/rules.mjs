export function canShear(tool,patchColor){return Number.isInteger(tool)&&tool>=0&&tool<4&&tool===patchColor;}
export function coatPattern(u,v,flock=1){const n=((Math.floor(u/2)+Math.floor(v/2)*2+flock)%7+7)%7;return [0,0,0,1,1,2,3][n];}
