const BASE_PATH = './public';

const server = Deno.listen({ port: 7777 });
console.log(`HTTP webserver running. Access it at http://localhost:7777/`);

for await (const conn of server) {
  handle(conn);
}

async function handle(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);

  for await (const requestEvent of httpConn) {
    const url = new URL(requestEvent.request.url);

    // handle WebSocket connection
    if (url.pathname === '/ws') {
      await requestEvent.respondWith(handleWebsocketReq(requestEvent.request));
      return;
    }

    console.log('sub', url.pathname.substring(0, 7));

    // serve files in ./public
    if (url.pathname.substring(0, 7) === '/static') {
      console.log('lol');

      const filePath = '.' + url.pathname;
      console.log('path: ' + filePath);
      let fileSize = 0;

      try {
        console.log('try');
        fileSize = (await Deno.stat(filePath)).size;
        console.log(fileSize);
      } catch (e) {
        if (e instanceof Deno.errors.NotFound) {
          requestEvent.respondWith(new Response(null, { status: 404 }));
        }

        requestEvent.respondWith(new Response(null, { status: 500 }));
      }

      // TODO: cache list of files
      const body = (await Deno.open(filePath)).readable;
      console.log('bodied');
      requestEvent.respondWith(
        new Response(body, {
          headers: { 'content-length': fileSize.toString() },
        })
      );
    }

    // serve html file if pathname is valid
    try {
      let pathname = url.pathname;
      if (pathname === '/') {
        pathname = '/index';
      }

      // TODO: cache html files on startup
      const html = await Deno.readTextFile(`./routes${pathname}.html`);

      const body = new TextEncoder().encode(html);
      requestEvent.respondWith(
        new Response(body, {
          status: 200,
        })
      );
    } catch (error) {
      requestEvent.respondWith(
        new Response(error, {
          status: 404,
        })
      );
    }
  }
}

function handleWebsocketReq(req: Request): Response {
  const upgrade = req.headers.get('upgrade') || '';
  if (upgrade.toLowerCase() != 'websocket') {
    return new Response("request isn't trying to upgrade to websocket.");
  }
  const { socket, response } = Deno.upgradeWebSocket(req);
  socket.onopen = () => console.log('socket opened');
  socket.onmessage = (e) => {
    console.log('socket message:', e.data);
    socket.send(new Date().toString());
  };
  socket.onerror = (e) => console.log('socket errored:', e);
  socket.onclose = () => console.log('socket closed');
  return response;
}
