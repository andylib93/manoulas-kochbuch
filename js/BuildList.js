'use strict'

import shuffleSort from './helper/shuffleSort.js'

class BuildList {

    constructor(recipesArray) {
        this.build()
        this.recipes = recipesArray
        // stackoverflow.com/questions/43431550/async-await-class-constructor
        // return (async () => {await this.fetchRecipes(); return this})()
    }

    build() {
        document.querySelector('#output').innerHTML += '<div id="list"></div>'
    }

    async fetchRecipes() {
        const incomingJSON = await fetch('http://localhost:3333/api/rec/').catch(err => console.log(err))
        let items = []

        try {
            // get data, add to array, shuffle array, create objects
            items = await incomingJSON.json()
            items.forEach(item => {
                this.recipes.push(item)
            })
            shuffleSort(this.recipes)
        } catch(e) {
            console.warn(e)
        }
    }
    
}

export default BuildList
