const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'form__input-error_active'
}

export const formElements = document.querySelectorAll(validationSettings.formSelector)

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
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationSettings.errorClass);
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.classList.remove(validationSettings.errorClass);
    errorElement.textContent = '';
};

const disableSubmitButton = (formElement) => {
    const submitButton = formElement.querySelector(validationSettings.submitButtonSelector)
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add(validationSettings.inactiveButtonClass)
}

const enableSubmitButton = (formElement) => {
    const submitButton = formElement.querySelector(validationSettings.submitButtonSelector)
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove(validationSettings.inactiveButtonClass)
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

export const setEventListeners = (formElements) => {
    formElements.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        isValid(formElement, inputElement);
      });
    });
  })
  };

  function hideError(formElement, inputElement) {
    if (inputElement.classList.contains(validationSettings.inputErrorClass)) {
      inputElement.classList.remove(validationSettings.inputErrorClass);
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      errorElement.classList.remove(validationSettings.errorClass);
      errorElement.textContent = '';
  }
  }

export function deleteError() {
  formElements.forEach((formElement) => {
      const formInputs = formElement.querySelectorAll(validationSettings.inputSelector)
      formInputs.forEach((input) => {
          hideError(formElement, input)
      })
  })
}