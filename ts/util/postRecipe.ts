import { Rezept, Zutat } from "../interfaces";

const postRecipe = (): void => {
    const gericht: string = document.querySelector<HTMLInputElement>('input[name="gericht"]').value;
    const gang: string = document.querySelector<HTMLInputElement>('select[name="gang"]').value;
    const kueche: string = document.querySelector<HTMLInputElement>('select[name="kueche"]').value;
    const zubereitung: string = document.querySelector<HTMLTextAreaElement>('textarea').value;
    const mengen: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="menge"]');
    const zutaten: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="zutat"]');

    let finalMengen: string[] = [];
    let finalZutaten: string[] = [];
    let allZutaten: Zutat[] = [];
    
    mengen.forEach(menge => finalMengen.push(menge.value));
    zutaten.forEach(zutat => finalZutaten.push(zutat.value));

    for(let i = 0; i < finalMengen.length; i++) {
        if(finalMengen[i] === '' || finalZutaten[i] === '') continue;
        const zutat: Zutat = {
            menge: finalMengen[i],
            zutat: finalZutaten[i]
        }
        allZutaten.push(zutat);
    } 

    const newRecipe: Rezept = {
        gericht,
        kueche,
        gang,
        zutaten: allZutaten,
        zubereitung
    }
    console.log(newRecipe);
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

export default postRecipe;
