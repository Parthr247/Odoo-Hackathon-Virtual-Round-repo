import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import { AuthContext } from "../../context/AuthContext";
import "./Leave.css";

const Leave = () => {
  const { user } = useContext(AuthContext);

  const [leaveData, setLeaveData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [leaveHistory, setLeaveHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch leave history
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        // const res = await getMyLeaves();
        // setLeaveHistory(res.data);

        // Temporary mock (REMOVE after API)
        setLeaveHistory([
          {
            id: 1,
            startDate: "2025-01-01",
            endDate: "2025-01-02",
            status: "Approved",
          },
        ]);
      } catch (err) {
        setMessage("Failed to load leave history");
      }
    };

    fetchLeaves();
  }, []);

  const handleChange = (e) => {
    setLeaveData({
      ...leaveData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // await applyLeaveAPI(leaveData);

      setLeaveHistory([
        ...leaveHistory,
        {
          id: Date.now(),
          startDate: leaveData.startDate,
          endDate: leaveData.endDate,
          status: "Pending",
        },
      ]);

      setLeaveData({
        startDate: "",
        endDate: "",
        reason: "",
      });

      setMessage("Leave applied successfully");
    } catch (err) {
      setMessage("Failed to apply leave");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="leave-container">
      <Navbar />

      <div className="leave-body">
        <Sidebar />

        <main className="leave-content">
          <h1>Leave Management</h1>
          <p className="leave-subtitle">
            Apply for leave and track approval status
          </p>

          {message && <p className="leave-message">{message}</p>}

          {/* Apply Leave */}
          <form className="leave-form" onSubmit={handleSubmit}>
            <h3>Apply for Leave</h3>

            <div className="leave-field">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={leaveData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="leave-field">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={leaveData.endDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="leave-field">
              <label>Reason</label>
              <textarea
                name="reason"
                placeholder="Reason for leave"
                value={leaveData.reason}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Apply Leave"}
            </button>
          </form>

          {/* Leave History */}
          <div className="leave-history">
            <h3>My Leave Requests</h3>

            {leaveHistory.length === 0 ? (
              <p>No leave records found</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Start</th>
                    <th>End</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveHistory.map((leave) => (
                    <tr key={leave.id}>
                      <td>{leave.startDate}</td>
                      <td>{leave.endDate}</td>
                      <td className={`status ${leave.status.toLowerCase()}`}>
                        {leave.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Leave;
