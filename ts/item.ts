import chooseFlag from './helper/chooseFlag.js';
import { Rezept } from './interfaces.js';

const build = (recipe: Rezept): string => {
    return `
        <a href='/${recipe.id}' class='item' data-recipe='${recipe.id}' aria-label='${recipe.gericht}'>
            <p>${recipe.gericht}</p>
            <p>${chooseFlag(recipe.kueche)}</p>
        </a>
    `;
}

const item = (props: Rezept[]): string => props.map(recipe => build(recipe)).join('');

export default item;
