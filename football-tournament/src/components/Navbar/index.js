import { Link } from 'react-router-dom'
import './index.scss'

import Menu from '../Menu/index'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Menu />
    </nav>
  )
}

export default Navbar