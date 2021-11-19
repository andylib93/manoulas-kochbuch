import buildItems from './buildItems.js';
import error from './util/error.js';
import { fetchRecipes, fetchRecipe } from './util/fetch.js';
import login from './login.js';
import recipe from './recipe.js';
import { Rezept } from './interfaces.js';
import search from './search.js';
import searchValue from './util/searchValue.js';
import addRecipe from './addRecipe.js';
import editRecipe from './editRecipe.js';

const main = async () => {

    if (window.location.pathname === '/login'){
        try {
            login();           
        }
        catch (e) {
            error();
            console.warn(e);
        }
        return;
    }
    else if (window.location.pathname === '/add'){
        try {
            addRecipe();
        }
        catch (e) {
            error();
            console.warn(e);
        }
        return;
    }
    else if (window.location.pathname === '/edit'){
        try {
            const recipe2edit: Rezept = await fetchRecipe(2);
            editRecipe(recipe2edit);
        }
        catch (e) {
            error();
            console.warn(e);
        }
        return;
    }

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
