import { useState, useEffect, useMemo } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie'
import ClipLoader from "react-spinners/ClipLoader"

import Pagination from "../../components/Pagination"
import { api } from "../../utils/request"
import parseJwt  from '../../utils/jwtParser'

import "./index.scss"

const pageSize = 3;

const Team = () => {
  const [teams, setTeams] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cookies] = useCookies(['jwt'])
  const navigation = useNavigate()
  const [loading, setLoading] = useState(false)
  const user = parseJwt(cookies?.jwt)

  useEffect(() => {
    if (!cookies?.jwt) {
      navigation('/login')
    }
    setLoading(true)
    api
      .get("teams/all", {
        "Content-Type": "application/json",
        "X-User-Token": cookies?.jwt
      })
      .then((r) => r.json())
      .then((data) => {
        setTeams(data);
        setLoading(false)
      });
  }, []);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return teams.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, teams]);

  return (
    <>
      {user.IsInRole == 'True' && <div>
        <button>
          <Link to='/teams/new'>Create</Link>
        </button>
      </div>}

      <table className="table">
        <thead>
          <td>#Team</td>
          <td classname="name">Name</td>
          <td>Max Capacity</td>
          <td>Free Capacity</td>
          <td>Action</td>
        </thead>

        <tbody>
        {loading ? (
          <div className='loader'>
            <ClipLoader color='#ffff' loading={loading} size={150} />
          </div>
        ) : (
          currentTableData.map((team) => {
            return (
              <tr className="top">
                <td>{team.id}</td>
                <td className="name">{team.name}</td>
                <td>{team.maxCapacity}</td>
                <td>{team.freeCapacity}</td>
                <td>
                  {team.isCreated ? (
                    <button>Remove</button>
                  ): (
                    <button>Join</button>
                  )}
                </td>
              </tr>
            )
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
    </>
  );
};

export default Team;
