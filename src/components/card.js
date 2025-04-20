const placesList = document.querySelector(".places__list");
// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createCard(cardData, deleteCard) {
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

  imageElement.addEventListener("click", () => handleImageClick(cardData));

  return cardElement;
}
export function openPopup(popupElement) {
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

export function closePopup(popupElement) {
  popupElement.classList.remove("popup_is-opened");
}

export function handleImageClick(cardData) {
  console.log("Image clicked:", cardData);
  const imagePopup = document.querySelector(".popup_type_image");
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__caption");

  // Устанавливаем источник и alt текст изображения
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;

  // Устанавливаем подпись
  popupCaption.textContent = cardData.name;

  // Открываем попап
  openPopup(imagePopup);
}
export const deleteCard = (cardElement) => cardElement.remove();

export const toggleLike = (likeButton) => {
  likeButton.classList.toggle("card__like-button_is-active");
};
