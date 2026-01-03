import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import EmployeeDashboard from "./components/dashboard/EmployeeDashboard";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Attendance from "./pages/attendance/Attendance";
import Leave from "./pages/leave/Leave";
import Profile from "./pages/profile/Profile";
import Payroll from "./pages/payroll/Payroll";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/employee" element={
        <ProtectedRoute role="employee">
          <EmployeeDashboard />
        </ProtectedRoute>
      } />

      <Route path="/employee/profile" element={<Profile />} />
      <Route path="/employee/attendance" element={<Attendance />} />
      <Route path="/employee/leave" element={<Leave />} />
      <Route path="/employee/payroll" element={<Payroll />} />

      <Route path="/admin" element={
        <ProtectedRoute role="admin">
          <AdminDashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
}
