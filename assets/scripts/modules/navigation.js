import { toggleModalAndButtonClasses } from "./toggleClasses.js";

export const smoothScrollTo = () => {
  const links = document.querySelectorAll(".navbar__menu a");
  const modal = document.querySelector("#navbarMenuModal");
  const navbarOpenButton = document.querySelector("#navbarOpenButton");

  if (!links || !modal || !navbarOpenButton) return;

  const handleCloseModal = (event) => {
    if (event?.type === "touchstart") event.preventDefault();

    toggleModalAndButtonClasses(navbarOpenButton, modal);

    const id = event.target.href.split("#")[1];
    const section = document.querySelector(`#${id}`);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error(`Seção com ID ${id} não encontrada.`);
    }
  };

  links.forEach((link) => {
    ["click", "touchstart"].forEach((eventType) => {
      link.addEventListener(eventType, handleCloseModal);
    });
  });
};
