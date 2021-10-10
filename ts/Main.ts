'use strict';

import Search from './Search.js';
import ListView from './ListView.js';
import sortAlphabetically from './helper/sort.js';
import Recipe from './Recipe.js';

class Main {

    router: any;
    recipeArray: Array<Object>;

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
        const search = new Search();
        document.querySelector('#output').innerHTML += '<div id="list"></div>';

		try {
			await this.fetchRecipes(this.recipeArray);
		} catch (e) {
			console.warn(e);
		}

        const list = new ListView({
            selector: '#list',
            data: this.recipeArray,
        });
    
        list.render();
        
        document.querySelector('input').addEventListener('input', event => {
            list.data = this.searchValue(this.recipeArray, event);
            list.render();
        });

    }

    async buildRecipeView(id) {
        const obj = await this.fetchSingleRecipe(id);
        const recipe = new Recipe(obj);
    }

    async fetchRecipes(passedArray) {
        let items = [];

        await fetch('https://manoulas-kochbuch.de/api/rec/')
        .then(res => res.json())
        .then(data => items = data)
        .catch(err => console.log(err));
    
        try {
            // get data, add to array, sort array, create objects
            items.forEach(item => {
                passedArray.push(item);
            });
            sortAlphabetically(passedArray);
        } catch(e) {
            console.warn(e);
        }
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

    searchValue(array, event) {
        let filtered = [];
        array.forEach(recipe => {
            if (recipe.gericht.toLowerCase().match(event.target.value.toLowerCase())) {
                filtered.push(recipe);
            }
        })
        return filtered;
    }

}

export default Main;
