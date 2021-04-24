'use strict'

class Search {

    constructor() {
        this.build()
    }

    build() {
        document.querySelector('#output').innerHTML += `
            <div id="search-field">
                <input type="text" id="input-field" spellcheck="false" placeholder="Gericht...">
            </div>
        `
    }

}

export default Search
