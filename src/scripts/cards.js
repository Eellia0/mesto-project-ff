export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

import { template, container, image, caption, typeImage } from "../index.js";
import { openPopup } from "./modal.js";

export function createCard(cardInfo, deleteCallback = deleteCard, likeFunction = like, openImageFunction = openImage){
  const item = template.content.cloneNode(true);
  item.querySelector(".card__image").src = cardInfo.link;
  item.querySelector(".card__image").alt = cardInfo.link;
  item.querySelector(".card__title").textContent = cardInfo.name;
  
  item.querySelector(".card__image").addEventListener('click', () => {
      openImageFunction(cardInfo)
  })

  const deleteButton = item.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function(){
      const cardClose = deleteButton.closest('.places__item');   
      deleteCallback(cardClose);
  });

  const heart = item.querySelector('.card__like-button')
  heart.addEventListener('click', () => {likeFunction(heart)})
  
  return item;
}

 export function deleteCard(card) {
  card.remove()
}

export function showAllCards() {
  initialCards.forEach((elem) =>{
    const newCard = createCard(elem);
    container.append(newCard);
})}

function like(obj) {
  if (obj.classList.contains('card__like-button_is-active')) 
      obj.classList.remove('card__like-button_is-active')
  else obj.classList.add('card__like-button_is-active')
}

function openImage(cardInfo) {
  image.src = cardInfo.link
  image.alt = cardInfo.link
  caption.innerHTML = cardInfo.name
  openPopup(typeImage)
}
