'use strict'

class Router {

    constructor() {
        this.addingPopStateListener()
        this.addingEventListenersToAncors()
    }

    addingPopStateListener() {
        window.addEventListener('popstate', () => {
            if(history.state.rid === '0') 
                console.log(document.querySelectorAll<HTMLElement>('[data-recipe]')[0].dataset.recipe)
            else
                console.log(window.location.pathname.split('/')[1])
        })
    }

    addingEventListenersToAncors() {
        document.querySelectorAll('[data-recipe]').forEach( aTag => this.navigationListener(aTag))
    }

    navigationListener(param) {
        param.addEventListener('click', event => this.navigateOnClick(event))
    }

    navigateOnClick(event) {
        event.preventDefault()

        let parent
        let href = event.currentTarget.href
        let rid = event.currentTarget.getAttribute('data-recipe')
        
        // event delegation
        if (event.target.tagName !== 'A'){
            parent = event.target.parentElement
            rid = parent.getAttribute('data-recipe')
            href = parent.href
        }

        history.pushState({'rid':rid}, '', href)
        this.buildClickedView(event)
    }

    buildClickedView(event) {
        const loc = event.target.baseURI
        const hrefID = loc.slice(loc.lastIndexOf('/') + 1, loc.length)
        console.log(hrefID)
    }

}

export default Router
