import { useState, useEffect, useRef } from "react";
import { TrickGenerator } from "../Utilities/trickGen";
import { strategies } from "../Utilities/strategies";

const rouletteTypes = ["Flatground", "Grinds"];
const typeOptions = {
    Flatground: [
      { label: "Beginner", value: "beginner", queueSize: 3 },
      { label: "Amateur", value: "am", queueSize: 10 },
      { label: "Pro", value: "pro", queueSize: 15 },
      { label: "Sweaty", value: "sweaty", queueSize: 10 },
    ],
    Grinds: [
      { label: "Stance", value: "stance" },
      { label: "Trick-In", value: "trickin" },
      { label: "Trick-Out", value: "trickout" },
      { label: "Combos", value: "combos" },
    ],
  };

function TrickRoulette() {
  const [trick, setTrick] = useState("");
  const [rouletteType, setRouletteType] = useState(rouletteTypes[0]);
  const [difficulty, setDifficulty] = useState("beginner");
  const [modifiers, setModifiers] = useState(() => new Set());
  const [spinClass, setSpinClass] = useState(""); // '' | 'spin-exit' | 'spin-enter'
  const options = typeOptions[rouletteType]
  const genRef = useRef(null)

  const rouletteStrategies = {
    Flatground: strategies[difficulty],
    Grinds: strategies.grinds,
  };

  useEffect(() => {
    genRef.current = new TrickGenerator(
        rouletteStrategies[rouletteType],
        options.find((opt) => opt.value === difficulty)?.queueSize
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rouletteType, difficulty])


  const handleSpin = () => {
    setSpinClass("spin-exit");

    setTimeout(() => {
      if(!genRef.current) return
      const trick = genRef.current.nextTrick(modifiers);
      setTrick(trick);
      setSpinClass("spin-enter");
    }, 400);
  };

  const handleTypeChange = (direction) => {
    const currentIndex = rouletteTypes.indexOf(rouletteType);
    const prevIndex = currentIndex - 1;
    const nextIndex = currentIndex + 1;
    let rouletteVal;

    if (direction === "left") {
      const validIndex = rouletteTypes[prevIndex]
        ? prevIndex
        : rouletteTypes.length - 1;
      rouletteVal = rouletteTypes[validIndex];
    } else if (direction === "right") {
      const validIndex = rouletteTypes[nextIndex] 
      ? nextIndex 
      : 0;
      rouletteVal = rouletteTypes[validIndex];
    }

    if(!rouletteVal) return

    setRouletteType(rouletteVal);
    setTrick("")
    setModifiers(new Set())
  };

  const flatgroundOptions = (option) => {
    return (
      <label
        key={option.value}
        className={`Trick-option-label ${difficulty === option.value ? "checked" : ""}`}
      >
        <input
          type="radio"
          name="difficulty"
          value={option.value}
          checked={difficulty === option.value}
          onChange={(e) => setDifficulty(e.target.value)}
        />

        <span>{option.label}</span>
      </label>
    );
  };

  const grindOptions = (option) => {
    return (
      <label
        key={option.value}
        className={`Trick-option-label ${modifiers.has(option.value) ? "checked" : ""}`}
      >
        <input
          type="checkbox"
          name="Modifiers"
          value={option.value}
          checked={modifiers.has(option.value)}
          onChange={(e) => {
            setModifiers((prev) => {
              const updated = new Set(prev);
              updated.has(e.target.value)
                ? updated.delete(e.target.value)
                : updated.add(e.target.value);

              return updated;
            });
          }}
        />

        <span>{option.label}</span>
      </label>
    );
  };

  return (
    <div className="pt-7 min-h-screen flex flex-col items-center gap-20 font-[calc(10px + 2vmin)]">
      <section className="h-24 text-center flex flex-col justify-between">
        <h1 className="italic font-extrabold"> SK8M8 </h1>
        <p className="text-(--text-mute)"> Trick Roulette </p>
      </section>
      <section className="w-60 flex items-center justify-between">
        <button
          className="px-3 py-1 transform scale-y-125 font-extrabold text-2xl text-(--text-mute) hover:border-gray-500 transition"
          onClick={() => handleTypeChange("left")}
        >
          &lt;
        </button>
        <h2 className="text-(--text-mute) font-semibold text-xl">
          {rouletteType}
        </h2>
        <button
          className="px-3 py-1 transform scale-y-125 font-extrabold text-2xl text-(--text-mute) hover:border-gray-500 transition"
          onClick={() => handleTypeChange("right")}
        >
          &gt;
        </button>
      </section>
      <section className="flex flex-col items-center gap-5">
        <div className="Trick-display">
          <span className={`Trick-spin-wrapper  ${spinClass} `}>{trick}</span>
        </div>
        <div className="m-0 flex justify-around items-center w-screen max-w-[400px]">
          {options.map((opt) => {
            switch (rouletteType) {
              case "Flatground":
                return flatgroundOptions(opt);
              case "Grinds":
                return grindOptions(opt);
              default:
                "";
            }
          })}
        </div>
      </section>
      <button className="Spin-btn" onClick={handleSpin}>
        Spin
      </button>
    </div>
  );
}

export default TrickRoulette;
