import { DEV_API } from '../utils/api'

export const auth = async (url, method, headers, data) => {
  const token = await fetch(`${DEV_API}/${url}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(data)
    }).then(r => r.json())
  return token;
}