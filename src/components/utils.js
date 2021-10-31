import { handleClosePopupAndResetForm } from './modal.js';

function openPopup(popup) {
  popup.classList.add('popup_opened');
  addKeyListenerToDocument();
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removeKeyListenerFromDocument();
}

function addKeyListenerToDocument() {
  document.addEventListener('keydown', handleKeyClosePopup);
}

function removeKeyListenerFromDocument() {
  document.removeEventListener('keydown', handleKeyClosePopup);
}

function handleKeyClosePopup(e) {
  const popups = Array.from(document.querySelectorAll('.popup'));

  popups.forEach((popup) => {
    if (e.code === 'Escape') {
      handleClosePopupAndResetForm(popup);
    }
  });
}

export { openPopup, closePopup };
