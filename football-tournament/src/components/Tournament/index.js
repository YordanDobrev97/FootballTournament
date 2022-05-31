import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import ClipLoader from 'react-spinners/ClipLoader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { api } from '../../utils/request'
import Pagination from '../Pagination'
import Search from '../Search'

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([])
  const [tempTournaments, setTempTournaments] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [pageSize] = useState(3)
  const [cookies] = useCookies(['jwt'])

  useEffect(() => {
    setLoading(true);
    api
      .get('tournaments/all', {
        'Content-Type': 'application/json',
        'X-User-Token': cookies?.jwt,
      })
      .then((r) => r.json())
      .then((data) => {
        setTournaments(data);
        setTempTournaments(data);
        setLoading(false);
      });
  }, []);

  const remove = async (id) => {
    api.delete('tournaments', id)
      .then((res) => {
        setTempTournaments(tempTournaments.filter((t) => t.id !== id))
      })
  }

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return tempTournaments.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, tempTournaments, pageSize]);

  return (
    <div>
    <Search value={search} searchHandler={setSearch} placeholderValue='Search team by name...'/>
    <table>
      <thead>
        <th>Name</th>
        <th>Country</th>
        <th>Price</th>
        <th>Winner</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Action</th>
      </thead>
      <tbody>
        {loading ? (
          <div className='loader'>
            <ClipLoader color='#ffff' loading={loading} size={150} />
          </div>
        ) : (
          currentTableData.map((tournament) => {
            return (
              <tr key={tournament.id}> 
                <td>{tournament.name}</td>
                <td>
                  <img src={tournament.country} alt='countryFlag'/>
                </td>
                <td>{tournament.price}</td>
                <td>{tournament.winner ?? 'None'}</td>
                <td>{tournament.startDate}</td>
                <td>{tournament.endDate}</td>
                <td>
                  <Link to={`/administration/tournaments/${tournament.id}`}>
                    <button className='action-btn'>
                      <FontAwesomeIcon color='#ffff' icon={faEdit} />
                    </button>
                  </Link>
                  <button className='action-btn' onClick={() => remove(tournament.id)}>
                    <FontAwesomeIcon color='#ffff' icon={faTrash} />
                  </button>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
    <Pagination
      currentPage={currentPage}
      totalCount={tournaments.length}
      pageSize={pageSize}
      onPageChange={page => setCurrentPage(page)}
    />
  </div>
  )
}

export default Tournaments