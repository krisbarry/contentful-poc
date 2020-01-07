import axios from 'axios'

export const getOptions = (options) => {
  return {
    url: options.url,
    data: options.data || null,
    json: options.json || true,
    headers: options.headers || {},
    method: options.method || 'get',
    transformResponse: options.transformResponse && [].concat(
      axios.defaults.transformResponse, options.transformResponse) || null
  }
}
