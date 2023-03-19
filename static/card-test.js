const card = document.querySelector(".card");

const checkboard_lines = card.querySelector(".checkboard-lines");
const shockwave = card.querySelector(".checkboard-shockwave");

checkboard_lines.addEventListener("mousemove", e => {
  const x = e.clientX - checkboard_lines.offsetParent.offsetLeft - checkboard_lines.clientWidth / 2;
  const y = e.clientY - checkboard_lines.offsetParent.offsetTop - checkboard_lines.clientHeight / 2;
  checkboard_lines.style.maskPosition = `${x}px ${y}px`

  const percentageX = (e.clientX - checkboard_lines.offsetParent.offsetLeft) / checkboard_lines.clientWidth * 100;
  const percentageY = (e.clientY - checkboard_lines.offsetParent.offsetTop) / checkboard_lines.clientHeight * 100;
  console.log(percentageX);

  shockwave.style.setProperty("--x", `${percentageX}%`);
  shockwave.style.setProperty("--y", `${percentageY}%`);
  // shockwave.style.maskPosition = `${x}px ${y}px`
})

checkboard_lines.addEventListener("pointerup", e => {
  shockwave.style.setProperty("--t", `-60%`);
  window.requestAnimationFrame(startShockwave)
})


let start = 0;
let previous = 0;
let duration = 600;

function startShockwave(time) {
  start = start || time;
  let elapsed = time - start;

  let t = elapsed / duration;

  // console.log("lol", t);

  let mask = `radial-gradient(circle, rgba(0, 0, 0, 0.0) ${t * 100}%, black ${t * 100 + 20}%, rgba(0, 0, 0, 0.0) ${t * 100 + 40}%);`

  shockwave.style.setProperty("--t", `${lerp(-60, 100, t)}%`);

  if (elapsed < duration) {
    window.requestAnimationFrame(startShockwave)
  } else {
    start = 0;
  }
}


function lerp(v0, v1, t) {
  return v0 * (1 - t) + v1 * t
}
