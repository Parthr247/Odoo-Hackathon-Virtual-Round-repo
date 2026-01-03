import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Left: Logo / App Name */}
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          Dayflow
        </Link>
      </div>

      {/* Center: Navigation Links */}
      {user && (
        <ul className="navbar-links">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>

          <li>
            <Link to="/attendance">Attendance</Link>
          </li>

          <li>
            <Link to="/leave">Leave</Link>
          </li>

          <li>
            <Link to="/payroll">Payroll</Link>
          </li>

          {/* Admin Only */}
          {user.role === "admin" && (
            <li>
              <Link to="/admin/employees">Employees</Link>
            </li>
          )}
        </ul>
      )}

      {/* Right: User Info */}
      <div className="navbar-right">
        {user ? (
          <>
            <span className="navbar-user">
              {user.name} ({user.role})
            </span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
