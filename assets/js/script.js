import { openNavbarModal, closeNavbarModal } from "./modules/modalController.js";

document.addEventListener("DOMContentLoaded", () => {
  const functionsToCall = [
    { name: "openNavbarModal", func: openNavbarModal },
    { name: "closeNavbarModal", func: closeNavbarModal },
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
