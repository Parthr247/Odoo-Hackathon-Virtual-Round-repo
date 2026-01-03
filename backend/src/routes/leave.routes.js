import express from "express";
import {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
} from "../controllers/leave.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import adminOnly from "../middlewares/role.middleware.js";

const router = express.Router();

/**
 * @route   POST /api/leave/apply
 * @desc    Apply for leave
 * @access  Private (Employee)
 */
router.post("/apply", authMiddleware, applyLeave);

/**
 * @route   GET /api/leave/my
 * @desc    Get logged-in user's leave history
 * @access  Private (Employee)
 */
router.get("/my", authMiddleware, getMyLeaves);

/**
 * @route   GET /api/leave/all
 * @desc    Get all leave requests
 * @access  Private (Admin)
 */
router.get("/all", authMiddleware, adminOnly, getAllLeaves);

/**
 * @route   PUT /api/leave/:id/status
 * @desc    Approve or reject leave
 * @access  Private (Admin)
 */
router.put("/:id/status", authMiddleware, adminOnly, updateLeaveStatus);

export default router;
