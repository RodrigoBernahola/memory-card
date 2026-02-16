import '../styles/App.css';
import Card from './Card.jsx';
import JSON_MOCK from './data.js';

export default function CardContainer() {

    const cardItems = JSON_MOCK.data.map( (characterObject) => 
        <Card url={characterObject.character.images.jpg.image_url} name={characterObject.character.name} key={characterObject.mal_id}></Card>
    )

    return (
        <main className="card-container">
            {cardItems}
        </main>
        
    )
}