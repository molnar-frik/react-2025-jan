import Input from "./Input.jsx";
import {useRef} from "react";

export default function NewProject({onCancel, onAddProject}) {
	const title = useRef();
	const enteredDescription = useRef();
	const enteredDueDate = useRef();
	
	function handleSave(){
		onAddProject({
			title: title.current.value,
			description: enteredDescription.current.value,
			dueDate: enteredDueDate.current.value,
		})
	}
	
	
	return (
		<div className="w-[35rem] mt-16">
			<menu className="flex items-center justify-end gap-4 my-4">
				<li>
					<button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>Cancel</button>
				</li>
				<li>
					<button className="px-6 py-2 rounded-md text-stone-300 bg-stone-800 hover:text-stone-950" onClick={handleSave}>Save</button>
				</li>
			</menu>
			<div>
				<Input label={"Title"} ref={title}/>
				<Input label={"Description"} textarea ref={enteredDescription}/>
				<Input type={"date"} label={"Due Date"} ref={enteredDueDate}/>
			</div>
		</div>
	)
}
