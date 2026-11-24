import TL from "../trickList.json";
import { random, weightedRandom, withWeights } from "../Utilities/random";
import { formatTrick } from "../Utilities/format";

const stance = [
  { name: "Switch", label: "Switch" },
  { name: "Fakie", label: "Fakie" },
  { name: "Nollie", label: "Nollie" },
  { name: "Regular", label: "" },
];

const trickInPool = [
  ...TL.Flips.EasyTricks,
  ...TL.Shuvs,
  ...TL.Spins.HalfSpins,
];
const grindOutPool = trickInPool;
const slideInPool = [...TL.Flips.EasyTricks, "Bigspin"];
const slideOutPool = [
  ...TL.Flips.EasyTricks,
  ...TL.Shuvs,
  "FS 270",
  "BS 270",
  "FS Bigspin",
  "BS Bigspin",
];

export const grindStrat = {
  // NEEDS FURTHER TESTING AND DIALING IN
  CreateTrick: (modifiers = new Set()) => {
    const has = (m) => modifiers.has(m);

    const si = random(TL.Sides);
    const gr = random(TL.Grinds);
    const sl = random(TL.Slides);

    const st = has("stance")
      ? weightedRandom(withWeights(stance, { Regular: 0 })).label
      : "";
    const gti = has("trickin") ? random(trickInPool) : "";
    const gto = has("trickout") ? random(grindOutPool) : "";
    const sti = has("trickin") ? random(slideInPool) : "";
    const sto = has("trickout") ? random(slideOutPool) : "";
    const co = has("combos")
      ? `To ${random([
          ...TL.Grinds.filter((t) => t !== gr),
          ...TL.Slides.filter((t) => t !== sl),
        ])}`
      : "";

    const combos = [
      { name: formatTrick(st, gti, si, gr, co, gto), weight: 1 },
      { name: formatTrick(st, si, sti, sl, co, sto), weight: 1 },
      { name: formatTrick(st, si, sti, sl, co, sto, "To Fakie"), weight: 0 },
    ];

    return weightedRandom(combos).name;
  },
};
