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
    document.querySelector('#output').innerHTML = output;
    document.querySelector('#loginBTN').addEventListener('click', post);
}

const post = (): void => {
    const name: string = document.querySelector<HTMLInputElement>('input[type="text"]').value;
    const password: string = document.querySelector<HTMLInputElement>('input[type="password"]').value;

    try {
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, password })
        });
    } catch (error) {
        console.log(error);
    }
}

export default login;
