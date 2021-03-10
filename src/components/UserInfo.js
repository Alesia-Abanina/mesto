export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._nameTitle = document.querySelector(nameSelector);
    this._descriptionSubtitle = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      name: this._nameTitle.textContent,
      description: this._descriptionSubtitle.textContent
    }
  }

  setUserInfo({name, description}) {
    this._nameTitle.textContent = name;
    this._descriptionSubtitle.textContent = description;
  }
}
