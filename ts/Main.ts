'use strict';

import search from './search.js';
import ListView from './ListView.js';
import Recipe from './Recipe.js';
import { Rezept } from './interfaces.js';
import searchValue from './helper/searchValue.js';
import { fetchRecipes, fetchRecipe } from './helper/fetch.js';

class Main {

    recipeArray: Array<Rezept>;

    constructor() {
        this.recipeArray = [];

        if (window.location.pathname !== '/'){
            const recipeID = window.location.pathname.split('/')[1];
            history.replaceState({'rid': `${recipeID}`}, '', `/${recipeID}`);
            this.buildRecipeView(recipeID);
        }
        else {
            history.replaceState({'rid': '0'}, '', '/');
            this.buildListView();
        }
    }

    async buildListView() {
        search();
        document.querySelector('#output').innerHTML += '<div id="list"></div>';

		try {
			this.recipeArray = await fetchRecipes();
		} catch (e) {
			console.warn(e);
		}

        const list = new ListView({
            selector: '#list',
            data: this.recipeArray,
        });
    
        list.render();
        
        document.querySelector('input').addEventListener('input', event => {
            list.data = searchValue(this.recipeArray, event);
            list.render();
        });

    }

    async buildRecipeView(id) {
        const obj = await fetchRecipe(id);
        const recipe = new Recipe(obj);
    }
}

export default Main;
