import "../../css/recipe.css";
import { Rezept, Zutat } from "../util/interfaces";
import { fetchRecipe } from "../util/fetch";

const recipe = async (): Promise<void> => {
    const id = location.pathname.split("/")[1];
    const recipe: Rezept = await fetchRecipe(id);
    
    document.title = recipe.gericht;
    document.querySelector("#output")!.innerHTML = `
        <div id="recipe" class="paper">
            <div class="title">
                <h1>${recipe.gericht}</h1>
                ${editBTN(id)}
            </div>
            <div class="ingredients">
                <ul class="amount">
                    ${ingredientMapping(recipe.zutaten, "menge")}
                </ul>
                <ul class="ingredient">
                    ${ingredientMapping(recipe.zutaten, "zutat")}
                </ul>
            </div>
            <div class="preparation">
                <p>${recipe.zubereitung}</p>
            </div>
        </div>
    `;
}

const ingredientMapping = (array: Zutat[], attr: keyof Zutat): string => {
    let list: string = "";
    array.forEach(zutat => list += `<li>${zutat[attr]}</li>`);
    return list;
}

const editBTN = (id: string) => {
    if (!document.cookie.startsWith("_valid")) return "";
    return `
        <a href="/edit/${id}" style="margin-left: 1rem;">
            <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="var(--font)" d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"/>
            </svg>
        </a>
    `;
}

export default recipe;
