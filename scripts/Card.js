export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const image = this._element.querySelector('.element__img');
    image.setAttribute('src', this._link);
    image.setAttribute('alt', this._name);
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._likeBtn = this._element.querySelector('.element__like');
    const deleteBtn = this._element.querySelector('.element__delete');
    const image = this._element.querySelector('.element__img');

    this._likeBtn.addEventListener('click', () => {
      this._handleCardLike();
    });
    deleteBtn.addEventListener('click', () => {
      this._handleCardDelete();
    });

    image.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  _handleCardDelete() {
    this._element.remove();
  }

  _handleCardLike() {
    this._likeBtn.classList.toggle('element__like_active');
  }
}
