import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit } from "@fortawesome/free-solid-svg-icons"
import './index.scss'

const UserProfile = () => {
  return (
    <div className='profile-container'>
      <div className='left-aside'>
        <img src='https://icons-for-free.com/download-icon-business+costume+male+man+office+user+icon-1320196264882354682_512.png' alt='profileImage'/>
        <FontAwesomeIcon icon={faEdit}/>
      </div>

      <div className='info-container'>
        <h3>Information</h3>

        <form>
          <div className='row'>
            <label>Username</label>
            <input type='text' value={'yordan19'}/>
          </div>

          <div className='row'>
            <label>Rating</label>
            <input type='number' value={10}/>
          </div>

          <div className='row'>
            <label>Goals</label>
            <p>875</p>
          </div>

          <div className='row'>
            <button className='update-btn'>Update</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserProfile