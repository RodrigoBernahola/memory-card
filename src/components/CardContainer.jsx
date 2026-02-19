import '../styles/App.css';
import Card from './Card.jsx';
import JSON_MOCK from './data.js';
import {useEffect, useState} from 'react';

export default function CardContainer({state, onStateUpdate}) {
    const [cardItems, setCardItems] = useState([]);
    const loadingDiv = <div>Getting your cards!</div>;

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
        console.log(data);
        console.log(indexArray);
        
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
            console.log(characterObject);
            return {
                name: characterObject.name,
                mal_id: characterObject.mal_id,
                image_url: characterObject.images.jpg.image_url
            }
        })

        return cleanData;
    }

    useEffect(
        //callback
        () => {
            try {
                async function getCharactersFromAPI() {
                    const response = await fetch("https://api.jikan.moe/v4/anime/21/characters");
                    if (!response.ok) {throw new Error("Invalid response");
                    }              
                    const data = await response.json();
                    const cleanData = getCleanData(data);
                    setCardItems(cleanData);
                    onStateUpdate('playing');
                }
                getCharactersFromAPI()
            } catch (error) {
                console.error(error);
            }
        }
    , [])

    return (
        <main className="card-container">
            {state === 'loading' && loadingDiv}
            {state === 'playing' && cardItems.map((character) => {
                return <Card url={character.image_url} name={character.name} key={character.mal_id}></Card>
            })}
        </main>
        
    )
}