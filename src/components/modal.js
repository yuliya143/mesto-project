import { updateUserData, updateUserAvatar, addNewCard, deleteCard } from './api.js';
import { openPopup, closePopup } from './utils.js';
import { createCard, prependCard } from './card.js';

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

function setInitValuesToProfile(user) {
  nameProfile.textContent = user.name;
  jobProfile.textContent = user.about;
  profilePhoto.src = user.avatar;
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
    closePopup(popup);
  }
}

function addListenersToForms() {
  formProfile.addEventListener('submit', submitProfileForm);
  formPlace.addEventListener('submit', submitPlaceForm);
  formAvatar.addEventListener('submit', submitAvatarForm);
}

function submitProfileForm(e) {
  e.preventDefault();

  const setLoading = renderLoading(submitProfileButton);

  setLoading(true);

  const name = nameInput.value.trim();
  const about = jobInput.value.trim();

  updateUserData({
    name,
    about,
  })
    .then(() => {
      nameProfile.textContent = name;
      jobProfile.textContent = about;
      closePopup(popupEdit);
    })
    .catch(console.log)
    .finally(() => {
      setLoading(false);
    });
}

function submitPlaceForm(e) {
  e.preventDefault();

  const setLoading = renderLoading(submitPlaceButton);

  setLoading(true);

  const name = placeNameInput.value.trim();
  const link = placeImageInput.value.trim();

  addNewCard({
    name,
    link,
  })
    .then((place) => {
      const newCard = createCard(place, place.owner._id);
      prependCard(newCard);
      closePopup(popupPlace);
      formPlace.reset();
    })
    .catch(alert)
    .finally(() => {
      setLoading(false);
    });
}

function submitAvatarForm(e) {
  e.preventDefault();

  const setLoading = renderLoading(submitAvatarButton);

  setLoading(true);

  const src = avatarPhotoInput.value;

  updateUserAvatar({ avatar: src })
    .then(() => {
      console.log();
      profilePhoto.setAttribute('src', src);
      closePopup(popupAvatar);
      formAvatar.reset();
    })
    .catch(console.log)
    .finally(() => {
      setLoading(false);
    });
}

function renderLoading(btn) {
  const formButton = btn;
  const text = formButton.textContent;

  return function (isLoading) {
    if (isLoading) {
      formButton.textContent = 'Сохранение...';
    } else {
      formButton.textContent = text;
    }
  };
}

function handleConfirmationClose(e) {
  const id = popupCardRemove.dataset.removeCardId;
  deleteCard(id)
    .then(() => {
      const card = document.getElementById(id);

      card.remove();

      closePopup(popupCardRemove);
    })
    .catch(console.log);
}

function addListenerToConfirmButton() {
  confirmButton.addEventListener('click', handleConfirmationClose);
}

function handlePhotoClicked(e) {
  e.preventDefault();

  const image = e.target;
  const src = image.src;
  const title = image.alt;

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
  setInitValuesToProfile,
};
