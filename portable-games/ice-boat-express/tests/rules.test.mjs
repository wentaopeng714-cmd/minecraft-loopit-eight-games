import test from 'node:test';import assert from 'node:assert/strict';
import {trackX,iceStep,gatePass} from '../src/rules.mjs';
test('ice preserves momentum but countersteering changes its direction',()=>{const a=iceStep(0,2,0,.1);assert.ok(a.x>0&&a.v>0&&a.v<2);let s={x:0,v:2};for(let i=0;i<20;i++)s=iceStep(s.x,s.v,-1,.05);assert.ok(s.v<0);});
test('flag scoring uses the real opening between the poles',()=>{assert.ok(gatePass(1.2,1));assert.equal(gatePass(3,1),false);});
test('the track is continuous and changes ahead of the driver',()=>{for(let i=0;i<330;i++)assert.ok(Math.abs(trackX(i+.1)-trackX(i))<.03);assert.ok(Math.abs(trackX(30)-trackX(0))>1);});
