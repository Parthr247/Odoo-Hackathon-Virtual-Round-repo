import pool from "../config/db.js";

/**
 * Create new user
 */
export const createUser = async (name, email, hashedPassword, role) => {
  const [result] = await pool.query(
    `INSERT INTO users (name, email, password, role)
     VALUES (?, ?, ?, ?)`,
    [name, email, hashedPassword, role]
  );

  return result.insertId;
};

/**
 * Find user by email
 */
export const findUserByEmail = async (email) => {
  const [rows] = await pool.query(
    `SELECT * FROM users WHERE email = ?`,
    [email]
  );

  return rows[0];
};

/**
 * Find user by ID
 */
export const findUserById = async (id) => {
  const [rows] = await pool.query(
    `SELECT id, name, email, role FROM users WHERE id = ?`,
    [id]
  );

  return rows[0];
};

/**
 * Get all users (Admin)
 */
export const getAllUsers = async () => {
  const [rows] = await pool.query(
    `SELECT id, name, email, role FROM users ORDER BY id DESC`
  );

  return rows;
};

/**
 * Update user (Admin)
 */
export const updateUser = async (id, name, role) => {
  const [result] = await pool.query(
    `UPDATE users SET name = ?, role = ? WHERE id = ?`,
    [name, role, id]
  );

  return result.affectedRows;
};

/**
 * Delete user (Admin)
 */
export const deleteUser = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM users WHERE id = ?`,
    [id]
  );

  return result.affectedRows;
};
