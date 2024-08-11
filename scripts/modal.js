import { popupEditProfile, popupNewCard, nameInput, jobInput, cardLinkInput, cardNameInput, container } from "../index.js";
import { createCard } from "./cards.js";

// Функция открытия
export function popupOpen(popup) {
    popup.classList.add('popup_is-opened');
}

// Функция закрытия
export function popupClose(popup) {
    popup.classList.remove('popup_is-opened');
}

export function editFormSubmit(evt) {
    evt.preventDefault();
    document.querySelector('.profile__title').innerHTML = nameInput.value
    document.querySelector('.profile__description').innerHTML = jobInput.value
    popupClose(popupEditProfile)
}    

export function cardFormSubmit(evt) {
    evt.preventDefault();
    var cardInfo = {name: cardNameInput.value, link: cardLinkInput.value}
    container.insertBefore(createCard(cardInfo), container.firstChild)
    popupClose(popupNewCard)
}
