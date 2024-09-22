const showInputError = (formElement, inputElement, errorMessage, validationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationSettings.errorClass);
};

const hideInputError = (formElement, inputElement, validationSettings) => {
const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
inputElement.classList.remove(validationSettings.inputErrorClass);
errorElement.classList.remove(validationSettings.errorClass);
errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, validationSettings) => {
if (!inputElement.validity.valid) {                 
  let errorMessage = inputElement.validity.patternMismatch ? inputElement.dataset.errorMessage : inputElement.validationMessage
    showInputError(formElement, inputElement, errorMessage, validationSettings);
} else {
    hideInputError(formElement, inputElement, validationSettings);
}
};

const setEventListeners = (formElement, validationSettings) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement, validationSettings);

  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationSettings);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement ,validationSettings);
      });
  });
};

export function enableValidation(validationSettings) {
const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    });
    setEventListeners(formElement, validationSettings);
}); 
};

const hasInvalidInput = (inputList) => {
return inputList.some((inputElement) => {
return !inputElement.validity.valid;
}); 
}
const toggleButtonState = (inputList, buttonElement, validationSettings) => {
if (hasInvalidInput(inputList)) {
buttonElement.classList.add(validationSettings.inactiveButtonClass);
} else {
buttonElement.classList.remove(validationSettings.inactiveButtonClass);
} 
}; 


export function clearValidation(formElement, validationSettings) {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector))
    const submitButton = formElement.querySelector(validationSettings.submitButtonSelector);
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, validationSettings)
    })
    toggleButtonState(inputList, submitButton, validationSettings)
  }