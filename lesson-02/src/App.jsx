import Header from "./components/Header/Header";
import {CORE_CONCEPTS, EXAMPLES} from "./data";
import {useState} from "react";
import CoreConcept from "./components/CoreConcept/CoreConcept";
import TabButton from "./components/TabButton/TabButton";

function App() {
    const [selectedTopic, setSelectedTopic] = useState();

    let TabComponent = <p>Please select a topic</p>


    if (selectedTopic) {

        TabComponent = (
            <div id={'tab-content'}>
                <h3>{EXAMPLES[selectedTopic].title}</h3>
                <p>{EXAMPLES[selectedTopic].description}</p>
                <pre>
                    <code>{EXAMPLES[selectedTopic].code}</code>
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
                    <ul>
                        {CORE_CONCEPTS.map((concept, index) => (
                            <CoreConcept key={index} concept={concept}/>
                        ))}
                    </ul>
                </section>
                <h2>Time to get started!</h2>
                <section id={"examples"}>
                    <h2>Example</h2>
                    <menu>
                        <TabButton isSelected={selectedTopic === 'components'}
                                   onSelect={() => setSelectedTopic('components')}>COMPONENTS</TabButton>
                        <TabButton isSelected={selectedTopic === 'jsx'}
                                   onSelect={() => setSelectedTopic('jsx')}>JSX</TabButton>
                        <TabButton isSelected={selectedTopic === 'props'}
                                   onSelect={() => setSelectedTopic('props')}>PROPS</TabButton>
                        <TabButton isSelected={selectedTopic === 'state'}
                                   onSelect={() => setSelectedTopic('state')}>STATE</TabButton>
                    </menu>
                    {TabComponent}
                </section>
            </main>
        </div>
    );
}

export default App;
