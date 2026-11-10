import test from 'node:test';import assert from 'node:assert/strict';
import {ringCenter,throughRing,flightScore} from '../src/rules.mjs';
test('passing a ring uses horizontal and vertical distance',()=>{const r={x:2,y:6};assert.ok(throughRing(2,6,r));assert.equal(throughRing(2,8,r),false);assert.equal(throughRing(4,6,r),false);});
test('the authored flight corridor stays inside reachable steering bounds',()=>{for(let d=0;d<650;d++){const c=ringCenter(d);assert.ok(Math.abs(c.x)<4);assert.ok(c.y>4&&c.y<8);}});
test('linked rings improve score without unbounded combo values',()=>{assert.ok(flightScore(5)>flightScore(1));assert.equal(flightScore(100),flightScore(10));});
