import { hideSpinner } from '../components/utils.js';
import { setInitValuesToProfile } from '../components/modal.js';
import { enableValidation } from '../components/validate.js';
import { getAndCreateInitCards } from '../components/card.js';

import {
  addListenersToProfileButtons,
  addCloseListenersToPopups,
  addListenersToForms,
  addListenerToConfirmButton,
} from '../components/modal.js';

import './index.css';
import { getUserData } from '../components/api.js';

addListenersToProfileButtons();
addCloseListenersToPopups();
addListenersToForms();
addListenerToConfirmButton();

getUserData()
  .then((user) => {
    setInitValuesToProfile(user);

    return getAndCreateInitCards(user._id);
  })
  .then(() => {
    console.log('hide avatar');
    hideSpinner();
  })
  .catch();

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible',
});
