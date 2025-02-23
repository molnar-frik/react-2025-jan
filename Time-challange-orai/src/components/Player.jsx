import {useRef, useState} from "react";

export default function Player() {

    // Az userName egy useState, ha frissül, akkor a komponens újra generálódik
    // A playerName csak egy useRef, egy hivatkozás az input mezőre

    const [userName, setUserName] = useState(null);
    const playerName = useRef();

    // A handleClick a button click eseményére beállítja az input value értékét az userName

    function handleClick() {
        setUserName(playerName.current.value);
    }


    return (
        <section id="player">
            <h2>Welcome {userName ?? 'unknown entity'}</h2>
            <p>
                <input type="text" ref={playerName}/>
                <button onClick={handleClick}>Set Name</button>
            </p>
        </section>
    );
}
