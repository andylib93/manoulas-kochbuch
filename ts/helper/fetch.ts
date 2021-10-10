'use strict';

import sortAlphabetically from './sort.js';
import { Rezept } from '../interfaces.js';

const fetchRecipes = async passedArray => {
    try {
        const response: Response = await fetch('https://manoulas-kochbuch.de/api/rec/');
        const result: Promise<Array<Rezept>> = response.json();
        (await result).forEach(item => passedArray.push(item));
        sortAlphabetically(passedArray);
    } catch(e) {
        console.warn(e);
    }
}

export { fetchRecipes }
