// refactored
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

const galleryList = document.querySelector('.gallery__list');

const popupPhoto = document.querySelector('.popup_type_photo');
const popupPhotoImage = document.querySelector('.popup__image');
const popupPhotoCaption = document.querySelector('.popup__caption');

const formProfile = document.querySelector('.form_type_profile');
const nameInput = document.querySelector('.form__item_el_full-name');
const jobInput = document.querySelector('.form__item_el_occupation');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__profession');

const formPlace = document.querySelector('.form_type_place');
const placeNameInput = document.querySelector('.form__item_el_new_place');
const placeImageInput = document.querySelector('.form__item_el_link-image');

function addListenersToProfileButtons() {
  const popupsButtons = Array.from(document.querySelectorAll('[data-popup]'));

  popupsButtons.forEach((btn) => {
    btn.addEventListener('click', openPopup);
  });
}

function openPopup(event) {
  event.preventDefault();
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

function createInitCards() {
  initialCards.forEach((place) => {
    const card = createCard(place.name, place.link);
    prependCard(card);
    addListenerToCard(card);
  });
}

function createCard(nameValue, linkValue) {
  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  const title = placeElement.querySelector('.place__title');
  const image = placeElement.querySelector('.place__image');
  const link = placeElement.querySelector('.place__link');

  link.dataset.title = nameValue;
  link.dataset.src = linkValue;

  title.textContent = nameValue;
  image.setAttribute('src', linkValue);
  image.setAttribute('alt', nameValue);

  return placeElement;
}

function prependCard(placeElement) {
  galleryList.prepend(placeElement);
}

function addListenerToCard(card) {
  card.addEventListener('click', (event) => {
    const card = event.currentTarget;
    const isLikeButtonClicked = event.target.closest('.place__like-button');
    const isDeleteButtonClicked = event.target.closest('.place__delete-button');
    const isPhotoClicked = event.target.closest('.place__link');

    if (isLikeButtonClicked) {
      const likeButtonIcon = card.querySelector('.place__icon_type_like');

      return likeButtonIcon.classList.toggle('place__icon_active');
    }

    if (isDeleteButtonClicked) {
      return card.remove();
    }

    if (isPhotoClicked) {
      event.preventDefault();

      const link = card.querySelector('.place__link');
      const src = link.dataset.src;
      const title = link.dataset.title;

      showPopupPhoto(src, title);
    }
  });
}

function showPopupPhoto(src, title) {
  popupPhotoImage.setAttribute('src', src);
  popupPhotoImage.setAttribute('alt', title);
  popupPhotoCaption.textContent = title;

  popupPhoto.classList.add('popup_opened');
}

function addListenersToForms() {
  formProfile.addEventListener('submit', submitProfileForm);
  formPlace.addEventListener('submit', submitPlaceForm);
}

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

function submitPlaceForm(event) {
  event.preventDefault();

  const place = placeNameInput.value.trim();
  const image = placeImageInput.value.trim();

  if (place && image) {
    const newCard = createCard(place, image);
    prependCard(newCard);
    addListenerToCard(newCard);
  }

  event.currentTarget.closest('.popup').classList.remove('popup_opened');

  placeNameInput.value = '';
  placeImageInput.value = '';
}

addListenersToProfileButtons();
addCloseListenersToPopups();
addListenersToForms();
createInitCards();
