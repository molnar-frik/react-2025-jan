
const CoreConcept = ({concept}) => {

    return(
        <li>
            <img src={concept.image} alt={concept.title} />
            <h3>{concept.title}</h3>
            <p>{concept.description}</p>
        </li>
    );
};




export default CoreConcept;
