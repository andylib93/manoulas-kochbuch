import nav from './nav.js';
import main from './main.js'
import footer from './footer.js';

window.addEventListener('load', () => {
    nav();
    footer();
    main();

    document.addEventListener('visibilitychange', (): void => {
        document.visibilityState === 'visible'
        ? document.title = 'Manoúlas Kochbuch'
        : document.title = 'Happy Cooking 🧑‍🍳';
    });
});
