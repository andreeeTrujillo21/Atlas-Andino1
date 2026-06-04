import cuy          from "./cuy.js";
import vicuna        from "./vicuna.js";
import vaca          from "./vaca.js";
import alpaca        from "./alpaca.js";
import llama         from "./llama.js";
import vizcacha      from "./vizcacha.js";
import zambullidor   from "./zambullidor.js";

export const SPECIES_LIST = [alpaca, cuy, vicuna, vaca, llama, vizcacha, zambullidor];

export const SPECIES_MAP = Object.fromEntries(
  SPECIES_LIST.map(s => [s.slug, s])
);

export const getSpecies    = slug => SPECIES_MAP[slug];
export const getFeatured   = ()   => SPECIES_LIST.filter(s => s.isFeatured);
export const getByCategory = cat  => SPECIES_LIST.filter(s => s.category === cat);
