import express from "express";
import {
  getTodayAttendance,
  checkIn,
  checkOut,
  getAttendanceHistory,
} from "../controllers/attendance.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import adminOnly from "../middlewares/role.middleware.js";

const router = express.Router();

/**
 * @route   GET /api/attendance/today
 * @desc    Get today's attendance (Employee)
 * @access  Private
 */
router.get("/today", authMiddleware, getTodayAttendance);

/**
 * @route   POST /api/attendance/check-in
 * @desc    Check-in user
 * @access  Private
 */
router.post("/check-in", authMiddleware, checkIn);

/**
 * @route   POST /api/attendance/check-out
 * @desc    Check-out user
 * @access  Private
 */
router.post("/check-out", authMiddleware, checkOut);

/**
 * @route   GET /api/attendance/history
 * @desc    Get attendance history
 * @access  Private (Admin or Employee – logic in controller)
 */
router.get("/history", authMiddleware, getAttendanceHistory);

export default router;
