export function canRespawn(bedHealth){return bedHealth>0;}
export function onBridge(p,bridges){return bridges.some(b=>b.built&&Math.abs(p.x-b.x)<.58&&Math.abs(p.z-b.z)<.58);}
export function finalElimination(bedHealth,health){return bedHealth<=0&&health<=0;}

export function rivalRouteTarget(z){return z< -4.5?-4.3:7.3;}
export function rivalStopDistance(threat){return threat?1.25:.18;}
export function rivalIntent({playerZ,rivalZ,redBed,blueBed,distance,playerAlive=true}){const sameSide=(rivalZ>4.45&&playerZ>4.45)||(rivalZ< -4.45&&playerZ< -4.45)||Math.abs(rivalZ-playerZ)<2.2;const defend=playerZ< -4.5&&redBed>0;return playerAlive&&sameSide&&(distance<3.1||defend||blueBed<=0)?(defend?'DEFENDING BED':'DUELING'):(blueBed>0?'ATTACKING YOUR BED':'HUNTING');}
