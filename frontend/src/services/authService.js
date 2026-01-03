import { apiRequest } from "./api";

/**
 * Login user
 * @param {string} email
 * @param {string} password
 * @returns {Object} { token, user }
 */
export const loginUser = async (email, password) => {
  return apiRequest("/auth/login", "POST", {
    email,
    password,
  });
};

/**
 * Signup user
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @param {string} role
 * @returns {Object} success message
 */
export const signupUser = async (name, email, password, role) => {
  return apiRequest("/auth/signup", "POST", {
    name,
    email,
    password,
    role,
  });
};

/**
 * Get logged-in user profile
 * @param {string} token
 * @returns {Object} user
 */
export const getProfile = async (token) => {
  return apiRequest("/auth/profile", "GET", null, token);
};

/**
 * Logout (frontend-only)
 * Backend token invalidation is optional
 */
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
