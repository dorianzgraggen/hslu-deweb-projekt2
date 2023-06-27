const files = new Array<string>();

for (const entry of Deno.readDirSync('./static/sounds/voices')) {
  files.push(entry.name);
}

export function handle(_request: Request): Response {
  console.log('files', files, files.length);
  return new Response(JSON.stringify(files), {
    headers: new Headers({ 'Content-Type': 'application/json' }),
  });
}
