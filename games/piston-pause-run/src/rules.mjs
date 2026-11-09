export function pistonPhase(time,index){const cycle=(time+index*.61)%3.3;return {cycle,extension:cycle<1.5?0:cycle<1.85?(cycle-1.5)/.35:cycle<2.6?1:Math.max(0,1-(cycle-2.6)/.45),warning:cycle>=1.0&&cycle<1.85,safe:cycle<1.0||cycle>3.05};}
export function crossingHit(z,gateZ,extension){return Math.abs(z-gateZ)<.56&&extension>.66;}
