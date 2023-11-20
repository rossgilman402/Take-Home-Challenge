import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <div className="header-container">
      <div className="title-container">
        <h1>Pet Pictures</h1>
      </div>
      <div>
        <ul className="navbar-container">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/About">About</Link>
          </li>
          <li>
            <Link to="/Profile">Profile</Link>
          </li>
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
