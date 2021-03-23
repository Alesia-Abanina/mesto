
import './index.css';
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  profileEditBtn,
  placeAddBtn,
} from '../utils/constants.js'

const imagePopup = new PopupWithImage('.image-popup');

function createCard(data) {
  const card = new Card(data, '#card-template', (link, name) => {
    imagePopup.open(link, name);
  });
  const cardElement = card.generateCard();
  return cardElement;
}
const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  descriptionSelector: '.profile__subtitle'
});

const profilePopup = new PopupWithForm((data) => {
  userInfo.setUserInfo(data);
}, '.profile-popup');

const placePopup = new PopupWithForm((data) => {
  cardsList.prepend(createCard(data));
}, '.place-popup');

// Callbacks
function handleProfileEdit() {
  profilePopup.open(userInfo.getUserInfo());
}

function handlePlaceAdd() {
  placePopup.open();
}

// listeners
profileEditBtn.addEventListener('click', handleProfileEdit);
placeAddBtn.addEventListener('click', handlePlaceAdd);

// enable form fields validation
const formSelectors = ['.edit-profile', '.add-profile'];
formSelectors.forEach((formSelector) => {
  const settings = {
    inputSelector: '.form__item',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_inactive',
    inputErrorClass: 'form__item_type_error',
  }
  const formValidator = new FormValidator(settings, formSelector);
  formValidator.enableValidation();
});

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: '0cd98bf9-0cd7-4ef0-a57e-b7dd514aead8',
    'Content-Type': 'application/json'
  }
});

api.getInitialCards()
.then((initialCards) => {
  const cardsList = new Section({
    items: initialCards,
    renderer: (data) => {
      cardsList.append(createCard(data));
    }
  }, '.elements__list');
  cardsList.renderItems();
})
.catch((err) => {
  console.log(err);
});


