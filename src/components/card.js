import { handleImageClick } from "/src/index.js";
import { openPopup, closePopup } from "./modal.js";
const placesList = document.querySelector(".places__list");
// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createCard(cardData, deleteCard, toggleLike, modalOpenPopup) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const titleElement = cardElement.querySelector(".card__title");
  const imageElement = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const divButton = cardElement.querySelector(".card__like-container");
  const likeButton = divButton.querySelector(".card__like-button");

  titleElement.textContent = cardData.name;
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;

  cardDeleteButton.addEventListener("click", () => deleteCard(cardElement));

  likeButton.addEventListener("click", () => toggleLike(likeButton));

  imageElement.addEventListener("click", () => {
    handleImageClick(cardData);
    modalOpenPopup(imageElement); // Открываем попап при клике на изображение
  });

  return cardElement;
}
export function openCardPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");

  // Добавляем обработчик события для закрытия попапа
  popupElement.addEventListener("click", (event) => {
    if (
      event.target === popupElement ||
      event.target.classList.contains("popup__close")
    ) {
      closePopup(popupElement);
    }
  });
}

export function closeCardPopup(popupElement) {
  if (popupElement) {
    // Проверяем, что popupElement определен
    popupElement.classList.remove("popup_is-opened");
  } else {
    console.error("Popup element is undefined!");
  }
}

export const deleteCard = (cardElement) => cardElement.remove();

export const toggleLike = (likeButton) => {
  likeButton.classList.toggle("card__like-button_is-active");
};

