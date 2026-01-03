import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import { AuthContext } from "../../context/AuthContext";
import "./Payroll.css";

const Payroll = () => {
  const { user } = useContext(AuthContext);

  const [payroll, setPayroll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPayroll = async () => {
      try {
        // API call placeholder
        // const res = await getMyPayroll();
        // setPayroll(res.data);

        // Temporary mock data (REMOVE after backend ready)
        setPayroll({
          month: "January 2026",
          basicSalary: 30000,
          allowances: 5000,
          deductions: 2000,
          netSalary: 33000,
          status: "Paid",
        });
      } catch (err) {
        setMessage("Failed to load payroll details");
      } finally {
        setLoading(false);
      }
    };

    fetchPayroll();
  }, []);

  if (loading) {
    return <div>Loading payroll...</div>;
  }

  return (
    <div className="payroll-container">
      <Navbar />

      <div className="payroll-body">
        <Sidebar />

        <main className="payroll-content">
          <h1>Payroll</h1>
          <p className="payroll-subtitle">
            View your salary details and payment status
          </p>

          {message && <p className="payroll-message">{message}</p>}

          {payroll ? (
            <div className="payroll-card">
              <div className="payroll-row">
                <span>Employee</span>
                <strong>{user.name}</strong>
              </div>

              <div className="payroll-row">
                <span>Month</span>
                <strong>{payroll.month}</strong>
              </div>

              <div className="payroll-row">
                <span>Basic Salary</span>
                <strong>₹{payroll.basicSalary}</strong>
              </div>

              <div className="payroll-row">
                <span>Allowances</span>
                <strong>₹{payroll.allowances}</strong>
              </div>

              <div className="payroll-row">
                <span>Deductions</span>
                <strong>₹{payroll.deductions}</strong>
              </div>

              <div className="payroll-row net">
                <span>Net Salary</span>
                <strong>₹{payroll.netSalary}</strong>
              </div>

              <div className={`payroll-status ${payroll.status.toLowerCase()}`}>
                {payroll.status}
              </div>
            </div>
          ) : (
            <p>No payroll data available</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default Payroll;
