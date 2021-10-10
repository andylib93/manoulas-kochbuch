'use strict';

const search = (): void => {
    document.querySelector('#output').innerHTML += `
        <div id="search-field">
            <input type="text" id="input-field" spellcheck="false" placeholder="Gericht...">
        </div>
    `;
}

export default search;
