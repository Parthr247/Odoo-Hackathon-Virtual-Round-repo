import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const res = await loginRequest({ email, password });
      login(res.data);
      navigate(res.data.role === "admin" ? "/admin" : "/employee");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-80 p-6 bg-white shadow">
        <h2 className="text-xl mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input className="input" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button className="btn-primary w-full" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
