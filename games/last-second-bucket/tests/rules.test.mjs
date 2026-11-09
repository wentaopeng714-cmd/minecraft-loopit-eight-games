import test from 'node:test';import assert from 'node:assert/strict';
import {waterReach,safeSplash,bucketPoints} from '../src/rules.mjs';
test('placing Water requires both ground reach and alignment',()=>{const t={x:0,z:0};assert.equal(waterReach(8,0,0,t),false);assert.equal(waterReach(4,0,0,t),true);assert.equal(waterReach(4,3,0,t),false);});
test('Water stays where it was placed and cannot protect a different landing',()=>{assert.equal(safeSplash(0,0,null),false);assert.equal(safeSplash(.2,.2,{x:0,z:0}),true);assert.equal(safeSplash(2,0,{x:0,z:0}),false);});
test('centered landings and a sustained streak have visible score value',()=>{assert.ok(bucketPoints(true,2)>bucketPoints(false,2));assert.ok(bucketPoints(true,5)>bucketPoints(true,1));});
