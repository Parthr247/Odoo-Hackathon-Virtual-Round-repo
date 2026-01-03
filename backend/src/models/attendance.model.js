import pool from "../config/db.js";

/**
 * Get today's attendance for a user
 */
export const getTodayAttendanceByUser = async (userId, todayDate) => {
  const [rows] = await pool.query(
    `SELECT id, check_in, check_out, date
     FROM attendance
     WHERE user_id = ? AND date = ?`,
    [userId, todayDate]
  );

  return rows[0];
};

/**
 * Check-in user
 */
export const createCheckIn = async (userId, time, date) => {
  const [result] = await pool.query(
    `INSERT INTO attendance (user_id, check_in, date)
     VALUES (?, ?, ?)`,
    [userId, time, date]
  );

  return result.insertId;
};

/**
 * Check-out user
 */
export const updateCheckOut = async (attendanceId, time) => {
  const [result] = await pool.query(
    `UPDATE attendance SET check_out = ? WHERE id = ?`,
    [time, attendanceId]
  );

  return result.affectedRows;
};

/**
 * Get attendance history for employee
 */
export const getAttendanceHistoryByUser = async (userId) => {
  const [rows] = await pool.query(
    `SELECT date, check_in, check_out
     FROM attendance
     WHERE user_id = ?
     ORDER BY date DESC`,
    [userId]
  );

  return rows;
};

/**
 * Get attendance history (Admin)
 */
export const getAllAttendanceHistory = async () => {
  const [rows] = await pool.query(
    `SELECT 
       a.id,
       u.name AS employee_name,
       a.date,
       a.check_in,
       a.check_out
     FROM attendance a
     JOIN users u ON a.user_id = u.id
     ORDER BY a.date DESC`
  );

  return rows;
};
