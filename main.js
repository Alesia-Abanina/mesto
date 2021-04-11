/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Api.js":
/*!*******************************!*\
  !*** ./src/components/Api.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Api)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Api = /*#__PURE__*/function () {
  function Api(options) {
    _classCallCheck(this, Api);

    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _createClass(Api, [{
    key: "getInitialCards",
    value: function getInitialCards() {
      var _this = this;

      return fetch("".concat(this._baseUrl, "/cards"), {
        headers: this._headers
      }).then(function (res) {
        return _this._processResponse(res);
      });
    }
  }, {
    key: "getUserInfo",
    value: function getUserInfo() {
      var _this2 = this;

      return fetch("".concat(this._baseUrl, "/users/me"), {
        headers: this._headers
      }).then(function (res) {
        return _this2._processResponse(res);
      });
    }
  }, {
    key: "setUserInfo",
    value: function setUserInfo(_ref) {
      var _this3 = this;

      var name = _ref.name,
          about = _ref.about;
      return fetch("".concat(this._baseUrl, "/users/me"), {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
      }).then(function (res) {
        return _this3._processResponse(res);
      });
    }
  }, {
    key: "setUserAvatar",
    value: function setUserAvatar(_ref2) {
      var _this4 = this;

      var avatar = _ref2.avatar;
      return fetch("".concat(this._baseUrl, "/users/me/avatar"), {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatar
        })
      }).then(function (res) {
        return _this4._processResponse(res);
      });
    }
  }, {
    key: "createCard",
    value: function createCard(_ref3) {
      var _this5 = this;

      var name = _ref3.name,
          link = _ref3.link;
      return fetch("".concat(this._baseUrl, "/cards"), {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link
        })
      }).then(function (res) {
        return _this5._processResponse(res);
      });
    }
  }, {
    key: "deleteCard",
    value: function deleteCard(id) {
      var _this6 = this;

      return fetch("".concat(this._baseUrl, "/cards/").concat(id), {
        method: 'DELETE',
        headers: this._headers
      }).then(function (res) {
        return _this6._processResponse(res);
      });
    }
  }, {
    key: "likeCard",
    value: function likeCard(id, isLike) {
      var _this7 = this;

      var method = isLike ? 'PUT' : 'DELETE';
      return fetch("".concat(this._baseUrl, "/cards/likes/").concat(id), {
        method: method,
        headers: this._headers
      }).then(function (res) {
        return _this7._processResponse(res);
      });
    }
  }, {
    key: "_processResponse",
    value: function _processResponse(res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
    }
  }]);

  return Api;
}();



/***/ }),

/***/ "./src/components/Card.js":
/*!********************************!*\
  !*** ./src/components/Card.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Card)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Card = /*#__PURE__*/function () {
  function Card(data, selfId, cardSelector, handleCardClick, handleCardDelete, handleCardLike) {
    _classCallCheck(this, Card);

    this._id = data._id;
    this._selfId = selfId;
    this._name = data.name;
    this._link = data.link;
    this._canDelete = data.owner._id === selfId;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
  }

  _createClass(Card, [{
    key: "generateCard",
    value: function generateCard() {
      this._element = this._getTemplate();

      var image = this._element.querySelector('.element__img');

      image.setAttribute('src', this._link);
      image.setAttribute('alt', this._name);
      this._element.querySelector('.element__title').textContent = this._name;
      this._deleteBtn = this._element.querySelector('.element__delete');

      if (!this._canDelete) {
        this._deleteBtn.remove();
      }

      this._likeNumber = this._element.querySelector('.element__like-number');
      this._likeBtn = this._element.querySelector('.element__like');

      this._updateLikes();

      this._setEventListeners();

      return this._element;
    }
  }, {
    key: "setLikes",
    value: function setLikes(_ref) {
      var likes = _ref.likes;
      this._likes = likes;

      this._updateLikes();
    }
  }, {
    key: "_updateLikes",
    value: function _updateLikes() {
      var _this = this;

      this._likeNumber.textContent = this._likes.length;
      this._isLiked = this._likes.some(function (item) {
        return item._id === _this._selfId;
      });

      if (this._isLiked) {
        this._likeBtn.classList.add('element__like_active');
      } else {
        this._likeBtn.classList.remove('element__like_active');
      }
    }
  }, {
    key: "_getTemplate",
    value: function _getTemplate() {
      var cardTemplate = document.querySelector(this._cardSelector).content;
      var cardElement = cardTemplate.querySelector('.element').cloneNode(true);
      return cardElement;
    }
  }, {
    key: "_setEventListeners",
    value: function _setEventListeners() {
      var _this2 = this,
          _this$_deleteBtn;

      var image = this._element.querySelector('.element__img');

      this._likeBtn.addEventListener('click', function () {
        _this2._handleCardLike(_this2._id, !_this2._isLiked, _this2);
      });

      (_this$_deleteBtn = this._deleteBtn) === null || _this$_deleteBtn === void 0 ? void 0 : _this$_deleteBtn.addEventListener('click', function () {
        _this2._handleCardDelete(_this2._id, _this2._element);
      });
      image.addEventListener('click', function () {
        _this2._handleCardClick(_this2._link, _this2._name);
      });
    }
  }]);

  return Card;
}();



/***/ }),

/***/ "./src/components/FormValidator.js":
/*!*****************************************!*\
  !*** ./src/components/FormValidator.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormValidator)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FormValidator = /*#__PURE__*/function () {
  function FormValidator(settings, formSelector) {
    _classCallCheck(this, FormValidator);

    this._formElement = document.querySelector(formSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(settings.inputSelector));
    this._submitButton = this._formElement.querySelector(settings.submitButtonSelector);
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
  }

  _createClass(FormValidator, [{
    key: "enableValidation",
    value: function enableValidation() {
      this._setEventListeners();
    }
  }, {
    key: "_setEventListeners",
    value: function _setEventListeners() {
      var _this = this;

      this._toggleButtonState(); // when form is shown change btn state and remove validation errors


      this._formElement.addEventListener('show', function () {
        _this._toggleButtonState();

        _this._inputList.forEach(function (inputElement) {
          _this._hideInputError(inputElement);
        });
      });

      this._inputList.forEach(function (inputElement) {
        inputElement.addEventListener('input', function () {
          _this._checkInputValidity(inputElement);

          _this._toggleButtonState();
        });
      });
    }
  }, {
    key: "_toggleButtonState",
    value: function _toggleButtonState() {
      if (this._hasInvalidInput()) {
        this._submitButton.classList.add(this._inactiveButtonClass);

        this._submitButton.disabled = true;
      } else {
        this._submitButton.classList.remove(this._inactiveButtonClass);

        this._submitButton.disabled = false;
      }
    }
  }, {
    key: "_showInputError",
    value: function _showInputError(inputElement) {
      inputElement.classList.add(this._inputErrorClass);

      var errorElement = this._formElement.querySelector(".".concat(inputElement.id, "-error"));

      errorElement.textContent = inputElement.validationMessage;
    }
  }, {
    key: "_hideInputError",
    value: function _hideInputError(inputElement) {
      inputElement.classList.remove(this._inputErrorClass);

      var errorElement = this._formElement.querySelector(".".concat(inputElement.id, "-error"));

      errorElement.textContent = '';
    }
  }, {
    key: "_checkInputValidity",
    value: function _checkInputValidity(inputElement) {
      if (inputElement.validity.valid) {
        this._hideInputError(inputElement);
      } else {
        this._showInputError(inputElement);
      }
    }
  }, {
    key: "_hasInvalidInput",
    value: function _hasInvalidInput() {
      return this._inputList.some(function (inputElement) {
        return !inputElement.validity.valid;
      });
    }
  }]);

  return FormValidator;
}();



/***/ }),

/***/ "./src/components/Popup.js":
/*!*********************************!*\
  !*** ./src/components/Popup.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Popup)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Popup = /*#__PURE__*/function () {
  function Popup(popupSelector) {
    _classCallCheck(this, Popup);

    this._popup = document.querySelector(popupSelector);
    this._closeBtn = this._popup.querySelector('.popup__close-btn');
    this.close = this.close.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
  }

  _createClass(Popup, [{
    key: "open",
    value: function open() {
      this._popup.classList.add('popup_display_active');

      document.addEventListener('keydown', this._handleEscClose);
    }
  }, {
    key: "close",
    value: function close() {
      this._popup.classList.remove('popup_display_active');

      document.removeEventListener('keydown', this._handleEscClose);
    }
  }, {
    key: "setEventListeners",
    value: function setEventListeners() {
      this._closeBtn.addEventListener('click', this.close);

      this._popup.addEventListener('click', this._handleOverlayClick);
    }
  }, {
    key: "_handleOverlayClick",
    value: function _handleOverlayClick(evt) {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    }
  }, {
    key: "_handleEscClose",
    value: function _handleEscClose(evt) {
      if (evt.key === 'Escape') {
        this.close();
      }
    }
  }]);

  return Popup;
}();



/***/ }),

/***/ "./src/components/PopupWithConfirmation.js":
/*!*************************************************!*\
  !*** ./src/components/PopupWithConfirmation.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PopupWithConfirmation)
/* harmony export */ });
/* harmony import */ var _PopupWithForm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PopupWithForm.js */ "./src/components/PopupWithForm.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var PopupWithConfirmation = /*#__PURE__*/function (_PopupWithForm) {
  _inherits(PopupWithConfirmation, _PopupWithForm);

  var _super = _createSuper(PopupWithConfirmation);

  function PopupWithConfirmation() {
    _classCallCheck(this, PopupWithConfirmation);

    return _super.apply(this, arguments);
  }

  _createClass(PopupWithConfirmation, [{
    key: "open",
    value: function open(id, context) {
      this._id = id;
      this._context = context;

      _get(_getPrototypeOf(PopupWithConfirmation.prototype), "open", this).call(this);
    }
  }, {
    key: "_handleSubmit",
    value: function _handleSubmit(evt) {
      evt.preventDefault();

      this._submiter(this._id, this._context);
    }
  }]);

  return PopupWithConfirmation;
}(_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_0__.default);



/***/ }),

/***/ "./src/components/PopupWithForm.js":
/*!*****************************************!*\
  !*** ./src/components/PopupWithForm.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PopupWithForm)
/* harmony export */ });
/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ "./src/components/Popup.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var PopupWithForm = /*#__PURE__*/function (_Popup) {
  _inherits(PopupWithForm, _Popup);

  var _super = _createSuper(PopupWithForm);

  function PopupWithForm(submiter, popupSelector) {
    var _this;

    _classCallCheck(this, PopupWithForm);

    _this = _super.call(this, popupSelector);
    _this._submiter = submiter;
    _this._form = _this._popup.querySelector('.form');
    _this._inputList = _this._form.querySelectorAll('.form__item');
    _this._submitBtn = _this._form.querySelector('.form__submit');
    _this._submitBtnText = _this._submitBtn.innerHTML;
    _this._handleSubmit = _this._handleSubmit.bind(_assertThisInitialized(_this));

    _this.setEventListeners();

    return _this;
  }

  _createClass(PopupWithForm, [{
    key: "setEventListeners",
    value: function setEventListeners() {
      _get(_getPrototypeOf(PopupWithForm.prototype), "setEventListeners", this).call(this);

      this._form.addEventListener('submit', this._handleSubmit);
    }
  }, {
    key: "open",
    value: function open(data) {
      this._submitBtn.innerHTML = this._submitBtnText;

      if (data) {
        this._inputList.forEach(function (input) {
          input.value = data[input.name];
        });
      }

      this._form.dispatchEvent(new Event('show')); // send an event to trigger toggleButtonState() logic


      _get(_getPrototypeOf(PopupWithForm.prototype), "open", this).call(this);
    }
  }, {
    key: "close",
    value: function close() {
      _get(_getPrototypeOf(PopupWithForm.prototype), "close", this).call(this);

      this._form.reset();
    }
  }, {
    key: "_getInputValues",
    value: function _getInputValues() {
      var formValues = {};

      this._inputList.forEach(function (input) {
        formValues[input.name] = input.value;
      });

      return formValues;
    }
  }, {
    key: "_handleSubmit",
    value: function _handleSubmit(evt) {
      evt.preventDefault();
      this._submitBtn.innerText = 'Сохранение...';

      this._submiter(this._getInputValues());
    }
  }]);

  return PopupWithForm;
}(_Popup_js__WEBPACK_IMPORTED_MODULE_0__.default);



/***/ }),

/***/ "./src/components/PopupWithImage.js":
/*!******************************************!*\
  !*** ./src/components/PopupWithImage.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PopupWithImage)
/* harmony export */ });
/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ "./src/components/Popup.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var PopupWithImage = /*#__PURE__*/function (_Popup) {
  _inherits(PopupWithImage, _Popup);

  var _super = _createSuper(PopupWithImage);

  function PopupWithImage(popupSelector) {
    var _thisSuper, _this;

    _classCallCheck(this, PopupWithImage);

    _this = _super.call(this, popupSelector);
    _this._image = _this._popup.querySelector('.popup__image');
    _this._caption = _this._popup.querySelector('.popup__image-caption');

    _get((_thisSuper = _assertThisInitialized(_this), _getPrototypeOf(PopupWithImage.prototype)), "setEventListeners", _thisSuper).call(_thisSuper);

    return _this;
  }

  _createClass(PopupWithImage, [{
    key: "open",
    value: function open(src, title) {
      this._image.setAttribute('src', src);

      this._image.setAttribute('alt', title);

      this._caption.textContent = title;

      _get(_getPrototypeOf(PopupWithImage.prototype), "open", this).call(this);
    }
  }]);

  return PopupWithImage;
}(_Popup_js__WEBPACK_IMPORTED_MODULE_0__.default);



/***/ }),

/***/ "./src/components/Section.js":
/*!***********************************!*\
  !*** ./src/components/Section.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Section)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Section = /*#__PURE__*/function () {
  function Section(_ref, containerSelector) {
    var items = _ref.items,
        renderer = _ref.renderer;

    _classCallCheck(this, Section);

    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  _createClass(Section, [{
    key: "append",
    value: function append(element) {
      this._container.append(element);
    }
  }, {
    key: "prepend",
    value: function prepend(element) {
      this._container.prepend(element);
    }
  }, {
    key: "renderItems",
    value: function renderItems() {
      var _this = this;

      this._renderedItems.forEach(function (item) {
        _this._renderer(item);
      });
    }
  }]);

  return Section;
}();



/***/ }),

/***/ "./src/components/UserInfo.js":
/*!************************************!*\
  !*** ./src/components/UserInfo.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserInfo)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserInfo = /*#__PURE__*/function () {
  function UserInfo(_ref) {
    var nameSelector = _ref.nameSelector,
        descriptionSelector = _ref.descriptionSelector,
        avatarSelector = _ref.avatarSelector;

    _classCallCheck(this, UserInfo);

    this._nameTitle = document.querySelector(nameSelector);
    this._descriptionSubtitle = document.querySelector(descriptionSelector);
    this._profileImage = document.querySelector(avatarSelector);
  }

  _createClass(UserInfo, [{
    key: "getUserInfo",
    value: function getUserInfo() {
      return {
        name: this._nameTitle.textContent,
        about: this._descriptionSubtitle.textContent
      };
    }
  }, {
    key: "setUserInfo",
    value: function setUserInfo(_ref2) {
      var name = _ref2.name,
          about = _ref2.about,
          _id = _ref2._id;
      this._nameTitle.textContent = name;
      this._descriptionSubtitle.textContent = about;
    }
  }, {
    key: "setProfileImage",
    value: function setProfileImage(_ref3) {
      var avatar = _ref3.avatar;
      this._profileImage.src = avatar;
    }
  }, {
    key: "setId",
    value: function setId(_ref4) {
      var _id = _ref4._id;
      this._id = _id;
    }
  }, {
    key: "getId",
    value: function getId() {
      return this._id;
    }
  }]);

  return UserInfo;
}();



/***/ }),

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "profileEditBtn": () => (/* binding */ profileEditBtn),
/* harmony export */   "placeAddBtn": () => (/* binding */ placeAddBtn),
/* harmony export */   "profileAvatar": () => (/* binding */ profileAvatar)
/* harmony export */ });
var profileEditBtn = document.querySelector('.profile__edit');
var placeAddBtn = document.querySelector('.profile__add');
var profileAvatar = document.querySelector('.profile__avatar');

/***/ }),

/***/ "./src/pages/index.css":
/*!*****************************!*\
  !*** ./src/pages/index.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ "./src/pages/index.css");
/* harmony import */ var _components_Card_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Card.js */ "./src/components/Card.js");
/* harmony import */ var _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/FormValidator.js */ "./src/components/FormValidator.js");
/* harmony import */ var _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/PopupWithForm.js */ "./src/components/PopupWithForm.js");
/* harmony import */ var _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/PopupWithImage.js */ "./src/components/PopupWithImage.js");
/* harmony import */ var _components_PopupWithConfirmation_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/PopupWithConfirmation.js */ "./src/components/PopupWithConfirmation.js");
/* harmony import */ var _components_Section_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Section.js */ "./src/components/Section.js");
/* harmony import */ var _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/UserInfo.js */ "./src/components/UserInfo.js");
/* harmony import */ var _components_Api_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Api.js */ "./src/components/Api.js");
/* harmony import */ var _utils_constants_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/constants.js */ "./src/utils/constants.js");










var api = new _components_Api_js__WEBPACK_IMPORTED_MODULE_8__.default({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: '0cd98bf9-0cd7-4ef0-a57e-b7dd514aead8',
    'Content-Type': 'application/json'
  }
});
var imagePopup = new _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_4__.default('.image-popup');
var cardsList = null;
var userInfo = new _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_7__.default({
  nameSelector: '.profile__title',
  descriptionSelector: '.profile__subtitle',
  avatarSelector: '.profile__img'
});
var confirmPopup = new _components_PopupWithConfirmation_js__WEBPACK_IMPORTED_MODULE_5__.default(function (id, cardElement) {
  api.deleteCard(id).then(function () {
    cardElement.remove();
    confirmPopup.close();
  }).catch(function (err) {
    console.log(err);
  });
}, '.confirm-popup');

function createCard(data) {
  var card = new _components_Card_js__WEBPACK_IMPORTED_MODULE_1__.default(data, userInfo.getId(), '#card-template', function (link, name) {
    imagePopup.open(link, name);
  }, function (id, cardElement) {
    confirmPopup.open(id, cardElement);
  }, function (id, isLike, card) {
    api.likeCard(id, isLike).then(function (res) {
      card.setLikes(res);
    }).catch(function (err) {
      console.log(err);
    });
  });
  var cardElement = card.generateCard();
  return cardElement;
}

var profilePopup = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_3__.default(function (data) {
  api.setUserInfo(data).then(function (res) {
    userInfo.setUserInfo(res);
    profilePopup.close();
  }).catch(function (err) {
    console.log(err);
  });
}, '.profile-popup');
var avatarPopup = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_3__.default(function (data) {
  api.setUserAvatar(data).then(function (res) {
    userInfo.setProfileImage(res);
    avatarPopup.close();
  }).catch(function (err) {
    console.log(err);
  });
}, '.avatar-popup');
var placePopup = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_3__.default(function (data) {
  api.createCard(data).then(function (res) {
    cardsList.prepend(createCard(res));
    placePopup.close();
  }).catch(function (err) {
    console.log(err);
  });
}, '.place-popup'); // Callbacks

function handleProfileEdit() {
  profilePopup.open(userInfo.getUserInfo());
}

function handlePlaceAdd() {
  placePopup.open();
}

function handleProfileAvatar() {
  avatarPopup.open();
} // listeners


_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.profileEditBtn.addEventListener('click', handleProfileEdit);
_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.placeAddBtn.addEventListener('click', handlePlaceAdd);
_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.profileAvatar.addEventListener('click', handleProfileAvatar); // enable form fields validation

var formSelectors = ['.edit-profile', '.add-profile', '.update-avatar'];
formSelectors.forEach(function (formSelector) {
  var settings = {
    inputSelector: '.form__item',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_inactive',
    inputErrorClass: 'form__item_type_error'
  };
  var formValidator = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__.default(settings, formSelector);
  formValidator.enableValidation();
});
api.getUserInfo().then(function (info) {
  userInfo.setId(info);
  userInfo.setUserInfo(info);
  userInfo.setProfileImage(info);
  return api.getInitialCards();
}).then(function (initialCards) {
  cardsList = new _components_Section_js__WEBPACK_IMPORTED_MODULE_6__.default({
    items: initialCards,
    renderer: function renderer(data) {
      cardsList.append(createCard(data));
    }
  }, '.elements__list');
  cardsList.renderItems();
}).catch(function (err) {
  console.log(err);
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXN0by8uL3NyYy9jb21wb25lbnRzL0FwaS5qcyIsIndlYnBhY2s6Ly9tZXN0by8uL3NyYy9jb21wb25lbnRzL0NhcmQuanMiLCJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzIiwid2VicGFjazovL21lc3RvLy4vc3JjL2NvbXBvbmVudHMvUG9wdXAuanMiLCJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhDb25maXJtYXRpb24uanMiLCJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzIiwid2VicGFjazovL21lc3RvLy4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanMiLCJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvY29tcG9uZW50cy9TZWN0aW9uLmpzIiwid2VicGFjazovL21lc3RvLy4vc3JjL2NvbXBvbmVudHMvVXNlckluZm8uanMiLCJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvdXRpbHMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL21lc3RvLy4vc3JjL3BhZ2VzL2luZGV4LmNzcyIsIndlYnBhY2s6Ly9tZXN0by93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tZXN0by93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWVzdG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tZXN0by93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21lc3RvLy4vc3JjL3BhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIkFwaSIsIm9wdGlvbnMiLCJfYmFzZVVybCIsImJhc2VVcmwiLCJfaGVhZGVycyIsImhlYWRlcnMiLCJmZXRjaCIsInRoZW4iLCJyZXMiLCJfcHJvY2Vzc1Jlc3BvbnNlIiwibmFtZSIsImFib3V0IiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJhdmF0YXIiLCJsaW5rIiwiaWQiLCJpc0xpa2UiLCJvayIsImpzb24iLCJQcm9taXNlIiwicmVqZWN0Iiwic3RhdHVzIiwiQ2FyZCIsImRhdGEiLCJzZWxmSWQiLCJjYXJkU2VsZWN0b3IiLCJoYW5kbGVDYXJkQ2xpY2siLCJoYW5kbGVDYXJkRGVsZXRlIiwiaGFuZGxlQ2FyZExpa2UiLCJfaWQiLCJfc2VsZklkIiwiX25hbWUiLCJfbGluayIsIl9jYW5EZWxldGUiLCJvd25lciIsIl9saWtlcyIsImxpa2VzIiwiX2NhcmRTZWxlY3RvciIsIl9oYW5kbGVDYXJkQ2xpY2siLCJfaGFuZGxlQ2FyZERlbGV0ZSIsIl9oYW5kbGVDYXJkTGlrZSIsIl9lbGVtZW50IiwiX2dldFRlbXBsYXRlIiwiaW1hZ2UiLCJxdWVyeVNlbGVjdG9yIiwic2V0QXR0cmlidXRlIiwidGV4dENvbnRlbnQiLCJfZGVsZXRlQnRuIiwicmVtb3ZlIiwiX2xpa2VOdW1iZXIiLCJfbGlrZUJ0biIsIl91cGRhdGVMaWtlcyIsIl9zZXRFdmVudExpc3RlbmVycyIsImxlbmd0aCIsIl9pc0xpa2VkIiwic29tZSIsIml0ZW0iLCJjbGFzc0xpc3QiLCJhZGQiLCJjYXJkVGVtcGxhdGUiLCJkb2N1bWVudCIsImNvbnRlbnQiLCJjYXJkRWxlbWVudCIsImNsb25lTm9kZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJGb3JtVmFsaWRhdG9yIiwic2V0dGluZ3MiLCJmb3JtU2VsZWN0b3IiLCJfZm9ybUVsZW1lbnQiLCJfaW5wdXRMaXN0IiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsImlucHV0U2VsZWN0b3IiLCJfc3VibWl0QnV0dG9uIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJfaW5hY3RpdmVCdXR0b25DbGFzcyIsImluYWN0aXZlQnV0dG9uQ2xhc3MiLCJfaW5wdXRFcnJvckNsYXNzIiwiaW5wdXRFcnJvckNsYXNzIiwiX3RvZ2dsZUJ1dHRvblN0YXRlIiwiZm9yRWFjaCIsImlucHV0RWxlbWVudCIsIl9oaWRlSW5wdXRFcnJvciIsIl9jaGVja0lucHV0VmFsaWRpdHkiLCJfaGFzSW52YWxpZElucHV0IiwiZGlzYWJsZWQiLCJlcnJvckVsZW1lbnQiLCJ2YWxpZGF0aW9uTWVzc2FnZSIsInZhbGlkaXR5IiwidmFsaWQiLCJfc2hvd0lucHV0RXJyb3IiLCJQb3B1cCIsInBvcHVwU2VsZWN0b3IiLCJfcG9wdXAiLCJfY2xvc2VCdG4iLCJjbG9zZSIsImJpbmQiLCJfaGFuZGxlRXNjQ2xvc2UiLCJfaGFuZGxlT3ZlcmxheUNsaWNrIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2dCIsInRhcmdldCIsImN1cnJlbnRUYXJnZXQiLCJrZXkiLCJQb3B1cFdpdGhDb25maXJtYXRpb24iLCJjb250ZXh0IiwiX2NvbnRleHQiLCJwcmV2ZW50RGVmYXVsdCIsIl9zdWJtaXRlciIsIlBvcHVwV2l0aEZvcm0iLCJzdWJtaXRlciIsIl9mb3JtIiwiX3N1Ym1pdEJ0biIsIl9zdWJtaXRCdG5UZXh0IiwiaW5uZXJIVE1MIiwiX2hhbmRsZVN1Ym1pdCIsInNldEV2ZW50TGlzdGVuZXJzIiwiaW5wdXQiLCJ2YWx1ZSIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsInJlc2V0IiwiZm9ybVZhbHVlcyIsImlubmVyVGV4dCIsIl9nZXRJbnB1dFZhbHVlcyIsIlBvcHVwV2l0aEltYWdlIiwiX2ltYWdlIiwiX2NhcHRpb24iLCJzcmMiLCJ0aXRsZSIsIlNlY3Rpb24iLCJjb250YWluZXJTZWxlY3RvciIsIml0ZW1zIiwicmVuZGVyZXIiLCJfcmVuZGVyZWRJdGVtcyIsIl9yZW5kZXJlciIsIl9jb250YWluZXIiLCJlbGVtZW50IiwiYXBwZW5kIiwicHJlcGVuZCIsIlVzZXJJbmZvIiwibmFtZVNlbGVjdG9yIiwiZGVzY3JpcHRpb25TZWxlY3RvciIsImF2YXRhclNlbGVjdG9yIiwiX25hbWVUaXRsZSIsIl9kZXNjcmlwdGlvblN1YnRpdGxlIiwiX3Byb2ZpbGVJbWFnZSIsInByb2ZpbGVFZGl0QnRuIiwicGxhY2VBZGRCdG4iLCJwcm9maWxlQXZhdGFyIiwiYXBpIiwiYXV0aG9yaXphdGlvbiIsImltYWdlUG9wdXAiLCJjYXJkc0xpc3QiLCJ1c2VySW5mbyIsImNvbmZpcm1Qb3B1cCIsImRlbGV0ZUNhcmQiLCJjYXRjaCIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJjcmVhdGVDYXJkIiwiY2FyZCIsImdldElkIiwib3BlbiIsImxpa2VDYXJkIiwic2V0TGlrZXMiLCJnZW5lcmF0ZUNhcmQiLCJwcm9maWxlUG9wdXAiLCJzZXRVc2VySW5mbyIsImF2YXRhclBvcHVwIiwic2V0VXNlckF2YXRhciIsInNldFByb2ZpbGVJbWFnZSIsInBsYWNlUG9wdXAiLCJoYW5kbGVQcm9maWxlRWRpdCIsImdldFVzZXJJbmZvIiwiaGFuZGxlUGxhY2VBZGQiLCJoYW5kbGVQcm9maWxlQXZhdGFyIiwiZm9ybVNlbGVjdG9ycyIsImZvcm1WYWxpZGF0b3IiLCJlbmFibGVWYWxpZGF0aW9uIiwiaW5mbyIsInNldElkIiwiZ2V0SW5pdGlhbENhcmRzIiwiaW5pdGlhbENhcmRzIiwicmVuZGVySXRlbXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQXFCQSxHO0FBQ25CLGVBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFDbkIsU0FBS0MsUUFBTCxHQUFnQkQsT0FBTyxDQUFDRSxPQUF4QjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JILE9BQU8sQ0FBQ0ksT0FBeEI7QUFDRDs7OztXQUVELDJCQUFrQjtBQUFBOztBQUNoQixhQUFPQyxLQUFLLFdBQUksS0FBS0osUUFBVCxhQUEyQjtBQUNyQ0csZUFBTyxFQUFFLEtBQUtEO0FBRHVCLE9BQTNCLENBQUwsQ0FHTkcsSUFITSxDQUdELFVBQUNDLEdBQUQ7QUFBQSxlQUFTLEtBQUksQ0FBQ0MsZ0JBQUwsQ0FBc0JELEdBQXRCLENBQVQ7QUFBQSxPQUhDLENBQVA7QUFJRDs7O1dBRUQsdUJBQWM7QUFBQTs7QUFDWixhQUFPRixLQUFL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QyxTQUFPLENBQUNDLEdBQVIsQ0FBWUYsR0FBWjtBQUNELENBbEJILEUiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwaSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLl9iYXNlVXJsID0gb3B0aW9ucy5iYXNlVXJsO1xuICAgIHRoaXMuX2hlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnM7XG4gIH1cblxuICBnZXRJbml0aWFsQ2FyZHMoKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX2Jhc2VVcmx9L2NhcmRzYCwge1xuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVyc1xuICAgIH0pXG4gICAgLnRoZW4oKHJlcykgPT4gdGhpcy5fcHJvY2Vzc1Jlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX2Jhc2VVcmx9L3VzZXJzL21lYCwge1xuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVyc1xuICAgIH0pXG4gICAgLnRoZW4oKHJlcykgPT4gdGhpcy5fcHJvY2Vzc1Jlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgc2V0VXNlckluZm8oe25hbWUsIGFib3V0fSkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLl9iYXNlVXJsfS91c2Vycy9tZWAsIHtcbiAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgIGFib3V0OiBhYm91dFxuICAgICAgfSlcbiAgICB9KVxuICAgIC50aGVuKChyZXMpID0+IHRoaXMuX3Byb2Nlc3NSZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIHNldFVzZXJBdmF0YXIoe2F2YXRhcn0pIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5fYmFzZVVybH0vdXNlcnMvbWUvYXZhdGFyYCwge1xuICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgYXZhdGFyOiBhdmF0YXJcbiAgICAgIH0pXG4gICAgfSlcbiAgICAudGhlbigocmVzKSA9PiB0aGlzLl9wcm9jZXNzUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICBjcmVhdGVDYXJkKHtuYW1lLCBsaW5rfSkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLl9iYXNlVXJsfS9jYXJkc2AsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgbGluazogbGlua1xuICAgICAgfSlcbiAgICB9KVxuICAgIC50aGVuKChyZXMpID0+IHRoaXMuX3Byb2Nlc3NSZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIGRlbGV0ZUNhcmQoaWQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5fYmFzZVVybH0vY2FyZHMvJHtpZH1gLCB7XG4gICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICB9KVxuICAgIC50aGVuKChyZXMpID0+IHRoaXMuX3Byb2Nlc3NSZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIGxpa2VDYXJkKGlkLCBpc0xpa2UpIHtcbiAgICBjb25zdCBtZXRob2QgPSBpc0xpa2UgPyAnUFVUJzogJ0RFTEVURSc7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX2Jhc2VVcmx9L2NhcmRzL2xpa2VzLyR7aWR9YCwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgIH0pXG4gICAgLnRoZW4oKHJlcykgPT4gdGhpcy5fcHJvY2Vzc1Jlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgX3Byb2Nlc3NSZXNwb25zZShyZXMpIHtcbiAgICBpZiAocmVzLm9rKSB7XG4gICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGDQntGI0LjQsdC60LA6ICR7cmVzLnN0YXR1c31gKTtcbiAgfVxufVxuXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJkIHtcbiAgY29uc3RydWN0b3IoZGF0YSwgc2VsZklkLCBjYXJkU2VsZWN0b3IsIGhhbmRsZUNhcmRDbGljaywgaGFuZGxlQ2FyZERlbGV0ZSwgaGFuZGxlQ2FyZExpa2UpIHtcbiAgICB0aGlzLl9pZCA9IGRhdGEuX2lkO1xuICAgIHRoaXMuX3NlbGZJZCA9IHNlbGZJZDtcbiAgICB0aGlzLl9uYW1lID0gZGF0YS5uYW1lO1xuICAgIHRoaXMuX2xpbmsgPSBkYXRhLmxpbms7XG4gICAgdGhpcy5fY2FuRGVsZXRlID0gZGF0YS5vd25lci5faWQgPT09IHNlbGZJZDtcbiAgICB0aGlzLl9saWtlcyA9IGRhdGEubGlrZXM7XG4gICAgdGhpcy5fY2FyZFNlbGVjdG9yID0gY2FyZFNlbGVjdG9yO1xuICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljayA9IGhhbmRsZUNhcmRDbGljaztcbiAgICB0aGlzLl9oYW5kbGVDYXJkRGVsZXRlID0gaGFuZGxlQ2FyZERlbGV0ZTtcbiAgICB0aGlzLl9oYW5kbGVDYXJkTGlrZSA9IGhhbmRsZUNhcmRMaWtlO1xuICB9XG5cbiAgZ2VuZXJhdGVDYXJkKCkge1xuICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9nZXRUZW1wbGF0ZSgpO1xuXG4gICAgY29uc3QgaW1hZ2UgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbGVtZW50X19pbWcnKTtcbiAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIHRoaXMuX2xpbmspO1xuICAgIGltYWdlLnNldEF0dHJpYnV0ZSgnYWx0JywgdGhpcy5fbmFtZSk7XG4gICAgdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZWxlbWVudF9fdGl0bGUnKS50ZXh0Q29udGVudCA9IHRoaXMuX25hbWU7XG5cbiAgICB0aGlzLl9kZWxldGVCdG4gPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbGVtZW50X19kZWxldGUnKTtcbiAgICBpZiAoIXRoaXMuX2NhbkRlbGV0ZSkge1xuICAgICAgdGhpcy5fZGVsZXRlQnRuLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIHRoaXMuX2xpa2VOdW1iZXIgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbGVtZW50X19saWtlLW51bWJlcicpO1xuICAgIHRoaXMuX2xpa2VCdG4gPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbGVtZW50X19saWtlJyk7XG4gICAgdGhpcy5fdXBkYXRlTGlrZXMoKTtcblxuICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudDtcbiAgfVxuXG4gIHNldExpa2VzKHtsaWtlc30pIHtcbiAgICB0aGlzLl9saWtlcyA9IGxpa2VzO1xuICAgIHRoaXMuX3VwZGF0ZUxpa2VzKCk7XG4gIH1cblxuICBfdXBkYXRlTGlrZXMoKSB7XG4gICAgdGhpcy5fbGlrZU51bWJlci50ZXh0Q29udGVudCA9IHRoaXMuX2xpa2VzLmxlbmd0aDtcbiAgICB0aGlzLl9pc0xpa2VkID0gdGhpcy5fbGlrZXMuc29tZSgoaXRlbSkgPT4gaXRlbS5faWQgPT09IHRoaXMuX3NlbGZJZCk7XG4gICAgaWYgKHRoaXMuX2lzTGlrZWQpIHtcbiAgICAgIHRoaXMuX2xpa2VCdG4uY2xhc3NMaXN0LmFkZCgnZWxlbWVudF9fbGlrZV9hY3RpdmUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbGlrZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdlbGVtZW50X19saWtlX2FjdGl2ZScpO1xuICAgIH1cbiAgfVxuXG4gIF9nZXRUZW1wbGF0ZSgpIHtcbiAgICBjb25zdCBjYXJkVGVtcGxhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuX2NhcmRTZWxlY3RvcikuY29udGVudDtcbiAgICBjb25zdCBjYXJkRWxlbWVudCA9IGNhcmRUZW1wbGF0ZS5xdWVyeVNlbGVjdG9yKCcuZWxlbWVudCcpLmNsb25lTm9kZSh0cnVlKTtcbiAgICByZXR1cm4gY2FyZEVsZW1lbnQ7XG4gIH1cblxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgY29uc3QgaW1hZ2UgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbGVtZW50X19pbWcnKTtcblxuICAgIHRoaXMuX2xpa2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLl9oYW5kbGVDYXJkTGlrZSh0aGlzLl9pZCwgIXRoaXMuX2lzTGlrZWQsIHRoaXMpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fZGVsZXRlQnRuPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuX2hhbmRsZUNhcmREZWxldGUodGhpcy5faWQsIHRoaXMuX2VsZW1lbnQpO1xuICAgIH0pO1xuXG4gICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLl9oYW5kbGVDYXJkQ2xpY2sodGhpcy5fbGluaywgdGhpcy5fbmFtZSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1WYWxpZGF0b3Ige1xuICBjb25zdHJ1Y3RvcihzZXR0aW5ncywgZm9ybVNlbGVjdG9yKSB7XG4gICAgdGhpcy5fZm9ybUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGZvcm1TZWxlY3Rvcik7XG4gICAgdGhpcy5faW5wdXRMaXN0ID0gQXJyYXkuZnJvbSh0aGlzLl9mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHNldHRpbmdzLmlucHV0U2VsZWN0b3IpKTtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24gPSB0aGlzLl9mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKHNldHRpbmdzLnN1Ym1pdEJ1dHRvblNlbGVjdG9yKTtcbiAgICB0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzID0gc2V0dGluZ3MuaW5hY3RpdmVCdXR0b25DbGFzcztcbiAgICB0aGlzLl9pbnB1dEVycm9yQ2xhc3MgPSBzZXR0aW5ncy5pbnB1dEVycm9yQ2xhc3M7XG4gIH1cblxuICBlbmFibGVWYWxpZGF0aW9uKCkge1xuICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cblxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoKTtcblxuICAgIC8vIHdoZW4gZm9ybSBpcyBzaG93biBjaGFuZ2UgYnRuIHN0YXRlIGFuZCByZW1vdmUgdmFsaWRhdGlvbiBlcnJvcnNcbiAgICB0aGlzLl9mb3JtRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzaG93JywgKCkgPT4ge1xuICAgICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoKTtcbiAgICAgIHRoaXMuX2lucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbGVtZW50KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5faW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWxlbWVudCkgPT4ge1xuICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgICB0aGlzLl9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbGVtZW50KTtcbiAgICAgICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgX3RvZ2dsZUJ1dHRvblN0YXRlKCkge1xuICAgIGlmICh0aGlzLl9oYXNJbnZhbGlkSW5wdXQoKSkge1xuICAgICAgdGhpcy5fc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQodGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyk7XG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIF9zaG93SW5wdXRFcnJvcihpbnB1dEVsZW1lbnQpIHtcbiAgICBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLl9pbnB1dEVycm9yQ2xhc3MpO1xuICAgIGNvbnN0IGVycm9yRWxlbWVudCA9IHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2lucHV0RWxlbWVudC5pZH0tZXJyb3JgKTtcbiAgICBlcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSBpbnB1dEVsZW1lbnQudmFsaWRhdGlvbk1lc3NhZ2U7XG4gIH1cblxuICBfaGlkZUlucHV0RXJyb3IoaW5wdXRFbGVtZW50KSB7XG4gICAgaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5faW5wdXRFcnJvckNsYXNzKTtcbiAgICBjb25zdCBlcnJvckVsZW1lbnQgPSB0aGlzLl9mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKGAuJHtpbnB1dEVsZW1lbnQuaWR9LWVycm9yYCk7XG4gICAgZXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gJyc7XG4gIH1cblxuICBfY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0RWxlbWVudCkge1xuICAgIGlmIChpbnB1dEVsZW1lbnQudmFsaWRpdHkudmFsaWQpIHtcbiAgICAgIHRoaXMuX2hpZGVJbnB1dEVycm9yKGlucHV0RWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3Nob3dJbnB1dEVycm9yKGlucHV0RWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgX2hhc0ludmFsaWRJbnB1dCgpIHtcbiAgICByZXR1cm4gdGhpcy5faW5wdXRMaXN0LnNvbWUoKGlucHV0RWxlbWVudCkgPT4ge1xuICAgICAgcmV0dXJuICFpbnB1dEVsZW1lbnQudmFsaWRpdHkudmFsaWQ7XG4gICAgfSk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHRoaXMuX3BvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9jbG9zZUJ0biA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fY2xvc2UtYnRuJyk7XG5cbiAgICB0aGlzLmNsb3NlID0gdGhpcy5jbG9zZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2hhbmRsZUVzY0Nsb3NlID0gdGhpcy5faGFuZGxlRXNjQ2xvc2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9oYW5kbGVPdmVybGF5Q2xpY2sgPSB0aGlzLl9oYW5kbGVPdmVybGF5Q2xpY2suYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LmFkZCgncG9wdXBfZGlzcGxheV9hY3RpdmUnKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfZGlzcGxheV9hY3RpdmUnKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xuICB9XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5fY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlKTtcbiAgICB0aGlzLl9wb3B1cC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZU92ZXJsYXlDbGljayk7XG4gIH1cblxuICBfaGFuZGxlT3ZlcmxheUNsaWNrKGV2dCkge1xuICAgIGlmIChldnQudGFyZ2V0ID09PSBldnQuY3VycmVudFRhcmdldCkge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVFc2NDbG9zZShldnQpIHtcbiAgICBpZiAoZXZ0LmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQb3B1cFdpdGhGb3JtIGZyb20gJy4vUG9wdXBXaXRoRm9ybS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aENvbmZpcm1hdGlvbiBleHRlbmRzIFBvcHVwV2l0aEZvcm0ge1xuICBvcGVuKGlkLCBjb250ZXh0KSB7XG4gICAgdGhpcy5faWQgPSBpZDtcbiAgICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcbiAgICBzdXBlci5vcGVuKCk7XG4gIH1cblxuICBfaGFuZGxlU3VibWl0KGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuX3N1Ym1pdGVyKHRoaXMuX2lkLCB0aGlzLl9jb250ZXh0KTtcbiAgfVxufVxuIiwiaW1wb3J0IFBvcHVwIGZyb20gJy4vUG9wdXAuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhGb3JtIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3RvcihzdWJtaXRlciwgcG9wdXBTZWxlY3Rvcikge1xuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX3N1Ym1pdGVyID0gc3VibWl0ZXI7XG4gICAgdGhpcy5fZm9ybSA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5mb3JtJyk7XG4gICAgdGhpcy5faW5wdXRMaXN0ID0gdGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCcuZm9ybV9faXRlbScpO1xuICAgIHRoaXMuX3N1Ym1pdEJ0biA9IHRoaXMuX2Zvcm0ucXVlcnlTZWxlY3RvcignLmZvcm1fX3N1Ym1pdCcpO1xuICAgIHRoaXMuX3N1Ym1pdEJ0blRleHQgPSB0aGlzLl9zdWJtaXRCdG4uaW5uZXJIVE1MO1xuXG4gICAgdGhpcy5faGFuZGxlU3VibWl0ID0gdGhpcy5faGFuZGxlU3VibWl0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5zZXRFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLl9mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuX2hhbmRsZVN1Ym1pdCk7XG4gIH1cblxuICBvcGVuKGRhdGEpIHtcbiAgICB0aGlzLl9zdWJtaXRCdG4uaW5uZXJIVE1MID0gdGhpcy5fc3VibWl0QnRuVGV4dDtcbiAgICBpZiAoZGF0YSkge1xuICAgICAgdGhpcy5faW5wdXRMaXN0LmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgICBpbnB1dC52YWx1ZSA9IGRhdGFbaW5wdXQubmFtZV07XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5fZm9ybS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnc2hvdycpKTsgLy8gc2VuZCBhbiBldmVudCB0byB0cmlnZ2VyIHRvZ2dsZUJ1dHRvblN0YXRlKCkgbG9naWNcblxuICAgIHN1cGVyLm9wZW4oKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHN1cGVyLmNsb3NlKCk7XG4gICAgdGhpcy5fZm9ybS5yZXNldCgpO1xuICB9XG5cbiAgX2dldElucHV0VmFsdWVzKCkge1xuICAgIGNvbnN0IGZvcm1WYWx1ZXMgPSB7fTtcbiAgICB0aGlzLl9pbnB1dExpc3QuZm9yRWFjaChpbnB1dCA9PiB7XG4gICAgICBmb3JtVmFsdWVzW2lucHV0Lm5hbWVdID0gaW5wdXQudmFsdWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZm9ybVZhbHVlcztcbiAgfVxuXG4gIF9oYW5kbGVTdWJtaXQoZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5fc3VibWl0QnRuLmlubmVyVGV4dCA9ICfQodC+0YXRgNCw0L3QtdC90LjQtS4uLic7XG4gICAgdGhpcy5fc3VibWl0ZXIodGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKSk7XG4gIH1cbn1cbiIsImltcG9ydCBQb3B1cCBmcm9tICcuL1BvcHVwLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoSW1hZ2UgZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9pbWFnZSA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9faW1hZ2UnKTtcbiAgICB0aGlzLl9jYXB0aW9uID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwX19pbWFnZS1jYXB0aW9uJyk7XG4gICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIG9wZW4oc3JjLCB0aXRsZSkge1xuICAgIHRoaXMuX2ltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjKTtcbiAgICB0aGlzLl9pbWFnZS5zZXRBdHRyaWJ1dGUoJ2FsdCcsIHRpdGxlKTtcbiAgICB0aGlzLl9jYXB0aW9uLnRleHRDb250ZW50ID0gdGl0bGU7XG4gICAgc3VwZXIub3BlbigpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIHtcbiAgY29uc3RydWN0b3IoeyBpdGVtcywgcmVuZGVyZXIgfSwgY29udGFpbmVyU2VsZWN0b3IpIHtcbiAgICB0aGlzLl9yZW5kZXJlZEl0ZW1zID0gaXRlbXM7XG4gICAgdGhpcy5fcmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgICB0aGlzLl9jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lclNlbGVjdG9yKTtcbiAgfVxuXG4gIGFwcGVuZChlbGVtZW50KSB7XG4gICAgdGhpcy5fY29udGFpbmVyLmFwcGVuZChlbGVtZW50KTtcbiAgfVxuXG4gIHByZXBlbmQoZWxlbWVudCkge1xuICAgIHRoaXMuX2NvbnRhaW5lci5wcmVwZW5kKGVsZW1lbnQpO1xuICB9XG5cbiAgcmVuZGVySXRlbXMoKSB7XG4gICAgdGhpcy5fcmVuZGVyZWRJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgdGhpcy5fcmVuZGVyZXIoaXRlbSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJJbmZvIHtcbiAgY29uc3RydWN0b3IoeyBuYW1lU2VsZWN0b3IsIGRlc2NyaXB0aW9uU2VsZWN0b3IsIGF2YXRhclNlbGVjdG9yIH0pIHtcbiAgICB0aGlzLl9uYW1lVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG5hbWVTZWxlY3Rvcik7XG4gICAgdGhpcy5fZGVzY3JpcHRpb25TdWJ0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZGVzY3JpcHRpb25TZWxlY3Rvcik7XG4gICAgdGhpcy5fcHJvZmlsZUltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhdmF0YXJTZWxlY3Rvcik7XG4gIH1cblxuICBnZXRVc2VySW5mbygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogdGhpcy5fbmFtZVRpdGxlLnRleHRDb250ZW50LFxuICAgICAgYWJvdXQ6IHRoaXMuX2Rlc2NyaXB0aW9uU3VidGl0bGUudGV4dENvbnRlbnRcbiAgICB9XG4gIH1cblxuICBzZXRVc2VySW5mbyh7bmFtZSwgYWJvdXQsIF9pZH0pIHtcbiAgICB0aGlzLl9uYW1lVGl0bGUudGV4dENvbnRlbnQgPSBuYW1lO1xuICAgIHRoaXMuX2Rlc2NyaXB0aW9uU3VidGl0bGUudGV4dENvbnRlbnQgPSBhYm91dDtcbiAgfVxuXG4gIHNldFByb2ZpbGVJbWFnZSh7YXZhdGFyfSkge1xuICAgIHRoaXMuX3Byb2ZpbGVJbWFnZS5zcmMgPSBhdmF0YXI7XG4gIH1cblxuICBzZXRJZCh7X2lkfSkge1xuICAgIHRoaXMuX2lkID0gX2lkO1xuICB9XG5cbiAgZ2V0SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lkO1xuICB9XG59XG4iLCJleHBvcnQgY29uc3QgcHJvZmlsZUVkaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZmlsZV9fZWRpdCcpO1xuZXhwb3J0IGNvbnN0IHBsYWNlQWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2ZpbGVfX2FkZCcpO1xuZXhwb3J0IGNvbnN0IHByb2ZpbGVBdmF0YXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZmlsZV9fYXZhdGFyJyk7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcbmltcG9ydCAnLi9pbmRleC5jc3MnO1xuaW1wb3J0IENhcmQgZnJvbSAnLi4vY29tcG9uZW50cy9DYXJkLmpzJ1xuaW1wb3J0IEZvcm1WYWxpZGF0b3IgZnJvbSAnLi4vY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzJ1xuaW1wb3J0IFBvcHVwV2l0aEZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzJztcbmltcG9ydCBQb3B1cFdpdGhJbWFnZSBmcm9tICcuLi9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlLmpzJztcbmltcG9ydCBQb3B1cFdpdGhDb25maXJtYXRpb24gZnJvbSAnLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhDb25maXJtYXRpb24uanMnO1xuaW1wb3J0IFNlY3Rpb24gZnJvbSAnLi4vY29tcG9uZW50cy9TZWN0aW9uLmpzJztcbmltcG9ydCBVc2VySW5mbyBmcm9tICcuLi9jb21wb25lbnRzL1VzZXJJbmZvLmpzJztcbmltcG9ydCBBcGkgZnJvbSAnLi4vY29tcG9uZW50cy9BcGkuanMnO1xuaW1wb3J0IHtcbiAgcHJvZmlsZUVkaXRCdG4sXG4gIHBsYWNlQWRkQnRuLFxuICBwcm9maWxlQXZhdGFyLFxufSBmcm9tICcuLi91dGlscy9jb25zdGFudHMuanMnXG5cbmNvbnN0IGFwaSA9IG5ldyBBcGkoe1xuICBiYXNlVXJsOiAnaHR0cHM6Ly9tZXN0by5ub21vcmVwYXJ0aWVzLmNvL3YxL2NvaG9ydC0yMScsXG4gIGhlYWRlcnM6IHtcbiAgICBhdXRob3JpemF0aW9uOiAnMGNkOThiZjktMGNkNy00ZWYwLWE1N2UtYjdkZDUxNGFlYWQ4JyxcbiAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gIH1cbn0pO1xuXG5jb25zdCBpbWFnZVBvcHVwID0gbmV3IFBvcHVwV2l0aEltYWdlKCcuaW1hZ2UtcG9wdXAnKTtcbmxldCBjYXJkc0xpc3QgPSBudWxsO1xuXG5jb25zdCB1c2VySW5mbyA9IG5ldyBVc2VySW5mbyh7XG4gIG5hbWVTZWxlY3RvcjogJy5wcm9maWxlX190aXRsZScsXG4gIGRlc2NyaXB0aW9uU2VsZWN0b3I6ICcucHJvZmlsZV9fc3VidGl0bGUnLFxuICBhdmF0YXJTZWxlY3RvcjogJy5wcm9maWxlX19pbWcnXG59KTtcblxuY29uc3QgY29uZmlybVBvcHVwID0gbmV3IFBvcHVwV2l0aENvbmZpcm1hdGlvbigoaWQsIGNhcmRFbGVtZW50KSA9PiB7XG4gIGFwaS5kZWxldGVDYXJkKGlkKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgY2FyZEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIGNvbmZpcm1Qb3B1cC5jbG9zZSgpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfSk7XG59LCAnLmNvbmZpcm0tcG9wdXAnKTtcblxuZnVuY3Rpb24gY3JlYXRlQ2FyZChkYXRhKSB7XG4gIGNvbnN0IGNhcmQgPSBuZXcgQ2FyZChkYXRhLCB1c2VySW5mby5nZXRJZCgpLCAnI2NhcmQtdGVtcGxhdGUnLFxuICAgIChsaW5rLCBuYW1lKSA9PiB7XG4gICAgICBpbWFnZVBvcHVwLm9wZW4obGluaywgbmFtZSk7XG4gICAgfSxcbiAgICAoaWQsIGNhcmRFbGVtZW50KSA9PiB7XG4gICAgICBjb25maXJtUG9wdXAub3BlbihpZCwgY2FyZEVsZW1lbnQpO1xuICAgIH0sXG4gICAgKGlkLCBpc0xpa2UsIGNhcmQpID0+IHtcbiAgICAgIGFwaS5saWtlQ2FyZChpZCwgaXNMaWtlKVxuICAgICAgICAgIC50aGVuKChyZXMpPT57XG4gICAgICAgICAgICBjYXJkLnNldExpa2VzKHJlcyk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICB9KTtcbiAgICB9XG4gICk7XG5cbiAgY29uc3QgY2FyZEVsZW1lbnQgPSBjYXJkLmdlbmVyYXRlQ2FyZCgpO1xuICByZXR1cm4gY2FyZEVsZW1lbnQ7XG59XG5cbmNvbnN0IHByb2ZpbGVQb3B1cCA9IG5ldyBQb3B1cFdpdGhGb3JtKChkYXRhKSA9PiB7XG4gIGFwaS5zZXRVc2VySW5mbyhkYXRhKVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgIHVzZXJJbmZvLnNldFVzZXJJbmZvKHJlcyk7XG4gICAgICBwcm9maWxlUG9wdXAuY2xvc2UoKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xufSwgJy5wcm9maWxlLXBvcHVwJyk7XG5cbmNvbnN0IGF2YXRhclBvcHVwID0gbmV3IFBvcHVwV2l0aEZvcm0oKGRhdGEpID0+IHtcbiAgYXBpLnNldFVzZXJBdmF0YXIoZGF0YSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICB1c2VySW5mby5zZXRQcm9maWxlSW1hZ2UocmVzKTtcbiAgICAgIGF2YXRhclBvcHVwLmNsb3NlKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KTtcbn0sICcuYXZhdGFyLXBvcHVwJyk7XG5cbmNvbnN0IHBsYWNlUG9wdXAgPSBuZXcgUG9wdXBXaXRoRm9ybSgoZGF0YSkgPT4ge1xuICBhcGkuY3JlYXRlQ2FyZChkYXRhKVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgIGNhcmRzTGlzdC5wcmVwZW5kKGNyZWF0ZUNhcmQocmVzKSk7XG4gICAgICBwbGFjZVBvcHVwLmNsb3NlKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KTtcbn0sICcucGxhY2UtcG9wdXAnKTtcblxuLy8gQ2FsbGJhY2tzXG5mdW5jdGlvbiBoYW5kbGVQcm9maWxlRWRpdCgpIHtcbiAgcHJvZmlsZVBvcHVwLm9wZW4odXNlckluZm8uZ2V0VXNlckluZm8oKSk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVBsYWNlQWRkKCkge1xuICBwbGFjZVBvcHVwLm9wZW4oKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlUHJvZmlsZUF2YXRhcigpIHtcbiAgYXZhdGFyUG9wdXAub3BlbigpO1xufVxuXG4vLyBsaXN0ZW5lcnNcbnByb2ZpbGVFZGl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlUHJvZmlsZUVkaXQpO1xucGxhY2VBZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVQbGFjZUFkZCk7XG5wcm9maWxlQXZhdGFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlUHJvZmlsZUF2YXRhcik7XG5cbi8vIGVuYWJsZSBmb3JtIGZpZWxkcyB2YWxpZGF0aW9uXG5jb25zdCBmb3JtU2VsZWN0b3JzID0gWycuZWRpdC1wcm9maWxlJywgJy5hZGQtcHJvZmlsZScsICcudXBkYXRlLWF2YXRhciddO1xuZm9ybVNlbGVjdG9ycy5mb3JFYWNoKChmb3JtU2VsZWN0b3IpID0+IHtcbiAgY29uc3Qgc2V0dGluZ3MgPSB7XG4gICAgaW5wdXRTZWxlY3RvcjogJy5mb3JtX19pdGVtJyxcbiAgICBzdWJtaXRCdXR0b25TZWxlY3RvcjogJy5mb3JtX19zdWJtaXQnLFxuICAgIGluYWN0aXZlQnV0dG9uQ2xhc3M6ICdmb3JtX19zdWJtaXRfaW5hY3RpdmUnLFxuICAgIGlucHV0RXJyb3JDbGFzczogJ2Zvcm1fX2l0ZW1fdHlwZV9lcnJvcicsXG4gIH1cbiAgY29uc3QgZm9ybVZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKHNldHRpbmdzLCBmb3JtU2VsZWN0b3IpO1xuICBmb3JtVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRpb24oKTtcbn0pO1xuXG5hcGkuZ2V0VXNlckluZm8oKVxuICAudGhlbigoaW5mbykgPT4ge1xuICAgIHVzZXJJbmZvLnNldElkKGluZm8pO1xuICAgIHVzZXJJbmZvLnNldFVzZXJJbmZvKGluZm8pO1xuICAgIHVzZXJJbmZvLnNldFByb2ZpbGVJbWFnZShpbmZvKTtcbiAgICByZXR1cm4gYXBpLmdldEluaXRpYWxDYXJkcygpO1xuICB9KVxuICAudGhlbigoaW5pdGlhbENhcmRzKSA9PiB7XG4gICAgY2FyZHNMaXN0ID0gbmV3IFNlY3Rpb24oe1xuICAgICAgaXRlbXM6IGluaXRpYWxDYXJkcyxcbiAgICAgIHJlbmRlcmVyOiAoZGF0YSkgPT4ge1xuICAgICAgICBjYXJkc0xpc3QuYXBwZW5kKGNyZWF0ZUNhcmQoZGF0YSkpO1xuICAgICAgfVxuICAgIH0sICcuZWxlbWVudHNfX2xpc3QnKTtcbiAgICBjYXJkc0xpc3QucmVuZGVySXRlbXMoKTtcbiAgfSlcbiAgLmNhdGNoKChlcnIpID0+IHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=