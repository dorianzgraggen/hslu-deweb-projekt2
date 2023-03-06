const html = await getHtml();
console.log(html)

class Card extends HTMLElement {
    number = -1;
    color = "";

    constructor() {
        super()

        this.color = this.getAttribute("color");
        this.number = this.getAttribute("number");

        this.classList.add(this.color)

        this.innerHTML = this.parseHtml(html);

        this.setAttribute('class', 'swipable');
        // this.innerText = number;


    }

    parseHtml(html) {
        return html.replaceAll("{number}", this.number)
    }
}

window.customElements.define('le-card', Card);



async function getHtml() {
    try {
        const res = await fetch("elements/card.html")
        const txt = await res.text();
        return txt;
    } catch (error) {
        console.error(error)
    }
}

const cardsFetchEvent = new Event("cards-fetch");
window.dispatchEvent(cardsFetchEvent)
