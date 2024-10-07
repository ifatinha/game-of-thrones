export const initializeCharacterSlider = () => {
  const characterList = document.querySelectorAll(".character");
  const prevButton = document.querySelector("#character-arrow-left");
  const nextButton = document.querySelector("#character-arrow-right");
  let carouselDisplay = 2;
  let qtdItems = characterList.length;

  if (!characterList || !prevButton || !nextButton) {
    console.error("Elements not found!");
    return;
  }

  const highlightCurrentItem = (currentIndex) => {
    characterList.forEach((item, index) => {
      item.classList.toggle("character-active", index === currentIndex);
    });
  };

  const scroolToInto = (currentIndex) => {
    characterList[currentIndex].scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });

    highlightCurrentItem(currentIndex);
  };

  const handleArrowClick = (event, direction) => {
    if (event.type === "touchstart") event.preventDefault();

    if (direction === "next") {
      carouselDisplay++;
      if (carouselDisplay > qtdItems - 1) {
        carouselDisplay = 0;
      }
    } else if (direction === "prev") {
      carouselDisplay--;
      if (carouselDisplay < 0) {
        carouselDisplay = qtdItems - 1;
      }
    }
    console.log(carouselDisplay);
    scroolToInto(carouselDisplay);
  };

  scroolToInto(carouselDisplay);

  ["click", "touchstart"].forEach((eventType) => {
    prevButton.addEventListener(eventType, (event) => {
      handleArrowClick(event, "prev");
    });

    nextButton.addEventListener(eventType, (event) => {
      handleArrowClick(event, "next");
    });
  });
};

const updateScreenSize = () => {
  const screenWidth = window.innerWidth;
  console.log(screenWidth);
};

window.addEventListener("resize", updateScreenSize);
