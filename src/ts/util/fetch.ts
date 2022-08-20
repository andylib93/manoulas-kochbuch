import sortAlphabetically from "./sort";
import { Rezept } from "./interfaces";
import message from "./message";
import { URL } from "./URL";

const API = URL + "/api/v1/rec";

const fetchRecipes = async (): Promise<Rezept[]> => {
    try {
        let recipeArray: Rezept[] = [];
        const response: Response = await fetch(API);
        const result: Promise<Rezept[]> = await response.json();
        (await result).forEach((item: Rezept) => recipeArray.push(item));
        sortAlphabetically(recipeArray);
        return recipeArray;
    } catch(e) {
        message("Rezepte nicht gefunden 😭️");
        console.error(e);
        throw Error();
    }
}

const fetchRecipe = async (id: string): Promise<Rezept> => {
    const response: Response = await fetch(`${API}/${id}`);
    
    if (response.status.toString().startsWith("4")){
        message("Rezept nicht gefunden 😭️");
        return Promise.reject("failed");
    }
    const result: Rezept = await response.json();
    return result;
}

export { fetchRecipes, fetchRecipe }
