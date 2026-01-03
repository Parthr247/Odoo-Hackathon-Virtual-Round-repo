import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="p-4 bg-blue-600 text-white flex justify-between">
      <span className="font-bold">Dayflow HRMS</span>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
