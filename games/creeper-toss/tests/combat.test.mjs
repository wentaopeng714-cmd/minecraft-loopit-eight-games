import test from 'node:test';
import assert from 'node:assert/strict';
import {FLOOR,BLAST,launchVelocity,flightPoint,blastDamage,circleBoxHit,coverBetween,withinTeam,stepProjectile,predict} from '../src/combat.mjs';
test('a throw solves the intended landing point rather than a fixed canned arc',()=>{
 for(const target of[{x:3,y:FLOOR+.37,z:1.7},{x:1.2,y:FLOOR+.37,z:-1.9}]){const from={x:-3,y:2.5,z:.5},v=launchVelocity(from,target,1.2),end=flightPoint(from,v,1.2);for(const axis of['x','y','z'])assert.ok(Math.abs(end[axis]-target[axis])<1e-9);}
});
test('physics prediction includes a real wall bounce and stays within arena bounds',()=>{
 const wall={x:0,z:0,w:.8,d:4,top:4,alive:true};const result=predict({x:-3,y:1.4,z:0},{x:3,y:FLOOR+.37,z:0},[wall]);assert.ok(result.landing.x<0);assert.ok(result.points.length>15);assert.ok(Math.abs(result.landing.x)<=4.48);
});
test('a grounded Creeper settles rather than endlessly sliding or sinking',()=>{
 const p={position:{x:2,y:.9,z:0},velocity:{x:4,y:-3,z:1}};for(let i=0;i<180;i++)stepProjectile(p,1/60,[]);assert.ok(p.position.y>=FLOOR+.37);assert.ok(Math.hypot(p.velocity.x,p.velocity.z)<.05);assert.ok(Math.abs(p.position.x)<=4.48);
});
test('blast damage distinguishes direct hits, grazes, protection and misses',()=>{
 assert.equal(blastDamage(.4),2);assert.equal(blastDamage(1.8),1);assert.equal(blastDamage(.4,true),1);assert.equal(blastDamage(BLAST+.01),0);
});
test('only intact cover shields a player on the opposite side',()=>{
 const wall={x:0,z:0,w:1,d:1,alive:true};assert.ok(coverBetween({x:-2,z:0},{x:2,z:0},[wall]));assert.equal(coverBetween({x:-2,z:2},{x:2,z:2},[wall]),false);wall.alive=false;assert.equal(coverBetween({x:-2,z:0},{x:2,z:0},[wall]),false);
});
test('movement boundaries keep both teams inside their visible arena halves',()=>{
 assert.deepEqual(withinTeam(100,-100,0),{x:-.65,z:-2.05});assert.deepEqual(withinTeam(-100,100,1),{x:.65,z:2.05});assert.equal(circleBoxHit({x:0,y:1,z:0},{x:0,z:0,w:1,d:1,top:2,alive:true}),true);
});
