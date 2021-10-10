'use strict';

import { Rezept, Zutat } from './interfaces';

const recipe = (recipe: Rezept): void => {
    let output: string;

    if (recipe.gericht) {
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
    }
    else {
        output = `
            <div id="error">
                <p>Rezept nicht gefunden</p>
            </div>
        `;
    }
    document.querySelector('#output').innerHTML = output;
}

const ingredientMapping = (array: Zutat[], attr: string) => {
    let nodeList: string;
    array.forEach(zutat => nodeList += `<li>${zutat[attr]}</li>`);
    return nodeList;
}

export default recipe;
