import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

export const scrollToHouse = () => {
  const swiper = new Swiper(".houses__swiper", {
    loop: true,
    pagination: {
      el: "#housesPagination",
      type: "fraction",
    },
    navigation: {
      nextEl: "#houseButtonNext",
      prevEl: "#houseButtonPrev",
    },
  });
};
