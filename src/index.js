import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, toggleLike } from "./components/card.js";
import { openPopup, closePopup, setPopupListeners } from "./components/modal.js";
// Дом узлы 
const placesList = document.querySelector('.places__list'); 
const modal = document.getElementById('myModal'); // Получаем DOM элемент модального окна
const editPopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");
const editButton = document.querySelector(".profile__edit-button");
const formElement = document.querySelector('.popup__form');
const addButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardUrlInput = document.querySelector(".popup__input_type_url");


const profileImage = document.querySelector(".profile__image");

// Вывести карточки на страницу 
initialCards.forEach((initialCard) => { 
const resultCard = createCard(initialCard, deleteCard, toggleLike);
placesList.append(resultCard); 
});


setPopupListeners();

// Обработчик открытия попапа редактирования профиля
editButton.addEventListener("click", function(evt) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(editPopup);
});
// Обработчик для кнопки добавления нового профиля (или другого действия)
addButton.addEventListener('click',() => {
  nameInput.value = "";
  jobInput.value = "";
  openPopup(addCardPopup);
});


// Обработчик сохранения данных профиля
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получаем значение полей jobInput и nameInput из свойства value
  const name = nameInput.value;
  const job = jobInput.value;

  // Вставляем новые значения с помощью textContent
  profileName.textContent = name; // Обновляем элемент с именем
  profileJob.textContent = job; // Обновляем элемент с профессией

  // Здесь можно добавить логику для отправки данных на сервер, если это необходимо.
}

// Прикрепляем обработчик к форме:
formElement.addEventListener('submit', handleFormSubmit);
