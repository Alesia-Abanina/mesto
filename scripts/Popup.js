export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeBtn = this._popup.querySelector('.popup__close-btn');
  }

  open() {
    this._popup.classList.add('popup_display_active');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_display_active');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._closeBtn.addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('click', this._handleOverlayClick.bind(this));
  }

  _handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}
