'use strict'

import RecipeInterface from './RecipeInterface.js'

import chooseFlag from './helper/chooseFlag.js';

class ListView {
    
    elem: HTMLSelectElement;
    data: Array<RecipeInterface>;

    constructor(options) {
        this.elem = document.querySelector(options.selector);
        this.data = options.data;
    }
    
    render() {
        this.elem.innerHTML = this.template(this.data);
    }

    template(props: Array<RecipeInterface>) {
        return (
            props.map(recipe => {
                return `
                    <a href='/${recipe.id}' class='item' data-recipe='${recipe.id}' aria-label='${recipe.gericht}'>
                        <p>${recipe.gericht}</p>
                        <p>${chooseFlag(recipe.kueche)}</p>
                    </a>
                `
            }).join('')
        )
    }
    
}

export default ListView;
