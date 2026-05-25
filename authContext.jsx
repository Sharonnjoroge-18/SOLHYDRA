import { createContext, useContext, useEffect, useState } from "react";
import { authAPI } from "../lib/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on app load
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const stored = localStorage.getItem("user");
    if (token && stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const saveSession = (data) => {
    const { access_token, user_id, name, email } = data;
    localStorage.setItem("access_token", access_token);
    const u = { user_id, name, email };
    localStorage.setItem("user", JSON.stringify(u));
    setUser(u);
  };

  const login = async (email, password) => {
    const data = await authAPI.login(email, password);
    saveSession(data);
    return data;
  };

  const register = async (name, email, password) => {
    const data = await authAPI.register(name, email, password);
    saveSession(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
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
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};