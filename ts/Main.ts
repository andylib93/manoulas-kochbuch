'use strict';

import search from './search.js';
import ListView from './ListView.js';
import Recipe from './Recipe.js';
import { Rezept } from './interfaces.js';
import searchValue from './helper/searchValue.js';
import { fetchRecipes } from './helper/fetch.js';

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
			await fetchRecipes(this.recipeArray);
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
        const obj = await this.fetchSingleRecipe(id);
        const recipe = new Recipe(obj);
    }

    private async retrieveJSONOrError(response: Response) {
        if (!response.ok) {
          return Promise.reject(response.statusText);
        } else {
          return await response.json();
        }
    }

    async fetchSingleRecipe(id) {
        let item: Object = {};

        try {
            item = await fetch(`https://manoulas-kochbuch.de/api/rec/${id}`)
                .then(response => {
                    if (!response.ok) {
                        console.warn(`HTTP status: ${response.status}`);
                    }
                    return response;
                })
                .then(res => res.json())
                .catch(err => item = undefined);
        } catch(e) {
            console.warn(e);
        }

        if (item === undefined) item = 'no recipe found';
        return item;
    }
}

export default Main;
