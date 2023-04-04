const root = document.getElementById("ui");


const screen_ids = [
  "screen-main",
  "screen-rules",
  "screen-join-by-code",
  "screen-choose-username",
  "screen-play",
  "screen-choose-host-mode",
  "screen-player-list",
]

const screens = screen_ids.map(id => document.getElementById(id))
console.log(screens)

screens.forEach(screen => {
  screen.classList.add("hidden");
});


export function setUi(id) {
  console.log("setting to", id)
  screens.forEach(screen => {
    screen.classList.toggle("hidden", screen.id !== "screen-" + id);
    screen.classList.toggle("visible", screen.id === "screen-" + id);
  });
}
