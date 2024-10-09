export const initializeCharacterSlider = () => {
  const wrapper = document.querySelector(".characters__wrapper");
  const carousel = document.querySelector(".js-characters");
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

    // clearInterval(timeOutId);
    // if (!wrapper.matches(":hover")) autoPlay();
  };

  //   const autoPlay = () => {
  //     if (window.innerWidth < 800) return;

  //     timeOutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 1000);
  //   };

  // autoPlay();

  const updateActiveSlide = () => {
    const carouselReact = carousel.getBoundingClientRect();
    const carouselCenter = (carouselReact.left + carouselReact.width) / 2;
    let closestSlide = null;
    let closestDistance = Infinity;

    carouselCards.forEach((card) => {
      const cardReact = card.getBoundingClientRect();
      const cardCenter = (cardReact.left + cardReact.width) / 2;

      // Verifica qual slide está mais próximo do centro
      const distance = Math.abs(carouselCenter - cardCenter);

      if (
        cardReact.left >= carouselReact.left &&
        cardReact.right <= carouselReact.right &&
        distance < closestDistance
      ) {
        closestDistance = distance;
        closestSlide = card;
      }

      carouselCards.forEach((card) =>
        card.classList.remove("character__active")
      );

      if (closestSlide) {
        closestSlide.classList.add("character__active");
      }
    });
  };

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  carousel.addEventListener("scroll", () => {
    infiniteScroll();
    updateActiveSlide();
  });
  //   wrapper.addEventListener("mouseenter", () => clearInterval(timeOutId));
  //   wrapper.addEventListener("mouseleave", autoPlay);
};
