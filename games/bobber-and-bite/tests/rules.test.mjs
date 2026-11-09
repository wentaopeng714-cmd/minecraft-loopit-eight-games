import test from 'node:test';import assert from 'node:assert/strict';import {reelStep} from '../src/rules.mjs';
test('holding continuously risks a snapped line',()=>{let s={tension:.2,progress:0};for(let i=0;i<50&&!s.snapped;i++)s=reelStep(s,true,.1);assert.ok(s.snapped);assert.ok(!s.caught);});
test('alternating pull and release can land a fish',()=>{let s={tension:.2,progress:0};for(let i=0;i<200&&!s.caught;i++)s=reelStep(s,s.tension<.72,.1);assert.ok(s.caught);assert.ok(!s.snapped);});
