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

function createCard(place) {
  const str = `<li class="place">
  <img
    src="${place.link}"
    alt="${place.name}"
    class="place__image"
  />
  <div class="place__content">
    <h2 class="place__title">${place.name}</h2>
    <button type="button" class="place__like-button button">
      <svg class="place__icon" fill="currentColor">
        <use xlink:href="#heart" />
      </svg>
    </button>
  </div>
</li>`;
  return str;
}

let places = '';
for (let i = 0; i < initialCards.length; i++) {
  places += createCard(initialCards[i]);
}
console.log(places);

const list = document.querySelector('.gallery__list');
list.innerHTML = places;

const likeButton = document.querySelectorAll('.place__like-button');

for (let i = 0; i < likeButton.length; i++) {
  likeButton[i].addEventListener('click', (evt) => {
    console.log(evt);
    evt.currentTarget.firstElementChild.classList.toggle('place__icon_active');
  });
}
