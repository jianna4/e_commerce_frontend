import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();//creates a global context that can store token,login function,logout  and auth state

export const useAuth = () => useContext(AuthContext); // this reads data from the createcontext
// that up there is a helper hook that helps us do const { isAuthenticated, login, logout } = useAuth();...instead of writing useContext(AuthContext) every time


//now to the brain of auth
//children are everything wrapped around AuthProvider in main.jsx,in our case its the whole <app />
export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token") || null //initially check if token exists in localstorage and helps restore auth state when page is refreshed or reopened,no useeffect needed
  );

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null //to get name,email..all credentials its important t oadd this
  );

  const login = (token,userData) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("user", JSON.stringify(userData)); //store user data
    setAccessToken(token);
    setUser(userData);
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
