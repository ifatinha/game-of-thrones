import {
  updateAriaHidden,
  updateAriaAttributes,
} from "./ariaAttributesUtils.js";
import { toggleClass } from "./toggleClasses.js";

function getElements() {
  const elements = {
    buttonBurger: document.querySelector("#buttonBurger"),
    modal: document.querySelector("#navbarMenuModal"),
  };

  if (!elements.buttonBurger || !elements.modal) return;

  return elements;
}

export function menuModalInit(event) {
  if (event?.type === "touchstart") event.preventDefault();

  const { buttonBurger, modal } = getElements();

  [buttonBurger, modal].forEach((element, index) => {
    const classesNames = ["js-open-menu", "js-open-modal"];
    toggleClass(element, classesNames[index]);
  });

  const isOpenMenu = buttonBurger.classList.contains("js-open-menu");
  updateAriaAttributes(isOpenMenu, buttonBurger);

  const isOpenModal = modal.classList.contains("js-open-modal");
  updateAriaHidden(!isOpenModal, modal);
}

export function closeModal() {
  const navbarCloseButton = document.querySelector("#navbarCloseButton");
  const modal = getElements().modal;

  if (!navbarCloseButton) return;

  ["click", "touchstart"].forEach((eventType) => {
    navbarCloseButton.addEventListener(eventType, () => {
      toggleClass(modal, "js-open-modal");
    });
  });
}
