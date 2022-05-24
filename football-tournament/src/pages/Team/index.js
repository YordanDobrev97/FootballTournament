import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { api } from "../../utils/request";

import "./index.scss"

const pageSize = 3;

const Team = () => {
  const [teams, setTeams] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    api
      .get("teams/all")
      .then((r) => r.json())
      .then((data) => {
        setTeams(data);
      });
  }, []);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return teams.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, teams]);

  return (
    <>
      <div>
        <button>
        <Link to='/teams/new'>Create</Link>
        </button>
      </div>

      <table className="table">
        <thead>
          <td>#Team</td>
          <td classname="name">Name</td>
          <td>Max Capacity</td>
          <td>Free Capacity</td>
          <td>Action</td>
        </thead>

        <tbody>
          {currentTableData && currentTableData.map((team) => {
            return (
              <tr className="top">
                <td>{team.id}</td>
                <td className="name">{team.name}</td>
                <td>{team.maxCapacity}</td>
                <td>{team.freeCapacity}</td>
                <td>
                  <button>Join</button>
                </td>
              </tr>
            )
          })}
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