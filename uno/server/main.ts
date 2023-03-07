import { serve } from 'https://deno.land/std@0.178.0/http/server.ts';
import { serveDir } from 'https://deno.land/std@0.178.0/http/file_server.ts';

const port = 9999;

const handler = async (request: Request): Promise<Response> => {
  const url = new URL(request.url);

  if (url.pathname === '/api/file-changes') {
    const s = url.searchParams.get('s');

    if (s) {
      if (requesters.includes(s)) {
        return new Response('0');
      } else {
        requesters.push(s);
        return new Response('1');
      }
    }
    return new Response('not valid', { status: 500 });
  }

  if (url.pathname === '/ws') {
    return handleWebsocketReq(request);
  }

  if (url.pathname.startsWith('/static')) {
    return serveDir(request);
  }

  return await handleWebpageReq(url);
};

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

async function handleWebpageReq(url: URL): Promise<Response> {
  try {
    let pathname = url.pathname;
    if (pathname === '/') {
      pathname = '/index';
    }

    // TODO: cache html files on startup
    const html = await Deno.readTextFile(`./routes${pathname}.html`);
    const body = new TextEncoder().encode(html);

    return new Response(body, {
      status: 200,
    });
  } catch (error) {
    return new Response(error, {
      status: 404,
    });
  }
}

console.log(`HTTP webserver running. Access it at: http://localhost:${port}/`);

const requesters = new Array<string>();

await Promise.all([
  serve(handler, { port }),

  (async function () {
    const watcher = Deno.watchFs('.');
    for await (const event of watcher) {
      event.paths.forEach((path) => {
        ['css', 'js', 'html'].forEach((ending) => {
          if (path.endsWith('.' + ending)) {
            requesters.length = 0;
          }
        });
      });
    }
  })(),
]);
