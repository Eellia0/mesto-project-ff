
const isValid = (formElement, inputElement, submitButton, validationSettings) => {
    if (!inputElement.validity.valid) {
      if (inputElement.validity.patternMismatch){
      showInputError(formElement, inputElement, inputElement.dataset.errorMessage, validationSettings);
      } else {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings)
      }
      disableSubmitButton(submitButton, validationSettings)
    } else {
      hideInputError(formElement, inputElement, validationSettings);
      enableSubmitButton(submitButton, validationSettings)
    }
};

const showInputError = (formElement, inputElement, errorMessage, validationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationSettings.errorClass);
};

export const hideInputError = (formElement, inputElement, validationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.classList.remove(validationSettings.errorClass);
    errorElement.textContent = '';
};

export const disableSubmitButton = (submitButton, validationSettings) => {
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add(validationSettings.inactiveButtonClass)
}

const enableSubmitButton = (submitButton, validationSettings) => {
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove(validationSettings.inactiveButtonClass)
}

export const setEventListeners = (validationSettings) => {
  const formElements = document.querySelectorAll(validationSettings.formSelector)
    formElements.forEach((formElement) => {
    const submitButton = formElement.querySelector(validationSettings.submitButtonSelector)
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        isValid(formElement, inputElement, submitButton, validationSettings);
      });
    });
  })
  };

export function deleteError(validationSettings) {
  formElements.forEach((formElement) => {
      const formInputs = formElement.querySelectorAll(validationSettings.inputSelector)
      formInputs.forEach((input) => {
          hideInputError(formElement, input)
      })
  })
}

export function enableValidation(validationSettings) {
    setEventListeners(validationSettings);
}

export function clearValidation(formElement, validationSettings) {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector))
  const submitButton = formElement.querySelector(validationSettings.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationSettings)
  })
  disableSubmitButton(submitButton, validationSettings)
}