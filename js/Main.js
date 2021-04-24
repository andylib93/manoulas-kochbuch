'use strict'

import Router from './Router.js'
import Search from './Search.js'
import ListView from './ListView.js'
import chooseFlag from './helper/chooseFlag.js'
import shuffleSort from './helper/shuffleSort.js'
import Recipe from './Recipe.js'

class Main {

    constructor() {
        this.router = new Router()
        this.recipeArray = []

        if (window.location.pathname !== '/'){
            const recipeID = window.location.pathname.split('/')[1]
            history.replaceState({'rid': `${recipeID}`}, '', `/${recipeID}`)
            this.buildRecipeView(recipeID)
        }
        else {
            history.replaceState({'rid': '0'}, '', '/')
            this.buildListView(this.router)
        }
    }

    async buildListView() {
        const search = new Search()
        document.querySelector('#output').innerHTML += '<div id="list"></div>'

		try {
			await this.fetchRecipes(this.recipeArray)
		} catch (e) {
			console.warn(e)
		}

        const list = new ListView({
            selector: '#list',
            data: {
                recipes: this.recipeArray
            },
            template: props => {
                return (
                    props.recipes.map(recipe => {
                        return `
                            <a href='/${recipe.id}' class='item' data-recipe='${recipe.id}' aria-label='${recipe.gericht}'>
                                <p>${recipe.gericht}</p>
                                <p>${chooseFlag(recipe.kueche)}</p>
                            </a>
                        `
                    }).join('')
                )
            }
        })
    
        list.render()
        
        document.querySelector('input').addEventListener('input', event => {
            list.data.recipes = this.searchValue(this.recipeArray, event)
            list.render()
        })

    }

    async buildRecipeView(id) {
        const obj = await this.fetchSingleRecipe(id)
        const recipe = new Recipe(obj)
    }

    async fetchRecipes(passedArray) {
        const incomingJSON = await fetch('http://localhost:3333/api/rec/').catch(err => console.log(err))
        let items = []
    
        try {
            // get data, add to array, shuffle array, create objects
            items = await incomingJSON.json()
            items.forEach(item => {
                passedArray.push(item)
            })
            shuffleSort(passedArray)
        } catch(e) {
            console.warn(e)
        }
    }

    async fetchSingleRecipe(id) {
        let item = {}

        try {
            item = await fetch(`http://localhost:3333/api/rec/${id}`)
                .then(response => {
                    if (!response.ok) {
                        console.warn(`HTTP status: ${response.status}`)
                        response.message = 'no recipe found'
                        console.log(response.message)
                    }
                    return response
                })
                .then(res => res.json())
                .catch(err => item = undefined)
        } catch(e) {
            console.warn(e)
        }

        if (item === undefined) item = 'no recipe found'
        return item
    }

    searchValue(array, event) {
        let filtered = []
        array.forEach(recipe => {
            if (recipe.gericht.toLowerCase().match(event.target.value.toLowerCase())) {
                filtered.push(recipe)
            }
        })
        return filtered
    }

}

export default Main
