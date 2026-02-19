import '../styles/App.css';
import Card from './Card.jsx';

export default function CardContainer({cards, onClick}) {
    const loadingDiv = <div>Getting your cards!</div>;
    const isLoading = cards.length === 0;

    return (
        <main className="card-container">
            {isLoading && loadingDiv}
            {!isLoading && cards.map((character) => {
                return <Card url={character.image_url} name={character.name} dataId={character.mal_id} key={character.mal_id} onClick={onClick}></Card>
            })}
        </main>
        
    )
}