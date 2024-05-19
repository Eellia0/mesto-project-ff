// @todo: Темплейт карточки

const template = document.getElementById('card-template');

// @todo: DOM узлы

const container = document.querySelector(".places__list");

// @todo: Функция создания карточки
const open = document.querySelector(".profile__add-button");

open.addEventListener ('click', function() {
    const cardsList = document.querySelectorAll('.card__title');
    let newCard = null;

    initialCards.forEach((initialCard) => {
        let cardExists = true;
        cardsList.forEach((card_list_item) => {
            if (initialCard.name === card_list_item.textContent) {
                cardExists = false;
            }
        })

        if (cardExists)
            newCard = initialCard;
    })

    if (newCard) {
    const item = template.content.cloneNode(true);
    item.querySelector(".card__image").src = newCard.link;
    item.querySelector(".card__title").textContent = newCard.name;
    container.append(item);
    }

    card_delete_listeners();

});

initialCards.forEach((elem) =>{
    const item = template.content.cloneNode(true);
    item.querySelector(".card__image").src = elem.link;
    item.querySelector(".card__title").textContent = elem.name;
    container.append(item);

});

// @todo: Функция удаления карточки
function card_delete_listeners(){
const deleteButtons = document.querySelectorAll('.card__delete-button');

deleteButtons.forEach((deleteButton) =>{
    deleteButton.addEventListener('click', function() {
    const listItem = deleteButton.closest('.places__item');
    listItem.remove();
})
})
}
card_delete_listeners()



// @todo: Вывести карточки на страницу


