import { Game } from '../game/game.ts';
import { game_map, running_games } from '../global.ts';

export function handle(_request: Request): Response {
  let code = Math.random().toString().substring(2, 6);

  while (running_games.has(code)) {
    code = Math.random().toString().substring(2, 6);
  }

  const secret = crypto.randomUUID();
  const game = new Game(code, secret);

  running_games.add(code);
  game_map.set(code, game);

  return new Response(
    JSON.stringify({
      code,
      secret,
    })
  );
}
