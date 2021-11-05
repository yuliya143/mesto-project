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

  return Promise.reject(`Ошибка: ${res.status}`);
};

const getInitialCards = () => {
  return fetch(setUrl('cards'), { method: 'GET', ...config }).then(checkIfResOk);
};

const getUserData = () => {
  return fetch(setUrl('users/me'), { method: 'GET', ...config }).then((res) => checkIfResOk(res));
};

const updateUserData = (user) => {
  console.log(user);
  return fetch(setUrl('users/me'), {
    method: 'PATCH',
    ...config,
    body: JSON.stringify({
      name: user.name,
      about: user.about,
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

export { getInitialCards, getUserData, updateUserData, addNewCard };
