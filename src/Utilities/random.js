export const random = (array) =>
  array[Math.floor(Math.random() * array.length)];

export const withWeights = (items, overrides = {}, defaultWeight = 1) =>
  items.map((item) => ({
    ...item,
    weight: overrides[item.name] ?? defaultWeight,
  }));

export const weightedRandom = (items) => {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  if (total <= 0) throw new Error("weightedRandom: total weight must be > 0");

  let roll = Math.random() * total;
  for (const item of items) {
    if (roll < item.weight) return item;
    roll -= item.weight;
  }
  return items[items.length - 1];
};
