const adjectives = Deno.readTextFileSync('./server/api/names_adjectives.txt')
  .split('\r\n')
  .filter((s) => s.length > 0);

const nouns = Deno.readTextFileSync('./server/api/names_nouns.txt')
  .split('===\r\n')
  .map((s, i) =>
    s
      .split('\r\n')
      .filter((t) => t.length > 0)
      .map((u) => `${i}${u}`)
  )
  .flat();

// .filter((s) => s.length > 0);

export function handle(_request: Request): Response {
  return new Response(JSON.stringify([getName(), getName(), getName()]), {
    headers: new Headers({ 'Content-Type': 'application/json' }),
  });
}

function getName() {
  const i_noun = Math.floor(nouns.length * Math.random());
  const i_adjective = Math.floor(adjectives.length * Math.random());

  let adjective = adjectives[i_adjective];
  let noun = nouns[i_noun];

  if (noun.startsWith('0')) {
    adjective += 'e';
  } else if (noun.startsWith('1')) {
    adjective += 'i';
  } else if (noun.startsWith('2')) {
    adjective += 's';
  }

  noun = noun.slice(1);

  return adjective + ' ' + noun;
}
