const profilePopup = initPopup('.profile-popup');
const placePopup = initPopup('.place-popup');
const imagePopup = initPopup('.image-popup');

const profileForm = profilePopup.querySelector('.form');
const nameInput = profileForm.querySelector('.form__item_el_name');
const descriptionInput = profileForm.querySelector('.form__item_el_description');

const profileEditBtn = document.querySelector('.profile__edit');
const nameTitle = document.querySelector('.profile__title');
const descriptionSubtitle = document.querySelector('.profile__subtitle');

// Cards initialization
const cardsList = document.querySelector('.elements__list');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cards = initialCards.map((element)  => {
  return createCard(element.name, element.link);
});

cardsList.append(...cards);

// functions
function createCard(nameValue, linkValue) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.element__title').textContent = nameValue;
  cardElement.querySelector('.element__img').src = linkValue;

  cardElement.querySelector('.element__like').addEventListener('click', handleCardLike);
  cardElement.querySelector('.element__delete').addEventListener('click', handleCardDelete);

  return cardElement;
}

function initPopup(className) {
  const popup = document.querySelector(className);
  const closeBtn = popup.querySelector('.popup__close-btn');
  closeBtn.addEventListener('click', handlePopupClose);

  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      handlePopupClose(evt);
    }
  });
  return popup;
}

// Callbacks
function handleCardDelete(evt) {
  evt.target.closest('.element').remove();
};

function handleCardLike(evt) {
  evt.target.classList.toggle('element__like_active');
};

function handlePopupClose(evt) {
  const popup = evt.target.closest('.popup');
  popup.classList.remove('popup_display_active');
}

function handleProfileEdit() {
  nameInput.value = nameTitle.textContent;
  descriptionInput.value = descriptionSubtitle.textContent;
  profilePopup.classList.add('popup_display_active');
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  descriptionSubtitle.textContent = descriptionInput.value;
  handlePopupClose(evt);
}

// listeners
profileEditBtn.addEventListener('click', handleProfileEdit);
profileForm.addEventListener('submit', handleProfileSubmit);

