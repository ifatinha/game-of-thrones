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

/** modal generics configurations */
function openModal(element) {
    element.style.display = "flex";
}

function closeModal(element) {
    element.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modalTrailer) {
        modalTrailer.style.display = "none";
    }
}

/** open modal video trailer */
const whactTrailerBtn = document.querySelector("#whactTrailerBtn");
const closeTrailerBtn = document.querySelector("#closeTrailerBtn");
const modalTrailer = document.querySelector("#modalTrailer");

whactTrailerBtn.addEventListener("click", () => {
    openModal(modalTrailer);
});

closeTrailerBtn.addEventListener("click", () => {
    closeModal(modalTrailer);
    const trailerVideo = document.querySelector("#trailer");
    trailerVideo.pause();
});

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

/** active media tab */
const linksMedia = document.querySelectorAll(".media-menu a");

function removeActiveLinksMedia() {
    linksMedia.forEach((link) => {
        link.classList.remove("active-menu");
    })
}

function removeAllMediaTabs() {
    const mediaTabs = document.querySelectorAll(".media-tab");
    mediaTabs.forEach((tab) => {
        tab.style.display = "none";
    })
}

function activeTabContentMedia(link) {
    link.addEventListener("click", () => {
        removeActiveLinksMedia();
        removeAllMediaTabs();
        link.classList.add("active-menu");
        const mediaTab = document.querySelector(`#${link.dataset.media}`);
        mediaTab.style.display = "block";
    })
}

linksMedia.forEach(activeTabContentMedia);

/** modal gallery */
const galleryModal = document.querySelector("#galleryModal");
const galleryImgs = document.querySelectorAll(".screenshort-item img");
const btnCloseModalGallery = document.querySelector("#closeGalleryBtn");

btnCloseModalGallery.addEventListener("click", () => {
    closeModal(galleryModal);
})

function openImage(img) {
    const imgModal = document.querySelector("#imgOpen img");
    imgModal.setAttribute("src", img.getAttribute("src"));
    openModal(galleryModal);
}

function openImageGallery(img) {
    img.addEventListener("click", () => {
        openImage(img);
    });
}

galleryImgs.forEach(openImageGallery);