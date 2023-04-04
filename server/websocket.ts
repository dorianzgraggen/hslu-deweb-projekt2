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

        default:
          break;
      }

      socket.send(new Date().toString());
    } catch (error) {
      console.error('Error parsing websocket message:', error);
    }
  };
  socket.onerror = (e) => console.log('socket errored:', e);
  socket.onclose = () => console.log('socket closed');
  return response;
}
