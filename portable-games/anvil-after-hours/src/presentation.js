import {$} from './support.js';
export function present(kind){
 $('game').dataset.presentation=kind;
 const colors={explorer:['#f5efcf','#183d32','#c3a14e','#355847','#d9e8ba'],blueprint:['#d9edf2','#142f43','#328b9c','#1f5971','#9ec8ce'],pearl:['#e9ddf5','#392849','#8b5dbb','#65447f','#c6a7df'],foundry:['#f4dfa6','#292b30','#d08232','#41464b','#e2b96e'],arena:['#f5e9d1','#35291e','#d66b3b','#563b30','#edc670'],corridor:['#ebdfb9','#303b37','#a5843c','#5a6655','#c8d49c']};
 ['--paper','--ink','--accent','--edge','--soft'].forEach((k,i)=>document.body.style.setProperty(k,colors[kind][i]));
 const css=document.createElement('style');css.textContent=`
 #game[data-presentation] .brand-mark{transform:none;box-shadow:none;font-size:18px}
 #game[data-presentation] .action{border-radius:8px;box-shadow:0 5px #14211965}
 #game[data-presentation] .guide-text{border-radius:6px;box-shadow:0 3px #14211935}
 #game[data-presentation] #close-help{min-width:44px;height:44px}
 #game[data-presentation=explorer] .brand{background:#183d32cc;color:#fff4d4;border:0}
 #game[data-presentation=explorer] #hud{flex-wrap:wrap;max-width:440px}
 #game[data-presentation=explorer] .mission{flex-basis:100%;background:#173c31cf;color:#fff5d7;border:0;border-left:4px solid #e5c26c}
 #game[data-presentation=explorer] .stat-card{background:#173c31b8;color:#fff5d7;border:0;min-width:110px;border-radius:5px}
 #game[data-presentation=explorer] .world-tag{background:#234936de;color:#fff0c1;border:0;border-radius:8px;box-shadow:none}
 #game[data-presentation=explorer] #main{background:#dfbd64;color:#263f29}
 #game[data-presentation=explorer] #joystick{background:#173c3155;border-color:#f7df9a}
 #game[data-presentation=blueprint] .brand{background:#15364ceb;color:#e4f3ee;border:1px solid #81c7d6}
 #game[data-presentation=blueprint] .brand-mark{border:1px solid #80cbdd;background:transparent;color:#99d8e5}
 #game[data-presentation=blueprint] .mission,#game[data-presentation=blueprint] .stat-card{background:#d8edf2f2;border-color:#477f96}
 #game[data-presentation=blueprint] .progress{height:7px;background:#96bcc8}
 #game[data-presentation=blueprint] .world-tag{background:#13394d;color:#c7f4ff;border:1px solid #82c5d6;padding:4px 7px}
 #game[data-presentation=blueprint] #custom-controls{position:absolute;bottom:99px;width:100%;left:0}
 #game[data-presentation=blueprint] .piston-dock{display:flex;gap:8px;max-width:460px;margin:auto}
 #game[data-presentation=blueprint] .piston-dock button{flex:1;min-height:51px;border:2px solid #77c5d9;background:#163a50;color:#d7f5fa;font-weight:900;border-radius:5px;font-size:15px}
 #game[data-presentation=blueprint] .piston-dock small{display:block;font-size:9px;margin-top:3px}
 #game[data-presentation=blueprint] .guide-text{top:157px;bottom:auto;background:#d6eef4e8;color:#15394c}
 #game[data-presentation=blueprint] #controls .actions{margin:auto}
 #game[data-presentation=blueprint] #main,#game[data-presentation=blueprint] #alt{min-height:60px;width:120px;border-radius:3px}
 #game[data-presentation=pearl] .brand{background:#39284abf;color:#fff0ff;border:0}
 #game[data-presentation=pearl] #hud{flex-wrap:wrap;max-width:600px}
 #game[data-presentation=pearl] .mission{flex-basis:100%;background:#30263e99;color:#fff0ff;border:0;border-radius:5px}
 #game[data-presentation=pearl] .stat-card{background:#30263e99;border:0;color:#fff0ff;min-width:110px;border-radius:4px}
 #game[data-presentation=pearl] #main{background:#744fa4d9;border:2px solid #d2b4ec;border-radius:50%;width:102px;height:102px}
 #game[data-presentation=pearl] #main small{font-size:8px}
 #game[data-presentation=pearl] .guide-text{background:#30263edb;color:#f7e5ff;border:1px solid #bda5dc}
 #teleport-flash{position:absolute;inset:0;z-index:2;pointer-events:none;background:#c67cf2;opacity:0;transition:opacity .25s}
 #game[data-presentation=foundry] .brand{background:#2c3035ed;color:#ffe0a4;border:0;border-bottom:4px solid #d69436}
 #game[data-presentation=foundry] #hud{display:grid;grid-template-columns:1fr auto;gap:5px}
 #game[data-presentation=foundry] .mission{grid-column:1/-1;background:#303339e8;color:#ffe6ac;border:0;border-left:5px solid #df9e42}
 #game[data-presentation=foundry] .stat-card{background:#f1d9a2ed;color:#303138;border:0;min-width:80px;padding:6px 10px}
 #game[data-presentation=foundry] #controls{justify-content:center}
 #game[data-presentation=foundry] .actions{margin:auto}
 #game[data-presentation=foundry] #main{width:220px;background:#e1a64a;color:#262e32;border:3px solid #383e44;border-radius:3px}
 #game[data-presentation=foundry] .guide-text{background:#30343be8;color:#ffe5a7;border:0}
 #game[data-presentation=foundry] .world-tag{background:#92ccd5;color:#183c4a;border:0;padding:4px 6px}
 #game[data-presentation=arena] .brand{background:#a74725eb;color:#fff0c6;border:0}
 #game[data-presentation=arena] .mission{background:#593c31d9;color:#fff3c8;border:0;border-top:4px solid #efbb52}
 #game[data-presentation=arena] .stat-card{background:#f6c66be8;border:0;min-width:80px;border-radius:6px}
 #game[data-presentation=arena] #main{width:94px;height:94px;border-radius:50%;border:3px solid #ffe4a3;background:#cf5c33}
 #game[data-presentation=arena] .guide-text{background:#793e26db;color:#ffe9bd;border:0}
 #game[data-presentation=arena] #joystick{border:3px solid #ffe4a3;background:#a45e2a44}
 #game[data-presentation=corridor] .brand{background:#27352be0;color:#f4e7bf;border:0}
 #game[data-presentation=corridor] .mission{background:#27352bc9;color:#f5e9c8;border:0;border-bottom:3px solid #c9ac62}
 #game[data-presentation=corridor] .stat-card{background:#27352bc9;color:#f5e9c8;border:0;min-width:76px}
 #game[data-presentation=corridor] #main{width:170px;min-height:84px;background:#dfbc68;color:#2b3c2b;border:2px solid #ffedb6}
 #game[data-presentation=corridor] .guide-text{background:#27352bd9;color:#f5e9c8;border:0}
 #game[data-presentation=corridor] .reticle{width:6px;height:6px;border:2px solid #f7e7b0;border-radius:50%}
 #game[data-presentation=corridor] .reticle i,#game[data-presentation=corridor] .reticle b{display:none}
 @media(min-width:800px){#game[data-presentation=foundry] #hud{max-width:480px}#game[data-presentation=arena] #hud{max-width:650px}}
 @media(max-height:550px){#game[data-presentation=blueprint] #custom-controls{bottom:74px}#game[data-presentation=blueprint] .guide-text{bottom:165px}#game[data-presentation=pearl] #main{width:80px;height:80px}#game[data-presentation=arena] #main{width:75px;height:75px}}
 `;document.head.append(css);
}
export function cameraDrag(state,type,e,limits=[-.3,.55]){
 if(type==='down')state.drag={x:e.clientX,y:e.clientY};
 if(type==='move'&&state.drag){state.yaw-=(e.clientX-state.drag.x)*.006;state.tilt=Math.max(limits[0],Math.min(limits[1],state.tilt+(e.clientY-state.drag.y)*.004));state.drag={x:e.clientX,y:e.clientY};}
 if(type==='up'||type==='cancel')state.drag=null;
}
