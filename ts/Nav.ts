'use strict'

class Nav {
    
    constructor() {
        this.build()
    }

    build() {
        document.querySelector('nav').innerHTML = `
            <a href='/' id='logo' aria-label='Zur Startseite'></a>
        `
        // data-recipe='0'
    }

}

export default Nav
