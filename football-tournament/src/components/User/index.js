import { useState, useEffect, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faLink } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Search from '../Search'
import Pagination from '../Pagination'
import { api } from '../../utils/request'

import './index.scss'
const pageSize = 3;

const Users = () => {
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const [tempUsers, setTempUsers] = useState([])

  useEffect(() => {
    api.get('users/all')
      .then(r => r.json())
      .then((data) => {
        setUsers(data)
        setTempUsers(data)
      })
  }, [])

  useEffect(() => {
    if (!search) {
      setTempUsers(users)
    } else {
      const filtered = tempUsers.filter((x) => x.username.toLowerCase().includes(search.toLowerCase()))
      setTempUsers(filtered)
    }
  }, [search])

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return tempUsers.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, tempUsers]);

  const addRanking = (id) => {
    api.post('users/addRanking', {
      id: id
    }).then(r => r.json())
      .then((res) => {
        if (res) {
          window.location.reload(true)
        }
      })
  }

  return (
    <div>
      <header>
        <Search value={search} searchHandler={setSearch} placeholderValue='Search player by username...'/>
        <div>
          <table>
            <thead>
              <th>#</th>
              <th>Name</th>
              <td>Action</td>
            </thead>
            <tbody>
              {currentTableData.map((user, i) => {
                return (
                  <tr key={user.id}>
                    <td>{i}</td>
                    <td>{user.username}</td>
                    <td>
                      <Link to={`/administration/users/${user.id}`}>
                        <button className='action-btn'>
                          <FontAwesomeIcon color='#ffff' icon={faLink} />
                        </button>
                      </Link>

                      <input className='ranking-value'
                      type='number' value={user.ranking} />
                      <button className='action-btn' onClick={(e) => addRanking(user.id)}>
                        <FontAwesomeIcon color='#ffff' icon={faPlus} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            totalCount={users.length}
            pageSize={3}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </header>
    </div>
  );
};

export default Users;
