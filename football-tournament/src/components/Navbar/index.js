import { Link } from 'react-router-dom'
import './index.scss'

import Menu from '../Menu/index'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/' className='title'>
        <span className='foot'>Foot</span>
        <span className='ball'>ball</span>
      </Link>

      <Menu />
    </nav>
  )
}

export default Navbar