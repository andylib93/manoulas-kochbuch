const login = (): void => {
    let output: string;
    
    output = `
        <div id="loginfield">
            <div class="inputfield">
                <span>Name:</span>
                <input type="text" placeholder="user">
            </div>
            <div class="inputfield">
                <span>Passwort:</span>
                <input type="password" placeholder="123456">
            </div>
            <button id="loginBTN">Login</button>
        </div>
    `;
    document.querySelector('#output').innerHTML = output;
    document.querySelector('#loginBTN').addEventListener('click', post);
}

const post = (): void => {
    const name = (<HTMLInputElement>document.querySelector('input[type="text"]')).value;
    const password = (<HTMLInputElement>document.querySelector('input[type="password"]')).value;

    try {
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "name": name, "password": password })
        });
    } catch (error) {
        console.warn(error);
    }
}

export default login;