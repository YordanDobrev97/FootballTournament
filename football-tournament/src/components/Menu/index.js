import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import AuthContext from '../../context/AuthContext'

const Menu = () => {
  const context = useContext(AuthContext)
  const [removeCookie] = useCookies(['jwt'])
  const navigation = useNavigate()

  const logOut = () => {
    context.setAuthenticated(false)
    removeCookie('jwt')
    navigation('/')
  }

  return (
    <ul className={`nav-items`}>
      <li className='nav-item'>
        <Link to='/'>Home</Link>
      </li>

      {context.isAuthenticated ? (
        <>
          <li className='nav-item'>
            <Link to='/tournaments'>Tournaments</Link>
          </li>

          <li className='nav-item'>
            <Link to='/'>Statistics</Link>
          </li>
          <li className='nav-item'>
            <button className='logout-btn' onClick={logOut}>LogOut</button>
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