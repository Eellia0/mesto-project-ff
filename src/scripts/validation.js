export const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      if (inputElement.validity.patternMismatch){
      showInputError(formElement, inputElement, inputElement.dataset.errorMessage);
      } else {
        showInputError(formElement, inputElement, inputElement.validationMessage)
      }
      disableSubmitButton(formElement)
    } else {
      hideInputError(formElement, inputElement);
      enableSubmitButton(formElement)
    }
};

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};

const disableSubmitButton = (formElement) => {
    const submitButton = formElement.querySelector('.popup__button')
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add('popup__button_inactive')
}

const enableSubmitButton = (formElement) => {
    const submitButton = formElement.querySelector('.popup__button')
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove('popup__button_inactive')
}

export const isValidUrl = (formElement, inputElement) => {
    try {
        new URL(inputElement.value);
          hideInputError(formElement, inputElement);
          enableSubmitButton(formElement)
    } catch (err) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
        disableSubmitButton(formElement)
    }
  }