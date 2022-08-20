import { Rezept, Zutat } from "../util/interfaces";
import { selectGang, selectKueche } from "../util/select";
import { fetchRecipe } from "../util/fetch";
import { fillSelect } from "../util/fillSelect";
import putRecipe from "../util/putRecipe.js";

const edit = async (): Promise<void> => {
    const id = location.pathname.split("/")[2];
    const recipe: Rezept = await fetchRecipe(id);
    
    let output: string;
    
    const zutaten: Zutat[] = recipe.zutaten;
    let allZutaten: string = "";
    zutaten.forEach(zutat => allZutaten += fillIngredients(zutat));

    output = `
        <div id="addrecipe">
            <h1>Rezept ändern</h1>
            <div class="inputfield">
                <label for="gericht">Gericht:</label>
                <input invalid type="text" name="gericht" value="${recipe.gericht}"/>
            </div>
            <div class="wrapper">
                <div class="inputfield">
                    <label for="gang">Gang:</label>
                    <select value="${recipe.gang}" name="gang">
                        ${fillSelect(selectGang)}
                    </select>
                </div>
                <div class="inputfield">
                    <label for="kueche">Küche:</label>
                    <select value="${recipe.kueche}" name="kueche">
                        ${fillSelect(selectKueche)}
                    </select>
                </div>
            </div>
            <div id="top">
                <h3>Zutaten:</h3>
                <button id="addingredient">Neue Zutat</button>
            </div>
            <div id="ingredientsfield">
                ${allZutaten}
            </div>
            <div id="prepfield">
                <h3>Zubereitung:</h3>
                <textarea name="zubereitung" spellcheck="false" rows="10" cols="50">${recipe.zubereitung}</textarea>
            </div>
            <button id="save">Speichern</button>
        </div>
    `;
    document.querySelector("#output")!.innerHTML = output;
    
    setSelectedValue("gang", recipe.gang);
    setSelectedValue("kueche", recipe.kueche);

    document.querySelector("#addingredient")!.addEventListener("click", addIngredient);

    const tx = document.querySelector("textarea")!;
    tx.setAttribute("style", `height: ${tx.scrollHeight}px; overflow-y: hidden;`);
    tx.addEventListener("input", onInput);

    document.querySelector("#save")!.addEventListener("click", async () => await putRecipe(id));
}

const fillIngredients = (zutat: Zutat): string => {
    return `
        <div class="ingredientwrapper">
            <div class="inputfield">
                <label for="menge">Menge:</label>
                <input type="text" name="menge" value="${zutat.menge}"/>
            </div>
            <div class="inputfield">
                <label for="zutat">Zutat:</label>
                <input type="text" name="zutat" value="${zutat.zutat}"/>
            </div>
        </div>
    `;
}

const setSelectedValue = (name: string, value: string): void => {
    const select: HTMLInputElement = document.querySelector(`select[name="${name}"]`)!;
    const options: NodeListOf<HTMLOptionElement> = select.querySelectorAll<HTMLOptionElement>("option");
    options.forEach(option => {
        if (value === option.value) option.setAttribute("selected", "selected");
    });
}

function onInput(this: any): void {
    this.style.height = "auto";
    document.querySelector<HTMLDivElement>("#addrecipe")!.style.height = "auto";
    this.style.height = `${this.scrollHeight}px`;
}

const addIngredient = (): void => {
    const div: HTMLDivElement = document.createElement("div");
    div.classList.add("ingredientwrapper");
    div.innerHTML = `
        <div class="inputfield">
            <label for="menge">Menge:</label>
            <input type="text" name="menge" placeholder="10 g" />
        </div>
        <div class="inputfield">
            <label for="zutat">Zutat:</label>
            <input type="text" name="zutat" placeholder="Mehl" />
        </div>
    `;
    document.querySelector("#ingredientsfield")!.appendChild(div);
}

export default edit;
