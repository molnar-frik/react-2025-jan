import {forwardRef, useImperativeHandle, useRef} from 'react';
import {createPortal} from "react-dom";

// A forwardRef egy React függvény, amely lehetővé teszi, hogy egy komponens továbbítson egy ref-et egy gyermek komponensnek.
// Ez hasznos lehet, ha egy szülő komponens közvetlenül szeretne hozzáférni egy gyermek komponens DOM eleméhez vagy egyéb referenciájához.
// A komponenst egy függvényként definiáljuk, amely két paramétert fogad: a prop-okat és a ref-et.
// A ref-et továbbítjuk a gyermek komponensnek vagy DOM elemnek.

const ResultModal = forwardRef(function ResultModal({result, targetTime, handleReset}, ref) {

    const dialog = useRef();

    // Az useImperativeHandle egy React hook, amely lehetővé teszi, hogy egy komponens kiteszítsen bizonyos metódusokat vagy értékeket a szülő komponens számára, amikor egy ref-et használ.
    // Ez hasznos lehet, ha a szülő komponensnek szüksége van a gyermek komponens belső működésének vezérlésére.

    useImperativeHandle(ref, () => {
        return {
            open() {

                // A showModal() függvény egy beépített módszer a HTML <dialog> elem számára, amely megjeleníti a modális párbeszédablakot.
                // Amikor ezt a függvényt meghívják, a <dialog> elem modálisként jelenik meg, ami azt jelenti,
                // hogy a felhasználó nem tud interakcióba lépni a többi tartalommal, amíg a párbeszédablak nyitva van.

                // A <dialog> html elemnek három függvénye van (ez nem react...)
                // const dialog = document.querySelector('dialog');
                // dialog.showModal();
                // dialog.show();
                // dialog.close();

                dialog.current.showModal();
            }
        };
    });

    return (
        createPortal(
            <dialog ref={dialog} className="result-modal">
                <h2>You {result}</h2>
                <p>
                    The target time was <strong>{targetTime} seconds.</strong>
                </p>
                <p>
                    You stopped the timer with <strong>X seconds left.</strong>
                </p>
                <form method="dialog" onSubmit={handleReset}>
                    <button>Close</button>
                </form>
            </dialog>
            ,
            document.getElementById('modal')
        ));
})

export default ResultModal;
