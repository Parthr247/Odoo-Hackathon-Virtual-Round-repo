import express from "express";
import {
  getMyPayroll,
  getAllPayrolls,
  createPayroll,
} from "../controllers/payroll.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import adminOnly from "../middlewares/role.middleware.js";

const router = express.Router();

/**
 * @route   GET /api/payroll/my
 * @desc    Get logged-in employee payroll
 * @access  Private
 */
router.get("/my", authMiddleware, getMyPayroll);

/**
 * @route   GET /api/payroll/all
 * @desc    Get all payroll records
 * @access  Private (Admin)
 */
router.get("/all", authMiddleware, adminOnly, getAllPayrolls);

/**
 * @route   POST /api/payroll/create
 * @desc    Create payroll for employee
 * @access  Private (Admin)
 */
router.post("/create", authMiddleware, adminOnly, createPayroll);

export default router;
