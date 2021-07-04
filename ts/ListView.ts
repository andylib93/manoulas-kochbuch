'use strict'

import chooseFlag from './helper/chooseFlag.js';

interface Recipe {
    id: number;
    gericht: string;
    kueche: string;
}

class ListView {
    
    elem: HTMLSelectElement;
    data: Array<Recipe>;

    constructor(options) {
        this.elem = document.querySelector(options.selector);
        this.data = options.data;
    }
    
    render() {
        this.elem.innerHTML = this.template(this.data);
    }

    template(props: Array<Recipe>) {
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
