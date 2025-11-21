import { useState, useEffect } from 'react';

function TrickRoulette() {
    const [trick, setTrick] = useState("");
    const [difficulty, setDifficulty] = useState("beginner");
    const [queue, setQueue] = useState([])
    const [pop, setPop] = useState(false);
    const [spinClass, setSpinClass] = useState(""); // '' | 'spin-exit' | 'spin-enter'



    useEffect(() => {
        setPop(true);
        const timer = setTimeout(() => setPop(false), 200); // match CSS transition
        return () => clearTimeout(timer);
    }, [trick]);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setTrick(strategies[difficulty].CreateTrick())
    //     }, 2000); // 2000ms = 2 seconds
    //
    //     return () => clearInterval(interval); // cleanup on unmount
    // }, [difficulty, trick]);

    useEffect(() => {
        setQueue([])
    }, [difficulty]);

    const easyRotations = ["FS 180", "BS 180"];
    const hardRotations = ["FS 360", "BS 360"];
    const easyFlips = ["Kickflip", "Heelflip"];
    const shuvs = ["FS Shuvit", "BS Shuvit"];
    const hardTricks = [
        "Tre Flip",
        "Hard Flip",
        "Impossible",
        "Inward Heel",
        "Varial Flip",
        "Varial Heel",
        "BS Big Spin",
        "FS Big Spin",
        "Big Flip",
        "Big Heel",
    ];
    const sweatyTricks = [
        "BS Bigger Spin",
        "FS Bigger Spin",
        "Bigger Flip",
        "BS 540 Shuvit",
        "540 Flip",
        "Dolphin Flip",
        "FS Gazelle Spin",
        "BS Gazelle Spin",
        "Double Tre Flip",
        "360 Hard Flip",
        "360 Inward Heel",
        "Laser Flip",
    ]
    const side = ["FS", "BS"]
    const slide = [
        "Nose Slide",
        "Tail Slide",
        "Board Slide",
        "Lip Slide",
        "Blunt Slide",
        "Nose Blunt Slide"
    ]
    const grinds = [
        "50-50",
        "5-0",
        "NoseGrind",
        "Smith",
        "Feeble",
        "Crook",
        "Salad"
    ]

    const stance = [
        { name: "Switch", weight: 1 },
        { name: "Fakie", weight: 1 },
        { name: "Nollie", weight: 1 },
        { name: "", weight: 1 }
    ];

    const options = [
        { label: "Beginner", value: "beginner" },
        { label: "Amateur", value: "am" },
        { label: "Pro", value: "pro" },
        { label: "Sweaty", value: "sweaty" },
    ];
    const randomize = (array) => array[Math.floor(Math.random() * array.length)];
    const weightedRandom = (values) => {
        let totalWeight = 0
        values.forEach(w => totalWeight += w.weight)
        let random = Math.random() * totalWeight

        for(const v of values){
            if(random <= v.weight){
                return v.name.trim()
            }
            random -= v.weight
        }
        return "Oh no dude, Something Broke :("
    }
    const setStanceWeights = ({Switch=1, Fakie=1, Nollie=1, Regular=1} = {}) => {
        stance.forEach((s) =>{
            switch (s.name){
                case "Switch":
                    s.weight = Switch
                    break;
                case "Fakie":
                    s.weight = Fakie
                    break;
                case "Nollie":
                    s.weight = Nollie
                    break;
                default: s.weight = Regular
            }
        })
    }

    const addToQueue = (trick, qsize) => {
        if(queue.includes(trick)){
            return false
        }
        setQueue(oldQ => {
            const updatedQ = [trick, ...oldQ]

            if(updatedQ.length > qsize) updatedQ.pop()

            return updatedQ
        })
        return true
    }


    const strategies = {
        beginner: {
            CreateTrick: function () {
                const any = [randomize(easyRotations), randomize(easyFlips), randomize(shuvs), "Ollie"];
                const newTrick = any[Math.floor(Math.random() * any.length)]
                if(!addToQueue(newTrick,3)) return this.CreateTrick()
                console.log(queue)
                return newTrick;
            },
        },
        am: {
            CreateTrick: function () {
                setStanceWeights({Regular: 3, Fakie: 2})
                const st = weightedRandom(stance)
                const tr = randomize([...easyRotations, ...easyFlips, ...shuvs, st === "Nollie" ? "" : "Ollie"])
                const newTrick = [st, tr].filter(Boolean).join(" ")
                if(!addToQueue(newTrick,5)) return this.CreateTrick()
                console.log(queue)
                return newTrick;
            },
        },
        pro: {
            CreateTrick: function () {
                setStanceWeights({Regular: 2})
                const st = weightedRandom(stance)
                const er = randomize(easyRotations)
                const hr = randomize(hardRotations)
                const ar = randomize([...side, ...hardRotations])
                const sh = "Shuvit"
                const ef = randomize(easyFlips)
                const ht = randomize(hardTricks)
                const combos = [
                    { name: `${st} ${er} ${ef}`, weight: 2 },
                    { name: `${st} ${ar} ${sh}`, weight: 1 },
                    { name: `${st} ${ef}`, weight: 2 },
                    { name: `${st} ${ht}`, weight: 5 },
                    { name: `${st} ${hr}`, weight: 1 },
                ]
                const newTrick = weightedRandom(combos)
                if(!addToQueue(newTrick,10)) return this.CreateTrick()
                console.log(queue)
                return newTrick
            },
        },
        sweaty: {
            CreateTrick: function () {
                const st = weightedRandom(stance)
                const swt = randomize(sweatyTricks)
                const r = randomize([...easyRotations, ...hardRotations])
                const ef = randomize(easyFlips, "Double Flip", "Double Heel")
                const swf = randomize(["Double Flip", "Double Heel"])
                const ht = randomize(hardTricks)
                const combos = [
                    { name: `${st} ${r} ${ef}`, weight: 2 },
                    { name: `${st} ${swt}`, weight: 4 },
                    { name: `${st} ${swf}`, weight: 2 },
                    { name: `${st} ${r} ${swf}`, weight: 1 },
                    { name: `${st} ${ht}`, weight: 2 }
                ]
                const newTrick = weightedRandom(combos)
                if(!addToQueue(newTrick,10)) return this.CreateTrick()
                console.log(queue)
                return newTrick
            },
        },
    };

    const handleSpin = () => {
        setSpinClass("spin-exit")

        setTimeout(() => {
            setTrick(strategies[difficulty].CreateTrick());
            setSpinClass("spin-enter");
        }, 400)
    };


    return (
        <div className='trick-roulette'>
            <section>
                <h1><i><b>SK8M8</b></i></h1>
                <p style={{color: "#888", fontSize: ""}}><small>Trick Roulette</small></p>
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
           <button className="Spin-btn" onClick={handleSpin}>Spin</button>
        </div>
    );
}

export default TrickRoulette
