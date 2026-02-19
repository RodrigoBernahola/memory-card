import '../styles/App.css';
import Gameboard from './Gameboard.jsx';
import CardContainer from './CardContainer.jsx';
import { useState, useEffect } from 'react';

function App() {
  const [cards, setCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameStatus, setGameStatus] = useState(null);

  function shuffleArray(cards) {
    const arrayOfIndices = getRandomIndices(10);
    const shuffledArray = [...cards];
    for (let i = 0; i < 10; i++) {  
      let j = arrayOfIndices[i];
      console.log(j);
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; 
    }
    return shuffledArray;
  }

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

  function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
  }

  function getRandomIndices(max) {
      const arrayOfIndices = [];
      while (arrayOfIndices.length < 10) {
          const newIndex = getRandomInt(0, max);
          if (!arrayOfIndices.includes(newIndex)) arrayOfIndices.push(newIndex);
      }
      return arrayOfIndices;
  }

  function getTenCharacters(data) {
      const auxArray = [];
      const indexArray = getRandomIndices(data.length);

      for (let i = 0; i < 10; i++) {
          const index = indexArray[i];
          const {character} = data[index];
          auxArray[i] = character;
      } 

      return auxArray;
  }

  function getCleanData({data}) {
      const arrayOfCharacters = getTenCharacters(data);
      const cleanData = arrayOfCharacters.map((characterObject) => {
          return {
              name: characterObject.name,
              mal_id: characterObject.mal_id,
              image_url: characterObject.images.jpg.image_url
          }
      })

      return cleanData;
  }

  useEffect(
        () => {
            try {
                async function getCharactersFromAPI() {
                    const response = await fetch("https://api.jikan.moe/v4/anime/21/characters");
                    if (!response.ok) {throw new Error("Invalid response");
                    }              
                    const data = await response.json();
                    const cleanData = getCleanData(data);
                    setCards(cleanData);
                }
                getCharactersFromAPI()
            } catch (error) {
                console.error(error);
            }
        }
    , [])

  function resetGame() {
    setGameStatus(null);
    setClickedCards([]);
    setScore(0);
    setCards(shuffleArray(cards));
  }

  return (
    <>  
      <Gameboard score={score} bestScore={bestScore} onScoreUpdate={setScore} onBestScoreUpdate={setBestScore}>
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

      <footer>
        <p>Haz clic en cada personaje solo una vez para ganar</p>
      </footer>
    </>
  )
}

export default App
