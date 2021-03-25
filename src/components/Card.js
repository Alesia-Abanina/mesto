export default class Card {
  constructor(data, selfId, cardSelector, handleCardClick, handleCardDelete, handleCardLike) {
    this._id = data._id;
    this._selfId = selfId;
    this._name = data.name;
    this._link = data.link;
    this._canDelete = data.owner._id === selfId;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
  }

  generateCard() {
    this._element = this._getTemplate();

    const image = this._element.querySelector('.element__img');
    image.setAttribute('src', this._link);
    image.setAttribute('alt', this._name);
    this._element.querySelector('.element__title').textContent = this._name;

    this._deleteBtn = this._element.querySelector('.element__delete');
    if (!this._canDelete) {
      this._deleteBtn.remove();
    }

    this._likeNumber = this._element.querySelector('.element__like-number');
    this._likeBtn = this._element.querySelector('.element__like');
    this._updateLikes();

    this._setEventListeners();

    return this._element;
  }

  setLikes({likes}) {
    this._likes = likes;
    this._updateLikes();
  }

  _updateLikes() {
    this._likeNumber.textContent = this._likes.length;
    this._isLiked = this._likes.some((item) => item._id === this._selfId);
    if (this._isLiked) {
      this._likeBtn.classList.add('element__like_active');
    } else {
      this._likeBtn.classList.remove('element__like_active');
    }
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    const image = this._element.querySelector('.element__img');

    this._likeBtn.addEventListener('click', () => {
      this._handleCardLike(this._id, !this._isLiked, this);
    });

    this._deleteBtn?.addEventListener('click', () => {
      this._handleCardDelete(this._id, this._element);
    });

    image.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }
}
