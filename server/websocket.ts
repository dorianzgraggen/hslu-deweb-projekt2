import { Card } from './cards.ts';
import { Game, Player } from './game/game.ts';
import { game_map } from './global.ts';

export function handleWebsocketReq(req: Request): Response {
  const upgrade = req.headers.get('upgrade') || '';
  if (upgrade.toLowerCase() != 'websocket') {
    return new Response("request isn't trying to upgrade to websocket.");
  }
  const { socket, response } = Deno.upgradeWebSocket(req);
  socket.onopen = () => console.log('socket opened');
  socket.onmessage = (e) => {
    try {
      const parsed_message = JSON.parse(e.data);
      console.log('socket message:', parsed_message);

      switch (parsed_message.type) {
        case 'join_list': {
          console.log('ahaha', e);

          const game = game_map.get(parsed_message.code);

          if (!game) {
            console.warn('game does not exist.');
            break;
          }

          if (game.secret !== parsed_message.secret) {
            console.warn('invalid secret');
            break;
          }

          game.join_list_socket = socket;
          // const game = game_map
          break;
        }

        case 'new_game': {
          let code = ('' + Math.random()).substring(2, 6);
          code = '0000';
          socket.send(
            JSON.stringify({
              type: 'game_code',
              code,
            })
          );

          game_map.set(code, new Game(code, 'lol', socket));

          break;
        }

        case 'new_player': {
          console.log({ game_map });
          console.log('code is', parsed_message.code);
          const game = game_map.get(parsed_message.code);
          console.log('existing game', game);
          const player = new Player(socket, parsed_message.player_name);

          game?.join(player);

          break;
        }

        case 'game_start': {
          const game = game_map.get(parsed_message.code);
          game?.begin();
          break;
        }

        case 'played_card': {
          const game = game_map.get(parsed_message.code);

          const { value, color, flip_direction, to_take, wish } =
            parsed_message.card;

          const card = new Card(color, value, flip_direction, to_take, wish);
          game?.playCard(card, parsed_message.player_name);
          break;
        }

        default:
          break;
      }

      // socket.send(new Date().toString());
    } catch (error) {
      console.error('Error parsing websocket message:', error);
    }
  };
  socket.onerror = (e) => console.log('socket errored:', e);
  socket.onclose = () => console.log('socket closed');
  return response;
}
