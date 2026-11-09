export const VISITORS=[{at:4,kind:'rabbit',food:1},{at:7,kind:'wolf',food:3},{at:10,kind:'horse',food:4},{at:13,kind:'cat',food:5}];
export function farmFoods(served,day=1){return [0,1,2,...VISITORS.filter(v=>day>1||served>=v.at).map(v=>v.food)].filter((v,i,a)=>a.indexOf(v)===i);}
export function farmCapacity(served,day=1){return 12+(farmFoods(served,day).length-3)*2;}
export function farmVisitor(served){return VISITORS.find(v=>v.at===served)||null;}
export function orderKind(index,served,day=1){const list=['sheep','cow','pig','chicken',...VISITORS.filter(v=>day>1||served>=v.at).map(v=>v.kind)];return list[index%list.length];}
