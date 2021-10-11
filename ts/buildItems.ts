import chooseFlag from './helper/chooseFlag.js';
import { Rezept } from './interfaces.js';

const buildItems = (recipe: Rezept[]): void => {
    let output: string = '';
    
    recipe.forEach(recipe => {
        output += `
            <a href='/${recipe.id}' class='item' data-recipe='${recipe.id}' aria-label='${recipe.gericht}'>
                <p>${recipe.gericht}</p>
                <p>${chooseFlag(recipe.kueche)}</p>
            </a>
        `;
    });
    document.querySelector('#list').innerHTML = output;
}

export default buildItems;
