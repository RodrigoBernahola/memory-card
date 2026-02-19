import '../styles/App.css';
import Gameboard from './Gameboard.jsx';
import CardContainer from './CardContainer.jsx';
import { useState, useEffect } from 'react';
import { shuffleArray, getCleanData} from './utils/utils.js';

function App() {
  const [cards, setCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameStatus, setGameStatus] = useState(null);
  const [error, setError] = useState(null);

  function handleClick(e) {
    const id = e.currentTarget.dataset.id;
    if (clickedCards.includes(id)) {
      if (score > bestScore) setBestScore(score);
      setGameStatus('lost');
      setClickedCards([]);
      setScore(0);
      setCards(shuffleArray(cards));
    }
    else {
      const newClickedCards = [...clickedCards, id];
      const newScore = score + 1;
      setClickedCards(newClickedCards);
      setScore(newScore);
      
      if (newScore === 10) {
        setGameStatus('won');
        if (newScore > bestScore) setBestScore(newScore);
      } else {
        setCards(shuffleArray(cards));
      }
    }
  }

  useEffect(() => {
    async function getCharactersFromAPI() {
      try {
        const response = await fetch("https://api.jikan.moe/v4/anime/21/characters");
        if (!response.ok) throw new Error("Invalid response");
        const data = await response.json();
        const cleanData = getCleanData(data);
        setCards(cleanData);
      } catch (error) {
        setError(error.message);
      }
    }
    getCharactersFromAPI();
  }, []);

  function resetGame() {
    setGameStatus(null);
    setClickedCards([]);
    setScore(0);
    setCards(shuffleArray(cards));
  }

  return (
    <>  
      <Gameboard score={score} bestScore={bestScore}>
      </Gameboard>
      <CardContainer cards={cards} onClick={handleClick}></CardContainer>

      {gameStatus && (
        <div className="modal-overlay" onClick={resetGame}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <h2>{gameStatus === 'won' ? '¡Victoria!' : '¡Derrota!'}</h2>
              <p>
                {gameStatus === 'won' 
                  ? '¡Has encontrado todos los personajes sin repetir!' 
                  : '¡Has clickeado el mismo personaje dos veces!'}
              </p>
              <p className="final-score">Puntuación: {score}</p>
              <button onClick={resetGame} className="play-again-btn">
                Jugar de nuevo
              </button>
            </div>
          </div>
        </div>
      )}
      {error && <p>Error al cargar las cartas: {error}</p>}

      <footer>
        <p>Haz clic en cada personaje solo una vez para ganar</p>
      </footer>
    </>
  )
}

export default App