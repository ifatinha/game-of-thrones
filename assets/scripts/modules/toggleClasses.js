import {
  updateAriaHidden,
  updateAriaAttributes,
} from "./ariaAttributesUtils.js";

export function toggleClass(element, className) {
  element.classList.toggle(className);
}

export function toggleModalAndButtonClasses(navbarButton, modal) {
  const classesNames = ["js-open-menu", "menu__modal-open"];

  [navbarButton, modal].forEach((element, index) => {
    toggleClass(element, classesNames[index]);
  });

  const isOpenMenu = navbarButton.classList.contains("js-open-menu");
  updateAriaAttributes(isOpenMenu, navbarButton);

  const isOpenModal = modal.classList.contains("menu__modal-open");
  updateAriaHidden(!isOpenModal, modal);
}
