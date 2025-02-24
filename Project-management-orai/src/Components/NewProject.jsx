import Input from "./Input.jsx";
import {useRef} from "react";

// Komponens: Új projekt hozzáadása
// Két callback függvényt vár: 'cancel' és 'add'

export default function NewProject({onCancel, onAddProject}) {

    // A három beviteli mező referenciába kerül
    // Az értékeiket a button click eseménye olvassa ki és adja át az 'add' callbacknak

    const title = useRef();
    const enteredDescription = useRef();
    const enteredDueDate = useRef();

    function handleSave() {
        onAddProject({
            title: title.current.value,
            description: enteredDescription.current.value,
            dueDate: enteredDueDate.current.value,
        })
    }

    // Két fejlécgomb: mégse és a mentés
    // Három <Input> komponens, ami lehet text és textarea is

    return (
        <div className = "w-[35rem] mt-16">
            <menu className = "flex items-center justify-end gap-4 my-4">
                <li>
                    <button className = "text-stone-800 hover:text-stone-950" onClick = {onCancel}>Cancel</button>
                </li>
                <li>
                    <button className = "px-6 py-2 rounded-md text-stone-300 bg-stone-800 hover:text-stone-950" onClick = {handleSave}>Save</button>
                </li>
            </menu>
            <div>
                <Input label = {"Title"} ref = {title}/>
                <Input label = {"Description"} textarea ref = {enteredDescription}/>
                <Input label = {"Due Date"} type = {"date"} ref = {enteredDueDate}/>
            </div>
        </div>
    )
}
