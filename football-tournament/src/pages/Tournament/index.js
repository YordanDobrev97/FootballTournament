import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useCookies } from 'react-cookie'
import { api } from "../../utils/request"
import parseJwt  from '../../utils/jwtParser'

import "./index.scss"

const Tournament = () => {
  const [tournaments, setTournaments] = useState([]);
  const [cookies] = useCookies(['jwt'])
  const user = parseJwt(cookies?.jwt)

  useEffect(() => {
    api
      .get("tournaments/all")
      .then((r) => r.json())
      .then((data) => {
        setTournaments(data);
      });
  }, []);
  return (
    <div>
     {user.IsInRole == 'True' &&  <div className="create-tournament-btn">
        <Link to="/tournaments/create">Create Tournament</Link>
      </div>}

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
          {tournaments &&
            tournaments.map((tournament) => {
              return (
                <tr>
                  <td>{tournament.name}</td>
                  <td>
                    <img className='country-flag' src={tournament.country} alt="country-flag"/>
                  </td>
                  <td>{tournament.startDate}</td>
                  <td>{tournament.endDate}</td>
                  <td>
                    <button>Details</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tournament;
