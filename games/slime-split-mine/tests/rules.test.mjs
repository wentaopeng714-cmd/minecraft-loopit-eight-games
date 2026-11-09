import test from 'node:test';import assert from 'node:assert/strict';
import {splitVelocity,circleBox,mineRow} from '../src/rules.mjs';
test('split children fan to opposite sides and preserve projectile speed',()=>{const v={x:0,z:-9},a=splitVelocity(v);assert.ok(a[0].x*a[1].x<0);for(const p of a)assert.ok(Math.abs(Math.hypot(p.x,p.z)-9)<1e-8);});
test('collision normals resolve the actual hit side rather than reflecting arbitrarily',()=>{const b={x:0,z:0,w:1,d:1};assert.deepEqual(circleBox({x:-.6,z:0},.2,b),{x:-1,z:0,depth:.09999999999999998});assert.equal(circleBox({x:3,z:0},.2,b),null);assert.equal(circleBox({x:0,z:-.6},.2,b).z,-1);});
test('mine rows include thick Ore, Diamonds and gaps so aim and splitting both matter',()=>{const q=Array.from({length:6},(_,i)=>mineRow(i)).flat();assert.ok(q.some(b=>b.hp===3));assert.ok(q.some(b=>b.type==='diamond_ore'));assert.ok(mineRow(1).length<6);});
