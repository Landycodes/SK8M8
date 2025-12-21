import TL from "./trickList.json";

const stance = [
  { name: "Switch", weight: 1 },
  { name: "Fakie", weight: 1 },
  { name: "Nollie", weight: 1 },
  { name: "", weight: 1 },
];

const randomize = (array) => array[Math.floor(Math.random() * array.length)];

const weightedRandom = (values) => {
  let totalWeight = 0;
  values.forEach((w) => (totalWeight += w.weight));
  let random = Math.random() * totalWeight;

  for (const v of values) {
    if (random <= v.weight) {
      return v.name.trim();
    }
    random -= v.weight;
  }
  return "Oh no dude, Something Broke :(";
};

const setStanceWeights = ({
  Switch = 1,
  Fakie = 1,
  Nollie = 1,
  Regular = 1,
} = {}) => {
  stance.forEach((s) => {
    switch (s.name) {
      case "Switch":
        s.weight = Switch;
        break;
      case "Fakie":
        s.weight = Fakie;
        break;
      case "Nollie":
        s.weight = Nollie;
        break;
      default:
        s.weight = Regular;
    }
  });
};

export const strategies = {
  beginner: {
    CreateTrick: () => {
      const categories = [
        randomize(TL.Spins.HalfSpins),
        randomize(TL.Flips.EasyTricks),
        randomize(TL.Shuvs),
        TL.Ollie,
      ];
      const newTrick =
        categories[Math.floor(Math.random() * categories.length)];
      return newTrick;
    },
  },
  am: {
    CreateTrick: () => {
      setStanceWeights({ Regular: 3, Fakie: 2 });
      const st = weightedRandom(stance);
      const tr = randomize([
        ...TL.Spins.HalfSpins,
        ...TL.Flips.EasyTricks,
        ...TL.Shuvs,
        st === "Nollie" ? "" : "Ollie",
      ]);
      const newTrick = [st, tr].filter(Boolean).join(" ");
      return newTrick;
    },
  },
  pro: {
    CreateTrick: () => {
      setStanceWeights({ Regular: 2 });
      const st = weightedRandom(stance);
      const er = randomize(TL.Spins.HalfSpins);
      const hr = randomize(TL.Spins.FullSpins);
      const ar = randomize([...TL.Sides, ...TL.Spins.FullSpins]);
      const sh = "Shuvit";
      const ef = randomize(TL.Flips.EasyTricks);
      const ht = randomize(TL.Flips.HardTricks);
      const combos = [
        { name: `${st} ${er} ${ef}`, weight: 3 },
        { name: `${st} ${ar} ${sh}`, weight: 1 },
        { name: `${st} ${ef}`, weight: 2 },
        { name: `${st} ${ht}`, weight: 6 },
        { name: `${st} ${hr}`, weight: 1 },
      ];
      const newTrick = weightedRandom(combos);
      return newTrick;
    },
  },
  sweaty: {
    CreateTrick: () => {
      const st = weightedRandom(stance);
      const swt = randomize(TL.Flips.SweatyTricks);
      const r = randomize([...TL.Spins.HalfSpins, ...TL.Spins.FullSpins]);
      const ef = randomize(TL.Flips.EasyTricks);
      const swf = randomize(["Double Flip", "Double Heel"]);
      const ht = randomize(TL.Flips.HardTricks);
      const combos = [
        { name: `${st} ${r} ${ef}`, weight: 1 },
        { name: `${st} ${swt}`, weight: 4 },
        { name: `${st} ${swf}`, weight: 2 },
        { name: `${st} ${r} ${swf}`, weight: 1 },
        { name: `${st} ${ht}`, weight: 2 },
      ];
      const newTrick = weightedRandom(combos);
      return newTrick;
    },
  },
  grinds: {
    CreateTrick: (modifiers = new Set()) => {
      setStanceWeights({ Regular: 0 });
      const st = modifiers.has("stance") ? weightedRandom(stance) : ""
      // TODO: trick in need to make sense. ie you cant do a bs 180 bs noseslide. need to seperate
      const fi = modifiers.has("trickin") ? randomize([...TL.Flips.EasyTricks, ...TL.Shuvs, ...TL.Spins.HalfSpins]) : ""
      const fo = modifiers.has("trickout") ? randomize([...TL.Flips.EasyTricks, ...TL.Shuvs, ...TL.Spins.HalfSpins]) : ""
      // TODO: Make a combos rule set to stop retarded combo options
      const co = modifiers.has("combos") ? `To ${randomize([...TL.Grinds, ...TL.Slides])}` : ""
      const s = randomize(TL.Sides);
      const gt = randomize([...TL.Grinds, ...TL.Slides]);
      const newTrick = [st, fi, s, gt, co, fo].filter(Boolean).join(" ");
      // console.log(modifiers);
      return newTrick;
    },
  },
};
