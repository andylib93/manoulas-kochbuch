import { Rezept } from '../interfaces.js';

const sortAlphabetically = (recipeArray: Array<Rezept>) => {
    recipeArray.sort((a, b) => a.gericht.toLowerCase().localeCompare(b.gericht.toLowerCase()));
}

export default sortAlphabetically;
