import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

export const scrollToMap = () => {
  const swiperMap = new Swiper("#westeros", {
    loop: true,
    pagination: {
      el: "#westerosAreasPagination",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
};
