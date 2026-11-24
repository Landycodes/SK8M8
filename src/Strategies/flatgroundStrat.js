import TL from "../trickList.json";
import { random, weightedRandom, withWeights } from "../Utilities/random.js";
import { formatTrick } from "../Utilities/format.js";

const stance = [
  { name: "Switch", label: "Switch" },
  { name: "Fakie", label: "Fakie" },
  { name: "Nollie", label: "Nollie" },
  { name: "Regular", label: "" },
];

const weightedStance = (overrides) =>
  weightedRandom(withWeights(stance, overrides));

export const flatgroundStrat = {
  beginner: {
    CreateTrick: () => {
      const categories = [
        random(TL.Spins.HalfSpins),
        random(TL.Flips.EasyTricks),
        random(TL.Shuvs),
        TL.Ollie,
      ];
      return random(categories);
    },
  },
  am: {
    CreateTrick: () => {
      const st = weightedStance({ Regular: 3, Fakie: 2 });
      const tr = random([
        ...TL.Spins.HalfSpins,
        ...TL.Flips.EasyTricks,
        ...TL.Shuvs,
        st === "Nollie" ? "" : "Ollie",
      ]);
      return formatTrick(st.label, tr);
    },
  },
  pro: {
    CreateTrick: () => {
      const st = weightedStance({ Regular: 2 }).label;
      const er = random(TL.Spins.HalfSpins);
      const hr = random(TL.Spins.FullSpins);
      const ar = random([...TL.Sides, ...TL.Spins.FullSpins]);
      const sh = "Shuvit";
      const ef = random(TL.Flips.EasyTricks);
      const ht = random(TL.Flips.HardTricks);
      const combos = [
        { name: formatTrick(st, er, ef), weight: 3 },
        { name: formatTrick(st, ar, sh), weight: 1 },
        { name: formatTrick(st, ef), weight: 2 },
        { name: formatTrick(st, ht), weight: 6 },
        { name: formatTrick(st, hr), weight: 1 },
      ];
      return weightedRandom(combos).name;
    },
  },
  sweaty: {
    CreateTrick: () => {
      const st = weightedStance().label;
      const swt = random(TL.Flips.SweatyTricks);
      const r = random([...TL.Spins.HalfSpins, ...TL.Spins.FullSpins]);
      const ef = random(TL.Flips.EasyTricks);
      const swf = random(["Double Flip", "Double Heel"]);
      const ht = random(TL.Flips.HardTricks);
      const combos = [
        { name: formatTrick(st, r, ef), weight: 1 },
        { name: formatTrick(st, swt), weight: 4 },
        { name: formatTrick(st, swf), weight: 2 },
        { name: formatTrick(st, r, swf), weight: 1 },
        { name: formatTrick(st, ht), weight: 2 },
      ];
      return weightedRandom(combos).name;
    },
  },
};
