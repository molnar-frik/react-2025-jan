import {useState} from "react";


export default function GameBoard({handlerSelectedPlayer, gameBoard}) {
	

	// function handleGameBoardChange(rowIndex, colIndex) {
	// 	setInitialGameBoard((prevState) => {
	// 		const updatedGameBoard = [...prevState];
	// 		updatedGameBoard[rowIndex][colIndex] = activePlayer;
	// 		return updatedGameBoard;
	// 	});
	//
	// 	handlerSelectedPlayer();
	// }
	
	return	(
		<ol id={'game-board'}>
			{gameBoard.map((row, rowIndex) => (
				<li key={rowIndex}>
					<ol>
						{row.map((playerSymbol, colIndex) => (
							<li key={colIndex}>
								<button onClick={() => handlerSelectedPlayer(rowIndex, colIndex)}
										disabled={playerSymbol !== null}>{playerSymbol}</button>
							</li>
						))}
					</ol>
				</li>
			))}
		</ol>
	);
}
