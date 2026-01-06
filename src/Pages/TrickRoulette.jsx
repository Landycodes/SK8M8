import { useState, useEffect } from 'react';
import { TrickGenerator } from '../Utilities/trickGen.js';
import { strategies } from '../Utilities/strategies.js';
import infoIcon from "../assets/infobox_info_icon.png"

function TrickRoulette() {
    const [trick, setTrick] = useState("");
    const [difficulty, setDifficulty] = useState("beginner");
    const [generator, setGenerator] = useState(() => new TrickGenerator(strategies[difficulty]))
    const [spinClass, setSpinClass] = useState(""); // '' | 'spin-exit' | 'spin-enter'
    const [modulOpen, setModulOpen] = useState(false)

    const options = [
        { label: "Beginner", value: "beginner", queueSize: 3 },
        { label: "Amateur", value: "am", queueSize: 5 },
        { label: "Pro", value: "pro", queueSize: 10 },
        { label: "Sweaty", value: "sweaty", queueSize: 10 },
    ];


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


    return (
        <div className='trick-roulette'>
            <section>
                <h1><i><b>SK8M8</b></i></h1>
                <span style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <p style={{color: "#888", fontSize: ""}}>
                    <small>Trick Roulette</small>
                    &nbsp;
                </p>
                <img className="info-btn" src={infoIcon} alt='info' onClick={() => setModulOpen(true)} style={{height: "22px", width: "auto"}}/>
                </span>
            </section>
            {modulOpen ? handleModul() : ""}
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
