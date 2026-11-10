import test from 'node:test';import assert from 'node:assert/strict';
import {moveExplorer,canInvite,deliveryScore,arrivedAtCamp} from '../src/rules.mjs';
test('forest movement respects shoreline and boundary while allowing safe movement',()=>{assert.equal(moveExplorer({x:0,z:0},{x:1,z:0},.4,[{x:2,z:0,r:1}]).x,0);assert.equal(moveExplorer({x:13.4,z:0},{x:1,z:0},1).x,13.5);assert.ok(moveExplorer({x:0,z:3},{x:1,z:0},.1).x>0);});
test('a Bone invites only a physically nearby Wolf',()=>{assert.equal(canInvite({x:0,z:0},{x:2,z:2}),true);assert.equal(canInvite({x:0,z:0},{x:3,z:1}),false);});
test('only actually delivered companions earn rescue credit',()=>{assert.equal(deliveryScore(0),0);assert.equal(deliveryScore(2),400);assert.equal(deliveryScore(3),600);});

test('a distant or waiting companion cannot be banked by reaching camp alone',()=>{assert.equal(arrivedAtCamp({x:0,z:6},{x:0,z:-10}),false);assert.equal(arrivedAtCamp({x:0,z:-8},{x:0,z:-10},true),false);assert.equal(arrivedAtCamp({x:0,z:-8},{x:0,z:-10}),true);});
