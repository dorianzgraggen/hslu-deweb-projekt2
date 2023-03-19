import {
  assert,
  assertFalse,
} from 'https://deno.land/std@0.179.0/testing/asserts.ts';

import { Card, Game } from './cards.ts';

Deno.test(function testCanPutOn() {
  const red_2 = new Card('red', 2, false, 0);
  const red_reverse = new Card('red', 0, true, 0);
  const plus_4 = new Card('none', 0, false, 4);
  const red_plus_2 = new Card('red', 0, false, 2);
  const blue_plus_2 = new Card('blue', 0, false, 2);
  const blue_reverse = new Card('blue', 0, true, 0);

  Game.hasToTake = 0;
  assert(red_2.canBePutOn(red_reverse));
  assert(red_reverse.canBePutOn(red_2));

  Game.hasToTake = 2;
  assert(plus_4.canBePutOn(red_plus_2));
  assert(blue_plus_2.canBePutOn(red_plus_2));
  assert(blue_reverse.canBePutOn(blue_plus_2));
  assertFalse(red_reverse.canBePutOn(blue_plus_2));
});
