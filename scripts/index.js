const togglePopup = (event) => {
  event.target.classList.toggle('form_display_active');
}

const formOverlay = document.querySelector('.form');
formOverlay.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    togglePopup();
  }
});

const profileEditBtn = document.querySelector('.profile__edit');
profileEditBtn.addEventListener('click', togglePopup);

const closeBtn = formOverlay.querySelector('.form__close-btn');
closeBtn.addEventListener('click', togglePopup);

const nameInput = formOverlay.querySelector('#name');
const descriptionInput = formOverlay.querySelector('#description');
const nameTitle = document.querySelector('.profile__title');
const descriptionSubtitle = document.querySelector('.profile__subtitle');
nameInput.value = nameTitle.textContent;
descriptionInput.value = descriptionSubtitle.textContent;

const formPopup = document.querySelector('.form__popup');
formPopup.addEventListener('submit', (event) => {
  event.preventDefault();
  nameTitle.textContent = nameInput.value;
  descriptionSubtitle.textContent = descriptionInput.value;
  togglePopup();
});

const likeButtons = document.querySelectorAll('.element__like');
for (let i = 0; i < likeButtons.length; i++){
  likeButtons[i].addEventListener('click', (event) => {
    event.target.classList.toggle('element__like_type_active');
  });
}
