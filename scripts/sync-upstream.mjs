import {build} from './build-lib.mjs';
const BASE='https://raw.githubusercontent.com/flibustier/pokemon-tcg-pocket-database/main/dist/';
async function get(name){const r=await fetch(BASE+name,{headers:{'user-agent':'tcg-pocket-api-sync'}}); if(!r.ok) throw new Error(`${name}: HTTP ${r.status}`); return r.json();}
const [cardsRaw,setsObj,rarities]=await Promise.all([get('cards.extra.json'),get('sets.json'),get('rarities.json')]);
const sets=Object.values(setsObj).flat();
const setMap=Object.fromEntries(sets.map(s=>[s.code,s]));
const cards=cardsRaw.map(c=>{
 const s=setMap[c.set]||{};
 return {
  id:`${c.set}-${String(c.number).padStart(3,'0')}`, set:c.set, number:c.number, name:c.name, rarity:c.rarity,
  element:c.element??null, type:c.type??null, stage:c.stage??null, health:c.health??null,
  retreatCost:c.retreatCost??null, weakness:c.weakness??null, goodWith:c.goodWith??[], packs:c.packs??s.packs??[],
  ex:['ex','mega'].includes(String(c.stage||'').toLowerCase()), image:c.image??null,
  imageUrl:`https://raw.githubusercontent.com/flibustier/pokemon-tcg-pocket-database/main/cards-by-set/${c.set}/${c.number}.webp`,
  setName:s.name?.es || s.name?.en || c.set, releaseDate:s.releaseDate??null
 };
});
await build(cards,sets,rarities,'flibustier/pokemon-tcg-pocket-database');
