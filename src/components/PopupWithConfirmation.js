import PopupWithForm from './PopupWithForm.js';

export default class PopupWithConfirmation extends PopupWithForm {
  open(id, context) {
    this._id = id;
    this._context = context;
    super.open();
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._submiter(this._id, this._context);
  }
}
