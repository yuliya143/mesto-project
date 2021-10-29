import { enableValidation } from '../src/components/validate.js';

import { createCard, prependCard } from '../src/components/card.js';

import {
  addListenersToProfileButtons,
  addCloseListenersToPopups,
  addKeyListenerToDocument,
  addListenersToForms,
  addListenerToConfirmButton,
} from '../src/components/modal.js';

const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible',
};

function createInitCards() {
  initialCards.forEach((place) => {
    const card = createCard(place.name, place.link);
    prependCard(card);
  });
}

addListenersToProfileButtons();
addCloseListenersToPopups();
addKeyListenerToDocument();
addListenersToForms();
addListenerToConfirmButton();

createInitCards();

enableValidation(config);
