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
  const openedPopup = document.querySelector('.popup_opened');

  if (e.code === 'Escape') {
    closePopup(openedPopup);
  }
}

export { openPopup, closePopup };
