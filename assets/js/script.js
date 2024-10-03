import { openBurgerMenu } from "./modules/burger.js";
import { closeModal } from "./modules/modalController.js";

document.addEventListener("DOMContentLoaded", () => {
  const functionsToCall = [
    { name: "openBurgerMenu", func: openBurgerMenu },
    { name: "closeModal", func: closeModal },
  ];

  functionsToCall.forEach(({ name, func }) => {
    if (typeof func === "function") {
      try {
        func();
      } catch (error) {
        console.log(`Erro ao executar ${name}: `, error);
      }
    } else {
      console.error(`${name} não é uma função válida.`);
    }
  });
});
