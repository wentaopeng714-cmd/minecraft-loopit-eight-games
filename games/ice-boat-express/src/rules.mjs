export const trackX=d=>Math.sin(d/19)*2+Math.sin(d/43)*1.3;
export function iceStep(x,v,input,dt){const nextV=(v+input*7.5*dt)*Math.exp(-dt*1.5);return {x:x+nextV*dt,v:Math.max(-4.6,Math.min(4.6,nextV))};}
export function gatePass(x,center,width=1.35){return Math.abs(x-center)<width;}
