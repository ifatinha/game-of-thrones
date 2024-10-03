import {
  updateAriaHidden,
  updateAriaAttributes,
} from "./ariaAttributesUtils.js";
import { toggleClass } from "./toggleClasses.js";

function getElements() {
  const navbarOpenButton = document.querySelector("#navbarOpenButton");
  const navbarModal = document.querySelector("#navbarMenuModal");
  const navbarCloseButton = document.querySelector("#navbarCloseButton");

  return navbarOpenButton && navbarCloseButton && navbarCloseButton
    ? { navbarOpenButton, navbarModal, navbarCloseButton }
    : null;
}

function toggleModalAndButtonClasses(navbarButton, modal) {
  const classesNames = ["js-open-menu", "js-open-modal"];

  [navbarButton, modal].forEach((element, index) => {
    toggleClass(element, classesNames[index]);
  });

  const isOpenMenu = navbarButton.classList.contains("js-open-menu");
  updateAriaAttributes(isOpenMenu, navbarButton);

  const isOpenModal = modal.classList.contains("js-open-modal");
  updateAriaHidden(!isOpenModal, modal);
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
