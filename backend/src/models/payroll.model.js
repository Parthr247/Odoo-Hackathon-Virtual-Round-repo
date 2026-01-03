import pool from "../config/db.js";

/**
 * Create payroll for an employee (Admin)
 */
export const createPayrollRecord = async (
  userId,
  month,
  basicSalary,
  allowances,
  deductions,
  netSalary
) => {
  const [result] = await pool.query(
    `INSERT INTO payroll
     (user_id, month, basic_salary, allowances, deductions, net_salary, status)
     VALUES (?, ?, ?, ?, ?, ?, 'paid')`,
    [
      userId,
      month,
      basicSalary,
      allowances || 0,
      deductions || 0,
      netSalary,
    ]
  );

  return result.insertId;
};

/**
 * Get latest payroll for a user (Employee)
 */
export const getPayrollByUser = async (userId) => {
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

  return rows[0];
};

/**
 * Get all payroll records (Admin)
 */
export const getAllPayrollRecords = async () => {
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

  return rows;
};

/**
 * Update payroll status (Optional future use)
 */
export const updatePayrollStatus = async (payrollId, status) => {
  const [result] = await pool.query(
    `UPDATE payroll SET status = ? WHERE id = ?`,
    [status, payrollId]
  );

  return result.affectedRows;
};
