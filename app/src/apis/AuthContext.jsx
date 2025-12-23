import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();//creates a global context to check for login an auth status

export const useAuth = () => useContext(AuthContext); // this reads data from the createcontext

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token") || null
  );

  const login = (token) => {
    localStorage.setItem("access_token", token);
    setAccessToken(token);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setAccessToken(null);
  };

  const isAuthenticated = !!accessToken;

  return (
    //provides the data 
    <AuthContext.Provider value={{ accessToken, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
