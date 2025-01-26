import Player from "./components/Player/Player.jsx";
import GameBoard from "./components/GameBoard/GameBord.jsx";

function App() {

    const players = [
        {name: 'Player 1', symbol: 'X'},
        {name: 'Player 2', symbol: 'O'}
    ];

    function addLog(message) {
        console.log(message)
    }

    return (
        <main>
            <div id={'game-container'}>
                <ol id={'players'}>
                    {players.map((player, index) => (
                        <Player key={index} name={player.name} symbol={player.symbol}/>
                    ))}
                </ol>
                <GameBoard players={players} addLog={addLog}/>
            </div>
            LOG
        </main>
    )
}

export default App
