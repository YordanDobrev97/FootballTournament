import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import Form from '../../components/Auth/Form'
import Input from '../../components/Auth/Input'
import { authenticate } from '../../services/auth'
import { DEFAULT_HEADERS } from '../../utils/headers'

import './index.scss'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [_, setCookie] = useCookies(['jwt'])

  const navigation = useNavigate()

  const onSubmit = async () => {
    try {
      const res = await authenticate('register', 'POST', DEFAULT_HEADERS, { username, password })
      const token = await res.json()
      setCookie('jwt', token)
      navigation('/')
    } catch (e) {
      setErrorMessage('Register failed')
    }
  }

  return (
    <div>
        <div className="container">
          <header className="head-form">
            <h2>Register</h2>
          </header>
          <Form>
            <Input
              label='Username'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              label='Password'
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={onSubmit} className='auth-btn'>Register</button>
          </Form>

          {errorMessage && (
            <div className='error'>{errorMessage}</div>
        )}
        </div>
    </div>
  )
}

export default Register