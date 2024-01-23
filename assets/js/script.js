/** open menu mobile */
const openMenuMobileBtn = document.querySelector(".menu-mobile");
const closeMenuMobileBtn = document.querySelector("#closeMenuMobileBtn");

const menuOverlay = document.querySelector(".menu-overlay");

function openMenuMobile() {
    menuOverlay.classList.remove("close-menu-mobile");
    menuOverlay.classList.add("open-menu-mobile");
}

function closeMenuMobile() {
    menuOverlay.classList.remove("open-menu-mobile");
    menuOverlay.classList.add("close-menu-mobile");
}

openMenuMobileBtn.addEventListener("click", openMenuMobile);
closeMenuMobileBtn.addEventListener("click", closeMenuMobile);

/** open modal video trailer */
const whactTrailerBtn = document.querySelector("#whactTrailerBtn");
const closeTrailerBtn = document.querySelector("#closeTrailerBtn");
const modalTrailer = document.querySelector("#modalTrailer");

function openModalTrailer() {
    modalTrailer.style.display = "flex";
}

function closeModalTrailer() {
    const trailerVideo = document.querySelector("#trailer");
    modalTrailer.style.display = "none";
    trailerVideo.pause();
}

whactTrailerBtn.addEventListener("click", openModalTrailer);
closeTrailerBtn.addEventListener("click", closeModalTrailer);

window.onclick = function (event) {
    if (event.target == modalTrailer) {
        modalTrailer.style.display = "none";
    }
}

/** owlCarousel */
$('.owl-carousel').owlCarousel({
    items: 1,
    loop: true,
    margin: 10,

    responsive: {
        0: {
            items: 1,
        },
        576: {
            items: 2
        },
        992: {
            items: 1
        }
    }
});

/** active menu media */
const trailers = document.querySelector("#trailers");
const screenshots = document.querySelector("#screenshots");

trailers.addEventListener("click", () => {
    trailers.classList.add("active-menu");
    screenshots.classList.remove("active-menu");
})

screenshots.addEventListener("click", () => {
    screenshots.classList.add("active-menu");
    trailers.classList.remove("active-menu");
})