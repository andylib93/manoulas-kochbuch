'use strict';

const nav = (): void => {
    document.querySelector('nav').innerHTML = `
        <a href='/' id='logo' aria-label='Zur Startseite'></a>
    `;
}    

export default nav;
