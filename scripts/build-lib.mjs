import fs from 'node:fs/promises';
import path from 'node:path';

export const OUT = path.resolve('docs/v1');
export const write = async (file, data) => {
  const p = path.join(OUT, file);
  await fs.mkdir(path.dirname(p), {recursive:true});
  await fs.writeFile(p, JSON.stringify(data, null, 2) + '\n');
};
export const slug = (s='unknown') => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') || 'unknown';
export async function build(cards, sets=[], rarities={}, source='seed') {
  cards = cards.map(c => ({...c, id: c.id || `${c.set}-${String(c.number).padStart(3,'0')}`}));
  cards.sort((a,b)=>String(a.set).localeCompare(String(b.set),undefined,{numeric:true}) || Number(a.number)-Number(b.number));
  await fs.rm(OUT,{recursive:true,force:true}); await fs.mkdir(OUT,{recursive:true});
  await write('cards.json', cards);
  await write('sets.json', sets);
  await write('rarities.json', rarities);
  const bySet = new Map(), byType=new Map(), byRarity=new Map();
  for (const c of cards) {
    const set = c.set || 'unknown', type=slug(c.element || c.type || 'unknown'), rarity=slug(c.rarity || 'unknown');
    if(!bySet.has(set)) bySet.set(set,[]); bySet.get(set).push(c);
    if(!byType.has(type)) byType.set(type,[]); byType.get(type).push(c);
    if(!byRarity.has(rarity)) byRarity.set(rarity,[]); byRarity.get(rarity).push(c);
  }
  for (const [k,v] of bySet) await write(`sets/${k}.json`, v);
  for (const [k,v] of byType) await write(`types/${k}.json`, v);
  for (const [k,v] of byRarity) await write(`rarities/${k}.json`, v);
  const search = cards.map(c=>({id:c.id,name:c.name,set:c.set,number:c.number,rarity:c.rarity,element:c.element||c.type||null,ex:!!c.ex}));
  await write('search-index.json', search);
  await write('metadata.json', {apiVersion:'1.0.0', generatedAt:new Date().toISOString(), source, cards:cards.length, sets:bySet.size, types:byType.size, rarities:byRarity.size});
}
