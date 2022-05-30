import { useState, useEffect } from 'react'
import { useCookies } from "react-cookie"
import Input from '../Auth/Input'
import { api } from '../../utils/request'
import './index.scss'

const AddToTeam = () => {
  const [player, setPlayer] = useState('')
  const [teams, setTeams] = useState([]) 
  const [cookies] = useCookies(["jwt"])

  useEffect(() => {
    api
      .get("teams/all", {
        "Content-Type": "application/json",
        "X-User-Token": cookies?.jwt,
      })
      .then((r) => r.json())
      .then((data) => {
        setTeams(data)
      });
  }, [])

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
        <select className='team-wrapper'>
          {teams.map((team) => {
            return (
              <option value={team.id}>{team.name}</option>
            )
          })}
        </select>
      </div>

      <div>
        <button>Add</button>
      </div>
    </div>
  )
}

export default AddToTeam