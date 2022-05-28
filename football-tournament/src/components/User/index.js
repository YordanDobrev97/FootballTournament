import { useState, useEffect, useMemo } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faLink } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'
import Search from "../Search"
import Pagination from "../Pagination"
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

  return (
    <div>
      <header>
        <Search value={search} searchHandler={setSearch}/>
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
                  <tr>
                    <td>{i}</td>
                    <td>{user.username}</td>
                    <td>
                      <Link to='/administration/users/addToTeam'>
                        <button className='action-btn'>
                          <FontAwesomeIcon color="#ffff" icon={faPlus} />
                        </button>
                      </Link>
                      <Link to='/administration/users/1'>
                        <button className='action-btn'>
                          <FontAwesomeIcon color="#ffff" icon={faLink} />
                        </button>
                      </Link>
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
