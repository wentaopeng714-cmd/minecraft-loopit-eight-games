import test from 'node:test';import assert from 'node:assert/strict';
import {landingAt,reachPoint,courseScore} from '../src/rules.mjs';
test('landing is safe only inside the actual platform footprint',()=>{const a=[{x:1,z:-2,w:2,d:2}];assert.equal(landingAt(1,-2,a),0);assert.equal(landingAt(2.1,-2,a),-1);assert.equal(landingAt(1,0,a),-1);});
test('a far pointer target is clamped to the throw reach without changing direction',()=>{const p=reachPoint({x:0,z:0},{x:30,z:-40},5);assert.ok(Math.abs(Math.hypot(p.x,p.z)-5)<1e-8);assert.ok(p.z<0);});
test('optional treasures reward exploration while fewer throws and fewer misses matter',()=>{assert.ok(courseScore(5,3,0)>courseScore(5,1,0));assert.ok(courseScore(5,3,0)>courseScore(8,3,1));});
