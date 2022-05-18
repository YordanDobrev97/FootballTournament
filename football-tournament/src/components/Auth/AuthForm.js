import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faUserCircle } from '@fortawesome/free-solid-svg-icons'

const AuthForm = ({ children, usernameHandler, passwordHandler }) => {
  return (
    <div className="field-set">
      <div className='row'>
        <span className="input-item">
          <FontAwesomeIcon icon={faUserCircle} />
        </span>
        <input onChange={(value) => usernameHandler(value.target.value)} className="form-input" id="txt-input" type="text" placeholder="Username" required />
      </div>

      <div className='row'>
        <span className="input-item">
          <FontAwesomeIcon icon={faKey} />
        </span>
        <input onChange={(value) => passwordHandler(value.target.value)} className="form-input" type="password" placeholder="Password" id="pwd" name="password" required />
      </div>
      {children}
    </div>
  )
}

export default AuthForm