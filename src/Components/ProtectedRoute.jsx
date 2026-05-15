import { Navigate } from "react-router-dom";
import useAuthStore from "../assets/Store";

function ProtectedRoute({ children }) {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
