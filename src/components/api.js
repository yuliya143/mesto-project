const setUrl = (url) => `https://nomoreparties.co/v1/plus-cohort-3/${url}`;

const config = {
  headers: {
    authorization: 'd32353b7-29c6-4530-8908-5ae56ac735f5',
    'Content-Type': 'application/json',
  },
};

const checkIfResOk = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(res);
};

const handleError = (err, formError) => {
  if (!err.json) {
    formError.textContent = 'Что-то пошло не так... :( Попробуйте еще раз.';
  } else {
    err.json().then((err) => {
      formError.textContent = err.message;
    });
  }
};

const getInitialCards = () => {
  return fetch(setUrl('cards'), { method: 'GET', ...config }).then(checkIfResOk);
};

const getUserData = () => {
  return fetch(setUrl('users/me'), { method: 'GET', ...config }).then((res) => checkIfResOk(res));
};

const updateUserData = (user) => {
  return fetch(setUrl('users/me'), {
    method: 'PATCH',
    ...config,
    body: JSON.stringify({
      name: user.name,
      about: user.about,
    }),
  }).then(checkIfResOk);
};

const updateUserAvatar = (user) => {
  return fetch(setUrl('users/me/avatar'), {
    method: 'PATCH',
    ...config,
    body: JSON.stringify({
      avatar: user.avatar,
    }),
  }).then(checkIfResOk);
};

const addNewCard = (place) => {
  return fetch(setUrl('cards'), {
    method: 'POST',
    ...config,
    body: JSON.stringify({
      name: place.name,
      link: place.link,
    }),
  }).then(checkIfResOk);
};

const deleteCard = (cardId) => {
  return fetch(setUrl(`cards/${cardId}`), {
    method: 'DELETE',
    ...config,
  }).then(checkIfResOk);
};

const addLike = (cardId) => {
  return fetch(setUrl(`cards/likes/${cardId}`), {
    method: 'PUT',
    ...config,
  }).then(checkIfResOk);
};

const removeLike = (cardId) => {
  return fetch(setUrl(`cards/likes/${cardId}`), {
    method: 'DELETE',
    ...config,
  }).then(checkIfResOk);
};

export {
  handleError,
  getInitialCards,
  getUserData,
  updateUserData,
  updateUserAvatar,
  addNewCard,
  deleteCard,
  addLike,
  removeLike,
};
