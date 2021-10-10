import sortAlphabetically from './sort.js';
import { Rezept } from '../interfaces.js';

const fetchRecipes = async (): Promise<Rezept[]> => {
    try {
        let recipeArray: Rezept[] = [];
        const response: Response = await fetch('https://manoulas-kochbuch.de/api/rec/');
        const result: Promise<Rezept[]> = response.json();
        (await result).forEach(item => recipeArray.push(item));
        sortAlphabetically(recipeArray);
        return recipeArray;
    } catch(e) {
        console.warn(e);
    }
}

const fetchRecipe = async (id: number): Promise<Rezept> => {
    try {
        const response: Response = await fetch(`https://manoulas-kochbuch.de/api/rec/${id}`);
        const result: Promise<Rezept> = response.json();
        return result;
    } catch(e) {
        console.warn(e);
    }
}

export { fetchRecipes, fetchRecipe }
