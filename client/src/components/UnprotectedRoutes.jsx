import { useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function UnprotectedRoutes({ children }) {
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return !user && children;
}

export default UnprotectedRoutes;
