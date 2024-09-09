

const template = document.getElementById('card-template');
export const profileTitle = document.querySelector('.profile__title')
export const profileDescription = document.querySelector('.profile__description')
export const avatar = document.querySelector('.profile__image')
export const container = document.querySelector(".places__list");


export function createCard(cardInfo, openImageFunction, userId, deleteCallback, addLikeFunction, removeLikeFunction){
  const item = template.content.cloneNode(true);
  const cardImage = item.querySelector(".card__image")
  const likesCounter = item.querySelector('.like_counter')
  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.link;
  item.querySelector(".card__title").textContent = cardInfo.name;
    likesCounter.textContent = cardInfo.likes.length
    
  cardImage.addEventListener('click', () => {
    openImageFunction(cardInfo)
  })
  const deleteButton = item.querySelector('.card__delete-button');
  if (cardInfo.owner._id === userId) {
  
  deleteButton.addEventListener('click', function(){
      const cardClose = deleteButton.closest('.places__item');   
      deleteCallback(cardClose, cardInfo._id);

  });} 
  else 
  (deleteButton.style.display = "none")

  const heart = item.querySelector('.card__like-button')
  cardInfo.likes.forEach((like) => {
    if (like._id === userId) {
      heart.classList.add('card__like-button_is-active')
      
    }
  })
  heart.addEventListener('click', () => {
    if (heart.classList.contains('card__like-button_is-active')) {
      removeLikeFunction(heart, cardInfo._id)
    }
    else {
      addLikeFunction(heart, cardInfo._id)
    }
  })
  
  return item;
}

 export function deleteCard(card) {
  card.remove()
}







