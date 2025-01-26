import Square from "./Square.jsx";
import {useState} from "react";

const playerAi = null; // Az alkalmazott AI, értéke lehet: null, ChatGPT, Claude, Mistral
const playerNr = 2; // Az AI játékos azonosítója, értéke lehet: 1 vagy 2 (number!)

/**
 * A kezdő táblát jelentő adatszerkezet
 * @returns {[[string|null]]}
 */
function getInitialGameBoard() {
    return JSON.parse(JSON.stringify([
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]));
}

/**
 * A nyertes játékos szimbóluma, vagy NULL
 * @param {[[string|null]]} squares
 * @returns {string|null}
 */
function calculateWinner(squares) {
    const winningCombinations = [
        // Sorok
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // Oszlopok
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // Átlók
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]],
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            squares[a[0]][a[1]] &&
            squares[a[0]][a[1]] === squares[b[0]][b[1]] &&
            squares[a[0]][a[1]] === squares[c[0]][c[1]]
        ) {
            return squares[a[0]][a[1]];
        }
    }

    return null;
}

/**
 * True esetén a tábla ki van töltve
 * @param {[[string|null]]} squares
 * @returns {boolean}
 */
function isFilled(squares) {
    for (const row of squares) {
        for (const cell of row) {
            if (cell === null) {
                return false;
            }
        }
    }

    return true;
}

/**
 *
 * @param {[{name:string, symbol:string}]} players
 * @param {function} addLog
 * @returns {JSX.Element}
 * @constructor
 */
export default function GameBoard({players, addLog}) {

    const [isPlayer1, setIsPlayer1] = useState(true);
    const [squares, setSquares] = useState(getInitialGameBoard());

    // A körben aktív játékos szimbóluma
    let playerSymbol = isPlayer1 ? players[0].symbol : players[1].symbol;
    // True esetén a tábla ki van töltve
    let squaresIsFilled = isFilled(squares);
    // A nyertes játékos szimbóluma vagy NULL
    let winnerSymbol = calculateWinner(squares);

    function newGame() {
        addLog('Új játék');
        setSquares(getInitialGameBoard());
        setIsPlayer1(true);
    }

    function isGameOver() {
        return squaresIsFilled === true || winnerSymbol !== null;
    }

    function winnerResult() {
        if (winnerSymbol === null) {
            return 'Döntetlen';
        }
        return 'A nyertes: ' + winnerSymbol;
    }

    function handleClick(rowIndex, colIndex) {

        // Ha a cella értéke nem NULL, akkor a click művelet tiltva
        if (squares[rowIndex][colIndex] !== null) return;

        squares[rowIndex][colIndex] = playerSymbol;

        setSquares(squares);
        setIsPlayer1(!isPlayer1);

        addLog(`${playerSymbol} játékos: ${rowIndex + 1}. sor, ${colIndex + 1}. oszlop`);
    }

    if (isGameOver()) {
        addLog(winnerResult());
    }

    //region AI ellenfél
    if (playerAi !== null && isGameOver() === false && (isPlayer1 && playerNr === 1 || !isPlayer1 && playerNr === 2)) {

        fetch('http://laraai.test/api/tic-tac-toe', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({playerAi, squares, playerSymbol}),
        })
            .then((response) => response.json())
            .then((data) => {

                console.log('AI válasz:', data);

                if (Object.keys(data).indexOf('row') !== -1) {
                    handleClick(data['row'], data['cell']);
                }

            })
            .catch((error) => console.error('Hiba történt:', error));
    }

    //endregion

    return (
        <>
            <ol id={'game-board'}>
                {squares.map((row, rowIndex) => (
                    <li key={rowIndex}>
                        <ol>
                            {row.map((cell, colIndex) => (
                                <li key={colIndex}>
                                    <Square value={cell} onClick={() => handleClick(rowIndex, colIndex)}/>
                                </li>
                            ))}
                        </ol>
                    </li>
                ))}
            </ol>
            {isGameOver() && (
                <div id="game-over">
                    <h2>A játékos időnek vége!</h2>
                    <p>{winnerResult()}</p>
                    <button onClick={newGame}>Újrakezdés</button>
                </div>
            )}
        </>
    );
}
