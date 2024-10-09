import { createElement } from "../util/domCreateElement.js";
import { characters } from "../data/characters.js";

const generateCharacterElement = (character, index) => {
  const characterList = document.querySelector(".characters__list");

  if (!characterList) {
    console.error("Wrapper element not found!");
    return;
  }

  const characterCard = createElement({
    elementName: "li",
    classes: "characater__card",
  });

  characterCard.dataset.characterCode = character.code;
  characterList.appendChild(characterCard);

  const characterImageDiv = createElement({
    elementName: "div",
    classes: "character__image",
  });

  characterCard.appendChild(characterImageDiv);

  const characterImageTag = createElement({
    elementName: "img",
    classes: "",
  });

  Object.assign(characterImageTag, {
    src: character.urlImage,
    alt: character.alt,
    height: "1722",
    width: "1500",
    draggable: false,
  });

  characterImageDiv.appendChild(characterImageTag);
};

export const renderCharacterElements = () => {
  characters.forEach((character, index) =>
    generateCharacterElement(character, index)
  );
};
