const setMethod = method => async (url, {headers = {}, isJsonPayload = true, ...remaining}) => {
  const response = await fetch(url, {
    method,
    headers: {
      Accept: 'application/json',
      ...isJsonPayload && {'Content-Type': 'application/json'},
      ...headers,
    },
    ...remaining,
  })

  const result = await response.json()
  result.status = response.status
  return result
}

export const get = setMethod('get')
export const post = setMethod('post')
