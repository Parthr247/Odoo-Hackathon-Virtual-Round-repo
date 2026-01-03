import express from "express";
import {
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import adminOnly from "../middlewares/role.middleware.js";

const router = express.Router();

/**
 * @route   GET /api/employees
 * @desc    Get all employees
 * @access  Private (Admin)
 */
router.get("/", authMiddleware, adminOnly, getAllEmployees);

/**
 * @route   GET /api/employees/:id
 * @desc    Get employee by ID
 * @access  Private (Admin)
 */
router.get("/:id", authMiddleware, adminOnly, getEmployeeById);

/**
 * @route   PUT /api/employees/:id
 * @desc    Update employee (name, role)
 * @access  Private (Admin)
 */
router.put("/:id", authMiddleware, adminOnly, updateEmployee);

/**
 * @route   DELETE /api/employees/:id
 * @desc    Delete employee
 * @access  Private (Admin)
 */
router.delete("/:id", authMiddleware, adminOnly, deleteEmployee);

export default router;
