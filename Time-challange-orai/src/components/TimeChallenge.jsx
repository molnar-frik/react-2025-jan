import {useState, useRef} from 'react';

import ResultModal from './ResultModal.jsx';

export default function TimerChallenge({title, targetTime}) {

    // Timer az időzítő referenciája
    // Dialog a ResultModal referenciája

    const timer = useRef();
    const dialog = useRef();

    // timerStarted: Időzítő elindítva (bool)
    // timerExpired: Idő lejárt (bool)

    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);

    // handleStart: elindítja az időzítőt a targetTime értékével
    // Az időzítő callbackjában a "lejárt az idő" folyamat fut le
    // Az időzítő referenciában elérhető máshonnan is

    function handleStart() {
        timer.current = setTimeout(() => {

            // az open() itt az useImperativeHandle által definiált függvény
            // Elég lenne a dialog showModal() meghívása is, de ennek van más előnye is: absztrakció, karbantarthatóság és tisztább api
            // Absztrakció: ha a showModal-t használjuk, akkor a ResultModal csak egy <dialog> lehet, így viszont később átalakítható

            setTimerExpired(true);
            dialog.current.open();

        }, targetTime * 1000);

        setTimerStarted(true);
    }

    // handleStop: Törli a referenciában tárolt időzítő tartalmát, de a timeStarted true marad

    function handleStop() {
        clearTimeout(timer.current);
    }

    // handleReset: A ResultModal callbackja, alaphelyzetbe állítja az időzítő futását

    function handleReset() {
        setTimerStarted(false);
    }

    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} result="lost" handleReset={handleReset}/>
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerStarted ? handleStop : handleStart}>
                        {timerStarted ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerStarted ? 'active' : undefined}>
                    {timerStarted ? 'Time is running...' : 'Timer inactive'}
                </p>
            </section>
        </>
    );
}
