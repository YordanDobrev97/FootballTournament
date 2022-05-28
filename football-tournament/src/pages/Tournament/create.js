import { useState } from "react";
import ModernDatepicker from "react-modern-datepicker";
import { api } from '../../utils/request'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const Create = () => {
  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [country, setCountry] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(0)

  const [cookies] = useCookies(['jwt'])
  const navigation = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault();

    api.post('tournaments/create', 
    { 
      name, startDate, endDate, country, category, price
    })
    .then((res) => {
      navigation('/tournaments/all')
    }).catch((err) => {

    })
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="create-tournament-form">
        <div className="row">
          <input onChange={(e) => setName(e.target.value)} className="col" type="text" placeholder="Name" />
        </div>

        <div className="row start date">
          <ModernDatepicker
            date={startDate}
            format={"DD-MM-YYYY HH:mm"}
            showBorder
            onChange={(date) => setStartDate(date)}
            placeholder={"Select start date"}
          />
        </div>

        <div className="row date">
          <ModernDatepicker
            date={endDate}
            format={"DD-MM-YYYY HH:mm"}
            showBorder
            onChange={(date) => setEndDate(date)}
            placeholder={"Select end date"}
          />
        </div>
        
        <div className="row country">
          <select onChange={(e) => setCountry(e.target.value)} className="col">
            <option value='select'>Select country</option>
            <option value='Bulgaria'>Bulgaria</option>
            <option value='United States'>USA</option>
            <option value='United Kingdom'>UK</option>
            <option value='France'>France</option>
            <option value='Spain'>Spain</option>
            <option value='Italy'>Italy</option>
          </select>
        </div>

        <div className="row">
          <select className="col" onChange={(e) => setCategory(e.target.value)}>
            <option value='select'>Select category</option>
            <option value='Junior'>Junior</option>
            <option value='Adult'>Adult</option>
          </select>
        </div>

        <div className="row">
          <input onChange={(e) => setPrice(e.target.value)} className="col" type="number" placeholder="Price" />
        </div>

        <div>
          <button className="create-btn">Create</button>
        </div>
      </form>
    </div>
  );
};

export default Create;
