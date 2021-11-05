const nav = (): void => {
    document.querySelector('nav').innerHTML = `
        <a href='/' id='logo' aria-label='Zur Startseite'></a>
        <a href='/login' aria-label='Login' style="padding-right: 1rem;">Login</a>
    `;
}    

export default nav;
