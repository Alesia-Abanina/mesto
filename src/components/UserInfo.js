export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._nameTitle = document.querySelector(nameSelector);
    this._descriptionSubtitle = document.querySelector(descriptionSelector);
    this._profileImage = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameTitle.textContent,
      about: this._descriptionSubtitle.textContent
    }
  }

  setUserInfo({name, about, _id}) {
    this._nameTitle.textContent = name;
    this._descriptionSubtitle.textContent = about;
  }

  setProfileImage({avatar}) {
    this._profileImage.src = avatar;
  }

  setId({_id}) {
    this._id = _id;
  }

  getId() {
    return this._id;
  }
}
