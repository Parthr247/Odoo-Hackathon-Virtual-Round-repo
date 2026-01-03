import pool from "../config/db.js";

/**
 * @route   GET /api/payroll/my
 * @desc    Get logged-in employee payroll
 * @access  Private
 */
export const getMyPayroll = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await pool.query(
      `SELECT 
        month,
        basic_salary,
        allowances,
        deductions,
        net_salary,
        status,
        created_at
       FROM payroll
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT 1`,
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Payroll not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Get My Payroll Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route   GET /api/payroll/all
 * @desc    Get all payroll records (Admin)
 * @access  Private (Admin)
 */
export const getAllPayrolls = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
        p.id,
        u.name AS employee_name,
        p.month,
        p.basic_salary,
        p.allowances,
        p.deductions,
        p.net_salary,
        p.status,
        p.created_at
       FROM payroll p
       JOIN users u ON p.user_id = u.id
       ORDER BY p.created_at DESC`
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Get All Payrolls Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route   POST /api/payroll/create
 * @desc    Create payroll for employee (Admin)
 * @access  Private (Admin)
 */
export const createPayroll = async (req, res) => {
  try {
    const {
      userId,
      month,
      basicSalary,
      allowances,
      deductions,
    } = req.body;

    if (!userId || !month || !basicSalary) {
      return res.status(400).json({
        message: "User, month and basic salary are required",
      });
    }

    const netSalary =
      Number(basicSalary) +
      Number(allowances || 0) -
      Number(deductions || 0);

    await pool.query(
      `INSERT INTO payroll
       (user_id, month, basic_salary, allowances, deductions, net_salary, status)
       VALUES (?, ?, ?, ?, ?, ?, 'paid')`,
      [userId, month, basicSalary, allowances || 0, deductions || 0, netSalary]
    );

    res.status(201).json({ message: "Payroll created successfully" });
  } catch (error) {
    console.error("Create Payroll Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
