import { Card } from '../elements/card.js';
import { Opponent } from '../elements/opponent.js';

const socket = new WebSocket('ws://localhost:9999/ws');

const id = Math.random();

let game_code = new URLSearchParams(window.location.search).get('code');

const elements = {
  hand: document.getElementById('hand'),
};

const player_name = 'a' + Math.random();

socket.addEventListener('open', (event) => {
  socket.send(
    JSON.stringify({
      type: 'new_player',
      code: game_code,
      player_name,
    })
  );
});

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
          elements.hand.append(card);
        }
      );
      break;
    }

    case 'your_turn': {
      alert('your turn');
      console.log("it's your turn");

      const cards = document.querySelectorAll('aini-card');
      cards.forEach((card) => {
        card.addEventListener('click', onCardClick);
      });
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

  card.remove();

  const cards = document.querySelectorAll('aini-card');
  cards.forEach((card) => {
    card.removeEventListener('click', onCardClick);
  });
}
