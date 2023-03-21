import { Card } from '../cards.ts';

export function drawCard() {
  if (Math.random() > 0.8) {
    return new Card('none', 0, false, Math.random() > 0.5 ? 4 : 0, true);
  }

  // TODO: make sure reverse + to_take cards work in the game
  return new Card(
    getRandomColor(),
    Math.floor(Math.random() * 10),
    Math.random() > 0.9,
    Math.random() > 0.9 ? 2 : 0,
    false
  );
}

function getRandomColor() {
  const i = Math.floor(Math.random() * 4);
  return (['red', 'blue', 'green', 'yellow'] as DefaultColors[])[i];
}

type DefaultColors = 'red' | 'blue' | 'green' | 'yellow';
