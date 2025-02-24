import ProjectSliderBar from "./Components/ProjectSliderBar.jsx";
import NewProject from "./Components/NewProject.jsx";
import {useState} from "react";
import NoProjectSelected from "./Components/NoProjectSelected.jsx";
import SelectedProjects from "./Components/Selectedprojects.jsx";

function App() {

    // useState hook tartalmazza a kiválasztott projekt azonosítóját (ha van) és az összes projektet
    // A setProjectId háromféle értéket vehet fel, ami alul a content értékét szabályozza:
    // undefinied esetén "nincs kiválasztott projekt" (default) -> <NoProjectSelected> renderelődik
    // NULL esetén "új projekt hozzáadása" történik -> <NewProject> renderelődik
    // Egyéb esetben a kiválasztott projektet a selectedProjects változóban is elhelyezzük

    const [projectsState, setProjectsState] = useState({
        setProjectId: undefined,
        projects: [],
    });

    const selectedProjects = projectsState.projects.find((item) => (item.id === projectsState.setProjectId));

    // Callback: új projekt hozzáadása panel megjelenítése (sidebar és no-project panelek)
    // Egyszerűen csak NULL értéket ad a setProjectId-nak

    function handleStartAddProject() {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                setProjectId: null,
            };
        });
    }

    // Callback: új projekt hozzáadása panelen a "mégse" gomb
    // Egyszerűen csak undefined értéket ad a setProjectId-nak

    function handleCancelAddProject() {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                setProjectId: undefined,
            }
        })
    }

    // Callback: új projekt hozzáadása panelen a "mentés" gomb
    // Random ID-val elmenti a kapott projekt adatait majd undefined értéket ad a kiválasztott projektnek

    function handleAddProject(project) {
        setProjectsState((prevState) => {
            const projectId = Math.random();

            return {
                ...prevState,
                setProjectId: undefined,
                projects: [...prevState.projects, {...project, id: projectId}],
            }
        })
    }

    // Callback: a sidebaron lévő "projekt kiválasztása" gomb
    // A kiválasztott azonosítót átadja a setProjectId-nak

    function onSelectedProject(id) {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                setProjectId: id,
            }
        })
    }

    // Callback: a projekt adatlapon a "törlés" gomb
    // Törli a setProjectId-hoz tartozó projektet majd undefined értéket ad a setProjectId-nak

    function handleRemoveProject() {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                setProjectId: undefined,
                projects: prevState.projects.filter((item, index) => item.id !== projectsState.setProjectId),
            }
        })
    }

    // Content: a sliderbar oldalsáv mellett megjelenő tartalom, a projekt választás állapotától függ
    // Ha van választott projekt, akkor annak az adatai látható, egyébként "új projekt" vagy "nincs választott projekt"

    let content = <SelectedProjects projects = {selectedProjects} deleteTask = {handleRemoveProject}/>;

    if (projectsState.setProjectId === null) {
        content = <NewProject onCancel = {handleCancelAddProject} onAddProject = {handleAddProject}/>
    } else if (projectsState.setProjectId === undefined) {
        content = <NoProjectSelected onStartAddProject = {handleStartAddProject}/>
    }

    return (
        <main className = "h-screen my-8 flex gap-8">
            <ProjectSliderBar onStartAddProject = {handleStartAddProject} onSelectedProject = {onSelectedProject} projects = {projectsState.projects}/>
            {content}
        </main>
    );
}

export default App;
