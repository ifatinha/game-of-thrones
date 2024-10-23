import { books } from "../data/books.js";

let touchStartX = 0;
let touchEndX = 0;

const getModalDom = () => {
  const modalCharacter = document.querySelector("#bookModal");

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

const handleCharacterModal = (card) => {
  const bookId = +card.dataset.bookId;

  const bookIdx = books.findIndex((book) => {
    return book.id === bookId;
  });

  if (bookIdx !== -1) {
    const modal = getModalDom();
    console.log(modal);
    modal.classList.add("actived");
    card.setAttribute("aria-expanded", "true");
  }
};

const initializeModal = (event, card) => {
  if (event?.type === "touchstart") {
    touchStartX = event.changedTouches[0].screenX;
  }

  if (event?.type === "touchend") {
    touchEndX = event.changedTouches[0].screenX;

    if (Math.abs(touchStartX - touchEndX) < 10) {
      event.preventDefault();
      handleCharacterModal(card);
    }
  }

  if (event?.type === "keydown" || event?.type === "click") {
    event.preventDefault();
    handleCharacterModal(card);
  }
};

export const openBookModal = () => {
  const cards = document.querySelectorAll(".book__item");

  if (!cards) {
    console.warn("Elementos não encontrados.");
  }

  cards.forEach((card) => {
    card.addEventListener("touchstart", (event) =>
      initializeModal(event, card)
    );
    card.addEventListener("touchend", (event) => initializeModal(event, card));
    card.addEventListener("click", (event) => initializeModal(event, card));

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        initializeModal(event, card);
      }
    });
  });
};

export const closeBookModal = () => {
  const closeButton = document.querySelector("#bookCloseButton");
  const modal = getModalDom();

  if (!closeButton) {
    console.warn("Elemento não encontrado.");
    return;
  }

  const closeModal = (event) => {
    if (event?.type === "touchstart") event.preventDefault();

    const cardActived = document.querySelector("[aria-expanded='true']");

    if (!cardActived) return;

    cardActived.setAttribute("aria-expanded", "false");
    modal.classList.remove("actived");
  };

  [("touchstart", "click")].forEach((eventType) => {
    closeButton.addEventListener(eventType, closeModal);
  });
};
