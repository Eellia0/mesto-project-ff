export const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-21',
    headers: {
        authorization: 'fcf25225-ef51-4080-8b33-8c89c26ff6ce',
        'Content-Type': 'application/json'
    }
}

export const getUserInfo = () => {
    return fetch(config.baseUrl + '/users/me', {
        headers: {
          authorization: 'fcf25225-ef51-4080-8b33-8c89c26ff6ce'
        }
      })
        .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    })
}

export const getCards = () => {
    return fetch(config.baseUrl + '/cards', {
        headers: {
          authorization: 'fcf25225-ef51-4080-8b33-8c89c26ff6ce'
        }
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
}

export const sendAvatarUrl = (avatarUrl) => {
    return fetch(config.baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          avatar: avatarUrl
        })
    });
}

export const sendDeleteCard = (id) => {
    return fetch(config.baseUrl + '/cards/' + id, {
        method: 'DELETE',
        headers: config.headers
    })
}

export const sendUserInfo = ( userName, userAbout) => { 
    fetch(config.baseUrl + '/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout 
    })
    }); 
}

export const sendCardInfo = (cardName, cardLink) => {
    fetch(config.baseUrl + '/cards', {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink 
    })
    }) 
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    })
}
