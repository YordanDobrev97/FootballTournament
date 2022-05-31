import { useState, useEffect } from 'react'
import { api } from '../../utils/request'
import './index.scss'

const Statistics = () => {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    api.get('tournaments/theBestTeams')
      .then(r => r.json())
      .then((data) => {
        setTeams(data)
      })
  }, [])

  return (
    <div className='statistics-container'>
      <div className='statistic teams-container'>
        <h3>The best teams</h3>
        <table>
          <thead>
            <tr>
              <th>Team</th>
              <th>Wins</th>
            </tr>
          </thead>

          <tbody>
            {teams && teams.map((team) => {
              return (
                <tr>
                  <td>{team.name}</td>
                  <td>{team.countWinners}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className='statistic tournaments-container'>
        <h3>Expensive tournaments</h3>
        <table>
          <thead>
            <tr>
              <th>Tournament</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Fifa</td>
              <td>20000000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='statistic'>
        <h3>The best players</h3>
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Ranking</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Ronaldo</td>
              <td>10</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Statistics