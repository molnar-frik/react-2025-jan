import Player from "./components/Player/Player.jsx";
import GameBoard from "./components/GameBoard/GameBord.jsx";

function App() {
  

  return (
    <main>
      <div id={'game-container'}>
        <ol id={'players'}>
          <Player name={'Palyer 1'} symbol={'X'}/>
          <Player name={'Palyer 2'} symbol={'O'}/>
        </ol>
         <GameBoard/>
      </div>
        LOG
    </main>
  )
}

export default App
