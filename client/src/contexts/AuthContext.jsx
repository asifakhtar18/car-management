import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  login as loginService,
  register as registerService,
} from "../services/authService";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await loginService(email, password);
    if (res.success) {
      setUser(res.user);
      navigate("/");
    } else {
      toast.error(res.error.toString());
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const register = async (name, email, password) => {
    setLoading(true);
    const res = await registerService(name, email, password);
    if (res.success) {
      setUser(res.user);
      navigate("/login");
    } else {
      toast.error(res.error.toString());
    }
    setLoading(false);
  };

  const value = {
    user,
    login,
    logout,
    register,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
