import postRecipe from './util/postRecipe';

const addRecipe = (): void => {
    let output: string;
    
    output = `
        <div id="addrecipe">
            <h1>Neues Rezept hinzufügen</h1>
            <div class="inputfield">
                <label for="gericht">Gericht:</label>
                <input invalid type="text" name="gericht" placeholder="Gerichtname" />
            </div>
            <div class="wrapper">
                <div class="inputfield">
                    <label for="gang">Gang:</label>
                    <select name="gang">
                        <option value="vorspeise">Vorspeise</option>
                        <option value="hauptspeise">Hauptspeise</option>
                        <option value="nachspeise">Nachspeise</option>
                    </select>
                </div>
                <div class="inputfield">
                    <label for="kueche">Küche:</label>
                    <select name="kueche">
                        <option value="DE">Deutsch</option>
                        <option value="GR">Griechisch</option>
                        <option value="CN">Chinesisch</option>
                        <option value="ES">Spanisch</option>
                        <option value="IT">Italienisch</option>
                        <option value="US">Amerikanisch</option>
                        <option value="PT">Portugiesisch</option>
                        <option value="IN">Indisch</option>
                        <option value="AT">Österreichisch</option>
                        <option value="TK">Türkisch</option>
                        <option value="LB">Libanesisch</option>
                        <option value="GB">Britisch</option>
                        <option value="FR">Französisch</option>
                        <option value="TH">Thailändisch</option>
                        <option value="NL">Niederländisch</option>
                        <option value="MX">Mexikanisch</option>
                        <option value="CH">Schweizer</option>
                    </select>
                </div>
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
                    <!--- <button class="delete">&#x2715</button> --->
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
    document.querySelector<HTMLDivElement>('#addrecipe').style.height = 'auto';
    this.style.height = `${this.scrollHeight}px`;
}

const addIngredient = (): void => {
    const div: HTMLDivElement = document.createElement('div');
    div.classList.add('ingredientwrapper');
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
    document.querySelector('#ingredientsfield').appendChild(div);
}

export default addRecipe;
