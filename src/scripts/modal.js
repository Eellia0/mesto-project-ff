
// Функция открытия
export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscape)
    popup.addEventListener('mousedown', handleOverlay)
}

// Функция закрытия
export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscape); 
    popup.removeEventListener('mousedown', handleOverlay)
    // const submitButton = popup.querySelector('.popup__button')
    //     submitButton.removeEventListener('click', )
}

function handleEscape(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened')
        closePopup(openedPopup);
    }
}

function handleOverlay(evt) {
    if (evt.currentTarget === evt.target) {
        closePopup(evt.currentTarget);
    }
}

