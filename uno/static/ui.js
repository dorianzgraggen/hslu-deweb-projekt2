const root = document.getElementById("root");

const states = {
  index: [
    ["bg"],
    ["settings"],
    ["logo", "center"],
    ["buttons"],
  ],
  host: [
    ["bg"],
    ["settings"],
    ["logo", "top"],
    ["qr"],
  ]
}


function setState(id) {
  if (!states.hasOwnProperty(id)) {
    console.warn("could not set state to", id)
    return;
  }

  const state = states[id];

  Array(...root.children).forEach((child, i) => {
    const id = child.id
    const visible = state.find(a => a[0] === id)

    child.classList.toggle("hidden", !visible);

    Array(...child.attributes).forEach(attr => {
      if (attr.name.startsWith("q-")) {
        child.toggleAttribute(attr.name, false)
      }
    });

    state.forEach(name => {
      name.slice(1).forEach(property => {
        child.toggleAttribute("q-" + property, true)
      });

    });
  });
}
