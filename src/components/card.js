import { handlePhotoClicked } from './modal.js';
import { openPopup } from './utils.js';

const galleryList = document.querySelector('.gallery__list');
const popupCardRemove = document.querySelector('.popup_type_confirmation');

let cardForRemoving;

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

  removeListenerIfImageNotLoad(link, linkValue);
  addListenersToCard(placeElement);

  return placeElement;
}

function removeListenerIfImageNotLoad(link, linkValue) {
  const photo = new Image();
  photo.addEventListener('error', () => link.removeEventListener('click', handlePhotoClicked));
  photo.src = linkValue;
}

function addListenersToCard(card) {
  const likeButton = card.querySelector('.place__like-button');
  const deleteButton = card.querySelector('.place__delete-button');
  const photo = card.querySelector('.place__link');

  likeButton.addEventListener('click', handleLikeButtonClicked);
  photo.addEventListener('click', handlePhotoClicked);
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

export { createCard, prependCard, removeCard };
