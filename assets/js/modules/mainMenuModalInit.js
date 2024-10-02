import {
  updateAriaHidden,
  updateAriaAttributes,
} from "./ariaAttributesUtils.js";
import { toggleClass } from "./toggleClasses.js";

function getElements() {
  const elements = {
    buttonBurger: document.querySelector("#buttonBurger"),
  };

  if (!elements.buttonBurger) return;

  return elements;
}

export function menuModalInit(event) {
  if (event?.type === "touchstart") event.preventDefault();

  const { buttonBurger } = getElements();

  [buttonBurger].forEach((element, index) => {
    const classesNames = ["js-open-menu"];
    toggleClass(element, classesNames[index]);
  });

  const isOpenMenu = buttonBurger.classList.contains("js-open-menu");
  updateAriaAttributes(isOpenMenu, buttonBurger);
}
