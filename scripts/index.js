let popup = document.querySelector('.popup');
let closeBtn = popup.querySelector('.popup__close-btn');

let form = popup.querySelector('.form');
let nameInput = form.querySelector('.form__item_el_name');
let descriptionInput = form.querySelector('.form__item_el_description');

let profileEditBtn = document.querySelector('.profile__edit');
let nameTitle = document.querySelector('.profile__title');
let descriptionSubtitle = document.querySelector('.profile__subtitle');


// functions
function openPopup() {
  nameInput.value = nameTitle.textContent;
  descriptionInput.value = descriptionSubtitle.textContent;
  popup.classList.add('popup_display_active');
}

function closePopup() {
  popup.classList.remove('popup_display_active');
}

function updateProfile(event) {
  event.preventDefault();
  nameTitle.textContent = nameInput.value;
  descriptionSubtitle.textContent = descriptionInput.value;
  closePopup();
}

// listeners
profileEditBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);

popup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    closePopup();
  }
});

form.addEventListener('submit', updateProfile);
