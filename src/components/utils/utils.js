export function shuffleArray(cards) {
    const arrayOfIndices = getRandomIndices(10);
    const shuffledArray = [...cards];
    for (let i = 0; i < 10; i++) {  
        let j = arrayOfIndices[i];
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; 
    }
    return shuffledArray;
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomIndices(max) {
    const arrayOfIndices = [];
    while (arrayOfIndices.length < 10) {
        const newIndex = getRandomInt(0, max);
        if (!arrayOfIndices.includes(newIndex)) arrayOfIndices.push(newIndex);
    }
    return arrayOfIndices;
}

export function getTenCharacters(data) {
    const auxArray = [];
    const indexArray = getRandomIndices(data.length);

    for (let i = 0; i < 10; i++) {
        const index = indexArray[i];
        const {character} = data[index];
        auxArray[i] = character;
    } 

    return auxArray;
}

export function getCleanData({data}) {
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