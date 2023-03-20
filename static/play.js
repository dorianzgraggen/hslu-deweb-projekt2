import { Card } from "../elements/card.js"


console.log("card", Card);
let i = 1;

document.querySelectorAll("aini-opponent .name").forEach(name => {
  name.addEventListener("click", e => {
    console.log(e)

    const cards = document.querySelector(".cards");
    const value = "" + Math.floor(Math.random() * 10);
    const new_card = new Card(value, getRandomColor());
    new_card.fadeIn(e.clientX / window.innerWidth, e.clientY / window.innerHeight);

    new_card.style.zIndex = i++;

    cards.appendChild(new_card);
  })
})

function getRandomColor() {
  return ["red", "blue", "yellow", "green"][Math.floor(Math.random() * 4)];
}
