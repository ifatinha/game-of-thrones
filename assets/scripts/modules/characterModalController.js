import { characters } from "../data/characters.js";

let touchStartX = 0;
let touchEndX = 0;

const getModalDom = () => {
  const modalCharacter = document.querySelector("#modalCharacter");

  if (!modalCharacter) return;

  return modalCharacter;
};

const refreshModalData = (character) => {
  const container = document.querySelector(".character__container");
  const characterTitle = document.querySelector("#characaterTitle");
  const characterName = document.querySelector("#characaterName");
  const houseName = document.querySelector("#houseName");
  const quoteNameSpans = document.querySelectorAll(".quote__name");
  const quotes = document.querySelectorAll(".quotes");
  const bioParagraph = document.querySelectorAll(".bio__paragraph");
  const characterPhotos = document.querySelectorAll(".characater__photo");

  // Verificar se todos os elementos necessários estão disponíveis
  if (
    !container ||
    !characterTitle ||
    !characterName ||
    !houseName ||
    !quoteNameSpans.length ||
    !quotes.length ||
    !bioParagraph.length ||
    !characterPhotos.length
  ) {
    console.warn("Alguns elementos do modal não foram encontrados.");
    return;
  }

  container.style.backgroundImage = `url('${character.backgroundImage}')`;
  characterTitle.textContent = character.title;
  characterName.textContent = character.nameCharacters;
  houseName.textContent = `${character.house}`;

  quoteNameSpans.forEach((quote) => {
    quote.textContent = character.nameCharacters || "Personagem";
  });

  quotes.forEach((quote, index) => {
    quote.textContent = character.quotes?.[index]
      ? `"${character.quotes[index]}"`
      : "Sem citação";
  });

  bioParagraph.forEach((paragraph, index) => {
    paragraph.textContent =
      character.description?.[index] || "Descrição não disponível";
  });

  characterPhotos.forEach((image, index) => {
    image.src = character.gallery?.[index] || "assets/images/imagem.jpg";
    image.alt = character.alt || "Foto do personagem";
  });
};

const handleCharacterModal = (characterCode, card) => {
  const characterIdx = characters.findIndex((character) => {
    return character.code === +characterCode;
  });

  if (characterIdx !== -1) {
    const modalCharacter = getModalDom();
    modalCharacter.classList.add("actived");
    card.setAttribute("aria-expanded", "true");
    refreshModalData(characters[characterIdx]);
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

  if (event?.type === "keydown" || event?.type === "click") {
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

export const closeModalCharacter = () => {
  const closeModalButton = document.querySelector("#closeModalCharacterButton");
  const modalCharacter = getModalDom();
  if (!closeModalButton) return;

  const closeModal = (event) => {
    if (event?.type === "touchstart") event.preventDefault();
    const cartActived = document.querySelector("[aria-expanded='true']");

    if (!cartActived) return;

    cartActived.setAttribute("aria-expanded", "false");
    modalCharacter.classList.remove("actived");
  };

  [("touchstart", "click")].forEach((eventType) => {
    closeModalButton.addEventListener(eventType, closeModal);
  });
};
