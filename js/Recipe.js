'use strict'

class Recipe {

    constructor(obj) {

        this.recipe = obj
        let output

        if (this.recipe.gericht) {
            output = `
                <div id='recipe' class='paper'>
                    <div class='title'>
                        <h1>${this.recipe.gericht}</h1>
                    </div>
                    <div class='ingredients'>
                        <ul class='amount'>
                            ${this.mapZutatenMenge(this.recipe.zutaten)}
                        </ul>
                        <ul class='ingredient'>
                            ${this.mapZutatenZutat(this.recipe.zutaten)}
                        </ul>
                    </div>
                    <div class='preparation'>
                        <p>${this.recipe.zubereitung}</p>
                    </div>
                </div>
            `
        }
        else if (this.recipe === 'no recipe found'){        
            output = `
                <div id="error">
                    <p>Rezept nicht gefunden</p>
                </div>
            `
        }
        else {
            output = `<div id="error">Am Suchen ...</div>`
        }

        document.querySelector('#output').innerHTML = output
    }

    mapZutatenMenge(array) {
        let nodeList = ''
        array.forEach(element => {
            nodeList += `<li>${element.menge}</li>`
        })
        return nodeList
    }

    mapZutatenZutat(array) {
        let nodeList = ''
        array.forEach(element => {
            nodeList += `<li>${element.zutat}</li>`
        })
        return nodeList
    }
    
}

export default Recipe
