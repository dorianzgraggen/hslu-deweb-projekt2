"use strict"

const html = __AINI_HTML;

class Card extends HTMLElement {
  transform = "translate(50vw, 50vh) scale(1.2) rotate(0deg)";

  constructor() {
    super()
    // this.style.transform = this.transform;
    this.render(this.getAttribute("value"), this.getAttribute("color"));
    this.setRotation(Math.random() * 360);
  }

  render(value, color) {
    let parsed = html;
    parsed = parsed.replaceAll("{value}", value)
    this.innerHTML = parsed;
  }

  setRotation(rotation) {
    console.log(this.transform.split("rotate"))
    let t = `${this.transform.split("rotate")[0]}rotate(${rotation}deg)`;
    console.log(t);
    this.style.transform = t;
  }
}

window.customElements.define('aini-card', Card);
