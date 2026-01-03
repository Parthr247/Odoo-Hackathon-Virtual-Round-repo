import api from "./api";

export const loginRequest = (payload) => {
  return api.post("/auth/login", payload);
};

export const signupRequest = (payload) => {
  return api.post("/auth/signup", payload);
};
