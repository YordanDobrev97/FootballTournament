import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../utils/request'

import './index.scss'

const Team = () => {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    api.get('teams/all').then(r => r.json())
    .then((data) => {
      console.log(data)
      setTeams(data)
    })
  }, [])

  return (
    <div className='team-wrapper'>
      <div className='container'>
        <div className='team-table'>
          <button>
            <Link to='/teams/new'>Create</Link>
          </button>
          <table className="responstable">
            <tr>
              <th>Name</th>
              <th>Max Capacity</th>
              <th>Free Capacity</th>
              <th>Action</th>
            </tr>

            {teams && teams.map((team) => {
              return (
                <tr key={team.id}>
                  <td>{team.name}</td>
                  <td>{team.maxCapacity}</td>
                  <td>{team.freeCapacity}</td>
                  <td>
                    <button className='join'>Join</button>
                  </td>
                </tr>
              )
            })}
          </table>
        </div>
      </div>
    </div>
  )
}

export default Team