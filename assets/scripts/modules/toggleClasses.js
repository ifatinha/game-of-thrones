import {
  updateAriaHidden,
  updateAriaAttributes,
} from "./ariaAttributesUtils.js";

export function toggleClass(element, className) {
  element.classList.toggle(className);
}

export function toggleModalAndButtonClasses(navbarButton, modal) {
  const classesNames = ["js-open-menu", "js-open-modal"];

  [navbarButton, modal].forEach((element, index) => {
    toggleClass(element, classesNames[index]);
  });

  const isOpenMenu = navbarButton.classList.contains("js-open-menu");
  updateAriaAttributes(isOpenMenu, navbarButton);

  const isOpenModal = modal.classList.contains("js-open-modal");
  updateAriaHidden(!isOpenModal, modal);
}
