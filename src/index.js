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
const editProfileForm = document.querySelector('.popup__form_type_edit');
const addButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardUrlInput = document.querySelector(".popup__input_type_url");


const profileImage = document.querySelector(".profile__image");
const addCardForm = addCardPopup.querySelector('.popup__form');
const imagePopup = document.querySelector(".popup_type_image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const popupImage = imagePopup.querySelector(".popup__image");



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
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получаем значение полей jobInput и nameInput из свойства value
  const name = nameInput.value;
  const job = jobInput.value;
  
  // Вставляем новые значения с помощью textContent
  profileName.textContent = name; // Обновляем элемент с именем
  profileJob.textContent = job; // Обновляем элемент с профессией

  closePopup(editPopup);
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


