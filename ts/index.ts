'use strict'

import Nav from './Nav.js'
import Main from './Main.js'
import Footer from './Footer.js'

window.addEventListener('load', () => {
    const nav = new Nav()
    const main = new Main()
    const footer = new Footer()

    const titleChoices = [
        'Happy Cooking 🧑‍🍳',
        'Don\'t overcook it 🚫️'
    ]
    document.addEventListener('visibilitychange', () => {
        document.visibilityState === 'visible'
        ? document.title = 'Manoúlas Kochbuch'
        : document.title = `${titleChoices[Math.floor(Math.random() * titleChoices.length)]}`
    })
    console.log('Version 0.1')
})
