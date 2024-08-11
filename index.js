import './styles/index.css';
import './vendor/normalize.css'
import './scripts/cards.js'

import { popupClose, popupOpen, editFormSubmit, cardFormSubmit } from './scripts/modal.js';
import { showAllCards, initialCards} from './scripts/cards.js';

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

// Закрытие нажатием на Ecspe

document.addEventListener('keydown', function(evt) {
    if (evt.key === "Escape") {
        popupClose(popupEditProfile);
        popupClose(popupNewCard);
        popupClose(typeImage);
    }
});

popupEditProfile.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target)
        popupClose(popupEditProfile);
});
editOpener.addEventListener('click',() => { popupOpen(popupEditProfile)})
editCloser.addEventListener('click',() => { popupClose(popupEditProfile)})

popupNewCard.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) 
       popupClose(popupNewCard);
});
newCardButtonOpen.addEventListener('click',() => { popupOpen(popupNewCard)})
newCardButtonCloser.addEventListener('click',() => { popupClose(popupNewCard)})

typeImage.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) 
       popupClose(typeImage);
});
typeImageCloser.addEventListener('click', () => {popupClose(typeImage)} )

// Заполнение полей в первой форме по умолчанию

nameInput.value = document.querySelector('.profile__title').innerHTML;
jobInput.value = document.querySelector('.profile__description').innerHTML;

editProfileForm.addEventListener('submit', editFormSubmit); 

popupNewCard.addEventListener('submit', cardFormSubmit)

showAllCards()