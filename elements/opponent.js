"use strict"

const html = __AINI_HTML;

class Opponent extends HTMLElement {

  constructor() {
    super()
    this.render(this.getAttribute("name"), this.getAttribute("count"));
  }

  render(name, count) {
    let parsed = html;
    parsed = parsed.replaceAll("{name}", name)
    parsed = parsed.replaceAll("{count}", count)
    this.innerHTML = parsed;
  }
}

window.customElements.define('aini-opponent', Opponent);
