import { useState } from 'react'
import AuthForm from '../../components/Auth/AuthForm'

import './index.scss'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const usernameHandler = (value) => {
    setUsername(value)
  }

  const passwordHandler = (value) => {
    setPassword(value)
  }

  const onRegister = (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <form>
        <div className="container">
          <header className="head-form">
            <h2>Register</h2>
          </header>
          <AuthForm usernameHandler={usernameHandler} passwordHandler={passwordHandler}>
            <button onClick={onRegister} className="auth-btn">Register</button>
          </AuthForm>
        </div>
      </form>
    </div>
  )
}

export default Register