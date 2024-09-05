// Функция открытия
export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscape)
    popup.addEventListener('mousedown', handleOverlay)
    const formElement = popup.querySelector('.popup__form')
    if (formElement !== null) {
    const formInputs = formElement.querySelectorAll('.popup__input')
    formInputs.forEach((input) => {
        cleanClassList(formElement, input)
    })
}
}

// Функция закрытия
export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscape); 
    popup.removeEventListener('mousedown', handleOverlay)
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

function cleanClassList(formElement, inputElement) {
    if (inputElement.classList.contains('popup__input_type_error')) {
      inputElement.classList.remove('popup__input_type_error');
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      errorElement.classList.remove('form__input-error_active');
      errorElement.textContent = '';
  }
  }