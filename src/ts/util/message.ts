const message = (message: string): void => {
    if (document.querySelector("#list")) {
        document.querySelector<HTMLDivElement>("#list")!.style.minHeight = "0";
    }
    document.querySelector("#output")!.innerHTML = `
        <div id="message">
            <p>${message}</p>
        </div>
    `;
}

export default message;
