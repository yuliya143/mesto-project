const isFormValid = (inputList) => {
  return inputList.every((input) => input.validity.valid);
};

const hideInputError = (input, config) => {
  const error = document.querySelector(`#${input.id}-error`);
  error.textContent = '';
  input.classList.remove(config.inputErrorClass);
};

const showInputError = (input, config) => {
  const error = document.querySelector(`#${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  error.textContent = input.validationMessage;
};

const checkInputValidity = (input, config) => {
  if (input.validity.valid) {
    hideInputError(input, config);
  } else {
    showInputError(input, config);
  }
};

const toggleButtonState = (submitButton, inputList) => {
  if (isFormValid(inputList)) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
};

const handleFormValidity = (input, submitButton, inputList, config) => {
  checkInputValidity(input, config);
  toggleButtonState(submitButton, inputList);
};

const setListenersToForms = (form, config) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const submitButton = form.querySelector(config.submitButtonSelector);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      handleFormValidity(input, submitButton, inputList, config);
    });
  });

  form.addEventListener('reset', () => {
    inputList.forEach((input) => {
      hideInputError(input, config);

      input.value = '';
    });

    toggleButtonState(submitButton, inputList);
  });

  toggleButtonState(submitButton, inputList);
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((form) => {
    setListenersToForms(form, config);
  });
};

export { enableValidation };
