export const initializeCharacterSlider = () => {
  const characterList = document.querySelectorAll(".character");
  const prevButton = document.querySelector("#character-arrow-left");
  const nextButton = document.querySelector("#character-arrow-right");
  let currentIndex = 2;
  let totalItems = characterList.length;

  if (!characterList || !prevButton || !nextButton) {
    console.error("Required elements not found!");
    return;
  }

  /**
   * Atualiza a classe "character-active" para o item atualmente em exibição.
   * @param {number} index - Índice do item ativo.
   */
  const highlightCurrentItem = (i) => {
    characterList.forEach((item, index) => {
      item.classList.toggle("character-active", index === i);
    });
  };

  /**
   * Faz scroll suave para o item com base no índice fornecido.
   * @param {number} index - Índice do item para scroll.
   */
  const scrollToItem = (index) => {
    characterList[index].scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });

    highlightCurrentItem(index);
  };

  /**
   * Trata os cliques nas setas, atualizando o índice atual e ajustando o carrossel.
   * @param {Event} event - Evento de clique ou toque.
   * @param {string} direction - Direção do movimento ("next" ou "prev").
   */
  const handleArrowClick = (event, direction) => {
    if (event.type === "touchstart") event.preventDefault();

    if (direction === "next") {
      currentIndex++;
      if (currentIndex > totalItems - 1) currentIndex = 0;
    } else if (direction === "prev") {
      currentIndex--;
      if (currentIndex < 0) currentIndex = totalItems - 1;
    }

    console.log(currentIndex);
    scrollToItem(currentIndex);
  };

  // Inicializa o carrossel exibindo o item no índice atual
  scrollToItem(currentIndex);

  ["click", "touchstart"].forEach((eventType) => {
    prevButton.addEventListener(eventType, (event) => {
      handleArrowClick(event, "prev");
    });

    nextButton.addEventListener(eventType, (event) => {
      handleArrowClick(event, "next");
    });
  });

  /**
   * Faz scroll automaticamente para o item ativo quando a tela é redimensionada.
   */
  const scrollToActiveCharacterOnResize = () => {
    const activeItem = document.querySelector(".character-active");
    if (activeItem) {
      activeItem.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  };

  // Redimensiona a tela e ajusta para o item ativo
  window.addEventListener("resize", scrollToActiveCharacterOnResize);
};
