function addListenersToOpenPopupButtons() {
  const popupsButtons = Array.from(document.querySelectorAll('[data-popup]'));
  popupsButtons.forEach((btn) => {
    btn.addEventListener('click', openPopup);
  });
}

function openPopup(event) {
  const popupType = event.currentTarget.dataset.popup;
  const popup = document.querySelector(`.popup_type_${popupType}`);
  popup.classList.add('popup_opened');
}

function addCloseListenersToPopups() {
  const popups = Array.from(document.querySelectorAll('.popup'));
  popups.forEach((popup) => {
    popup.addEventListener('click', closePopup);
  });
}

function closePopup(event) {
  const popup = event.currentTarget;
  const isPopupCloseButtonClicked = event.target.closest('.popup__close-button');
  const isOverlayClicked = event.target.classList.contains('popup');

  if (isPopupCloseButtonClicked || isOverlayClicked) {
    popup.classList.remove('popup_opened');
  }
}

addListenersToOpenPopupButtons();
addCloseListenersToPopups();

const formProfile = document.querySelector('.form_type_profile');
const nameInput = document.querySelector('.form__item_el_full-name');
const jobInput = document.querySelector('.form__item_el_occupation');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__profession');

formProfile.addEventListener('submit', submitProfileForm);

function submitProfileForm(event) {
  event.preventDefault();

  const nameText = nameInput.value.trim();
  const jobText = jobInput.value.trim();

  if (nameText && jobText) {
    nameProfile.textContent = nameText;
    jobProfile.textContent = jobText;
  }

  event.currentTarget.closest('.popup').classList.remove('popup_opened');
}

const formPlace = document.querySelector('.form_type_place');
const placeName = document.querySelector('.form__item_el_new_place');
const placeImage = document.querySelector('.form__item_el_link-image');

formPlace.addEventListener('submit', submitPlaceForm);

function submitPlaceForm(event) {
  event.preventDefault();

  const place = placeName.value.trim();
  const image = placeImage.value.trim();

  if (place && image) {
    const newCard = createCard(place, image);
    appendCard(newCard);
  }

  event.currentTarget.closest('.popup').classList.remove('popup_opened');
  placeName.value = '';
  placeImage.value = '';
}

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

function appendCard(placeElement) {
  const galleryList = document.querySelector('.gallery__list');
  galleryList.append(placeElement);
}

function createCard(nameValue, linkValue) {
  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  const title = placeElement.querySelector('.place__title');
  const image = placeElement.querySelector('.place__image');

  title.textContent = nameValue;
  image.setAttribute('src', linkValue);
  image.setAttribute('alt', nameValue);

  return placeElement;
}

initialCards.forEach((place) => {
  const initialCard = createCard(place.name, place.link);
  appendCard(initialCard);
});

// likeButtons.forEach(function (btn) {
//   btn.addEventListener('click', (evt) => {
//     evt.currentTarget.firstElementChild.classList.toggle('place__icon_active');
//   });
// });
