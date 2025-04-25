// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createCard(cardData, deleteCard, toggleLike, handleImageClick) {
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

// Обработчик клика по изображению
  imageElement.addEventListener("click", () => {
  handleImageClick(cardData); // Передаем данные карточки
});
return cardElement;
}

export const deleteCard = (cardElement) => cardElement.remove();

export const toggleLike = (likeButton) => {
  likeButton.classList.toggle("card__like-button_is-active");
};


