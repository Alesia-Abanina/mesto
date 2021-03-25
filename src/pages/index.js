
import './index.css';
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  profileEditBtn,
  placeAddBtn,
  profileAvatar,
} from '../utils/constants.js'

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: '0cd98bf9-0cd7-4ef0-a57e-b7dd514aead8',
    'Content-Type': 'application/json'
  }
});

const imagePopup = new PopupWithImage('.image-popup');
let cardsList = null;

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  descriptionSelector: '.profile__subtitle',
  avatarSelector: '.profile__img'
});

const confirmPopup = new PopupWithConfirmation((id, cardElement) => {
  api.deleteCard(id)
    .then((res) => {
      if (res.ok) {
        cardElement.remove();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      confirmPopup.close();
    });
}, '.confirm-popup');

function createCard(data) {
  const card = new Card(data, userInfo.getId(), '#card-template',
    (link, name) => {
      imagePopup.open(link, name);
    },
    (id, cardElement) => {
      confirmPopup.open(id, cardElement);
    },
    (id, isLike, card) => {
      api.likeCard(id, isLike)
          .then((res)=>{
            card.setLikes(res);
          })
          .catch((err) => {
            console.log(err);
          });
    }
  );

  const cardElement = card.generateCard();
  return cardElement;
}

const profilePopup = new PopupWithForm((data) => {
  api.setUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profilePopup.close();
    });
}, '.profile-popup');

const avatarPopup = new PopupWithForm((data) => {
  api.setUserAvatar(data)
    .then((res) => {
      userInfo.setProfileImage(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.close();
    });
}, '.avatar-popup');

const placePopup = new PopupWithForm((data) => {
  api.createCard(data)
    .then((res) => {
      cardsList.prepend(createCard(res));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      placePopup.close();
    });
}, '.place-popup');

// Callbacks
function handleProfileEdit() {
  profilePopup.open(userInfo.getUserInfo());
}

function handlePlaceAdd() {
  placePopup.open();
}

function handleProfileAvatar() {
  avatarPopup.open();
}

// listeners
profileEditBtn.addEventListener('click', handleProfileEdit);
placeAddBtn.addEventListener('click', handlePlaceAdd);
profileAvatar.addEventListener('click', handleProfileAvatar);

// enable form fields validation
const formSelectors = ['.edit-profile', '.add-profile', '.update-avatar'];
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

api.getUserInfo()
  .then((info) => {
    userInfo.setId(info);
    userInfo.setUserInfo(info);
    userInfo.setProfileImage(info);
    return api.getInitialCards();
  })
  .then((initialCards) => {
    cardsList = new Section({
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
