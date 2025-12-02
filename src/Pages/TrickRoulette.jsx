import { useState, useEffect } from "react";
import { TrickGenerator } from "../Utilities/trickGen";
import { strategies } from "../Utilities/strategies";

function TrickRoulette() {
  const [trick, setTrick] = useState("");
  const [difficulty, setDifficulty] = useState("beginner");
  const rouletteTypes = ["Flatground", "Grinds"]
  const [rouletteType, setRouletteType] = useState(rouletteTypes[0])
  const [generator, setGenerator] = useState(
    () => new TrickGenerator(strategies[difficulty]),
  );
//   const [pop, setPop] = useState(false);
  const [spinClass, setSpinClass] = useState(""); // '' | 'spin-exit' | 'spin-enter'

  const options = [
    { label: "Beginner", value: "beginner", queueSize: 3 },
    { label: "Amateur", value: "am", queueSize: 5 },
    { label: "Pro", value: "pro", queueSize: 10 },
    { label: "Sweaty", value: "sweaty", queueSize: 10 },
  ];

//   useEffect(() => {
//     setPop(true);
//     const timer = setTimeout(() => setPop(false), 200); // match CSS transition
//     return () => clearTimeout(timer);
//   }, [trick]);

  // useEffect(() => {
  //     const interval = setInterval(() => {
  //         setTrick(strategies[difficulty].CreateTrick())
  //     }, 2000); // 2000ms = 2 seconds
  //
  //     return () => clearInterval(interval); // cleanup on unmount
  // }, [difficulty, trick]);

  useEffect(() => {
    const defer = setTimeout(() => {
        
      const queueSize = options.find(
        (opt) => opt.value === difficulty,
      )?.queueSize;

      setGenerator(new TrickGenerator(strategies[difficulty], queueSize));
    }, 0);

    return () => clearTimeout(defer);
  }, [difficulty]);

  const handleSpin = () => {
    setSpinClass("spin-exit");

    setTimeout(() => {
      const trick = generator.nextTrick();
      setTrick(trick);
      setSpinClass("spin-enter");
    }, 400);
  };

  const handleTypeChange = (direction) => {
    const currentIndex = rouletteTypes.indexOf(rouletteType)
    const prevIndex = currentIndex - 1
    const nextIndex = currentIndex + 1

    if(direction === "left") {
      const validIndex = rouletteTypes[prevIndex] ? prevIndex : rouletteTypes.length -1
      setRouletteType(rouletteTypes[validIndex])
    } else if(direction === "right"){
      const validIndex = rouletteTypes[nextIndex] ? nextIndex : 0
      setRouletteType(rouletteTypes[validIndex])
    }
  }

  return (
    <div className="pt-7 min-h-screen flex flex-col items-center gap-20 font-[calc(10px + 2vmin)]">
      <section className="h-24 text-center flex flex-col justify-between">
        <h1 className="italic font-extrabold"> SK8M8 </h1>
        <p className="text-(--text-mute)"> Trick Roulette </p>
      </section>
<section className="w-64 flex items-center justify-between">
  <button 
  className="px-3 py-1 transform scale-y-125 font-extrabold text-2xl text-(--text-mute) hover:border-gray-500 transition"
  onClick={() => handleTypeChange("left")}
  >&lt;</button>
  <h2 className="text-(--text-mute) font-semibold text-xl">{rouletteType}</h2>
  <button 
  className="px-3 py-1 transform scale-y-125 font-extrabold text-2xl text-(--text-mute) hover:border-gray-500 transition"
  onClick={() => handleTypeChange("right")}
  >&gt;</button>
</section>
      <section className="flex flex-col items-center gap-5">
        <div className="Trick-display">
          <span className={`Trick-spin-wrapper  ${spinClass} `}>{trick}</span>
        </div>
        <div className="m-0 flex justify-around items-center w-screen max-w-[400px]">
          {options.map((opt) => (
            <label
              key={opt.value}
              className={`Trick-option-label ${difficulty === opt.value ? "checked" : ""}`}
            >
              <input
                type="radio"
                name="difficulty"
                value={opt.value}
                checked={difficulty === opt.value}
                onChange={(e) => setDifficulty(e.target.value)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </section>
      <button className="Spin-btn" onClick={handleSpin}>
        Spin
      </button>
    </div>
  );
}

export default TrickRoulette;
