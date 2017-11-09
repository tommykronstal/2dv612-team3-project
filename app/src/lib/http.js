const getHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
})

const setMethod = method => async (url, config = {}) => {
  const response = await fetch(url, {
    headers: getHeaders(),
    // Spreading out config to include it on request
    ...config,
  })
  // Catching error promise style since async returns promise.
  .catch(e => console.log(e))
  // parses response response before returning if neccessary
  return typeof response.json === 'function' ? response.json() : response
}

// import {post} from '[REPLACE_WITH_PATH]/http'
export const get = setMethod('get')

// import {post} from '[REPLACE_WITH_PATH]/http'
export const post = setMethod('post')
