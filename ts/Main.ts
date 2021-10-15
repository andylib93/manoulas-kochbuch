import buildItems from './buildItems.js';
import error from './util/error.js';
import { fetchRecipes, fetchRecipe } from './util/fetch.js';
import { buildPagination, paginateArray} from './pagination.js';
import recipe from './recipe.js';
import { Rezept } from './interfaces.js';
import search from './search.js';
import searchValue from './util/searchValue.js';

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
        const { data, start, end } = paginateArray(recipeArray);
        buildPagination(start, end);
        buildItems(data);
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
