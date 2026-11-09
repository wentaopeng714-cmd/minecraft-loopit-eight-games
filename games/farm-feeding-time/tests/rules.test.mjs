import test from 'node:test';import assert from 'node:assert/strict';import {serveStock,packPlan} from '../src/rules.mjs';
test('a two-portion request cannot consume one remaining portion',()=>{assert.equal(serveStock([1,2,3],0,2),null);assert.deepEqual(serveStock([3,2,3],0,2),[1,2,3]);});
test('shared Wheat and bag capacity create real constraints',()=>{const afterCow=serveStock([3,2,3],0,2);assert.deepEqual(serveStock(afterCow,0,1),[0,2,3]);assert.equal(packPlan([5,5,1],0).amount,1);assert.equal(packPlan([4,4,4],2).amount,0);});
test('packing has an explicit short duration and point cost',()=>{assert.deepEqual(packPlan([0,1,2],0),{food:0,amount:3,duration:2,cost:20});});
