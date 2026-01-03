import { apiRequest } from "./api";

/**
 * Apply for leave (Employee)
 * @param {Object} leaveData
 * @param {string} token
 * @returns {Object} created leave request
 */
export const applyLeave = async (leaveData, token) => {
  return apiRequest("/leave/apply", "POST", leaveData, token);
};

/**
 * Get logged-in employee's leave history
 * @param {string} token
 * @returns {Array} leave requests
 */
export const getMyLeaves = async (token) => {
  return apiRequest("/leave/my", "GET", null, token);
};

/**
 * Get all leave requests (Admin)
 * @param {string} token
 * @returns {Array} leave requests
 */
export const getAllLeaves = async (token) => {
  return apiRequest("/leave/all", "GET", null, token);
};

/**
 * Approve or reject leave (Admin)
 * @param {number} leaveId
 * @param {string} status - "approved" | "rejected"
 * @param {string} token
 * @returns {Object} updated leave request
 */
export const updateLeaveStatus = async (leaveId, status, token) => {
  return apiRequest(
    `/leave/${leaveId}/status`,
    "PUT",
    { status },
    token
  );
};
