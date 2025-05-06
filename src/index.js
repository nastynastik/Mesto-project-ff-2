import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, toggleLike } from "./components/card.js";
import { openPopup, closePopup, setPopupListeners } from "./components/modal.js";
import { enableValidation, clearValidation, showInputError, hideInputError, checkInputValidity, toggleButtonState, setEventListeners } from "./validation.js";
import { getUserInfo, getCards, updateProfile, addCard, checkResponse, cohortId, apiToken, likeCard, unlikeCard, getUserProfile, updateAvatar } from "./api.js";

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
const avatarSubmitButton = document.querySelector('.popup__button_type_avatar');



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
  toggleButtonState(
    [cardNameInput, cardUrlInput], // Исправьте на поля карточки
    addCardForm.querySelector(config.submitButtonSelector), 
    config
  );
  openPopup(addCardPopup);
});

let userId;

Promise.all([getUserInfo(), getCards()]).then(([userData, cards]) => {
  profileName.textContent = userData.name;
  profileJob.textContent = userData.about;
  profileImage.style.backgroundImage = `url('${userData.avatar}')`;
  if (!Array.isArray(cards)) {
    console.error("cards не является массивом");
    return;
  }
 
}); 


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


// Добавляем обработчик события отправки формы
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

  

// Обработчик сохранения новой карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартное поведение формы

  // Получаем значения из полей ввода
  const cardData = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
  };
  // Создаем новую карточку и добавляем её в список
  const newCard = createCard(cardData, deleteCard, toggleLike, handleImageClick);
  placesList.prepend(newCard); // Добавляем новую карточку в начало списка

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


// Вывести карточки на страницу 
initialCards.forEach((initialCard) => { 
  const resultCard = createCard(initialCard, deleteCard, toggleLike, handleImageClick);
  placesList.append(resultCard); 
  });

  setPopupListeners(); 
//Валидация формы
enableValidation(config, renderLoading);



