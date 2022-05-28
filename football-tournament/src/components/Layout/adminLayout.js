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
            <a>Teams</a>
          </li>
          <li>
            <a>Tournaments</a>
          </li>
          <li>
            <Link to="/">Back</Link>
          </li>
        </ul>
      </nav>
      <h1>Welcome to Administration</h1>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
