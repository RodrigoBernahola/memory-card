import '../styles/App.css';
import Gameboard from './Gameboard.jsx';
import CardContainer from './CardContainer.jsx';

// const fetchResult = fetch("https://api.jikan.moe/v4/anime/21/characters")
//                     .then(response => response.json())
//                     .then(data =>  {
//                       console.log(data.data[0].character.images.jpg.image_url);
//                     });

// console.log(fetchResult);

function App() {
  return (
    <>
      
      <Gameboard>

      </Gameboard>
      <CardContainer>

      </CardContainer>
    </>
  )
}

export default App
