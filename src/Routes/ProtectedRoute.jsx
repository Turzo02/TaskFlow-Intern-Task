import { Navigate } from 'react-router';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.error("Access Denied! Please login first.", {
        id: 'unauth',
      });
    }
  }, [token]);

  return token ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;