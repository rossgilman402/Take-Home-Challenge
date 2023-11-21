import Auth from "../../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const authProfile = Auth.getProfile() as { data: { _id: string } } | null;
  const userId = authProfile?.data?._id;
  const navigate = useNavigate();

  const handleLogout = () => {
    Auth.logout();
    navigate("/");
  };

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
              <Link to="/" onClick={handleLogout}>
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
