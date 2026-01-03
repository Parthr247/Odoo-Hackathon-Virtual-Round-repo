import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Sidebar.css";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <aside className="sidebar">
      {/* User Info */}
      <div className="sidebar-header">
        <h2>Dayflow</h2>
        <p className="sidebar-role">
          {user.name} <br />
          <span>({user.role})</span>
        </p>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="sidebar-link">
          Dashboard
        </NavLink>

        <NavLink to="/attendance" className="sidebar-link">
          Attendance
        </NavLink>

        <NavLink to="/leave" className="sidebar-link">
          Leave Management
        </NavLink>

        <NavLink to="/payroll" className="sidebar-link">
          Payroll
        </NavLink>

        {/* Admin Only */}
        {user.role === "admin" && (
          <>
            <NavLink to="/admin/employees" className="sidebar-link">
              Employees
            </NavLink>

            <NavLink to="/admin/approvals" className="sidebar-link">
              Leave Approvals
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
