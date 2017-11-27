const getHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
})

const setMethod = method => async (url, {headers, ...remaining} = {}) => {
  const response = await fetch(url, {
    method,
    headers: {
      ...getHeaders(),
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