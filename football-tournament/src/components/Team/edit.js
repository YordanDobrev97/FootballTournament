import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../../utils/request'
import './index.scss'

const Edit = () => {
  const [id, setId] = useState(0)
  const [name, setName] = useState('')
  const [captain, setCaptain] = useState('')
  const [maxCapacity, setMaxCapacity] = useState(0)
  const [players, setPlayers] = useState([])

  const params = useParams()
  const navigation = useNavigate()

  useEffect(() => {
    api.get(`teams/${params.id}`)
      .then(r => r.json())
      .then((data) => {
        const { id, name, maxCapacity, currentCaptain, players } = data
        console.log(currentCaptain)
        const filteredPlayers = players.filter((p) => p.id !== currentCaptain.id)
        setId(id)
        setName(name)
        setMaxCapacity(maxCapacity)
        setCaptain(currentCaptain)
        setPlayers(filteredPlayers)
      })
  }, [])

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {id, name, maxCapacity, newCaptainId: captain}
    console.log(data)
    api.put('teams/update', data).then((res) => {
      if (res) {
        navigation('/administration/teams/all')
      }
    })
  }

  return (
    <div className='edit-container'>
      <form onSubmit={onSubmit}>
        <div className='row'>
          <label>Team Name</label>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>
        </div>

        <div className='row'>
          <label>Select new captain</label>
          <select onChange={(e) => setCaptain(e.target.value)} className='captain'>
            <option value={captain.id}>{captain.username}</option>
            {players.map((player) => {
              return (
                <option value={player.id}>{player.username}</option>
              )
            })}
          </select>
        </div>

        <div className='row'>
          <label>Team Capacity</label>
          <input type='number' value={maxCapacity} onChange={(e) => setMaxCapacity(e.target.value)} />
        </div>

        <div className='row'>
          <button type='submit' className='update'>Update</button>
        </div>
      </form>
    </div>
  )
}

export default Edit