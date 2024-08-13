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

export function createCard(cardInfo, deleteCallback = deleteCard, likeFunction = like, openImageFunction = openImage){
  const item = template.content.cloneNode(true);
  const cardImage = item.querySelector(".card__image")
  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.link;
  item.querySelector(".card__title").textContent = cardInfo.name;
  
  cardImage.addEventListener('click', () => {
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

function like(button) {
  button.classList.toggle("card__like-button_is-active");
}