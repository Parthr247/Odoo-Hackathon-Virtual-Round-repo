import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../common/Navbar";
import Sidebar from "../common/Sidebar";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="admin-dashboard-container">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="admin-dashboard-body">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="admin-dashboard-content">
          <h1>Admin Dashboard</h1>
          <p className="admin-subtitle">
            Welcome, {user.name}. Manage employees and HR operations.
          </p>

          {/* Admin Cards */}
          <div className="admin-cards">
            <div className="admin-card">
              <h3>Employees</h3>
              <p>View, add, and manage employee records</p>
            </div>

            <div className="admin-card">
              <h3>Leave Approvals</h3>
              <p>Approve or reject employee leave requests</p>
            </div>

            <div className="admin-card">
              <h3>Attendance Records</h3>
              <p>Monitor employee attendance logs</p>
            </div>

            <div className="admin-card">
              <h3>Payroll Overview</h3>
              <p>Review payroll summaries</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
