import pool from "../config/db.js";

/**
 * Create a new leave request
 */
export const createLeaveRequest = async (
  userId,
  startDate,
  endDate,
  reason
) => {
  const [result] = await pool.query(
    `INSERT INTO leave_requests 
     (user_id, start_date, end_date, reason, status)
     VALUES (?, ?, ?, ?, 'pending')`,
    [userId, startDate, endDate, reason]
  );

  return result.insertId;
};

/**
 * Get leave requests for a specific user
 */
export const getLeavesByUser = async (userId) => {
  const [rows] = await pool.query(
    `SELECT 
        id,
        start_date,
        end_date,
        reason,
        status,
        created_at
     FROM leave_requests
     WHERE user_id = ?
     ORDER BY created_at DESC`,
    [userId]
  );

  return rows;
};

/**
 * Get all leave requests (Admin)
 */
export const getAllLeaveRequests = async () => {
  const [rows] = await pool.query(
    `SELECT 
        lr.id,
        u.name AS employee_name,
        lr.start_date,
        lr.end_date,
        lr.reason,
        lr.status,
        lr.created_at
     FROM leave_requests lr
     JOIN users u ON lr.user_id = u.id
     ORDER BY lr.created_at DESC`
  );

  return rows;
};

/**
 * Update leave status (Admin)
 */
export const updateLeaveStatusById = async (leaveId, status) => {
  const [result] = await pool.query(
    `UPDATE leave_requests SET status = ? WHERE id = ?`,
    [status, leaveId]
  );

  return result.affectedRows;
};
