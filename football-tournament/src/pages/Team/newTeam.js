import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { api } from '../../utils/request'
import Input from "../../components/Auth/Input"

const NewTeam = () => {
  const [name, setName] = useState('')
  const [capacity, setCapacity] = useState(0)
  const [cookies] = useCookies(['jwt'])
  const navigation = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    const headers = {
      "Content-Type": "application/json",
      "X-User-Token": cookies?.jwt,
    };
    api.post('teams/create',{name, capacity}, headers)
    .then((res) => {
      navigation('/teams/all')
    }).catch((err) => {

    })
  }

  return (
    <div id="form-main">
      <div id="form-div">
        <form class="form" id="form1" onSubmit={onSubmit}>
          <p class="name">
            <Input
            label='Name'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}/>
          </p>

          <p class="email">
          <Input
            label='Capacity'
            id='capacity'
            value={capacity}
            type='number'
            onChange={(e) => setCapacity(e.target.value)}/>
          </p>

          <button type='submit' className='submit'>Add</button>
        </form>
      </div>
    </div>
  );
};

export default NewTeam;
