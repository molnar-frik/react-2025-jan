
export default function GameOver({winner, restartGame}) {
	return (
		<div id={'game-over'}>
			<h2>Game Over!</h2>
			{winner && (<p>{winner} now!</p>)}
			{!winner && (<p>It apos....</p>)}
			<button onClick={restartGame}>Restart Game</button>
		</div>
	)
}
