const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');

function openPopup() {
  popup.classList.add('popup_opened');
}
editButton.addEventListener('click', openPopup);

const closeButton = document.querySelector('.popup__close-button');
function closePopup() {
  popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', closePopup);

const form = document.querySelector('.form');
const nameInput = document.querySelector('.form__item_el_full-name');
const jobInput = document.querySelector('.form__item_el_occupation');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__profession');

form.addEventListener('submit', submitForm);

function submitForm(evt) {
  evt.preventDefault();

  const nameText = nameInput.value.trim();
  const jobText = jobInput.value.trim();

  if (nameText && jobText) {
    nameProfile.textContent = nameText;
    jobProfile.textContent = jobText;
  }

  closePopup();
}
