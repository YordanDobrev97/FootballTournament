import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <ul className={`nav-items`}>
      <li className='nav-item'>
        <Link to='/'>Home</Link>
      </li>

      <li className='nav-item'>
        <Link to='/login'>Login</Link>
      </li>

      <li className='nav-item'>
        <Link to='/register'>Register</Link>
      </li>
    </ul>
  )
}

export default Menu