import { books } from "../data/books.js";

let touchStartX = 0;
let touchEndX = 0;

const getModalDom = () => {
  const modalCharacter = document.querySelector("#bookModal");

  if (!modalCharacter) return;

  return modalCharacter;
};

const refreshModalData = (book) => {
  const container = document.querySelector(".book__description");
  const bookYear = document.querySelector("#bookYear");
  const bookTitle = document.querySelector("#bookTitle");

  // Verificar se todos os elementos necessários estão disponíveis
  if (!container || !bookYear || !bookTitle) {
    console.warn("Alguns elementos do modal não foram encontrados.");
    return;
  }

  container.style.backgroundImage = `url('${book.bgImage}')`;
  bookYear.textContent = book.year;
  bookTitle.textContent = book.title;
};

const handleBookModal = (card) => {
  const bookId = +card.dataset.bookId;

  const bookIdx = books.findIndex((book) => {
    return book.id === bookId;
  });

  if (bookIdx !== -1) {
    const modal = getModalDom();
    modal.classList.add("actived");
    modal.removeAttribute("aria-hidden");
    card.setAttribute("aria-expanded", "true");
    refreshModalData(books[bookIdx]);
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
      handleBookModal(card);
    }
  }

  if (event?.type === "keydown" || event?.type === "click") {
    event.preventDefault();
    handleBookModal(card);
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
    modal.setAttribute("aria-hidden", "true");
  };

  [("touchstart", "click")].forEach((eventType) => {
    closeButton.addEventListener(eventType, closeModal);
  });
};
