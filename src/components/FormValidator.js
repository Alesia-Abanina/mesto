export default class FormValidator {
  _formElement
  _inputList
  _submitButton
  _inactiveButtonClass
  _inputErrorClass

  constructor(settings, formSelector) {
    this._formElement = document.querySelector(formSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(settings.inputSelector));
    this._submitButton = this._formElement.querySelector(settings.submitButtonSelector);
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this._toggleButtonState();

    // when form is shown change btn state and remove validation errors
    this._formElement.addEventListener('show', () => {
      this._toggleButtonState();
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _showInputError(inputElement) {
    inputElement.classList.add(this._inputErrorClass);
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
}
