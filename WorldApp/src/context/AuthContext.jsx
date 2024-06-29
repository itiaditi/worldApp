import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  

  const login = async (username, password) => {
    const response = await axios.post("http://localhost:5000/api/user/login", {
      username,
      password,
    });
    // console.log(response);
    localStorage.setItem("token", response.data.token);
    setUser({ username });
    setIsAuthenticated(true);
  };

  const register = async (username, password) => {
    await axios.post("http://localhost:5000/api/user/register", {
      username,
      password,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false)
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated,user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};