import test from 'node:test';import assert from 'node:assert/strict';import {overlap,dropPoints} from '../src/rules.mjs';
test('partial overhang keeps only the actual intersection',()=>{const r=overlap(0,3,1,3);assert.equal(r.width,2);assert.equal(r.center,.5);assert.equal(r.perfect,false);});
test('misses, perfect tolerance and combo rewards remain distinct',()=>{assert.equal(overlap(0,2,3,2).width,0);assert.equal(overlap(0,2,.1,2).center,0);assert.ok(dropPoints(true,3)>dropPoints(false,0));});
