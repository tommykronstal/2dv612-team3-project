const TOKEN_ID = 'TOKEN_ID'

const parseJwt = token => token ?
  JSON.parse(window.atob(token
    .split('.')[1]
    .replace('-', '+')
    .replace('_', '/')
  )) : {}

export const storeJwtToken = token => sessionStorage.setItem(TOKEN_ID, token)

export const getJwtToken = () => sessionStorage.getItem(TOKEN_ID)

export const resetJwtToken = () => sessionStorage.removeItem(TOKEN_ID)

export const getPayloadFromJwtToken = token => parseJwt(token)
