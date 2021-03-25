import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(submiter, popupSelector) {
    super(popupSelector);
    this._submiter = submiter;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__item');
    this._submitBtn = this._form.querySelector('.form__submit');
    this._submitBtnText = this._submitBtn.innerText;

    this._handleSubmit = this._handleSubmit.bind(this);
    this.setEventListeners();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmit);
  }

  open(data) {
    this._submitBtn.innerText = this._submitBtnText;
    if (data) {
      this._inputList.forEach(input => {
        input.value = data[input.name];
      });
    }
    this._form.dispatchEvent(new Event('show')); // send an event to trigger toggleButtonState() logic

    super.open();
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._submitBtn.innerText = 'Сохранение...';
    this._submiter(this._getInputValues());
  }
}
