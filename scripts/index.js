// @todo: Темплейт карточки

const template = document.getElementById('card-template');

// @todo: DOM узлы

const container = document.querySelector(".places__list");

// @todo: Функция создания карточки
const open = document.querySelector(".profile__add-button");

open.addEventListener('click', function(){
    container.append(createCard(initialCards[0], deleteCard));
})

function createCard(cardInfo, deleteCallback){
    let item = template.content.cloneNode(true);
    item.querySelector(".card__image").src = cardInfo.link;
    item.querySelector(".card__image").alt = cardInfo.link;
    item.querySelector(".card__title").textContent = cardInfo.name;
    
    const deleteButton = item.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function(){
        item = deleteButton.closest('.places__item');   //Перезаписываем item, для этого задаю переменную через let, а не const
        deleteCallback(item);
    });
    return item;

}


// @todo: Функция удаления карточки

function deleteCard(card) {
    card.remove()
 }


// @todo: Вывести карточки на страницу

initialCards.forEach((elem) =>{
    let newCard = createCard(elem, deleteCard);
    container.append(newCard);
})

