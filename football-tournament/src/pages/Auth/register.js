import { useState } from 'react'
import Form from '../../components/Auth/Form'
import Input from '../../components/Auth/Input'

import { auth } from '../../components/services/auth'
import { DEFAULT_HEADERS } from '../../components/utils/headers'

import './index.scss'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async () => {
    const token = await auth('register', 'POST', DEFAULT_HEADERS, {username, password})
    console.log(token)
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
        </div>
    </div>
  )
}

export default Register