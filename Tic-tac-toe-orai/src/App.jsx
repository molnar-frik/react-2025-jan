import Player from "./components/Player/Player.jsx";
import GameBoard from "./components/GameBoard/GameBord.jsx";
import {useState} from "react";
import Log from "./components/Log/Log.jsx";
import {WINNING_COMBINATIONS} from "./winning-combinations.js";
import GameOver from "./components/GameOver/GameOver.jsx";

const INITIALGROUP = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];


function App() {
	 const [gameRound, setGameRound] = useState([])
	const [activePlayer, setActivePlayer] = useState('X');
	
	
	let gameBoard = INITIALGROUP;
	
	for (const turn of gameRound) {
		const {square, player} = turn;
		const {col, row} = square;
		gameBoard[row][col] = player;
	}
	
	
	let winner;
	
	
	for (const combination of WINNING_COMBINATIONS) {
		const firstSquareSymbol =
			gameBoard[combination[0].row][combination[0].column];
		const secondSquareSymbol =
			gameBoard[combination[1].row][combination[1].column];
		const thirdSquareSymbol =
			gameBoard[combination[2].row][combination[2].column];
		
		if (
			firstSquareSymbol &&
			firstSquareSymbol === secondSquareSymbol &&
			firstSquareSymbol === thirdSquareSymbol
		) {
			winner = firstSquareSymbol;
		}
	}
	
	let hasDraw = gameRound.length === 9 && !winner;
	
	function restartGame() {
		console.log("restarting");
		setGameRound([]);
	}
	
	function handlerSelectedPlayer(rowIndex, colIndex) {
		setActivePlayer((prevState) => (prevState === 'X' ? 'O' : 'X'));
		setGameRound((prevTurn) => {
			let currentPlayer = 'X';
			
			if (prevTurn.length > 0 && prevTurn[0].player === 'X') {
				currentPlayer = 'O';
			}
			return [
				{
					square: {
						row: rowIndex,
						col: colIndex,
					},
					player: currentPlayer
				},
				...prevTurn
			];
		});
		
		
	}
	
	return (
		<main>
			<div id={'game-container'}>
				<ol id={'players'}>
					<Player name={'Palyer 1'}
							symbol={'X'}
							isActive={activePlayer === 'X'}
					/>
					<Player name={'Palyer 2'}
							symbol={'O'}
							isActive={activePlayer === 'O'}
					/>
				</ol>
				{(winner || hasDraw) && <GameOver winner={winner} restartGame={restartGame}/>}
				<GameBoard handlerSelectedPlayer={handlerSelectedPlayer}
					//activePlayer={activePlayer}
					//turns={gameRound}
						   gameBoard={gameBoard}
				/>
			</div>
			<Log turns={gameRound}/>
		</main>
	)
}

export default App
