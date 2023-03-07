
const numbers_container = document.getElementById("numbers");

for (let i = 0; i < 12; i++) {
  const n = i % 10;

  const child = document.createElement("span")
  child.innerText = n;

  let s = Math.random() * Math.PI;

  const x = Math.cos(s) * 120;
  const y = Math.sin(s) * 100;

  const rotation = Math.random() * 360;

  child.animate(
    [
      { transform: `translate(${-x}vw, ${-y}vh) rotate(${rotation}deg)` },
      { transform: `translate(${x}vw, ${y}vh) rotate(${rotation + 720}deg)` },
    ], {
    duration: 30000,
    iterations: Infinity,
    iterationStart: Math.random()
  }
  )

  numbers_container.appendChild(child)
}
