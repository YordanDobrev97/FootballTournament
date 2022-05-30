import { Link, Outlet } from "react-router-dom"
import './admin.scss'

const AdminLayout = () => {
  return (
    <div className="wrapper">
      <nav>
        <ul className='admin-menu'>
          <li>
            <Link to="/administration/home">Home</Link>
          </li>
          <li>
            <Link to="/administration/users/all">Users</Link>
          </li>
          <li>
            <Link to="/administration/teams/all">Teams</Link>
          </li>
          <li>
            <Link to="/administration/tournaments/all">Tournaments</Link>
          </li>
          <li>
            <Link to="/">Back</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
