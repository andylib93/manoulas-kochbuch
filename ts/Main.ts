import buildItems from './buildItems.js';
import error from './helper/error.js';
import { fetchRecipes, fetchRecipe } from './helper/fetch.js';
import recipe from './recipe.js';
import { Rezept } from './interfaces.js';
import search from './search.js';
import searchValue from './helper/searchValue.js';

const main = async () => {
    if (window.location.pathname !== '/'){
        const recipeID: number = parseInt(window.location.pathname.split('/')[1]);
        try {
            const recipePromise: Rezept = await fetchRecipe(recipeID);
            recipe(recipePromise);
        }
        catch (e) {
            error();
            console.warn(e);
        }
        return;
    }

    let recipeArray: Rezept[];
    search();
    document.querySelector('#output').innerHTML += '<div id="list"></div>';

    try {
        recipeArray = await fetchRecipes();
        buildItems(recipeArray);
    } catch (e) {
        error();
        console.warn(e);
    }
    
    document.querySelector('input').addEventListener('input', event => {
        const filtered: Rezept[] = searchValue(recipeArray, event);
        buildItems(filtered);
    });
}

export default main;
