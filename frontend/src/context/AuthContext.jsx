import { createContext, useEffect, useState } from "react";
import {
  loginUser,
  signupUser,
  getProfile,
  logoutUser,
} from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Restore session on refresh
   */
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  /**
   * Login
   */
  const login = async (email, password) => {
    const data = await loginUser(email, password);

    setToken(data.token);
    setUser(data.user);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data.user;
  };

  /**
   * Signup
   */
  const signup = async (name, email, password, role) => {
    return signupUser(name, email, password, role);
  };

  /**
   * Logout
   */
  const logout = () => {
    logoutUser();
    setUser(null);
    setToken(null);
  };

  /**
   * Refresh profile (optional but professional)
   */
  const refreshProfile = async () => {
    if (!token) return;

    const data = await getProfile(token);
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        signup,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
