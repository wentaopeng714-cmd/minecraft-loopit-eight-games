export function packPlan(stock,food,capacity=12){const room=Math.max(0,capacity-stock.reduce((a,b)=>a+b,0));return {food,amount:Math.min(3,room),duration:2,cost:20};}
export function serveStock(stock,food,portions){if(portions<=0||stock[food]<portions)return null;const next=[...stock];next[food]-=portions;return next;}
