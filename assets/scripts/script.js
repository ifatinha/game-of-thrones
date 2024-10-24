import {
  openNavbarModal,
  closeNavbarModal,
} from "./modules/modalMenuController.js";
import { smoothScrollTo } from "./modules/navigation.js";
import { renderCharacterElements } from "./modules/characterElements.js";
import { initializeCharacterSlider } from "./modules/characterCarousel.js";
import {
  openCharacterModal,
  closeModalCharacter,
} from "./modules/characterModalController.js";
import {
  openBookModal,
  closeBookModal,
} from "./modules/modalBookController.js";

//{ name: "renderCharacterElements", func: renderCharacterElements }

document.addEventListener("DOMContentLoaded", () => {
  const functionsToCall = [
    { name: "openNavbarModal", func: openNavbarModal },
    { name: "closeNavbarModal", func: closeNavbarModal },
    { name: "smoothScrollTo", func: smoothScrollTo },
    { name: "renderCharacterElements", func: renderCharacterElements },
    { name: "initializeCharacterSlider", func: initializeCharacterSlider },
    { name: "openCharacterModal", func: openCharacterModal },
    { name: "closeModalCharacter", func: closeModalCharacter },
    { name: "openBookModal", func: openBookModal },
    { name: "closeBookModal", func: closeBookModal },
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
