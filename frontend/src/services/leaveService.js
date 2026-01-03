import api from "./api";

export const applyLeaveRequest = (payload) =>
  api.post("/leave/apply", payload);

export const fetchLeaves = () => api.get("/leave");
