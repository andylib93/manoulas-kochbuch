import { Rezept, Zutat } from './interfaces';

const recipe = (recipe: Rezept): void => {
    let output: string;
    
    output = `
        <div id='recipe' class='paper'>
            <div class='title'>
                <h1>${recipe.gericht}</h1>
            </div>
            <div class='ingredients'>
                <ul class='amount'>
                    ${ingredientMapping(recipe.zutaten, 'menge')}
                </ul>
                <ul class='ingredient'>
                    ${ingredientMapping(recipe.zutaten, 'zutat')}
                </ul>
            </div>
            <div class='preparation'>
                <p>${recipe.zubereitung}</p>
            </div>
        </div>
    `;
    document.querySelector('#output').innerHTML = output;
}

const ingredientMapping = (array: Zutat[], attr: string): string => {
    let list: string = '';
    array.forEach(zutat => list += `<li>${zutat[attr]}</li>`);
    return list;
}

export default recipe;
