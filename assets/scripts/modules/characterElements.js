import { createElement } from "../util/domCreateElement.js";
import { characters } from "../data/characters.js";

const generateCharacterElement = (character, index) => {
  const characterList = document.querySelector(".characters__list");

  if (!characterList) {
    console.error("Wrapper element not found!");
    return;
  }

  const li = createElement({
    elementName: "li",
    classes: "character",
  });

  characterList.appendChild(li);

  //if (index === 2) li.classList.add("active");

  const characterImageDiv = createElement({
    elementName: "div",
    classes: "character__image",
  });

  li.appendChild(characterImageDiv);

  const characterImageTag = createElement({
    elementName: "img",
    classes: "",
  });

  Object.assign(characterImageTag, {
    src: character.urlImage,
    alt: character.alt,
    height: "1722",
    width: "1500",
  });

  characterImageDiv.appendChild(characterImageTag);

  const characterNameDiv = createElement({
    elementName: "div",
    classes: "character__name",
  });

  li.appendChild(characterNameDiv);

  const nameTitle = createElement({
    elementName: "h3",
    classes: "",
  });

  nameTitle.textContent = character.nameCharacters;
  characterNameDiv.appendChild(nameTitle);
};

export const renderCharacterElements = () => {
  characters.forEach((character, index) =>
    generateCharacterElement(character, index)
  );
};
