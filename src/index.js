import './styles/index.css';
import './vendor/normalize.css'
import './scripts/cards.js'
import { sendAvatarUrl, sendUserInfo, sendCardInfo, getUserInfo, getCards} from './scripts/api.js';
import { isValidUrl, setEventListeners, formElements } from './scripts/validation.js'
import { closePopup, openPopup } from './scripts/modal.js';
import { typeImage, avatar, requireCloser, profileTitle, profileDescription, popupRequire, container, createCard } from './scripts/cards.js';

const image = typeImage.querySelector('.popup__image')
const caption = typeImage.querySelector('.popup__caption')

const typeImageCloser = typeImage.querySelector('.popup__close')
let userId = null
const popupEditProfile = document.querySelector('.popup_type_edit')
const editOpener = document.querySelector('.profile__edit-button')
const editCloser = popupEditProfile.querySelector('.popup__close')

const editProfileAvatar = document.querySelector('.popup_type_edit_avatar')
const closerEditAvatar = editProfileAvatar.querySelector('.popup__close')

const editAvatarForm = document.forms["new-avatar"]
const avatarURLInput = editAvatarForm.querySelector('.popup__input_type_url')

const popupNewCard = document.querySelector('.popup_type_new-card')
const newCardButtonOpen = document.querySelector('.profile__add-button')
const newCardButtonCloser = popupNewCard.querySelector('.popup__close')


const editProfileForm = document.forms["edit-profile"]
const nameInput = editProfileForm.querySelector('.popup__input_type_name')
const jobInput = editProfileForm.querySelector('.popup__input_type_description')

const placeFormElement = document.forms["new-place"];
const cardNameInput = placeFormElement.querySelector('.popup__input_type_card-name')
const cardLinkInput = placeFormElement.querySelector('.popup__input_type_url')

const popups =  document.querySelectorAll('.popup')

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
      container.append(createCard(cardInfo, cardInfo.owner._id, cardInfo.likes, openImage, userId))
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
    profileTitle.textContent = nameInput.value
    profileDescription.textContent = jobInput.value

    const submitButton = editProfileForm.querySelector('.popup__button')
    submitButton.textContent = "Сохранение...";

    sendUserInfo(nameInput.value, jobInput.value)
    .finally(() => {
      submitButton.textContent = "Сохранить";
      closePopup(popupEditProfile)
    })
}    
function submitCardForm(evt) {
    evt.preventDefault();

    const submitButton = placeFormElement.querySelector('.popup__button')
    

    sendCardInfo(cardNameInput.value, cardLinkInput.value)
    .then((cardInfo) => {
      container.prepend(createCard(cardInfo, cardInfo.owner._id, cardInfo.likes, openImage, userId))
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
      closePopup(popupNewCard)
    })
    evt.target.reset()
}

function submitAvatarForm(evt) {
  evt.preventDefault();
  avatar.style.backgroundImage = "url('" + avatarURLInput.value + "')"
  
  const submitButton = editProfileAvatar.querySelector('.popup__button')
  submitButton.textContent = "Сохранение...";

  sendAvatarUrl(avatarURLInput.value) 
  .finally(() => {
    submitButton.textContent = "Сохранить";
    closePopup(editProfileAvatar)
  })
  evt.target.reset()
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

cardLinkInput.addEventListener('input', function() {isValidUrl(placeFormElement, cardLinkInput)} )

setEventListeners(formElements)

