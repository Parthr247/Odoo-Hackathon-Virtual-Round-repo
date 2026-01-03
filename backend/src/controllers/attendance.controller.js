import {
  getTodayAttendanceByUser,
  createCheckIn,
  updateCheckOut,
  getAttendanceHistoryByUser,
  getAllAttendanceHistory,
} from "../models/attendance.model.js";

/**
 * Utility: Get today's date in YYYY-MM-DD format
 */
const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

/**
 * Utility: Get current time in HH:MM:SS format
 */
const getCurrentTime = () => {
  return new Date().toTimeString().split(" ")[0];
};

/**
 * @route   GET /api/attendance/today
 * @desc    Get today's attendance for logged-in user
 * @access  Private
 */
export const getTodayAttendance = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = getTodayDate();

    const attendance = await getTodayAttendanceByUser(userId, today);

    if (!attendance) {
      return res.status(200).json({
        date: today,
        check_in: null,
        check_out: null,
      });
    }

    res.status(200).json(attendance);
  } catch (error) {
    console.error("Get Today Attendance Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route   POST /api/attendance/check-in
 * @desc    Check-in user (once per day)
 * @access  Private
 */
export const checkIn = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = getTodayDate();
    const currentTime = getCurrentTime();

    // Check if already checked in today
    const existingAttendance = await getTodayAttendanceByUser(userId, today);

    if (existingAttendance) {
      return res.status(400).json({
        message: "Already checked in for today",
      });
    }

    await createCheckIn(userId, currentTime, today);

    res.status(201).json({
      message: "Checked in successfully",
      check_in: currentTime,
    });
  } catch (error) {
    console.error("Check-In Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route   POST /api/attendance/check-out
 * @desc    Check-out user (only after check-in)
 * @access  Private
 */
export const checkOut = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = getTodayDate();
    const currentTime = getCurrentTime();

    const attendance = await getTodayAttendanceByUser(userId, today);

    if (!attendance) {
      return res.status(400).json({
        message: "Check-in required before check-out",
      });
    }

    if (attendance.check_out) {
      return res.status(400).json({
        message: "Already checked out for today",
      });
    }

    await updateCheckOut(attendance.id, currentTime);

    res.status(200).json({
      message: "Checked out successfully",
      check_out: currentTime,
    });
  } catch (error) {
    console.error("Check-Out Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route   GET /api/attendance/history
 * @desc    Get attendance history
 * @access  Private
 *          - Employee: own history
 *          - Admin: all employees history
 */
export const getAttendanceHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    let history;

    if (role === "admin") {
      history = await getAllAttendanceHistory();
    } else {
      history = await getAttendanceHistoryByUser(userId);
    }

    res.status(200).json(history);
  } catch (error) {
    console.error("Attendance History Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
