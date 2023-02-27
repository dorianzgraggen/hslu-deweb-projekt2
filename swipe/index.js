const container = document.querySelector(".swipable-container")
const swipables = document.querySelectorAll(".swipable");
const slider = document.querySelector(".slider");
let currentRotation = 0;


console.log(swipables)

container.style.transform = `rotateY(${0}deg) translate3d(${0}px, ${0}px, ${-270}px)`


setRotation();

console.log(slider)
slider.addEventListener("input", e => {
    setRotation(e.target.value)
})


function setRotation(rotation = 0, animate = false) {
    swipables.forEach((swipable, i) => {
        let degrees = -rotation * 360 + i * 60;
        const tr = `rotateY(${degrees}deg) translate3d(${i * 0}px, ${-i * 0}px, ${270}px)`;;
        let transitionDuration = animate ? "1s" : "";
        swipable.style.transform = tr;
        swipable.classList.toggle("current", degrees % 360 == 0);

        if (animate) {
            slider.value = rotation % 1;
        } else {
            currentRotation = rotation % 1;
        }

    });
}

globalThis.handleClick = (multiplier) => {
    currentRotation += multiplier * (1 / swipables.length);
    currentRotation = Math.round(currentRotation * 6) / 6;
    setRotation(currentRotation, true)
}

