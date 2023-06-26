import { Card } from "../elements/card.js"


console.log("card", Card);
let i = 1;

document.querySelectorAll("aini-opponent .name").forEach(name => {
  name.addEventListener("click", e => {
    console.log(e)

    const cards = document.querySelector(".cards");
    const value = "" + Math.floor(Math.random() * 10);

    const flip_direction = Math.random() > 0.9;

    let to_take = 0;
    if (Math.random() > 0.8) {
      to_take = Math.ceil(Math.random * 3); // 1-4
    }

    const wish = Math.random() > 0.9;

    if (wish) {
      console.log("wish")
    }

    const new_card = new Card(value, getRandomColor(), flip_direction, to_take, wish);
    new_card.fadeIn(e.clientX / window.innerWidth, e.clientY / window.innerHeight);

    new_card.style.zIndex = i++;

    cards.appendChild(new_card);
  })
})

function getRandomColor() {
  return ["red", "blue", "yellow", "green"][Math.floor(Math.random() * 4)];
}
