const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible',
};

const isFormValid = (inputList) => {
  return inputList.every((input) => input.validity.valid);
};

const hideInputError = (input) => {
  const error = document.querySelector(`#${input.id}-error`);
  error.textContent = '';
  input.classList.remove(config.inputErrorClass);
};

const showInputError = (input) => {
  const error = document.querySelector(`#${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  error.textContent = input.validationMessage;
};

const checkInputValidity = (input) => {
  if (input.validity.valid) {
    hideInputError(input);
  } else {
    showInputError(input);
  }
};

const togglebuttonState = (submitButton, inputList) => {
  if (isFormValid(inputList)) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
};

const handleFormValidity = (input, submitButton, inputList) => {
  checkInputValidity(input);
  togglebuttonState(submitButton, inputList);
};

const setListenersToForms = (form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const submitButton = form.querySelector(config.submitButtonSelector);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      handleFormValidity(input, submitButton, inputList);
    });
  });

  togglebuttonState(submitButton, inputList);
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((form) => {
    setListenersToForms(form);
  });
};
