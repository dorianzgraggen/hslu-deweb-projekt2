export const Game = {
  hasToTake: 0,
};

type Color = 'none' | 'red' | 'blue' | 'green' | 'yellow';

export class Card {
  color: Color;
  value: number;
  flip_direction = false;
  to_take: number;

  constructor(
    color: Color,
    value: number,
    flip_direction: boolean,
    to_take: number
  ) {
    this.color = color;
    this.value = value;
    this.flip_direction = flip_direction;
    this.to_take = to_take;
  }

  canBePutOn(other: Card): boolean {
    if (Game.hasToTake > 0) {
      if (this.color == 'none' && this.to_take > 0) return true;
      if (this.color == other.color) {
        if (this.to_take > 0) return true;
        if (this.flip_direction) return true;

        return false;
      }

      if (this.to_take == other.to_take) return true;
    }

    if (this.color == 'none') return true;
    if (this.color == other.color) return true;

    return false;
  }
}
