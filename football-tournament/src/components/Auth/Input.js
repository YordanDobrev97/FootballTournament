import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faUserCircle } from '@fortawesome/free-solid-svg-icons'

const Input = ({ label, id, value, onChange, type = 'text' }) => {
  return (
    <div className='row'>
        <input type={type} id={id} value={value} placeholder={label} onChange={onChange} className="form-input" required />
    </div>
  )
}

export default Input