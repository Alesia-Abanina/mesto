import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__image-caption');
    super.setEventListeners();
  }

  open(src, title) {
    this._image.setAttribute('src', src);
    this._image.setAttribute('alt', title);
    this._caption.textContent = title;
    super.open();
  }
}
