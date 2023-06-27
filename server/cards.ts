import { getColorEnabled } from 'https://deno.land/std@0.178.0/fmt/colors.ts';

export const Game = {
  hasToTake: 0,
};

type Color = 'none' | 'red' | 'blue' | 'green' | 'yellow';

export class Card {
  color: Color;
  value: number;
  flip_direction = false;
  to_take: number;
  wish: boolean;

  constructor(
    color: Color,
    value: number,
    flip_direction: boolean,
    to_take: number,
    wish: boolean
  ) {
    this.color = color;
    this.value = value;
    this.flip_direction = flip_direction;
    this.to_take = to_take;
    this.wish = wish;
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

  serialize(): string {
    return JSON.stringify(this);
  }

  static getRandomColor() {
    return (['red', 'blue', 'yellow', 'green'] as Color[])[
      Math.floor(Math.random() * 4)
    ];
  }

  static getRandomValue() {
    return Math.floor(Math.random() * 10);
  }

  static newRandom() {
    const value = Card.getRandomValue();
    const color = this.getRandomColor();
    const flip_direction = Math.random() > 0.9;
    let to_take = 0;
    if (Math.random() > 0.7) {
      to_take = Math.ceil(Math.random() * 3); // 1 to 4
    }
    let wish = Math.random() > 0.85;

    if (flip_direction) {
      to_take = 0;
      wish = false;
    }
    return new Card(color, value, flip_direction, to_take, wish);
  }
}
