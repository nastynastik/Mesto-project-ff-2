import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, toggleLike } from "./components/card.js";
import { openPopup, closePopup, setPopupListeners } from "./components/modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import { getUserInfo, getCards, updateProfile, addCard, checkResponse, cohortId, apiToken, likeCard, unlikeCard, getUserProfile, updateAvatar, deleteCard as apiDeleteCard } from "./api.js";

// Дом узлы 
const placesList = document.querySelector('.places__list'); 
const modal = document.getElementById('myModal'); // Получаем DOM элемент модального окна
const editPopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");
const editButton = document.querySelector(".profile__edit-button");
const editProfileForm = document.querySelector('.popup_form_type_edit-form');
const addButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardUrlInput = document.querySelector(".popup__input_type_url");


const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarOpenButton = document.querySelector(".profile__image");
const avatarCloseButton = avatarPopup.querySelector(".popup__close");
const avatarForm = document.querySelector('form[name="avatar-form"]');
const avatarSubmitButton = avatarForm.querySelector(".popup__button");



const profileImage = document.querySelector(".profile__image");
const addCardForm = addCardPopup.querySelector('.popup__form_type_new-card');
const imagePopup = document.querySelector(".popup_type_image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const popupImage = imagePopup.querySelector(".popup__image");

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};


// Функция для отображения индикатора загрузки
function renderLoading(isLoading, buttonElement, initialText) {
  if (isLoading) {
    buttonElement.textContent = 'Сохранение...';
    buttonElement.disabled = true;
  } else {
    buttonElement.textContent = initialText;
    buttonElement.disabled = false;
  }
}

// Открытие попапа
avatarOpenButton.addEventListener("click", () => {
  openPopup(avatarPopup);
  avatarSubmitButton.disabled = true;
  avatarSubmitButton.classList.add(config.inactiveButtonClass);
});

// Закрытие попапа
avatarCloseButton.addEventListener("click", () => {
  closePopup(avatarPopup);
  avatarForm.reset();
  avatarSubmitButton.disabled = true;
  avatarSubmitButton.classList.add(config.inactiveButtonClass);
});


// Обработчик открытия попапа редактирования профиля
editButton.addEventListener("click", function(evt) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  clearValidation(editProfileForm, config);
  openPopup(editPopup);
});
// Обработчик для кнопки добавления нового профиля (или другого действия)
addButton.addEventListener('click', () => {
  cardNameInput.value = ""; // Очищаем поля карточки
  cardUrlInput.value = "";
  clearValidation(addCardForm, config);
  openPopup(addCardPopup);
});

Promise.all([getUserInfo(), getCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileImage.style.backgroundImage = `url('${userData.avatar}')`;

    // Очищаем контейнер перед добавлением новых карточек
    placesList.innerHTML = '';

     // Добавляем карточки с сервера
     cards.forEach(card => {
      const cardElement = createCard({
          name: card.name,
          link: card.link,
          likes: card.likes,
          ownerId: card.owner._id,
          cardId: card._id
      }, handleDeleteCard, handleLikeClick, handleImageClick, userData._id); // Передаем currentUserId
      placesList.append(cardElement);
  });
})
.catch(err => console.error('Ошибка загрузки данных:', err));


// Обработчик сохранения данных профиля
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  const saveButton = evt.submitter;

  renderLoading(true, saveButton, "Сохранение...");

  updateProfile(nameInput.value, jobInput.value) // ваша функция API, возвращающая Promise
    .then((updatedUserData) => {
      profileName.textContent = updatedUserData.name;
      profileJob.textContent = updatedUserData.about;
      closePopup(editPopup);
    })
    .catch((err) => {
      console.error(`Ошибка обновления профиля: ${err}`);
    })
    .finally(() => {
      renderLoading(false, saveButton, "Сохранить");
    });
}

function handleDeleteCard(cardId, cardElement) {
  console.log('Удаляем карточку с id:', cardId);
  apiDeleteCard(cardId)
    .then(() => {
      cardElement.remove();
      console.log('Карточка удалена из DOM');
    })
    .catch(err => {
      console.error('Ошибка удаления карточки:', err);
    });
}

// Добавляем обработчик события отправки формы
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);


// Обработчик сохранения новой карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартное поведение формы

  const saveButton = evt.submitter;
  renderLoading(true, saveButton, "Сохранение...");

  // Получаем значения из полей ввода
  const cardData = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
    likes: []
  };

  addCard(cardNameInput.value, cardUrlInput.value)
  .then((newCardData) => {
    // Создаём карточку с данными с сервера
    const cardElement = createCard({
      name: newCardData.name,
      link: newCardData.link,
      likes: newCardData.likes,
      ownerId: newCardData.owner._id,
      cardId: newCardData._id
    }, handleDeleteCard, handleLikeClick, handleImageClick);

    placesList.prepend(cardElement);
    closePopup(addCardPopup);
    addCardForm.reset();
    clearValidation(addCardForm, config);
  })
  .catch((err) => {
    console.error("Ошибка добавления карточки:", err);
  })
  .finally(() => {
    renderLoading(false, saveButton, "Создать");
  });

  // Закрываем попап после добавления карточки
  closePopup(addCardPopup);
  
  // Очищаем поля ввода после добавления
  cardNameInput.value = "";
  cardUrlInput.value = "";
}
// Добавляем обработчик события отправки формы для новой карточки

addCardForm.addEventListener('submit', handleAddCardFormSubmit);

// Обработчик клика по изображению
function handleImageClick(cardData) {
  // Устанавливаем источник и alt текст изображения
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;

  // Устанавливаем подпись
  popupCaption.textContent = cardData.name;
  
  // Открываем попап
  openPopup(imagePopup);
}

function handleLikeClick(cardData, likeButton, likeCounter) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const apiMethod = isLiked ? unlikeCard : likeCard;
  
  apiMethod(cardData.cardId)
    .then(updatedCard => {
      likeCounter.textContent = updatedCard.likes.length;
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch(err => console.error('Ошибка лайка:', err));
}

//Валидация формы
enableValidation(config, renderLoading);
setPopupListeners();

// Проверка валидности URL перед отправкой
avatarForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const avatarInput = avatarForm.querySelector(".popup__input_type_avatar");
  const newAvatarUrl = avatarInput.value;

  renderLoading(true, avatarSubmitButton, "Сохранение...");

  updateAvatar(cohortId, apiToken, newAvatarUrl)
    .then((data) => {
      profileImage.style.backgroundImage = `url('${newAvatarUrl}')`;
      closePopup(avatarPopup);
    })
    .catch((err) => {
      console.error(`Ошибка при смене аватара: ${err}`);
      const errorElement = document.querySelector(".avatar-error");
      errorElement.textContent = "Не удалось сменить аватар. Попробуйте снова.";
    })
    .finally(() => {
      renderLoading(false, avatarSubmitButton, "Сохранить");
    });
});
