import parseJwt  from '../../utils/jwtParser'
import './index.scss'
import { useCookies } from 'react-cookie'

const Home = () => {
  const [cookies] = useCookies(['jwt'])
  const user = parseJwt(cookies?.jwt)
  return (
    <div className='home-section'>
      <div className='center-box'>
        {user ? (
          <h1 className='main-head'>Hello, {user.username}</h1>
        ) : (
          <h1 className='learn-more'>Learn more</h1>
        )}
        
      </div>
    </div>
  )
}

export default Home