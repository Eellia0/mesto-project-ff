import { validationSettings } from "./validationSettings";

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

export const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.classList.remove(validationSettings.errorClass);
    errorElement.textContent = '';
};

export const disableSubmitButton = (submitButton) => {
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add(validationSettings.inactiveButtonClass)
}

const enableSubmitButton = (submitButton) => {
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove(validationSettings.inactiveButtonClass)
}

export const setEventListeners = () => {
  const formElements = document.querySelectorAll(validationSettings.formSelector)
    formElements.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        isValid(formElement, inputElement);
      });
    });
  })
  };

export function deleteError() {
  formElements.forEach((formElement) => {
      const formInputs = formElement.querySelectorAll(validationSettings.inputSelector)
      formInputs.forEach((input) => {
          hideInputError(formElement, input)
      })
  })
}