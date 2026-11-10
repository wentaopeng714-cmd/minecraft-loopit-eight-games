import test from 'node:test';import assert from 'node:assert/strict';
import {tileAt,collapseTime,chooseNeighbor} from '../src/rules.mjs';
test('tile lookup rejects the arena edge rather than creating an invisible floor',()=>{assert.deepEqual(tileAt(0,0),[5,5]);assert.equal(tileAt(6,0),null);});
test('only stepped tiles collapse and the warning delay is honored',()=>{assert.equal(collapseTime(null,100),false);assert.equal(collapseTime(1,1.5),false);assert.equal(collapseTime(1,2),true);});
test('rivals prefer a fresh adjacent tile and never target missing floor',()=>{const t=Array.from({length:9},()=>({alive:true,marked:null}));t[5].alive=false;t[3].marked=0;const n=chooseNeighbor(1,1,t,3);assert.ok(t[n[1]*3+n[0]].alive);assert.equal(t[n[1]*3+n[0]].marked,null);});
