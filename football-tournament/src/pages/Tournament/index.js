import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import ClipLoader from 'react-spinners/ClipLoader'
import { api } from '../../utils/request'
import parseJwt from '../../utils/jwtParser'

import './index.scss'

const Tournament = () => {
  const [tournaments, setTournaments] = useState([])
  const [loading, setLoading] = useState(false)
  const [cookies] = useCookies(['jwt'])
  const user = parseJwt(cookies?.jwt)

  useEffect(() => {
    setLoading(true)

    api
      .get('tournaments/all')
      .then((r) => r.json())
      .then((data) => {
        setLoading(false)
        setTournaments(data)
      });
  }, []);
  return (
    <div>
      {user.IsInRole == 'True' && (
        <div className='create-tournament-btn'>
          <Link to='/tournaments/create'>Create Tournament</Link>
        </div>
      )}

      <div>
        <table>
          <thead>
            <th>Name</th>
            <th>Country</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Action</th>
          </thead>

          <tbody>
            {loading ? (
              <div className='loader'>
                <ClipLoader color='#ffff' loading={loading} size={150} />
              </div>
            ) : (
              tournaments.map((tournament) => {
                return (
                  <tr>
                    <td>{tournament.name}</td>
                    <td>
                      <img
                        className='country-flag'
                        src={tournament.country}
                        alt='country-flag'
                      />
                    </td>
                    <td>{tournament.startDate}</td>
                    <td>{tournament.endDate}</td>
                    <td>
                      <button>Details</button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tournament;
