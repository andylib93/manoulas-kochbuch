'use strict';

import nav from './nav.js';
import Main from './Main.js'
import footer from './footer.js';

window.addEventListener('load', () => {
    nav();
    const main = new Main()
    footer();

    document.addEventListener('visibilitychange', (): void => {
        document.visibilityState === 'visible'
        ? document.title = 'Manoúlas Kochbuch'
        : document.title = 'Happy Cooking 🧑‍🍳';
    });
});
