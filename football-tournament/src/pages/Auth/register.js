import { useState } from 'react'
import Form from '../../components/Auth/Form'
import Input from '../../components/Auth/Input'

import './index.scss'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async () => {
    const token = await fetch('https://localhost:44379/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true
      },
      body: JSON.stringify({
        username,
        password
      })
    }).then(r => r.json())

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