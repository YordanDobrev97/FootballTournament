import { useContext } from 'react'
import { Link } from 'react-router-dom'

import AuthContext from '../../context/AuthContext'

const Menu = () => {
  const context = useContext(AuthContext)
  return (
    <ul className={`nav-items`}>
      <li className='nav-item'>
        <Link to='/'>Home</Link>
      </li>

      {context.isAuthenticated ? (
        <>
          <li className='nav-item'>
            <Link to='/'>Tournaments</Link>
          </li>

          <li className='nav-item'>
            <Link to='/'>Statistics</Link>
          </li>
          <li className='nav-item'>
            <Link to='/'>LogOut</Link>
          </li>
        </>
      ) : (
        <>
          <li className='nav-item'>
            <Link to='/login'>Login</Link>
          </li>

          <li className='nav-item'>
            <Link to='/register'>Register</Link>
          </li>
        </>
      )}
    </ul>
  )
}

export default Menu