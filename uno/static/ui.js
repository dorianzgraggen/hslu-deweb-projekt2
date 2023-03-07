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

  console.log("STATE:", state);

  Array(...root.children).forEach((child, i) => {
    console.log("CHILD:", child.id);
    const id = child.id
    const visible = state.find(a => {
      console.log(a, a[0])
      return a[0] === id
    })

    child.classList.toggle("hidden", !visible);


    Array(...child.attributes).forEach(attr => {
      console.log(attr)
      if (attr.name.startsWith("q-")) {
        console.log("q-");
        child.toggleAttribute(attr.name, false)
      }
    });

    state.forEach(name => {
      console.log(name)
      name.slice(1).forEach(property => {
        child.toggleAttribute("q-" + property, true)
      });

    });
    // console.log(id, visible)
  });


}
