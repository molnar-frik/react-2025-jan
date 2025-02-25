import {useEffect, useState} from 'react';

export default function QuestionTimer({timeout, onTimeout}) {

    // Egy visszaszámláló időzítőt valósít meg, amely a "timeout" lejárta után az "onTimeout" függvényt futtatja

    // remainingTime: a hátralévő idő, default-ja a paraméterben kapott lejárati idő
    const [remainingTime, setRemainingTime] = useState(timeout);

    // A useEffect egy setTimeout időzítőt állít be, amely a "timeout" idő lejárta után meghívja az "onTimeout" függvényt
    // A benne lévő clearTimeout akkor aktiválódik, ha változik a paraméterben kapott "timeout" vagy az "onTimeout" értéke

    useEffect(() => {

        const timer = setTimeout(onTimeout, timeout);

        return () => {
            clearTimeout(timer)
        }
    }, [timeout, onTimeout]);

    // A useEffect egy setInterval intervallumot állít be, amely 100 ms-onként csökkenti a remainingTime értékét 100 ms-mal

    useEffect(() => {

        const interval = setInterval(() => {
            setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
        }, 100);

        return () => {
            clearInterval(interval);
        }
    }, []);

    // A két useEffect cselesen működik.
    // A clearTimeout és a clearInterval gyakorlatilag akkor fut le, ha a komponens megszűnik létezni
    // A komponens törlését és újra létrehozását viszont a Quiz komponens vezérli, ha ott változik az userAnswer useState
    // Itt gyakorlatilag annyi történik, hogy elindul két időzítő:
    // az egyik frissíti a komponenst a remainingTime useState-en keresztül
    // a másik várakozik és ha letelik a timeout, akkor futtatja az onTimeout callbackot
    // Ha az egész komponens törlésre kerül a Quiz újrarenderelése által, akkor ez a két időzítő törlődik

    return <progress id = "question-time" max = {timeout} value = {remainingTime}/>;
}
