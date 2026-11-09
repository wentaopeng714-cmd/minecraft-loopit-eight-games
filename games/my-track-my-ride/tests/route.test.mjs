import test from 'node:test';
import assert from 'node:assert/strict';
import {START,GOAL,GEMS,MAX_RAILS,addRail,complete,validate,buildable,advanceSpeed,fuseStep,patrol,connectRails,shouldHit} from '../src/route.mjs';
function trace(steps){let p=[{...START}];for(const [dc,dr,n] of steps)for(let i=0;i<n;i++){const end=p.at(-1);const result=addRail(p,{c:end.c+dc,r:end.r+dr});assert.equal(result.error,null);p=result.path;}return p;}
test('both bridge routes can reach the station within the rail budget',()=>{
 const east=trace([[1,0,4],[0,-1,8]]),west=trace([[0,-1,7],[1,0,4],[0,-1,1]]);
 for(const route of [east,west]){assert.ok(validate(route));assert.ok(complete(route));assert.ok(route.length<=MAX_RAILS);assert.deepEqual(route.at(-1),GOAL);}
});
test('water, rocks, diagonal gaps and outside cells are rejected',()=>{
 assert.equal(buildable({c:3,r:4}),false);assert.equal(buildable({c:3,r:6}),false);assert.equal(buildable({c:-1,r:0}),false);
 const p=[{...START}];assert.ok(addRail(p,{c:2,r:7}).error);assert.deepEqual(addRail(p,{c:3,r:4}).path,p);
});
test('backtracking refunds rails and cannot create a loop',()=>{
 let p=trace([[1,0,3]]);const short=addRail(p,p[1]);assert.equal(short.path.length,2);assert.equal(short.error,null);assert.ok(validate(short.path));assert.ok(!complete(short.path));
});
test('a fully connected route cannot be extended beyond its destination',()=>{
 const p=trace([[1,0,4],[0,-1,8]]);assert.ok(addRail(p,{c:4,r:0}).error);assert.ok(complete(p));
});
test('braking stops the cart quickly and release accelerates progressively',()=>{
 let speed=2.3,distance=0;for(let i=0;i<30;i++){speed=advanceSpeed(speed,true,1/60);distance+=speed/60;}assert.equal(speed,0);assert.ok(distance<.55);
 for(let i=0;i<30;i++)speed=advanceSpeed(speed,false,1/60);assert.ok(speed>.5&&speed<.6);
});
test('Creeper proximity charges a fuse, retreat clears it, and waiting is not an automatic explosion',()=>{
 let f=0;for(let i=0;i<60;i++)f=fuseStep(f,1.2,1/60);assert.ok(f>.9&&f<1.1);for(let i=0;i<30;i++)f=fuseStep(f,2.5,1/60);assert.equal(f,0);
 for(let i=0;i<100;i++)f=fuseStep(f,3,1/60);assert.equal(f,0);for(let i=0;i<100;i++)f=fuseStep(f,1,1/60);assert.equal(f,1.35);
});
test('crossings have long safe gaps and continuous, bounded walking',()=>{
 assert.equal(patrol(1).offset,-2.4);assert.equal(patrol(6).offset,2.4);assert.equal(patrol(11).offset,-2.4);
 for(let t=0;t<12;t+=.01){const a=patrol(t),b=patrol(t+.01);assert.ok(Math.abs(a.offset)<=2.401);assert.ok(Math.abs(a.offset-b.offset)<.04);}
 assert.ok(Math.abs(patrol(3.9).offset)<.001);assert.ok(Math.abs(patrol(9.1).offset)<.001);
});
test('a fast drag snaps a long gap into a continuous valid track',()=>{
 const p=connectRails([{...START}],{c:1,r:1}).path;assert.equal(p.length,8);assert.ok(validate(p));
 const q=connectRails(p,{c:5,r:1}).path;assert.ok(validate(q));assert.ok(complete(connectRails(q,GOAL).path));
});
test('snapping finds a short way around a blocked rock without placing on water',()=>{
 const p=connectRails([{...START}],{c:4,r:5}).path;assert.ok(validate(p));assert.ok(p.length>1);assert.deepEqual(p.at(-1),{c:4,r:5});assert.ok(!p.some(p=>p.r===4));
});
test('stopping near a Creeper is safe and hit recovery blocks repeated damage',()=>{
 assert.equal(shouldHit(.2,0,true,0,10),false);assert.equal(shouldHit(.5,2,false,12,10),false);assert.equal(shouldHit(.5,2,false,0,10),true);assert.equal(shouldHit(2,2,false,0,10),false);
});

test('full cargo goal is reachable without exceeding the rail budget',()=>{
 const p=trace([[1,0,4],[0,-1,3],[-1,0,1],[0,1,2],[-1,0,3],[0,-1,6],[1,0,3],[0,1,1],[1,0,1],[0,-1,2]]);
 assert.ok(validate(p));assert.ok(complete(p));assert.equal(p.length,27);
 assert.ok(GEMS.every(g=>p.some(t=>t.c===g.c&&t.r===g.r)));
});
