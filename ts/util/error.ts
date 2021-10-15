
const error = (): void => {
    if (document.querySelector('#list')) {
        document.querySelector<HTMLDivElement>('#list').style.minHeight = '0';
    }
    document.querySelector('#output').innerHTML += `
        <div id="error">
            <p>Rezept nicht gefunden</p>
        </div>
    `;
}

export default error;
