export const initializeCharacterSlider = () => {
  const carousel = document.querySelector(".js-characters");
  const carouselButtons = document.querySelectorAll(".characters__button");
  const card = document.querySelectorAll(".characater__card")[0];
  const firstCardWidth = card.offsetWidth;
  let isDragging = false;
  let startX;
  let startScrollLeft;

  if (!carousel || !carouselButtons || !card) return;

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

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
};
