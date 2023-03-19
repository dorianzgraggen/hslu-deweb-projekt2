import { serve } from 'https://deno.land/std@0.178.0/http/server.ts';
import { serveDir } from 'https://deno.land/std@0.178.0/http/file_server.ts';
import { handleWebsocketReq } from './websocket.ts';
import * as API from './api/_api.ts';

const port = 9999;

const handler = async (request: Request): Promise<Response> => {
  const url = new URL(request.url);

  if (url.pathname.startsWith('/api')) {
    return await API.handle(request);
  }

  if (url.pathname === '/file-changes') {
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

  if (url.pathname.startsWith('/elements')) {
    let js = await Deno.readTextFile('.' + url.pathname);
    const html = await Deno.readTextFile(
      '.' + url.pathname.replace('js', 'html')
    );

    js = js.replace('__AINI_HTML', `\`${html}\``);

    return new Response(js, {
      headers: new Headers({ 'Content-Type': 'text/javascript' }),
    });
  }

  return await handleWebpageReq(url);
};

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
