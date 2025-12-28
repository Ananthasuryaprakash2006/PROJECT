import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // If auth context is still loading just wait
  if (loading) return <div className="text-white">Loading...</div>;

  // 🔥 TEMPORARY FIX: Allow all routes if no user found
  // Comment this out when login is fully implemented
  return children;
}
