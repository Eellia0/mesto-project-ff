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
      headers: config.headers
    })
      .then(getResponse)
}

export const getCards = () => {
  return fetch(config.baseUrl + '/cards', {
    headers: config.headers
    })
    .then(getResponse)
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
}

export const sendDeleteCard = (id) => {
  return fetch(config.baseUrl + '/cards/' + id, {
      method: 'DELETE',
      headers: config.headers
  })
  .then(getResponse)
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
}

export const setLikeRequest = (cardId) => {
  return fetch(config.baseUrl + '/cards/likes/' + cardId, {
    method: 'PUT',
    headers: config.headers
  })
  .then(getResponse)
}

export const unLikeRequest = (cardId) => {
  return fetch(config.baseUrl + '/cards/likes/' + cardId, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(getResponse)
}