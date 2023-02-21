const container = document.querySelector(".swipable-container")
const swipables = document.querySelectorAll(".swipable");
console.log(swipables)

container.style.transform = `rotateY(${0}deg) translate3d(${0}px, ${0}px, ${-270}px)`


swipables.forEach((swipable, i) => {
    console.log()
    // swipable.style.transform = `rotateY(${i * 8}deg)`

    swipable.style.transform = `rotateY(-${i * 60}deg) translate3d(${i * 0}px, ${- i * 0}px, ${270}px)`

});
