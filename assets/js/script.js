/** open menu mobile */
const openMenuMobileBtn = document.querySelector(".menu-mobile");
const closeMenuMobileBtn = document.querySelector(".close-mobile-btn");

const menuOverlay = document.querySelector(".menu-overlay");

function openMenuMobile() {
    menuOverlay.classList.remove("close-menu-mobile");
    menuOverlay.classList.toggle("open-menu-mobile");
}

function closeMenuMobile() {
    menuOverlay.classList.remove("open-menu-mobile");
    menuOverlay.classList.add("close-menu-mobile");
}

openMenuMobileBtn.addEventListener("click", openMenuMobile);
closeMenuMobileBtn.addEventListener("click", closeMenuMobile);