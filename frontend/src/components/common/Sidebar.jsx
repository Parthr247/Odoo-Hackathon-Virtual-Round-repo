import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-60 h-screen bg-gray-100 p-4">
      <ul className="space-y-3">
        <li><Link to="/employee">Dashboard</Link></li>
        <li><Link to="/employee/profile">Profile</Link></li>
        <li><Link to="/employee/attendance">Attendance</Link></li>
        <li><Link to="/employee/leave">Leave</Link></li>
        <li><Link to="/employee/payroll">Payroll</Link></li>
      </ul>
    </aside>
  );
}
