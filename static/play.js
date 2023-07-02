import { Card } from '../elements/card.js';
import { Opponent } from '../elements/opponent.js';

const socket = new WebSocket(`wss://${window.location.host}/ws`);

const id = Math.random();

let game_code = "0000";

const elements = {
  hand: document.getElementById('hand'),
  draw_btn: document.getElementById("draw"),
  btm: document.querySelector(".btm"),
  names: document.getElementById("names"),
  join: document.getElementById("join"),
};

let player_name = 'a' + Math.random();

// socket.addEventListener('open', (event) => {

// });

function appendCard(card) {
  const div = document.createElement("div");
  div.appendChild(card)
  elements.hand.append(div);

}

fetchNames();

socket.addEventListener('message', (message) => {
  console.log(message);
  const data = JSON.parse(message.data);
  console.log(data);
  console.log(data.type);

  switch (data.type) {
    case 'start_cards': {
      data.start_cards.forEach(
        ({ value, color, flip_direction, to_take, wish }) => {
          const card = new Card(value, color, flip_direction, to_take, wish);
          appendCard(card);
        }
      );
      break;
    }

    case 'your_turn': {
      // alert('your turn');

      console.log("it's your turn");

      const cards = document.querySelectorAll('aini-card');
      cards.forEach((card) => {
        card.addEventListener('click', onCardClick);
      });

      elements.hand.classList.add("your-turn");
      elements.draw_btn.disabled = false;

      const keyframes = [
        { background: "#0C2963" },
        { background: "#23417e" },
        { background: "#0C2963" },
      ];

      const timing = {
        duration: 500,
        iterations: 1,
      };

      document.body.animate(keyframes, timing);


      break;
    }

    case 'card_for_you': {
      const { value, color, flip_direction, to_take, wish } = data.card;
      const card = new Card(value, color, flip_direction, to_take, wish);
      card.addEventListener('click', onCardClick);
      appendCard(card);
      break;
    }


    default:
      break;
  }
});

function onCardClick(e) {
  console.log(e);
  const card = e.target.closest('aini-card');
  const { value, color, flip_direction, to_take, wish } = card;
  socket.send(
    JSON.stringify({
      type: 'played_card',
      code: game_code,
      player_name,
      card: {
        value,
        color,
        flip_direction,
        to_take,
        wish,
      },
    })
  );
  console.log('clicked', card);

  card.parentElement.remove();

  const cards = document.querySelectorAll('aini-card');
  cards.forEach((card) => {
    card.removeEventListener('click', onCardClick);
  });

  elements.hand.classList.remove("your-turn");

  elements.draw_btn.disabled = true;
}

elements.draw_btn.addEventListener("click", e => {
  socket.send(JSON.stringify({
    type: "draw_card",
    code: game_code,
    player_name
  }))
})


async function fetchNames() {
  try {
    const response = await fetch("/api/names");
    const parsed = await response.json();
    console.log(parsed);
    elements.names.innerText = "";
    parsed.forEach(n => {
      console.log(n)
      const btn = document.createElement("button");
      btn.onclick = () => setReady(n);
      btn.innerText = n;
      btn.on
      elements.names.appendChild(btn);
    });

  } catch (error) {
    console.error(error);
  }
}

function setReady(name) {
  console.log("i bims, de " + name);
  elements.btm.classList.remove("hidden");
  elements.join.classList.add("hidden");
  player_name = name;

  socket.send(
    JSON.stringify({
      type: 'new_player',
      code: game_code,
      player_name,
    })
  );
}


document.querySelector("h1").addEventListener("click", e => {
  console.log(socket)
  socket.send(JSON.stringify({ type: "aini", code: game_code }));
})
