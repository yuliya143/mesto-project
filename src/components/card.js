import { handlePhotoClicked } from './modal.js';
import { openPopup } from './utils.js';

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
const popupCardRemove = document.querySelector('.popup_type_confirmation');

let cardForRemoving;

function createInitCards() {
  initialCards.forEach((place) => {
    const card = createCard(place.name, place.link);
    prependCard(card);
  });
}

function createCard(nameValue, linkValue) {
  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  const title = placeElement.querySelector('.place__title');
  const image = placeElement.querySelector('.place__image');

  title.textContent = nameValue;
  image.setAttribute('src', linkValue);
  image.setAttribute('alt', nameValue);

  removeListenerIfImageNotLoad(image);
  addListenersToCard(placeElement);

  return placeElement;
}

function removeListenerIfImageNotLoad(image) {
  image.addEventListener('error', () => image.removeEventListener('click', handlePhotoClicked));
}

function addListenersToCard(card) {
  const likeButton = card.querySelector('.place__like-button');
  const deleteButton = card.querySelector('.place__delete-button');
  const image = card.querySelector('.place__image');

  likeButton.addEventListener('click', handleLikeButtonClicked);
  image.addEventListener('click', handlePhotoClicked);
  deleteButton.addEventListener('click', handleDeleteButtonClicked);
}

function handleDeleteButtonClicked(e) {
  cardForRemoving = e.currentTarget.closest('.place');
  openPopup(popupCardRemove);
}

function prependCard(placeElement) {
  galleryList.prepend(placeElement);
}

function removeCard() {
  cardForRemoving.remove();
  cardForRemoving = null;
}

function handleLikeButtonClicked(event) {
  const btn = event.currentTarget;
  const likeButtonIcon = btn.querySelector('.place__icon_type_like');

  return likeButtonIcon.classList.toggle('place__icon_active');
}

export { createInitCards, createCard, prependCard, removeCard };
