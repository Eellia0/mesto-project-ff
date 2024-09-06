export const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-21',
  headers: {
      authorization: 'fcf25225-ef51-4080-8b33-8c89c26ff6ce',
      'Content-Type': 'application/json'
  }
}

function getResponse(res) {
  if (res.ok) {
    return res.json();
}
return Promise.reject(`Ошибка: ${res.status}`)
}

export const getUserInfo = () => {
  return fetch(config.baseUrl + '/users/me', {
      headers: {
        authorization: 'fcf25225-ef51-4080-8b33-8c89c26ff6ce'
      }
    })
      .then(getResponse)
      .catch((err) => {
        console.log(err)
      })
}

export const getCards = () => {
  return fetch(config.baseUrl + '/cards', {
    headers: {
      authorization: 'fcf25225-ef51-4080-8b33-8c89c26ff6ce'
    }
    })
    .then(getResponse)
    .catch((err) => {
      console.log(err)
    })   
}

export const sendAvatarUrl = (avatarUrl) => {
  return fetch(config.baseUrl + '/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
  .then(getResponse)
  .catch((err) => {
    console.log(err)
  })
}

export const sendDeleteCard = (id) => {
  return fetch(config.baseUrl + '/cards/' + id, {
      method: 'DELETE',
      headers: config.headers
  })
  .then(getResponse)
  .catch((err) => {
    console.log(err)
  })
}

export const sendUserInfo = (userName, userAbout) => { 
  return fetch(config.baseUrl + '/users/me', {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name: userName,
    about: userAbout 
  })
  })
  .then(getResponse)
  .catch((err) => {
    console.log(err)
  })
}

export const sendCardInfo = (cardName, cardLink) => {
  return fetch(config.baseUrl + '/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink 
  })
  }) 
  .then(getResponse)
  .catch((err) => {
    console.log(err)
  })
}

export const setLike = (cardId) => {
  return fetch(config.baseUrl + '/cards/likes/' + cardId, {
    method: 'PUT',
    headers: config.headers
  })
  .then(getResponse)
  .catch((err) => {
    console.log(err)
  })
}

export const unLike = (cardId) => {
  return fetch(config.baseUrl + '/cards/likes/' + cardId, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(getResponse)
  .catch((err) => {
    console.log(err)
  })
}