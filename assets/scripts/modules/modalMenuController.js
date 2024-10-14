import { toggleClass, toggleModalAndButtonClasses } from "./toggleClasses.js";

function getElements() {
  const navbarOpenButton = document.querySelector("#navbarOpenButton");
  const navbarModal = document.querySelector("#navbarMenuModal");
  const navbarCloseButton = document.querySelector("#navbarCloseButton");

  return navbarOpenButton && navbarCloseButton && navbarCloseButton
    ? { navbarOpenButton, navbarModal, navbarCloseButton }
    : null;
}

export function openNavbarModal() {
  const navbarOpenButton = getElements().navbarOpenButton;
  const navbarModal = getElements().navbarModal;

  const handleOpenEvent = (event) => {
    if (event?.type === "touchstart") event.preventDefault();
    toggleModalAndButtonClasses(navbarOpenButton, navbarModal);
  };

  ["click", "touchstart"].forEach((eventType) => {
    navbarOpenButton.addEventListener(eventType, handleOpenEvent);
  });
}

export function closeNavbarModal() {
  const { navbarOpenButton, navbarModal, navbarCloseButton } = getElements();

  const handleCloseEvent = (event) => {
    if (event?.type === "touchstart") event.preventDefault();
    toggleModalAndButtonClasses(navbarCloseButton, navbarModal);
    toggleClass(navbarOpenButton, "js-open-menu");
  };

  ["click", "touchstart"].forEach((eventType) => {
    navbarCloseButton.addEventListener(eventType, handleCloseEvent);
  });
}
