import { useState, useEffect, useMemo } from "react"
import { Link } from "react-router-dom"
import { useCookies } from "react-cookie"
import ClipLoader from "react-spinners/ClipLoader"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLink, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { api } from "../../utils/request"
import Pagination from "../Pagination"
import Search from '../Search'

const AllTeams = () => {
  const [teams, setTeams] = useState([])
  const [tempTeams, setTempTeams] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [pageSize] = useState(3)
  const [cookies] = useCookies(["jwt"])

  useEffect(() => {
    setLoading(true);
    api
      .get("teams/all", {
        "Content-Type": "application/json",
        "X-User-Token": cookies?.jwt,
      })
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
        setTeams(data);
        setTempTeams(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!search) {
      setTempTeams(teams)
    } else {
      const filtered = tempTeams.filter((x) => x.name.toLowerCase().includes(search.toLowerCase()))
      setTempTeams(filtered)
    }
  }, [search])

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return tempTeams.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, tempTeams, pageSize]);

  return (
    <div>
      <Search value={search} searchHandler={setSearch} placeholderValue='Search team by name...'/>
      <table>
        <thead>
          <th>#</th>
          <th>Name</th>
          <th>Max Capacity</th>
          <th>Captain</th>
          <th>Action</th>
        </thead>
        <tbody>
          {loading ? (
            <div className="loader">
              <ClipLoader color="#ffff" loading={loading} size={150} />
            </div>
          ) : (
            currentTableData.map((team) => {
              return (
                <tr>
                  <td>{team.id}</td>
                  <td>{team.name}</td>
                  <td>{team.maxCapacity}</td>
                  <td>{team.captain.username}</td>
                  <td>
                    <Link to={`/administration/teams/details/${team.id}`}>
                      <button className="action-btn">
                        <FontAwesomeIcon color="#ffff" icon={faLink} />
                      </button>
                    </Link>
                    <Link to={`/administration/teams/${team.id}`}>
                      <button className="action-btn">
                        <FontAwesomeIcon color="#ffff" icon={faEdit} />
                      </button>
                    </Link>
                    <Link to={`/administration/teams/delete/${team.id}`}>
                      <button className="action-btn">
                        <FontAwesomeIcon color="#ffff" icon={faTrash} />
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalCount={teams.length}
        pageSize={pageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </div>
  );
};

export default AllTeams;
