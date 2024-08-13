import './styles/index.css';
import './vendor/normalize.css'
import './scripts/cards.js'

import { closePopup, openPopup } from './scripts/modal.js';
import { createCard, typeImage } from './scripts/cards.js';
import { initialCards } from './scripts/initialCards.js';

const container = document.querySelector(".places__list");

const typeImageCloser = typeImage.querySelector('.popup__close')

const popupEditProfile = document.querySelector('.popup_type_edit')
const editOpener = document.querySelector('.profile__edit-button')
const editCloser = popupEditProfile.querySelector('.popup__close')

const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
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

popups.forEach((popup) => {
    popup.classList.add('popup_is-animated')
})

function submitEditForm(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value
    profileDescription.textContent = jobInput.value
    closePopup(popupEditProfile)
}    
function submitCardForm(evt) {
    evt.preventDefault();
    const cardInfo = {name: cardNameInput.value, link: cardLinkInput.value}
    container.insertBefore(createCard(cardInfo), container.firstChild)
    evt.target.reset()
    closePopup(popupNewCard)
}

editOpener.addEventListener('click',() => { 
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupEditProfile)
})

editCloser.addEventListener('click',() => { closePopup(popupEditProfile)})

newCardButtonOpen.addEventListener('click',() => { openPopup(popupNewCard)})
newCardButtonCloser.addEventListener('click',() => { closePopup(popupNewCard)})
typeImageCloser.addEventListener('click', () => {closePopup(typeImage)} )

editProfileForm.addEventListener('submit', submitEditForm); 
placeFormElement.addEventListener('submit', submitCardForm)

function showAllCards() {
    initialCards.forEach((elem) =>{
      container.append(createCard(elem));
  })}
showAllCards()