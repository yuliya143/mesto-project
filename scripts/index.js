const galleryList = document.querySelector('.gallery__list');

const editButton = document.querySelector('.profile__edit-button');
const plusButton = document.querySelector('.profile__button');

const popupEdit = document.querySelector('.popup_type_profile');
const popupPlace = document.querySelector('.popup_type_place');
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
  editButton.addEventListener('click', () => {
    setValuesToFormProfile();
    openPopup(popupEdit);
  });

  plusButton.addEventListener('click', () => openPopup(popupPlace));
}

function setValuesToFormProfile() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function addCloseListenersToPopups() {
  const popups = Array.from(document.querySelectorAll('.popup'));
  popups.forEach((popup) => {
    popup.addEventListener('click', handleClosePopup);
  });
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleClosePopup(event) {
  const popup = event.currentTarget;
  const isPopupCloseButtonClicked = event.target.closest('.popup__close-button');
  const isOverlayClicked = event.target.classList.contains('popup');

  if (isPopupCloseButtonClicked || isOverlayClicked) {
    closePopup(popup);
  }
}

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
  const link = placeElement.querySelector('.place__link');

  link.dataset.title = nameValue;
  link.dataset.src = linkValue;

  title.textContent = nameValue;
  image.setAttribute('src', linkValue);
  image.setAttribute('alt', nameValue);

  addListenersToCard(placeElement);

  return placeElement;
}

function prependCard(placeElement) {
  galleryList.prepend(placeElement);
}

function addListenersToCard(card) {
  const likeButton = card.querySelector('.place__like-button');
  likeButton.addEventListener('click', handleLikeButtonClicked);

  const deleteButton = card.querySelector('.place__delete-button');
  deleteButton.addEventListener('click', handleDeleteButtonClicked);

  const photo = card.querySelector('.place__link');
  photo.addEventListener('click', handlePhotoClicked);
}

function handleLikeButtonClicked(event) {
  const btn = event.currentTarget;
  const likeButtonIcon = btn.querySelector('.place__icon_type_like');

  return likeButtonIcon.classList.toggle('place__icon_active');
}

function handlePhotoClicked(event) {
  event.preventDefault();

  const link = event.currentTarget;
  const src = link.dataset.src;
  const title = link.dataset.title;

  setPhotoData(src, title);
  openPopup(popupPhoto);
}

function handleDeleteButtonClicked(event) {
  const card = event.currentTarget.closest('.place');

  return card.remove();
}

function setPhotoData(src, title) {
  popupPhotoImage.setAttribute('src', src);
  popupPhotoImage.setAttribute('alt', title);
  popupPhotoCaption.textContent = title;
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

  closePopup(popupEdit);

  nameInput.value = '';
  jobInput.value = '';
}

function submitPlaceForm(event) {
  event.preventDefault();

  const place = placeNameInput.value.trim();
  const image = placeImageInput.value.trim();

  if (place && image) {
    const newCard = createCard(place, image);
    prependCard(newCard);
  }

  closePopup(popupPlace);

  placeNameInput.value = '';
  placeImageInput.value = '';
}

addListenersToProfileButtons();
addCloseListenersToPopups();
addListenersToForms();
createInitCards();
