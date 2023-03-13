const handlers = new Map<string, (request: Request) => Promise<Response>>();

for await (const dirEntry of Deno.readDir('./server/api')) {
  if (!dirEntry.name.endsWith('.ts') || dirEntry.name.startsWith('_')) {
    continue;
  }

  console.log('trying');

  try {
    const imported = await import('./' + dirEntry.name);

    const handler = imported.handle;

    if (!handler) {
      console.warn(dirEntry.name + ' does not have a .handler');
      continue;
    }

    handlers.set(dirEntry.name.slice(0, -3), handler);
  } catch (error) {
    console.error(error);
  }

  console.log(dirEntry.name);
}

export async function handle(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const id = url.pathname.substring(5);

  const handler = handlers.get(id);

  if (!handler) {
    return new Response('This endpoint does not exist.', { status: 404 });
  }

  return await handler(request);
}
