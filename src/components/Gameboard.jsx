import '../styles/App.css';
import Score from './Score.jsx';
import BestScore from './BestScore.jsx';

export default function Gameboard() {
    

    return (
        <header>
            <h1>Memory card game - One Piece</h1>
            <Score></Score>
            <BestScore></BestScore>
        </header>
    )
}