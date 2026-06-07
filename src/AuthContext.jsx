import { createContext, useContext, useEffect, useState } from "react";
import { authAPI } from "./api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const stored = localStorage.getItem("user");
    if (token && stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const saveSession = (data) => {
    const { access_token, user_id, name, email } = data;
    localStorage.setItem("access_token", access_token);
    
    // Keeps your standard group assignment logic structure intact
    const u = { user_id, name, email, role: "admin" };
    localStorage.setItem("user", JSON.stringify(u));
    setUser(u);
  };

  const login = async (email, password) => {
    // ── 1. ACADEMIC ADMIN CREDENTIAL INTERCEPTOR ──
    if (email === "admin" && password === "admin100") {
      const mockAdminProfile = {
        user_id: "system-admin-id",
        name: "System Admin",
        email: "admin",
        role: "admin"
      };

      // Populate everything locally so all components match state instantly
      localStorage.setItem("access_token", "mvp-admin-token");
      localStorage.setItem("user", JSON.stringify(mockAdminProfile));
      localStorage.setItem("is_admin", "true"); // Local tracking flag for navbar
      
      setUser(mockAdminProfile);

      // Return a special flag so Login.jsx can intercept routing instructions
      return { isAdminBypass: true };
    }

    // ── 2. STANDARD RAILWAY BACKEND ACCOUNT PATHWAY ──
    const data = await authAPI.login(email, password);
    if (!data?.access_token) {
      throw new Error(data?.detail || data?.message || 'Invalid login response. Please check your credentials.');
    }
    
    // Explicitly flag standard backend loggers as non-bypass profiles
    localStorage.setItem("is_admin", "false");
    
    saveSession(data);
    return { ...data, isAdminBypass: false };
  };

  const register = async (name, email, password) => {
    const data = await authAPI.register(name, email, password);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("is_admin"); // Clear administrative flag cleanly
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin" || localStorage.getItem("is_admin") === "true",
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
};