import { Card } from '../elements/card.js';
import { Opponent } from '../elements/opponent.js';

// console.log("card", Card);
// let i = 1;

// document.querySelectorAll("aini-opponent .name").forEach(name => {
//   name.addEventListener("click", e => {
//     console.log(e)

//     const cards = document.querySelector(".cards");
//     const value = "" + Math.floor(Math.random() * 10);

//     const flip_direction = Math.random() > 0.9;

//     let to_take = 0;
//     if (Math.random() > 0.8) {
//       to_take = Math.ceil(Math.random * 3); // 1-4
//     }

//     const wish = Math.random() > 0.9;

//     if (wish) {
//       console.log("wish")
//     }

//     const new_card = new Card(value, getRandomColor(), flip_direction, to_take, wish);
//     new_card.fadeIn(e.clientX / window.innerWidth, e.clientY / window.innerHeight);

//     new_card.style.zIndex = i++;

//     cards.appendChild(new_card);
//   })
// })

// function getRandomColor() {
//   return ["red", "blue", "yellow", "green"][Math.floor(Math.random() * 4)];
// }

const socket = new WebSocket('ws://localhost:9999/ws');

const id = Math.random();

let game_code = '';

const elements = {
  game_code: document.getElementById('game_code'),
  opponents: document.querySelector('.opponents'),
  start_button: document.getElementById("start-btn"),
  cards: document.querySelector(".cards"),
};

elements.start_button.addEventListener("click", e => {
  socket.send(
    JSON.stringify({
      type: "game_start",
      code: game_code
    })
  )
  elements.start_button.style.display = "none";
  elements.game_code.style.display = "none";
})

socket.addEventListener('open', (event) => {
  socket.send(
    JSON.stringify({
      type: 'new_game',
      data: {
        id,
      },
    })
  );
});

socket.addEventListener('message', (message) => {
  console.log(message);
  const data = JSON.parse(message.data);

  console.log(data);

  switch (data.type) {
    case 'game_code': {
      game_code = data.code;
      elements.game_code.innerText = game_code;
      elements.game_code.style.display = 'block';
      break;
    }

    case 'player_joined': {
      const opponent = new Opponent(data.player_name, data.player_cards);
      elements.opponents.append(opponent);
      break;
    }

    case "first_card": {
      const {value, color, flip_direction, to_take, wish} = data.start_card;
      const card = new Card(value, color, flip_direction, to_take, wish);
      elements.cards.append(card);
      break;
    }

    
    case "new_card_for": {
      const player = Array.from(document.querySelectorAll('aini-opponent')).find(p => p.name == data.player_name);

      const count_element = player.querySelector(".count");
      count_element.innerText = Number(count_element.innerText) + 1;
      break;
    }

    case "new_player_card": {
      const {value, color, flip_direction, to_take, wish} = data.card;
      const card = new Card(value, color, flip_direction, to_take, wish);
//     new_card.fadeIn(e.clientX / window.innerWidth, e.clientY / window.innerHeight);

      const player = Array.from(document.querySelectorAll('aini-opponent')).find(p => p.name == data.player_name);

      const count_element = player.querySelector(".count");
      count_element.innerText = Number(count_element.innerText) - 1;
      
      card.fadeIn(count_element.offsetLeft / window.innerWidth, count_element.offsetTop / window.innerHeight);

      
      elements.cards.append(card);
    }

    default:
      break;
  }
});
