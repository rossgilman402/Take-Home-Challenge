import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const authProfile = Auth.getProfile() as { data: { _id: string } } | null;
  const userId = authProfile?.data?._id;

  return (
    <div className="header-container">
      <div className="title-container">
        <h1>Pet Pictures</h1>
      </div>
      <div>
        <ul className="navbar-container">
          <li>
            <Link to="/">About</Link>
          </li>
          <li>
            <Link to="/Dashboard">Dashboard</Link>
          </li>
          {Auth.loggedIn() && (
            <li>
              <Link to={`/Profile/${userId}`}>Profile</Link>
            </li>
          )}
          <li>
            {Auth.loggedIn() ? (
              <Link to="/" onClick={() => Auth.logout()}>
                Logout
              </Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};
