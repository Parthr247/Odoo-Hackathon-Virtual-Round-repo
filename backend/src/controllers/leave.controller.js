import pool from "../config/db.js";

/**
 * @route   POST /api/leave/apply
 * @desc    Apply for leave (Employee)
 * @access  Private
 */
export const applyLeave = async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate, reason } = req.body;

    if (!startDate || !endDate || !reason) {
      return res.status(400).json({
        message: "Start date, end date and reason are required",
      });
    }

    await pool.query(
      `INSERT INTO leave_requests 
       (user_id, start_date, end_date, reason, status) 
       VALUES (?, ?, ?, ?, 'pending')`,
      [userId, startDate, endDate, reason]
    );

    res.status(201).json({ message: "Leave applied successfully" });
  } catch (error) {
    console.error("Apply Leave Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route   GET /api/leave/my
 * @desc    Get logged-in user's leave history
 * @access  Private
 */
export const getMyLeaves = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await pool.query(
      `SELECT id, start_date, end_date, reason, status, created_at
       FROM leave_requests
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [userId]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Get My Leaves Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route   GET /api/leave/all
 * @desc    Get all leave requests (Admin)
 * @access  Private (Admin)
 */
export const getAllLeaves = async (req, res) => {
  try {
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

    res.status(200).json(rows);
  } catch (error) {
    console.error("Get All Leaves Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route   PUT /api/leave/:id/status
 * @desc    Approve or reject leave (Admin)
 * @access  Private (Admin)
 */
export const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status must be approved or rejected",
      });
    }

    const [result] = await pool.query(
      "UPDATE leave_requests SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    res.status(200).json({ message: `Leave ${status} successfully` });
  } catch (error) {
    console.error("Update Leave Status Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
