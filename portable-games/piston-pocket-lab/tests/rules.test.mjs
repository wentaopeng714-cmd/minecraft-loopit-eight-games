import test from 'node:test';import assert from 'node:assert/strict';
import {makePuzzle,push,solved} from '../src/rules.mjs';
test('every authored layout and rotation has a reachable solution',()=>{for(let n=1;n<=24;n++){let b=makePuzzle(n);for(const i of b.solution){const r=push(b,i);assert.ok(r.changed);b={...b,crates:r.crates};}assert.ok(solved(b),'layout '+n);}});
test('a blocked boundary cannot push a crate outside the board',()=>{const b=makePuzzle(1);b.crates=[{x:4,z:2,type:'diamond_ore'}];const r=push(b,0);assert.equal(r.changed,false);assert.deepEqual(r.crates,b.crates);});
test('a connected crate chain moves together and the previous state remains usable for undo',()=>{const b=makePuzzle(1);b.crates=[{x:1,z:2,type:'diamond_ore'},{x:2,z:2,type:'iron_block'}];const r=push(b,0);assert.deepEqual(r.crates.map(c=>c.x),[2,3]);assert.deepEqual(b.crates.map(c=>c.x),[1,2]);});
