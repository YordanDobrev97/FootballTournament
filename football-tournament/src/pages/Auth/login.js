import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import Form from '../../components/Auth/Form'
import Input from '../../components/Auth/Input'
import { authenticate } from '../../services/auth'
import { DEFAULT_HEADERS } from '../../components/utils/headers'
import AuthContext from '../../context/AuthContext'

import './index.scss'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [_, setCookie] = useCookies(['jwt'])

  const context = useContext(AuthContext)
  const navigation = useNavigate()

  const onSubmit = async () => {
    try {
      const res = await authenticate('login', 'POST', DEFAULT_HEADERS, { username, password })
      const token = await res.json()
      setCookie('jwt', token)
      context.setAuthenticated(true)
      navigation('/')
    } catch (error) {
      setErrorMessage('Login failed')
    }
  }

  return (
    <div>
      <div className="container">
        <header className="head-form">
          <h2>Login</h2>
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
          <button onClick={onSubmit} className='auth-btn'>Login</button>
        </Form>

        {errorMessage && (
          <div className='error'>{errorMessage}</div>
        )}
      </div>
    </div>
  )
}

export default Login