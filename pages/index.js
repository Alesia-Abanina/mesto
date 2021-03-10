import Card from '../src/components/Card.js'
import FormValidator from '../src/components/FormValidator.js'
import PopupWithForm from '../src/components/PopupWithForm.js';
import PopupWithImage from '../src/components/PopupWithImage.js';
import Section from '../src/components/Section.js';
import UserInfo from '../src/components/UserInfo.js';
import {
  initialCards,
  profileEditBtn,
  placeAddBtn,
} from '../src/utils/constants.js'

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

const cardsList = new Section({
  items: initialCards,
  renderer: (data) => {
    cardsList.append(createCard(data));
  }
}, '.elements__list');

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

cardsList.renderItems();
