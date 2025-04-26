let openedPopup = null; // Переменная для хранения открытого попапа

// Универсальная функция открытия попапов
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  openedPopup = popup;

 // Добавляем обработчик нажатия клавиши Escape
 document.addEventListener("keydown", handleEscClose);
}

// Универсальная функция закрытия попапов
export function closePopup(popup) {
  if (!popup.classList.contains("popup_is-opened")) return; // Проверяем, открыт ли попап

  popup.classList.remove("popup_is-opened");
  
  // Удаляем обработчик нажатия клавиши Escape
  document.removeEventListener("keydown", handleEscClose);

  // Сбрасываем открытую переменную
  openedPopup = null;
}

// Закрытие по клавише Escape
export function handleEscClose(evt) {
  if (evt.key === "Escape" && openedPopup) {
    closePopup(openedPopup);
  }
}

export function setPopupListeners() {
  // Закрытие попапа по клику на оверлей
  const popups = document.querySelectorAll(".popup");
  
  popups.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
      if (
        evt.target === evt.currentTarget ||
        evt.target.classList.contains("popup__close")
      ) {
        closePopup(popup);
      }
    });
  });
}
