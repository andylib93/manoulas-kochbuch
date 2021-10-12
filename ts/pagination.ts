import { Rezept, PaginatedRecipe } from './interfaces';

const buildPagination = (start: number, end: number): void => {
    document.querySelector('#output').innerHTML += `
        <div id="pagination">
            <button id="back">Zurück</button>
            <div id="count">
                <span>${start}</span>
                <span>von</span>
                <span>${end}</span>
            </div>
            <button id="next">Weiter</button>
        </div>
    `;
    addingEventsToBTN();
}

const addingEventsToBTN = (): void => {
    document.querySelector('#back').addEventListener('click', backButton);
    document.querySelector('#next').addEventListener('click', nextButton);
}

const backButton = (): void => {
    console.log('zurück');
}

const nextButton = (): void => {
    console.log('weiter');
}

const paginateArray = (recipes: Rezept[], perPage=10, pageNumber=1): PaginatedRecipe => {
    const start: number = perPage * (pageNumber - 1);
    const end: number = Math.ceil(recipes.length / perPage);

    return {
        data: recipes.slice(start, start + perPage),
        start,
        end
    }
}

export { buildPagination, paginateArray };
