export const cohortId = "wff-cohort-37";
export const apiToken = "adfda0ed-ae85-4099-adcc-43a0cb0f2b1e";
export const BASE_URL = "https://nomoreparties.co/v1";

// Функция для проверки ответа сервера
export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// Получение данных пользователя с сервера
export function getUserInfo() {
    return fetch(`${BASE_URL}/${cohortId}/users/me`, {
      headers: {
        authorization: apiToken,
      },
    }).then(checkResponse);
  }

  // Обновление данных профиля
export function updateProfile(name, about) {
    return fetch(`${BASE_URL}/${cohortId}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: apiToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(checkResponse);
  }

  // Получение всех карточек
export function getCards() {
    return fetch(`${BASE_URL}/${cohortId}/cards`, {
      headers: {
        authorization: apiToken,
      },
    }).then(checkResponse);
  }

  // Добавление новой карточки функция
export function addCard(name, link) {
    return fetch(`${BASE_URL}/${cohortId}/cards`
    , {
      method: "POST",
      headers: {
        authorization: apiToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(checkResponse);
  }

  // Удаление карточки
export function deleteCard(cardId) {
    return fetch(`${BASE_URL}/${cohortId}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: apiToken,
      },
    }).then(checkResponse);
  }

  // Функция для постановки лайка
export function likeCard(cardId) {
    return fetch(`${BASE_URL}/${cohortId}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: {
          authorization: apiToken,
        },
      }
    ).then(checkResponse);
  }

  // Функция для снятия лайка
export function unlikeCard(cardId) {
    return fetch(`${BASE_URL}/${cohortId}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: {
          authorization: apiToken,
        },
      }
    ).then(checkResponse);
  }

  // Получение данных пользователя

export function getUserProfile(cohortId, apiToken) {
    return fetch(`${BASE_URL}/${cohortId}/users/me`, {
      method: "GET",
      headers: {
        authorization: apiToken,
        "Content-Type": "application/json",
      },
    }).then(checkResponse);
  }
  
  export function updateAvatar(cohortId, apiToken, newAvatarUrl) {
    return fetch(`${BASE_URL}/${cohortId}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: apiToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar: newAvatarUrl }),
    }).then(checkResponse);
  }
