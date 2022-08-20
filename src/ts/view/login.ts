import "../../css/login.css";
import { URL } from "../util/URL";

const login = (): void => {
    let output: string;
    
    output = `
        <h1 style="margin-top: 3rem;">Login</h1>
        <div id="loginfield">
            <div class="inputfield">
                <label for="name">Name:</label>
                <input type="text" name="name" placeholder="user">
            </div>
            <div class="inputfield">
                <label for="password">Passwort:</label>
                <input type="password" name="password" placeholder="123456">
            </div>
            <button id="loginBTN">Login</button>
        </div>
    `;
    document.querySelector("#output")!.innerHTML = output;
    document.querySelector("#loginBTN")!.addEventListener("click", post);
}

const post = async (): Promise<void> => {
    const name: string = document.querySelector<HTMLInputElement>("input[type='text']")!.value;
    const password: string = document.querySelector<HTMLInputElement>("input[type='password']")!.value;
    const token: string = window.btoa(name + ":" + password);

    try {
        const post = await fetch(URL + "/api/v1/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + token
            },
            body: JSON.stringify({ name, password })
        });
        if (post.status === 200) {
            document.querySelector<HTMLButtonElement>("#loginBTN")!.innerText += " ✅️";
            await delay(1000);
            window.location.href = "/profile";
        }
        else {
            document.querySelector<HTMLButtonElement>("#loginBTN")!.innerText += " ❌️";
            await delay(1000);
            document.querySelector<HTMLButtonElement>("#loginBTN")!.innerText = "Login";
        }
    } catch (error) {
        console.log(error);
    }
}

function delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}

export default login;
