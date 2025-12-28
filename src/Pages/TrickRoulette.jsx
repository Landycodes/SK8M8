import { useState, useEffect } from 'react';
import { TrickGenerator } from '../Utilities/trickGen';
import { strategies } from '../Utilities/strategies';

function TrickRoulette() {
    const [trick, setTrick] = useState("");
    const [difficulty, setDifficulty] = useState("beginner");
    const [generator, setGenerator] = useState(() => new TrickGenerator(strategies[difficulty]))
    // const [pop, setPop] = useState(false);
    const [spinClass, setSpinClass] = useState(""); // '' | 'spin-exit' | 'spin-enter'

    const options = [
        { label: "Beginner", value: "beginner", queueSize: 3 },
        { label: "Amateur", value: "am", queueSize: 5 },
        { label: "Pro", value: "pro", queueSize: 10 },
        { label: "Sweaty", value: "sweaty", queueSize: 10 },
    ];

    // const vibrate = (duration = 50) => {
    //   if(navigator.vibrate) {
    //     console.log("vibrating")
    //     navigator.vibrate(duration)
    //   } else {
    //     console.log("Vibrate not supported :(")
    //   }

    // }

    // useEffect(() => {
    //     setPop(true);
    //     const timer = setTimeout(() => setPop(false), 200); // match CSS transition
    //     return () => clearTimeout(timer);
    // }, [trick]);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setTrick(strategies[difficulty].CreateTrick())
    //     }, 2000); // 2000ms = 2 seconds
    //
    //     return () => clearInterval(interval); // cleanup on unmount
    // }, [difficulty, trick]);

    useEffect(() => {
        const defer = setTimeout(() => {
            const queueSize = options.find(opt => opt.value === difficulty)?.queueSize
            setGenerator(new TrickGenerator(strategies[difficulty], queueSize));
        }, 0);

        return () => clearTimeout(defer);
    }, [difficulty]);

    const handleSpin = () => {
        setSpinClass("spin-exit")

        setTimeout(() => {
            const trick = generator.nextTrick()
            setTrick(trick);
            setSpinClass("spin-enter");
        }, 400)
    };


    return (
        <div className='trick-roulette'>
            <section>
                <h1><i><b>SK8M8</b></i></h1>
                <p style={{color: "#888", fontSize: ""}}>
                    <small>Trick Roulette</small>
                    <img src='src\assets\Infobox_info_icon.svg.png' style={{height: "20px", width: "auto"}}/>
                </p>
            </section>
            <section className="Trick-container">
                <div className="Trick-display">
                    <span className={`Trick-spin-wrapper  ${spinClass} `}>{trick}</span>
                </div>
                <div className="Trick-options">
                    {options.map((opt) => (
                        <label key={opt.value} className={`Trick-option-label ${difficulty === opt.value ? 'checked' : ''}`}>
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
           <button 
           className="Spin-btn" 
           onClick={handleSpin} 
           >
            Spin
            </button>
        </div>
    );
}

export default TrickRoulette
