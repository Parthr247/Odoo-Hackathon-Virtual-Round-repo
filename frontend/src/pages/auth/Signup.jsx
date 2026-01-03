import { useState } from "react";
import { signupRequest } from "../../services/authService";

export default function Signup() {
  const [form, setForm] = useState({
    empId: "",
    email: "",
    password: "",
    role: "employee",
  });

  const submit = async () => {
    await signupRequest(form);
    alert("Signup successful");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-96 p-6 bg-white shadow">
        <h2 className="text-xl mb-4">Signup</h2>
        <input placeholder="Employee ID" onChange={(e) => setForm({ ...form, empId: e.target.value })} />
        <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={submit}>Signup</button>
      </div>
    </div>
  );
}