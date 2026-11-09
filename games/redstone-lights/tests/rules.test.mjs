import test from 'node:test';import assert from 'node:assert/strict';import {makeBoard,power} from '../src/rules.mjs';
test('all authored circuits have a valid powered solution',()=>{for(let level=1;level<=10;level++){const b=makeBoard(level);b.cells.forEach(c=>c.rot=0);assert.ok(power(b).solved,'Circuit '+level);}});
test('an unconnected source cannot light a distant lamp',()=>{const b=makeBoard(1);b.cells.forEach(c=>c.rot=0);b.cells.find(c=>c.x===0&&c.y===b.start).rot=2;assert.equal(power(b).solved,false);});
