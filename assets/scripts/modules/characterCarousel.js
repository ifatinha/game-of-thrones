export const initializeCharacterSlider = () => {
  const wrapper = document.querySelector(".characters__wrapper");
  const carousel = document.querySelector(".js-characters");
  const carouselButtons = document.querySelectorAll(".characters__button");
  const firstCardWidth =
    carousel.querySelector(".characater__card").offsetWidth;
  const carouselChildrens = [...carousel.children];
  let isDragging = false;
  let startX;
  let startScrollLeft;
  let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
  let timeOutId;

  if (!carousel || !carouselButtons || !carouselChildrens) return;

  carouselChildrens
    .slice(-cardPerView)
    .reverse()
    .forEach((card) => {
      carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

  carouselChildrens.slice(0, cardPerView).forEach((card) => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  });

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

    clearInterval(timeOutId);
    if (!wrapper.matches(":hover")) autoPlay();
  };

  const autoPlay = () => {
    if (window.innerWidth < 800) return;

    timeOutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 1000);
  };

  autoPlay();
  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  carousel.addEventListener("scroll", infiniteScroll);
  wrapper.addEventListener("mouseenter", () => clearInterval(timeOutId));
  wrapper.addEventListener("mouseleave", autoPlay);
};
