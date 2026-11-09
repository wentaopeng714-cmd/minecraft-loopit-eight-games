export const CATCHES=[
{id:'fish',name:'COD',asset:'fish',points:70,power:1,kind:'fish'},
{id:'salmon',name:'SALMON',asset:'salmon',points:100,power:1.03,kind:'fish'},
{id:'pufferfish',name:'PUFFERFISH',asset:'pufferfish',points:150,power:1.12,kind:'fish'},
{id:'clownfish',name:'CLOWNFISH',asset:'clownfish',points:150,power:1.07,kind:'fish'},
{id:'blue_tropical',name:'AZURE TROPICAL',asset:'clownfish',hue:155,points:220,power:1.12,kind:'fish'},
{id:'gold_tropical',name:'GOLDEN TROPICAL',asset:'clownfish',hue:30,points:260,power:1.15,kind:'fish'},
{id:'book',name:'SOGGY BOOK',asset:'book',points:100,power:1.02,kind:'find'},
{id:'enchanted_book',name:'ENCHANTED BOOK',asset:'enchanted_book',points:400,power:1.22,kind:'treasure'},
{id:'name_tag',name:'NAME TAG',asset:'name_tag',points:260,power:1.16,kind:'treasure'},
{id:'saddle',name:'SADDLE',asset:'saddle',points:240,power:1.15,kind:'treasure'},
{id:'bowl',name:'OLD BOWL',asset:'bowl',points:50,power:.95,kind:'find'},
{id:'lily',name:'LILY PAD',asset:'lily',points:50,power:.95,kind:'find'}];
export const POOLS=[[44,12,4,7,3,2,9,1,2,2,9,5],[12,30,8,14,9,5,6,2,4,3,4,7],[5,10,19,12,12,7,6,6,7,8,3,5]];
export function rollCatch(spot,bag={},duplicates=0,random=Math.random){const base=POOLS[Math.max(0,Math.min(2,spot))];const unseen=CATCHES.some(c=>!bag[c.id]);const pool=duplicates>=4&&unseen?base.map((v,i)=>bag[CATCHES[i].id]?0:v):base.map((v,i)=>duplicates>=3&&!bag[CATCHES[i].id]?v*8:v);let n=random()*pool.reduce((a,b)=>a+b,0);for(let i=0;i<pool.length;i++){n-=pool[i];if(n<0)return CATCHES[i];}return CATCHES.at(-1);}
export function collectCatch(bag,id){return {...bag,[id]:(bag[id]||0)+1};}
