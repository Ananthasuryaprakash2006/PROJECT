import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore user from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("xfunds_user");
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("xfunds_user", JSON.stringify(userData));
  };

  // Logout function
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {}

    localStorage.removeItem("xfunds_user");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
