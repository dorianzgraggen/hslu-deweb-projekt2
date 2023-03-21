"use strict"

const html = __AINI_HTML;

export class Card extends HTMLElement {
  transform = "translate(50vw, 50vh) scale(1) rotate(0deg)";

  constructor(value, color) {
    super()

    this.value = value || this.getAttribute("value");
    this.color = color || this.getAttribute("color");

    this.setAttribute("value", this.value);
    this.setAttribute("color", this.color);

    this.render();
    this.setRotation(Math.random() * 360);
  }

  render() {
    let parsed = html;
    parsed = parsed.replaceAll("{value}", this.value)
    this.innerHTML = parsed;
  }

  setRotation(rotation) {
    let t = `${this.transform.split("rotate")[0]}rotate(${rotation}deg)`;
    this.style.transform = t;
  }

  fadeIn(x = 0, y = 0) {
    const rotation = Math.random() * 360;
    // TODO: create a better that is dependent on both width and height
    const offset_x = (Math.random() - 0.5) * 7;
    const offset_y = (Math.random() - 0.5) * 7;

    this.animate([
      { transform: `translate(${x * 100}vw, ${y * 100}vh) scale(0) rotate(${rotation - lerp(-60, 60, Math.random())}deg)` },
      { transform: `translate(calc(50vw + ${offset_x}vw), calc(50vh + ${offset_y}vw)) scale(1) rotate(${rotation}deg)` }
    ], {
      duration: 300,
      fill: "forwards"
    })
  }
}

window.customElements.define('aini-card', Card);

function lerp(a, b, t) {
  return a * (1 - t) + b * t
}
