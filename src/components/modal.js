import { openPopup, closePopup } from './utils.js';
import { removeCard, createCard, prependCard } from './card.js';

const editButton = document.querySelector('.profile__edit-button');
const plusButton = document.querySelector('.profile__button');
const avatarButton = document.querySelector('.profile__avatar-button');
const confirmButton = document.querySelector('.popup__button');

const popupEdit = document.querySelector('.popup_type_profile');
const popupPlace = document.querySelector('.popup_type_place');
const popupAvatar = document.querySelector('.popup_type_avatar');
const popupCardRemove = document.querySelector('.popup_type_confirmation');

const formProfile = document.querySelector('.form_type_profile');
const nameInput = document.querySelector('.form__input_el_full-name');
const jobInput = document.querySelector('.form__input_el_occupation');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__profession');
const submitProfileButton = formProfile.querySelector('.form__button');

const formPlace = document.querySelector('.form_type_place');
const placeNameInput = document.querySelector('.form__input_el_new-place');
const placeImageInput = document.querySelector('.form__input_el_link-image');
const submitPlaceButton = formPlace.querySelector('.form__button');

const formAvatar = document.querySelector('.form_type_avatar');
const avatarPhotoInput = document.querySelector('.form__input_el_avatar');
const profilePhoto = document.querySelector('.profile__photo');
const submitAvatarButton = formAvatar.querySelector('.form__button');

const popupPhoto = document.querySelector('.popup_type_photo');
const popupPhotoImage = document.querySelector('.popup__image');
const popupPhotoCaption = document.querySelector('.popup__caption');

function addListenersToProfileButtons() {
  editButton.addEventListener('click', () => {
    setValuesToFormProfile();
    openPopup(popupEdit);
  });

  plusButton.addEventListener('click', () => openPopup(popupPlace));

  avatarButton.addEventListener('click', () => openPopup(popupAvatar));
}

function setValuesToFormProfile() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  submitProfileButton.disabled = false;
}

function addCloseListenersToPopups() {
  const popups = Array.from(document.querySelectorAll('.popup'));
  popups.forEach((popup) => {
    popup.addEventListener('click', handleClosePopup);
  });
}

function handleClosePopup(e) {
  const popup = e.currentTarget;
  const isPopupCloseButtonClicked = e.target.closest('.popup__close-button');
  const isOverlayClicked = e.target.classList.contains('popup');

  if (isPopupCloseButtonClicked || isOverlayClicked) {
    handleClosePopupAndResetForm(popup);
  }
}

function handleClosePopupAndResetForm(popup) {
  const form = popup.querySelector('.form');

  closePopup(popup);

  if (form) {
    form.reset();
  }
}

function addListenersToForms() {
  formProfile.addEventListener('submit', submitProfileForm);
  formPlace.addEventListener('submit', submitPlaceForm);
  formAvatar.addEventListener('submit', submitAvatarForm);
}

function submitProfileForm(e) {
  e.preventDefault();

  const nameText = nameInput.value.trim();
  const jobText = jobInput.value.trim();

  if (nameText && jobText) {
    nameProfile.textContent = nameText;
    jobProfile.textContent = jobText;
  }

  handleClosePopupAndResetForm(popupEdit);
}

function submitPlaceForm(event) {
  event.preventDefault();

  const place = placeNameInput.value.trim();
  const image = placeImageInput.value.trim();

  if (place && image) {
    const newCard = createCard(place, image);
    prependCard(newCard);
  }

  handleClosePopupAndResetForm(popupPlace);
}

function submitAvatarForm(e) {
  e.preventDefault();

  const src = avatarPhotoInput.value;

  profilePhoto.setAttribute('src', src);

  handleClosePopupAndResetForm(popupAvatar);
}

function handleConfirmationClose() {
  removeCard();
  closePopup(popupCardRemove);
}

function addListenerToConfirmButton() {
  confirmButton.addEventListener('click', handleConfirmationClose);
}

function handlePhotoClicked(e) {
  e.preventDefault();

  const link = e.currentTarget;
  const src = link.dataset.src;
  const title = link.dataset.title;

  setPhotoData(src, title);
  openPopup(popupPhoto);
}

function setPhotoData(src, title) {
  popupPhotoImage.setAttribute('src', src);
  popupPhotoImage.setAttribute('alt', title);
  popupPhotoCaption.textContent = title;
}

export {
  addListenersToProfileButtons,
  addCloseListenersToPopups,
  addListenersToForms,
  addListenerToConfirmButton,
  handlePhotoClicked,
  handleClosePopupAndResetForm,
};
