import "../../css/profile.css";
import { Message } from "../util/interfaces";
import { URL } from "../util/URL";
import { getCookie } from "../util/getCookie";

const profile = async (): Promise<void> => {
    if (!getCookie("_valid")) window.location.href = "/";
    const count: Message = await recipeCount();

    const output: string = `
        <div id="dashboard">
            <h1>Hi Mom</h1>
            <p>Anzahl Rezepte: ${count.message}</p>
            <div id="actions">
                <button id="new">neues Rezept</button>
                <button id="logout">Logout</button>
            </div>
        </div>
    `;

    document.querySelector("#output")!.innerHTML = output;
    document.querySelector("#new")!.addEventListener("click", () => {
        window.location.href = "/add";
    });
    document.querySelector("#logout")!.addEventListener("click", async () => {
        await logout();
        window.location.href = "/";
    });
}

const recipeCount = async (): Promise<Message> => {
    const response = await fetch(URL + "/api/v1/count");
    const data = await response.json();
    return data;
}

const logout = async (): Promise<Message> => {
    const response = await fetch(URL + "/api/v1/logout", {
        method: "POST",
        credentials: "include"
    });
    const data = await response.json();
    return data;
}

export default profile;
