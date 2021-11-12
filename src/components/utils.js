function hideSpinner() {
  const spinner = document.querySelector('.spinner');

  spinner.classList.remove('spinner_active');
}

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
  if (e.code === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

export { openPopup, closePopup, hideSpinner };
