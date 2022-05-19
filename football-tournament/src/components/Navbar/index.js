import { Link } from 'react-router-dom'
import './index.scss'

import Menu from '../Menu/index'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/' className='title'>
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Football_%28soccer_ball%29.svg/1928px-Football_%28soccer_ball%29.svg.png'/>
      </Link>

      <Menu />
    </nav>
  )
}

export default Navbar