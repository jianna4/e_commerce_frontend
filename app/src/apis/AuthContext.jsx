import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "./axiosInstance";
const AuthContext = createContext();//creates a global context that can store token,login function,logout  and auth state

export const useAuth = () => useContext(AuthContext); // this reads data from the createcontext
// that up there is a helper hook that helps us do const { isAuthenticated, login, logout } = useAuth();...instead of writing useContext(AuthContext) every time


//now to the brain of auth
//children are everything wrapped around AuthProvider in main.jsx,in our case its the whole <app />
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : null;
});

  const [accessToken, setAccessToken] = useState(() => {
  return localStorage.getItem("access_token") || null;
  });
  // Fetch user data from backend when token exists
  useEffect(() => {
    const fetchUserData = async () => {
      if (accessToken && !user) {
        try {
          const response = await axiosInstance.get("me/");
          setUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          // Token might be expired, log out
          logout();
        }
      }
    };

    fetchUserData();
  }, [accessToken]);


  const login = async(token) => {
    localStorage.setItem("access_token", token);
    //localStorage.setItem("user", JSON.stringify(userData)); //store user data
    setAccessToken(token);
    // Now fetch user data from backend
    try {
      const response = await axiosInstance.get("me/");
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error("Failed to fetch user data after login:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setAccessToken(null);
    setUser(null);
  };

  const isAuthenticated = !!accessToken; //this is the magic bolean that tells us if user is logged in or not
  //we wil use this in our add to cart and other protected routes
  //eg: const { isAuthenticated } = useAuth(); if(!isAuthenticated) navigate("/login");
  //eg: {isAuthenticated ? <AddToCart /> : <LoginButton />}
  //eg {isAuthenticated ? <button>logout</button> : <RedirectToLogin />}

  return (
    //provides the data
    <AuthContext.Provider value={{ accessToken, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
