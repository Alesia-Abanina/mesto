const showInputError = (settings, formElement, inputElement) => {
  inputElement.classList.add(settings.inputErrorClass);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = inputElement.validationMessage;
}

const hideInputError = (settings, formElement, inputElement) => {
  inputElement.classList.remove(settings.inputErrorClass);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = '';
}

const checkInputValidity = (settings, formElement, inputElement) => {
  if (inputElement.validity.valid) {
    hideInputError(settings, formElement, inputElement);
  } else {
    showInputError(settings, formElement, inputElement);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (settings, formElement, inputList) => {
  const submitButton = formElement.querySelector(settings.submitButtonSelector);
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(settings.inactiveButtonClass);
  } else {
    submitButton.classList.remove(settings.inactiveButtonClass);
  }
}

const setEventListeners = (settings, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  toggleButtonState(settings, formElement, inputList);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(settings, formElement, inputElement);
      toggleButtonState(settings, formElement, inputList);
    });
  });
}

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(settings, formElement);
  });
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'popup__error_visible'
});
