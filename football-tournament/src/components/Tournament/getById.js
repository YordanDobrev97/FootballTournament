import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ModernDatepicker from 'react-modern-datepicker'
import { useCookies } from 'react-cookie'

import Input from '../Auth/Input'
import { api } from '../../utils/request'

const GetById = () => {
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(0)
  const [winner, setWinner] = useState('')
  const [teams, setTeams] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  
  const navigation = useNavigate()
  const [cookies] = useCookies(['jwt'])
  const params = useParams()

  useEffect(() => {
    api.get(`tournaments/${params.id}`)
    .then(r => r.json())
    .then(async (data) => {
      const fetchCountries = await getCountries()
      console.log(fetchCountries)
      const teams = await getTeams()
      const { name, country, category, price, winner, startDate, endDate } = data
      
      setCountries(fetchCountries)
      setName(name)
      setCountry(country)
      setCategory(category)
      setPrice(price)
      setWinner(winner)
      setTeams(teams)
      setStartDate(startDate)
      setEndDate(endDate)
    })
  }, [])

  const getCountries = async () => {
    const res = await api.get('countries')
    return res.json()
  }

  const getTeams = async () => {
    const res = await api.get('teams/all', {
      'Content-Type': 'application/json',
      'X-User-Token': cookies?.jwt
    })
    return res.json()
  }

  const onSubmit = (e) => {
    e.preventDefault()
 
    api.put('tournaments/update', {
      id: params.id, name, country, category, price, winner, startDate, endDate
    }).then((res) => {
      if (res) {
        navigation('/administration/teams/all')
      }
    })
  }
  return (
    <div>
     <form class='form' id='form1' onSubmit={onSubmit}>
          <div class='row'>
            <Input
            label='Name'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}/>
          </div>

          <div className='row date'>
            <ModernDatepicker
              date={startDate}
              format={'DD-MM-YYYY HH:mm'}
              showBorder
              onChange={(date) => setStartDate(date)}
              placeholder={'Select end date'}
            />
          </div>

          <div className='row date'>
            <ModernDatepicker
              date={endDate}
              format={'DD-MM-YYYY HH:mm'}
              showBorder
              onChange={(date) => setEndDate(date)}
              placeholder={'Select end date'}
            />
          </div>

          <div class='row'>
            <select onChange={(e) => setCountry(e.target.value)}>
              <option>Select new country</option>
              {countries.map((c) => {
                return (
                  <option value={c.name}>{c.name}</option>
                )
              })}
            </select>
          </div>

          <div className='row'>
            <select onChange={(e) => setCategory(e.target.value)}>
              <option>Select new Category</option>
              <option value='Junior'>Junior</option>
              <option value='Adult'>Adult</option>
            </select>
          </div>
        
          <div className='row'>
            <select onChange={(e) => setWinner(e.target.value)}>
              <option>Select Winner</option>
              {teams.map((team) => {
                return (
                  <option value={team.name}>{team.name}</option>
                )
              })}
            </select>
          </div>

          <div className='row'>
            <Input
              label='Price'
              id='price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}/>
          </div>

          <button type='submit' className='update'>Update</button>
        </form>
    </div>
  )
}

export default GetById