class Card extends HTMLElement {
    constructor() {
        super()

        this.setAttribute('class', 'swipable');
        this.innerText = "Lolll";
    }
}

window.customElements.define('le-card', Card);
