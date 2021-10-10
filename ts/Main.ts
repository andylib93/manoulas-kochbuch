'use strict';

import search from './search.js';
import ListView from './ListView.js';
import recipe from './recipe.js';
import { Rezept } from './interfaces.js';
import searchValue from './helper/searchValue.js';
import { fetchRecipes, fetchRecipe } from './helper/fetch.js';

const main = async () => {
    if (window.location.pathname !== '/'){
        const recipeID: number = parseInt(window.location.pathname.split('/')[1]);
        history.replaceState({'rid': `${recipeID}`}, '', `/${recipeID}`);
        buildRecipeView(recipeID);
    }
    else {
        history.replaceState({'rid': '0'}, '', '/');
        buildListView();
    }
}

const buildListView = async () => {
    let recipeArray: Array<Rezept>;
    search();
    document.querySelector('#output').innerHTML += '<div id="list"></div>';

    try {
        recipeArray = await fetchRecipes();
    } catch (e) {
        console.warn(e);
    }

    const list = new ListView({
        selector: '#list',
        data: recipeArray,
    });

    list.render();
    
    document.querySelector('input').addEventListener('input', event => {
        list.data = searchValue(recipeArray, event);
        list.render();
    });
}

const buildRecipeView = async (id: number) => {
    const recipePromise: Rezept = await fetchRecipe(id);
    recipe(recipePromise);
}

export default main;
