import { apiRequest } from "./api";

/**
 * Get today's attendance for logged-in user
 * @param {string} token
 * @returns {Object} attendance data
 */
export const getTodayAttendance = async (token) => {
  return apiRequest("/attendance/today", "GET", null, token);
};

/**
 * Check-in user
 * @param {string} token
 * @returns {Object} check-in time
 */
export const checkIn = async (token) => {
  return apiRequest("/attendance/check-in", "POST", null, token);
};

/**
 * Check-out user
 * @param {string} token
 * @returns {Object} check-out time
 */
export const checkOut = async (token) => {
  return apiRequest("/attendance/check-out", "POST", null, token);
};

/**
 * Get attendance history (admin or employee)
 * @param {string} token
 * @returns {Array} attendance records
 */
export const getAttendanceHistory = async (token) => {
  return apiRequest("/attendance/history", "GET", null, token);
};
