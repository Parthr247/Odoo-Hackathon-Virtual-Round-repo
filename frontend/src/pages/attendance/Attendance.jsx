import { checkInRequest, checkOutRequest } from "../../services/attendanceService";

export default function Attendance() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Attendance</h2>
      <button onClick={checkInRequest}>Check In</button>
      <button onClick={checkOutRequest}>Check Out</button>
    </div>
  );
}