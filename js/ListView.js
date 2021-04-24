'use strict'

class ListView {
    
    constructor(options) {
        this.elem = document.querySelector(options.selector)
        this.data = options.data
        this.template = options.template
    }
    
    render() {
        this.elem.innerHTML = this.template(this.data)
    }
    
}

export default ListView
