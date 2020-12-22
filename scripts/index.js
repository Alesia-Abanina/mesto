let togglePopup = () => {
  formOverlay.classList.toggle('form_display_active');
}

let formOverlay = document.querySelector('.form');
formOverlay.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    togglePopup();
  }
});

let nameInput = formOverlay.querySelector('#name');
let descriptionInput = formOverlay.querySelector('#description');
let nameTitle = document.querySelector('.profile__title');
let descriptionSubtitle = document.querySelector('.profile__subtitle');

let profileEditBtn = document.querySelector('.profile__edit');
profileEditBtn.addEventListener('click', () => {
  nameInput.value = nameTitle.textContent;
  descriptionInput.value = descriptionSubtitle.textContent;
  togglePopup();
});

let closeBtn = formOverlay.querySelector('.form__close-btn');
closeBtn.addEventListener('click', togglePopup);

let formPopup = document.querySelector('.form__popup');
formPopup.addEventListener('submit', (event) => {
  event.preventDefault();
  nameTitle.textContent = nameInput.value;
  descriptionSubtitle.textContent = descriptionInput.value;
  togglePopup();
});

let likeButtons = document.querySelectorAll('.element__like');
for (let i = 0; i < likeButtons.length; i++) {
  likeButtons[i].addEventListener('click', (event) => {
    event.target.classList.toggle('element__like_type_active');
  });
}
