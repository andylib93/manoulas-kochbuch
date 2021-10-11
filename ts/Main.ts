import search from './search.js';
import item from './item.js';
import recipe from './recipe.js';
import { Rezept } from './interfaces.js';
import searchValue from './helper/searchValue.js';
import { fetchRecipes, fetchRecipe } from './helper/fetch.js';

const main = async () => {
    if (window.location.pathname !== '/'){
        const recipeID: number = parseInt(window.location.pathname.split('/')[1]);
        const recipePromise: Rezept = await fetchRecipe(recipeID);
        recipe(recipePromise);
        return;
    }

    let recipeArray: Rezept[];
    search();
    document.querySelector('#output').innerHTML += '<div id="list"></div>';

    try {
        recipeArray = await fetchRecipes();
    } catch (e) {
        console.warn(e);
    }

    const recipeList: string = item(recipeArray);
    document.querySelector('#list').innerHTML = recipeList;
    
    document.querySelector('input').addEventListener('input', event => {
        const filtered = searchValue(recipeArray, event);
        document.querySelector('#list').innerHTML = item(filtered);
    });
}

export default main;
