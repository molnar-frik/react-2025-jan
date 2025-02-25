import {useCallback, useState} from "react";
import quizISCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";
import QuestionTime from "./QuestionTime.jsx";

export default function Quiz() {

    // userAnswer: Felhasználói válaszok (a képernyőn megjelent szövegeket tartalmazó lista)
    const [userAnswer, setUserAnswer] = useState([]);

    // A válaszok száma (ez egyben az aktív kérédés indexe is a QUESTIONS-ben)
    const activeQuestionIndex = userAnswer.length;

    // A kvíz befejeződött ha a válaszok száma azonos a kérdések számával
    const quizIComplete = activeQuestionIndex === QUESTIONS.length;

    // Kiegészíti a felhasználói válaszokat az aktuális válasszal
    function handlerSelectAnswer(answer) {
        setUserAnswer((prevState) => {
            return [...prevState, answer];
        });
    }

    // Ha lejárt az idő és az user nem válaszolt, akkor a felhasználói válaszok egy NULL-t kapnak
    // Ezzel nő az userAnswer tömb mérete -> léptetődik a következő kérdésre
    function handlerSkipAnswer() {
        handlerSelectAnswer(null);
    }

    // Ha befejeződött a kvíz, akkor egy összegző panelt jelenítünk meg és kilépünk

    if (quizIComplete) {
        return (
            <div id = "summary">
                <img src = {quizISCompleteImg} alt = "Trophy icon"/>
                <h2>Quiz Completed!</h2>
                <ol>
                    <li>
                        <h3>1</h3>
                        <p className={'question'}>Kérdés</p>
                        <p className={'user-answer'}>Válasz</p>
                    </li>
                </ol>
            </div>
        )
    }

    // Randomizáljuk az aktuális kérdéshez tartozó válaszok sorrendjét
    // const randomAnswers = QUESTIONS[activeQuestionIndex].answers.slice();
    // A slice() új tömböt hoz létre, ezzel kiküszöbölhető a referenciaátadás problémája

    const randomAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    randomAnswers.sort(() => Math.random() - 0.5);

    return (
        <div id = "quiz">
            <div id = "question">
                <QuestionTime
                    key = {activeQuestionIndex}
                    timeout = {10000}
                    onTimeout = {handlerSkipAnswer}/>
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id = "answers">
                    {randomAnswers.map((answer, index) => (
                        <li key = {index} className = "answer">
                            <button onClick = {() => handlerSelectAnswer(answer)}>
                                {answer}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
