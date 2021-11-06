import { getInitialCards, addLike, removeLike } from './api.js';
import { handlePhotoClicked } from './modal.js';
import { openPopup } from './utils.js';

const galleryList = document.querySelector('.gallery__list');
const popupCardRemove = document.querySelector('.popup_type_confirmation');

function getAndCreateInitCards(userId) {
  return getInitialCards().then((initialCards) => {
    initialCards.reverse().forEach((place) => {
      const card = createCard(place, userId);
      prependCard(card);
    });
  });
}

function createCard(place, userId) {
  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  const title = placeElement.querySelector('.place__title');
  const image = placeElement.querySelector('.place__image');
  const likes = placeElement.querySelector('.place__likes');
  const icon = placeElement.querySelector('.place__icon_type_like');
  const deleteButton = placeElement.querySelector('.place__delete-button');

  title.textContent = place.name;
  likes.textContent = place.likes.length || '';

  const isLiked = place.likes.some((user) => user._id === userId);

  if (isLiked) {
    icon.classList.add('place__icon_active');
  }

  placeElement.id = place._id;
  image.setAttribute('src', place.link);
  image.setAttribute('alt', place.name);

  if (userId !== place.owner._id) {
    deleteButton.remove();
  }

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

  if (deleteButton) {
    deleteButton.addEventListener('click', handleDeleteButtonClicked);
  }
}

function handleDeleteButtonClicked(e) {
  const id = e.currentTarget.closest('.place').id;

  popupCardRemove.dataset.removeCardId = id;

  openPopup(popupCardRemove);
}

function prependCard(placeElement) {
  galleryList.prepend(placeElement);
}

function handleLikeButtonClicked(e) {
  const btn = e.currentTarget;
  const likeButtonIcon = btn.querySelector('.place__icon_type_like');
  const card = e.currentTarget.closest('.place');
  const id = card.id;
  const like = card.querySelector('.place__likes');

  if (!likeButtonIcon.classList.contains('place__icon_active')) {
    addLike(id)
      .then((place) => {
        like.textContent = place.likes.length || '';
        likeButtonIcon.classList.add('place__icon_active');
      })
      .catch(console.log);
  } else {
    removeLike(id)
      .then((place) => {
        like.textContent = place.likes.length || '';
        likeButtonIcon.classList.remove('place__icon_active');
      })
      .catch(console.log);
  }
}

export { getAndCreateInitCards, createCard, prependCard };
