import { userId } from "../index"
import { openPopup } from "./modal";

export const typeImage = document.querySelector('.popup_type_image')

const template = document.getElementById('card-template');
const image = typeImage.querySelector('.popup__image')
const caption = typeImage.querySelector('.popup__caption')

function openImage(cardInfo) {
  image.src = cardInfo.link
  image.alt = cardInfo.name
  caption.textContent = cardInfo.name
  openPopup(typeImage)
}

export function createCard(cardInfo, ownerId, likes, deleteCallback, addLikeFunction, removeLikeFunction, openImageFunction = openImage){
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
      deleteCallback(cardClose, cardInfo.id);

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
    if (heart.classList.contains('card__like-button_is-active'))
      removeLikeFunction(heart, cardInfo.id)
    else {
      addLikeFunction(heart, cardInfo.id)
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
  button.classList.add('card__like-button_is-active')
  fetch('https://nomoreparties.co/v1/wff-cohort-21/cards/likes/'+id, {
    method: 'PUT',
    headers: {
    authorization: 'fcf25225-ef51-4080-8b33-8c89c26ff6ce',
    'Content-Type': 'application/json'
  }
  })
}

export function removeLike(button, id) {
  button.classList.remove('card__like-button_is-active')
  fetch('https://nomoreparties.co/v1/wff-cohort-21/cards/likes/'+id, {
    method: 'DELETE',
    headers: {
    authorization: 'fcf25225-ef51-4080-8b33-8c89c26ff6ce',
    'Content-Type': 'application/json'
  }
  })
}