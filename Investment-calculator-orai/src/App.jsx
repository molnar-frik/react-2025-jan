import Header from "./componenst/Header/Header.jsx";
import {useState} from "react";
import UserInputs from "./componenst/UserInputs/UserInputs.jsx";
import Result from "./componenst/Results/Result.jsx";

function App() {

    // userInput a 4 db input mező, ami a felhasználó befektetési adatait tartalmazza:
    // initialInvestment: Kezdeti befektetés összege
    // annualInvestment: Éves befektetés összege
    // expectedReturn: Várható hozam százalékban
    // duration: Befektetés időtartama években

    const [userInput, setUserInput] = useState({
        initialInvestment: 10000,
        annualInvestment: 1200,
        expectedReturn: 6,
        duration: 10,
    });

    // handlerUserInput frissíti az userInput állapotot az inputField azonosítóval rendelkező beviteli mező értékével

    function handlerUserInput(inputFiled, newValue) {
        setUserInput((prevState) => {
            return {
                ...prevState,
                [inputFiled]: newValue
            }
        })
    }

    // Zéróósztó hibát kiküszöböljük azzal, hogy az időtartam minimum 1 év lehet
    // A return-ban van jelentősége, ha értéke false akkor nem a Result komponens hanem csak egyszerűen egy <p> kerül a képernyőre

    const InputIsValid = userInput.duration >= 1;

    // UserInputs komponens: tartalmazza a 4 beviteli mezőt
    // A beviteli mezők megkapján az userInput-ot, ebből olvassák ki a saját value értéküket
    // Megkapják a handlerUserInput callbackot, amin keresztül frissíthetik az userInput-ot

    // Result komponents: tartalmazza az eredménytáblázatot
    // Megkapja az akutális userInput-ot, egy külső eljárással elvégzi rajta a számítást
    // A saját maga által kiszámított adatokból elkészíti a táblázatot

    return (
        <>
            <Header/>
            <UserInputs handlerUserInput={handlerUserInput} userInput={userInput}/>
            {InputIsValid
                ? <Result input={userInput}/>
                : <p className={'center'}>Please enter the duration greater then zero!</p>
            }
        </>
    )
}

export default App
