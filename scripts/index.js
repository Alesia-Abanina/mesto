let activePopup = null; // active opened popup

function openPopup(popup) {
  popup.classList.add('popup_display_active');
  activePopup = popup;
  document.addEventListener('keydown', handleKeydown);
}

function closePopup() {
  if (activePopup) {
    activePopup.classList.remove('popup_display_active');
    activePopup = null;
    document.removeEventListener('keydown', handleKeydown);
  }
}

function initPopup(className) {
  const popup = document.querySelector(className);
  const closeBtn = popup.querySelector('.popup__close-btn');
  closeBtn.addEventListener('click', handlePopupClose);

  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup();
    }
  });
  return popup;
}

const profilePopup = initPopup('.profile-popup');
const profileForm = profilePopup.querySelector('.form');
const profileNameInput = profileForm.querySelector('.form__item_el_name');
const profileDescriptionInput = profileForm.querySelector('.form__item_el_description');

const profileEditBtn = document.querySelector('.profile__edit');
const nameTitle = document.querySelector('.profile__title');
const descriptionSubtitle = document.querySelector('.profile__subtitle');

const placePopup = initPopup('.place-popup');
const placeForm = placePopup.querySelector('.form');
const placeNameInput = placeForm.querySelector('.form__item_el_name');
const placeLinkInput = placeForm.querySelector('.form__item_el_link');

const placeAddBtn = document.querySelector('.profile__add');

const picturePopup = initPopup('.image-popup');
const pictureImg = picturePopup.querySelector('.popup__image');
const pictureCaption = picturePopup.querySelector('.popup__image-caption');

// Cards initialization
const cardTemplate = document.querySelector('#card-template').content;
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

// Callbacks
function handleCardDelete(evt) {
  evt.target.closest('.element').remove();
};

function handleCardLike(evt) {
  evt.target.classList.toggle('element__like_active');
};

function handleKeydown(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

function handlePopupClose(evt) {
  closePopup();
}

function handleProfileEdit() {
  profileNameInput.value = nameTitle.textContent;
  profileDescriptionInput.value = descriptionSubtitle.textContent;
  profileForm.dispatchEvent(new Event('show')); // send an event to trigger toggleButtonState() logic
  openPopup(profilePopup);
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  nameTitle.textContent = profileNameInput.value;
  descriptionSubtitle.textContent = profileDescriptionInput.value;
  handlePopupClose(evt);
}

function hadlePlaceAdd() {
  placeNameInput.value = '';
  placeLinkInput.value = '';
  placeForm.dispatchEvent(new Event('show')); // send an event to trigger toggleButtonState() logic
  openPopup(placePopup);
}

function handlePlaceSubmit(evt) {
  evt.preventDefault();
  if (placeNameInput.value !== '' && placeLinkInput.value !== '') {
    const card = createCard(placeNameInput.value, placeLinkInput.value);
    cardsList.prepend(card);
    handlePopupClose(evt);
  }
}

function handleImageOpen(nameValue, linkValue) {
  pictureImg.setAttribute('src', linkValue);
  pictureImg.setAttribute('alt', nameValue);

  pictureCaption.textContent = nameValue

  openPopup(picturePopup);
}

// functions
function createCard(nameValue, linkValue) {
  const cardElement = cardTemplate.cloneNode(true);
  const image = cardElement.querySelector('.element__img');
  const title = cardElement.querySelector('.element__title');
  const likeBtn = cardElement.querySelector('.element__like');
  const deleteBtn = cardElement.querySelector('.element__delete');

  title.textContent = nameValue;
  image.setAttribute('src', linkValue);

  likeBtn.addEventListener('click', handleCardLike);
  deleteBtn.addEventListener('click', handleCardDelete);
  image.addEventListener('click', () => {
    handleImageOpen(nameValue, linkValue)
  });

  return cardElement;
}

// listeners
profileEditBtn.addEventListener('click', handleProfileEdit);
profileForm.addEventListener('submit', handleProfileSubmit);

placeAddBtn.addEventListener('click', hadlePlaceAdd);
placeForm.addEventListener('submit', handlePlaceSubmit);

//------------
const cards = initialCards.map((element) => {
  return createCard(element.name, element.link);
});

cardsList.append(...cards);
