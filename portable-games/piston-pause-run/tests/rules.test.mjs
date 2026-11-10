import test from 'node:test';import assert from 'node:assert/strict';
import {pistonPhase,crossingHit} from '../src/rules.mjs';
test('a readable amber warning precedes the physically dangerous extension',()=>{assert.equal(pistonPhase(1.3,0).warning,true);assert.equal(pistonPhase(1.3,0).extension,0);assert.ok(pistonPhase(2,0).extension>.9);});
test('an open gap is safe and a closed gap hurts only inside its real depth',()=>{assert.equal(crossingHit(-5,-5,0),false);assert.equal(crossingHit(-5,-5,1),true);assert.equal(crossingHit(-4,-5,1),false);});
test('each gate offers a long safe interval rather than requiring a frame-perfect dash',()=>{for(let i=0;i<12;i++){let safe=0;for(let t=0;t<3.3;t+=.01)if(pistonPhase(t,i).safe)safe++;assert.ok(safe>120);}});
