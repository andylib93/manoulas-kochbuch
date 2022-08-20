import { getCookie } from "../util/getCookie";

const nav = (): void => {
    document.querySelector("nav")!.innerHTML = `
        <a href="/" id="logo" aria-label="Zur Startseite"></a>
    `;

    if (getCookie("_valid")) {
        document.querySelector("nav")!.innerHTML += `
            <a href="/profile" aria-label="Zum Profil" style="margin-right: 1.5rem; text-decoration: none;">Profil</a>
        `;
    }
    
}

export default nav;
