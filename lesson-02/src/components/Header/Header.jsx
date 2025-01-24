import './Header.css'
const reactDescriptions = ['Fundamental', 'Crucial', 'Core'];

function getRandomItem(max){
    return Math.floor(Math.random()*(max+1));
}

const Header = () => {

    return (
        <header>
            <img src="src/assets/react-core-concepts.png" alt="Stylized atom"/>
            <h1>React Essentials</h1>
            <p>
                {reactDescriptions[getRandomItem(2)]} React concepts you will need for almost any app you are
                going to build!
            </p>
        </header>
    )
}


export default Header;
