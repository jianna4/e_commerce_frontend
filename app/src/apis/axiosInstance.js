import axios from "axios";

// Create an Axios instance we do this to handle auth headers globally
//so we don't have to manually add them in every request hence reducing redundancy and errors
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000", // your backend URL,then well specify if auth or products
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT token to every request automatically (if logged in)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token"); //gets token from localstorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//handling the 401 errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // optionally: log out user or redirect to login
      localStorage.removeItem("access_token");
      window.location.href = "/login"; // redirect to login page
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;
