import express from "express";
import cors from "cors";

// Routes
import authRoutes from "./routes/auth.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import leaveRoutes from "./routes/leave.routes.js";
import payrollRoutes from "./routes/payroll.routes.js";

const app = express();

/* =====================
   Global Middleware
===================== */
app.use(cors());
app.use(express.json());

/* =====================
   Health Check
===================== */
app.get("/", (req, res) => {
  res.send("🚀 Dayflow HRMS API is running");
});

/* =====================
   API Routes
===================== */
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/payroll", payrollRoutes);

export default app;
