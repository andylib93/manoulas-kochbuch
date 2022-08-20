import { Rezept } from "./interfaces.js";

const searchValue = (array: Rezept[], event: Event): Rezept[] => {
    let filtered: Rezept[] = [];
    
    array.forEach(recipe => {
        const target = event.target as HTMLInputElement;
        if (recipe.gericht.toLowerCase().match(target.value.toLowerCase())) filtered.push(recipe);
    });
    return filtered;
}

export default searchValue;
