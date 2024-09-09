import './styles/index.css';
import './vendor/normalize.css'
import './scripts/cards.js'
import { sendAvatarUrl, sendUserInfo, sendCardInfo, getUserInfo, getCards, setLikeRequest, unLikeRequest} from './scripts/api.js';
import { isValidUrl, setEventListeners, disableSubmitButton, hideInputError } from './scripts/validation.js'
import { closePopup, openPopup } from './scripts/modal.js';
import { avatar, profileTitle, profileDescription, container, createCard } from './scripts/cards.js';

const formElements = document.forms

const typeImage = document.querySelector('.popup_type_image')
const image = typeImage.querySelector('.popup__image')
const caption = typeImage.querySelector('.popup__caption')
const typeImageCloser = typeImage.querySelector('.popup__close')

let userId = null

const popupEditProfile = document.querySelector('.popup_type_edit')
const editOpener = document.querySelector('.profile__edit-button')
const editCloser = popupEditProfile.querySelector('.popup__close')

const editProfileSubmitButton = popupEditProfile.querySelector('.popup__button')

const editProfileAvatar = document.querySelector('.popup_type_edit_avatar')
const closerEditAvatar = editProfileAvatar.querySelector('.popup__close')

const editAvatarForm = document.forms["new-avatar"]
const avatarURLInput = editAvatarForm.querySelector('.popup__input_type_url')
const avatarSubmitButton = editAvatarForm.querySelector('.popup__button')

const popupNewCard = document.querySelector('.popup_type_new-card')
const newCardButtonOpen = document.querySelector('.profile__add-button')
const newCardButtonCloser = popupNewCard.querySelector('.popup__close')


const editProfileForm = document.forms["edit-profile"]
const nameInput = editProfileForm.querySelector('.popup__input_type_name')
const jobInput = editProfileForm.querySelector('.popup__input_type_description')

const placeFormElement = document.forms["new-place"];
const cardNameInput = placeFormElement.querySelector('.popup__input_type_card-name')
const cardLinkInput = placeFormElement.querySelector('.popup__input_type_url')
const newPlaceSubmitButton = placeFormElement.querySelector('.popup__button')

const popups =  document.querySelectorAll('.popup')

const popupRequire = document.querySelector('.popup_type_require')
const requireCloser = popupRequire.querySelector('.popup__close')
const requireSubmit = popupRequire.querySelector('.popup__button')

function openImage(cardInfo) {
  image.src = cardInfo.link
  image.alt = cardInfo.name
  caption.textContent = cardInfo.name
  openPopup(typeImage)
}

Promise.all([getUserInfo(), getCards()])
  .then(([userInfo, cardInfos]) => {
    userId = userInfo._id
    displayUserInfo(userInfo)
    cardInfos.forEach((cardInfo) => {
      container.append(createCard(cardInfo, openImage, userId, forDelete, addLike, removeLike))
    })
})
.catch((err) => console.log(err));

function displayUserInfo(userInfo) {
  profileTitle.textContent = userInfo.name
  profileDescription.textContent = userInfo.about
  avatar.style.backgroundImage =  "url('" + userInfo.avatar + "')"
}

popups.forEach((popup) => {
    popup.classList.add('popup_is-animated')
})

function submitEditForm(evt) {
    evt.preventDefault();
    const submitButton = editProfileForm.querySelector('.popup__button')
    submitButton.textContent = "Сохранение...";

    sendUserInfo(nameInput.value, jobInput.value)
    .then((res) => {
      profileTitle.textContent = res.name
      profileDescription.textContent = res.about
      closePopup(popupEditProfile)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
    })
}    
function submitCardForm(evt) {
    evt.preventDefault();

    const submitButton = placeFormElement.querySelector('.popup__button')

    sendCardInfo(cardNameInput.value, cardLinkInput.value)
    .then((cardInfo) => {
      container.prepend(createCard(cardInfo, openImage, userId, forDelete, addLike, removeLike))
      closePopup(popupNewCard)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
    })
    evt.target.reset()
}

function submitAvatarForm(evt) {
  evt.preventDefault();
  
  const submitButton = editProfileAvatar.querySelector('.popup__button')
  submitButton.textContent = "Сохранение...";

  sendAvatarUrl(avatarURLInput.value) 
  .then((res) => {
    avatar.style.backgroundImage = "url('" + res.avatar + "')"
    closePopup(editProfileAvatar)
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    submitButton.textContent = "Сохранить";
  })
  evt.target.reset()
}

editOpener.addEventListener('click',() => { 
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupEditProfile)
    hideInputError(editProfileForm, nameInput)
    hideInputError(editProfileForm, jobInput)
})

function forDelete(card, id) {
  openPopup(popupRequire)
  requireSubmit.addEventListener('click', () => {
  deleteCard(card)
  sendDeleteCard(id)
  closePopup(popupRequire)
})
}

function addLike(button, id) {
  setLikeRequest(id)
  .then((res) => {
    button.classList.add('card__like-button_is-active')
    const likesCounter = button.closest('.like_group').querySelector('.like_counter')
    likesCounter.textContent = res.likes.length
  })
  .catch((err) => {
    console.log(err)
  })
}

function removeLike(button, id) {
  unLikeRequest(id)
  .then((res) => {
    button.classList.remove('card__like-button_is-active')
    const likesCounter = button.closest('.like_group').querySelector('.like_counter')
    likesCounter.textContent = res.likes.length
  })
  .catch((err) => {
    console.log(err)
  })
}

editCloser.addEventListener('click',() => { closePopup(popupEditProfile)})

requireCloser.addEventListener('click',() => { closePopup(popupRequire)})

avatar.addEventListener('click',() => {
  openPopup(editProfileAvatar), 
  disableSubmitButton(avatarSubmitButton), 
  cleanForm(editAvatarForm, avatarURLInput)
})


function cleanForm(formElement, inputElement) {
  inputElement.value = ''
  hideInputError(formElement, inputElement)
}
closerEditAvatar.addEventListener('click', () => closePopup(editProfileAvatar))

newCardButtonOpen.addEventListener('click',() => { 
  openPopup(popupNewCard), 
  disableSubmitButton(newPlaceSubmitButton)
  cleanForm(placeFormElement, cardNameInput)
  cleanForm(placeFormElement, cardLinkInput)
})
newCardButtonCloser.addEventListener('click',() => { closePopup(popupNewCard)})
typeImageCloser.addEventListener('click', () => {closePopup(typeImage)} )

editAvatarForm.addEventListener('submit', submitAvatarForm)

editProfileForm.addEventListener('submit', submitEditForm); 
placeFormElement.addEventListener('submit', submitCardForm)

setEventListeners(formElements)

