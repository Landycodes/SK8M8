import { useState, useEffect, useRef } from "react";
import { TrickGenerator } from "../Utilities/trickGen.js";
import { strategies } from "../Utilities/strategies.js";
import infoIcon from "../assets/infobox_info_icon.png"

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
  const [modulOpen, setModulOpen] = useState(false)
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

  const handleModul = () => {
        return (
            <div className="dialog-box">
                <button onClick={() => setModulOpen(false)}>X</button>
                <h3>How To Play</h3>
                <ul>
                    <li style={{textAlign: "start"}}>
                        <b>1 Player</b> 
                        <p>
                        Select a difficulty setting that suits you and tap spin for a trick to try. 
                        Flatground, down a gap, off a ramp, go nuts! 
                        Just dont sue me if you go making a fool of yourself trying to jeffwonSong it down a 10 stair.                            
                        </p>
                    </li>
                    <li style={{textAlign: "start"}}> 
                        <b>2+ Players</b> 
                        <p>
                        This is a survival game. All players choose a difficulty. 
                        Someone spins for a trick, and everyone must attempt it. Miss the trick, get a letter. 
                        Collect all letters (S-K-A-T-E) and you're out. Last player standing wins. Players can skip a spin if everyone agrees. 
                        The final letter gets two attempts.
                        </p>
                    </li>
                </ul>
                <h3>Install Me</h3>
                <ol>
                    <li>
                        <p>
                            Tap the 3 dots
                        </p>
                    </li>
                    <li>
                        <p>
                            Tap share <small>[ If you're using an iphone ]</small>
                        </p>
                    </li>
                    <li>
                        <p>
                            Select "Add to Home Screen"
                        </p>
                    </li>
                </ol>
            </div>
        )
    }

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

                <span style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                          <p className="text-(--text-mute)"> Trick Roulette </p>

                <img className="info-btn" src={infoIcon} alt='info' onClick={() => setModulOpen(true)} style={{height: "22px", width: "auto"}}/>
                </span>

      </section>
      {modulOpen ? handleModul() : ""}

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
