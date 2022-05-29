import { DEV_API } from './api'
import { DEFAULT_HEADERS } from './headers'

export const api = {
  post: (url, data, headers = null) => {
    return fetch(`${DEV_API}/${url}`, {
      method: 'POST',
      headers: headers || DEFAULT_HEADERS,
      body: JSON.stringify(data)
    })
  },
  get: (url, headers = null) => {
    return fetch(`${DEV_API}/${url}`, {
      headers: headers || DEFAULT_HEADERS
    })
  },
  put: (url, data) => {
    return fetch(`${DEV_API}/${url}`, {
      method: 'PUT',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(data)
    })
  },
  delete: (url, id) => {
    return fetch(`${DEV_API}/${url}/${id}`, {
      method: 'DELETE'
    })
  }
}