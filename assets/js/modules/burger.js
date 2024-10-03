import { menuModalInit } from "./modalController.js";

export function openBurgerMenu() {
  const buttonBurger = document.querySelector("#buttonBurger");

  if (!buttonBurger) return;

  ["click", "touchstart"].forEach((eventType) => {
    buttonBurger.addEventListener(eventType, menuModalInit);
  });
}
