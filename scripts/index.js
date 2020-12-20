const formOverlay = document.querySelector('.form');
formOverlay.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    formOverlay.classList.remove('form_display_active');
  }
});

const profileEditBtn = document.querySelector('.profile__edit');
profileEditBtn.addEventListener('click', () => {
  nameInput.value = nameTitle.textContent;
  descriptionInput.value = descriptionSubtitle.textContent;
  formOverlay.classList.add('form_display_active');
});

const closeBtn = formOverlay.querySelector('.form__close-btn');
closeBtn.addEventListener('click', () => {
  formOverlay.classList.remove('form_display_active');
});

const nameInput = formOverlay.querySelector('#name');
const descriptionInput = formOverlay.querySelector('#description');
const nameTitle = document.querySelector('.profile__title');
const descriptionSubtitle = document.querySelector('.profile__subtitle');
console.log(nameTitle.textContent);

const formElement = document.querySelector('.form');
formElement.addEventListener('submit', (event) => {
  event.preventDefault();
  nameTitle.textContent = nameInput.value;
  descriptionSubtitle.textContent = descriptionInput.value;
  formOverlay.classList.remove('form_display_active');
});

