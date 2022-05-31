import { useState, useEffect } from 'react'
import { api } from '../../utils/request'
import './index.scss'

const Statistics = () => {
  const [teams, setTeams] = useState([])
  const [tournaments, setTournaments] = useState([])
  const [players, setPlayers] = useState([])

  useEffect(() => {
    api.get('tournaments/theBestTeams')
      .then(r => r.json())
      .then((data) => setTeams(data))
    
    api.get('tournaments/mostExpensive')
      .then(r => r.json())
      .then((data) => setTournaments(data))

    api.get('users/tops')
      .then(r => r.json())
      .then((data) => setPlayers(data))
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
                <tr key={team.name}>
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
            {tournaments && tournaments.map((t) => {
              return (
                <tr key={t.name}>
                  <td>{t.name}</td>
                  <td>{t.price}</td>
                </tr>
              )
            })}
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
            {players && players.map((player) => {
              return (
                <tr key={player.user}>
                  <td>{player.user}</td>
                  <td>{player.ranking}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Statistics