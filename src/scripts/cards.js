
import { openPopup, closePopup } from "./modal";
import { sendDeleteCard, setLike, unLike } from "../scripts/api.js"
export const typeImage = document.querySelector('.popup_type_image')

const template = document.getElementById('card-template');
export const profileTitle = document.querySelector('.profile__title')
export const profileDescription = document.querySelector('.profile__description')
export const avatar = document.querySelector('.profile__image')
export const container = document.querySelector(".places__list");
export const popupRequire = document.querySelector('.popup_type_require')
export const requireCloser = popupRequire.querySelector('.popup__close')
const requireSubmit = popupRequire.querySelector('.popup__button')

export function createCard(cardInfo, ownerId, likes, openImageFunction, userId){
  const item = template.content.cloneNode(true);
  const cardImage = item.querySelector(".card__image")
  const likesCounter = item.querySelector('.like_counter')
  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.link;
  item.querySelector(".card__title").textContent = cardInfo.name;
    likesCounter.textContent = likes.length
    
  cardImage.addEventListener('click', () => {
    openImageFunction(cardInfo)
  })
  const deleteButton = item.querySelector('.card__delete-button');
  if (ownerId === userId) {
  
  deleteButton.addEventListener('click', function(){
      const cardClose = deleteButton.closest('.places__item');   
      forDelete(cardClose, cardInfo._id);

  });} 
  else 
  (deleteButton.style.display = "none")

  const heart = item.querySelector('.card__like-button')
  likes.forEach((like) => {
    if (like._id === userId) {
      heart.classList.add('card__like-button_is-active')
      
    }
  })
  heart.addEventListener('click', () => {
    if (heart.classList.contains('card__like-button_is-active')) {
      removeLike(heart, cardInfo._id)
      likesCounter.textContent = Number(likesCounter.textContent) - 1
    }
    else {
      addLike(heart, cardInfo._id)
      likesCounter.textContent = Number(likesCounter.textContent) + 1
    }
  })

  
  return item;
}

 export function deleteCard(card) {
  card.remove()
}

function like(button) {
  button.classList.toggle("card__like-button_is-active");
}

export function addLike(button, id) {
  setLike(id)
  .then(() => {
    button.classList.add('card__like-button_is-active')
  })
}

export function removeLike(button, id) {
  unLike(id)
  .then(() => {
    button.classList.remove('card__like-button_is-active')
  })
}

function forDelete(card, id) {
  openPopup(popupRequire)
  requireSubmit.addEventListener('click', () => {
  deleteCard(card)
  sendDeleteCard(id)
  closePopup(popupRequire)
})
}



