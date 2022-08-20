import "../../css/main.css";
import buildItems from "../components/buildItems.js";
import { fetchRecipes } from "../util/fetch.js";
import { Rezept } from "../util/interfaces.js";
import searchValue from "../util/searchValue.js";
import { selectGang, selectKueche } from "../util/select.js";
import { fillSelect } from "../util/fillSelect.js";

const main = async () => {
    let recipeArray: Rezept[];
    document.querySelector("#output")!.innerHTML += `
        <div id="search-field">
            <input type="text" id="input-field" spellcheck="false" placeholder="Gericht...">
        </div>
        <div class="wrapper" style="margin-bottom: 3rem;">
            <div class="inputfield">
                <label for="gang">Gang:</label>
                <select name="gang">
                    <option value="">Kein Filter</option>
                    ${fillSelect(selectGang)}
                </select>
            </div>
            <div class="inputfield">
                <label for="kueche">Küche:</label>
                <select name="kueche">
                    <option value="">Kein Filter</option>
                    ${fillSelect(selectKueche)}
                </select>
            </div>
        </div>
        <div id="list"></div>
    `;

    recipeArray = await fetchRecipes();
    buildItems(recipeArray);

    document.querySelector("input")!.addEventListener("input", event => {
        document.querySelectorAll("select")!.forEach(input => input.value = "");
        const filtered: Rezept[] = searchValue(recipeArray, event);
        buildItems(filtered);
    });

    const filterInput = document.querySelectorAll("select")!;
    filterInput[0].addEventListener("change", (event: Event) => filter(event, filterInput[1].value, "gang", "kueche"));
    filterInput[1].addEventListener("change", (event: Event) => filter(event, filterInput[0].value, "kueche", "gang"));

    const filter = (event: Event, otherValue: string, primary: keyof Rezept, secondary: keyof Rezept) => {
        const value = (<HTMLSelectElement>event.target).value;

        if (value === "" && otherValue === "") {
            buildItems(recipeArray);
            return;
        };
        if (value.length > 1 && otherValue.length > 1) {
            const filtered = recipeArray.filter(recipe => recipe[primary] === value && recipe[secondary] === otherValue);
            buildItems(filtered);
            return;
        }
        if (value === "" && otherValue.length > 1) {
            const filtered = recipeArray.filter(recipe => recipe[secondary] === otherValue);
            buildItems(filtered);
            return;
        }
        const filtered = recipeArray.filter(recipe => recipe[primary] === value);
        buildItems(filtered);
    }
}

export default main;
