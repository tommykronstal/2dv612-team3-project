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

  // parses response response before returning if neccessary
  return typeof response.json === 'function' ? response.json() : response
}

// import {post} from '[REPLACE_WITH_PATH]/http'
export const get = setMethod('get')

// import {post} from '[REPLACE_WITH_PATH]/http'
export const post = setMethod('post')

/**
 * can export more functions here if we need for example put, patch, etc...
 */
