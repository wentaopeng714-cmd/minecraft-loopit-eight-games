import test from 'node:test';import assert from 'node:assert/strict';
import {routeTo,rescuePoints} from '../src/rules.mjs';
test('a drawn shortcut routes around water rather than jumping across it',()=>{const b=new Set(['0,0','0,1']);const p=routeTo([0,3],[0,-3],b);assert.ok(p.length);for(let i=1;i<p.length;i++){assert.equal(Math.abs(p[i][0]-p[i-1][0])+Math.abs(p[i][1]-p[i-1][1]),1);assert.ok(!b.has(p[i].join(',')));}});
test('an enclosed destination has no false walkable route',()=>assert.deepEqual(routeTo([0,3],[0,0],new Set(['1,0','-1,0','0,1','0,-1'])),[]));
test('more rescues outweigh a modest detour while scares reduce the delivery reward',()=>{assert.ok(rescuePoints(3,0,30)>rescuePoints(1,0,10));assert.ok(rescuePoints(3,1,30)<rescuePoints(3,0,30));});
