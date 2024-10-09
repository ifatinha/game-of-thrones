export const initializeCharacterSlider = () => {
  const carousel = document.querySelector(".characters__list");
  const carouselButtons = document.querySelectorAll(".characters__button");
  const carouselCards = [...carousel.children];
  const firstCardWidth =
    carousel.querySelector(".characater__card").offsetWidth;

  let isDragging = false;
  let startX;
  let startScrollLeft;
  let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
  let timeOutId;

  if (!carousel || !carouselButtons || !carouselCards) return;

  /** Clonar os cards no inicio e no final do carousel */
  carouselCards
    .slice(-cardPerView)
    .reverse()
    .forEach((card) => {
      carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

  carouselCards.slice(0, cardPerView).forEach((card) => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  });

  /** fução para atualizar o card ao clicar nos botões */
  const updateCard = (event) => {
    if (event?.type === "touchstart") event.preventDefault();
    const button = event.currentTarget;

    carousel.scrollLeft +=
      button.id === "buttonCarouselLeft" ? -firstCardWidth : firstCardWidth;
  };

  carouselButtons.forEach((button) => {
    ["click", "touchstart"].forEach((eventType) => {
      button.addEventListener(eventType, updateCard);
    });
  });

  /** ********************* */

  const dragStart = (event) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = event.pageX;
    startScrollLeft = carousel.scrollLeft;
  };

  const dragging = (event) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (event.pageX - startX);
  };

  const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
  };

  const infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    } else if (
      Math.ceil(carousel.scrollLeft) ===
      carousel.scrollWidth - carousel.offsetWidth
    ) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    }
  };

  // Função para detectar e marcar o card selecionado
  const setSelectedCard = () => {
    const cards = [...carousel.children];
    const carouselRect = carousel.getBoundingClientRect();
    let selectedCard = null;
    let minDiff = Infinity;

    cards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      const diff = Math.abs(
        carouselRect.left +
          carouselRect.width / 2 -
          (cardRect.left + cardRect.width / 2)
      );

      if (diff < minDiff) {
        minDiff = diff;
        selectedCard = card;
      }

      cards.forEach((card) => card.classList.remove("character__active"));

      if (selectedCard) {
        selectedCard.classList.add("character__active");
      }
    });
  };

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  carousel.addEventListener("scroll", () => {
    infiniteScroll();
    setSelectedCard();
  });
};
