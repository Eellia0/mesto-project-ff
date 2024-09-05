import './styles/index.css';
import './vendor/normalize.css'
import './scripts/cards.js'
import { getUserInfo, getCards, sendAvatarUrl, sendDeleteCard, sendUserInfo, sendCardInfo} from './scripts/api.js';
import { isValid, isValidUrl } from './scripts/validation.js'
import { closePopup, openPopup } from './scripts/modal.js';
import { createCard, deleteCard, typeImage, addLike, removeLike } from './scripts/cards.js';

export let userId = null

const container = document.querySelector(".places__list");
const typeImageCloser = typeImage.querySelector('.popup__close')

const popupEditProfile = document.querySelector('.popup_type_edit')
const editOpener = document.querySelector('.profile__edit-button')
const editCloser = popupEditProfile.querySelector('.popup__close')

export const popupRequire = document.querySelector('.popup_type_require')
const requireCloser = popupRequire.querySelector('.popup__close')
const requireSubmit = popupRequire.querySelector('.popup__button')

const editProfileAvatar = document.querySelector('.popup_type_edit_avatar')
const closerEditAvatar = editProfileAvatar.querySelector('.popup__close')

const editAvatarForm = document.forms["new-avatar"]
const avatarURLInput = editAvatarForm.querySelector('.popup__input_type_url')

const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const popupNewCard = document.querySelector('.popup_type_new-card')
const newCardButtonOpen = document.querySelector('.profile__add-button')
const newCardButtonCloser = popupNewCard.querySelector('.popup__close')
const avatar = document.querySelector('.profile__image')

const editProfileForm = document.forms["edit-profile"]
const nameInput = editProfileForm.querySelector('.popup__input_type_name')
const jobInput = editProfileForm.querySelector('.popup__input_type_description')

const placeFormElement = document.forms["new-place"];
const cardNameInput = placeFormElement.querySelector('.popup__input_type_card-name')
const cardLinkInput = placeFormElement.querySelector('.popup__input_type_url')

const popups =  document.querySelectorAll('.popup')

export function timer(submitButton, popup) {
  submitButton.textContent = 'Сохранение...';
  setTimeout(function() {
    closePopup(popup)
    submitButton.textContent = 'Сохранить';
  },    500); 
}

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
    profileTitle.textContent = nameInput.value
    profileDescription.textContent = jobInput.value
    sendUserInfo(nameInput.value, jobInput.value)
    const submitButton = editProfileForm.querySelector('.popup__button')
    timer(submitButton, popupEditProfile)
}    
function submitCardForm(evt) {
    evt.preventDefault();
    sendCardInfo(cardNameInput.value, cardLinkInput.value)
    const submitButton = placeFormElement.querySelector('.popup__button')
    timer(submitButton, popupNewCard)
    evt.target.reset()
}

function submitAvatarForm(evt) {
  evt.preventDefault();
  avatar.style.backgroundImage = "url('" + avatarURLInput.value + "')"
  sendAvatarUrl(avatarURLInput.value) 
  const submitButton = editProfileAvatar.querySelector('.popup__button')
  timer(submitButton, editProfileAvatar)
}

editOpener.addEventListener('click',() => { 
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupEditProfile)
    
})

editCloser.addEventListener('click',() => { closePopup(popupEditProfile)})

requireCloser.addEventListener('click',() => { closePopup(popupRequire)})

avatar.addEventListener('click',() =>  openPopup(editProfileAvatar))
closerEditAvatar.addEventListener('click', () => closePopup(editProfileAvatar))

newCardButtonOpen.addEventListener('click',() => { openPopup(popupNewCard)})
newCardButtonCloser.addEventListener('click',() => { closePopup(popupNewCard)})
typeImageCloser.addEventListener('click', () => {closePopup(typeImage)} )

editAvatarForm.addEventListener('submit', submitAvatarForm)

editProfileForm.addEventListener('submit', submitEditForm); 
placeFormElement.addEventListener('submit', submitCardForm)

function displayCards(cardInfos) {
  cardInfos.forEach((cardInfo) => {
    const card = {name: cardInfo.name, link: cardInfo.link, id: cardInfo._id}
    container.append(createCard(card, cardInfo.owner._id, cardInfo.likes, forDelete, addLike, removeLike))
  })
}

function forDelete(card, id) {
  openPopup(popupRequire)
  requireSubmit.addEventListener('click', () => {
  deleteCard(card)
  sendDeleteCard(id)
  closePopup(popupRequire)
})
}

 
Promise.all([getUserInfo(), getCards()])
  .then(([userInfo, cardInfos]) => {
    userId = userInfo._id
    displayUserInfo(userInfo)
    displayCards(cardInfos)
})
.catch((err) => console.log(err));


getInfo()

const formElements = document.querySelectorAll('.popup__form')

const setEventListeners = (formElements) => {
  formElements.forEach((formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement);
    });
  });
})
};

setEventListeners(formElements)

cardLinkInput.addEventListener('input', function() {isValidUrl(placeFormElement, cardLinkInput)} )



