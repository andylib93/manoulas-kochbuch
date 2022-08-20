import chooseFlag from "../util/chooseFlag.js";
import { CountryToFlags, Rezept } from "../util/interfaces.js";

const buildItems = (recipe: Rezept[]): void => {
    let output: string = "";
    
    recipe.forEach(recipe => {
        output += `
            <a href="/${recipe._id}" class="item" data-recipe="${recipe._id}" aria-label="${recipe.gericht}">
                <p>${recipe.gericht}</p>
                <p>${chooseFlag(recipe.kueche as keyof CountryToFlags)}</p>
            </a>
        `;
    });
    document.querySelector("#list")!.innerHTML = output;
}

export default buildItems;
