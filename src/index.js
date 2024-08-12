import './styles/index.css';
import './vendor/normalize.css'
import './scripts/cards.js'

import { closePopup, openPopup } from './scripts/modal.js';
import { showAllCards, createCard} from './scripts/cards.js';

export const template = document.getElementById('card-template');
export const container = document.querySelector(".places__list");

export const typeImage = document.querySelector('.popup_type_image')
export const image = typeImage.querySelector('.popup__image')
export const caption = typeImage.querySelector('.popup__caption')
export const typeImageCloser = typeImage.querySelector('.popup__close')

export const popupEditProfile = document.querySelector('.popup_type_edit')
export const editOpener = document.querySelector('.profile__edit-button')
export const editCloser = popupEditProfile.querySelector('.popup__close')

export const popupNewCard = document.querySelector('.popup_type_new-card')
export const newCardButtonOpen = document.querySelector('.profile__add-button')
export const newCardButtonCloser = popupNewCard.querySelector('.popup__close')

const formElements = document.querySelectorAll('.popup__form')
const editProfileForm = formElements[0]
export const nameInput = editProfileForm.querySelector('.popup__input_type_name')
export const jobInput = editProfileForm.querySelector('.popup__input_type_description')

const placeFormElement = formElements[1]
export const cardNameInput = placeFormElement.querySelector('.popup__input_type_card-name')
export const cardLinkInput = placeFormElement.querySelector('.popup__input_type_url')

const popups =  document.querySelectorAll('.popup')

popups.forEach((popup) => {
    popup.classList.add('popup_is-animated')
})


function submitEditForm(evt) {
    evt.preventDefault();
    document.querySelector('.profile__title').innerHTML = nameInput.value
    document.querySelector('.profile__description').innerHTML = jobInput.value
    closePopup(popupEditProfile)
}    
function submitCardForm(evt) {
    evt.preventDefault();
    var cardInfo = {name: cardNameInput.value, link: cardLinkInput.value}
    container.insertBefore(createCard(cardInfo), container.firstChild)
    closePopup(popupNewCard)
}

editOpener.addEventListener('click',() => { openPopup(popupEditProfile)})
editCloser.addEventListener('click',() => { closePopup(popupEditProfile)})

newCardButtonOpen.addEventListener('click',() => { openPopup(popupNewCard)})
newCardButtonCloser.addEventListener('click',() => { closePopup(popupNewCard)})

typeImageCloser.addEventListener('click', () => {closePopup(typeImage)} )

// Заполнение полей в первой форме по умолчанию

nameInput.value = document.querySelector('.profile__title').innerHTML;
jobInput.value = document.querySelector('.profile__description').innerHTML;

editProfileForm.addEventListener('submit', submitEditForm); 

popupNewCard.addEventListener('submit', submitCardForm)

showAllCards()