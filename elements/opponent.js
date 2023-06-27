"use strict"

const html = __AINI_HTML;

export class Opponent extends HTMLElement {

  constructor(name, count) {
    super()

    this.name = name || this.getAttribute("name")
    this.count = count || this.getAttribute("count")
    this.render(this.name, this.count);
  }

  render(name, count) {
    let parsed = html;
    parsed = parsed.replaceAll("{name}", name)
    parsed = parsed.replaceAll("{count}", count)
    this.innerHTML = parsed;
  }
}

window.customElements.define('aini-opponent', Opponent);


window.handleOpponentCountClick = (element) => {
  console.log(element)
  element.animate([
    { transform: "rotateY(0deg)" },
    { transform: "rotateY(360deg)" },
  ], {
    duration: 444,
    iterations: 1
  })
}
