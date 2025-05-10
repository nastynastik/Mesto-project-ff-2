// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createCard(cardData, deleteCardCallback, toggleLike, handleImageClick, currentUserId) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const titleElement = cardElement.querySelector(".card__title");
  const imageElement = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const divButton = cardElement.querySelector(".card__like-container");
  const likeButton = divButton.querySelector(".card__like-button");
  const likeCounter = divButton.querySelector(".card__like-counter");


  titleElement.textContent = cardData.name;
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;

  
  cardDeleteButton.addEventListener("click", (event) => {
    event.stopPropagation();
    console.log('Клик по удалению карточки', cardData.cardId);
    deleteCardCallback(cardData.cardId, cardElement);
  });
  
    // Отображаем количество лайков
  likeCounter.textContent = cardData.likes.length;

   // Проставляем активный лайк, если текущий пользователь лайкнул карточку
  if (cardData.likes.some(like => like._id === currentUserId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // Скрываем кнопку удаления, если карточка не создана текущим пользователем
  if (cardData.ownerId !== currentUserId) {
    cardDeleteButton.style.display = "none";
  } else {
    cardDeleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteCardCallback(cardData.cardId, cardElement);
    });
  }


  // Обновляем обработчик лайков
    likeButton.addEventListener("click", () => {
      toggleLike(cardData, likeButton, likeCounter);
    });
    
    
 // Обработчик клика по изображению
  imageElement.addEventListener("click", () => {
  handleImageClick(cardData); // Передаем данные карточки
});
return cardElement;
}

export const deleteCardCallback = (cardElement) => cardElement.remove();

export const toggleLike = (likeButton) => {
  likeButton.classList.toggle("card__like-button_is-active");
};

