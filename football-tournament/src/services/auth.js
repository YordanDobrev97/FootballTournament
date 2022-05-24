import { DEV_API } from '../utils/api'

export const authenticate = async (url, method, headers, data) => {
  const token = await fetch(`${DEV_API}/${url}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(data)
    })
  return token;
}