import { enableValidation } from '../components/validate.js';

import { createInitCards } from '../components/card.js';

import {
  addListenersToProfileButtons,
  addCloseListenersToPopups,
  addListenersToForms,
  addListenerToConfirmButton,
} from '../components/modal.js';

import './index.css';

addListenersToProfileButtons();
addCloseListenersToPopups();
addListenersToForms();
addListenerToConfirmButton();

createInitCards();

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible',
});
