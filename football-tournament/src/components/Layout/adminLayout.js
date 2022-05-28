import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="wrapper">
      <nav>
        <header>
          <Link to="/">Back</Link>
        </header>

        <ul>
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
            <a>Logout</a>
          </li>
        </ul>
      </nav>
      <h1>Welcome to Administration</h1>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
