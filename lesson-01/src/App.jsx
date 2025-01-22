import Header from "./components/Header/Header";
import {CORE_CONCEPTS, EXAMPLES} from "./data";
import {useState} from "react";

function App() {
    const [selectedTopic, setSelectedTopic] = useState();

    let TabComponent = <p>Please select a topic</p>


    if (selectedTopic) {

        TabComponent = (
            <div id={'tab-content'}>
                <h3>{EXAMPLES[CORE_CONCEPTS[selectedTopic].title.toLowerCase()].title}</h3>
                <p>{EXAMPLES[CORE_CONCEPTS[selectedTopic].title.toLowerCase()].description}</p>
                <pre>
                    <code>{EXAMPLES[CORE_CONCEPTS[selectedTopic].title.toLowerCase()].code}</code>
                </pre>
            </div>
        )
    }

    return (
        <div>
            <Header/>
            <main>
                <section id="core-concepts">
                    <h2>Core concepts</h2>
                    {CORE_CONCEPTS.map((concept, index) => (
                        <p key={index}>{concept.title}</p>
                    ))}
                </section>
                <h2>Time to get started!</h2>
                <section id={"example"}>
                    <h2>Example</h2>
                    <menu>
                        <button onClick={() => setSelectedTopic(0)}>COMPONENTS</button>
                        <button onClick={() => setSelectedTopic(1)}>COMPONENTS</button>
                        <button onClick={() => setSelectedTopic(2)}>COMPONENTS</button>
                        <button onClick={() => setSelectedTopic(3)}>COMPONENTS</button>
                    </menu>
                    {TabComponent}
                </section>
            </main>
        </div>
    );
}

export default App;
