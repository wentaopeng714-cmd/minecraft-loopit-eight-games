export function waveSize(wave){return Math.min(28,6+wave*2);}
export function canAdvance(spawned,resolved,wave){const n=waveSize(wave);return spawned>=n&&resolved>=n;}
export function chooseUpgrade(state,kind){return kind==='power'?{...state,reach:Math.min(3.3,state.reach+.3)}:{...state,gate:Math.min(6,state.gate+2),hp:Math.min(8,state.hp+2)};}
export function enemyStats(wave,kind='zombie'){const hp=2+Math.floor((wave-1)/2)+(kind==='armored'?2:0);return {hp:kind==='giant'?hp*3:hp,speed:Math.min(2.25,.95+wave*.11)*(kind==='baby'?1.5:kind==='giant'?.72:1),damage:1+Math.floor(wave/6)};}
export function applyWatchUpgrade(state,kind){if(kind==='power')return {...state,damage:state.damage+1};if(kind==='reach')return {...state,reach:Math.min(4.1,state.reach+.2)};return {...state,maxHP:state.maxHP+2,hp:Math.min(state.maxHP+2,state.hp+3),gate:Math.min(6,state.gate+2)};}
