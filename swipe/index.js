const container = document.querySelector(".swipable-container")
const swipables = document.querySelectorAll(".swipable");
const slider = document.querySelector(".slider");

console.log(swipables)

container.style.transform = `rotateY(${0}deg) translate3d(${0}px, ${0}px, ${-270}px)`


setRotation();

console.log(slider)
slider.addEventListener("input", e => {
    console.log(e.target.value)
    setRotation(e.target.value)
})
function setRotation(rotation = 0) {
    swipables.forEach((swipable, i) => {
        swipable.style.transform = `rotateY(${rotation * 360 + i * 60}deg) translate3d(${i * 0}px, ${-i * 0}px, ${270}px)`;

    });
}

