import test from 'node:test';import assert from 'node:assert/strict';
import {strikeTargets,strikeScore,spawnPlan} from '../src/rules.mjs';
test('an Anvil hits only the matching lane and actual shadow footprint',()=>{const a={lane:1,z:.2,done:false},b={lane:0,z:0,done:false},c={lane:1,z:2,done:false};assert.deepEqual(strikeTargets([a,b,c],1),[a]);});
test('friendly hits have a real cost and group hits have a distinct combo reward',()=>{assert.equal(strikeScore(1,0),100);assert.equal(strikeScore(2,0),275);assert.equal(strikeScore(0,1),-100);});
test('the spawn queue includes safe Villagers, later armor and bounded speed',()=>{const q=Array.from({length:100},(_,i)=>spawnPlan(i));assert.ok(q.some(p=>p.friendly));assert.ok(q.slice(20).some(p=>p.armored));assert.ok(q.every(p=>p.speed<=2.25));});
