const host = document.querySelector(".host");

host.addEventListener("click", e => {
  console.log("click")
  document.body.classList.toggle("host-mode")
})
