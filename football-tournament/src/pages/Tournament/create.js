
const Create = () => {
  return (
    <div>
      <form className='create-tournament-form'>
        <div className='row'>
          <input className='col' type='text' placeholder='Name'/>
        </div>

        <div className='row country'>
          <select className="col">
            <option>Select country</option>
            <option>Bulgaria</option>
            <option>USA</option>
            <option>UK</option>
            <option>France</option>
            <option>Spain</option>
            <option>Italy</option>
          </select>
        </div>

        <div className='row'>
          <select className='col'>
            <option>Select category</option>
            <option>Junior</option>
            <option>Adult</option>
          </select>
        </div>

        <div className='row'>
          <input className='col' type='number' placeholder='Price'/>
        </div>

        <div>
          <button className='create-btn'>Create</button>
        </div>
      </form>
    </div>
  )
}

export default Create