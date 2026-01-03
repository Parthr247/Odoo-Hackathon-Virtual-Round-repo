import pool from "../config/db.js";

/**
 * @route   GET /api/employees
 * @desc    Get all employees (Admin only)
 * @access  Private (Admin)
 */
export const getAllEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, email, role FROM users ORDER BY id DESC"
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Get Employees Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route   GET /api/employees/:id
 * @desc    Get single employee details
 * @access  Private (Admin)
 */
export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      "SELECT id, name, email, role FROM users WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Get Employee Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route   PUT /api/employees/:id
 * @desc    Update employee profile (Admin)
 * @access  Private (Admin)
 */
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role } = req.body;

    if (!name || !role) {
      return res.status(400).json({ message: "Name and role are required" });
    }

    const [result] = await pool.query(
      "UPDATE users SET name = ?, role = ? WHERE id = ?",
      [name, role, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee updated successfully" });
  } catch (error) {
    console.error("Update Employee Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route   DELETE /api/employees/:id
 * @desc    Delete employee (Admin)
 * @access  Private (Admin)
 */
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Delete Employee Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
