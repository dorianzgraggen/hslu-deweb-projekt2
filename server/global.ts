import { Game } from './game/game.ts';

// TODO: have some kind of secret related to a game code to verify valid requests
export const running_games: Set<string> = new Set();

export const game_map: Map<string, Game> = new Map();
