import { useState, useEffect, useRef } from "react";
import { TrickGenerator } from "../Generator/trickGen.js";
// import { strategies } from "../Utilities/strategies.js";
import { flatgroundStrat } from "../Strategies/flatgroundStrat.js"
import { grindStrat } from "../Strategies/grindStrat.js"
import infoIcon from "../assets/infobox_info_icon.png";
import InfoModal from "./components/InfoModal.jsx";

// const rouletteTypes = ["Flatground", "Grinds"];
const rouletteTypes = [
  {id: "flatground", label: "Flatground"},
  {id: "grinds", label: "Grinds / Slides"}
];

const typeOptions = {
  flatground: [
    { label: "Beginner", value: "beginner", queueSize: 3 },
    { label: "Amateur", value: "am", queueSize: 10 },
    { label: "Pro", value: "pro", queueSize: 15 },
    { label: "Sweaty", value: "sweaty", queueSize: 10 },
  ],
  grinds: [
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
  const [modalOpen, setModalOpen] = useState(false);
  const options = typeOptions[rouletteType.id];
  const genRef = useRef(null);

  const rouletteStrategies = {
    flatground: flatgroundStrat[difficulty],
    grinds: grindStrat,
  };

  useEffect(() => {
    genRef.current = new TrickGenerator(
      rouletteStrategies[rouletteType.id],
      options.find((opt) => opt.value === difficulty)?.queueSize,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rouletteType.id, difficulty]);

  const summonTrick = () => {
    setSpinClass("spin-exit"); //CSS animation

    setTimeout(() => {
      if (!genRef.current) return;
      const trick = genRef.current.nextTrick(modifiers);
      setTrick(trick);

      setSpinClass("spin-enter"); //CSS animation
    }, 400);
  };

  const handleTypeChange = (direction) => {
    const currentIndex = rouletteTypes.findIndex((t) => t.id === rouletteType.id);
    const step = direction === "left" ? -1 : 1
    const next = (currentIndex + step + rouletteTypes.length) % rouletteTypes.length

    setRouletteType(rouletteTypes[next])
    setModifiers(new Set());
    setTrick("");
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
      <section className="h-24 text-center flex flex-col justify-between gap-10">
        <h1 className="italic font-extrabold"> SK8M8 </h1>

        <span
          className="flex flex-row items-center justify-center"
          onClick={() => setModalOpen(true)}
        >
          <p className="text-(--text-mute)"> Trick Roulette </p>

          <img
            className="brightness-[2] h-[22px] w-auto ml-1.5"
            src={infoIcon}
            alt="info"
          />
        </span>
      </section>

      {modalOpen ? <InfoModal setModalOpen={setModalOpen} /> : ""}

      <section className="w-60 flex items-center justify-between">
        <button
          className="px-3 py-1 transform scale-y-125 font-extrabold text-2xl text-(--text-mute) hover:border-gray-500 transition"
          onClick={() => handleTypeChange("left")}
        >
          &lt;
        </button>
        <h2 className="text-(--text-mute) font-semibold text-xl">
          {rouletteType.label}
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
            switch (rouletteType.id) {
              case "flatground":
                return flatgroundOptions(opt);
              case "grinds":
                return grindOptions(opt);
              default:
                return null;
            }
          })}
        </div>
      </section>
      <button className="Spin-btn" onClick={summonTrick}>
        Spin
      </button>
    </div>
  );
}

export default TrickRoulette;
