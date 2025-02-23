import ProjectSliderBar from "./Components/ProjectSliderBar.jsx";
import NewProject from "./Components/NewProject.jsx";
import {useState} from "react";
import NoProjectSelected from "./Components/NoProjectSelected.jsx";
import SelectedProjects from "./Components/Selectedprojects.jsx";

function App() {
    
    const [projectsState, setProjectsState] = useState({
        setProjectId: undefined,
        projects: [],
    });
    
    function  handleStartAddProject() {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                setProjectId: null,
            };
        });
    };
    
    function handleCancelAddProject() {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                setProjectId: undefined,
            }})
    }
    
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
    
    function onSelectedProject(id){
        setProjectsState((prevState) => {
            return {
                ...prevState,
                setProjectId: id,
            }
        })
    }
    
    function handleRemoveProject(){
        setProjectsState((prevState) => {
            return {
                ...prevState,
                setProjectId: undefined,
                projects: prevState.projects.filter((item, index) => item.id !== projectsState.setProjectId),
            }
        })
    }
    
    const selectedProjects = projectsState.projects.find((item) => (item.id === projectsState.setProjectId))
    
    let content = <SelectedProjects projects={selectedProjects} deleteTask={handleRemoveProject} />;
    
    
    if(projectsState.setProjectId === null) {
        content = <NewProject onCancel={handleCancelAddProject} onAddProject={handleAddProject} />
    }else if(projectsState.setProjectId === undefined) {
        content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
    }
    
  return (
   <main className="h-screen my-8 flex gap-8">
       <ProjectSliderBar onStartAddProject={handleStartAddProject} onSelectedProject={onSelectedProject}  projects={projectsState.projects}/>
       {content}
   </main>
  );
}

export default App;
