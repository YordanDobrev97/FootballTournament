import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useParams, useNavigate } from 'react-router-dom'
import Input from '../Auth/Input'
import { api } from '../../utils/request'
import './index.scss'

const AddToTeam = () => {
  const [player, setPlayer] = useState('')
  const [team, setTeam] = useState('')
  const [teams, setTeams] = useState([]) 
  const [cookies] = useCookies(['jwt'])

  const params = useParams()
  const navigation = useNavigate()

  useEffect(() => {
    api
      .get('teams/all', {
        'Content-Type': 'application/json',
        'X-User-Token': cookies?.jwt,
      })
      .then((r) => r.json())
      .then((data) => {
        setTeams(data)
      });

    api.get(`users/${params.userId}`)
      .then(res => res.json())
      .then(d => setPlayer(d))
  }, [])

  const addToTeam = () => {
    api.post('teams/addPlayer',
      {
        teamId: team,
        playerId: params.userId
      }).then((res) => {
        if (res.ok) {
          navigation('/administration/teams/all')
        }
      })
  }

  return (
    <div>
      <div className='row'>
        <Input
              label='Name'
              id='name'
              value={player}
              onChange={(e) => setPlayer(e.target.value)}
        />
      </div>

      <div className='row'>
        <select onChange={(e) => setTeam(e.target.value)} className='team-wrapper'>
          {teams.map((team) => {
            return (
              <option value={team.id}>{team.name}</option>
            )
          })}
        </select>
      </div>

      <div>
        <button onClick={addToTeam}>Add</button>
      </div>
    </div>
  )
}

export default AddToTeam