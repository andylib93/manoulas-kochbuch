
// stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// Durstenfeld shuffle, an optimized version of Fisher-Yates
// en.wikipedia.org/wiki/Fisher–Yates_shuffle#The_modern_algorithm

function shuffleSort(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

export default shuffleSort
