


import React, { createContext, useState, useEffect, useContext } from 'react';
import { login, register } from '../services/api';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(); 
const AuthProvider = ({ children }) => { 
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 < Date.now()) {
            console.log("AuthContext: Token expired.");
            logout();
          } else {
            setUser({
              id: decoded.id,
              email: decoded.email,
              role: decoded.role,
              nom: decoded.nom, 
            });
          }
        } catch (error) {
          console.error("AuthContext: Failed to decode token:", error);
          logout();
        }
      }
      setLoading(false);
    };

    checkToken();
  }, [token]);

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const response = await login({ email, mot_de_passe: password });
      const receivedToken = response.data.token;
      localStorage.setItem('token', receivedToken);
      setToken(receivedToken);
      const decoded = jwtDecode(receivedToken);
      setUser({
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
        nom: decoded.nom, 
      });
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      console.error("AuthContext: Login failed:", error.response?.data?.message || error.message);
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  const signUp = async (nom, email, password) => {
    try {
      setLoading(true);
      const response = await register({ nom, email, mot_de_passe: password });
      setLoading(false);
      return { success: true, message: response.data.message };
    } catch (error) {
      setLoading(false);
      console.error("AuthContext: Registration failed:", error.response?.data?.message || error.message);
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    console.log("AuthContext: Performing logout and redirecting to /auth.");
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/auth?mode=login');
  };

  const isAuthenticated = !!user;
  const isAdmin = user && user.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, token, loading, isAuthenticated, isAdmin, signIn, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


export default AuthProvider; 