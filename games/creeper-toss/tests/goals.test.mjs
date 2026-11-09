import test from 'node:test';import assert from 'node:assert/strict';import {rivalPlan,duelScore} from '../src/goals.mjs';
test('the next rival progresses with a readable difficulty cap',()=>{assert.equal(rivalPlan(0).hp,6);assert.equal(rivalPlan(1).hp,7);assert.equal(rivalPlan(100).hp,8);assert.ok(rivalPlan(3).interval>=4.5);});
test('score breakdown sums to the total and rewards actual damage',()=>{const s=duelScore(6,4,true,3);assert.deepEqual(s,{damage:600,cover:100,victory:300,survival:150,total:1150});assert.equal(duelScore(2,1,false,0).total,225);});
