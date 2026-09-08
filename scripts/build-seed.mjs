import fs from 'node:fs/promises';
import {build} from './build-lib.mjs';
const db=JSON.parse(await fs.readFile('upstream/seed-db.json','utf8'));
const cards=(db.cards||[]).map(c=>{
 const m=String(c.id).match(/^(.+)_([0-9]+)$/); const set=m?m[1].replace('Promo-A','PROMO-A'):String(c.id).split('_')[0]; const number=m?Number(m[2]):null;
 return {id:c.id,set,number,name:c.name,rarity:c.rarity,element:c.type,type:'pokemon',stage:c.ex?'ex':null,health:null,retreatCost:null,weakness:null,packs:c.packs||[],ex:!!c.ex,imageUrl:c.imageUrl};
});
await build(cards,[],{},'seed-local-405');
