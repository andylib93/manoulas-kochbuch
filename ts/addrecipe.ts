import { Zutat } from "./interfaces";

const addRecipe = (): void => {
    let output: string;
    
    output = `
        <div id="addrecipe">
            <h1>Neues Rezept hinzufügen</h1>
            <div class="inputfield">
                <label for="gericht">Gericht:</label>
                <input invalid type="text" name="gericht" placeholder="Gerichtname" />
            </div>
            <div id="top">
                <h3>Zutaten:</h3>
                <button id="addingredient">Neue Zutat</button>
            </div>
            <div id="ingredientsfield">
                <div class="ingredientwrapper">
                    <div class="inputfield">
                        <label for="menge">Menge:</label>
                        <input type="text" name="menge" placeholder="10 g" />
                    </div>
                    <div class="inputfield">
                        <label for="zutat">Zutat:</label>
                        <input type="text" name="zutat" placeholder="Mehl" />
                    </div>
                </div>
            </div>
            <div id="prepfield">
                <h3>Zubereitung:</h3>
                <textarea name="zubereitung" placeholder="Man nehme ..." rows="10" cols="50"></textarea>
            </div>
            <button id="save">Speichern</button>
        </div>
    `;
    document.querySelector('#output').innerHTML = output;

    document.querySelector('#addingredient').addEventListener('click', addIngredient);

    const tx = document.querySelector('textarea');
    tx.setAttribute('style', `height: ${tx.scrollHeight}px; overflow-y: hidden;`);
    tx.addEventListener('input', onInput);

    document.querySelector('#save').addEventListener('click', postRecipe);
}

// stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize
function onInput(): void {
    this.style.height = 'auto';
    (<HTMLDivElement>document.querySelector('#addrecipe')).style.height = 'auto';
    this.style.height = `${this.scrollHeight}px`;
}

const addIngredient = (): void => {
    document.querySelector('#ingredientsfield').innerHTML += `
        <div class="ingredientwrapper">
            <div class="inputfield">
                <label for="menge">Menge:</label>
                <input type="text" name="menge" placeholder="10 g" />
            </div>
            <div class="inputfield">
                <label for="zutat">Zutat:</label>
                <input type="text" name="zutat" placeholder="Mehl" />
            </div>
        </div>
    `;
}

const postRecipe = (): void => {
    const gericht: string = document.querySelector<HTMLInputElement>('input[name="gericht"]').value;
    const zubereitung: string = document.querySelector<HTMLTextAreaElement>('textarea').value;
    const mengen: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="menge"]');
    const zutaten: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="zutat"]');

    let finalMengen: string[] = [];
    let finalZutaten: string[] = [];
    let allZutaten: Zutat[] = [];
    
    mengen.forEach(menge => finalMengen.push(menge.value));
    zutaten.forEach(zutat => finalZutaten.push(zutat.value));

    for(let i = 0; i <= finalMengen.length; i++) {
        const zutat: Zutat = {
            menge: finalMengen[i],
            zutat: finalZutaten[i]
        }
        allZutaten.push(zutat);
    } 

    console.log(gericht, allZutaten, zubereitung);
    /*
    try {
        fetch('http://localhost:3000/rec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "name": name, "password": password })
        });
    } catch (error) {
        console.warn(error);
    }
    */
}

export default addRecipe;
