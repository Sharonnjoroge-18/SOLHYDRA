import { useAuth } from "../../AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null; // wait for auth to load

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== "admin") return <Navigate to="/" replace />;

  return children;
}