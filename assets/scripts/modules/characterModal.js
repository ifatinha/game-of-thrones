import { toggleClass } from "./toggleClasses.js";
import { characters } from "../data/characters.js";

let touchStartX = 0;
let touchEndX = 0;

const handleCharacterModal = (characterCode, card) => {
  const characterIdx = characters.findIndex((character) => {
    return character.code === +characterCode;
  });

  if (characterIdx !== -1) {
    const character = characters[characterIdx];
    const modalCharacter = document.querySelector("#modalCharacter");

    if (!modalCharacter) return;

    modalCharacter.classList.add("actived");
    modalCharacter.innerHTML = character.code;
    card.setAttribute("aria-expandes", true);
  }
};

const openModal = (event, characterCode) => {
  const card = event.currentTarget;
  if (event?.type === "touchstart") {
    touchStartX = event.changedTouches[0].screenX;
  }

  if (event?.type === "touchend") {
    touchEndX = event.changedTouches[0].screenX;

    if (Math.abs(touchStartX - touchEndX) < 10) {
      event.preventDefault();
      handleCharacterModal(characterCode, card);
    }
  }

  if (event?.type === "keydown") {
    console.log(event);
    event.preventDefault(); // Previne o comportamento padrão no clique ou tecla
    handleCharacterModal(characterCode, card);
  }
};

export const initializeModal = () => {
  const cards = document.querySelectorAll(".character__card");

  if (!cards) return;

  cards.forEach((card) => {
    card.addEventListener("touchstart", (event) =>
      openModal(event, card.dataset.characterCode)
    );
    card.addEventListener("touchend", (event) =>
      openModal(event, card.dataset.characterCode)
    );

    card.addEventListener("click", (event) =>
      openModal(event, card.dataset.characterCode)
    );
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        openModal(event, card.dataset.characterCode);
      }
    });
  });
};

export const closeModalCharacter = (card) => {
  //modalCharacter.classList.remove("js-open-modal");
  //card.setAttribute("aria-expandes", true);
};
