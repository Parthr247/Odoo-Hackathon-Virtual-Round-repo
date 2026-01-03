import { useState } from "react";
import { applyLeaveRequest } from "../../services/leaveService";

export default function Leave() {
  const [leave, setLeave] = useState({ type: "Paid", date: "", remarks: "" });

  const submit = async () => {
    await applyLeaveRequest(leave);
    alert("Leave applied");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Leave</h2>
      <select onChange={(e) => setLeave({ ...leave, type: e.target.value })}>
        <option>Paid</option>
        <option>Sick</option>
        <option>Unpaid</option>
      </select>
      <input type="date" onChange={(e) => setLeave({ ...leave, date: e.target.value })} />
      <textarea onChange={(e) => setLeave({ ...leave, remarks: e.target.value })} />
      <button onClick={submit}>Submit</button>
    </div>
  );
}