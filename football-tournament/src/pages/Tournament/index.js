import { Link, Outlet } from 'react-router-dom'
import './index.scss'

const Tournament = () => {
  return (
    <div>
      <div className='create-tournament-btn'>
        <Link to='/tournaments/create'>Create Tournament</Link>
      </div>

      <div>
        <table className="responstable">
          <tr>
            <th>Main driver</th>
            <th data-th="Driver details"><span>First name</span></th>
            <th>Surname</th>
            <th>Date of birth</th>
            <th>Relationship</th>
          </tr>

          <tr>
            <td><input type="radio" /></td>
            <td>Steve</td>
            <td>Foo</td>
            <td>01/01/1978</td>
            <td>Policyholder</td>
          </tr>

          <tr>
            <td><input type="radio" /></td>
            <td>Steffie</td>
            <td>Foo</td>
            <td>01/01/1978</td>
            <td>Spouse</td>
          </tr>

          <tr>
            <td><input type="radio" /></td>
            <td>Stan</td>
            <td>Foo</td>
            <td>01/01/1994</td>
            <td>Son</td>
          </tr>

          <tr>
            <td><input type="radio" /></td>
            <td>Stella</td>
            <td>Foo</td>
            <td>01/01/1992</td>
            <td>Daughter</td>
          </tr>

        </table>
      </div>
    </div>
  )
}

export default Tournament