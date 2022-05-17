import { Link } from 'react-router-dom'
import './index.scss'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/' className='title'>
        <span className='foot'>Foot</span>
        <span className='ball'>ball</span>
      </Link>
      <ul className='nav-items'>
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
    </nav>
  )
}

export default Navbar