import '../styles/App.css';
import Gameboard from './Gameboard.jsx';
import CardContainer from './CardContainer.jsx';
import {useState} from 'react';

function App() {
  const [gameState, setGameState] = useState('loading');

  function stateUpdate(state) {
    setGameState(state);
  }

  return (
    <>
      
      <Gameboard score={0} bestScore={0}>

      </Gameboard>
      <CardContainer state={gameState} onStateUpdate={stateUpdate}>

      </CardContainer>

      <footer>
        Future footer info 
      </footer>
    </>
  )
}

export default App
