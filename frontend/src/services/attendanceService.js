import api from "./api";

export const checkInRequest = () => api.post("/attendance/check-in");

export const checkOutRequest = () => api.post("/attendance/check-out");

export const fetchAttendance = () => api.get("/attendance");
