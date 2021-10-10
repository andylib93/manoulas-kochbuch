import { Rezept } from '../interfaces.js';

const searchValue = (array: Array<Rezept>, event: Event): Array<Rezept> => {
    
    let filtered: Array<Rezept> = [];
    
    array.forEach(recipe => {
        const target = event.target as HTMLInputElement;
        if (recipe.gericht.toLowerCase().match(target.value.toLowerCase())) filtered.push(recipe);
    });
    
    return filtered;
}

export default searchValue;
