import { useEffect, useState, useContext } from "react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import { AuthContext } from "../../context/AuthContext";
import "./Attendance.css";

const Attendance = () => {
  const { user } = useContext(AuthContext);

  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch today's attendance
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        // API call placeholder
        // const res = await getTodayAttendance();
        // setAttendance(res.data);

        // Temporary mock for UI (REMOVE when API ready)
        setAttendance({
          checkIn: null,
          checkOut: null,
        });
      } catch (err) {
        setMessage("Failed to load attendance");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  const handleCheckIn = async () => {
    try {
      // await checkInAPI();
      setAttendance({ ...attendance, checkIn: new Date().toLocaleTimeString() });
      setMessage("Checked in successfully");
    } catch (err) {
      setMessage("Check‑in failed");
    }
  };

  const handleCheckOut = async () => {
    try {
      // await checkOutAPI();
      setAttendance({
        ...attendance,
        checkOut: new Date().toLocaleTimeString(),
      });
      setMessage("Checked out successfully");
    } catch (err) {
      setMessage("Check‑out failed");
    }
  };

  if (loading) {
    return <div>Loading attendance...</div>;
  }

  return (
    <div className="attendance-container">
      <Navbar />

      <div className="attendance-body">
        <Sidebar />

        <main className="attendance-content">
          <h1>Attendance</h1>
          <p className="attendance-subtitle">
            Track your daily check‑in and check‑out
          </p>

          {message && <p className="attendance-message">{message}</p>}

          <div className="attendance-card">
            <div className="attendance-row">
              <span>Employee</span>
              <strong>{user.name}</strong>
            </div>

            <div className="attendance-row">
              <span>Check‑In Time</span>
              <strong>{attendance.checkIn || "Not Checked In"}</strong>
            </div>

            <div className="attendance-row">
              <span>Check‑Out Time</span>
              <strong>{attendance.checkOut || "Not Checked Out"}</strong>
            </div>

            <div className="attendance-actions">
              {!attendance.checkIn && (
                <button onClick={handleCheckIn}>Check In</button>
              )}

              {attendance.checkIn && !attendance.checkOut && (
                <button onClick={handleCheckOut}>Check Out</button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Attendance;
