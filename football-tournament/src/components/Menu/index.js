import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import parseJwt from '../../utils/jwtParser'
import AuthContext from '../../context/AuthContext'

const Menu = () => {
  const context = useContext(AuthContext)
  const [cookies, _, removeCookie] = useCookies(['jwt'])
  const user = parseJwt(cookies?.jwt)
  const navigation = useNavigate()
  
  const logOut = () => {
    context.setAuthenticated(false)
    removeCookie('jwt')
    navigation('/home')
  }

  return (
    <ul className={`nav-items`}>
      <li className='nav-item'>
        <Link to='home'>Home</Link>
      </li>

      {context.isAuthenticated ? (
        <>
          <li className='nav-item'>
            <Link to='tournaments/all'>Tournaments</Link>
          </li>

          <li className='nav-item'>
            <Link to='teams/all'>Teams</Link>
          </li>

          <li className='nav-item'>
            <Link to='/'>Statistics</Link>
          </li>
          {user.IsInRole == 'True' &&  <li className='nav-item'>
            <Link to='/administration'>Administration</Link>
          </li>}
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